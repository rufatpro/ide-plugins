# Changelog

## 0.2.10

- English README author link points to [rufat.top/en](https://rufat.top/en/).

## 0.2.8

- Repository moved to [github.com/rufatpro/plugins](https://github.com/rufatpro/plugins); updated `vendor` URL in `plugin.xml`.

## 0.2.7

- Added Sphinx navigation for classes and module-level variables: `:py:class:`, `:class:`, `:py:data:`, `:data:`, `:py:attr:`, `:attr:` (`PySymbolReference`; replaces `PyFuncReference`).
- `:py:func:` / `:func:` fall back to class and assignment when no `def` is found.
- Version aligned with VS Code `0.2.7` release.

## 0.2.6

- Duplicate filenames (e.g. several `main.py`) resolve via `FileResolvePriority`: same directory as source first; `docs/`, `!to_tg/`, `examples/` de-prioritized.
- Version aligned with VS Code `0.2.6` release.

## 0.2.5

- Fixed README/Markdown rendering of Sphinx patterns with inner backticks.
- Version aligned with VS Code `0.2.5` release.

## 0.2.4

- LICENSE copyright line aligned with monorepo.
- Version aligned with VS Code `0.2.4` release.

## 0.2.3

- Optional Python plugin dependency (Marketplace verification on IntelliJ IDEA without bundled Python).

## 0.2.0

- Tolerant `:py:func:`module.py.func`` form; `:func:`func`` in current file.

## 0.1.0

- Initial release: `filename.py`, `:py:func:`, `:func:`, `:py:mod:` in docstrings and comments.
