---
title: "Python Interview Preparation - Mutable vs. Immutable Objects and Copying"
date: "2026-10-14"
description: ""
tags: ["Python"]
---

# Part 2 — Core Python Concepts
## Topic 10: Mutable vs. Immutable Objects and Copying

### 1. The Fundamental Mental Model

Before discussing copying, we need to understand three things:

1. **Objects** — the values that exist in memory.
2. **Variables** — names that refer to objects.
3. **Mutability** — whether an existing object can be modified after creation.

Consider this Python code:

```python
x = [10, 20, 30]
y = x
```

You might interpret this as creating two lists containing the same values.

However, Python does something different: **`y = x` binds another name to the existing list. It does not create a new list.**

Conceptually, the relationship looks like this:

```text
       x ──────┐
               │
               ▼
          [10, 20, 30]
               ▲
               │
       y ──────┘
```

Both names refer to the same object.

This distinction explains many common Python bugs, particularly when working with lists, dictionaries, function arguments, and nested data structures.

### 2. Mutable vs. Immutable Objects

#### Mutable objects

A mutable object can be modified after it has been created.

Common examples include:

- `list`
- `dict`
- `set`
- Most user-defined class instances

Example:

```python
numbers = [10, 20, 30]

numbers[0] = 99

print(numbers)
```

The existing list is modified.

Output:

```text
[99, 20, 30]
```

The list object remains the same object; its contents change.

#### Immutable objects

An immutable object cannot be modified after its creation.

Common examples include:

- `int`
- `float`
- `bool`
- `str`
- `tuple` (with an important qualification)
- `frozenset`
- `bytes`

Consider:

```python
name = "Python"
name = name + " Developer"

print(name)
```

Output:

```text
Python Developer
```

Did Python modify the original string?

No. Strings are immutable. The concatenation produces a string representing the new value, and the name `name` is rebound to that result.

Conceptually:

```text
Before:

name ──────► "Python"

After:

name ──────► "Python Developer"
```

The original string `"Python"` was not modified.

**Important qualification:** A tuple is immutable, but it can contain a mutable object.

```python
data = ([1, 2], 3)
```

You cannot replace an element of the tuple:

```python
data[1] = 99  # TypeError
```

However, you can modify the list contained inside it:

```python
data[0].append(3)

print(data)
```

Output:

```text
([1, 2, 3], 3)
```

The tuple's references remain unchanged, but the referenced list changes.

This distinction will become important when we study shallow copying and hashability.

---

## 3. Your First Challenge: Predict Object Behavior

Do not run the code yet. Reason through it first.

Consider:

```python
a = [1, 2, 3]
b = a

b.append(4)

print(a)
print(b)
print(a is b)
```

Answer these three questions:

1. What does `print(a)` output?
2. What does `print(b)` output?
3. Does `a is b` evaluate to `True` or `False`? Explain why.

### Explain your reasoning

Do not merely provide the outputs. Explain what happens to the object when `b.append(4)` executes.

I will evaluate your mental model before introducing the next concept: **assignment versus copying, and why `b = a` differs from `b = a.copy()`**.

[1,2,3.4]
[1,2,3,4]
True

This is because when a new value is appended, the original list is not replaced like a int. since list is mutable, we can change the values in it. so both variables a and b will point to the same object and not a different object.

Natsu, your reasoning is correct. You understand the essential relationship between mutable objects and variable references. There is just one small output-formatting mistake to correct.

## 1. Evaluation of Your Answer

Your predicted output for the first line was:

```python
[1, 2, 3.4]
```

The correct output is:

```python
[1, 2, 3, 4]
[1, 2, 3, 4]
True
```

**Mistake:** You wrote `3.4` instead of `3, 4` in the first output.

**Conceptual understanding:** Your explanation is correct. Appending an element modifies the existing list, and both variables reference that same object.

Let's build on that understanding.

## 2. Assignment vs. Copying

Consider two different approaches to creating a second list.

### Approach A: Assignment

```python
a = [1, 2, 3]
b = a

b.append(4)

print(a)
print(b)
```

Output:

```text
[1, 2, 3, 4]
[1, 2, 3, 4]
```

The assignment `b = a` creates another reference to the same list.

### Approach B: Copying

```python
a = [1, 2, 3]
b = a.copy()

b.append(4)

print(a)
print(b)
```

Output:

```text
[1, 2, 3]
[1, 2, 3, 4]
```

Here, `a.copy()` creates a new list containing the same elements as the original.

Conceptually:

```text
Assignment:

a ─────┐
       ├────► [1, 2, 3]
b ─────┘


Copying:

a ──────────► [1, 2, 3]

b ──────────► [1, 2, 3]
```

The lists in the second diagram are separate objects.

### A subtle but important distinction

Consider:

```python
a = [1, 2, 3]
b = a.copy()

print(a == b)
print(a is b)
```

Before reading further, remember these two operators:

- `==` checks whether two objects compare as equal.
- `is` checks whether two references identify the same object.

Therefore, the expected output is:

```text
True
False
```

The lists contain equal values but are distinct objects.

**Interview takeaway:** Assignment does not copy an object. Copying creates a separate object, but whether the objects inside it are also copied depends on the type of copy performed.

---

## 3. Your Second Challenge: The Shallow-Copy Trap

So far, we have considered lists containing integers. Now let's introduce a nested list.

Predict the output of this code without running it:

```python
a = [[1, 2], [3, 4]]
b = a.copy()

b[0].append(99)
b.append([5, 6])

print(a)
print(b)
print(a is b)
print(a[0] is b[0])
```

Answer all four questions:

1. What does `print(a)` output?
2. What does `print(b)` output?
3. What does `a is b` return?
4. What does `a[0] is b[0]` return?

**Most importantly, explain why `b[0].append(99)` might affect `a`, even though `a.copy()` created a new list.**

Take your time. Your answer will determine whether we move on to `copy.copy()` and `copy.deepcopy()` or first strengthen your understanding of references and nested mutable objects.
[[1,2,99],[3,4]]
[[1,2,99],[3,4],[5,6]]
False
True
Even though we use a.copy() - only the outer object is creating a new reference to a new object, but the list inside still uses the reference to same object as variable a. so when the inside list is changed in variable a, it will also affect the inside list in variable b as well. but the newly added list in b.append([5,6]) is a completely new reference which is only present in b, so this will not be present in a.

Natsu, all four outputs are correct. Your explanation also demonstrates that you understand the central problem with shallow copying: **the outer container is copied, but the nested objects are shared.**

One small refinement: the nested list isn't a reference itself. It is an object, and both outer lists contain references to that same object.

Let's examine this carefully because it is a common Python interview topic.

# 4. Shallow Copy: Understanding Object References

Consider the original code:

```python
a = [[1, 2], [3, 4]]
b = a.copy()
```

The object relationships look like this:

```text
a ──────► Outer List A
             │
             ├────► Inner List 1: [1, 2]
             │
             └────► Inner List 2: [3, 4]


b ──────► Outer List B
             │
             ├────► Inner List 1: [1, 2]
             │
             └────► Inner List 2: [3, 4]
```

There are two separate outer lists, but their elements refer to the same inner lists.

Your explanation of `b.append([5, 6])` was also correct. This operation adds a new inner list to the outer list referenced by `b`. It does not modify either of the existing inner lists.

The important distinction is between **modifying an existing object** and **adding a reference to an object**.

## 4.1 Two Different Operations

Compare these statements:

```python
b[0].append(99)
```

and:

```python
b.append([5, 6])
```

The first statement modifies an existing inner list. Because both outer lists reference that inner list, the change is visible through both `a` and `b`.

The second statement adds a new element to the outer list referenced by `b`. The outer list referenced by `a` remains unchanged.

This gives us a useful rule:

- Modifying a shared nested object affects every reference to that object.
- Modifying the structure of one outer list does not modify another outer list.

This distinction is useful when debugging configuration objects, API payloads, nested dictionaries, and application state.

---

# 5. `copy.copy()` vs. `copy.deepcopy()`

Python provides a `copy` module for copying objects.

```python
import copy
```

It provides two important functions:

| Function | Behavior |
|---|---|
| `copy.copy(obj)` | Creates a shallow copy. |
| `copy.deepcopy(obj)` | Recursively copies nested objects, subject to the copying behavior of those objects. |

For a nested list, a deep copy creates separate copies of the nested lists as well.

Consider:

```python
import copy

a = [[1, 2], [3, 4]]

b = copy.copy(a)
c = copy.deepcopy(a)
```

Conceptually:

```text
a ──────► Outer A ──────► Inner lists A1, A2

b ──────► Outer B ──────► Inner lists A1, A2

c ──────► Outer C ──────► Inner lists C1, C2
```

Here:

- `a` and `b` have different outer lists but share their inner lists.
- `a` and `c` have different outer lists and separate inner lists.

A deep copy recursively copies nested objects rather than merely copying the outer container. However, it does not guarantee that every referenced object becomes a completely independent object: immutable objects may be reused, and custom classes can control their copying behavior.

### When should you use each?

**Use a shallow copy when:**
- You need a new outer list or dictionary.
- Sharing nested objects is acceptable.
- You want to avoid unnecessary copying.

**Use a deep copy when:**
- You need independent nested mutable structures.
- You are creating an independent snapshot of a nested configuration.
- Changes to nested lists or dictionaries must not affect the original structure.

Deep copying can consume more time and memory, so it should not be used automatically whenever copying is needed.

---

# 6. Your Third Challenge: Predict Three Different Copying Behaviors

Now let's test whether you can apply these concepts to an unfamiliar example.

Do not run this code yet.

```python
import copy

original = {
    "name": "Python",
    "scores": [10, 20]
}

a = original
b = copy.copy(original)
c = copy.deepcopy(original)

a["name"] = "Java"
b["scores"].append(30)
c["scores"].append(40)

print(original)
print(a)
print(b)
print(c)
```

### Your task

Predict the exact output of all four `print()` statements.

Then explain:

1. Why does changing `a["name"]` affect or not affect `original["name"]`?
2. Why does appending to `b["scores"]` affect or not affect `original["scores"]`?
3. Why does appending to `c["scores"]` affect or not affect `original["scores"]`?

**Important:** Don't assume that because `b` is a shallow copy, every change to `b` will affect `original`. Think about which object each operation modifies.

Once you answer this, we'll examine a particularly tricky interview topic: **why immutable objects, hashability, and tuples containing mutable objects are not as straightforward as they first appear.**
{ "name": "Java",  "scores": [10, 20,30]}
{ "name": "Java",  "scores": [10, 20,30]}
{ "name": "Python",  "scores": [10, 20,30]}
{ "name": "Python",  "scores": [10, 20,40]}

Natsu, your four predicted outputs are **all correct**. You have successfully applied the distinction between assignment, shallow copying, and deep copying to a nested dictionary.

Your output formatting is slightly different from Python's standard dictionary representation, but your predicted values and structure are correct.

Let's examine the reasoning, then move to a more subtle Python interview topic.

# 7. Evaluating Your Understanding

Here is the code again:

```python
import copy

original = {
    "name": "Python",
    "scores": [10, 20]
}

a = original
b = copy.copy(original)
c = copy.deepcopy(original)

a["name"] = "Java"
b["scores"].append(30)
c["scores"].append(40)

print(original)
print(a)
print(b)
print(c)
```

The actual output is:

```python
{'name': 'Java', 'scores': [10, 20, 30]}
{'name': 'Java', 'scores': [10, 20, 30]}
{'name': 'Python', 'scores': [10, 20, 30]}
{'name': 'Python', 'scores': [10, 20, 40]}
```

## 7.1 Why Does Changing `a["name"]` Affect `original`?

You wrote:

```python
a = original
a["name"] = "Java"
```

Because `a` and `original` refer to the same dictionary, updating the `"name"` entry through either variable changes the same dictionary.

Notice that this operation replaces the dictionary's value associated with `"name"`. It does not modify the string `"Python"` itself.

**Mental model:** Both names refer to one dictionary, so modifying that dictionary through one name is visible through the other.

## 7.2 Why Does Changing `b["scores"]` Affect `original`?

The assignment:

```python
b = copy.copy(original)
```

creates a new dictionary but retains references to the original dictionary's values.

Consequently, both dictionaries refer to the same list under `"scores"`.

When you execute:

```python
b["scores"].append(30)
```

you modify that shared list.

Therefore, the change appears in both `b` and `original`.

However, changing `b["name"]` would not change `original["name"]`, because the dictionary objects themselves are different.

**Key distinction:** A shallow copy shares nested mutable objects, but it does not share the outer dictionary.

## 7.3 Why Doesn't Changing `c["scores"]` Affect `original`?

You created `c` using:

```python
c = copy.deepcopy(original)
```

The nested list is copied as well. Consequently, appending `40` to `c["scores"]` modifies only the copied list.

The original list remains `[10, 20, 30]`.

### What You Have Learned

You can now distinguish three relationships:

| Operation | Outer dictionary shared? | Nested list shared? |
|---|---|---|
| `a = original` | Yes | Yes |
| `b = copy.copy(original)` | No | Yes |
| `c = copy.deepcopy(original)` | No | No, for this example |

You have demonstrated a reasonable understanding of object references, aliasing, and shallow versus deep copying. We can move forward.

---

# 8. Immutability and Hashability

These concepts are closely related, but **immutability and hashability are not the same thing**.

Understanding the difference is important for Python interviews and for working with dictionaries, sets, caching, and data structures.

## 8.1 What Is Hashability?

A hashable object provides a hash value through Python's `hash()` function.

For example:

```python
print(hash(42))
print(hash("Python"))
print(hash((1, 2, 3)))
```

These expressions produce integer hash values. The exact values are not important here.

Hashable objects can be used as dictionary keys and set elements.

For example:

```python
scores = {
    "Alice": 90,
    "Bob": 85
}

unique_numbers = {10, 20, 30}
```

Both strings and integers are hashable.

Why does this matter?

Dictionaries and sets use hash values to help organize and locate their elements efficiently.

For a dictionary key, Python also checks equality when necessary. **Different objects can have the same hash value**, so a hash value alone does not establish that two objects are equal.

## 8.2 Why Are Lists Not Hashable?

Consider:

```python
numbers = [1, 2, 3]

print(hash(numbers))
```

This raises a `TypeError` because lists are unhashable.

Why?

Lists are mutable. Their contents can change:

```python
numbers = [1, 2, 3]
numbers.append(4)
```

If a list's hash depended on its contents, changing those contents could change its hash value. That would create problems if the list were being used as a dictionary key or set element.

Python therefore makes lists unhashable.

By contrast, integers and strings are immutable and hashable.

However, do not conclude that every immutable object is hashable. The next example demonstrates why.

---

# 9. Your Fourth Challenge: A Tuple That Cannot Be Hashed

Consider these two tuples:

```python
a = (1, 2, 3)
b = ([1, 2], 3)
```

Predict what happens when Python evaluates the following statements:

```python
print(hash(a))
print(hash(b))
```

Answer these questions:

1. Does `hash(a)` succeed or raise an exception?
2. Does `hash(b)` succeed or raise an exception?
3. Both `a` and `b` are tuples, and tuples are immutable. Why might their hashability differ?

**Do not run the code yet.** Explain your reasoning in your own words.

Once you answer, we'll examine how Python determines whether a tuple is hashable, explore dictionary-key traps, and finish with a practical coding exercise that combines copying, mutation, and object identity.

the first hash will succeed as a tuple is hashable and immutable.
the second hash will fail ans raise typeerror expection as unhashable list, as we will not be able to hash the list inside the tuple, list is unhashable. so the hash willfail.

Natsu, your answer is correct. You identified the important distinction: **a tuple's hashability depends on the hashability of its elements, not merely on the fact that the tuple itself is immutable.**

Let's refine that into an interview-ready explanation and then test your understanding with a practical problem.

# 10. Why Can One Tuple Be Hashed but Another Cannot?

Consider:

```python
a = (1, 2, 3)
b = ([1, 2], 3)

print(hash(a))
print(hash(b))
```

### First statement: `hash(a)`

```python
a = (1, 2, 3)
```

**Result:** Succeeds.

The integers are hashable, so Python can compute a hash for the tuple.

The exact hash value is not important and may vary between Python processes or versions for some types of values.

### Second statement: `hash(b)`

```python
b = ([1, 2], 3)
```

**Result:** Raises `TypeError`.

The tuple contains a list, and lists are unhashable.

When Python attempts to hash the tuple, it needs to hash its elements. The list prevents this operation from succeeding.

For example:

```text
Tuple: ([1, 2], 3)

Element 1: [1, 2]  → Unhashable
Element 2: 3       → Hashable

Result: TypeError
```

One subtlety: Python does not recursively hash the contents of a list to make the list hashable. The list itself does not provide a usable hash.

## The Correct Mental Model

Your initial understanding was that tuples are immutable and hashable.

The correction is:

- Tuples are immutable containers.
- Tuples are hashable only when their elements support hashing.
- A tuple containing a list is therefore unhashable.
- A tuple containing only hashable elements is generally hashable, assuming the elements' hash implementations satisfy Python's requirements.

This is also why a tuple containing a dictionary or set cannot be hashed.

### Interview-ready answer

If an interviewer asks, *"Are tuples hashable?"*, a strong answer is:

> Tuples are immutable, but not all tuples are hashable. A tuple is hashable when all its elements are hashable. For example, `(1, 2, 3)` is hashable, whereas `([1, 2], 3)` is not because lists are unhashable.

---

# 11. Practical Exercise: Debug a Copying Bug

Now let's combine everything you have learned.

Imagine you are developing a Python application that stores a user's configuration.

You want to create an independent configuration for a new user without accidentally modifying the original.

You write this code:

```python
import copy

default_config = {
    "theme": "dark",
    "settings": {
        "notifications": True,
        "languages": ["English", "Tamil"]
    }
}

user_config = copy.copy(default_config)

user_config["theme"] = "light"
user_config["settings"]["languages"].append("Japanese")
user_config["settings"]["notifications"] = False

print(default_config)
print(user_config)
```

You might expect that changing `user_config` would leave `default_config` untouched.

However, that expectation would be incorrect.

## Your task

**Do not run the code yet.** Predict the exact output of both `print()` statements.

Then explain:

1. Why does changing `"theme"` behave differently from changing `"notifications"`?
2. Why does appending `"Japanese"` potentially affect both configurations?
3. Which single change to the copying statement would make the nested configuration independent for this example?
4. Why might that change be preferable to manually copying each nested dictionary and list?

Take your time and explain your reasoning. Your answer will help establish whether you can apply these concepts to real Python code rather than merely recognize definitions.

default_config = {
    "theme": "dark",
    "settings": {
        "notifications": False,
        "languages": ["English", "Tamil", "Japanese"]
    }
}

default_config = {
    "theme": "light",
    "settings": {
        "notifications": False,
        "languages": ["English", "Tamil", "Japanese"]
    }
}

Theme is directly a the outer layer and is affected by the copy and is created as a complete new object. But settings is a dictionary in the inside layer and it is not affected and it still refers to the same orignial object.
THis is the same reason why notification as well as languages are updated in both the original and well as the user_config.

we would need to use copy.deepcopy() so that all nested objects are also duplicated and created as separate objects.
This way both the original and the changed are not overlapping with each other.
Natsu, your core understanding is correct: **a shallow copy creates a new outer dictionary but continues sharing the nested dictionary and list.** You correctly identified `copy.deepcopy()` as the solution.

There is one important distinction to sharpen in your explanation: changing an outer dictionary's value does not modify the original dictionary, but mutating an object shared by both dictionaries affects both.

# 12. Evaluating Your Debugging Exercise

## 12.1 Correct Output

The original code produces:

```python
{
    'theme': 'dark',
    'settings': {
        'notifications': False,
        'languages': ['English', 'Tamil', 'Japanese']
    }
}
{
    'theme': 'light',
    'settings': {
        'notifications': False,
        'languages': ['English', 'Tamil', 'Japanese']
    }
}
```

Your predicted values are correct.

However, you labeled both dictionaries `default_config`. The second dictionary represents `user_config`. This is a presentation mistake, not a conceptual one.

## 12.2 Why Does Changing `theme` Behave Differently?

Consider:

```python
user_config["theme"] = "light"
```

Initially, the dictionaries look conceptually like this:

```text
default_config ──► Dictionary A
                       │
                       ├── "theme" ──► "dark"
                       │
                       └── "settings" ──► Dictionary C


user_config ─────► Dictionary B
                       │
                       ├── "theme" ──► "dark"
                       │
                       └── "settings" ──► Dictionary C
```

The outer dictionaries are different objects, but both refer to the same nested `settings` dictionary.

When you execute:

```python
user_config["theme"] = "light"
```

Python changes the value associated with `"theme"` in Dictionary B.

It does not modify Dictionary A.

This distinction matters: **assignment to a dictionary key changes the dictionary containing that key; it does not modify the object previously referenced by that key.**

## 12.3 Why Do the Nested Changes Affect Both Configurations?

Consider:

```python
user_config["settings"]["notifications"] = False
```

Python accesses the shared nested dictionary and updates its `"notifications"` entry.

Because both outer dictionaries refer to that nested dictionary, both configurations reflect the change.

Similarly:

```python
user_config["settings"]["languages"].append("Japanese")
```

modifies the shared list.

Both configurations therefore display the updated list.

## 12.4 The Correct Fix

Replace:

```python
user_config = copy.copy(default_config)
```

with:

```python
user_config = copy.deepcopy(default_config)
```

Now the nested dictionaries and lists are copied as well.

For this example, changes to `user_config` will not modify the corresponding nested structures in `default_config`.

Deep copying is useful here because the configuration contains several levels of nested mutable objects. It avoids manually copying each nested structure.

One practical qualification: deep copying is not always appropriate. Custom objects, external resources, and objects that intentionally share state may require a different strategy.

---

# 13. Final Challenge: Object Identity, Mutation, and Copying

You have demonstrated a solid understanding of the concepts covered so far. Before we finish this topic, let's test whether you can combine them to predict unfamiliar code.

Consider:

```python
import copy

a = [1, [2, 3]]
b = a.copy()
c = copy.deepcopy(a)

b[0] = 100
b[1].append(4)
c[1].append(5)

print(a)
print(b)
print(c)

print(a is b)
print(a[1] is b[1])
print(a[1] is c[1])
```

## Your task

Predict the exact output of all six `print()` statements.

Then explain:

1. Why does changing `b[0]` behave differently from modifying `b[1]`?
2. Why does appending `5` to `c[1]` leave the corresponding list in `a` unchanged?
3. What do the three identity checks reveal about the relationships between these objects?

**Do not run the code yet.** Explain your reasoning first.

After your answer, I'll evaluate your understanding and provide a concise interview-ready summary of mutable objects, copying, references, and hashability.