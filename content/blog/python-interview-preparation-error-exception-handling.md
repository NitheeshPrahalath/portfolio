---
title: "Python interview preparation - Error & Exception Handling"
date: "2026-09-02"
description: ""
tags: ["Python"]
---

# Prompt 6 — Error & Exception Handling in Python

This guide is structured so you can **learn it, revise it, and use it as interview notes**. Read through the concepts and examples first. **At the end, you’ll get a test—answer it, and I’ll evaluate you before we move on.**

---

# 1. Errors vs Exceptions

## Error

An **error** is a problem that prevents a program from running correctly.

In Python discussions, people often use “error” broadly for all problems. More specifically, some errors happen **before or during execution**.

### Example: Syntax error

```python
if True
    print("Hello")
```

**Output:**

```text
SyntaxError: expected ':'
```

Python cannot interpret the code because the syntax is invalid.

---

## Exception

An **exception** is an event that occurs during program execution and disrupts the normal flow of the program.

```python
number = 10 / 0
```

**Output:**

```text
ZeroDivisionError: division by zero
```

The code was syntactically valid, but an exceptional situation occurred while it was running.

### Common examples

```python
int("hello")       # ValueError
10 / 0             # ZeroDivisionError
my_list[10]        # IndexError
my_dict["missing"] # KeyError
```

### Simple interview answer

> **Errors are problems in a program, while exceptions are runtime events that interrupt the normal flow of execution and can usually be handled using Python's exception-handling mechanisms.**

---

# 2. What Is `try` and `except`?

Python uses `try` and `except` to handle exceptions.

```python
try:
    risky_code()
except SomeException:
    handle_problem()
```

### Example

```python
try:
    number = int(input("Enter a number: "))
    print(number)
except ValueError:
    print("Invalid input")
```

If the user enters:

```text
abc
```

The program does not crash. Instead:

```text
Invalid input
```

---

# 3. How `try` and `except` Work

```python
try:
    print("Start")
    result = 10 / 0
    print("End")

except ZeroDivisionError:
    print("Cannot divide by zero")

print("Program continues")
```

**Output:**

```text
Start
Cannot divide by zero
Program continues
```

Important: once the exception occurs, Python immediately leaves the remaining code in the `try` block.

Therefore:

```python
print("End")
```

does **not** execute.

---

# 4. Handling Specific Exceptions

Always prefer handling the specific exception you expect.

```python
try:
    value = int("hello")
except ValueError:
    print("Conversion failed")
```

## Bad approach

```python
try:
    value = int("hello")
except:
    print("Something went wrong")
```

Why is this bad?

Because a bare `except:` can catch unexpected exceptions and hide important problems.

---

# 5. Multiple Exceptions

You can handle different exceptions separately.

```python
try:
    number = int(input("Enter a number: "))
    result = 100 / number
    print(result)

except ValueError:
    print("Please enter a valid integer")

except ZeroDivisionError:
    print("Number cannot be zero")
```

### Example

Input:

```text
0
```

Output:

```text
Number cannot be zero
```

Input:

```text
hello
```

Output:

```text
Please enter a valid integer
```

---

# 6. Handling Multiple Exceptions in One `except`

If multiple exceptions should be handled the same way:

```python
try:
    value = int("abc")
except (ValueError, TypeError):
    print("Invalid conversion")
```

This is useful when the handling logic is identical.

---

# 7. The `else` Block

The `else` block runs **only if no exception occurs in the `try` block**.

```python
try:
    number = int("10")
except ValueError:
    print("Invalid number")
else:
    print("Conversion successful")
```

**Output:**

```text
Conversion successful
```

Another example:

```python
try:
    result = 10 / 2
except ZeroDivisionError:
    print("Cannot divide by zero")
else:
    print("Result:", result)
```

**Output:**

```text
Result: 5.0
```

### Key rule

| Block     | When it runs                   |
| --------- | ------------------------------ |
| `try`     | Always                         |
| `except`  | If a matching exception occurs |
| `else`    | If no exception occurs         |
| `finally` | Almost always                  |

---

# 8. The `finally` Block

`finally` is used for code that should run whether an exception occurs or not.

```python
try:
    result = 10 / 0
except ZeroDivisionError:
    print("Error occurred")
finally:
    print("Cleanup complete")
```

**Output:**

```text
Error occurred
Cleanup complete
```

A common use is resource cleanup.

```python
file = None

try:
    file = open("data.txt")
    content = file.read()
finally:
    if file is not None:
        file.close()
```

In modern Python, a context manager is usually better:

```python
with open("data.txt") as file:
    content = file.read()
```

---

# 9. Full Structure: `try-except-else-finally`

```python
try:
    number = int(input("Enter a number: "))
    result = 100 / number

except ValueError:
    print("Invalid input")

except ZeroDivisionError:
    print("Cannot divide by zero")

else:
    print("Result:", result)

finally:
    print("Execution finished")
```

Flow:

```text
try
 │
 ├── Exception? ── Yes ──> matching except
 │
 No
 │
 ▼
else
 │
 ▼
finally
```

If an exception is handled, `finally` still runs.

---

# 10. Raising Exceptions

You can manually create an exception using `raise`.

```python
age = -5

if age < 0:
    raise ValueError("Age cannot be negative")
```

**Output:**

```text
ValueError: Age cannot be negative
```

This is useful for validating data.

---

## Raising after validation

```python
def withdraw(balance, amount):
    if amount <= 0:
        raise ValueError("Amount must be positive")

    if amount > balance:
        raise ValueError("Insufficient balance")

    return balance - amount
```

Usage:

```python
try:
    new_balance = withdraw(1000, 1500)
except ValueError as error:
    print(error)
```

**Output:**

```text
Insufficient balance
```

---

# 11. `raise` Without an Exception

Inside an `except` block, `raise` can re-raise the current exception.

```python
try:
    10 / 0
except ZeroDivisionError:
    print("Logging the error")
    raise
```

**Output conceptually:**

```text
Logging the error
ZeroDivisionError: division by zero
```

This is useful when you want to:

1. Log an exception.
2. Perform some additional action.
3. Let the exception continue upward.

---

# 12. Custom Exceptions

Python allows you to create your own exceptions.

```python
class InvalidAgeError(Exception):
    pass
```

Then use it:

```python
class InvalidAgeError(Exception):
    pass


age = -10

if age < 0:
    raise InvalidAgeError("Age cannot be negative")
```

---

## Realistic example: Bank application

```python
class InsufficientFundsError(Exception):
    pass


def withdraw(balance, amount):
    if amount > balance:
        raise InsufficientFundsError(
            "You do not have enough balance"
        )

    return balance - amount


try:
    print(withdraw(1000, 1500))

except InsufficientFundsError as error:
    print(error)
```

**Output:**

```text
You do not have enough balance
```

---

# 13. Why Create Custom Exceptions?

Custom exceptions make your code more meaningful.

Instead of:

```python
raise ValueError("Insufficient funds")
```

You can write:

```python
raise InsufficientFundsError("Insufficient funds")
```

The second version communicates the exact type of business problem.

Examples:

```python
class InvalidUserError(Exception):
    pass


class PaymentFailedError(Exception):
    pass


class InvalidOrderError(Exception):
    pass
```

---

# 14. Exception Hierarchy

Python exceptions follow a class hierarchy.

A simplified version:

```text
BaseException
│
├── SystemExit
├── KeyboardInterrupt
└── Exception
    │
    ├── ValueError
    ├── TypeError
    ├── KeyError
    ├── IndexError
    ├── AttributeError
    ├── RuntimeError
    ├── OSError
    └── ZeroDivisionError
```

Important idea: exceptions are classes.

For example:

```python
ZeroDivisionError
```

is related to:

```python
ArithmeticError
```

which is part of the broader exception hierarchy.

---

## Why hierarchy matters

Consider:

```python
try:
    10 / 0

except ArithmeticError:
    print("Arithmetic problem")
```

This catches `ZeroDivisionError` because it belongs to the arithmetic-related exception hierarchy.

---

# 15. Order of `except` Blocks Matters

Python checks `except` blocks from top to bottom.

## Incorrect order

```python
try:
    10 / 0

except Exception:
    print("General exception")

except ZeroDivisionError:
    print("Division by zero")
```

The `ZeroDivisionError` handler will never be reached because:

```python
Exception
```

already catches it.

## Correct order

```python
try:
    10 / 0

except ZeroDivisionError:
    print("Division by zero")

except Exception:
    print("General exception")
```

### Interview rule

> Handle specific exceptions before general exceptions.

---

# 16. `Exception` vs `BaseException`

This is a popular interview topic.

## `BaseException`

The root of most built-in exceptions.

It includes exceptions such as:

```python
KeyboardInterrupt
SystemExit
```

## `Exception`

Most normal application exceptions inherit from `Exception`.

Examples:

```python
ValueError
TypeError
KeyError
IndexError
```

### Best practice

Usually:

```python
except Exception:
```

is safer than:

```python
except:
```

because a bare `except:` may also catch things like `KeyboardInterrupt`.

---

# 17. Capturing the Exception Object

Use `as`:

```python
try:
    result = 10 / 0

except ZeroDivisionError as error:
    print("Error:", error)
```

**Output:**

```text
Error: division by zero
```

Another example:

```python
try:
    int("abc")

except ValueError as error:
    print(type(error))
    print(error)
```

---

# 18. Exception Chaining

Sometimes one exception happens because of another.

```python
try:
    int("hello")

except ValueError as error:
    raise RuntimeError("Invalid user input") from error
```

The `from error` preserves the relationship between the original and new exception.

This is called **exception chaining**.

### Why is it useful?

It helps debugging because you can understand:

```text
Original problem
        ↓
New higher-level application error
```

---

# 19. Realistic Example: API/Data Processing

```python
def process_age(value):
    try:
        age = int(value)
    except ValueError as error:
        raise ValueError(
            "Age must be a valid integer"
        ) from error

    if age < 0:
        raise ValueError("Age cannot be negative")

    return age
```

Usage:

```python
try:
    age = process_age("abc")
except ValueError as error:
    print(error)
```

**Output:**

```text
Age must be a valid integer
```

---

# 20. Exception Handling Best Practices

## 1. Catch specific exceptions

Good:

```python
except ValueError:
```

Avoid:

```python
except:
```

---

## 2. Keep the `try` block small

Bad:

```python
try:
    a = int(user_input)
    result = a * 10
    print(result)
    save_to_database(result)
    send_email(result)
except ValueError:
    print("Invalid input")
```

The `try` block contains too much code.

Better:

```python
try:
    a = int(user_input)
except ValueError:
    print("Invalid input")
else:
    result = a * 10
    print(result)
    save_to_database(result)
    send_email(result)
```

This makes it clearer what operation may raise the expected exception.

---

## 3. Don't silently ignore exceptions

Bad:

```python
try:
    process_data()
except Exception:
    pass
```

This hides errors and makes debugging difficult.

Better:

```python
try:
    process_data()
except ValueError as error:
    print(f"Invalid data: {error}")
```

---

## 4. Use `finally` for cleanup

```python
connection = None

try:
    connection = connect()
    process(connection)
finally:
    if connection:
        connection.close()
```

Even better, when supported, use context managers:

```python
with resource() as connection:
    process(connection)
```

---

## 5. Add useful context when raising exceptions

Less helpful:

```python
raise ValueError("Invalid")
```

More helpful:

```python
raise ValueError(
    f"Invalid age: {age}. Age must be non-negative."
)
```

---

# 21. Common Anti-Patterns

## Anti-pattern 1: Bare `except`

```python
try:
    do_something()
except:
    print("Error")
```

Problem: catches almost everything, including exceptions you may not want to catch.

---

## Anti-pattern 2: Catching `Exception` everywhere

```python
try:
    process()
except Exception:
    print("Failed")
```

Problem: it can hide programming bugs.

Catch only what you expect whenever possible.

---

## Anti-pattern 3: Ignoring the exception

```python
try:
    process()
except ValueError:
    pass
```

Sometimes ignoring is intentional, but usually it hides a problem.

---

## Anti-pattern 4: Using exceptions for normal program flow

Bad:

```python
try:
    value = my_list[0]
except IndexError:
    value = None
```

Sometimes this is acceptable, but if an empty list is expected, a direct check may be clearer:

```python
value = my_list[0] if my_list else None
```

---

## Anti-pattern 5: Wrong exception order

Bad:

```python
try:
    operation()

except Exception:
    print("General")

except ValueError:
    print("Value problem")
```

The general handler should come last.

---

# 22. Important Built-in Exceptions

| Exception           | Common cause                      |
| ------------------- | --------------------------------- |
| `ValueError`        | Correct type, invalid value       |
| `TypeError`         | Wrong type used in an operation   |
| `KeyError`          | Dictionary key does not exist     |
| `IndexError`        | Sequence index out of range       |
| `AttributeError`    | Object does not have an attribute |
| `NameError`         | Variable name does not exist      |
| `ZeroDivisionError` | Division by zero                  |
| `FileNotFoundError` | File does not exist               |
| `ImportError`       | Import operation fails            |

---

# 23. Interview Question: `ValueError` vs `TypeError`

### `ValueError`

The type is acceptable, but the value is inappropriate.

```python
int("hello")
```

A string is an acceptable input type for `int()`, but `"hello"` is not a valid integer representation.

### `TypeError`

The operation receives an inappropriate type.

```python
"hello" + 10
```

You cannot directly add a string and an integer.

### Short interview answer

> `TypeError` occurs when an operation receives an inappropriate type, while `ValueError` occurs when the type is acceptable but the value itself is invalid.

---

# 24. Output-Based Problems

## Problem 1

```python
try:
    print("A")
    10 / 0
    print("B")
except ZeroDivisionError:
    print("C")
finally:
    print("D")
```

What is the output?

### Answer

```text
A
C
D
```

---

## Problem 2

```python
try:
    print(10 / 2)
except ZeroDivisionError:
    print("Error")
else:
    print("Success")
finally:
    print("Done")
```

### Answer

```text
5.0
Success
Done
```

---

## Problem 3

```python
try:
    value = int("abc")
except TypeError:
    print("Type error")
except ValueError:
    print("Value error")
```

### Answer

```text
Value error
```

---

## Problem 4

```python
try:
    print("Start")
    raise ValueError("Problem")
except ValueError as error:
    print(error)
print("End")
```

### Answer

```text
Start
Problem
End
```

---

# 25. Coding Exercise 1 — Safe Division

Write a function:

```python
safe_divide(a, b)
```

Requirements:

* Return `a / b`.
* Handle division by zero.
* Handle invalid types.

Example:

```python
safe_divide(10, 2)
```

Expected:

```text
5.0
```

Example:

```python
safe_divide(10, 0)
```

Expected behavior: handle `ZeroDivisionError`.

---

# 26. Coding Exercise 2 — Custom Exception

Create a custom exception:

```python
InvalidPasswordError
```

Create a function:

```python
validate_password(password)
```

Rules:

* Password must be at least 8 characters.
* Otherwise, raise `InvalidPasswordError`.
* Return `True` for a valid password.

---

# 27. Coding Exercise 3 — File Handling

Write code that:

1. Tries to open a file.
2. Handles `FileNotFoundError`.
3. Displays a message if the file is found.
4. Ensures appropriate cleanup.

Think about whether `with open(...)` can simplify this.

---

# 28. Coding Exercise 4 — Multiple Exceptions

Create a function that accepts user input representing a number and calculates:

```python
100 / number
```

Handle:

* `ValueError`
* `ZeroDivisionError`

Make sure the error messages are different.

---

# 29. Frequently Asked Interview Questions

### Q1. What is an exception in Python?

An exception is a runtime event that interrupts the normal flow of a program.

---

### Q2. What is the purpose of `try`?

The `try` block contains code that may raise an exception.

---

### Q3. What is the difference between `except` and `finally`?

* `except` handles matching exceptions.
* `finally` runs after the `try` sequence for cleanup regardless of whether an exception was handled.

---

### Q4. When does `else` execute?

`else` executes only when no exception occurs in the `try` block.

---

### Q5. What does `raise` do?

`raise` manually triggers an exception.

---

### Q6. Why use custom exceptions?

Custom exceptions make application-specific errors more meaningful and easier to handle separately.

---

### Q7. Why should specific exceptions come before general exceptions?

Because Python evaluates `except` blocks from top to bottom. A general exception handler could catch the exception before a specific handler gets a chance.

---

### Q8. Why avoid `except:`?

A bare `except:` catches too broadly and can hide unexpected problems, including some exceptions derived directly from `BaseException`.

---

# 30. Quick Revision Sheet

```text
Error
├── General problem in a program
└── Can include syntax and runtime problems

Exception
├── Runtime abnormal event
└── Can often be handled

try
├── Contains risky code

except
├── Handles matching exceptions

else
├── Runs if no exception occurs

finally
├── Used for cleanup
└── Runs regardless of normal success or exception in typical execution

raise
├── Manually triggers an exception

Custom Exception
├── Created by inheriting from Exception

Best Practice
├── Catch specific exceptions
├── Keep try blocks small
├── Put specific handlers first
├── Avoid bare except
├── Don't silently ignore errors
├── Use finally/context managers for cleanup
└── Provide meaningful error messages
```

---

# 🧪 Your Test — Answer Before Moving On

Please answer these **without looking back if possible**.

### 1. Explain the difference between an error and an exception in Python.

### 2. What will this print?

```python
try:
    print("A")
    value = 10 / 0
except ZeroDivisionError:
    print("B")
else:
    print("C")
finally:
    print("D")
```

### 3. What is wrong with this code?

```python
try:
    value = int("abc")
except Exception:
    print("General error")
except ValueError:
    print("Invalid value")
```

### 4. Write a custom exception called `InvalidAgeError` and use it to reject negative ages.

### 5. What is the difference between:

```python
except:
```

and:

```python
except Exception:
```

### 6. What will this code output?

```python
try:
    print(10 / 2)
except ZeroDivisionError:
    print("Error")
else:
    print("Success")
finally:
    print("Finished")
```

### 7. Coding challenge

Write:

```python
def safe_divide(a, b):
```

Requirements:

* Return the result when possible.
* Handle `ZeroDivisionError`.
* Handle `TypeError`.
* Use clear error messages.

---

Send me your answers in **1–7 order**. I’ll review them like an interviewer, point out anything to improve, and **test you before we move on to the next Python topic**.
