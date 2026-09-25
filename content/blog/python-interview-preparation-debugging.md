---
title: "Python Interview Preparation - Debugging"
date: "2026-09-25"
description: ""
---

# Python Debugging Fundamentals

Debugging is the process of finding out **why a program does not behave as intended**, identifying the underlying cause, and correcting it without introducing new problems.

A good debugger does not randomly change lines until the error disappears.

Instead, they follow a systematic process:

> **Reproduce → Observe → Form a hypothesis → Isolate → Fix → Verify**

This guide teaches the fundamentals of debugging Python programs and then turns them into an interview-style debugging exercise.

---

# 1. The Three Main Types of Bugs

Most beginner debugging problems fall into three broad categories.

## 1.1 Syntax Errors

A syntax error means Python cannot understand the structure of your program.

Example:

```python
name = "Alice"

if name == "Alice"
    print("Hello Alice")
```

Python cannot execute this because the `if` statement is missing a colon.

Typical error:

```text
SyntaxError: expected ':'
```

### Important point

A syntax error usually prevents the program from starting at all.

Common causes:

* Missing `:`
* Missing `)`
* Unclosed quotes
* Incorrect indentation
* Misspelled Python keywords
* Invalid syntax

---

# 2. Runtime Errors

A runtime error occurs while the program is executing.

Example:

```python
numbers = [10, 20, 30]

print(numbers[5])
```

The syntax is valid, but the requested index does not exist.

You may see:

```text
IndexError: list index out of range
```

Other common runtime errors include:

```text
NameError
TypeError
ValueError
KeyError
IndexError
ZeroDivisionError
AttributeError
FileNotFoundError
```

For example:

```python
age = int("twenty")
```

produces:

```text
ValueError
```

because Python cannot convert `"twenty"` into an integer.

---

# 3. Logical Errors

Logical errors are often harder.

The program runs.

There is no traceback.

But the answer is wrong.

Example:

```python
def calculate_average(numbers):
    return sum(numbers) / len(numbers) + 1

print(calculate_average([10, 20, 30]))
```

The program executes successfully.

But the average should be:

```text
20
```

not:

```text
21
```

This is a **logical error**.

Logical bugs require you to compare:

> What did I expect?

against:

> What actually happened?

---

# 4. Reading a Traceback

Consider:

```python
def divide(a, b):
    return a / b


def calculate():
    result = divide(10, 0)
    return result


calculate()
```

Python might produce:

```text
Traceback (most recent call last):
  File "program.py", line 10, in <module>
    calculate()
  File "program.py", line 6, in calculate
    result = divide(10, 0)
  File "program.py", line 2, in divide
    return a / b
ZeroDivisionError: division by zero
```

Read a traceback from **bottom to top**.

The most useful information is usually at the bottom:

```text
ZeroDivisionError: division by zero
```

Then locate the line that triggered it:

```python
return a / b
```

Then work upward through the stack to understand how execution reached that line.

---

# 5. Stack Frames

Every active function call has a **stack frame**.

Consider:

```python
def first():
    second()


def second():
    third()


def third():
    x = 10 / 0


first()
```

At the moment the error occurs, the call stack conceptually looks like:

```text
third()
  ↓
second()
  ↓
first()
  ↓
main program
```

Each frame contains information about that particular function invocation, including things such as:

* Local variables
* Function arguments
* Current execution location
* The function's calling context

Understanding stack frames becomes extremely useful when reading tracebacks and using the debugger.

---

# 6. Print Debugging

One of the simplest debugging techniques is printing intermediate values.

Suppose:

```python
def calculate_total(price, quantity, discount):
    total = price * quantity
    total = total - discount
    return total
```

You could temporarily add:

```python
def calculate_total(price, quantity, discount):
    print("price:", price)
    print("quantity:", quantity)
    print("discount:", discount)

    total = price * quantity
    print("after multiplication:", total)

    total = total - discount
    print("after discount:", total)

    return total
```

This lets you observe the program's state as it executes.

## What print debugging is good for

It is useful when:

* You need a quick answer.
* The code is small.
* You want to inspect intermediate values.
* You want to understand execution flow.

## What can go wrong

Too many print statements can make the program difficult to understand.

For example:

```python
print(x)
print(y)
print(z)
print(a)
print(b)
print(c)
print(result)
print(temp)
print(value)
```

A better approach is to ask:

> Which value would distinguish between my competing hypotheses?

That makes debugging much more systematic.

---

# 7. Assertions

An assertion checks whether an assumption is true.

Example:

```python
age = 25

assert age >= 0
```

If the condition is false:

```python
age = -5

assert age >= 0
```

Python raises:

```text
AssertionError
```

Assertions are useful for detecting violated assumptions.

For example:

```python
def calculate_average(numbers):
    assert len(numbers) > 0
    return sum(numbers) / len(numbers)
```

The assertion documents an assumption:

> This function expects at least one number.

---

# 8. `assert` Syntax

The basic form is:

```python
assert condition
```

You can also provide a message:

```python
assert age >= 0, "Age cannot be negative"
```

If the assertion fails, the message helps explain the violated assumption.

Example:

```python
def withdraw(balance, amount):
    assert amount >= 0, "Amount cannot be negative"
    assert amount <= balance, "Insufficient balance"

    return balance - amount
```

Assertions are primarily useful for **programmer assumptions and internal invariants**.

They should not be treated as a replacement for normal validation of untrusted user input.

---

# 9. The Python Debugger

Python includes a built-in debugger called `pdb`.

You can enter the debugger using:

```python
breakpoint()
```

Example:

```python
def calculate_total(price, quantity):
    total = price * quantity

    breakpoint()

    return total


print(calculate_total(100, 3))
```

When execution reaches `breakpoint()`, you can inspect the program interactively.

Useful debugger commands include:

```text
p variable
```

Print a variable.

```text
pp variable
```

Pretty-print a variable.

```text
n
```

Execute the next line.

```text
s
```

Step into a function.

```text
c
```

Continue execution.

```text
q
```

Quit the debugger.

---

# 10. Breakpoints

A breakpoint means:

> Stop execution here so I can inspect what is happening.

For example:

```python
def process_order(order):
    total = order["price"] * order["quantity"]

    breakpoint()

    return total
```

When execution stops, investigate:

```text
What is order?
What is order["price"]?
What is order["quantity"]?
What is total?
```

The goal is not simply to stop the program.

The goal is to inspect its state at a strategically useful moment.

---

# 11. Inspecting Variables

Suppose:

```python
def calculate_discount(price, discount):
    final_price = price - discount
    breakpoint()
    return final_price
```

At the breakpoint, inspect:

```text
price
discount
final_price
```

Ask:

1. Are the values what I expected?
2. Are their types correct?
3. Did they come from the correct source?
4. Were they modified earlier?
5. Is the calculation correct?

Remember that the wrong value often originates **before** the line where the bug becomes visible.

---

# 12. The Difference Between Where a Bug Appears and Where It Starts

Suppose:

```python
def create_user():
    return {
        "name": "Alice",
        "age": "25"
    }


def calculate_birth_year(user):
    return 2026 - user["age"]


user = create_user()
print(calculate_birth_year(user))
```

The error appears here:

```python
2026 - user["age"]
```

But the underlying problem is arguably earlier:

```python
"age": "25"
```

The value has the wrong type.

This distinction is critical:

> **The line that crashes is not necessarily the line that introduced the bug.**

---

# 13. Systematic Debugging

A disciplined debugging process can look like this:

## Step 1 — Reproduce the bug

Make the failure happen reliably.

Ask:

```text
What exact input causes the problem?
```

---

## Step 2 — Observe the failure

Look at:

* Error message
* Traceback
* Incorrect output
* Logs
* Program state

Do not immediately change the code.

---

## Step 3 — State the expected behavior

Write down what should happen.

For example:

```text
Input:
[10, 20, 30]

Expected:
20

Actual:
21
```

---

## Step 4 — Form a hypothesis

For example:

> The average calculation may be adding an extra value.

A good hypothesis should be testable.

---

## Step 5 — Isolate the cause

Inspect relevant variables.

Add a temporary print.

Use an assertion.

Set a breakpoint.

Reduce the problem to a smaller example.

---

## Step 6 — Fix the underlying problem

Avoid simply hiding the symptom.

Bad:

```python
try:
    risky_operation()
except:
    pass
```

The error disappeared.

But the problem did not.

---

## Step 7 — Verify

Test:

* The original failing case
* Normal cases
* Boundary cases
* Invalid cases where appropriate

---

# 14. Fixing vs. Masking

Consider:

```python
def get_age(user):
    try:
        return user["age"]
    except:
        return 0
```

This might make the program appear to work.

But if the `"age"` field is accidentally missing because another part of the program is broken, returning `0` hides the real problem.

A better approach may be:

```python
def get_age(user):
    return user["age"]
```

Then investigate why `"age"` was missing.

The principle is:

> **Do not make the error disappear until you understand why it happened.**

---

# 15. Reproducing Bugs

A bug that happens "sometimes" is difficult to fix.

Try to turn:

```text
It sometimes crashes.
```

into:

```text
It crashes when input contains an empty list.
```

or:

```text
It crashes when quantity is 0.
```

or:

```text
It crashes when the third item is missing.
```

The smaller and more reliable the reproduction case, the easier the debugging process becomes.

---

# 16. Isolating the Cause

Suppose this program fails:

```python
data = load_data()
data = clean_data(data)
data = transform_data(data)
data = calculate_results(data)
save_results(data)
```

Don't immediately inspect all five functions.

Determine where the state first becomes incorrect.

For example:

```python
data = load_data()
print("After load:", data)

data = clean_data(data)
print("After clean:", data)

data = transform_data(data)
print("After transform:", data)

data = calculate_results(data)
print("After calculation:", data)
```

If the data is correct after `clean_data()` but wrong after `transform_data()`, you have significantly narrowed the search.

This is **isolation**.

---

# 17. Interview Debugging Mindset

When an interviewer gives you broken code, don't immediately start editing.

Explain your reasoning.

A strong debugging conversation sounds like:

> "First I'll reproduce the issue."

Then:

> "The traceback points to line 14, where we're indexing the list."

Then:

> "Before changing that line, I want to verify whether the list is actually empty."

Then:

> "I'll inspect the value immediately before the failing operation."

Then:

> "The list becomes empty inside `filter_users()`, so that's where I'll investigate next."

This demonstrates debugging ability rather than just syntax knowledge.

---

# 18. Interview Lab

Now you are the candidate.

For each problem:

1. Diagnose the bug.
2. Identify the bug category.
3. Explain the root cause.
4. Propose a fix.
5. Explain how you would verify the fix.

Do **not** just give the corrected code.

Explain your reasoning.

---

# Challenge 1 — Syntax Error

```python
def greet(name)
    message = "Hello, " + name
    print(message)


greet("Alice")
```

### Your task

Identify:

* What is wrong?
* What type of error is it?
* What line causes it?
* How would you fix it?

---

# Challenge 2 — Runtime Error

```python
def get_first_item(items):
    return items[0]


numbers = []

print(get_first_item(numbers))
```

### Interview questions

1. What exception occurs?
2. Why does it occur?
3. What assumptions does `get_first_item()` make?
4. Would you change the caller or the function?
5. What should happen when the list is empty?

There may be more than one reasonable design depending on the intended behavior.

---

# Challenge 3 — Logical Error

```python
def calculate_average(numbers):
    total = sum(numbers)
    return total / len(numbers) + 1


numbers = [10, 20, 30]

print(calculate_average(numbers))
```

Expected:

```text
20
```

Actual:

```text
21
```

### Interview questions

1. Why does the program run successfully?
2. Why is the result incorrect?
3. What line contains the logical problem?
4. How would you verify your diagnosis?

---

# Challenge 4 — Traceback Investigation

```python
def get_price(product):
    return product["price"]


def calculate_total(product, quantity):
    price = get_price(product)
    return price * quantity


def checkout(product, quantity):
    total = calculate_total(product, quantity)
    return f"Total: {total}"


product = {
    "name": "Keyboard"
}

print(checkout(product, 2))
```

### Interview task

Imagine Python produces:

```text
KeyError: 'price'
```

Explain:

1. Which function actually raises the error?
2. How did execution get there?
3. Which function called it?
4. What information does the traceback give you?
5. Where would you investigate the root cause?

---

# Challenge 5 — Print Debugging

```python
def calculate_total(prices):
    total = 0

    for price in prices:
        total = price

    return total


prices = [10, 20, 30]

print(calculate_total(prices))
```

Expected:

```text
60
```

Actual:

```text
30
```

### Your task

You are not allowed to immediately rewrite the function.

First, add appropriate debugging output.

For example, investigate:

```text
price
total
```

at each iteration.

Then explain what you discovered.

---

# Challenge 6 — Assertion

```python
def calculate_average(numbers):
    assert len(numbers) > 0

    return sum(numbers) / len(numbers)


numbers = []

print(calculate_average(numbers))
```

### Interview questions

1. What happens?
2. Why is the assertion useful?
3. What assumption is being protected?
4. What would happen if the assertion were removed?
5. What should the function do if empty lists are valid input?

Think carefully about the difference between:

> "This situation represents a programmer error."

and:

> "This is valid input that the program needs to handle."

---

# Challenge 7 — Type Bug

```python
def calculate_total(price, quantity):
    return price * quantity


price = "100"
quantity = 3

print(calculate_total(price, quantity))
```

The output is not:

```text
300
```

### Your task

Determine:

* What actually happens?
* Why?
* What types are involved?
* Where should the conversion happen?
* Would you convert inside `calculate_total()` or before calling it?

Explain your reasoning before proposing the fix.

---

# Challenge 8 — Finding the Original Bug

```python
def create_user():
    return {
        "name": "Alice",
        "age": "25"
    }


def get_age(user):
    return user["age"]


def calculate_birth_year(user):
    age = get_age(user)
    return 2026 - age


user = create_user()

print(calculate_birth_year(user))
```

### Interview task

The error appears during:

```python
2026 - age
```

But ask yourself:

> Is that where the bug originated?

Trace the value:

```text
create_user()
      ↓
get_age()
      ↓
calculate_birth_year()
      ↓
2026 - age
```

Identify where the incorrect type entered the system.

---

# Challenge 9 — Masking the Problem

```python
def load_config(config):
    try:
        return config["database_url"]
    except Exception:
        return ""


config = {}

database_url = load_config(config)

print("Database URL:", database_url)
```

### Interview questions

1. Why might this code appear to work?
2. What problem is being hidden?
3. Why is `except Exception` suspicious here?
4. What would you do instead?
5. When might handling the missing key actually be appropriate?

---

# Challenge 10 — Debugger Challenge

```python
def calculate_discount(price, discount):
    discounted_price = price - discount

    return discounted_price


def checkout(price, discount):
    final_price = calculate_discount(price, discount)

    return final_price


price = 100
discount = 150

print(checkout(price, discount))
```

The program produces:

```text
-50
```

There is no exception.

### Your task

Use a debugger mentally—or actually run this program with:

```python
breakpoint()
```

Place the breakpoint where you think it provides the most useful information.

Then inspect:

```text
price
discount
discounted_price
final_price
```

Ask:

> Which assumption has been violated?

---

# 19. Advanced Challenge — Find the First Incorrect State

```python
def get_numbers():
    return [1, 2, 3, 4, 5]


def filter_numbers(numbers):
    return [n for n in numbers if n > 3]


def transform_numbers(numbers):
    return [n * 10 for n in numbers]


def calculate_total(numbers):
    return sum(numbers)


numbers = get_numbers()
numbers = filter_numbers(numbers)
numbers = transform_numbers(numbers)
total = calculate_total(numbers)

print(total)
```

Suppose the expected result is:

```text
150
```

but the program produces:

```text
90
```

### Your task

Don't immediately change `calculate_total()`.

Instead inspect the state after every transformation.

Build a mental table:

```text
Stage                  Value
------------------------------------------------
get_numbers()          ?
filter_numbers()       ?
transform_numbers()    ?
calculate_total()      ?
```

Find the **first point at which the actual state differs from the expected state**.

That is a powerful debugging technique.

---

# 20. The Debugging Checklist

When facing a bug, ask:

### Reproduce

* Can I reproduce it?
* What exact input triggers it?
* Is the failure deterministic?

### Observe

* What does the traceback say?
* What is the exact exception?
* What output did I get?
* What output did I expect?

### Understand

* What code executed?
* What values were involved?
* What types do those values have?
* What assumptions does the code make?

### Isolate

* Where was the value first incorrect?
* Which function introduced the incorrect state?
* Can I create a smaller reproduction?

### Fix

* Am I fixing the root cause?
* Am I merely hiding the symptom?
* Does the fix preserve the intended behavior?

### Verify

* Does the original bug disappear?
* Does the normal case still work?
* What happens at the boundaries?
* Did the fix introduce another bug?

---

# 21. A Practical Debugging Workflow

Use this workflow repeatedly until it becomes automatic:

```text
              BUG
               │
               ▼
        Reproduce it
               │
               ▼
       Read the traceback
               │
               ▼
     Define expected behavior
               │
               ▼
      Inspect program state
               │
               ▼
       Form a hypothesis
               │
               ▼
        Isolate the cause
               │
               ▼
       Fix the root cause
               │
               ▼
          Run tests
               │
               ▼
      Check edge cases
               │
               ▼
            DONE
```

If your hypothesis is wrong, don't panic.

Return to observation.

Debugging is an iterative process:

```text
Observe
   ↓
Hypothesize
   ↓
Test
   ↓
Learn
   ↓
New hypothesis
   ↓
Test again
```

---

# 22. The Most Important Debugging Principle

A beginner often asks:

> "What line should I change?"

A stronger debugger asks:

> "What is the program doing, what should it be doing, and at what point did those two diverge?"

That shift in thinking is the foundation of effective debugging.

The goal isn't merely to make the error disappear.

The goal is to understand **why the program reached the wrong state**, fix the underlying cause, and prove that the corrected program behaves as intended.

---

# Interview Mode

Now act as the candidate.

Start with **Challenge 1**.

Your response should contain:

```text
1. Error type:
2. What is wrong:
3. Root cause:
4. Fix:
5. How I would verify it:
```

I will act as the interviewer.

I will **not immediately give you the answer**. I will ask follow-up questions, challenge your assumptions, and give you additional evidence when appropriate.

After Challenge 1, we'll progress through increasingly difficult debugging problems involving:

* Tracebacks
* Runtime failures
* Logical bugs
* Assertions
* `pdb`
* Breakpoints
* Stack frames
* Mutable state
* Incorrect types
* Hidden assumptions
* Exception handling
* Multi-function debugging
* Isolating root causes
* Fixing rather than masking bugs

**Begin with Challenge 1.**
