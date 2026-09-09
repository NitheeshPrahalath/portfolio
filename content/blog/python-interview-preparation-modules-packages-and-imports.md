---
title: "Python Interview Preparation - Modules, Packages, and Imports"
date: "2026-09-09"
description: ""
---

# Python Modules, Packages, and Imports

As Python applications grow, keeping everything in one file becomes difficult to maintain. Python provides **modules and packages** to organize code, reuse functionality, and separate responsibilities.

Understanding imports properly requires more than memorizing syntax. The key is to develop a mental model of **names, objects, namespaces, and module loading**.

---

## 1. What Is a Module?

A **module** is typically a Python file containing definitions and executable code.

For example:

```python
# calculator.py

def add(a, b):
    return a + b

def multiply(a, b):
    return a * b
```

Another file can reuse this code:

```python
# app.py

import calculator

print(calculator.add(2, 3))
print(calculator.multiply(4, 5))
```

Here:

* `calculator.py` is a module.
* `import calculator` imports the module.
* `calculator.add` accesses the `add` function inside that module.

### Mental Model

Think of a module as a **namespace/container of Python objects**:

```text
app.py
   |
   | calculator
   ↓
calculator module
   ├── add
   ├── multiply
   └── other names
```

An important point is that `import calculator` does **not copy all functions and variables into `app.py`**. It binds the name `calculator` to the module object.

---

## 2. What Happens During an Import?

Consider:

```python
# calculator.py

print("calculator imported")

x = 10
```

Then:

```python
import calculator
print("done")
```

The output is:

```text
calculator imported
done
```

Why did the `print()` inside `calculator.py` execute?

Because importing a module causes its **top-level code to execute** when the module is initially loaded.

A useful interview-level model is:

```text
import module
     ↓
Check import cache
     ↓
Find the module
     ↓
Create/load module
     ↓
Execute top-level code
     ↓
Cache module
     ↓
Make module available to importer
```

Python's actual import machinery involves finders, loaders, and module specifications, but this model is sufficient for most beginner-to-intermediate interviews.

---

## 3. `import` vs `from ... import`

These two forms have an important difference.

### Import the module

```python
import calculator

calculator.add(2, 3)
```

The name `calculator` is available in the current namespace.

### Import a specific name

```python
from calculator import add

add(2, 3)
```

The name `add` is now available directly in the current namespace.

The mental model is:

```text
import calculator

calculator ─────→ calculator module
                     └── add


from calculator import add

add ────────────→ function object
```

Therefore:

> `import module` binds the module to a name.

> `from module import name` binds a particular object from the module to a name.

---

## 4. Aliases

An imported name can be given an alias:

```python
import calculator as calc

print(calc.add(2, 3))
```

Specific objects can also be aliased:

```python
from calculator import multiply as mul

print(mul(3, 4))
```

Aliases only affect the name used in the importing module.

They do not rename the original module or function.

---

# 5. Packages

A **package** provides a way to organize related modules into a directory structure.

For example:

```text
project/
├── app.py
└── geometry/
    ├── __init__.py
    ├── rectangle.py
    └── circle.py
```

Here:

* `geometry` is a package.
* `rectangle.py` is a module.
* `circle.py` is a module.

We can import a function using:

```python
from geometry.rectangle import area
```

The path can be read as:

```text
geometry       → package
    ↓
rectangle      → module
    ↓
area           → name inside the module
```

Packages can also contain subpackages:

```text
shop/
├── products/
│   ├── pricing.py
│   └── catalog.py
└── users/
    └── authentication.py
```

This allows large applications to organize functionality hierarchically.

---

# 6. `__init__.py`

A package commonly contains:

```text
geometry/
├── __init__.py
└── rectangle.py
```

`__init__.py` contains code associated with initializing the package.

For example:

```python
# geometry/__init__.py

print("Geometry initialized")
```

When the package is imported, its initialization code can execute.

Historically, `__init__.py` was required for a directory to be treated as a regular Python package. Modern Python also supports **namespace packages**, where `__init__.py` is not necessarily present.

For ordinary application development, however, `__init__.py` remains extremely common.

It can also expose selected names:

```python
# geometry/__init__.py

from .rectangle import area
```

This can allow:

```python
from geometry import area
```

instead of:

```python
from geometry.rectangle import area
```

---

# 7. Absolute Imports

An absolute import describes the path starting from the top-level import namespace.

```python
from geometry.rectangle import area
```

This explicitly identifies:

```text
geometry → rectangle → area
```

Absolute imports are often easier to understand because the complete import path is visible.

---

# 8. Relative Imports

Suppose `circle.py` needs something from `rectangle.py`:

```text
geometry/
├── __init__.py
├── rectangle.py
└── circle.py
```

Inside `circle.py`, we can write:

```python
from .rectangle import area
```

The `.` means:

> Resolve this import relative to the current package.

Conceptually:

```text
.            → current package
.rectangle   → rectangle module
.area        → area
```

You may also see:

```python
from ..utils import helper
```

where:

```text
.   → current package
..  → parent package
```

### Important distinction

```python
from geometry.rectangle import area
```

is an **absolute import**.

```python
from .rectangle import area
```

is a **relative import**.

Relative imports depend on Python knowing the module's package context. This is why directly executing a package module can behave differently from importing that module as part of its package.

---

# 9. `__name__`

Every Python module has a special variable:

```python
__name__
```

Its value depends on how the module is being used.

Suppose `calculator.py` contains:

```python
print(__name__)
```

If we run:

```bash
python calculator.py
```

the output is:

```text
__main__
```

But if another file does:

```python
import calculator
```

then inside `calculator.py`:

```python
__name__
```

will normally be:

```text
calculator
```

### Mental Model

When executed directly:

```text
python calculator.py
        ↓
__name__ = "__main__"
```

When imported:

```text
app.py
  ↓
import calculator
  ↓
calculator.py
  ↓
__name__ = "calculator"
```

`__main__` therefore represents the module being executed as the program's entry point.

---

# 10. `if __name__ == "__main__":`

This pattern is extremely common:

```python
def add(a, b):
    return a + b


if __name__ == "__main__":
    print(add(2, 3))
```

It means:

> Run this block only when the file is executed directly, not when it is imported.

For example:

```bash
python calculator.py
```

causes:

```python
__name__ == "__main__"
```

so the block executes.

But:

```python
import calculator
```

sets the module's name to something like `"calculator"`, so the block does not execute.

This allows a Python file to function both as:

1. a reusable module, and
2. a directly executable script.

---

# 11. Top-Level Code vs Function Code

Consider:

```python
print("Top level")

def hello():
    print("Inside function")
```

The first `print()` is top-level code and executes when the module is loaded.

The second `print()` is inside a function and executes only when:

```python
hello()
```

is called.

This distinction explains why importing a module can execute some code without executing every function inside it.

---

# 12. Import Caching and `sys.modules`

Python maintains an import cache in:

```python
sys.modules
```

Consider:

```python
# counter.py

print("Loading counter")
x = 10
```

Then:

```python
import counter

print(counter.x)

counter.x = 20

import counter

print(counter.x)
```

The output is:

```text
Loading counter
10
20
```

`"Loading counter"` appears only once.

Why?

The first import loads and executes `counter.py`, then the resulting module is stored in `sys.modules`.

When Python encounters another:

```python
import counter
```

it can find the existing module in the cache and reuse it rather than executing the file again.

Conceptually:

```text
First import
     ↓
counter not in sys.modules
     ↓
Load + execute
     ↓
Store module in sys.modules


Second import
     ↓
counter already exists
     ↓
Reuse module
```

This also explains why changing:

```python
counter.x = 20
```

does not get reset by the second import. Python is reusing the existing module object.

---

# 13. Names Point to Objects

One of the most important ideas behind import behavior is:

> **Names refer to objects.**

Suppose:

```python
import counter

a = counter
```

This does **not** create a second module.

Both names refer to the same object:

```text
counter ──┐
          ↓
     module object
          ↑
a ────────┘
```

Therefore:

```python
counter.x = 20

print(a.x)
print(counter.x)
print(a is counter)
```

produces:

```text
20
20
True
```

This is different from rebinding:

```python
a = 50
```

which simply changes what `a` refers to.

The distinction between **rebinding a name** and **modifying an object** becomes fundamental when learning Python's mutable objects, function arguments, copying, and classes.

---

# 14. Common Interview Traps

### Trap 1: "`import module` copies everything into my namespace."

False.

It binds the module to a name.

```python
import calculator

calculator.add(...)
```

### Trap 2: "Importing a module only defines its functions."

False.

Top-level statements execute during initial module loading.

### Trap 3: "Every import executes the module again."

Normally false within the same Python process because of `sys.modules`.

### Trap 4: "`__name__` is always the filename."

False.

It is `"__main__"` when the module is the program's entry point and normally the module's import name when imported.

### Trap 5: "Relative imports simply search the current filesystem directory."

Not quite.

They are resolved relative to the module's **package context**.

---

# Key Takeaways

The essential mental model is:

1. **Module** → usually a Python file containing code.
2. **Package** → organizes modules into a namespace/hierarchy.
3. `import module` → binds the module to a name.
4. `from module import name` → binds a particular object to a name.
5. Imports can execute module-level code.
6. `__name__` identifies how the module is being used.
7. `__name__ == "__main__"` means the module is being executed as the entry point.
8. `if __name__ == "__main__":` prevents entry-point code from running during normal imports.
9. `sys.modules` caches loaded modules.
10. Repeated imports normally reuse the same module object.
11. Names refer to objects; assignment can rebind a name without creating or copying an object.
12. Absolute imports specify the complete import path; relative imports resolve from the current package.

The next logical part of Python's module system is **circular imports**, where partially initialized modules and import order can produce surprising errors. Understanding the import model above makes circular imports much easier to reason about.
