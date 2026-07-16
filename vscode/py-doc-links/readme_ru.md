# Python Doc Links

[English](https://github.com/rufatpro/plugins/blob/main/vscode/py-doc-links/readme.md) · [Releases](https://github.com/rufatpro/plugins/releases) · [Репозиторий](https://github.com/rufatpro/plugins)

**Расширение для сред, совместимых с VS Code** — переход к определению из ссылок в Python docstring/комментариях.

Делает навигацию по `submodule.py`, <code>:py:func:`submodule.process_submodule_data`</code>, <code>:func:`run_main_flow`</code> через Ctrl+Click (или F12).

> Разработано с помощью AI (Cursor / LLM). Часть монорепозитория [plugins](https://github.com/rufatpro/plugins).

> **Совместимость:** расширение работает не только в VS Code и Cursor — оно совместимо с **любой средой на базе VS Code**, в том числе **Google Antigravity IDE**, VSCodium, Windsurf и другими форками с поддержкой стандартных расширений (Open VSX или установка из VSIX).

## Поддерживаемые паттерны

| Паттерн | Переход к |
|--------|-----------|
| `filename.py` | Файл в workspace |
| <code>:py:func:`module.func`</code> | Определение функции |
| <code>:py:func:`module.py.func`</code> | Определение функции (толерантная форма с именем файла) |
| <code>:func:`module.func`</code> | Определение функции |
| <code>:func:`module.py.func`</code> | Определение функции (толерантная форма с именем файла) |
| <code>:func:`func`</code> | Функция в текущем файле |
| <code>:py:class:`module.Class`</code> | Определение класса |
| <code>:class:`Class`</code> | Класс в текущем файле |
| <code>:py:data:`module.var`</code> | Переменная модуля (`var = …`) |
| <code>:data:`var`</code> | Переменная в текущем файле |
| <code>:py:attr:`module.attr`</code> | То же, что data (имя на уровне модуля) |
| <code>:py:func:`module.name`</code> | Если нет `def`, ищет также class и присваивание |
| <code>:py:mod:`module`</code> | Файл модуля (`module.py`) |
| <code>:py:mod:`module.py`</code> | Файл модуля (форма с именем файла) |

## Пример

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

## Установка (постоянная, через VSIX)

Соберите пакет `.vsix`:

```bash
npm install -g @vscode/vsce
cd vscode/py-doc-links
build.bat
```

Далее установите сгенерированный `.vsix`.

**Палитра команд (основной способ, любая VS Code-совместимая среда):**

1. Откройте Command Palette: **F1**, **Ctrl+Shift+P** (Windows/Linux), **Cmd+Shift+P** (macOS) или **View → Command Palette**
2. Введите: `Install from VSIX`
3. Выберите **Extensions: Install from VSIX...**
4. Укажите файл `.vsix` (см. путь ниже)

Итоговый файл пакета:

`vscode/py-doc-links/build/py-doc-links-0.2.10.vsix`

## Ограничения

- Поиск функций эвристический (`module.func` -> `module.py` + `def func(...)`).
- Если в workspace несколько файлов с одинаковым именем, приоритет у файла в той же папке, что и исходник; копии в `docs/` и похожих каталогах понижаются в приоритете.
- Нет интеграции rename/find-usages для таких текстовых ссылок.
- Работает только в Python-файлах (`language: python`).

Связанные upstream issue:
- [YouTrack PY-13902](https://youtrack.jetbrains.com/issue/PY-13902)
- [YouTrack PY-27635](https://youtrack.jetbrains.com/issue/PY-27635/Treat-Sphinx-Python-domain-references-in-docstrings-as-first-class-citizens)

## Лицензия

[MIT](https://github.com/rufatpro/plugins/blob/main/license) — свободное использование, изменение и распространение, на ваш риск.  
[Монорепозиторий plugins](https://github.com/rufatpro/plugins) · [Releases](https://github.com/rufatpro/plugins/releases)

## Автор

[Руфат](https://rufat.top/)

**Cursor IDE:** [Регистрация по реферальной ссылке](https://cursor.com/referral?code=GCE2SLLVIM87) — при подписке поддерживаете автора.
