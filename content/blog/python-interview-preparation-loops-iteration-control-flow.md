---
title: "Python Interview Preparation: Loops, Iteration & Control Flow"
date: "2026-08-14"
description: ""
tags: ["Python"]
---

# Python Interview Preparation — Iteration & Loops

We’ll cover everything in this order:

1. `for` loops
2. `while` loops
3. `range()`
4. `break`
5. `continue`
6. `pass`
7. Nested loops
8. `enumerate()`
9. `zip()`
10. Common iteration patterns
11. Common mistakes
12. Time complexity of nested loops
13. Interview questions
14. Output-prediction problems
15. Coding exercises
16. **Test — stop here and answer before we move forward**

---

# 1. `for` Loops

A `for` loop is used when you want to iterate over the elements of an iterable.

An iterable can be:

* list
* tuple
* string
* set
* dictionary
* `range()`
* etc.

### Basic syntax

```python
for item in iterable:
    # do something
```

Example:

```python
numbers = [10, 20, 30]

for num in numbers:
    print(num)
```

Output:

```text
10
20
30
```

Think:

> **"For every item in this collection, do something."**

### String iteration

```python
for ch in "Python":
    print(ch)
```

Output:

```text
P
y
t
h
o
n
```

### Dictionary iteration

```python
person = {"name": "Alex", "age": 25}

for key in person:
    print(key)
```

Output:

```text
name
age
```

For keys and values:

```python
for key, value in person.items():
    print(key, value)
```

---

# 2. When Should You Use `for`?

Use `for` when:

* you want to visit every element
* you know the collection you're iterating over
* you want a fixed number of iterations
* you're processing a sequence

Example:

```python
numbers = [4, 7, 2, 9]

total = 0

for num in numbers:
    total += num

print(total)
```

Result:

```text
22
```

This is generally preferable to manually managing an index.

---

# 3. `while` Loops

A `while` loop repeatedly executes code **as long as a condition is true**.

```python
while condition:
    # code
```

Example:

```python
count = 1

while count <= 5:
    print(count)
    count += 1
```

Output:

```text
1
2
3
4
5
```

Think:

> **"Keep doing this while this condition remains true."**

---

# 4. `for` vs `while`

This is a common interview question.

### Use `for`

When you are iterating over something:

```python
for num in numbers:
    print(num)
```

### Use `while`

When repetition depends on a condition:

```python
while balance > 0:
    balance -= payment
```

A `while` loop is particularly useful when you **don't know beforehand exactly how many iterations will occur**.

---

# 5. The Most Important `while` Mistake

Forgetting to update the condition.

Bad:

```python
count = 1

while count <= 5:
    print(count)
```

`count` never changes.

Therefore:

```text
1
1
1
1
...
```

This is an **infinite loop**.

Correct:

```python
count = 1

while count <= 5:
    print(count)
    count += 1
```

### Interview rule

Whenever you see:

```python
while condition:
```

ask:

> **"What eventually makes this condition false?"**

---

# 6. `range()`

`range()` generates a sequence of numbers, commonly used with `for`.

### One argument

```python
range(stop)
```

Example:

```python
for i in range(5):
    print(i)
```

Output:

```text
0
1
2
3
4
```

Important:

> The stop value is **excluded**.

So:

```python
range(5)
```

means:

```text
0 1 2 3 4
```

---

## Two arguments

```python
range(start, stop)
```

Example:

```python
for i in range(2, 7):
    print(i)
```

Output:

```text
2
3
4
5
6
```

---

## Three arguments

```python
range(start, stop, step)
```

Example:

```python
for i in range(0, 10, 2):
    print(i)
```

Output:

```text
0
2
4
6
8
```

### Reverse iteration

```python
for i in range(5, 0, -1):
    print(i)
```

Output:

```text
5
4
3
2
1
```

Notice that `0` is excluded.

---

# 7. `break`

`break` immediately terminates the **nearest enclosing loop**.

Example:

```python
for num in range(10):
    if num == 5:
        break
    print(num)
```

Output:

```text
0
1
2
3
4
```

Once `num == 5`, the loop ends.

### When to use it

Use `break` when:

* you've found what you're looking for
* continuing is unnecessary
* you need an early exit

Example:

```python
numbers = [4, 8, 15, 16, 23, 42]

for num in numbers:
    if num == 15:
        print("Found")
        break
```

Once `15` is found, there's no reason to inspect the remaining elements.

---

# 8. `continue`

`continue` skips the **current iteration** and moves to the next iteration.

Example:

```python
for num in range(5):
    if num == 2:
        continue
    print(num)
```

Output:

```text
0
1
3
4
```

Compare:

### `break`

> Stop the entire loop.

### `continue`

> Skip this iteration, but keep looping.

This distinction is extremely important in interviews.

---

# 9. `pass`

`pass` does **nothing**.

It is a placeholder.

```python
for num in range(5):
    pass
```

The loop runs, but nothing happens.

A common use is when you're planning to implement something later:

```python
def process_data():
    pass
```

Without `pass`, Python requires an indented statement after the function definition.

### Important distinction

```python
break
```

→ exits the loop

```python
continue
```

→ skips current iteration

```python
pass
```

→ does nothing

---

# 10. Nested Loops

A nested loop is a loop inside another loop.

Example:

```python
for i in range(3):
    for j in range(2):
        print(i, j)
```

Output:

```text
0 0
0 1
1 0
1 1
2 0
2 1
```

Understand the execution order:

```text
i = 0
    j = 0
    j = 1

i = 1
    j = 0
    j = 1

i = 2
    j = 0
    j = 1
```

The inner loop completes **for every iteration of the outer loop**.

---

# 11. Nested Loop Pattern: Multiplication Table

```python
for i in range(1, 4):
    for j in range(1, 4):
        print(i * j)
```

The outer loop controls one dimension.

The inner loop controls another.

Nested loops commonly appear in:

* matrices
* grids
* combinations
* pattern printing
* comparing every pair
* searching a 2D structure

---

# 12. Nested Loop Time Complexity

This is extremely important for interviews.

Consider:

```python
for i in range(n):
    for j in range(n):
        print(i, j)
```

Outer loop:

```text
n iterations
```

For every outer iteration, inner loop:

```text
n iterations
```

Total:

```text
n × n = n²
```

Therefore:

**Time complexity = O(n²)**

---

## Different loop sizes

```python
for i in range(n):
    for j in range(m):
        print(i, j)
```

Complexity:

**O(n × m)**

Not automatically O(n²), because `n` and `m` may be different.

---

## Three nested loops

```python
for i in range(n):
    for j in range(n):
        for k in range(n):
            print(i, j, k)
```

Iterations:

```text
n × n × n
```

Therefore:

**O(n³)**

---

# 13. Nested Loops Don't Always Mean O(n²)

This is an important interview trap.

Consider:

```python
for i in range(n):
    print(i)

for j in range(n):
    print(j)
```

These loops are sequential, not nested.

Complexity:

```text
O(n) + O(n)
= O(2n)
= O(n)
```

So the answer is:

**O(n)**

Not O(n²).

---

# 14. `enumerate()`

Suppose you need both:

* the index
* the value

You could write:

```python
names = ["Alice", "Bob", "Charlie"]

for i in range(len(names)):
    print(i, names[i])
```

But Python provides a cleaner solution:

```python
for i, name in enumerate(names):
    print(i, name)
```

Output:

```text
0 Alice
1 Bob
2 Charlie
```

### Why use `enumerate()`?

It is:

* cleaner
* more readable
* less error-prone
* idiomatic Python

---

## Starting index

You can specify where enumeration starts:

```python
names = ["Alice", "Bob", "Charlie"]

for i, name in enumerate(names, start=1):
    print(i, name)
```

Output:

```text
1 Alice
2 Bob
3 Charlie
```

---

# 15. `zip()`

`zip()` lets you iterate over multiple iterables simultaneously.

Example:

```python
names = ["Alice", "Bob", "Charlie"]
scores = [90, 85, 95]

for name, score in zip(names, scores):
    print(name, score)
```

Output:

```text
Alice 90
Bob 85
Charlie 95
```

Think:

> `zip()` pairs corresponding elements.

---

## Important `zip()` behavior

If the lengths differ:

```python
a = [1, 2, 3, 4]
b = ["a", "b"]

for x, y in zip(a, b):
    print(x, y)
```

Output:

```text
1 a
2 b
```

By default, `zip()` stops when the **shortest iterable is exhausted**.

This is a common interview question.

---

# 16. `enumerate()` vs `zip()`

### `enumerate()`

Use when you need:

```text
index + value
```

Example:

```python
for index, value in enumerate(values):
    ...
```

### `zip()`

Use when you need:

```text
value from iterable A + value from iterable B
```

Example:

```python
for name, score in zip(names, scores):
    ...
```

You can also combine them:

```python
for index, (name, score) in enumerate(zip(names, scores)):
    print(index, name, score)
```

---

# 17. Common Iteration Patterns

These patterns are worth memorizing for interviews.

## Pattern 1: Sum

```python
total = 0

for num in numbers:
    total += num
```

---

## Pattern 2: Count

```python
count = 0

for num in numbers:
    if num > 10:
        count += 1
```

---

## Pattern 3: Find maximum

```python
maximum = numbers[0]

for num in numbers:
    if num > maximum:
        maximum = num
```

---

## Pattern 4: Find minimum

```python
minimum = numbers[0]

for num in numbers:
    if num < minimum:
        minimum = num
```

---

## Pattern 5: Search

```python
found = False

for num in numbers:
    if num == target:
        found = True
        break
```

---

## Pattern 6: Filter

```python
result = []

for num in numbers:
    if num % 2 == 0:
        result.append(num)
```

---

## Pattern 7: Transform

```python
result = []

for num in numbers:
    result.append(num * 2)
```

---

## Pattern 8: Reverse iteration

```python
for i in range(len(numbers) - 1, -1, -1):
    print(numbers[i])
```

Or, when appropriate:

```python
for num in reversed(numbers):
    print(num)
```

---

## Pattern 9: Iterate over dictionary

```python
for key, value in data.items():
    print(key, value)
```

---

## Pattern 10: Pairwise comparison

```python
for i in range(len(numbers)):
    for j in range(i + 1, len(numbers)):
        print(numbers[i], numbers[j])
```

This pattern is very common in coding interviews.

Notice that the inner loop starts at:

```python
i + 1
```

rather than `0`.

That avoids comparing an element with itself and avoids duplicate pairs.

---

# 18. Common Mistakes

### Mistake 1: Off-by-one errors

```python
for i in range(1, 5):
```

produces:

```text
1 2 3 4
```

Not `1 2 3 4 5`.

Remember:

> `range()` excludes the stop value.

---

### Mistake 2: Infinite `while` loop

```python
x = 0

while x < 5:
    print(x)
```

`x` never changes.

---

### Mistake 3: Confusing `break` and `continue`

```python
break
```

ends the loop.

```python
continue
```

only skips one iteration.

---

### Mistake 4: Modifying a list while iterating over it

This can produce surprising behavior:

```python
numbers = [1, 2, 3, 4, 5]

for num in numbers:
    if num % 2 == 0:
        numbers.remove(num)
```

Avoid modifying the collection you're currently iterating over unless you deliberately understand the consequences.

A safer approach is often:

```python
numbers = [num for num in numbers if num % 2 != 0]
```

---

### Mistake 5: Using `range(len(...))` unnecessarily

Instead of:

```python
for i in range(len(names)):
    print(names[i])
```

prefer:

```python
for name in names:
    print(name)
```

If you need the index:

```python
for i, name in enumerate(names):
    print(i, name)
```

---

# 19. Interview Questions You Should Be Able to Answer

Before coding, make sure you can explain these verbally:

### Q1

What is the difference between `for` and `while`?

### Q2

What does `range(5)` produce?

### Q3

What is the difference between `break` and `continue`?

### Q4

What is `pass` used for?

### Q5

What happens when a `while` loop's condition never becomes false?

### Q6

What is the time complexity of:

```python
for i in range(n):
    for j in range(n):
        ...
```

### Q7

What is the complexity of two sequential O(n) loops?

### Q8

When would you use `enumerate()`?

### Q9

When would you use `zip()`?

### Q10

What happens if the iterables passed to `zip()` have different lengths?

---

# 20. Output Prediction — How to Think

Don't mentally execute the whole program randomly.

Use a **trace table**.

For:

```python
x = 0

for i in range(3):
    x += i
    print(x)
```

Track:

| Iteration | `i` | `x` |
| --------- | --: | --: |
| 1         |   0 |   0 |
| 2         |   1 |   1 |
| 3         |   2 |   3 |

Output:

```text
0
1
3
```

For nested loops, track the outer variable first and then the inner variable.

---

# 21. Coding Exercises

These are the kinds of problems I'd expect you to practice after mastering the fundamentals.

### Exercise 1 — Count evens

Given:

```python
numbers = [4, 7, 2, 9, 10, 13]
```

Count how many numbers are even.

---

### Exercise 2 — Sum until zero

Given:

```python
numbers = [5, 8, 3, 0, 9, 10]
```

Use a loop to sum numbers until `0` is encountered.

Expected result:

```text
16
```

---

### Exercise 3 — Find first duplicate

Given:

```python
numbers = [4, 7, 2, 7, 9]
```

Find the first value that appears twice.

---

### Exercise 4 — Reverse a string

Without using slicing:

```python
"python"
```

produce:

```text
"nohtyp"
```

---

### Exercise 5 — Character frequency

Given:

```python
"banana"
```

produce a frequency dictionary:

```python
{"b": 1, "a": 3, "n": 2}
```

---

### Exercise 6 — Find pairs

Given:

```python
numbers = [1, 2, 3, 4]
```

Print every pair where the sum is `5`.

---

### Exercise 7 — FizzBuzz

Print numbers from 1 through 20.

* multiples of 3 → `Fizz`
* multiples of 5 → `Buzz`
* multiples of both → `FizzBuzz`
* otherwise → number

This is a classic beginner interview question.

---

# 22. Interview-Level Mental Model

When you see a loop problem, ask these questions:

### Step 1 — What am I iterating over?

```text
list?
string?
dictionary?
range?
two lists?
matrix?
```

### Step 2 — Do I need the index?

If yes:

```python
enumerate()
```

### Step 3 — Do I need multiple sequences together?

If yes:

```python
zip()
```

### Step 4 — Do I need to stop early?

If yes:

```python
break
```

### Step 5 — Do I just want to skip certain elements?

If yes:

```python
continue
```

### Step 6 — Do I need a placeholder?

If yes:

```python
pass
```

### Step 7 — Do I need to repeat based on a condition?

Consider:

```python
while
```

### Step 8 — Are loops nested?

Calculate how many times each loop executes.

That gives you the time complexity.

---

# 23. Your Test — Do This Before We Move On

I'm going to test you on **all the important concepts above**, including code tracing, complexity, `break`, `continue`, `range()`, `enumerate()`, `zip()`, and nested loops.

**Don't look for explanations yet. Choose your answers first.**

**Stop here.** Take the test first. Once you submit it, I'll use your performance to decide what to reinforce before introducing the next Python interview topic.
