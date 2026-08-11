---
title: "Python Interview Preparation — Conditional Logic & Boolean Reasoning"
date: "2026-08-11"
description: ""
tags: ["Python"]
---

Absolutely. We’ll treat this like an **interview-prep lesson**, not just a syntax walkthrough.

We’ll go in this order:

1. `if`, `elif`, `else`
2. Comparison operators
3. Truthiness and falsiness
4. Logical operators: `and`, `or`, `not`
5. Short-circuit evaluation
6. Nested conditions
7. Conditional expressions (`x if condition else y`)
8. Common interview traps
9. Output-prediction questions
10. Coding exercises
11. **Checkpoint test — we won’t move forward until you demonstrate understanding**

---

# 1. `if`, `elif`, and `else`

Conditional statements allow Python to **make decisions**.

The basic structure is:

```python
if condition:
    # runs when condition is True
```

Example:

```python
age = 20

if age >= 18:
    print("Adult")
```

Python evaluates:

```python
age >= 18
```

which becomes:

```python
20 >= 18
```

which is:

```python
True
```

So the body executes.

### `if` + `else`

```python
age = 15

if age >= 18:
    print("Adult")
else:
    print("Minor")
```

Only **one branch** executes.

Conceptually:

```text
             age >= 18?
              /     \
           True     False
            |         |
         Adult      Minor
```

---

# 2. `elif`

`elif` means **"else if"**.

Use it when there are multiple mutually exclusive possibilities.

```python
marks = 72

if marks >= 90:
    print("A")
elif marks >= 75:
    print("B")
elif marks >= 60:
    print("C")
else:
    print("D")
```

Python checks from **top to bottom**.

For `marks = 72`:

```text
72 >= 90  → False
72 >= 75  → False
72 >= 60  → True
```

Therefore:

```text
C
```

### Critical interview point

Once Python finds a true condition in an `if/elif/elif/...` chain, it **does not check the remaining conditions**.

For example:

```python
x = 10

if x > 0:
    print("positive")
elif x > 5:
    print("greater than 5")
```

Output:

```text
positive
```

Even though `x > 5` is also true.

The second condition is never reached.

---

# 3. Separate `if` statements are different

Compare these:

### Version A

```python
x = 10

if x > 0:
    print("positive")

if x > 5:
    print("greater than 5")
```

Output:

```text
positive
greater than 5
```

Both conditions are evaluated.

### Version B

```python
x = 10

if x > 0:
    print("positive")
elif x > 5:
    print("greater than 5")
```

Output:

```text
positive
```

**Interview trap:** Don't confuse multiple independent `if`s with an `if/elif` chain.

---

# 4. Comparison operators

Python gives us these common comparison operators:

| Operator | Meaning            | Example  |
| -------- | ------------------ | -------- |
| `==`     | equal              | `x == 5` |
| `!=`     | not equal          | `x != 5` |
| `>`      | greater than       | `x > 5`  |
| `<`      | less than          | `x < 5`  |
| `>=`     | greater than/equal | `x >= 5` |
| `<=`     | less than/equal    | `x <= 5` |

They produce a Boolean:

```python
x = 10

print(x > 5)
print(x == 10)
print(x < 3)
```

Output:

```text
True
True
False
```

---

# 5. `=` versus `==`

One of the most important interview basics:

```python
=
```

means **assignment**.

```python
x = 10
```

means "put 10 into `x`."

Whereas:

```python
==
```

means **comparison**.

```python
x == 10
```

means "is `x` equal to 10?"

So this:

```python
if x = 10:
```

is invalid Python.

You need:

```python
if x == 10:
```

---

# 6. Chained comparisons

Python supports something that surprises people coming from some other languages:

```python
10 < x < 20
```

This means:

```python
10 < x and x < 20
```

For example:

```python
x = 15

if 10 < x < 20:
    print("Inside range")
```

Output:

```text
Inside range
```

You can also write:

```python
0 <= marks <= 100
```

This is perfectly valid Python.

---

# 7. Truthiness and falsiness

This is **extremely important in Python interviews**.

Conditions don't necessarily need to literally produce `True` or `False`.

Python can ask:

> "Is this value truthy?"

For example:

```python
if 10:
    print("Yes")
```

This prints:

```text
Yes
```

Because `10` is truthy.

But:

```python
if 0:
    print("Yes")
```

prints nothing because `0` is falsy.

---

## Common falsy values

These are especially important:

```python
False
None
0
0.0
0j
""
[]
()
{}
set()
```

In general:

* empty collections → falsy
* zero → falsy
* `None` → falsy
* `False` → falsy

Most other values are truthy.

For example:

```python
bool(42)
```

→ `True`

```python
bool(-1)
```

→ `True`

```python
bool("hello")
```

→ `True`

```python
bool([1, 2, 3])
```

→ `True`

---

# 8. A very common interview pattern

You'll frequently see:

```python
name = input("Enter name: ")

if name:
    print("Name provided")
else:
    print("No name provided")
```

If the user enters:

```text
Alice
```

then `name` is truthy.

If they simply press Enter:

```text
""
```

is stored, which is falsy.

So:

```text
No name provided
```

---

# 9. `None` deserves special attention

Consider:

```python
result = None

if result:
    print("Got result")
else:
    print("No result")
```

Output:

```text
No result
```

But when specifically checking for `None`, prefer:

```python
if result is None:
```

rather than:

```python
if result == None:
```

Similarly:

```python
if result is not None:
```

This distinction becomes important in interviews.

---

# 10. Logical operators

Python has three major logical operators:

```python
and
or
not
```

## `and`

Both conditions need to be truthy.

```python
age = 25
has_id = True

if age >= 18 and has_id:
    print("Allowed")
```

Think:

```text
A AND B

True  and True  → True
True  and False → False
False and True  → False
False and False → False
```

---

## `or`

At least one side must be truthy.

```python
is_admin = False
is_owner = True

if is_admin or is_owner:
    print("Access granted")
```

Because one side is true:

```text
False OR True → True
```

---

## `not`

`not` reverses truthiness.

```python
logged_in = False

if not logged_in:
    print("Please log in")
```

Since:

```python
not False
```

is:

```python
True
```

---

# 11. Truth tables

For interview preparation, know these:

### `and`

| A     | B     | A and B |
| ----- | ----- | ------- |
| False | False | False   |
| False | True  | False   |
| True  | False | False   |
| True  | True  | True    |

### `or`

| A     | B     | A or B |
| ----- | ----- | ------ |
| False | False | False  |
| False | True  | True   |
| True  | False | True   |
| True  | True  | True   |

### `not`

| A     | `not A` |
| ----- | ------- |
| False | True    |
| True  | False   |

But here's where Python gets more interesting.

---

# 12. `and` and `or` don't necessarily return booleans

This is a **classic Python interview trap**.

Consider:

```python
x = 10
y = 20

print(x and y)
```

Many beginners expect:

```text
True
```

But Python prints:

```text
20
```

Why?

Because Python's `and` and `or` return **one of their operands**.

We'll understand exactly how in the next section.

---

# 13. Short-circuit evaluation

Python doesn't always evaluate the entire logical expression.

It can stop early.

That's called **short-circuit evaluation**.

## `and`

For:

```python
A and B
```

if `A` is falsy, Python already knows the whole expression can't be truthy.

So it doesn't need to evaluate `B`.

Example:

```python
x = 0

result = x and (10 / x)

print(result)
```

What happens?

First:

```python
x
```

is `0`.

`0` is falsy.

Therefore:

```python
x and (10 / x)
```

short-circuits.

Python **doesn't evaluate**:

```python
10 / x
```

So there is no division-by-zero error.

The result is:

```text
0
```

This is an excellent interview concept.

---

# 14. `or` short-circuits differently

For:

```python
A or B
```

if `A` is truthy, Python already knows the expression is truthy.

So it doesn't evaluate `B`.

Example:

```python
x = 10

result = x or (1 / 0)

print(result)
```

Output:

```text
10
```

The division by zero never happens.

Why?

```text
10 → truthy
```

Therefore:

```python
10 or anything
```

doesn't need the second operand.

---

# 15. The exact return behavior

This is worth memorizing.

### `A and B`

Returns:

* `A` if `A` is falsy
* otherwise `B`

Examples:

```python
print(0 and 5)
```

→ `0`

```python
print(10 and 5)
```

→ `5`

```python
print("" and "hello")
```

→ `""`

```python
print("hello" and "world")
```

→ `"world"`

---

### `A or B`

Returns:

* `A` if `A` is truthy
* otherwise `B`

Examples:

```python
print(10 or 5)
```

→ `10`

```python
print(0 or 5)
```

→ `5`

```python
print("" or "hello")
```

→ `"hello"`

This behavior is heavily used in real Python code.

---

# 16. Practical example: default values

You may encounter:

```python
name = user_input or "Guest"
```

Suppose:

```python
user_input = ""
```

Then:

```python
name = "" or "Guest"
```

Since `""` is falsy:

```python
name = "Guest"
```

If:

```python
user_input = "Rahul"
```

then:

```python
name = "Rahul" or "Guest"
```

Since `"Rahul"` is truthy:

```python
name = "Rahul"
```

### Interview warning

This isn't equivalent to:

```python
if user_input is None:
```

because `or` treats **all falsy values** as missing:

```python
0
""
[]
False
None
```

That distinction matters.

---

# 17. Nested conditions

A nested condition is an `if` inside another `if`.

Example:

```python
age = 25
has_id = True

if age >= 18:
    if has_id:
        print("Entry allowed")
    else:
        print("ID required")
else:
    print("Too young")
```

Think of it as a decision tree:

```text
age >= 18?
│
├── No → Too young
│
└── Yes
     │
     └── has_id?
          ├── Yes → Entry allowed
          └── No  → ID required
```

Nested conditions are useful, but don't overuse them.

Sometimes this:

```python
if age >= 18:
    if has_id:
        print("Allowed")
```

can be expressed as:

```python
if age >= 18 and has_id:
    print("Allowed")
```

Knowing when to flatten nested conditions is an important code-quality skill.

---

# 18. Conditional expressions

Python has a compact one-line conditional:

```python
value_if_true if condition else value_if_false
```

Example:

```python
age = 20

status = "Adult" if age >= 18 else "Minor"

print(status)
```

Output:

```text
Adult
```

Compare:

```python
if age >= 18:
    status = "Adult"
else:
    status = "Minor"
```

The conditional expression is useful when the decision is simple.

---

## Another example

```python
a = 10
b = 20

larger = a if a > b else b
```

`larger` becomes:

```text
20
```

### Don't abuse it

This is technically possible:

```python
result = "A" if score >= 90 else "B" if score >= 80 else "C" if score >= 70 else "D"
```

But it's difficult to read.

For multiple branches, normal `if/elif/else` is usually better.

---

# 19. Operator precedence

Another interview favorite.

Consider:

```python
x = True
y = False
z = True

print(x or y and z)
```

Which happens first?

`and` has higher precedence than `or`.

So this is effectively:

```python
x or (y and z)
```

Calculate:

```text
y and z
False and True → False

x or False
True or False → True
```

Output:

```text
True
```

When in doubt, **use parentheses**:

```python
x or (y and z)
```

rather than relying on readers remembering precedence.

---

# 20. A major interview trap: `bool` is a subclass of `int`

Python has:

```python
True == 1
False == 0
```

which evaluates to:

```python
True
```

For example:

```python
print(True == 1)
print(False == 0)
```

Output:

```text
True
True
```

This can lead to surprising results:

```python
print(True + True)
```

Output:

```text
2
```

Because `True` behaves numerically like `1` in arithmetic contexts.

But don't confuse equality with identity:

```python
True is 1
```

is `False`.

For interviews, remember:

```text
==  → equality
is  → identity
```

---

# 21. Interview trap: comparing strings

```python
x = "10"

print(x == 10)
```

Output:

```text
False
```

Because:

```python
"10"
```

is a string while:

```python
10
```

is an integer.

Python does not automatically consider them equal.

---

# 22. Interview trap: empty containers

Predict:

```python
items = []

if items:
    print("A")
else:
    print("B")
```

Output:

```text
B
```

Because an empty list is falsy.

But:

```python
items = [0]
```

is truthy.

The **list itself** is non-empty, regardless of the truthiness of the element.

So:

```python
bool([0])
```

is:

```text
True
```

This distinction catches people.

---

# 23. Interview trap: `not`

Consider:

```python
x = []

print(not x)
```

`x` is an empty list → falsy.

Therefore:

```python
not False
```

→ `True`.

Output:

```text
True
```

---

# 24. Output-prediction round

Don't run these yet. **Reason through them.**

### Question 1

```python
x = 10

if x > 5:
    print("A")
elif x > 8:
    print("B")
else:
    print("C")
```

What is printed?

---

### Question 2

```python
x = 0

if x:
    print("A")
else:
    print("B")
```

---

### Question 3

```python
print(0 or 10)
```

---

### Question 4

```python
print(10 and 20)
```

---

### Question 5

```python
print("" or "Python")
```

---

### Question 6

```python
x = 0
print(x and (10 / x))
```

Does this print a value or raise an exception?

---

### Question 7

```python
x = 10
print(x or (1 / 0))
```

---

### Question 8

```python
a = True
b = False

print(a and b or a)
```

Be careful with precedence.

---

# 25. Coding exercises

Now try these **without looking for solutions**.

### Exercise 1 — Grade calculator

Write a program that takes `marks` and prints:

```text
A  → 90–100
B  → 80–89
C  → 70–79
D  → 60–69
F  → below 60
```

Also consider what should happen if the marks are outside `0–100`.

---

### Exercise 2 — Login validation

Given:

```python
username = "admin"
password = "secret123"
```

Print `"Login successful"` only when:

* username is `"admin"`
* AND password is `"secret123"`

Otherwise print `"Invalid credentials"`.

---

### Exercise 3 — Number classification

Given an integer `n`, determine whether it is:

* positive
* negative
* zero

Then extend it to distinguish:

* positive even
* positive odd
* negative even
* negative odd
* zero

Try solving the second version with nested conditions first, then with logical operators.

---

### Exercise 4 — Default value

Given:

```python
name = ""
```

Use an expression involving `or` to produce:

```text
Guest
```

But when:

```python
name = "Alice"
```

the result should be:

```text
Alice
```

---

# 26. Your checkpoint test

**Don't move to the next topic yet.** Answer these from reasoning.

### Part A — Concepts

In your own words:

**1.** What's the difference between:

```python
if
```

and:

```python
elif
```

**2.** What does "truthy" mean in Python?

**3.** Name at least **five falsy values**.

**4.** What's the difference between:

```python
and
```

and:

```python
or
```

**5.** What does short-circuit evaluation mean?

**6.** What does this expression return, and why?

```python
0 or 25
```

**7.** What does this return?

```python
25 and 100
```

---

### Part B — Predict the output

Give the exact output for each:

```python
# 1
x = 7

if x > 10:
    print("A")
elif x > 5:
    print("B")
else:
    print("C")
```

```python
# 2
x = []

print(bool(x))
```

```python
# 3
print("" or "hello")
```

```python
# 4
print(0 and 99)
```

```python
# 5
x = False
y = True

print(x or y and False)
```

```python
# 6
x = None

if x:
    print("A")
else:
    print("B")
```

```python
# 7
x = 5

if x > 0:
    if x % 2 == 0:
        print("A")
    else:
        print("B")
else:
    print("C")
```

### Part C — Explain the trap

What happens here, and **why doesn't it raise `ZeroDivisionError`?**

```python
x = 0

result = x and (100 / x)

print(result)
```

Reply with your answers to **A, B, and C**, plus your solutions to any coding exercises you attempted. I'll grade them like an interviewer, correct your reasoning—not just the answers—and then we'll move to the next layer.
