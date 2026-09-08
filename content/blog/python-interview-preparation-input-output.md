---
title: "Python Interview Preparation - Input & Output"
date: "2026-09-08"
description: ""
tags: ["Python"]
---

Absolutely. We’ll treat **Input & Output** as an interview-training module, not a chapter to read.

We’ll proceed in small checkpoints. **I will not reveal answers to test questions until you attempt them.** If you make a mistake, I’ll diagnose the exact misconception, reteach it, and retest you.

# Prompt 7 — Input & Output

## Roadmap

We’ll cover:

1. `input()`
2. `print()`
3. `sep` and `end`
4. String formatting
5. f-strings
6. Format specifications
7. Reading files
8. Writing files
9. File modes
10. Text vs binary files
11. Encoding
12. `with`
13. Basic context managers
14. Common I/O errors
15. Mixed interview problems

And throughout, I'll track weaknesses such as:

> **Weakness tracker:**
> Nothing yet — we haven't tested you.

---

# 1. `input()`

## First-principles mental model

Think of your Python program as communicating with the outside world:

```text
outside world
     ↓
   input()
     ↓
 Python program
     ↓
   print()
     ↓
outside world
```

`input()` gets information from the user.

The most important fact for interviews is:

> **`input()` always returns a string.**

For example:

```python
name = input("Enter your name: ")
print(name)
```

If the user enters:

```text
Alice
```

then:

```python
name
```

contains:

```python
"Alice"
```

—not a special "input value" type.

### Numbers

Suppose:

```python
age = input("Enter your age: ")
```

The user types:

```text
25
```

`age` is still:

```python
"25"
```

So this is problematic:

```python
age = input("Age: ")

print(age + 5)
```

because Python sees:

```python
"25" + 5
```

which is mixing a string and an integer.

We explicitly convert:

```python
age = int(input("Age: "))
print(age + 5)
```

Mental model:

```text
input()
  ↓
string
  ↓
optional conversion
  ↓
int / float / etc.
```

For example:

```python
price = float(input("Price: "))
count = int(input("Count: "))
```

### Important interview distinction

These are different:

```python
input()
int(input())
float(input())
```

`input()` performs the reading.

`int()` / `float()` perform conversion afterward.

---

# 2. `print()`

`print()` sends information to standard output, usually your terminal.

```python
print("Hello")
```

You can print multiple things:

```python
name = "Alice"
age = 25

print(name, age)
```

Output:

```text
Alice 25
```

By default, `print()` puts a **space between arguments** and a **newline at the end**.

Conceptually:

```python
print("Alice", 25)
```

behaves approximately like:

```text
Alice + " " + 25 + "\n"
```

The actual implementation is more nuanced, but that's the useful mental model.

---

# 3. `sep`

`sep` controls what goes **between multiple arguments**.

```python
print("2026", "09", "07", sep="-")
```

Output:

```text
2026-09-07
```

Another example:

```python
print("Python", "Java", "C++", sep=" | ")
```

Output:

```text
Python | Java | C++
```

### Important distinction

`sep` affects the **inside**:

```text
A sep B sep C
```

while `end` affects what happens **after everything**.

---

# 4. `end`

By default:

```python
print("Hello")
print("World")
```

produces:

```text
Hello
World
```

because `print()` normally ends with:

```python
end="\n"
```

We can change it:

```python
print("Hello", end=" ")
print("World")
```

Output:

```text
Hello World
```

Or:

```python
print("A", end="---")
print("B")
```

Output:

```text
A---B
```

### Mental model

```python
print(A, B, sep="...", end="...")
```

means roughly:

```text
A
 ↓
separator
 ↓
B
 ↓
end
```

So:

```python
print("A", "B", sep="-", end="!")
```

produces:

```text
A-B!
```

---

# Checkpoint 1 — Explain it yourself

Don't look anything up. Explain these in your own words:

1. What does `input()` return?
2. Why would we write `int(input(...))`?
3. What's the difference between `sep` and `end`?
4. What does `print()` do by default between arguments?
5. What does `print()` normally put at the end?

**Answer these five first.**

Then I'll give you **Output Round 1**.


Input returns the user response.
By default the input() returns the user input as a string, Inorder to explicitly convert the input to a integer we use this.
sep are used to control what comes in between multiple arguments. while the end controls what comes at the end of all the multiple arguments. By default end is "\n"(new line). By default sep creates a blank space between multiple argumnets.
By default print() create blank or space between arguments.
print() by default creates a new line at the end "\n".

Good. Your understanding is solid so far. Let me tighten a couple of details before we test you.

Good. Your understanding is **solid so far**. Let me tighten a couple of details before we test you.

### Feedback

1. **`input()`** — Correct, but for interviews say precisely: **`input()` returns a string containing the user's entered input**.

2. **`int(input())`** — Correct. More precisely:

   ```python
   int(input())
   ```

   first calls `input()`, then passes the resulting string to `int()` for conversion.

3. **`sep` vs `end`** — Correct.

   * `sep` → between arguments
   * `end` → after all arguments
   * defaults: `sep=" "`, `end="\n"`

4. **`print()` spacing** — Correct.

5. **Newline** — Correct.

No weakness to record yet. ✅

---

# Output Round 1 — Predict, Don't Run

**Do not execute these.** Reason through them.

### Question 1

```python
print("A", "B", "C")
```

What is the exact output?

---

### Question 2

```python
print("A", "B", "C", sep="-")
```

Exact output?

---

### Question 3

```python
print("A", end="")
print("B")
```

Exact output?

---

### Question 4

```python
print("A", "B", sep="---", end="!!!")
```

Exact output?

---

### Question 5 — Slightly trickier

```python
x = input()
print(x + "10")
```

The user enters:

```text
5
```

What is printed?

And **why**?

---

### Question 6 — Interview-style

```python
x = input()
y = int(input())

print(x + str(y))
```

The user enters:

```text
10
20
```

What is the output?

Explain the types of `x` and `y`.

---

Answer **all six**, including your reasoning. I won't reveal the answers until you've attempted them.


1. A B C
2. A-B-C
3. AB
4. A---B!!!
5. "510" as both the input and the string are concatinated,
6. 1020, Both values are string, the value of y is converted to int and then again changed to str when concatenation. While x reamins as a string.

Excellent — **6/6**. Your output reasoning is correct.

One small terminology correction for interview precision:

> In Q5, `"5"` and `"10"` are **concatenated**, not numerically added.

And in Q6, you correctly noticed the important sequence:

```text
input() → "20"
int(...) → 20
str(...) → "20"
```

So the final operation is string concatenation.

### Weakness tracker

| Area                       | Status   |
| -------------------------- | -------- |
| `input()` returns `str`    | ✅ Strong |
| `int(input())`             | ✅ Strong |
| `print()`                  | ✅ Strong |
| `sep`                      | ✅ Strong |
| `end`                      | ✅ Strong |
| Type conversion during I/O | ✅ Strong |

Let's increase the difficulty.

---

# 5. String Formatting

Suppose we have:

```python
name = "Alice"
age = 25
```

We could write:

```python
print("My name is", name, "and I am", age, "years old.")
```

This works, but becomes cumbersome when strings contain lots of variables.

Python provides **string formatting** to make this cleaner.

There are several approaches you'll encounter in interviews and real code.

---

## Method 1 — Concatenation

```python
name = "Alice"
age = 25

print("My name is " + name + " and I am " + str(age))
```

Notice the `str(age)`.

Why?

Because:

```python
"age: " + 25
```

is invalid.

String concatenation requires strings.

---

## Method 2 — `%` formatting

Older Python code may use:

```python
name = "Alice"
age = 25

print("My name is %s and I am %d years old." % (name, age))
```

Here:

* `%s` → string
* `%d` → integer

You should **recognize** this syntax in interviews, even though modern Python generally prefers f-strings.

---

## Method 3 — `str.format()`

```python
name = "Alice"
age = 25

print("My name is {} and I am {} years old.".format(name, age))
```

Python replaces the `{}` placeholders with the supplied values.

You can also specify positions:

```python
print("{1} is {0} years old.".format(age, name))
```

Output:

```text
Alice is 25 years old.
```

Notice:

```text
{0} → first argument → age
{1} → second argument → name
```

---

# 6. f-strings

For modern Python, this is the syntax you should become extremely comfortable with.

```python
name = "Alice"
age = 25

print(f"My name is {name} and I am {age} years old.")
```

The `f` before the opening quote tells Python:

> Evaluate expressions inside `{}` and put their results into the string.

For example:

```python
a = 10
b = 20

print(f"{a} + {b} = {a + b}")
```

Output:

```text
10 + 20 = 30
```

Notice something important:

```python
{a + b}
```

doesn't have to be just a variable.

It can contain a Python expression.

For example:

```python
name = "alice"

print(f"Hello, {name.upper()}!")
```

Output:

```text
Hello, ALICE!
```

---

# 7. Format specifications

This is where f-strings become particularly useful.

The general pattern is:

```python
f"{expression:format_spec}"
```

The part after `:` is the **format specification**.

---

## Decimal places

```python
price = 12.34567

print(f"{price:.2f}")
```

Output:

```text
12.35
```

Meaning:

```text
.2f
 │ │
 │ └── floating-point representation
 └──── 2 digits after decimal
```

Another:

```python
pi = 3.14159265

print(f"{pi:.3f}")
```

Output:

```text
3.142
```

---

## Width

```python
name = "Bob"

print(f"{name:10}")
```

This gives the string a minimum width of 10 characters.

By default, text is left-aligned within that space.

This becomes useful for tables.

---

## Alignment

```python
name = "Bob"

print(f"{name:<10}")
print(f"{name:>10}")
print(f"{name:^10}")
```

Conceptually:

```text
<  left
>  right
^  center
```

---

## Thousands separators

```python
number = 1000000

print(f"{number:,}")
```

Output:

```text
1,000,000
```

---

## Percentages

```python
rate = 0.756

print(f"{rate:.1%}")
```

Output:

```text
75.6%
```

The `%` format multiplies the value by 100 and displays it as a percentage.

---

# Interview Trap

These are **not** the same:

```python
x = 5

print(f"{x}")
print("{x}")
```

The first is an f-string:

```text
5
```

The second is an ordinary string:

```text
{x}
```

The `f` matters.

---

# Checkpoint 2 — Explain It Yourself

Before I give you output questions, explain these in your own words:

1. Why might f-strings be preferable to manually concatenating strings?
2. What does the `f` in `f"..."` tell Python to do?
3. What does `{a + b}` inside an f-string mean?
4. In:

   ```python
   f"{price:.2f}"
   ```

   what does `.2f` mean?
5. What do `<`, `>` and `^` mean in a format specification?
6. What's the difference between:

   ```python
   f"{x}"
   ```

   and

   ```python
   "{x}"
   ```

**Don't worry about using textbook wording. Explain them as if you're teaching me.**

1. f string evaluates any variable inside the curly braces, this helps in simplifying any value changes to the input without restraint. 
2. The f befor the string tell the python to evaluate values insdie the  {}  when it is added to the front of the string.
3. The expression will perfom the mentioned operation inside the f-string and print it out when called.
4. the .ef is a format specification used in f-strings. The .2 denotes the number of digits after the decimal while the f denotes the values of price to be a float.
5. These are format specifications that are used for alignment of the printed values, they are respectively left, right and center.
6. The first one is a f-string while the second one is actually a string that prints "{x}"

Good work. Your core model is correct. I'd rate this **5.5/6** for interview readiness.

### Feedback

1. **f-strings** — Correct idea. One refinement: f-strings don't specifically "evaluate any variable"; they evaluate **expressions** inside `{}`.

2. **`f` prefix** — Correct. ✅

3. **`{a + b}`** — Correct. It evaluates the expression and inserts its resulting value. ✅

4. **`.2f`** — Almost perfect. Small correction:

   * `.2` → 2 digits after the decimal point
   * `f` → format the value as **fixed-point notation**

   It doesn't convert the value to a float. For example, the formatting syntax itself isn't a type conversion.

5. **`<`, `>`, `^`** — Correct. ✅

6. **`f"{x}"` vs `"{x}"`** — Correct. ✅

### Weakness tracker

| Area                  | Status                                         |
| --------------------- | ---------------------------------------------- |
| `input()`             | 🟢 Strong                                      |
| `print()`             | 🟢 Strong                                      |
| `sep` / `end`         | 🟢 Strong                                      |
| Basic formatting      | 🟢 Strong                                      |
| f-strings             | 🟢 Strong                                      |
| Format specifications | 🟢 Strong, minor `.2f` misconception corrected |

---

# Output Round 2 — Interview Difficulty

Now don't run these. **Predict the exact output.**

### Q1

```python
name = "Python"
version = 3

print(f"{name} {version}")
```

---

### Q2

```python
a = 10
b = 3

print(f"{a + b}")
print(f"{a / b:.2f}")
```

Give both lines.

---

### Q3

```python
x = 0.7564

print(f"{x:.2f}")
print(f"{x:.1%}")
```

---

### Q4

```python
name = "Bob"

print(f"|{name:<10}|")
print(f"|{name:>10}|")
print(f"|{name:^10}|")
```

You need to account for the spaces.

---

### Q5 — Important trap

```python
x = 10

print("{x}")
print(f"{x}")
```

What are the two outputs?

---

### Q6 — Reason carefully

```python
name = "Alice"
age = 20

result = f"{name} will be {age + 5} years old."

print(result)
```

What is printed?

---

### Q7 — Interview follow-up

What happens here?

```python
price = 12.5

print(f"{price:.2f}")
print(type(price))
```

Does `.2f` change `price` itself?

**Explain why.**

---

Answer all 7. **Don't execute them.** I'm particularly interested in your reasoning for Q4 and Q7.

1. Python 3
2. 13 - first line , 3.33- second line
3. 0.75, 75.6%
4. |Bob                   |, |           Bob           |, |                          Bob|,
5. {x}, 10
6. Alice will be 25 years old.
7. 12.50, float. no the .2f will not change the value of price as value is not assigned to price during updation. 

Very good. **6/7 fully correct, with one important formatting mistake in Q3 and a spacing issue in Q4.** Your underlying reasoning is strong.

## Results

### Q1 — ✅

```text
Python 3
```

Correct.

### Q2 — ✅

```text
13
3.33
```

Correct.

### Q3 — ⚠️ First line incorrect

You said:

```text
0.75
75.6%
```

The second is correct.

The first needs rounding:

```python
x = 0.7564
print(f"{x:.2f}")
```

`.2f` means **two digits after the decimal, with rounding**.

So `0.7564` becomes:

```text
0.76
```

This is worth remembering because interviewers commonly test format-specification rounding.

### Q4 — ⚠️ Concept correct, spacing overestimated

The width is **10 characters total**, not 10 spaces plus the word.

`"Bob"` has 3 characters, so there are:

```text
10 - 3 = 7
```

spaces available.

Conceptually:

```text
|Bob       |
|       Bob|
|   Bob    |
```

Your understanding of left/right/center alignment is correct; you just didn't count the field width precisely.

### Q5 — ✅

```text
{x}
10
```

Exactly.

### Q6 — ✅

```text
Alice will be 25 years old.
```

Correct.

### Q7 — ✅ Excellent

You correctly identified:

```text
12.50
<class 'float'>
```

and correctly reasoned that formatting doesn't modify `price`.

A useful mental model is:

```text
price = 12.5

f"{price:.2f}"
       ↓
formatted representation
       ↓
"12.50"
```

The original object/value referenced by `price` isn't changed.

---

## Weakness tracker

| Area             | Status                                      |
| ---------------- | ------------------------------------------- |
| `input()`        | 🟢 Strong                                   |
| `print()`        | 🟢 Strong                                   |
| `sep` / `end`    | 🟢 Strong                                   |
| Basic formatting | 🟢 Strong                                   |
| f-strings        | 🟢 Strong                                   |
| `.2f`            | 🟡 **Needs practice: rounding**             |
| Width/alignment  | 🟡 **Needs practice: counting field width** |

We'll deliberately mix those into later questions.

---

# 8. Reading Files

Now we're moving from **console I/O** to **file I/O**.

## Mental model

Think of a file like a stream of data stored somewhere:

```text
Your Python program
       │
       │ open
       ▼
     file
       │
       │ read
       ▼
   Python data
```

Python needs to establish a connection to the file before reading from or writing to it.

We do that with `open()`.

```python id="q0d4qz"
file = open("notes.txt", "r")
```

Here:

* `"notes.txt"` → filename
* `"r"` → mode: **read**

Then:

```python id="gq0z5b"
content = file.read()
print(content)
```

Finally, traditionally:

```python id="u1cknq"
file.close()
```

Closing matters because the program has an operating-system resource associated with the open file.

---

# 9. Reading methods

There are several common ways to read.

### `read()`

```python id="o5xq3f"
file = open("notes.txt", "r")

content = file.read()

file.close()
```

`read()` reads the file's contents and returns them as a string in text mode.

If the file contains:

```text
Hello
Python
World
```

then conceptually:

```python
content
```

contains:

```text
"Hello\nPython\nWorld"
```

---

### `readline()`

```python id="6ehyqk"
file = open("notes.txt", "r")

line = file.readline()

file.close()
```

This reads one line.

If the file contains:

```text
Hello
Python
World
```

the first `readline()` gives:

```text
"Hello\n"
```

Notice the newline is generally part of the returned text.

---

### `readlines()`

```python id="glk3iq"
lines = file.readlines()
```

This returns a list of lines:

```python
[
    "Hello\n",
    "Python\n",
    "World"
]
```

---

## Iterating over a file

A very common pattern is:

```python id="4e8c4h"
with open("notes.txt", "r") as file:
    for line in file:
        print(line)
```

This processes the file line by line.

That's often preferable to loading a potentially huge file entirely into memory.

### Complexity

If a file has `n` characters:

* `read()` generally requires **O(n)** time.
* It also stores the contents in memory → **O(n)** additional space.
* Iterating line-by-line can avoid storing the entire file at once → generally much lower additional memory usage.

This distinction can come up in interviews.

---

# 10. Writing Files

Use `"w"`:

```python id="4n0qsm"
file = open("notes.txt", "w")

file.write("Hello Python")

file.close()
```

If the file doesn't exist, Python can create it.

If it already exists, `"w"` generally **truncates/overwrites the existing contents**.

That's a major interview trap.

Suppose the existing file contains:

```text
Old data
```

Then:

```python
open("notes.txt", "w")
```

and writing:

```python
file.write("New data")
```

results in:

```text
New data
```

not:

```text
Old data
New data
```

---

# 11. Append mode

Use `"a"`:

```python id="5kj3rd"
with open("notes.txt", "a") as file:
    file.write("New line\n")
```

Append means:

> Write at the end of the existing file.

So if it contains:

```text
Hello
```

after the operation it becomes:

```text
Hello
New line
```

assuming the existing file ended appropriately.

---

# 12. File modes

The most important basic modes:

| Mode  | Meaning                                      |
| ----- | -------------------------------------------- |
| `"r"` | Read                                         |
| `"w"` | Write; truncate existing file                |
| `"a"` | Append                                       |
| `"x"` | Create a new file; fail if it already exists |
| `"b"` | Binary mode modifier                         |
| `"t"` | Text mode modifier                           |

You can combine modes.

For example:

```python
"rb"
```

means:

> read + binary

and:

```python
"wb"
```

means:

> write + binary

You may also encounter:

```python
"r+"
"w+"
"a+"
```

These allow combinations of reading and writing, but we'll concentrate on the fundamentals first.

---

# 13. Text vs Binary

This distinction is important.

### Text mode

```python id="6d8n3a"
open("notes.txt", "r")
```

Python treats the file as **text** and decodes bytes into strings.

So:

```python
data = file.read()
```

typically gives:

```python
str
```

### Binary mode

```python id="t8tq3e"
open("image.jpg", "rb")
```

Now Python gives you:

```python
bytes
```

rather than `str`.

Mental model:

```text
TEXT FILE

disk
 ↓
bytes
 ↓ decoding
str
 ↓
Python
```

versus:

```text
BINARY FILE

disk
 ↓
bytes
 ↓
Python
```

Binary mode is appropriate for things such as images, PDFs, audio, executable files, etc.

---

# 14. Encoding

Computers ultimately store bytes.

But humans work with characters:

```text
A
é
中
₹
```

An **encoding** defines how characters are represented as bytes.

UTF-8 is the most common encoding you'll encounter.

You can explicitly specify it:

```python
with open("notes.txt", "r", encoding="utf-8") as file:
    content = file.read()
```

When writing:

```python
with open("notes.txt", "w", encoding="utf-8") as file:
    file.write("Hello ₹")
```

This tells Python which encoding to use when converting between:

```text
characters ↔ bytes
```

### Interview trap

Encoding and file mode are different concepts.

```python
"rb"
```

means binary mode.

It does **not** mean "UTF-8 binary."

Likewise:

```python
encoding="utf-8"
```

is about character encoding, primarily relevant to text I/O.

---

# 15. `with` and Context Managers

Now we're at one of the most important concepts in Python.

Instead of:

```python
file = open("notes.txt", "r")

content = file.read()

file.close()
```

we normally write:

```python
with open("notes.txt", "r") as file:
    content = file.read()
```

The mental model:

```text
with
 ↓
acquire resource
 ↓
use resource
 ↓
automatically clean up resource
```

For a file, the resource is the open file.

So `with` helps ensure the file gets closed even if something goes wrong inside the block.

Conceptually:

```python
with resource as x:
    do_something()
```

means something like:

```text
set up resource
try:
    use resource
finally:
    clean up resource
```

That's not the exact implementation, but it's the right beginner mental model.

We'll study **how context managers actually work using `__enter__` and `__exit__` later**. For now, remember the purpose:

> **A context manager manages setup and cleanup of a resource.**

Files are one common example.

---

# Common I/O Errors

You'll encounter exceptions when working with files.

### `FileNotFoundError`

```python
open("does_not_exist.txt", "r")
```

If the file isn't there, Python can raise:

```text
FileNotFoundError
```

### `PermissionError`

You may lack permission to read/write a file.

### `IsADirectoryError`

You try to open a directory as if it were a regular file.

### `UnicodeDecodeError`

Python attempts to decode bytes using an incompatible encoding.

For example, the actual file encoding may not match the encoding Python is trying to use.

### `FileExistsError`

Especially relevant with:

```python
open("file.txt", "x")
```

If the file already exists, `"x"` fails rather than overwriting it.

---

# Your Turn — File I/O Reasoning

Before we continue, I want you to demonstrate that the mental model is working.

### Question 1

What's the difference between:

```python
open("data.txt", "r")
```

and:

```python
open("data.txt", "w")
```

What happens if `data.txt` already exists?

---

### Question 2

What's the difference between:

```python
"r"
```

and:

```python
"rb"
```

What type of data would you normally get from reading in each case?

---

### Question 3

Why is this:

```python
with open("data.txt") as f:
    data = f.read()
```

generally preferable to:

```python
f = open("data.txt")
data = f.read()
f.close()
```

---

### Question 4

Explain encoding in your own words.

Try to explain the relationship between:

```text
characters
bytes
encoding
```

without using a memorized definition.

---

### Question 5 — Interview trap

A file contains:

```text
ABC
DEF
GHI
```

What kind of Python object would you expect from:

```python
with open("data.txt", "r") as f:
    x = f.read()
```

and from:

```python
with open("data.txt", "r") as f:
    x = f.readlines()
```

---

### Question 6 — Output/reasoning

Suppose `data.txt` initially contains:

```text
Hello
```

Then this runs:

```python
with open("data.txt", "w") as f:
    f.write("Python")
```

What does the file contain afterward?

---

### Question 7 — Slightly harder

Suppose `data.txt` initially contains:

```text
Hello
```

Then:

```python
with open("data.txt", "a") as f:
    f.write(" Python")
```

What does the file contain afterward?

---

### Question 8 — Interview question

Why can reading a **very large file** with:

```python
data = f.read()
```

be a memory problem?

What alternative would you consider?

---

Answer **all 8 in your own words**. Then I'll assess you and give you the first **file-I/O coding exercise**.

1. The first one is used to open the file with read access. while the second one is used to open the file with write access.
2. the first opens the said file in text mode, we get the as string. the second one opens in binary mode. The data is read in bytes.
3. Using with is more preferred cause it is similar to try except. Using with opens the file uisng the resources and once it is completely, it cleans up all resources used. The other method requires manual read and close the file which is read.
4. the text that are visible in general are characteres, the same text are stored in the disk in bytes, these are not understanable by humans and can only be undertsood by machine. The encoding is the process of converting the bytes into characters, there are many different encoding methods. the most used is utf-8. If other encoding are used, they can result in creation of other character formats.
5. From the first code we can expect the variable x to have storred the entire file text in it. The second code will have a list with each line as a value = ['ABC','DEF','GHI'].
6. The file will contain 'Python', the file is opened in write mode, so any content is replaced with the new content.
7. The file will contain 'Hello Python', the file is opened in append mode, so any content is appending to existing content.
8. Reading a entire file for example in several thousand lines can cause the system to lag. A better option would be to use readlines() and store entire file by each line as a value. This way less space is consummed. Or we can have a for loop and inside it call each line of the file, this way only one line is accessed at one time from the read operation.

Strong attempt. I'd rate this **7.5/8** conceptually. You understand the important file-I/O model, but there are **two interview-level misconceptions** I want to correct before we move on.

## Assessment

### 1. `"r"` vs `"w"` — 🟢 Correct

Yes.

* `"r"` → read
* `"w"` → write and **truncate** an existing file

You didn't explicitly mention the truncation in your answer, but you demonstrated that understanding in Q6.

---

### 2. `"r"` vs `"rb"` — 🟢 Correct

Exactly:

```text
"r"  → text mode → str
"rb" → binary mode → bytes
```

Good.

---

### 3. `with` — 🟢 Mostly correct

Your resource-management understanding is good.

One terminology correction:

> `with` isn't "similar to try-except."

It's more closely related to **`try/finally`** because the important guarantee is cleanup.

Conceptually:

```python
with open(...) as f:
    ...
```

is roughly:

```python
f = open(...)
try:
    ...
finally:
    f.close()
```

The key idea is:

> **Cleanup happens even if an exception occurs.**

We'll later learn how `__enter__()` and `__exit__()` make this work.

---

### 4. Encoding — 🟡 Important misconception

You said:

> "The encoding is the process of converting the bytes into characters"

You're close, but encoding works **in both directions**.

Think:

```text
          encoding
characters ──────────→ bytes
          decoding
characters ←────────── bytes
```

For UTF-8:

```python
"₹"
```

is a character/string representation in Python.

When written to a file, it gets encoded into bytes.

When those bytes are read as text, Python decodes them back into characters.

So:

* **encoding** → characters → bytes
* **decoding** → bytes → characters

This distinction is a common interview question.

Also, different encodings don't necessarily produce "other character formats." More precisely, **the same characters can have different byte representations under different encodings**.

---

### 5. `read()` vs `readlines()` — 🟡 One important detail

Your overall distinction is correct:

```python
read()
```

→ one string containing the file contents.

```python
readlines()
```

→ list of strings, one per line.

But you wrote:

```python
['ABC','DEF','GHI']
```

The actual result generally includes newline characters:

```python
['ABC\n', 'DEF\n', 'GHI']
```

assuming the first two lines end with newlines.

This is a classic interview trap.

---

### 6. `"w"` — 🟢 Correct

Exactly:

```text
Hello
```

becomes:

```text
Python
```

---

### 7. `"a"` — 🟢 Correct

Exactly:

```text
Hello Python
```

---

### 8. Large files — 🟢 Correct core idea, but one correction

Your second idea is good:

```python
for line in f:
    ...
```

can process the file incrementally.

However, `readlines()` is **not** a memory-saving solution.

You said:

> "readlines() ... less space is consumed."

Actually:

```python
f.readlines()
```

loads **all the lines into a list**, so for a huge file it can still consume substantial memory.

Better:

```python
with open("large.txt") as f:
    for line in f:
        process(line)
```

Mental model:

```text
read()
    ↓
entire file in memory

readlines()
    ↓
all lines in a list in memory

for line in f
    ↓
process incrementally
```

---

# Weakness Tracker — Updated

| Area                       | Status                              |
| -------------------------- | ----------------------------------- |
| `input()`                  | 🟢 Strong                           |
| `print()`                  | 🟢 Strong                           |
| `sep` / `end`              | 🟢 Strong                           |
| f-strings                  | 🟢 Strong                           |
| `.2f` rounding             | 🟡 Practice                         |
| Formatting width           | 🟡 Practice                         |
| File modes                 | 🟢 Strong                           |
| `read()` / `readlines()`   | 🟡 **Newline + memory distinction** |
| Text vs binary             | 🟢 Strong                           |
| Encoding/decoding          | 🟡 **Needs reinforcement**          |
| `with`                     | 🟢 Good                             |
| `try/finally` relationship | 🟡 **Needs reinforcement**          |
| Large-file processing      | 🟢 Good                             |

We're **not moving on yet**. Let's fix these weaknesses through coding.

---

# Coding Exercise 1 — User Input + Formatting

Write a Python program that:

1. asks the user for their name
2. asks for their age
3. converts the age to an integer
4. prints:

```text
Hello Alice! You are 25 years old.
```

if the user enters:

```text
Alice
25
```

### Requirements

Use:

* `input()`
* `int()`
* an **f-string**

Don't just give me the final code without thinking. Explain your reasoning first, then write the code.

---

# Coding Exercise 2 — File Writing

Write a program that asks the user for:

```text
Name:
Age:
City:
```

and creates `person.txt` containing exactly:

```text
Name: Alice
Age: 25
City: Bengaluru
```

Use:

* `input()`
* an f-string
* `with`
* `"w"` mode

### Interview follow-up

Why is `"w"` potentially dangerous if the file already contains important information?

---

# Coding Exercise 3 — File Reading

Assume `person.txt` contains:

```text
Name: Alice
Age: 25
City: Bengaluru
```

Write code that reads the file and prints each line **without producing an extra blank line between lines**.

For example, your output should visually be:

```text
Name: Alice
Age: 25
City: Bengaluru
```

**Hint:** Think carefully about the newline already present in each line and what `print()` adds by default.

Don't use `.strip()` blindly—we'll discuss exactly what it does later.

---

## Interview Challenge

Finally, answer this without running anything:

```python
with open("data.txt", "r", encoding="utf-8") as f:
    for line in f:
        print(line)
```

If `data.txt` contains:

```text
A
B
C
```

**Will the output have blank lines between `A`, `B`, and `C`? Why or why not?**

This is an excellent test of whether you've actually understood the interaction between **file newlines + `print()`'s `end`**.

### Your turn

Complete **Exercises 1–3**, then answer the **Interview Challenge**. I will review your code like an interviewer, including correctness, reasoning, edge cases, and complexity.

1.name = input("Enter name:")
age = int(input("Enter age:"))
print(f"Hello {name}! You are {age} years old.")
input() always takes user input as string, so we need to convert it into int

2. name = input("Enter name:")

   age = int(input("Enter age:"))

   city = input("Enter city:")

   content = (f"""name: {name} age: {age} city: {city}""")

   with open("code1.txt", "w") as file:

     file.write(content)

If we use "w" method then any content already in the said file will be replaced by the new content. so it is always bes t to check the file that we are using.

3. with open("code1.txt", "r") as file:

     for line in file.readlines():

       print(line, end='')

final challenge:
Yes, it will have blank spaces. print by default created each argument in a new line. But since the txt file already has each word in a new line, this might create blank lines between each character.

Good coding attempt. **Exercises 1 and 3 are correct; Exercise 2 has a formatting issue; the final challenge is incorrect.** The good news is that the challenge exposes exactly the misconception we want to fix now.

## Exercise 1 — ✅ Correct

Your solution:

```python
name = input("Enter name:")
age = int(input("Enter age:"))
print(f"Hello {name}! You are {age} years old.")
```

Exactly right.

Your reasoning is also correct:

```text
input() → str
int()   → converts the string to int
```

---

## Exercise 2 — 🟡 Logic correct, output formatting needs fixing

Your approach is good:

```python
with open("code1.txt", "w") as file:
    file.write(content)
```

You correctly used:

* `input()` ✅
* `int()` ✅
* f-string ✅
* `with` ✅
* `"w"` ✅

But your f-string is:

```python
content = f"""name: {name} age: {age} city: {city}"""
```

That produces everything on **one line**:

```text
name: Alice age: 25 city: Bengaluru
```

The requested file has three lines.

The reasoning mistake is not about files—it is about **how newline characters are represented inside a string**.

Think:

```text
\n
```

means:

> move to the next line.

So you need to deliberately put newline characters into the string.

### Your interview feedback

Your explanation of `"w"` was good. One refinement:

> `"w"` doesn't mean "always check the file." It specifically means **open for writing and truncate the existing file**. Whether that's appropriate depends on the task.

---

# Exercise 3 — ✅ Correct

You wrote:

```python
with open("code1.txt", "r") as file:
    for line in file.readlines():
        print(line, end='')
```

This works.

You correctly recognized the interaction:

```text
file line
   ↓
already contains "\n"
   ↓
print(..., end="")
   ↓
don't add another "\n"
```

### One improvement

You don't actually need `readlines()` here.

You can iterate directly over the file:

```python
with open("code1.txt", "r") as file:
    for line in file:
        print(line, end="")
```

This is preferable for large files because you don't first construct a list containing all the lines.

So your solution is **correct**, but the second version is generally more memory-efficient.

---

# Final Challenge — ❌ Important misconception

You said:

> "Yes, it will have blank spaces."

Correct result: **yes, blank lines will appear — but not because `print()` creates each argument in a new line.**

This is the crucial distinction.

Suppose the file contains:

```text
A\n
B\n
C\n
```

When the loop executes:

```python
for line in f:
```

the first `line` is:

```python
"A\n"
```

Now:

```python
print(line)
```

uses the default:

```python
end="\n"
```

So Python effectively outputs:

```text
"A\n" + "\n"
```

That's **two newline characters**.

Therefore:

```text
A

B

C
```

The blank lines happen because:

1. the line already contains `\n`
2. `print()` adds another `\n`

### This is the key mental model

```text
print(line)
       │
       ├── line already has "\n"
       │
       └── print adds another "\n"
                    ↓
              blank line
```

Whereas:

```python
print(line, end="")
```

does:

```text
line already has "\n"
       +
end=""
       ↓
only one newline
```

---

# Let's Fix This Before Moving On

I want you to demonstrate that you've corrected the misconception.

## Mini-test A

What is the **exact output**, including blank lines?

```python
print("A")
print("B", end="")
print("C")
```

---

## Mini-test B

Suppose:

```python
line = "Hello\n"
```

What happens with:

```python
print(line)
```

How many newline characters are involved?

---

## Mini-test C

What happens with:

```python
line = "Hello\n"
print(line, end="")
```

Why?

---

## Mini-test D — Fix the code

Suppose:

```text
data.txt
```

contains:

```text
Python
Java
C++
```

Write the **shortest clean Python code** you can to print its contents without introducing extra blank lines.

Use `with`.

---

## Mini-test E — Encoding

In your own words, explain this:

```text
"₹"
  ↓
UTF-8 encoding
  ↓
bytes
  ↓
UTF-8 decoding
  ↓
"₹"
```

And answer:

> Is UTF-8 a file mode, or an encoding?

---

### Current status

You're close to finishing the **basic I/O section**, but I won't move you forward until you've nailed:

* newline behavior
* `read()` vs iteration
* encoding vs decoding

These are exactly the kinds of details that separate "I have used Python" from **interview-ready Python fundamentals**.

**Answer Mini-tests A–E without running them.**

Mini-test A:
A
B C
Mini-test-B:
It will have 2 new lines - one with the word 'Hello' and another blank line
mini-test-C:
It will only have 1 line with word "hello"
Mini-test D:
with open("data.txt", "r") as file:
    for line in file.read():
      print(line, end ='')
Mini-test E:
UTF-8 is a encoding format that is universally used. The rupee symbol is encoded into bytes using utf-8 encoding and stored in the disk. if the rupee symbol is used, the bytes of the rupee are converted to the symbol using the same utf-8 format.

Nice. **A, B, C and E are essentially correct. D has one important mistake**, and it's a very useful one to catch now.

## Mini-test review

### A — ✅ Correct

```text
A
B C
```

Exactly.

The key is:

```python
print("B", end="")
```

doesn't move to a new line, so `"C"` follows immediately.

---

### B — ✅ Correct

Given:

```python
line = "Hello\n"
```

then:

```python
print(line)
```

produces two newline characters overall:

```text
Hello

```

One comes from `line`, one comes from `print()`.

---

### C — ✅ Correct

```python
print(line, end="")
```

produces:

```text
Hello
```

There is only the newline already contained in `line`.

Excellent.

---

# D — ❌ Important correction

You wrote:

```python
with open("data.txt", "r") as file:
    for line in file.read():
        print(line, end='')
```

The problem is this:

```python
file.read()
```

returns **one string containing the entire file**.

For example:

```text
Python
Java
C++
```

becomes approximately:

```python
"Python\nJava\nC++"
```

Then:

```python
for line in file.read():
```

doesn't iterate over lines.

It iterates over **individual characters**:

```text
P
y
t
h
o
n
\n
J
a
v
a
...
```

So your variable called `line` isn't actually a line.

### Correct approach

```python
with open("data.txt", "r") as file:
    for line in file:
        print(line, end="")
```

Here:

```python
for line in file
```

iterates through the file **line by line**.

This is a very important Python concept:

```text
file.read()
    ↓
one large string

for line in file
    ↓
one line at a time
```

---

# E — 🟢 Good, with one terminology refinement

Your explanation is good.

One correction:

> UTF-8 is an **encoding**, rather than an "encoding format."

The process is:

```text
Python string
     │
     │ encode using UTF-8
     ▼
   bytes
     │
     │ decode using UTF-8
     ▼
Python string
```

And yes:

> **UTF-8 is an encoding, not a file mode.**

---

# Weakness Tracker

We've now identified a specific weakness:

| Area                       | Status                    |
| -------------------------- | ------------------------- |
| `input()`                  | 🟢 Strong                 |
| `print()`                  | 🟢 Strong                 |
| `sep` / `end`              | 🟢 Strong                 |
| f-strings                  | 🟢 Strong                 |
| `.2f` rounding             | 🟡                        |
| Formatting width           | 🟡                        |
| File modes                 | 🟢 Strong                 |
| `read()`                   | 🟢                        |
| `readlines()`              | 🟡 Memory/newline details |
| `for line in file`         | 🟡 **Just corrected**     |
| Text vs binary             | 🟢 Strong                 |
| Encoding/decoding          | 🟢 Good                   |
| `with`                     | 🟢 Good                   |
| `try/finally` relationship | 🟡                        |

Let's reinforce the one remaining file-iteration weakness.

---

# Coding Exercise 4 — Line Processing

Suppose `numbers.txt` contains:

```text
10
20
30
40
```

Write a program that:

1. opens the file using `with`
2. reads it **line by line**
3. converts each line to an integer
4. calculates the total
5. prints the total

Expected result:

```text
100
```

### Constraints

Don't use:

```python
readlines()
```

Don't use:

```python
read()
```

I want you to practice **streaming through the file**.

Also tell me:

* What is the time complexity?
* What is the additional space complexity?

---

# Coding Exercise 5 — Slightly Harder

Suppose `people.txt` contains:

```text
Alice
Bob
Charlie
David
```

Write code that prints:

```text
1. Alice
2. Bob
3. Charlie
4. David
```

You should process the file **line by line** rather than loading the entire file into a list.

### Think first

Python has a very useful built-in function for numbering things while iterating.

If you know it, use it. If you don't, that's okay—reason about how you'd solve it.

---

# Interview Question

You're in an interview and I ask:

> "What's the difference between `file.read()`, `file.readlines()`, and `for line in file`?"

Give me a concise **interview-quality answer**, including the memory implications.

Don't aim for a textbook definition. Imagine you're speaking to the interviewer.

**Answer Exercises 4–5 and the interview question.** Then we'll test the remaining I/O concepts with a mixed mini-test before moving to the next topic.


coding Exercise 4:
total = 0
with open("numbers.txt", "r") as file:
    for line in file:
      total += int(line)
print(total)
the time complexity would be O(n), n being the number of lines.
The space complexity would be O(1), since we use only 1 varibale 'total'.
Coding Exercise 5:
with open("people.txt", "r") as file:
    for index, line in enumerate(file, start =1):
      print(f"{index}. {line}", end = '')

Interview Question:
file.read()- This will read and store the entire file in a single string. This will store a lot of memory.
file.readlines() - This will store all the lines of the file as a list of strings. This will also store a lot of memory.
for line in file- This will only fetch one line at a time and process it, it consumes the least space.

Excellent. **Exercise 4 and 5 are both correct, and your interview answer is strong.** You're demonstrating the mental model rather than memorizing syntax.

## Exercise 4 — ✅

```python
total = 0

with open("numbers.txt", "r") as file:
    for line in file:
        total += int(line)

print(total)
```

Exactly what I wanted.

### Complexity

Your answer:

* Time: **O(n)** where `n` is the number of lines
* Additional space: **O(1)**

is correct for this problem.

One nuance an interviewer might appreciate: if we define `n` as the **total number of characters/bytes processed**, the time is O(n) in that sense too. The important point is that every piece of input must be examined.

genui{"learning_viz":{"type_id":"BIG_O_TIME_COMPLEXITY"}}

---

# Exercise 5 — ✅

Excellent use of:

```python
enumerate(file, start=1)
```

Your solution:

```python
with open("people.txt", "r") as file:
    for index, line in enumerate(file, start=1):
        print(f"{index}. {line}", end='')
```

works.

You also correctly handled the newline already present in `line`.

That's a nice intermediate-level Python pattern.

---

# Interview Question — 🟢 Strong

Your answer captures the essential distinction:

| Approach           | Result                  | Memory                 |
| ------------------ | ----------------------- | ---------------------- |
| `read()`           | One large `str`         | O(file size)           |
| `readlines()`      | List of lines           | O(file size)           |
| `for line in file` | Processes incrementally | O(1) additional space* |

*Ignoring the internal buffering Python/OS may use.

One refinement for interview language:

Instead of saying `for line in file` "**fetches** one line at a time," say:

> "It **iterates over the file lazily, yielding lines as needed**, so we don't need to store the entire file in memory."

That's more precise.

---

# 🎯 File I/O Core Concepts: Passed

You've now demonstrated reasonable understanding of:

* opening files
* reading
* writing
* append
* file modes
* text vs binary
* encoding
* `with`
* iteration
* newline behavior
* memory implications
* basic complexity

So we can proceed to the remaining part of this topic.

---

# 16. Context Managers — Basic Internal Model

You already know:

```python
with open("data.txt") as f:
    data = f.read()
```

Let's now peek **one level underneath**.

`open()` returns a file object that supports the context-manager protocol.

A context manager essentially provides two important operations:

```python
__enter__()
__exit__()
```

Conceptually:

```python
with something as value:
    work()
```

roughly means:

```text
1. Call something.__enter__()
2. Give its result to `value`
3. Run the body
4. Call something.__exit__()
```

If an exception occurs, `__exit__()` is still involved in cleanup.

For files, this is why:

```python
with open(...) as f:
    ...
```

can safely close the file afterward.

### Don't memorize the exact mechanics yet.

For this topic, your mental model should simply be:

> **`with` manages the lifetime of a resource and guarantees cleanup.**

We'll revisit context managers much more deeply later, including writing your own:

```python
class MyContext:
    def __enter__(self):
        ...

    def __exit__(self, exc_type, exc_value, traceback):
        ...
```

---

# 17. Common I/O Errors — Interview Thinking

Consider:

```python
with open("data.txt", "r") as f:
    data = f.read()
```

Possible problems include:

### File doesn't exist

```text
FileNotFoundError
```

### Permission problem

```text
PermissionError
```

### Wrong encoding

Potentially:

```text
UnicodeDecodeError
```

### Directory instead of file

Potentially:

```text
IsADirectoryError
```

### File already exists with `"x"`

```python
open("data.txt", "x")
```

If it already exists:

```text
FileExistsError
```

---

# Final Mixed Mini-Test

This is your **gate before we finish Input & Output**.

Don't run anything.

## Q1 — Output

```python
print("A", "B", sep="-", end="!")
print("C")
```

What is the exact output?

---

## Q2 — f-string

```python
price = 19.9876

print(f"${price:.2f}")
```

Exact output?

---

## Q3 — File newline trap

Suppose the file contains:

```text
A
B
```

and:

```python
with open("data.txt") as f:
    for line in f:
        print(line)
```

What does the output look like?

Explain **why**.

---

## Q4 — File mode

Suppose `data.txt` currently contains:

```text
Hello
```

Then:

```python
with open("data.txt", "a") as f:
    f.write("World")
```

What exactly is now inside the file?

Be careful: **there is no `\n` in `"World"`**.

---

## Q5 — Binary

```python
with open("data.bin", "rb") as f:
    data = f.read()
```

What type is `data`?

Why isn't it a `str`?

---

## Q6 — Encoding

Complete the conceptual pipeline:

```text
Python string
      ↓
      ?
      ↓
bytes
      ↓
      ?
      ↓
Python string
```

What are the two operations?

---

## Q7 — Memory

Which is preferable for processing a 10 GB log file?

```python
data = f.read()
```

or:

```python
for line in f:
    process(line)
```

Why?

---

## Q8 — Context manager

What is the primary benefit of:

```python
with open(...) as f:
    ...
```

over manually calling `close()`?

---

## Q9 — Coding

Write a function:

```python
def count_lines(filename):
    ...
```

that returns the number of lines in a text file.

Requirements:

* use `with`
* don't use `readlines()`
* don't load the whole file into memory
* process the file incrementally

Give the **time and space complexity**.

---

## Q10 — Interviewer question

I'm interviewing you now:

> **"Why does `print(line)` sometimes produce blank lines when `line` comes from a file?"**

Give me your answer as if we're in a real interview.

---

Answer **Q1–Q10**. I'll grade this as an actual interview checkpoint. If you pass, we'll do a final set of progressively harder coding problems and then close Prompt 7.

1. A-B!C
2. $19.99
3. A

B.
Because the file already has line for the second line, when we use print a addintional blank line is created.

4. HelloWorld. Since there is only one line, the appended word is added next to the first word.
5. The data.bin is a binary file object. Because the file is read in 'b' mode, the data object will hold bytes instead of string.
6. python string -> utf-8 ->bytes ->utf-8 ->python string
7. The second one is preferred, cause the first one will read and store the entire file in a single string and the storage will not be suffieceint to store a 10GB file. the second one will read each line by line, and so the storage is very less.
8. This will create **enter**() and **exit**() that automatically closes the file and cleans all resources once it comes out of the 'with'. This way there is no need for a manual close().
9. with open("code1.txt", "r") as file:

       for index, \_ in enumerate(file,start =1):

         pass

   print(index)

time compexity = O(n), n = no of lines, space complexity -O(1)

10. This is because each line in the text file will end with '\n', so when we print each line, print() will create a extra blank line.

Excellent attempt. You’re showing **good working understanding of Python I/O**. I’d score this **9/10**.

### Grading

| Q  | Result | Notes                                                                                                |
| -- | ------ | ---------------------------------------------------------------------------------------------------- |
| 1  | ✅      | `A-B!C`                                                                                              |
| 2  | ✅      | `$19.99` — correct rounding                                                                          |
| 3  | ✅      | Correct: each file line already contains `\n`, and `print()` adds another                            |
| 4  | ✅      | Correct: `HelloWorld`                                                                                |
| 5  | ⚠️     | Result is `bytes`, not a “binary file object”                                                        |
| 6  | ⚠️     | Conceptually correct, but the operations are **encode → decode**, not simply “UTF-8 → bytes → UTF-8” |
| 7  | ✅      | Correct memory reasoning                                                                             |
| 8  | ✅      | Good understanding of `__enter__` / `__exit__`                                                       |
| 9  | ❌      | Your complexity is right, but the function doesn't actually count lines correctly                    |
| 10 | ✅      | Excellent explanation                                                                                |

### Two important corrections

**Q5:** Be precise in an interview:

```python
with open("data.bin", "rb") as f:
    data = f.read()
```

`f` is the **file object**.
`data` is a **bytes object**.

So:

> "`rb` opens the file in binary read mode, so `read()` returns `bytes` rather than `str`."

---

**Q6:** Your pipeline is conceptually right, but the terminology matters:

```text
Python string
    ↓ encode("utf-8")
bytes
    ↓ decode("utf-8")
Python string
```

Remember:

* **encode** = `str → bytes`
* **decode** = `bytes → str`

That's a common interview question.

---

### Q9 is the main weakness

You wrote:

```python
for index, _ in enumerate(file, start=1):
    pass

print(index)
```

The idea of using `enumerate()` is valid, but there are two problems:

1. `index` doesn't exist if the file is empty.
2. More importantly, the function never actually returns the count.

For a counting function, the simplest approach is:

```python
def count_lines(filename):
    count = 0
    with open(filename, "r") as file:
        for line in file:
            count += 1
    return count
```

Your complexity analysis was **correct**:

* Time: **O(n)** where `n` = number of lines
* Extra space: **O(1)**

genui{"learning_viz":{"type_id":"BIG_O_TIME_COMPLEXITY"}}

### Weakness tracker

* `input()` → 🟢
* `print()`, `sep`, `end` → 🟢
* f-strings → 🟢
* `.2f` rounding → 🟢 **fixed**
* formatting width/alignment → 🟡
* `read()` → 🟢
* `readlines()` → 🟡
* `for line in file` → 🟢 **now solid**
* text vs binary → 🟢
* encoding/decoding → 🟢, but terminology needs precision
* `with` / context managers → 🟢
* file counting → 🟡 **needs one more exercise**

## Final challenge for Prompt 7

Don't look for the answer—write these yourself.

### Challenge 1 — File processing

A file `scores.txt` contains:

```text
85
92
78
95
88
```

Write:

```python
def average_score(filename):
    ...
```

Requirements:

* use `with`
* don't use `readlines()`
* process one line at a time
* return the average
* assume the file is not empty
* use appropriate conversion from string to number

Also give **time and space complexity**.

### Challenge 2 — Interview reasoning

Predict the exact output:

```python
name = "Alice"
score = 91.567

print(f"Student: {name}")
print(f"Score: {score:.1f}")
print("A", "B", sep="->", end=" | ")
print("C")
```

Then explain **exactly what `:.1f` does**.

Once you solve those, I'll give you a **final interview-style mixed coding problem** combining `input()`, formatting, file reading, and error handling.
