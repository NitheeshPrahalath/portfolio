---
title: "Python Interview Preparation - Functions"
date: "2026-08-16"
description: ""
tags: ["Python"]
---

Absolutely. We’ll treat this like a **progressive Python interview course**: learn a concept → see examples → learn traps → solve questions → **you answer a test → only then move to the next level**.

# Python Functions: Beginner → Intermediate Interview Level

## Roadmap

We’ll cover these in order:

1. Defining functions
2. Parameters and arguments
3. Return values
4. Positional vs keyword arguments
5. Default arguments
6. `*args`
7. `**kwargs`
8. Scope
9. Recursion
10. Lambda functions
11. First-class functions
12. Common interview traps
13. Output-based questions
14. Coding problems
15. Progressive interview exercises

---

# 1. What is a function?

A **function** is a reusable block of code that performs a particular task.

Instead of writing:

```python
print("Hello")
print("Hello")
print("Hello")
```

we can define a function:

```python
def say_hello():
    print("Hello")
```

Then call it:

```python
say_hello()
say_hello()
say_hello()
```

Output:

```text
Hello
Hello
Hello
```

### Basic syntax

```python
def function_name():
    # code
```

For example:

```python
def greet():
    print("Welcome!")
```

Calling:

```python
greet()
```

### Interview point

**Defining** a function does not execute it.

```python
def greet():
    print("Hello")

print("Python")
```

Output:

```text
Python
```

The function only runs when called:

```python
greet()
```

---

# 2. Parameters and Arguments

These two words are frequently tested in interviews.

### Parameter

A variable written in the function definition is a **parameter**.

```python
def greet(name):
    print("Hello", name)
```

Here, `name` is a parameter.

### Argument

The actual value passed when calling the function is an **argument**.

```python
greet("Rahul")
```

Here, `"Rahul"` is an argument.

Think:

> **Parameter = placeholder**
> **Argument = actual value**

Example:

```python
def add(a, b):
    print(a + b)

add(10, 20)
```

`a` and `b` → parameters
`10` and `20` → arguments

---

# 3. Return values

This is extremely important for interviews.

Consider:

```python
def add(a, b):
    print(a + b)
```

Calling:

```python
result = add(10, 20)
print(result)
```

Output:

```text
30
None
```

Why?

Because `print()` displays a value but doesn't return that value from the function.

Instead:

```python
def add(a, b):
    return a + b
```

Now:

```python
result = add(10, 20)
print(result)
```

Output:

```text
30
```

### `return` does two things

It:

1. Sends a value back to the caller.
2. Immediately exits the function.

Example:

```python
def test():
    return 10
    print("Hello")

print(test())
```

Output:

```text
10
```

`print("Hello")` never executes.

---

# 4. `print()` vs `return()` — interview trap

Very common question:

```python
def square(x):
    print(x * x)

result = square(5)
print(result)
```

Output:

```text
25
None
```

But:

```python
def square(x):
    return x * x

result = square(5)
print(result)
```

Output:

```text
25
```

### Remember

```text
print → displays something
return → gives something back
```

---

# 5. Positional arguments

Arguments can be passed according to their position.

```python
def introduce(name, age):
    print(name, age)

introduce("Alice", 25)
```

Python matches:

```text
name → "Alice"
age  → 25
```

because of their positions.

But:

```python
introduce(25, "Alice")
```

means:

```text
name → 25
age  → "Alice"
```

Python doesn't know your intended meaning. It simply follows the order.

---

# 6. Keyword arguments

Instead of relying on position, specify the parameter name.

```python
def introduce(name, age):
    print(name, age)

introduce(age=25, name="Alice")
```

Output:

```text
Alice 25
```

The order doesn't matter when using keyword arguments.

You can also mix them:

```python
introduce("Alice", age=25)
```

This is valid.

But this is invalid:

```python
introduce(name="Alice", 25)
```

### Interview rule

Once you use a keyword argument, you cannot put a positional argument after it.

Invalid:

```python
function(a=10, 20)
```

Valid:

```python
function(10, b=20)
```

---

# 7. Default arguments

You can give a parameter a default value.

```python
def greet(name="Guest"):
    print("Hello", name)
```

Now:

```python
greet()
```

Output:

```text
Hello Guest
```

And:

```python
greet("Alice")
```

Output:

```text
Hello Alice
```

The provided argument overrides the default.

### Another example

```python
def power(number, exponent=2):
    return number ** exponent

print(power(5))
print(power(5, 3))
```

Output:

```text
25
125
```

---

# 8. Important default-argument trap

Look at this:

```python
def test(a=10, b):
    print(a, b)
```

This gives a **SyntaxError**.

Why?

A parameter without a default value cannot come after one with a default value.

Invalid:

```python
def test(a=10, b):
```

Valid:

```python
def test(a, b=10):
```

You can have multiple defaults:

```python
def test(a=10, b=20):
    print(a, b)
```

---

# 9. `*args`

Sometimes you don't know how many positional arguments the function will receive.

Use `*args`.

```python
def add(*args):
    print(args)
```

Now:

```python
add(1, 2, 3)
```

Output:

```text
(1, 2, 3)
```

Notice something important:

**`args` is a tuple.**

```python
def add(*args):
    print(type(args))

add(1, 2, 3)
```

Output:

```text
<class 'tuple'>
```

You can iterate over it:

```python
def add(*args):
    total = 0

    for number in args:
        total += number

    return total

print(add(1, 2, 3, 4))
```

Output:

```text
10
```

### Important

The name `args` isn't special.

This also works:

```python
def add(*numbers):
    print(numbers)
```

The `*` is what matters.

---

# 10. `**kwargs`

`**kwargs` collects an arbitrary number of **keyword arguments**.

```python
def show_info(**kwargs):
    print(kwargs)
```

Calling:

```python
show_info(name="Alice", age=25, city="Delhi")
```

Output:

```text
{'name': 'Alice', 'age': 25, 'city': 'Delhi'}
```

`kwargs` is a dictionary.

```python
def show_info(**kwargs):
    print(type(kwargs))
```

Output:

```text
<class 'dict'>
```

Again, the name doesn't matter:

```python
def show_info(**data):
    print(data)
```

The `**` is what matters.

---

# 11. `*args` vs `**kwargs`

This is worth memorizing:

| Syntax     | Collects             | Type       |
| ---------- | -------------------- | ---------- |
| `*args`    | positional arguments | tuple      |
| `**kwargs` | keyword arguments    | dictionary |

Example:

```python
def demo(*args, **kwargs):
    print(args)
    print(kwargs)

demo(10, 20, name="Alice", age=25)
```

Output:

```text
(10, 20)
{'name': 'Alice', 'age': 25}
```

---

# 12. Scope

**Scope** determines where a variable can be accessed.

The most important levels for beginners/intermediate interviews are:

* Local
* Global
* Enclosing
* Built-in

This is often summarized as **LEGB**.

## Local

```python
def test():
    x = 10
    print(x)

test()
```

`x` exists inside the function.

This won't work:

```python
def test():
    x = 10

test()
print(x)
```

`x` is local to `test()`.

---

# 13. Global variables

```python
x = 100

def test():
    print(x)

test()
```

Output:

```text
100
```

The function can read the global variable.

But modifying it is different.

```python
x = 10

def test():
    x = 20

test()

print(x)
```

Output:

```text
10
```

The `x = 20` creates a **local variable**.

It doesn't modify the global `x`.

---

# 14. The `global` keyword

If you really want to modify a global variable:

```python
x = 10

def test():
    global x
    x = 20

test()

print(x)
```

Output:

```text
20
```

### Interview warning

Using `global` is usually something to use carefully. It can make programs harder to understand and maintain.

---

# 15. Recursion

A function calling itself is called **recursion**.

Example:

```python
def countdown(n):
    if n == 0:
        return

    print(n)
    countdown(n - 1)

countdown(3)
```

Output:

```text
3
2
1
```

A recursive function normally needs:

1. **Base case** — tells it when to stop.
2. **Recursive case** — calls itself with a smaller/simpler problem.

Without a base case:

```python
def test():
    test()
```

the function keeps calling itself until Python raises a `RecursionError`.

---

# 16. Classic recursion problem: factorial

Mathematically:

```text
5! = 5 × 4 × 3 × 2 × 1
```

Recursive definition:

```text
5! = 5 × 4!
```

Python:

```python
def factorial(n):
    if n == 0:
        return 1

    return n * factorial(n - 1)
```

Then:

```python
print(factorial(5))
```

Output:

```text
120
```

Think through it:

```text
factorial(5)
5 × factorial(4)
5 × 4 × factorial(3)
5 × 4 × 3 × factorial(2)
5 × 4 × 3 × 2 × factorial(1)
5 × 4 × 3 × 2 × 1 × factorial(0)
```

Then the base case returns `1`.

---

# 17. Lambda functions

A lambda is a small anonymous function.

Normal function:

```python
def square(x):
    return x * x
```

Lambda:

```python
square = lambda x: x * x
```

Then:

```python
print(square(5))
```

Output:

```text
25
```

Syntax:

```python
lambda parameters: expression
```

Example:

```python
add = lambda a, b: a + b

print(add(3, 4))
```

Output:

```text
7
```

### Lambda limitation

A lambda contains a **single expression**.

For example:

```python
lambda x: x * 2
```

is fine.

For larger/multi-step logic, a normal `def` function is generally clearer.

---

# 18. First-class functions

This sounds complicated but the idea is simple:

> In Python, functions are objects.

Therefore, you can:

* assign a function to a variable
* pass a function to another function
* return a function from another function
* store functions in data structures

Example:

```python
def greet():
    return "Hello"

x = greet

print(x())
```

Output:

```text
Hello
```

Notice:

```python
x = greet
```

not:

```python
x = greet()
```

The first stores the **function itself**.

The second calls the function and stores its result.

This distinction is a major interview trap.

---

# 19. Passing functions as arguments

Example:

```python
def square(x):
    return x * x

def apply_function(func, value):
    return func(value)

print(apply_function(square, 5))
```

Output:

```text
25
```

Here:

```python
square
```

is passed as an argument.

This is possible because functions are first-class objects.

---

# 20. A useful connection: `map()`

First-class functions become useful with functions like `map()`.

```python
numbers = [1, 2, 3, 4]

result = map(lambda x: x * 2, numbers)

print(list(result))
```

Output:

```text
[2, 4, 6, 8]
```

The lambda is passed into `map()`.

---

# Common Interview Traps

### Trap 1 — `print` vs `return`

```python
def test():
    print(10)

x = test()
print(x)
```

Output:

```text
10
None
```

---

### Trap 2 — Calling vs referencing a function

```python
def greet():
    return "Hello"

a = greet
b = greet()

print(a)
print(b)
```

`a` contains the function object.

`b` contains `"Hello"`.

---

### Trap 3 — Mutable default arguments

This is a classic intermediate interview question:

```python
def add_item(item, items=[]):
    items.append(item)
    return items

print(add_item(1))
print(add_item(2))
print(add_item(3))
```

Many beginners expect:

```text
[1]
[2]
[3]
```

But the actual output is:

```text
[1]
[1, 2]
[1, 2, 3]
```

Why?

The default list is created **once**, not freshly every time the function is called.

A safer pattern is:

```python
def add_item(item, items=None):
    if items is None:
        items = []

    items.append(item)
    return items
```

This is a **very common Python interview trap**.

---

# Progressive Coding Problems

Don't solve all of these yet. We'll use them as checkpoints.

### Level 1 — Beginner

**Problem 1**

Write a function:

```python
is_even(n)
```

that returns `True` if `n` is even and `False` otherwise.

---

### Problem 2

Write:

```python
find_max(a, b)
```

without using Python's built-in `max()`.

Example:

```python
find_max(10, 20)
```

should return:

```text
20
```

---

### Problem 3

Write:

```python
count_vowels(text)
```

that returns the number of vowels in a string.

Example:

```python
count_vowels("python programming")
```

---

# Level 2 — Parameters and `*args`

### Problem 4

Write:

```python
sum_all(*args)
```

Example:

```python
sum_all(1, 2, 3, 4)
```

Expected:

```text
10
```

---

### Problem 5

Write:

```python
student_info(**kwargs)
```

that prints all supplied student information.

Example:

```python
student_info(name="John", age=21, course="Python")
```

---

# Level 3 — Recursion

### Problem 6

Write a recursive function:

```python
factorial(n)
```

---

### Problem 7

Write a recursive function:

```python
sum_digits(n)
```

Example:

```python
sum_digits(1234)
```

Expected:

```text
10
```

---

# Level 4 — First-class functions

### Problem 8

Create:

```python
apply_operation(func, a, b)
```

so this works:

```python
apply_operation(lambda x, y: x + y, 10, 20)
```

and returns:

```text
30
```

---

# 🧪 TEST 1 — Do not look for the answers

Before we continue to harder topics, **you need to pass this test**.

Answer all 10 questions. You can write just the answers; explanations are optional.

### Q1

What is the difference between a **parameter** and an **argument**?

---

### Q2 — Output

```python
def greet(name):
    return "Hello " + name

x = greet("Sam")
print(x)
```

What is the output?

---

### Q3 — Output

```python
def test():
    print("A")

x = test()
print(x)
```

What is the output?

---

### Q4 — Output

```python
def add(a, b=10):
    return a + b

print(add(5))
print(add(5, 20))
```

What is the output?

---

### Q5

Is this valid Python?

```python
def test(a=10, b):
    return a + b
```

If not, why?

---

### Q6 — Output

```python
def show(*args):
    print(type(args))
    print(args)

show(1, 2, 3)
```

What is the output?

---

### Q7 — Output

```python
def show(**kwargs):
    print(type(kwargs))
    print(kwargs)

show(name="Alice", age=25)
```

What is the output?

---

### Q8 — Scope

What does this print?

```python
x = 10

def test():
    x = 20

test()
print(x)
```

---

### Q9 — Recursion

What is the **base case** in this function?

```python
def countdown(n):
    if n == 0:
        return

    print(n)
    countdown(n - 1)
```

---

### Q10 — Interview trap

What is the difference between:

```python
x = greet
```

and:

```python
x = greet()
```

---

## 🎯 Your task

Reply with your answers to **Q1–Q10**.

I'll **grade them like a Python interview**, explain every mistake, and then—depending on your score—move you to the next section with harder output questions involving `*args`, `**kwargs`, scope, recursion, lambdas, and first-class functions.
