---
title: "Objects Methods Prototypes Constuctors"
date: "2026-05-31"
description: "Javascript Methods, Objects and Constructors"
---
# JavaScript Objects, Constructors, Methods & Prototypes — Complete Summary

Before understanding prototypes, you need to understand  **objects** ,  **methods** , and  **constructors** .

---

# 1. What is an Object?

An **object** is a collection of related data and functionality.

Think of it as a real-world thing with:

* **Properties** → data about the thing
* **Methods** → actions the thing can perform

Example:

```js
const person = {
  name: "Natsu",
  age: 25,

  greet() {
    console.log("Hello!");
  }
};
```

Here:

```text
Object: person

Properties:
- name = "Natsu"
- age = 25

Method:
- greet()
```

Usage:

```js
console.log(person.name); // Natsu

person.greet(); // Hello!
```

---

# 2. What is a Property?

A property is simply a variable stored inside an object.

```js
const car = {
  brand: "Toyota",
  year: 2024
};
```

Properties:

```text
brand → Toyota
year  → 2024
```

Access them:

```js
console.log(car.brand);
console.log(car.year);
```

---

# 3. What is a Method?

A **method** is a function stored inside an object.

Example:

```js
const person = {
  name: "Natsu",

  greet() {
    console.log(`Hello, I am ${this.name}`);
  }
};
```

Here:

```js
greet()
```

is a method.

Calling it:

```js
person.greet();
```

Output:

```text
Hello, I am Natsu
```

### Difference between Function and Method

Regular function:

```js
function greet() {
  console.log("Hello");
}
```

Method:

```js
const person = {
  greet() {
    console.log("Hello");
  }
};
```

A method belongs to an object.

---

# 4. What is a Constructor?

A constructor is a special function used to create multiple similar objects.

Without constructor:

```js
const person1 = {
  name: "John"
};

const person2 = {
  name: "Mary"
};

const person3 = {
  name: "David"
};
```

This becomes repetitive.

Instead:

```js
function Person(name) {
  this.name = name;
}
```

Create objects:

```js
const p1 = new Person("John");
const p2 = new Person("Mary");
const p3 = new Person("David");
```

Output:

```js
console.log(p1.name); // John
console.log(p2.name); // Mary
```

### What `new` Does

```js
const p1 = new Person("John");
```

JavaScript:

1. Creates a new empty object
2. Sets its prototype
3. Executes `Person()`
4. Returns the object

Result:

```js
{
  name: "John"
}
```

---

# 5. Why Use Constructors?

Imagine creating 10,000 users.

Without constructor:

```js
const user1 = { name: "A" };
const user2 = { name: "B" };
const user3 = { name: "C" };
```

With constructor:

```js
function User(name) {
  this.name = name;
}

const user1 = new User("A");
const user2 = new User("B");
const user3 = new User("C");
```

Much cleaner and reusable.

---

# 6. What is a Prototype?

Every JavaScript object has a hidden link to another object called its  **prototype** .

Example:

```js
const person = {
  name: "Natsu"
};
```

JavaScript automatically links it to:

```js
Object.prototype
```

which contains methods like:

```js
toString()
hasOwnProperty()
valueOf()
```

So even though you never defined them:

```js
person.toString();
```

still works.

---

# 7. The Prototype Chain

When JavaScript looks for a property:

```js
person.name
```

it checks:

```text
person
```

If not found:

```text
person
  ↓
prototype
```

If still not found:

```text
prototype's prototype
```

and continues until:

```text
null
```

Example:

```js
person.toString();
```

Search path:

```text
person
   ↓
Object.prototype
   ↓
found toString()
```

---

# 8. Example of a Prototype Chain

```js
const myDate = new Date();
```

Chain:

```text
myDate
   ↓
Date.prototype
   ↓
Object.prototype
   ↓
null
```

Methods like:

```js
myDate.getTime()
myDate.getDate()
myDate.getMonth()
```

come from:

```text
Date.prototype
```

---

# 9. Shadowing Properties

Objects can override properties from their prototype.

Example:

```js
const myDate = new Date();

console.log(myDate.getTime());
```

Now replace it:

```js
myDate.getTime = function() {
  console.log("Custom version");
};
```

Calling:

```js
myDate.getTime();
```

Output:

```text
Custom version
```

JavaScript finds the method in the object first and stops searching.

This is called  **shadowing** .

---

# 10. Creating Prototypes with `Object.create()`

```js
const personPrototype = {
  greet() {
    console.log("Hello!");
  }
};
```

Create an object:

```js
const carl = Object.create(personPrototype);
```

Now:

```js
carl.greet();
```

Output:

```text
Hello!
```

Search path:

```text
carl
  ↓
personPrototype
```

---

# 11. Using Constructors + Prototypes

Instead of storing the same method in every object:

```js
function Person(name) {
  this.name = name;
}

Person.prototype.greet = function() {
  console.log(`Hello, I am ${this.name}`);
};
```

Create objects:

```js
const john = new Person("John");
const mary = new Person("Mary");
```

Call:

```js
john.greet();
mary.greet();
```

Output:

```text
Hello, I am John
Hello, I am Mary
```

---

# 12. Why Put Methods on the Prototype?

Bad:

```js
function Person(name) {
  this.name = name;

  this.greet = function() {
    console.log("Hello");
  };
}
```

Every object gets its own copy of `greet()`.

```text
John → greet()
Mary → greet()
David → greet()
```

Three copies.

---

Good:

```js
function Person(name) {
  this.name = name;
}

Person.prototype.greet = function() {
  console.log("Hello");
};
```

Now:

```text
John
Mary
David
   ↓
Person.prototype.greet()
```

Only one copy exists.

Less memory and better performance.

---

# 13. Own Properties vs Prototype Properties

```js
const john = new Person("John");
```

Own property:

```js
john.name
```

Prototype property:

```js
john.greet
```

Check:

```js
Object.hasOwn(john, "name");
```

Output:

```text
true
```

```js
Object.hasOwn(john, "greet");
```

Output:

```text
false
```

Because `greet` comes from the prototype.

---

# Final Mental Model

```text
Object
│
├── Properties (data)
│     ├── name
│     ├── age
│     └── city
│
├── Methods (functions)
│     ├── greet()
│     └── walk()
│
└── Prototype
      │
      ├── Shared methods
      ├── Inherited behavior
      └── Further prototype chain
```

**In one sentence:** An object stores data and behavior, methods are functions inside objects, constructors create objects, and prototypes allow objects to inherit and share methods efficiently through the prototype chain.
