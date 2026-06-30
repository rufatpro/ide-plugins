package com.aichat.filelinks

import com.intellij.notification.Notification
import com.intellij.openapi.application.ApplicationManager
import com.intellij.openapi.project.ProjectManager
import java.awt.Component
import java.awt.Toolkit
import java.awt.datatransfer.StringSelection
import javax.swing.text.JTextComponent

object FailedPathCapture {

    private val cannotOpenHints = listOf(
        "does not exist",
        "cannot open a url",
        "cannot open url",
        "не существует",
    )

    fun isFileOpenErrorText(combined: String): Boolean =
        cannotOpenHints.any { combined.contains(it, ignoreCase = true) }

    fun capture(notification: Notification) {
        DebugLog.log("capture", "capture(Notification) title=${notification.title} content=${notification.content}")
        ErrorUiDismisser.track(notification)
        captureFromText("${notification.title.orEmpty()}\n${notification.content.orEmpty()}")
    }

    fun captureFromBalloonComponent(root: Component?) {
        DebugLog.log("capture", "captureFromBalloonComponent root=${root?.javaClass?.name}")
        val text = collectComponentText(root)
        if (text == null) {
            DebugLog.log("capture", "balloon component text is empty")
            return
        }
        DebugLog.log("capture", "balloon text=[$text]")
        captureFromText(text)
    }

    fun captureFromText(combined: String) {
        if (!isFileOpenErrorText(combined)) {
            DebugLog.log("capture", "skip: no hint match in [$combined]")
            return
        }

        val path = PathResolver.extractFromNotification(combined)
            ?: extractBacktickPath(combined)

        if (path == null) {
            DebugLog.log("capture", "skip: path not extracted from [$combined]")
            return
        }

        rememberCopyAndOpen(path)
    }

    private fun collectComponentText(component: Component?): String? {
        if (component == null) return null
        val parts = mutableListOf<String>()
        collectComponentTextRecursive(component, parts)
        return parts.joinToString("\n").takeIf { it.isNotBlank() }
    }

    private fun collectComponentTextRecursive(component: Component, parts: MutableList<String>) {
        when (component) {
            is javax.swing.JLabel -> component.text?.takeIf { it.isNotBlank() }?.let(parts::add)
            is JTextComponent -> component.text?.takeIf { it.isNotBlank() }?.let(parts::add)
        }
        if (component is java.awt.Container) {
            for (child in component.components) {
                collectComponentTextRecursive(child, parts)
            }
        }
    }

    private fun extractBacktickPath(text: String): String? {
        val match = Regex(
            """[`'"]([^`'"]+\.(?:py|md|html|kt|java|js|ts|tsx|json|yaml|yml|txt|c|h|cpp|hpp))[`'"]""",
            RegexOption.IGNORE_CASE,
        ).find(text) ?: return null
        return PathResolver.normalizePath(match.groupValues[1])
    }

    private fun rememberCopyAndOpen(path: String) {
        LastFailedPathHolder.lastPath = path
        DebugLog.log("capture", "SUCCESS path=[$path] -> clipboard + open")

        ApplicationManager.getApplication().invokeLater {
            // 1. Скопировать в буфер
            val clipboard = Toolkit.getDefaultToolkit().systemClipboard
            clipboard.setContents(StringSelection(path), null)
            DebugLog.log("capture", "clipboard set to [$path]")

            // 2. Открыть в редакторе — перебираем все открытые проекты
            val opened = ProjectManager.getInstance().openProjects
                .filterNot { it.isDisposed || it.basePath.isNullOrBlank() }

            var success = false
            for (project in opened) {
                if (PathResolver.openInProject(project, path)) {
                    DebugLog.log("capture", "opened in IDE: project=${project.name} path=$path")
                    success = true
                    break
                }
            }

            if (success) {
                ErrorUiDismisser.afterSuccessfulOpen()
            } else {
                DebugLog.log("capture", "open FAILED for path=$path (tried ${opened.size} projects)")
            }
        }
    }
}

