---
title: "Python Interview Preparation — Scope & Lifetime"
date: "2026-08-28"
description: ""
tags: ["Python"]
---

# Python Interview Preparation — Scope & Lifetime

Scope and lifetime are two of the most frequently confused topics in Python interviews.

A useful mental model is:

> **Scope answers: “Where can this name be found?”**
> **Lifetime answers: “How long does the object/value remain alive?”**

Once you understand that distinction, `LEGB`, `global`, `nonlocal`, closures, and many tricky interview questions become much easier.

---

## 1. What Is a Name in Python?

Consider:

```python
x = 10
```

It is tempting to say:

> “The variable `x` contains 10.”

A more accurate Python model is:

> The **name** `x` refers to an **object** whose value is `10`.

Python variables are therefore better understood as **names bound to objects**.

```python
x = 10
y = x
```

Conceptually:

```text
x ──┐
    ├──> 10
y ──┘
```

This becomes important when discussing scope because **scope determines where a name can be resolved**.

---

# 2. The Four Main Python Scopes

Python's name resolution follows the **LEGB rule**:

```text
L → Local
E → Enclosing
G → Global
B → Built-in
```

Python searches for a name in that order.

## L — Local

The current function's namespace.

```python
x = "global"

def func():
    x = "local"
    print(x)

func()
```

Output:

```text
local
```

Python finds `x` immediately in the function's local scope.

---

## E — Enclosing

The scope of an outer function when you're inside a nested function.

```python
def outer():
    x = "outer"

    def inner():
        print(x)

    inner()

outer()
```

Output:

```text
outer
```

`inner()` doesn't have a local `x`, so Python searches the **enclosing** scope.

This is the basis of **closures**.

---

## G — Global

Names defined at the module level.

```python
x = "global"

def func():
    print(x)

func()
```

Output:

```text
global
```

The function doesn't have a local `x`, so Python eventually finds the module-level `x`.

---

## B — Built-in

Python's built-in namespace.

Examples include:

```python
print
len
sum
list
str
int
True
None
```

For example:

```python
def func():
    print(len([10, 20, 30]))

func()
```

There is no local `len`, no enclosing `len`, and no global `len`, so Python finds the built-in `len`.

---

# 3. The LEGB Rule

Consider:

```python
x = "global"

def outer():
    x = "enclosing"

    def inner():
        x = "local"
        print(x)

    inner()

outer()
```

Output:

```text
local
```

Why?

Python searches:

```text
Local       → x = "local"       ✓
Enclosing   → not needed
Global      → not needed
Built-in    → not needed
```

Now remove the local variable:

```python
x = "global"

def outer():
    x = "enclosing"

    def inner():
        print(x)

    inner()

outer()
```

Output:

```text
enclosing
```

Now remove the enclosing variable too:

```python
x = "global"

def outer():
    def inner():
        print(x)

    inner()

outer()
```

Output:

```text
global
```

And if there is no global `x`, Python eventually searches built-ins.

---

# 4. Scope Is About Names, Not Objects

This distinction is extremely important.

```python
x = 100

def func():
    x = 200
    print(x)

func()

print(x)
```

Output:

```text
200
100
```

There are two different bindings named `x`.

The local `x` does not replace the global `x`.

Conceptually:

```text
Global namespace:
x ──> 100

Local namespace of func():
x ──> 200
```

The same name can exist in multiple scopes.

---

# 5. Local Scope

A variable assigned inside a function is normally local to that function.

```python
def calculate():
    result = 42
    print(result)

calculate()
```

After the function finishes, the local name `result` is no longer accessible:

```python
print(result)
```

This raises:

```text
NameError
```

But be careful:

> The disappearance of a local **name** does not necessarily mean the underlying **object** immediately disappears.

More on that shortly.

---

# 6. Function Parameters Are Local Names

Parameters also belong to the function's local scope.

```python
def greet(name):
    print(name)

greet("Alice")
```

Here `name` is local to `greet`.

After the function returns:

```python
print(name)
```

causes:

```text
NameError
```

---

# 7. Local Scope Is Created When a Function Executes

Consider:

```python
def test():
    x = 10

print("before")
test()
print("after")
```

The local namespace associated with the function invocation exists while the function executes.

A useful conceptual model is:

```text
call test()
     ↓
create function execution context
     ↓
create local bindings
     ↓
execute body
     ↓
return
     ↓
local bindings normally become inaccessible
```

However, Python's actual implementation is more sophisticated than simply “create a dictionary and destroy it.”

For interviews, the conceptual model is usually sufficient unless the interviewer asks about CPython internals.

---

# 8. Enclosing Scope

Nested functions introduce the enclosing scope.

```python
def outer():
    message = "Hello"

    def inner():
        print(message)

    inner()

outer()
```

`message` belongs to `outer()` but is accessible inside `inner()`.

This is:

```text
Local of inner
      ↓
Enclosing outer
      ↓
Global
      ↓
Built-ins
```

---

# 9. `nonlocal`

Suppose you want an inner function to **modify** a variable belonging to an enclosing function.

This does not work:

```python
def outer():
    count = 0

    def inner():
        count += 1

    inner()

outer()
```

You get:

```text
UnboundLocalError
```

Why?

Because the assignment:

```python
count += 1
```

makes Python treat `count` as a **local variable of `inner()`**.

But then Python effectively needs to evaluate:

```python
count = count + 1
```

The local `count` hasn't been initialized yet.

Use `nonlocal`:

```python
def outer():
    count = 0

    def inner():
        nonlocal count
        count += 1

    inner()
    print(count)

outer()
```

Output:

```text
1
```

`nonlocal` means:

> “Use the variable from the nearest enclosing function scope rather than creating a new local binding.”

---

# 10. `nonlocal` Does Not Mean Global

This distinction is commonly tested.

```python
x = "global"

def outer():
    x = "outer"

    def inner():
        nonlocal x
        x = "changed"

    inner()
    print(x)

outer()
print(x)
```

Output:

```text
changed
global
```

`nonlocal x` modifies the nearest enclosing `x`.

It does **not** modify the global `x`.

---

# 11. `global`

The `global` keyword tells Python that an assignment should target the module-level variable.

```python
count = 0

def increment():
    global count
    count += 1

increment()
increment()

print(count)
```

Output:

```text
2
```

Without `global`:

```python
count = 0

def increment():
    count += 1
```

Python treats `count` as local because it is assigned inside the function.

That produces:

```text
UnboundLocalError
```

---

# 12. Reading a Global Variable Doesn't Require `global`

This is another interview favorite.

```python
x = 10

def show():
    print(x)

show()
```

Works perfectly.

You need `global` when you want to **rebind** the global name:

```python
x = 10

def change():
    global x
    x = 20
```

So:

```text
Reading global → usually no global keyword
Rebinding global → global required
```

---

# 13. Mutation vs Rebinding

This distinction is crucial.

Consider:

```python
items = []

def add_item():
    items.append(10)

add_item()

print(items)
```

Output:

```text
[10]
```

You don't need `global`.

Why?

Because you're **mutating the existing list**.

You are not rebinding the name `items`.

Compare:

```python
items = []

def replace_items():
    global items
    items = [10]
```

Here:

```python
items = [10]
```

rebinds the name `items`, so `global` is required.

### Remember

```text
Mutation:
items.append(10)

Rebinding:
items = [10]
```

They are not the same operation.

---

# 14. A Classic `UnboundLocalError` Trap

Look at this:

```python
x = 10

def test():
    print(x)
    x = 20

test()
```

Many candidates expect:

```text
10
```

But the result is:

```text
UnboundLocalError
```

Why?

Python determines that `x` is local to `test()` because of:

```python
x = 20
```

Therefore this:

```python
print(x)
```

tries to read the local `x` before it has a value.

Conceptually:

```python
def test():
    # x is considered local throughout this function
    print(x)   # local x hasn't been assigned yet
    x = 20
```

This is an important principle:

> **Python's scope decision is affected by assignment anywhere in the function body.**

---

# 15. `UnboundLocalError` vs `NameError`

Interviewers sometimes ask you to distinguish them.

### `NameError`

Python cannot find the name in any applicable scope.

```python
def test():
    print(x)

test()
```

If `x` doesn't exist anywhere:

```text
NameError
```

### `UnboundLocalError`

Python knows the name is local, but you attempted to use it before assigning a value.

```python
x = 10

def test():
    print(x)
    x = 20
```

Result:

```text
UnboundLocalError
```

`UnboundLocalError` is a subclass of `NameError`.

---

# 16. Global Scope Is Module Scope

People often say “global” as though it means “accessible everywhere.”

That's not quite accurate.

A global name is global **within a module**.

For example:

```python
# module_a.py

x = 10
```

Another module does not automatically get `x` as its own global name.

You would explicitly import it.

```python
from module_a import x
```

So a better statement is:

> A global variable belongs to the module namespace in which it was defined.

---

# 17. Built-in Scope

If Python cannot find a name in local, enclosing, or global scope, it searches the built-in namespace.

```python
def test():
    print(len([1, 2, 3]))

test()
```

`len` comes from built-ins.

You can inspect them:

```python
import builtins

print(builtins.len)
```

---

# 18. Shadowing Built-ins

Because built-ins participate in LEGB, you can accidentally hide them.

```python
len = 100

print(len)
```

Now:

```python
len([1, 2, 3])
```

fails because Python finds your global `len` before it reaches the built-in `len`.

Avoid names such as:

```text
list
str
int
sum
len
id
input
type
```

for ordinary variables.

This is called **shadowing**.

---

# 19. Shadowing

Shadowing occurs when an inner scope defines a name that already exists in an outer scope.

```python
x = "global"

def test():
    x = "local"
    print(x)

test()
```

The local `x` shadows the global `x`.

The global name still exists:

```python
print(x)
```

Output:

```text
global
```

Shadowing doesn't destroy the outer binding.

---

# 20. Name Resolution Is Dynamic During Execution

Consider:

```python
x = 10

def test():
    print(x)

x = 20

test()
```

Output:

```text
20
```

The function looks up the global `x` when `test()` executes.

The function definition didn't permanently capture the value `10`.

---

# 21. But Closures Capture Enclosing Bindings

Now consider:

```python
def outer():
    x = 10

    def inner():
        print(x)

    return inner

f = outer()
f()
```

Output:

```text
10
```

Even though `outer()` has returned, `inner()` still has access to `x`.

That's a **closure**.

The enclosing variable is retained because the returned function still needs it.

---

# 22. Lifetime: Scope vs Lifetime

Now we reach the second major concept.

### Scope

Where a name can be accessed.

### Lifetime

How long an object exists.

These are related but different.

Consider:

```python
def create():
    x = [1, 2, 3]
    return x

data = create()
```

The local name `x` disappears after `create()` returns.

But the list survives because:

```text
data ──> [1, 2, 3]
```

still refers to it.

Therefore:

> A local variable's lifetime as a **name** can end while the object's lifetime continues.

This is a subtle but important distinction.

---

# 23. Python Uses References

Suppose:

```python
def test():
    x = [1, 2, 3]
    return x

result = test()
```

Conceptually:

During execution:

```text
x ──────┐
        ↓
     [1,2,3]
```

After returning:

```text
result ──> [1,2,3]
```

The local name `x` disappears, but the list remains reachable.

Python's memory management is based primarily on **reference counting in CPython**, supplemented by a **cyclic garbage collector**.

For interview purposes:

> An object generally remains alive while it is reachable/referenced; when it becomes unreachable, it becomes eligible for garbage collection.

Avoid claiming that “the object is destroyed exactly when the function ends.” That's not generally correct.

---

# 24. Object Lifetime and Garbage Collection

Example:

```python
x = [1, 2, 3]

y = x

del x
```

Does the list disappear?

No.

`y` still references it.

```text
y ──> [1, 2, 3]
```

Only when the object becomes unreachable can it be reclaimed.

---

# 25. Function Lifetime

A function object itself can outlive the execution of the code that created it.

For example:

```python
def outer():
    def inner():
        return 42

    return inner

f = outer()
```

`outer()` has finished executing, but the function object returned as `f` still exists.

Therefore:

```python
f()
```

works.

---

# 26. Closures and Lifetime

Closures make lifetime especially interesting.

```python
def counter():
    count = 0

    def increment():
        nonlocal count
        count += 1
        return count

    return increment

c = counter()

print(c())
print(c())
print(c())
```

Output:

```text
1
2
3
```

`counter()` already returned.

So where is `count`?

The returned function retains access to its enclosing state.

Conceptually:

```text
c
│
└──> increment()
       │
       └──> count = 3
```

This is one of the most useful examples for understanding the relationship between **scope, closures, and lifetime**.

---

# 27. A Scope Diagram Worth Memorizing

For a nested function:

```python
x = "G"

def outer():
    x = "E"

    def inner():
        x = "L"
        print(x)
```

Think:

```text
inner()
  │
  ├── L: x = "L"
  │
  ├── E: x = "E"
  │
  ├── G: x = "G"
  │
  └── B: built-ins
```

Python stops at the first matching name.

---

# 28. `global` vs `nonlocal`

Memorize this comparison:

| Keyword    | Refers to                        |
| ---------- | -------------------------------- |
| `global`   | Module/global scope              |
| `nonlocal` | Nearest enclosing function scope |

Example:

```python
x = "global"

def outer():
    x = "outer"

    def inner():
        nonlocal x
        x = "changed"

    inner()
    print(x)

outer()
print(x)
```

Output:

```text
changed
global
```

---

# 29. `global` Cannot Refer to an Enclosing Function Variable

This is invalid conceptually:

```python
def outer():
    x = 10

    def inner():
        global x
        x = 20
```

`global x` means:

> Find/use the module-level `x`.

It does not mean:

> Find whichever `x` exists somewhere outside me.

For the latter, use:

```python
nonlocal x
```

---

# 30. Class Scope Is a Special Interview Trap

Python's class namespace can surprise people.

```python
x = "global"

class Test:
    x = "class"

    def method(self):
        print(x)

Test().method()
```

What happens?

Output:

```text
global
```

Many candidates expect:

```text
class
```

But the class body is not simply an enclosing function scope for methods.

The method's lookup does **not** search the class namespace as an enclosing scope.

Instead, `x` is resolved through the method's:

```text
Local → Enclosing function scopes → Global → Built-in
```

The class namespace is accessed through the instance/class, such as:

```python
self.x
```

or:

```python
Test.x
```

---

# 31. Another Class-Scope Trap

This works:

```python
class Test:
    x = 10
    print(x)
```

The class body can directly use `x`.

But this:

```python
class Test:
    x = 10

    def method(self):
        print(x)
```

does not use `Test.x`.

Use:

```python
def method(self):
    print(self.x)
```

or:

```python
print(Test.x)
```

---

# 32. `for` Loops Do Not Create Scope

This surprises programmers coming from some other languages.

```python
for i in range(3):
    pass

print(i)
```

Output:

```text
2
```

The loop does not create a new scope.

Similarly:

```python
if True:
    x = 10

print(x)
```

works.

Python generally creates scopes for constructs such as:

* functions
* classes
* modules
* comprehensions (with important details)

but not ordinary `if`, `for`, or `while` blocks.

---

# 33. List Comprehensions Have Their Own Scope

Python 3 behaves differently from old Python 2 behavior.

```python
x = 10

values = [x for x in range(3)]

print(x)
```

Output:

```text
10
```

The comprehension's iteration variable does not leak into the surrounding scope.

This is a useful interview fact.

---

# 34. Mutable Default Arguments: A Scope/Lifetime Trap

Consider:

```python
def add_item(item, items=[]):
    items.append(item)
    return items

print(add_item(1))
print(add_item(2))
print(add_item(3))
```

Output:

```text
[1]
[1, 2]
[1, 2, 3]
```

Why?

The default argument is evaluated when the function is **defined**, not every time it is called.

So the same list is reused.

A safer pattern is:

```python
def add_item(item, items=None):
    if items is None:
        items = []

    items.append(item)
    return items
```

This is simultaneously a **lifetime**, **object identity**, and **function-definition-time evaluation** question.

---

# 35. Late Binding in Closures

One of Python's most famous interview traps:

```python
functions = []

for i in range(3):
    functions.append(lambda: i)

for f in functions:
    print(f())
```

Output:

```text
2
2
2
```

Why?

The lambdas don't capture the current value of `i`.

They refer to the variable `i`, which is looked up later.

By the time the functions execute:

```text
i == 2
```

So all three return `2`.

---

# 36. Fixing Late Binding

Use a default argument:

```python
functions = []

for i in range(3):
    functions.append(lambda i=i: i)

for f in functions:
    print(f())
```

Output:

```text
0
1
2
```

Here the current value is stored as the function's default argument at function creation time.

This is a very common interview question.

---

# 37. LEGB Doesn't Mean “Search Everywhere”

Suppose:

```python
class A:
    value = 100

    def method(self):
        print(value)
```

Python does not search:

```text
Local
Enclosing
Class
Global
Built-in
```

The simplified model is:

```text
Local
Enclosing
Global
Built-in
```

The class namespace is not inserted into LEGB for a method body.

That's why `self.value` matters.

---

# 38. `locals()` and `globals()`

Python provides introspection functions.

```python
x = 10

def test():
    y = 20

    print(locals())
    print(globals())

test()
```

`locals()` gives a representation of the current local namespace.

`globals()` gives the module's global namespace.

For interview purposes, know that they are useful for **inspection**, but don't build ordinary application logic around modifying the dictionaries returned by `locals()`.

---

# 39. Scope and Assignment

A useful rule:

> If Python sees an assignment to a name anywhere inside a function, that name is generally treated as local to that function unless declared `global` or `nonlocal`.

Examples of assignment include:

```python
x = 10
x += 1
x -= 1
x *= 2
```

and unpacking:

```python
a, b = 1, 2
```

This is why seemingly harmless code can produce `UnboundLocalError`.

---

# 40. `del` and Name Binding

Consider:

```python
x = 10

def test():
    global x
    del x

test()

print(x)
```

The global name `x` has been removed.

The exact behavior of `del` is worth understanding:

> `del x` removes the binding of the name `x` from the relevant namespace.

It doesn't necessarily mean “immediately destroy the object.”

Again:

```text
name lifetime ≠ object lifetime
```

---

# 41. Interview Trap: `global` Doesn't Make an Object Global

This:

```python
def test():
    global x
    x = []
```

makes the **name** `x` global.

It does not transform the list into some special “global object.”

The object is simply reachable through a global name.

---

# 42. Interview Trap: Scope Isn't the Same as Visibility

Don't say:

> “A variable is alive only while it is in scope.”

That's too simplistic.

For example:

```python
def outer():
    x = 10

    def inner():
        return x

    return inner
```

`outer` has returned, but `x` remains accessible through the closure.

A better statement is:

> Scope describes where a name can be resolved; lifetime describes how long the associated object/state remains available.

---

# 43. A Practical Mental Model

When solving scope questions, ask these questions in order:

### Step 1 — Where is the name assigned?

Look for:

```python
=
+=
-=
for ...
import ...
```

### Step 2 — Is the current function assigning it?

If yes, it is usually local unless `global`/`nonlocal` changes that.

### Step 3 — If not local, search outward

Follow:

```text
Local → Enclosing → Global → Built-in
```

### Step 4 — Is it a class attribute?

If so, don't expect normal method lookup to find it through LEGB.

Think:

```python
self.x
ClassName.x
```

### Step 5 — Is the question actually about object lifetime?

Look at references:

```text
Who still points to the object?
```

---

# Tricky Output Questions

Try solving these **before looking at the answers**.

---

## Question 1

```python
x = 10

def func():
    x = 20
    print(x)

func()
print(x)
```

What is the output?

---

## Question 2

```python
x = 10

def func():
    print(x)
    x = 20

func()
```

What happens?

---

## Question 3

```python
x = 10

def outer():
    x = 20

    def inner():
        print(x)

    inner()

outer()
```

Output?

---

## Question 4

```python
x = 10

def outer():
    x = 20

    def inner():
        nonlocal x
        x += 5

    inner()
    print(x)

outer()
print(x)
```

Output?

---

## Question 5

```python
x = 10

def outer():
    def inner():
        global x
        x = 99

    inner()

outer()
print(x)
```

Output?

---

## Question 6

```python
x = 10

def func():
    global x
    x = 20

func()

print(x)
```

Output?

---

## Question 7

```python
items = []

def func():
    items.append(1)

func()

print(items)
```

Does this require `global`?

---

## Question 8

```python
items = []

def func():
    items = items + [1]

func()
```

What happens?

---

## Question 9

```python
functions = []

for i in range(3):
    functions.append(lambda: i)

for f in functions:
    print(f())
```

Output?

---

## Question 10

```python
functions = []

for i in range(3):
    functions.append(lambda i=i: i)

for f in functions:
    print(f())
```

Output?

---

## Question 11

```python
x = "global"

class Demo:
    x = "class"

    def show(self):
        print(x)

Demo().show()
```

What is printed?

---

## Question 12

```python
def make():
    x = [1, 2, 3]

    def get():
        return x

    return get

f = make()

print(f())
```

After `make()` has returned, how can `x` still exist?

---

# Answers & Explanations

### 1.

```text
20
10
```

The local `x` shadows the global `x`.

---

### 2.

```text
UnboundLocalError
```

The assignment makes `x` local to `func()`, so `print(x)` attempts to read an uninitialized local.

---

### 3.

```text
20
```

`inner()` finds `x` in its enclosing scope.

---

### 4.

```text
25
10
```

`nonlocal x` modifies `outer()`'s `x`, not the global `x`.

---

### 5.

```text
99
```

`global x` explicitly targets the module-level `x`.

---

### 6.

```text
20
```

The function rebinds the global name.

---

### 7.

No.

The list is mutated rather than the name being rebound.

---

### 8.

```text
UnboundLocalError
```

The assignment causes `items` to be treated as local.

Conceptually:

```python
items = items + [1]
```

requires reading the local `items` before it has been assigned.

---

### 9.

```text
2
2
2
```

The lambdas use late binding of the loop variable.

---

### 10.

```text
0
1
2
```

Each lambda gets its own default argument value.

---

### 11.

```text
global
```

The class namespace isn't an enclosing scope for the method.

---

### 12.

Because `get()` forms a **closure** over `x`.

The returned function retains access to the enclosing variable.

---

# Coding Exercises

## Exercise 1 — Fix the Counter

This code fails:

```python
count = 0

def increment():
    count += 1

increment()
increment()

print(count)
```

**Task:** Fix it using `global`.

Then explain why the original produces `UnboundLocalError`.

---

## Exercise 2 — Closure Counter

Create:

```python
def make_counter():
    ...
```

It should return a function such that:

```python
counter = make_counter()

print(counter())  # 1
print(counter())  # 2
print(counter())  # 3
```

Requirements:

* use a nested function
* use `nonlocal`
* don't use a global variable

---

## Exercise 3 — Avoid Mutable Default Arguments

Fix:

```python
def add_item(item, items=[]):
    items.append(item)
    return items
```

The following should produce independent lists:

```python
print(add_item(1))
print(add_item(2))
```

Expected:

```text
[1]
[2]
```

---

## Exercise 4 — Fix Late Binding

Make this print:

```text
0
1
2
```

instead of:

```text
2
2
2
```

```python
functions = []

for i in range(3):
    functions.append(lambda: i)

for f in functions:
    print(f())
```

Try solving it in **two different ways**.

---

## Exercise 5 — Predict Before Running

Without executing the code, determine the output:

```python
x = 1

def outer():
    x = 2

    def middle():
        x = 3

        def inner():
            print(x)

        inner()

    middle()

outer()
```

Then modify it so that `inner()` prints `2`.

---

# Interview-Level Challenge

Consider:

```python
x = "global"

def outer():
    x = "outer"

    def inner():
        print(x)

    x = "changed"
    return inner

f = outer()
f()
```

### Question

What does it print?

Don't answer too quickly.

The important insight is that the closure refers to the **enclosing binding**, and that binding was changed before `outer()` returned.

---

# A Second Challenge

What happens here?

```python
def outer():
    x = 10

    def inner():
        print(x)
        x = 20

    inner()

outer()
```

Why isn't Python allowed to simply use `x = 10` from the enclosing scope?

Explain the role of the assignment inside `inner()`.

---

# Scope Interview Cheat Sheet

Before an interview, remember these rules:

```text
LEGB
│
├── L = Local
├── E = Enclosing
├── G = Global
└── B = Built-in
```

### `global`

```python
global x
```

Means:

> Rebind the module-level `x`.

### `nonlocal`

```python
nonlocal x
```

Means:

> Rebind the nearest enclosing-function `x`.

### Mutation

```python
items.append(1)
```

Does not require `global` merely because `items` is global.

### Rebinding

```python
items = []
```

Requires `global` if the intention is to modify the global binding.

### Assignment inside a function

Usually makes the name local:

```python
x = ...
```

unless `global` or `nonlocal` says otherwise.

### `UnboundLocalError`

Usually means:

> “Python considers this name local, but you're trying to use it before assigning it.”

### Lifetime

Don't confuse:

```text
scope of a name
```

with:

```text
lifetime of an object
```

### Closure

A nested function can retain access to variables from its enclosing scope even after the outer function returns.

### Class scope

A class namespace is **not** simply another LEGB level for methods.

Use:

```python
self.x
ClassName.x
```

when you mean a class/instance attribute.

---

# Final Test — No Answers Yet

Let's make this your interview test.

**Do not run the code.** Give me the output or exception and explain *why*.

### Test 1

```python
x = 5

def f():
    print(x)

x = 10
f()
```

### Test 2

```python
x = 5

def f():
    print(x)
    x = 10

f()
```

### Test 3

```python
def outer():
    x = 10

    def inner():
        nonlocal x
        x += 1
        return x

    return inner

f = outer()

print(f())
print(f())
```

### Test 4

```python
x = 100

def outer():
    x = 200

    def inner():
        global x
        x = 300

    inner()
    print(x)

outer()
print(x)
```

### Test 5

```python
funcs = []

for i in range(3):
    funcs.append(lambda: i)

print([f() for f in funcs])
```

### Test 6 — Hard

```python
x = "global"

def outer():
    x = "outer"

    def inner():
        print(x)

    x = "changed"
    return inner

f = outer()
f()
```

### Test 7 — Very Hard

```python
x = 10

def outer():
    x = 20

    def inner():
        print(x)
        x = 30

    inner()

outer()
```

### Test 8 — Lifetime

```python
def create():
    data = [1, 2, 3]

    def get_data():
        return data

    return get_data

f = create()

print(f())
```

**Your task:** Answer Tests 1–8 without running them. For each one, give:

1. **Output/exception**
2. **Which scope Python searches**
3. **Why**
4. **Whether `global` or `nonlocal` would change the result, if relevant**

Send me your answers, and I'll grade them like a Python interviewer—then give you a harder round involving **closures, comprehensions, class scope, `exec`, and tricky name resolution**.
