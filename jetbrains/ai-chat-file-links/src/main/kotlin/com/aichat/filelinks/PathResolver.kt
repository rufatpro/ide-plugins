package com.aichat.filelinks

import com.intellij.openapi.fileEditor.OpenFileDescriptor
import com.intellij.openapi.project.Project
import com.intellij.openapi.vfs.LocalFileSystem
import java.net.URI
import java.net.URLDecoder
import java.nio.charset.StandardCharsets
import java.nio.file.Path
import java.nio.file.Paths
import kotlin.io.path.exists

object PathResolver {

    // Matches with or without surrounding quotes/backticks, e.g.:
    //   File src\app\file.py does not exist.
    //   File `src/app/file.py` does not exist.
    private val FILE_DOES_NOT_EXIST =
        Regex("""[Ff]ile [`'"]?([^`'"<>\n]+?)[`'"]?\s+does not exist""", RegexOption.IGNORE_CASE)

    private val HTTP_URL = Regex("""^https?://""", RegexOption.IGNORE_CASE)

    fun extractFromNotification(content: String): String? =
        FILE_DOES_NOT_EXIST.find(content)?.groupValues?.getOrNull(1)?.let(::normalizePath)

    fun extractPath(raw: String): String? {
        val trimmed = raw.trim()
        if (trimmed.isEmpty() || HTTP_URL.containsMatchIn(trimmed)) {
            return null
        }

        val decoded = decode(trimmed)
        val candidate = when {
            decoded.startsWith("file:", ignoreCase = true) -> uriPath(decoded)
            looksLikeProjectPath(decoded) -> stripQueryAndFragment(decoded)
            else -> null
        } ?: return null

        return normalizePath(candidate)
    }

    fun openInProject(project: Project, pathWithOptionalLine: String): Boolean {
        val (rawPath, line) = parseLineColumn(pathWithOptionalLine)
        val normalizedPath = normalizePath(rawPath)
        val full = resolvePath(project, normalizedPath) ?: return false
        if (!full.exists()) return false

        val vf = LocalFileSystem.getInstance().refreshAndFindFileByNioFile(full) ?: return false
        val descriptor = if (line != null) {
            OpenFileDescriptor(project, vf, (line - 1).coerceAtLeast(0), 0)
        } else {
            OpenFileDescriptor(project, vf)
        }
        descriptor.navigate(true)
        return true
    }

    private fun decode(value: String): String =
        try {
            URLDecoder.decode(value, StandardCharsets.UTF_8)
        } catch (_: Exception) {
            value
        }

    private fun uriPath(fileUrl: String): String? =
        try {
            val path = URI(fileUrl).path ?: return null
            if (path.length >= 3 && path[0] == '/' && path[2] == ':') {
                path.substring(1)
            } else {
                path
            }
        } catch (_: Exception) {
            null
        }

    private fun looksLikeProjectPath(value: String): Boolean {
        if (value.contains("://")) return false
        if (value.endsWith(".md", ignoreCase = true) ||
            value.endsWith(".py", ignoreCase = true) ||
            value.endsWith(".html", ignoreCase = true) ||
            value.endsWith(".kt", ignoreCase = true) ||
            value.endsWith(".java", ignoreCase = true) ||
            value.endsWith(".c", ignoreCase = true) ||
            value.endsWith(".h", ignoreCase = true) ||
            value.endsWith(".cpp", ignoreCase = true) ||
            value.endsWith(".hpp", ignoreCase = true)
        ) {
            return true
        }
        return value.contains('/') || value.contains('\\')
    }

    private fun stripQueryAndFragment(value: String): String {
        val noFragment = value.substringBefore('#')
        return noFragment.substringBefore('?')
    }

    fun normalizePath(path: String): String =
        decode(path)
            .replace('\\', '/')
            .trim()

    private fun resolvePath(project: Project, path: String): Path? {
        val nioPath = runCatching { Paths.get(path) }.getOrNull()
        if (nioPath != null && nioPath.isAbsolute) {
            if (nioPath.exists()) {
                return nioPath
            }
            resolveProjectRelative(project, path.removePrefix("/"))?.let { return it }
            return nioPath
        }

        return resolveProjectRelative(project, path)
    }

    private fun resolveProjectRelative(project: Project, path: String): Path? {
        val base = project.basePath ?: return null
        val segments = path.split('/').filter { it.isNotEmpty() }
        if (segments.isEmpty()) return null

        return Paths.get(base, *segments.toTypedArray())
    }

    private fun parseLineColumn(pathWithLine: String): Pair<String, Int?> {
        val normalized = pathWithLine.replace('\\', '/')
        val colon = normalized.lastIndexOf(':')
        if (colon <= 0) return normalized to null

        val maybeLine = normalized.substring(colon + 1)
        if (!maybeLine.all { it.isDigit() }) return normalized to null

        val line = maybeLine.toIntOrNull() ?: return normalized to null
        val filePart = normalized.substring(0, colon)
        if (!filePart.contains('.') && !filePart.contains('/')) return normalized to null

        return filePart to line
    }
}

