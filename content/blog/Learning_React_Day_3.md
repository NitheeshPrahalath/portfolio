---
title: "Learning React Day 3"
date: "2026-06-16"
description: "Day 3"
---
# Chapter 6: Displaying Data with Props (React)

## 1. What Problem Do Props Solve?

Without props, a component always shows the same content.

```jsx
function Header() {
  return <h1>Develop. Preview. Ship.</h1>;
}
```

```jsx
<Header />
<Header />
```

Both display:

```text
Develop. Preview. Ship.
Develop. Preview. Ship.
```

Props allow components to receive different data and become reusable.

---

## 2. What Are Props?

**Props (Properties)** are values passed from a parent component to a child component.

Think of them like function arguments.

```jsx
<Header title="React" />
```

Here:

```js
title = "React"
```

is being passed to `Header`.

---

## 3. Receiving Props

### Method 1: Using props object

```jsx
function Header(props) {
  return <h1>{props.title}</h1>;
}
```

`props` becomes:

```js
{
  title: "React"
}
```

---

### Method 2: Destructuring (Preferred)

```jsx
function Header({ title }) {
  return <h1>{title}</h1>;
}
```

Same result, cleaner code.

---

## 4. JSX and Curly Braces `{}`

Without braces:

```jsx
return <h1>title</h1>;
```

Output:

```text
title
```

React treats it as plain text.

---

With braces:

```jsx
return <h1>{title}</h1>;
```

Output:

```text
React
```

Braces tell React:

> "Evaluate this JavaScript expression."

---

## 5. What Can Go Inside `{}`?

### Variable

```jsx
<h1>{title}</h1>
```

---

### Object Property

```jsx
<h1>{props.title}</h1>
```

---

### Template Literal

```jsx
<h1>{`Cool ${title}`}</h1>
```

Output:

```text
Cool React
```

---

### Function Result

```jsx
function createTitle(title) {
  return title || "Default title";
}

<h1>{createTitle(title)}</h1>
```

---

### Ternary Operator

```jsx
<h1>{title ? title : "Default title"}</h1>
```

If title exists:

```text
React
```

Otherwise:

```text
Default title
```

---

## 6. Default Values Using Ternary

```jsx
function Header({ title }) {
  return <h1>{title ? title : "Default title"}</h1>;
}
```

Now this works:

```jsx
<Header />
```

Output:

```text
Default title
```

---

## 7. Reusing Components

One component can display different content:

```jsx
function HomePage() {
  return (
    <div>
      <Header title="React" />
      <Header title="A New Title" />
    </div>
  );
}
```

Output:

```text
React
A New Title
```

This is the main purpose of props:

✅ Reusability
✅ Dynamic content
✅ Parent → Child communication

---

## 8. One-Way Data Flow

React data moves:

```text
Parent
   ↓
 Child
   ↓
Grandchild
```

Example:

```jsx
function HomePage() {
  return <Header title="React" />;
}
```

`HomePage` passes data down to `Header`.

Child components cannot directly modify parent data.

This is called:

### One-Way Data Flow

---

## 9. Rendering Lists with `map()`

Suppose you have data:

```jsx
const names = [
  "Ada Lovelace",
  "Grace Hopper",
  "Margaret Hamilton"
];
```

You want:

```html
<li>Ada Lovelace</li>
<li>Grace Hopper</li>
<li>Margaret Hamilton</li>
```

Use:

```jsx
<ul>
  {names.map((name) => (
    <li>{name}</li>
  ))}
</ul>
```

---

## 10. Understanding `map()`

Normal JavaScript:

```js
names.map((name) => {
  return name;
});
```

React version:

```jsx
names.map((name) => (
  <li>{name}</li>
))
```

For each name:

```text
Ada Lovelace → <li>Ada Lovelace</li>
Grace Hopper → <li>Grace Hopper</li>
Margaret Hamilton → <li>Margaret Hamilton</li>
```

---

## 11. Why React Needs a Key

React warns:

```text
Each child in a list should have a unique "key" prop
```

Bad:

```jsx
<li>{name}</li>
```

Good:

```jsx
<li key={name}>{name}</li>
```

---

## 12. What Is a Key?

A key uniquely identifies list items.

```jsx
<li key={name}>{name}</li>
```

React uses keys to:

* Track elements
* Update efficiently
* Avoid unnecessary re-renders

---

## 13. Best Key Practice

Okay for learning:

```jsx
key={name}
```

Better in real projects:

```jsx
key={user.id}
```

Example:

```jsx
users.map(user => (
  <li key={user.id}>
    {user.name}
  </li>
))
```

IDs are guaranteed unique.

---

## Complete Example

```jsx
function Header({ title }) {
  return <h1>{title ? title : "Default Title"}</h1>;
}

function HomePage() {
  const names = [
    "Ada Lovelace",
    "Grace Hopper",
    "Margaret Hamilton"
  ];

  return (
    <div>
      <Header title="Develop. Preview. Ship." />

      <ul>
        {names.map((name) => (
          <li key={name}>{name}</li>
        ))}
      </ul>
    </div>
  );
}
```

---

## Exam Quick Revision

### Props

* Used to pass data to components
* Similar to function arguments
* Passed from parent → child

```jsx
<Header title="React" />
```

---

### Destructuring

```jsx
function Header({ title }) {
}
```

---

### JSX Curly Braces

```jsx
{title}
```

Allow JavaScript inside JSX.

---

### Conditional Rendering

```jsx
{title ? title : "Default Title"}
```

---

### List Rendering

```jsx
names.map(...)
```

Creates UI from arrays.

---

### Key Prop

```jsx
<li key={id}>
```

Helps React identify list items uniquely.

---

## One-Sentence Summary

**Props let parent components pass dynamic data to child components, while JSX expressions and `map()` allow React to render that data efficiently in reusable and dynamic user interfaces.**

# Chapter 7: Adding Interactivity with State (React)

---

## 1. What is Interactivity?

Interactivity means your UI can respond to user actions.

Examples:

* Clicking a button
* Typing in an input field
* Submitting a form
* Toggling a switch

React achieves this using:

1. **Events**
2. **State**

---

## 2. Listening to Events

Suppose you have a button:

```jsx
<button>Like</button>
```

To respond when it's clicked:

```jsx
<button onClick={handleClick}>Like</button>
```

`onClick` is an event handler.

---

## 3. Common React Events

| Event        | Purpose         |
| ------------ | --------------- |
| onClick      | Button clicks   |
| onChange     | Input changes   |
| onSubmit     | Form submission |
| onMouseEnter | Mouse hover     |
| onKeyDown    | Keyboard press  |

React events use  **camelCase** :

✅ `onClick`

❌ `onclick`

---

## 4. Handling Events

Create a function:

```jsx
function handleClick() {
  console.log("Button clicked");
}
```

Attach it:

```jsx
<button onClick={handleClick}>
  Like
</button>
```

Flow:

```text
User clicks button
        ↓
onClick triggers
        ↓
handleClick runs
        ↓
Console prints message
```

---

## 5. What is State?

State is data that changes over time.

Examples:

* Like count
* Form input value
* Dark mode toggle
* Shopping cart items
* Login status

Think of state as:

> A component's memory.

---

## 6. React Hooks

React provides special functions called  **Hooks** .

A Hook lets you add extra functionality to components.

Example:

```jsx
React.useState()
```

This hook manages state.

---

## 7. useState()

Basic syntax:

```jsx
const [state, setState] = React.useState(initialValue);
```

Example:

```jsx
const [likes, setLikes] = React.useState(0);
```

---

## 8. Understanding useState

```jsx
const [likes, setLikes] = React.useState(0);
```

### likes

Current state value

```js
likes = 0
```

---

### setLikes

Function that updates the state

```js
setLikes(...)
```

---

### 0

Initial value

```js
React.useState(0)
```

Starts with:

```text
likes = 0
```

---

## 9. Displaying State

Use the state variable inside JSX:

```jsx
<button>
  Likes ({likes})
</button>
```

Initially:

```text
Likes (0)
```

---

## 10. Updating State

Create a click handler:

```jsx
function handleClick() {
  setLikes(likes + 1);
}
```

Attach it:

```jsx
<button onClick={handleClick}>
  Likes ({likes})
</button>
```

---

## 11. What Happens When You Click?

Initial:

```text
likes = 0
```

Click:

```jsx
setLikes(likes + 1)
```

Becomes:

```text
likes = 1
```

React automatically re-renders:

```text
Likes (1)
```

Click again:

```text
Likes (2)
```

Click again:

```text
Likes (3)
```

and so on.

---

## 12. Complete Example

```jsx
function HomePage() {
  const [likes, setLikes] = React.useState(0);

  function handleClick() {
    setLikes(likes + 1);
  }

  return (
    <div>
      <button onClick={handleClick}>
        Likes ({likes})
      </button>
    </div>
  );
}
```

---

## 13. State Lifecycle

```text
Component loads
       ↓
likes = 0
       ↓
User clicks button
       ↓
handleClick()
       ↓
setLikes(1)
       ↓
React re-renders
       ↓
UI updates
```

This cycle is the foundation of React.

---

## 14. Props vs State

This is the most important concept in the chapter.

| Props                       | State                   |
| --------------------------- | ----------------------- |
| Passed from parent          | Stored inside component |
| Read-only                   | Can change              |
| External data               | Internal data           |
| Cannot be modified directly | Updated using setter    |
| Used for communication      | Used for interactivity  |

---

### Props Example

```jsx
<Header title="React" />
```

Child receives:

```jsx
function Header({ title }) {
  return <h1>{title}</h1>;
}
```

Parent controls the value.

---

### State Example

```jsx
const [likes, setLikes] = React.useState(0);
```

Component controls its own value.

---

## 15. Data Flow in React

Props:

```text
Parent
  ↓
Child
```

State:

```text
Stored inside component
       ↓
Updated through setState
       ↓
Triggers re-render
```

---

## 16. Important Rule

Never modify state directly.

❌ Wrong

```jsx
likes = likes + 1;
```

React won't know it changed.

---

✅ Correct

```jsx
setLikes(likes + 1);
```

React updates the UI automatically.

---

## 17. Why State Matters

Without state:

```jsx
<button>Likes (0)</button>
```

Always stays 0.

With state:

```jsx
const [likes, setLikes] = React.useState(0);
```

The UI becomes dynamic and interactive.

---

## Complete Chapter Example

```jsx
function Header({ title }) {
  return <h1>{title}</h1>;
}

function HomePage() {
  const names = [
    "Ada Lovelace",
    "Grace Hopper",
    "Margaret Hamilton"
  ];

  const [likes, setLikes] = React.useState(0);

  function handleClick() {
    setLikes(likes + 1);
  }

  return (
    <div>
      <Header title="Develop. Preview. Ship." />

      <ul>
        {names.map((name) => (
          <li key={name}>{name}</li>
        ))}
      </ul>

      <button onClick={handleClick}>
        Likes ({likes})
      </button>
    </div>
  );
}
```

---

## Exam Revision

### Event Handler

```jsx
onClick={handleClick}
```

Runs code when clicked.

---

### Hook

```jsx
React.useState()
```

Adds state to a component.

---

### State

```jsx
const [likes, setLikes] = React.useState(0);
```

Stores changing data.

---

### Updating State

```jsx
setLikes(likes + 1);
```

Changes state and re-renders UI.

---

### Props vs State

```text
Props = Data passed into component
State = Data owned by component
```

---

## One-Sentence Summary

**State is a component's memory, managed with the `useState()` hook, allowing React applications to respond to user actions and automatically update the UI when data changes.**

# Chapter 8: From React to Next.js — Clear Learning Notes

## What You Have Learned So Far

By the end of the React chapters, you've built an application using three core React concepts:

### 1. Components

Reusable UI building blocks.

```jsx
function Header() {
  return <h1>Hello</h1>;
}
```

### 2. Props

Pass data from parent → child.

```jsx
<Header title="React" />
```

```jsx
function Header({ title }) {
  return <h1>{title}</h1>;
}
```

### 3. State

Store changing data inside a component.

```jsx
const [likes, setLikes] = React.useState(0);
```

## Final React App Review

The app contains:

### Header Component

```jsx
function Header({ title }) {
  return <h1>{title}</h1>;
}
```

Displays dynamic text using props.

### Names List

```jsx
const names = [
  "Ada Lovelace",
  "Grace Hopper",
  "Margaret Hamilton"
];
```

Rendered with:

```jsx
names.map((name) => (
  <li key={name}>{name}</li>
))
```

### Like Button

```jsx
const [likes, setLikes] = React.useState(0);
```

```jsx
<button onClick={handleClick}>
  Like ({likes})
</button>
```

Updates state when clicked.

## The Big Picture

You now understand:

```text
Component
   ↓
Receives Props
   ↓
Uses State
   ↓
Responds to Events
   ↓
Updates UI
```

This is the core React workflow.

## Why React Alone Isn't Enough

React is mainly a:

### UI Library

Its job is:

✅ Create components

✅ Update the UI

✅ Manage state

✅ Handle events

React does  **not automatically provide** :

❌ Routing

❌ Backend integration

❌ API handling structure

❌ Server-side rendering setup

❌ Build optimization

❌ Project architecture

❌ Deployment features

You must configure many of these yourself.

## What Problem Does Next.js Solve?

Next.js is a framework built on top of React.

Think:

```text
React = Engine

Next.js = Complete Car
```

React gives the UI engine.

Next.js provides everything needed to build a production application.

## What Next.js Adds

### Routing

Instead of manually configuring routes:

```text
/about
/contact
/dashboard
```

Next.js creates routes automatically from files.

Example:

```text
app/about/page.js
```

becomes:

```text
/about
```

### Better Performance

Next.js automatically:

* Optimizes pages
* Splits code
* Loads only what's needed
* Improves loading speed

### Server Rendering

React normally runs mostly in the browser.

Next.js can render pages on the server first.

Benefits:

✅ Faster first load

✅ Better SEO

✅ Better user experience

### Data Fetching

Next.js makes it easier to:

* Fetch APIs
* Load database data
* Render dynamic content

### Production Features

Built-in support for:

* Authentication
* Image optimization
* Deployment
* Caching
* Streaming
* Server Actions

## Modern React Needs a Framework

The chapter mentions:

### Server Components

and

### Client Components

These are modern React features.

They work best inside frameworks such as Next.js.

## Server Components

Run on the server.

```text
Browser
    ↓ Request
Server renders component
    ↓
HTML sent to browser
```

Advantages:

* Smaller JavaScript bundle
* Better performance
* Secure access to databases

## Client Components

Run in the browser.

Used when you need:

* State
* Event handlers
* User interaction

Example:

```jsx
"use client";

const [likes, setLikes] = useState(0);
```

Because clicking buttons requires browser interaction.

## React vs Next.js

| React               | Next.js                   |
| ------------------- | ------------------------- |
| UI library          | Full framework            |
| Components          | Components                |
| Props               | Props                     |
| State               | State                     |
| Manual routing      | Automatic routing         |
| Manual optimization | Built-in optimization     |
| Browser rendering   | Server + Client rendering |
| Requires setup      | Ready-to-use structure    |

## Migration Idea

Current React App:

```jsx
function HomePage() {
  return (
    <div>
      <Header />
      <button>Like</button>
    </div>
  );
}
```

Next.js version will place components into:

```text
app/
 ├─ page.js
 ├─ layout.js
 └─ components/
```

while keeping most React code unchanged.

## Key Takeaway

The important message of this chapter is:

> You already know the fundamentals of React. Next.js does not replace React—it builds on top of React and provides the tools needed to create complete, scalable, production-ready applications.

## React Learning Journey So Far

```text
HTML
  ↓
React Components
  ↓
JSX
  ↓
Props
  ↓
Lists
  ↓
Events
  ↓
State
  ↓
Next.js Framework
```

## Exam Revision

### React Core Concepts

```text
Components
Props
State
```

### Props

```text
Parent → Child data
```

### State

```text
Component memory
```

### React

```text
UI Library
```

### Next.js

```text
Framework built on React
```

### Why Use Next.js?

```text
Routing
Performance
Server Rendering
Data Fetching
Production Features
```

## One-Sentence Summary

**React helps you build interactive user interfaces, while Next.js extends React with routing, server rendering, performance optimizations, and application-level features needed for real-world production apps.**

```

```
