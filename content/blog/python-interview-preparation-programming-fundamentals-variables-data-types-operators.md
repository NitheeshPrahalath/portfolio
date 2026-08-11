---
title: "Python Interview Preparation — Programming Fundamentals: Variables, Data Types & Operators"
date: "2026-08-11"
description: ""
tags: ["Python"]
---

Perfect. We'll use **Python**, target an **intermediate interview level**, and build from fundamentals upward.

I’ll treat this like a real course: **concept → mental model → Python examples → interview traps → exercises → interview questions**. We won't just memorize definitions.

# Python Interview Preparation — Part 1

## Programming Fundamentals

We'll begin with the foundation:

> **Variables → Objects & Types → Operators → Expressions → Conditionals → Loops → Functions → Scope → Exceptions → I/O → Modules → Debugging**

Today, let's establish the first three properly:

1. Variables and constants
2. Python's data types
3. Operators and expressions

---

# 1. Variables

A variable is a **name that refers to an object**.

For example:

```python
age = 25
```

A beginner might think:

> "The variable `age` contains 25."

That's a useful simplification, but Python's actual model is closer to:

```text
age ───────► 25
             int object
```

The name `age` refers to an object whose value is `25`.

This distinction becomes **very important in Python interviews**, especially when discussing:

* mutable vs immutable objects
* assignment
* references
* function arguments
* shallow/deep copies
* `is` vs `==`

---

## 1.1 Assignment

```python
x = 10
```

Python evaluates the right-hand side first:

```text
10
```

and then associates the name `x` with that object.

You can then do:

```python
x = 20
```

Now:

```text
x ─────► 20
```

The name `x` is no longer associated with the previous object.

---

# 2. Python is dynamically typed

Consider:

```python
x = 10
```

Then:

```python
x = "hello"
```

Then:

```python
x = [1, 2, 3]
```

This is valid Python.

Why?

Because **the name doesn't have a permanently fixed type**.

The objects have types.

```python
x = 10
print(type(x))      # int

x = "hello"
print(type(x))      # str
```

So Python is **dynamically typed**.

### Interview question

**Q: Is Python dynamically typed or statically typed?**

Answer:

> Python is dynamically typed because variable names aren't required to have a fixed type; the type is associated with the object referenced at runtime.

---

# 3. Variables don't need declarations

In languages such as Java, you might write:

```java
int age = 25;
```

Python:

```python
age = 25
```

You don't explicitly declare:

```python
int age
```

Python determines the type at runtime.

---

# 4. Naming variables

Good:

```python
age = 25
user_name = "Alice"
total_price = 1000
is_authenticated = True
```

Avoid:

```python
a = 25
x = "Alice"
t = 1000
```

unless the meaning is obvious from context.

Python convention is **snake_case**:

```python
first_name = "John"
account_balance = 5000
```

Constants are conventionally written in uppercase:

```python
MAX_RETRIES = 3
PI = 3.14159
```

But here's an important interview point:

## Python doesn't have true enforced constants

This:

```python
MAX_RETRIES = 3
```

doesn't prevent:

```python
MAX_RETRIES = 10
```

Uppercase is a **convention**, communicating:

> "Please don't change this."

---

# 5. Multiple assignment

Python allows:

```python
x, y = 10, 20
```

Equivalent conceptually to:

```python
x = 10
y = 20
```

You can also do:

```python
a = b = c = 0
```

All three names refer to the same object.

---

# 6. Swapping variables

Python makes swapping extremely easy:

```python
a = 10
b = 20

a, b = b, a
```

Now:

```text
a = 20
b = 10
```

You don't need:

```python
temp = a
a = b
b = temp
```

This is a very common Python interview question.

---

# 7. Data Types

The fundamental built-in types you should know are:

| Type       | Example     | Mutable? |
| ---------- | ----------- | -------- |
| `int`      | `10`        | No       |
| `float`    | `3.14`      | No       |
| `complex`  | `2 + 3j`    | No       |
| `bool`     | `True`      | No       |
| `str`      | `"hello"`   | No       |
| `list`     | `[1, 2, 3]` | **Yes**  |
| `tuple`    | `(1, 2, 3)` | No       |
| `set`      | `{1, 2, 3}` | **Yes**  |
| `dict`     | `{"a": 1}`  | **Yes**  |
| `NoneType` | `None`      | No       |

This table is worth knowing extremely well.

---

# 8. Numbers

## Integer

```python
age = 25
count = -10
```

Type:

```python
type(age)
```

returns:

```text
<class 'int'>
```

Python integers can grow very large, limited primarily by available memory.

---

## Float

```python
price = 99.99
temperature = 36.5
```

```python
type(price)
```

→ `float`

### Important interview trap: floating-point precision

Don't assume:

```python
0.1 + 0.2 == 0.3
```

will necessarily be true.

```python
print(0.1 + 0.2)
```

may produce:

```text
0.30000000000000004
```

This happens because many decimal fractions cannot be represented exactly using binary floating-point representation.

For financial calculations, you may use `decimal.Decimal`.

---

# 9. Boolean

Python has:

```python
True
False
```

Notice the capital letters.

```python
is_logged_in = True
is_admin = False
```

Boolean values are commonly produced by comparisons:

```python
age >= 18
```

which produces either:

```python
True
```

or:

```python
False
```

---

# 10. Strings

A string represents text:

```python
name = "Alice"
```

You can use:

```python
"hello"
'hello'
```

Both are strings.

### Strings are immutable

This is extremely important.

You cannot directly modify an individual character:

```python
name = "Alice"
name[0] = "B"
```

This raises an error.

Instead, you create a new string:

```python
name = "B" + name[1:]
```

Result:

```text
Blice
```

---

# 11. Lists

A list is an **ordered, mutable collection**.

```python
numbers = [10, 20, 30]
```

You can modify it:

```python
numbers[0] = 100
```

Now:

```python
[100, 20, 30]
```

You can add:

```python
numbers.append(40)
```

Remove:

```python
numbers.remove(20)
```

Lists can contain different types:

```python
items = [10, "hello", True, 3.14]
```

Although in production code, homogeneous lists are usually easier to reason about.

---

# 12. Tuples

A tuple is ordered but immutable.

```python
point = (10, 20)
```

You cannot do:

```python
point[0] = 100
```

because tuples are immutable.

Tuples are commonly useful for representing fixed collections of values:

```python
coordinates = (12.5, 20.3)
```

They are also heavily used in Python's multiple assignment and unpacking.

```python
x, y = (10, 20)
```

---

# 13. Sets

A set stores **unique elements**.

```python
numbers = {1, 2, 3, 3, 3}

print(numbers)
```

Result:

```text
{1, 2, 3}
```

Duplicates disappear.

Sets are particularly useful for:

* removing duplicates
* membership testing
* mathematical set operations

For example:

```python
users = {"Alice", "Bob", "Charlie"}

print("Alice" in users)
```

This is typically very efficient.

---

# 14. Dictionaries

A dictionary stores **key-value pairs**.

```python
person = {
    "name": "Alice",
    "age": 25
}
```

Access:

```python
print(person["name"])
```

Output:

```text
Alice
```

Modify:

```python
person["age"] = 26
```

Add:

```python
person["city"] = "Mysore"
```

Dictionaries are one of the most important Python data structures for interviews.

You should eventually understand **hash tables** deeply because Python's `dict` is implemented using a hash-table-based structure.

---

# 15. `None`

`None` represents the absence of a value.

```python
result = None
```

Its type is:

```python
type(result)
```

→

```text
<class 'NoneType'>
```

You will frequently see:

```python
if result is None:
    ...
```

Notice:

```python
is None
```

rather than:

```python
== None
```

We'll later discuss why.

---

# 16. Mutable vs Immutable

This is one of the **most important Python interview concepts**.

### Immutable

These cannot be changed after creation:

```text
int
float
bool
str
tuple
```

### Mutable

These can be changed:

```text
list
dict
set
```

For example:

```python
numbers = [1, 2, 3]

numbers.append(4)
```

The list itself has been modified.

Compare that with:

```python
name = "Alice"
name += " Smith"
```

A new string is created rather than modifying the existing string.

---

# 17. Why does mutability matter?

Consider:

```python
a = [1, 2, 3]
b = a
```

Now:

```text
a ──────┐
        ▼
      [1, 2, 3]
        ▲
        │
b ──────┘
```

Both names refer to the **same list**.

So:

```python
b.append(4)
```

What is:

```python
print(a)
```

?

Answer:

```text
[1, 2, 3, 4]
```

This catches people in interviews.

`b = a` does **not** create an independent copy.

---

# 18. `==` vs `is`

Another classic Python interview question.

### `==`

Checks whether two objects have equal values.

```python
a = [1, 2]
b = [1, 2]

print(a == b)
```

→

```text
True
```

### `is`

Checks whether two references point to the **same object**.

```python
print(a is b)
```

→

```text
False
```

because these are two different list objects.

But:

```python
a = [1, 2]
b = a

print(a == b)  # True
print(a is b)  # True
```

Both names refer to the same object.

### Interview rule

Use:

```python
==
```

for value equality.

Use:

```python
is
```

for identity.

The classic use is:

```python
if value is None:
    ...
```

---

# 19. Operators

Now let's move to operators.

## Arithmetic

```python
a + b
a - b
a * b
a / b
a // b
a % b
a ** b
```

Example:

```python
10 / 3
```

→ approximately:

```text
3.3333333333333335
```

But:

```python
10 // 3
```

→

```text
3
```

`//` is floor division.

---

## Modulo

```python
10 % 3
```

→

```text
1
```

Because:

```text
10 = 3 × 3 + 1
```

Modulo is extremely useful in interview problems:

```python
if number % 2 == 0:
    print("Even")
```

---

## Exponentiation

```python
2 ** 3
```

→

```text
8
```

---

# 20. Comparison operators

```python
==
!=
>
<
>=
<=
```

Example:

```python
age = 25

age >= 18
```

→ `True`

---

# 21. Logical operators

Python uses:

```python
and
or
not
```

Example:

```python
age >= 18 and has_id
```

Both conditions must be true.

```python
is_admin or is_manager
```

At least one must be true.

```python
not is_logged_in
```

reverses the Boolean value.

---

# 22. Short-circuit evaluation

This is an **interview-worthy Python concept**.

Consider:

```python
if user is not None and user.is_active:
    ...
```

Python evaluates from left to right.

If:

```python
user is not None
```

is `False`, Python doesn't need to evaluate:

```python
user.is_active
```

This is called **short-circuit evaluation**.

Similarly:

```python
True or something
```

doesn't need to evaluate `something`.

This can also be used intentionally:

```python
if user and user.is_active:
    ...
```

---

# 23. Assignment operators

Instead of:

```python
x = x + 5
```

you can write:

```python
x += 5
```

Other examples:

```python
x -= 2
x *= 3
x /= 4
x //= 2
x %= 5
```

---

# 24. Membership operators

Python has:

```python
in
not in
```

Example:

```python
numbers = [1, 2, 3, 4]

3 in numbers
```

→ `True`

And:

```python
5 not in numbers
```

→ `True`

For dictionaries, membership checks **keys**:

```python
person = {"name": "Alice", "age": 25}

"name" in person
```

→ `True`

But:

```python
"Alice" in person
```

→ `False`

because `"Alice"` is a value, not a key.

---

# 25. Identity operators

Python provides:

```python
is
is not
```

Example:

```python
x is None
```

This checks object identity.

---

# 26. Expressions

An **expression** is something Python can evaluate to produce a value.

Examples:

```python
10 + 20
```

```python
age >= 18
```

```python
name.upper()
```

```python
x * 2 + 5
```

For example:

```python
x = 10 + 20
```

Here:

```python
10 + 20
```

is an expression producing:

```text
30
```

---

# 27. Operator precedence

Consider:

```python
result = 2 + 3 * 4
```

Is it:

```text
20
```

or:

```text
14
```

?

It's:

```text
14
```

because multiplication has higher precedence than addition.

Python evaluates:

```text
3 * 4 = 12
2 + 12 = 14
```

When in doubt, use parentheses:

```python
result = (2 + 3) * 4
```

→ `20`

---

# 28. A very important interview distinction

Consider:

```python
x = 10
y = x
```

A common beginner explanation is:

> "`y` gets a copy of `x`."

That's not the best mental model.

A better model:

```text
x ───┐
     ▼
    10
     ▲
     │
y ───┘
```

Both names refer to the same integer object.

Because integers are immutable, this usually doesn't cause surprising behavior.

For example:

```python
x = 10
y = x

x = 20
```

Now:

```text
x ─────► 20

y ─────► 10
```

`y` doesn't change.

Why?

Because:

```python
x = 20
```

rebinds `x` to another object. It doesn't mutate the integer `10`.

This distinction between **rebinding a name** and **mutating an object** is fundamental to understanding Python.

---

# 29. Interview checkpoint

You should now be able to answer these without looking anything up.

### Q1

What is the output?

```python
x = 10
y = x
x = 20

print(y)
```

**Answer:**

```text
10
```

---

### Q2

What is the output?

```python
a = [1, 2, 3]
b = a

b.append(4)

print(a)
```

**Answer:**

```text
[1, 2, 3, 4]
```

Because `a` and `b` refer to the same mutable list.

---

### Q3

What is the difference?

```python
a == b
```

versus:

```python
a is b
```

**Answer:**

* `==` → value/equality comparison
* `is` → object identity comparison

---

### Q4

Is this a constant?

```python
MAX_CONNECTIONS = 100
```

**Answer:**

It is a **conventional constant**, not an enforced constant. Python allows it to be reassigned.

---

### Q5

What is the output?

```python
print(10 / 3)
print(10 // 3)
print(10 % 3)
```

**Answer:**

```text
3.3333333333333335
3
1
```

---

### Q6

What does this do?

```python
"name" in {"name": "Alice", "age": 25}
```

**Answer:**

```text
True
```

Dictionary membership checks keys.

---

# 30. Mini coding exercise

Before we move to `if/else`, loops, and functions, try these yourself.

### Exercise 1 — Swap

Write Python code that swaps:

```python
a = 15
b = 30
```

without using a third variable.

---

### Exercise 2 — Even or odd

Given:

```python
number = 47
```

determine whether it is even or odd.

---

### Exercise 3 — Unique values

Given:

```python
numbers = [1, 2, 2, 3, 4, 4, 5]
```

produce the unique values.

---

### Exercise 4 — Dictionary

Given:

```python
person = {
    "name": "Rahul",
    "age": 24,
    "city": "Mysore"
}
```

Write code to:

1. print the person's name
2. change the age to `25`
3. add `"job": "Developer"`

---

### Exercise 5 — Predict the output

Don't run this yet. Think carefully:

```python
a = [1, 2, 3]
b = a
c = a.copy()

b.append(4)
c.append(5)

print(a)
print(b)
print(c)
```

The key question is:

> Which variables refer to the same list?

---

# Where we're going next

Once these foundations are solid, we'll move into:

### Part 2 — Control Flow

* `if`, `elif`, `else`
* nested conditions
* truthiness
* `and`, `or`, `not`
* `for`
* `while`
* `break`
* `continue`
* `pass`
* `range()`
* `enumerate()`
* `zip()`
* common loop patterns
* nested-loop complexity

Then:

### Part 3 — Functions

We'll go considerably deeper than simply learning:

```python
def hello():
    print("Hello")
```

We'll cover:

* parameters vs arguments
* positional vs keyword arguments
* default arguments
* `*args`
* `**kwargs`
* return values
* recursion
* first-class functions
* lambda
* closures
* decorators at an interview-appropriate level
* mutable default argument trap
* LEGB and scope

And eventually we'll connect everything to **OOP, data structures, algorithms, and actual interview problems**.

**Don't worry if the first section feels basic.** The goal is to make these concepts so automatic that when we reach harder questions—like recursion, linked lists, hashing, or dependency injection—you can focus on the problem rather than fighting the language.
