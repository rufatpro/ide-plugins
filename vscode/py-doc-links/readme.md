# Python Doc Links

[Русский](https://github.com/rufatpro/plugins/blob/main/vscode/py-doc-links/readme_ru.md) · [Releases](https://github.com/rufatpro/plugins/releases) · [Repository](https://github.com/rufatpro/plugins)

**VS Code-compatible extension** that enables go-to-definition from Python docstring/comment references.

It makes references like `submodule.py`, <code>:py:func:`submodule.process_submodule_data`</code>, and <code>:func:`run_main_flow`</code> navigable with Ctrl+Click (or F12).

> Developed with AI assistance (Cursor / LLM). Part of the [plugins](https://github.com/rufatpro/plugins) monorepo.

> **Compatibility:** Not limited to VS Code or Cursor — runs in any **VS Code-compatible editor**, including **Google Antigravity IDE**, VSCodium, Windsurf, and other forks that support standard VS Code extensions (Open VSX or VSIX).

## Supported patterns

| Pattern | Resolves to |
|--------|-------------|
| `filename.py` | File in workspace |
| <code>:py:func:`module.func`</code> | Function definition |
| <code>:py:func:`module.py.func`</code> | Function definition (tolerant filename form) |
| <code>:func:`module.func`</code> | Function definition |
| <code>:func:`module.py.func`</code> | Function definition (tolerant filename form) |
| <code>:func:`func`</code> | Function in the current file |
| <code>:py:class:`module.Class`</code> | Class definition |
| <code>:class:`Class`</code> | Class in the current file |
| <code>:py:data:`module.var`</code> | Module-level variable (`var = …`) |
| <code>:data:`var`</code> | Variable in the current file |
| <code>:py:attr:`module.attr`</code> | Same as data (module-level name) |
| <code>:py:func:`module.name`</code> | If not a `def`, also tries class and assignment |
| <code>:py:mod:`module`</code> | Module file (`module.py`) |
| <code>:py:mod:`module.py`</code> | Module file (filename form) |

## Example

```python
def example():
    """
    File: submodule.py
    Function: :py:func:`submodule.process_submodule_data`
    Function (filename form): :py:func:`submodule.py.process_submodule_data`
    Function (current module): :func:`run_main_flow`
    Variable: :py:data:`config.hosters_data`
    Class: :py:class:`ObjectWithProperties`
    Module: :py:mod:`submodule`
    Module (filename form): :py:mod:`submodule.py`
    """
```

## Install (persistent, via VSIX)

Build the VSIX package:

```bash
npm install -g @vscode/vsce
cd vscode/py-doc-links
build.bat
```

Then install the generated `.vsix`.

**Command Palette (any VS Code-compatible editor):**

1. Open Command Palette: **F1**, **Ctrl+Shift+P** (Windows/Linux), **Cmd+Shift+P** (macOS), or **View → Command Palette**
2. Type: `Install from VSIX`
3. Select **Extensions: Install from VSIX...**
4. Pick the `.vsix` file (see path below)

Resulting package file:

`vscode/py-doc-links/build/py-doc-links-0.2.10.vsix`

## Limitations

- Function lookup is heuristic (`module.func` -> `module.py` + `def func(...)`).
- If multiple files share the same basename, the copy in the same folder as the source file is preferred; matches under `docs/` and similar trees are de-prioritized.
- No rename/find-usages integration for these textual references.
- Works only in Python files (`language: python`).

Related upstream context:
- [YouTrack PY-13902](https://youtrack.jetbrains.com/issue/PY-13902)
- [YouTrack PY-27635](https://youtrack.jetbrains.com/issue/PY-27635/Treat-Sphinx-Python-domain-references-in-docstrings-as-first-class-citizens)

## License

[MIT](https://github.com/rufatpro/plugins/blob/main/license) — free to use, modify, and distribute, at your own risk.  
[plugins monorepo](https://github.com/rufatpro/plugins) · [Releases](https://github.com/rufatpro/plugins/releases)

## Author

[Rufat](https://rufat.top/)

**Cursor IDE:** [Sign up with referral link](https://cursor.com/referral?code=GCE2SLLVIM87) — supports the author when you subscribe.
