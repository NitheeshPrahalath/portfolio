---
title: "Python Interview Preparation — Prompts"
date: "2026-08-11"
description: ""
tags: ["Python"]
---

# 🐍 Python Interview Preparation — Beginner → Intermediate Roadmap

I want to prepare for a **beginner-to-intermediate Python developer interview**.

Teach me systematically. Do not simply give me explanations to read. For every topic, follow this learning cycle:

**Learn → Examples → Explain it myself → Output questions → Coding exercises → Interview questions → Mini-test → Fix weaknesses → Next topic**

### Teaching rules

For every topic:

1. Explain the concept from first principles.
2. Build a simple mental model before introducing advanced details.
3. Show practical Python examples.
4. Explain what Python is doing internally when relevant.
5. Point out common interview traps and misconceptions.
6. Give output-prediction questions.
7. Give progressively harder coding exercises.
8. Ask me to explain concepts in my own words.
9. Act like an interviewer when testing me.
10. **Do not reveal answers before I attempt a question.**
11. If I make a mistake, identify the exact misconception and teach that part again.
12. Track my weak areas throughout the curriculum.
13. Do not move to the next topic until I demonstrate reasonable understanding.
14. Occasionally mix previous topics into new exercises so I retain them.
15. For coding problems, prioritize reasoning and problem-solving over memorizing solutions.
16. Ask follow-up interview questions when my answer is incomplete or interesting.
17. Include time and space complexity whenever relevant.
18. Gradually increase difficulty from beginner → intermediate interview level.

My goal is that the following topics become **second nature**, not merely familiar.

---

# Part 1 — Python Language Fundamentals

## Prompt 1 — Variables, Data Types & Operators

Teach me Python variables, constants, naming conventions, built-in data types, dynamic typing, mutable vs immutable objects, assignment, multiple assignment, unpacking, `==` vs `is`, identity, membership, arithmetic/comparison/logical/bitwise operators, expressions, and operator precedence.

Also introduce:

* Objects and references
* Object identity
* Mutability
* Hashability
* `None`
* Truthiness

Include:

* Deep explanations
* Practical examples
* Interview traps
* Output-prediction questions
* Coding exercises
* Interview questions

Test me before moving on.

---

## Prompt 2 — Conditionals

Teach me:

* `if`
* `elif`
* `else`
* Nested conditions
* Conditional expressions
* Truthiness/falsiness
* Comparison operators
* Logical operators
* Short-circuit evaluation
* Chained comparisons
* `match` / `case` as Python's pattern-matching alternative to traditional switch statements

Explain when each approach should be used.

Include practical examples, common interview traps, output questions, coding exercises, and interview questions.

Test me before moving on.

---

## Prompt 3 — Loops & Iteration

Teach me:

* `for`
* `while`
* `range()`
* `break`
* `continue`
* `pass`
* Nested loops
* `enumerate()`
* `zip()`
* Iteration over dictionaries, sets, strings, and lists
* Common iteration patterns
* Loop `else`
* Avoiding accidental infinite loops

Explain the time complexity of nested loops and how to reason about loop complexity.

Include interview questions, output-prediction problems, and coding exercises.

Test me before moving on.

---

## Prompt 4 — Functions

Teach me functions from beginner through intermediate interview level:

* Defining functions
* Parameters vs arguments
* Positional arguments
* Keyword arguments
* Default arguments
* `*args`
* `**kwargs`
* Positional-only parameters
* Keyword-only parameters
* Return values
* Multiple return values
* Docstrings
* Lambda functions
* First-class functions
* Higher-order functions
* Closures
* Function annotations

Include common traps such as mutable default arguments.

Give progressively harder coding problems and output questions.

Test me before moving on.

---

## Prompt 5 — Scope & Lifetime

Teach me variable scope and lifetime deeply:

* Local scope
* Enclosing scope
* Global scope
* Built-in scope
* LEGB
* `global`
* `nonlocal`
* Name resolution
* Variable lifetime
* Closures
* Late binding
* Common scope-related traps

Give me tricky output questions and coding exercises.

Test me before moving on.

---

## Prompt 6 — Error & Exception Handling

Teach me:

* Syntax errors
* Runtime errors
* Logical errors
* Exceptions
* Exception hierarchy
* `try`
* `except`
* `else`
* `finally`
* `raise`
* Custom exceptions
* Multiple exceptions
* Exception chaining
* `ValueError`, `TypeError`, `KeyError`, `IndexError`, etc.
* EAFP vs LBYL
* Exception-handling best practices
* Anti-patterns such as bare `except`

Include realistic examples, output questions, interview questions, and coding exercises.

Test me before moving on.

---

## Prompt 7 — Input & Output

Teach me:

* `input()`
* `print()`
* `sep`
* `end`
* String formatting
* f-strings
* Format specifications
* Reading files
* Writing files
* File modes
* Text vs binary files
* Encoding
* `with`
* Context managers
* Common I/O errors

Explain context managers at a basic level here and revisit them deeply later.

Include practical examples and exercises.

Test me before moving on.

---

## Prompt 8 — Modules, Packages & Imports

Teach me:

* Modules
* Packages
* `import`
* `from ... import`
* Aliases
* Absolute vs relative imports
* `__name__`
* `__main__`
* `if __name__ == "__main__":`
* Python package structure
* Standard library usage
* Circular imports
* Import caching
* What happens during an import at an interview-appropriate level

Also teach:

* Virtual environments
* `venv`
* Package management
* `pip`
* Dependency management
* `requirements.txt`
* `pyproject.toml`

Include practical project structures, interview traps, and exercises.

Test me before moving on.

---

## Prompt 9 — Debugging

Teach me debugging fundamentals:

* Reading tracebacks
* Syntax errors
* Runtime errors
* Logical errors
* Print debugging
* Assertions
* `assert`
* Python debugger
* Breakpoints
* Inspecting variables
* Stack frames
* Systematic debugging
* Reproducing bugs
* Isolating the cause
* Fixing rather than masking problems

Give me deliberately broken Python programs.

Act like an interviewer and make me diagnose and fix them.

Test me before moving on.

---

# Part 2 — Core Python Concepts

## Prompt 10 — Mutable vs Immutable Objects & Copying

Teach me deeply:

* Mutable objects
* Immutable objects
* Object references
* Aliasing
* Assignment vs copying
* `copy.copy()`
* `copy.deepcopy()`
* Shallow copy
* Deep copy
* Nested mutable objects
* Common mutation bugs
* Hashability and immutability

Give tricky output questions such as nested-list and dictionary examples.

Include practical coding exercises and interview questions.

Test me before moving on.

---

## Prompt 11 — Python Memory Model

Teach me the Python memory model at an interview-appropriate level:

* Objects
* References
* Names
* Identity
* `id()`
* Object allocation
* Reference counting
* Garbage collection
* Reference cycles
* Object lifetime
* Small-integer/string interning concepts
* Why implementation details such as CPython behavior should not be confused with Python language guarantees

Explain reference counting and garbage collection clearly.

Give memory-related output questions and interview traps.

Test me before moving on.

---

## Prompt 12 — Iterators & Generators

Teach me:

* Iterable vs iterator
* `iter()`
* `next()`
* `StopIteration`
* Iterator protocol
* Generator functions
* `yield`
* Generator expressions
* Lazy evaluation
* Generator state
* `yield from`
* Memory advantages
* When generators should and shouldn't be used

Compare:

* Lists
* Iterators
* Generators

Give me output-tracing exercises where I must predict generator execution.

Include coding problems and interview questions.

Test me before moving on.

---

## Prompt 13 — Decorators

Teach me decorators deeply:

* Functions as first-class objects
* Higher-order functions
* Closures
* Function wrapping
* `@decorator`
* Decorators with arguments
* `functools.wraps`
* Multiple decorators
* Class decorators conceptually

Build decorators from scratch before using shortcuts.

Give practical examples such as:

* Logging
* Timing
* Authorization
* Caching

Include tricky output questions and coding exercises.

Test me before moving on.

---

## Prompt 14 — Functional Programming Tools

Teach me:

* Lambda functions
* `map()`
* `filter()`
* `reduce()`
* `functools.reduce`
* List comprehensions
* Generator expressions
* Higher-order functions

Explain when these approaches improve readability and when a normal loop or comprehension is better.

Give progressively harder coding problems.

Test me before moving on.

---

## Prompt 15 — Context Managers

Teach me context managers deeply:

* Why resource management matters
* `with`
* `__enter__`
* `__exit__`
* Context manager protocol
* Writing custom context managers
* `contextlib`
* `contextlib.contextmanager`
* Exception handling inside context managers
* Practical examples involving files/resources

Explain how context managers relate to RAII/resource management conceptually.

Include interview traps, output questions, and coding exercises.

Test me before moving on.

---

# Part 3 — Advanced Python Object Model

## Prompt 16 — Classes & Objects

Start the Python OOP section.

Teach me:

* Classes
* Objects
* Attributes
* Methods
* Constructors
* `__init__`
* Instance variables
* Class variables
* Instance methods
* Class methods
* Static methods
* Object creation

Also introduce:

* `__new__`
* Difference between `__new__` and `__init__`
* Object creation lifecycle

Compare object-oriented and procedural programming.

Include tricky examples, output questions, interview questions, and coding exercises.

Test me before moving on.

---

## Prompt 17 — Magic/Dunder Methods

Teach me Python's data model through common dunder methods:

* `__str__`
* `__repr__`
* `__len__`
* `__eq__`
* `__lt__`
* `__add__`
* `__getitem__`
* `__iter__`
* `__next__`
* `__contains__`
* `__call__`
* `__enter__`
* `__exit__`

Explain operator overloading and Python's data model.

Teach me when to implement these methods and what contracts they imply.

Give output-prediction problems and coding exercises.

Test me before moving on.

---

## Prompt 18 — Encapsulation

Teach me:

* Encapsulation
* Public conventions
* `_protected` convention
* `__private` convention
* Name mangling
* Properties
* Getters/setters
* `@property`
* Property setters
* Why encapsulation matters
* Python's philosophy compared with languages having enforced access modifiers

Include interview traps and coding exercises.

Test me before moving on.

---

## Prompt 19 — Inheritance

Teach me:

* Single inheritance
* Multilevel inheritance
* Multiple inheritance
* Method overriding
* `super()`
* Method Resolution Order (MRO)
* C3 linearization at an interview-appropriate level
* Diamond problem
* Cooperative multiple inheritance

Give output-prediction questions involving inheritance and `super()`.

Test me before moving on.

---

## Prompt 20 — Polymorphism

Teach me:

* Polymorphism
* Method overriding
* Duck typing
* Operator overloading
* Runtime polymorphism
* Compile-time vs runtime polymorphism
* Protocol-based thinking
* Python's dynamic nature

Explain what an interviewer expects from an intermediate Python developer.

Include tricky questions and coding exercises.

Test me before moving on.

---

## Prompt 21 — Abstraction & Interfaces

Teach me:

* Abstraction
* Abstract classes
* `abc`
* `ABC`
* `@abstractmethod`
* Abstract properties
* Interfaces conceptually
* Duck typing
* Protocols

Compare Python's approach with Java-style interfaces.

Explain when to use:

* Abstract base classes
* Protocols
* Duck typing

Include design examples, interview questions, traps, and exercises.

Test me before moving on.

---

## Prompt 22 — Dataclasses & Enums

Teach me:

### Dataclasses

* `@dataclass`
* Generated `__init__`
* Generated `__repr__`
* Equality
* Default values
* `field()`
* `default_factory`
* Frozen dataclasses
* Ordering
* When dataclasses are preferable to manually written classes

### Enums

* `Enum`
* Enum members
* Values
* Comparison
* Iteration
* Practical use cases

Include interview questions and coding exercises.

Test me before moving on.

---

## Prompt 23 — Type Hints & typing

Teach me Python type hints:

* Basic annotations
* `str`, `int`, `float`, `bool`
* `list`
* `dict`
* `tuple`
* `set`
* `Optional`
* `Union`
* `Literal`
* `Any`
* `Callable`
* `TypeVar`
* Generic concepts
* `typing`
* Modern Python typing syntax
* Return annotations
* Type aliases
* Static type checking conceptually

Explain the difference between:

**runtime behavior vs static type checking**

Include interview questions and practical exercises.

Test me before moving on.

---

# Part 4 — OOP Design

## Prompt 24 — Composition vs Inheritance

Teach me:

* "is-a"
* "has-a"
* Composition
* Inheritance
* Coupling
* Flexibility
* Maintainability
* Dependency relationships
* When composition is preferable

Give realistic examples.

Ask me to redesign poor inheritance-based code using composition.

Include interview questions and coding exercises.

Test me before moving on.

---

## Prompt 25 — SOLID Principles

Teach all five SOLID principles deeply:

* SRP — Single Responsibility Principle
* OCP — Open/Closed Principle
* LSP — Liskov Substitution Principle
* ISP — Interface Segregation Principle
* DIP — Dependency Inversion Principle

For each:

1. Explain the principle.
2. Show bad Python code.
3. Identify the violation.
4. Improve the design.
5. Explain trade-offs.
6. Give interview questions.

Make me identify SOLID violations myself before showing the answer.

Test me before moving on.

---

## Prompt 26 — Dependency Injection

Teach:

* Dependency injection
* Dependency inversion
* Constructor injection
* Setter injection
* Function-based injection
* Dependency composition
* Mocking conceptually
* Testing benefits
* Maintainability benefits

Use realistic Python examples.

Make me refactor tightly coupled code into dependency-injected code.

Test me before moving on.

---

# Part 5 — Basic Data Structures

## Prompt 27 — Arrays & Python Lists

Teach:

* Arrays conceptually
* Python lists
* Indexing
* Slicing
* Insertion
* Deletion
* Traversal
* Searching
* Copying
* Mutability
* List methods
* List comprehensions
* List capacity/amortized behavior at an interview-appropriate level
* Time complexity of common operations

Explain Python lists vs traditional arrays.

Include interview questions and coding problems.

Test me before moving on.

---

## Prompt 28 — Strings

Teach:

* String immutability
* Indexing
* Slicing
* Concatenation
* Searching
* Frequency counting
* Character processing
* String methods
* Formatting
* Efficient string manipulation
* Why repeated concatenation can be inefficient
* `join()`

Include common interview patterns and progressively harder coding problems.

Test me before moving on.

---

## Prompt 29 — Linked Lists

Teach from scratch:

* Nodes
* Singly linked lists
* Doubly linked lists
* Insertion
* Deletion
* Traversal
* Searching
* Reversing
* Fast/slow pointers
* Cycle detection
* Time/space complexity

Implement linked lists in Python and explain every step.

Include common interview problems.

Test me before moving on.

---

## Prompt 30 — Stacks

Teach:

* LIFO
* Lists as stacks
* `collections.deque`
* Push
* Pop
* Peek
* Complexity
* Applications
* Balanced parentheses
* Expression evaluation
* Monotonic stack concept

Include coding exercises and interview questions.

Test me before moving on.

---

## Prompt 31 — Queues

Teach:

* FIFO
* `collections.deque`
* Enqueue
* Dequeue
* Complexity
* Circular queues conceptually
* Real-world applications
* Queue-based algorithms

Include coding problems and interview questions.

Test me before moving on.

---

## Prompt 32 — Hash Maps / Dictionaries

Teach deeply:

* Hash tables
* Hash functions
* Hashing
* Buckets
* Collisions
* Key/value lookup
* Average-case complexity
* Worst-case considerations
* Hashable objects
* Dictionary methods
* Dictionary views
* Frequency counting
* Lookup tables
* Grouping patterns

Explain why dictionary keys must be hashable.

Include tricky interview questions and coding problems.

Test me before moving on.

---

## Prompt 33 — Sets

Teach:

* Sets
* Uniqueness
* Membership testing
* Hashing
* Set operations
* Union
* Intersection
* Difference
* Symmetric difference
* Hashability
* Complexity
* Practical interview patterns

Include duplicate detection and intersection problems.

Test me before moving on.

---

# Part 6 — Basic Algorithms

## Prompt 34 — Linear Search

Teach:

* How linear search works
* Best case
* Average case
* Worst case
* Space complexity
* Variations
* When it is appropriate

Give progressively harder coding problems.

Test me before moving on.

---

## Prompt 35 — Binary Search

Teach deeply:

* Core idea
* Sorted-array requirement
* Iterative implementation
* Recursive implementation
* Boundary handling
* Common bugs
* Complexity
* First occurrence
* Last occurrence
* Search on an answer space

Give interview-level coding problems.

Test me thoroughly.

---

## Prompt 36 — Sorting

Teach:

* Why sorting matters
* Bubble sort
* Selection sort
* Insertion sort
* Merge sort
* Quicksort
* Python `sorted()`
* `.sort()`
* Stability
* In-place sorting
* Time complexity
* Space complexity
* Key functions
* Custom sorting

Explain which sorting algorithms I actually need to know for interviews and why.

Test me before moving on.

---

## Prompt 37 — Recursion

Teach:

* Base cases
* Recursive cases
* Call stack
* Tracing recursive execution
* Recursion vs iteration
* Stack overflow
* Recursive tree problems
* Backtracking conceptually
* Memoization basics

Make me manually trace recursive execution.

Give progressively harder problems.

Test me before moving on.

---

## Prompt 38 — Two Pointers

Teach:

* Two-pointer technique
* When it applies
* Opposite-direction pointers
* Same-direction pointers
* Sorted arrays
* Pair-sum problems
* Removing duplicates
* Linked-list applications

Focus on recognizing the pattern and reasoning about why it works.

Test me before moving on.

---

## Prompt 39 — Sliding Window

Teach:

* Fixed-size windows
* Variable-size windows
* Maintaining window state
* Frequency maps
* Longest substring problems
* Shortest substring/subarray problems
* Recognizing when sliding window applies

Give progressively harder interview problems.

Test me before moving on.

---

## Prompt 40 — Basic Traversal

Teach traversal of:

* Arrays
* Strings
* Linked lists
* Trees
* Graphs

Introduce:

* DFS
* BFS
* Stack-based traversal
* Queue-based traversal
* Recursive traversal

Focus on recognizing traversal patterns and choosing the correct data structure.

Test me before moving on.

---

# Part 7 — Python Concurrency & Asynchronous Programming

## Prompt 41 — Threads, Processes & the GIL

Teach:

* Concurrency vs parallelism
* Threads
* Processes
* CPU-bound work
* I/O-bound work
* Python's GIL
* Why the GIL matters
* When threads are useful
* When processes are useful
* `threading`
* `multiprocessing`
* Common concurrency misconceptions

Explain the GIL specifically in the context of CPython.

Give interview scenarios where I must choose threads vs processes.

Test me before moving on.

---

## Prompt 42 — Multiprocessing

Teach:

* Process creation
* Process isolation
* Inter-process communication conceptually
* `multiprocessing`
* Process pools
* CPU-bound workloads
* Serialization/pickling considerations
* Common pitfalls

Compare multiprocessing with threading.

Include coding exercises and interview questions.

Test me before moving on.

---

## Prompt 43 — asyncio, async & await

Teach:

* Asynchronous programming
* Event loops
* Coroutines
* `async`
* `await`
* `asyncio`
* Cooperative multitasking
* I/O-bound workloads
* Blocking vs non-blocking code
* Tasks
* Concurrent coroutines
* Common mistakes

Explain why `asyncio` does not automatically make CPU-bound work faster.

Give practical examples and interview scenarios.

Test me before moving on.

---

# Part 8 — Testing, Logging & Application Development

## Prompt 44 — Python Testing with pytest

Teach me testing fundamentals using `pytest`:

* Why testing matters
* Test structure
* Assertions
* Test discovery
* Fixtures
* Parameterization
* Setup/teardown concepts
* Testing exceptions
* Mocking conceptually
* Unit tests
* Integration tests
* Test isolation
* Edge cases
* Testing maintainable code

Give me buggy code and ask me to write tests that expose the bugs.

Test me before moving on.

---

## Prompt 45 — Logging

Teach Python logging:

* Why `print()` is not a logging strategy
* `logging`
* Log levels
* `DEBUG`
* `INFO`
* `WARNING`
* `ERROR`
* `CRITICAL`
* Loggers
* Handlers
* Formatters
* Basic configuration
* Logging exceptions
* Practical application logging

Give realistic debugging/logging scenarios.

Test me before moving on.

---

## Prompt 46 — Configuration & Environment Variables

Teach:

* Configuration vs code
* Environment variables
* `os.environ`
* `os.getenv()`
* Secrets vs normal configuration
* `.env` conceptually
* Configuration files
* Defaults
* Environment-specific configuration
* Why secrets should not be hard-coded
* Configuration management best practices

Give me practical scenarios and interview questions.

Test me before moving on.

---

## Prompt 47 — Profiling & Performance

Teach me how to reason about Python performance:

* Big-O review
* Identifying bottlenecks
* Profiling vs guessing
* `timeit`
* `cProfile`
* `pstats` conceptually
* Memory considerations
* Algorithmic optimization
* I/O bottlenecks
* CPU bottlenecks
* Avoiding premature optimization

Give me deliberately slow Python programs and make me identify the bottleneck.

Test me before moving on.

---

# Part 9 — Python Project & Environment Skills

## Prompt 48 — Virtual Environments & Package Management

Teach me:

* Why virtual environments exist
* `venv`
* Creating/activating environments
* `pip`
* Installing packages
* Updating packages
* Dependency pinning
* `requirements.txt`
* Dependency isolation
* Reproducible environments

Explain common interview questions around Python environments.

Test me before moving on.

---

## Prompt 49 — pyproject.toml & Modern Python Projects

Teach me `pyproject.toml` at an interview-appropriate level:

* What it is
* Why it exists
* Project metadata
* Dependencies
* Build configuration
* Tool configuration
* Modern Python project structure
* Relationship with package managers/build tools conceptually

Show me a realistic small Python project structure.

Test me before moving on.

---

# Part 10 — Comprehensive Beginner/Intermediate Mastery Assessment

## Prompt 50 — Python Mastery Assessment

Do **not** teach me initially.

Give me a comprehensive assessment covering:

### Language fundamentals

* Variables
* Data types
* Operators
* Expressions
* Conditionals
* `match/case`
* Loops
* Functions
* Scope
* Exceptions
* Input/output
* Modules/packages
* Debugging

### Python fundamentals

* Mutability
* Immutability
* Copying
* Memory model
* Reference counting
* Garbage collection
* Iterators
* Generators
* Decorators
* Context managers
* `*args` / `**kwargs`
* Lambda
* `map` / `filter` / `reduce`
* Dunder methods

### OOP

* Classes/objects
* `__init__`
* `__new__`
* `__str__`
* `__repr__`
* Encapsulation
* Inheritance
* Polymorphism
* Abstraction
* Interfaces
* ABCs
* Dataclasses
* Enums
* Composition
* SOLID
* Dependency injection

### Type system

* Type hints
* `typing`
* Static vs runtime typing

### Data structures

* Arrays/lists
* Strings
* Linked lists
* Stacks
* Queues
* Dictionaries/hash maps
* Sets

### Algorithms

* Linear search
* Binary search
* Sorting
* Recursion
* Two pointers
* Sliding window
* DFS/BFS/basic traversal

### Concurrency

* Threads
* Processes
* GIL
* Multiprocessing
* `asyncio`
* `async`
* `await`

### Engineering skills

* Virtual environments
* Package management
* `pyproject.toml`
* Logging
* Configuration
* Environment variables
* Profiling
* `pytest`

Use a mixture of:

* Conceptual questions
* Output-prediction questions
* Debugging problems
* Code-writing problems
* Complexity questions
* Design questions
* "What would you choose and why?" scenarios
* Interview-style follow-ups

Start easy and progressively increase difficulty.

**Do not reveal answers until I attempt each question.**

Track my weak areas.

After the complete assessment, give me:

* Overall score
* Topic-by-topic score
* Strong areas
* Weak areas
* Critical misconceptions
* Interview readiness assessment
* Detailed revision plan
* Recommended practice problems

---

# Part 11 — Beginner → Intermediate Mock Interview

## Prompt 51 — Python Developer Mock Interview

Conduct a realistic Python developer mock interview.

Act exactly like an interviewer.

Ask **one question at a time** and wait for my answer.

Cover:

* Python fundamentals
* Python internals
* Functions
* OOP
* Dunder methods
* Data structures
* Algorithms
* Debugging
* Testing
* Concurrency
* `asyncio`
* Type hints
* Package management
* Logging/configuration
* Basic system/design questions
* Coding problems

Ask follow-up questions whenever appropriate.

Do not immediately tell me the answer.

Evaluate:

* Correctness
* Communication
* Depth
* Problem-solving approach
* Ability to reason aloud
* Code quality
* Complexity analysis
* Python-specific knowledge
* Ability to recognize trade-offs

At the end, provide an interview-style evaluation containing:

* Overall assessment
* Strengths
* Weaknesses
* Red flags
* Topics to revise
* Coding weaknesses
* Communication feedback
* Whether I appear ready for a beginner/intermediate Python role

---

# Special Learning Commands

Whenever I get stuck, I can say:

> "I don't understand this concept. Explain it again using a simpler mental model, then give me 3 progressively harder examples and test me."

When solving a coding problem:

> "Don't give me the solution yet. Act as my interviewer and give me hints one at a time only when I need them."

For revision:

> "Quiz me on everything we've covered so far. Don't give answers until I attempt each question."

For weak areas:

> "Give me a targeted drill on my weakest Python topics. Start easy and progressively increase difficulty."

For interview simulation:

> "Switch to interviewer mode. Ask one question at a time and don't reveal the answer until I respond."

For output practice:

> "Give me 10 Python output-prediction questions. Don't show the answers until I attempt all 10."

For debugging practice:

> "Give me a broken Python program. Don't tell me what's wrong. Interview me through the debugging process."

---

# Important Rule

Do **not** blindly move to the next topic.

For every topic, follow:

**Learn**
↓
**Examples**
↓
**Explain it myself**
↓
**Output questions**
↓
**Coding exercises**
↓
**Interview questions**
↓
**Mini-test**
↓
**Fix weaknesses**
↓
**Next topic**

The goal is not to finish the roadmap quickly.

The goal is for me to be able to **explain, predict, debug, design, and write Python code confidently in an interview.**
