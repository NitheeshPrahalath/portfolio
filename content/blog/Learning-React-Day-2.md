---
title: "Learning React Day 2"
date: "2026-05-31"
description: "Day 2"
---

# Chapter 4 : Getting Started with React

This chapter introduces React and explains how to use it to render UI more easily than manipulating the DOM manually.

### 1. Adding React to a Project

You need two React libraries:

- **React** – the core library.
- **ReactDOM** – allows React to interact with the browser DOM.

```html
<script src="https://unpkg.com/react@18/umd/react.development.js"></script>
<script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
```

---

### 2. Traditional JavaScript vs React

Previously, creating a heading required multiple DOM operations:

```javascript
const header = document.createElement('h1');
const text = document.createTextNode('Develop. Preview. Ship.');
header.appendChild(text);
app.appendChild(header);
```

With React:

```javascript
const root = ReactDOM.createRoot(app);
root.render(<h1>Develop. Preview. Ship.</h1>);
```

React lets you describe *what* the UI should look like instead of manually telling the browser *how* to build it.

---

### 3. What is JSX?

JSX is a JavaScript syntax extension that looks like HTML:

```jsx
<h1>Develop. Preview. Ship.</h1>
```

Benefits:

- Easier to read
- Looks familiar to HTML
- Makes UI code more concise

However, browsers cannot understand JSX directly.

---

### 4. Why Babel is Needed

This code causes an error:

```jsx
root.render(<h1>Develop. Preview. Ship.</h1>);
```

Error:

```text
Uncaught SyntaxError: expected expression, got '<'
```

Reason:

- JSX is not valid JavaScript.
- Browsers only understand JavaScript.

**Babel** converts JSX into regular JavaScript that browsers can execute.

Add Babel:

```html
<script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
```

Change the script type:

```html
<script type="text/jsx">
```

---

### 5. Complete Working Example

```html
<div id="app"></div>

<script src="https://unpkg.com/react@18/umd/react.development.js"></script>
<script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
<script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>

<script type="text/jsx">
  const domNode = document.getElementById('app');
  const root = ReactDOM.createRoot(domNode);

  root.render(
    <h1>Develop. Preview. Ship.</h1>
  );
</script>
```

---

### 6. Declarative vs Imperative Programming

#### Imperative (Plain JavaScript)

You explicitly tell the browser every step:

```javascript
createElement()
createTextNode()
appendChild()
```

#### Declarative (React)

You describe the desired UI:

```jsx
<h1>Develop. Preview. Ship.</h1>
```

React handles the DOM updates internally.

---

### 7. Key Takeaway

React is a library that helps you build user interfaces by:

- Reducing repetitive DOM code
- Using JSX to describe UI
- Managing DOM updates for you
- Making applications easier to build and maintain

---

### JavaScript Topics Needed for React

The chapter also previews important JavaScript concepts you'll use throughout React:

- Functions
- Arrow Functions
- Objects
- Arrays and Array Methods
- Destructuring
- Template Literals
- Ternary Operators
- ES Modules (`import` / `export`)

---

### Quiz Answer

**Why do you need to compile your React code?**

Because **browsers do not understand JSX directly**, so tools like **Babel** must transform JSX into standard JavaScript before it can run.


# Chapter 5 Summary: Building UI with Components

This chapter introduces one of React's most important concepts:  **Components** .

#### Core React Concepts

React is built around three key ideas:

1. **Components** – reusable UI building blocks.
2. **Props** – data passed between components.
3. **State** – data that changes over time.

This chapter focuses on  **components** .

---

## What Are Components?

Components are reusable pieces of UI that help organize an application into smaller, manageable parts.

Think of them like LEGO bricks:

* Small pieces can be combined into larger structures.
* You can update one piece without affecting the entire application.
* They improve code maintainability and reusability.

---

## Creating a Component

In React, a component is simply a JavaScript function that returns JSX.

```jsx
function Header() {
  return <h1>Develop. Preview. Ship.</h1>;
}
```

---

## Rendering a Component

To display a component on the page:

```jsx
root.render(<Header />);
```

### Important Rules

#### 1. Component names must start with a capital letter

✅ Correct:

```jsx
function Header() {}
```

❌ Incorrect:

```jsx
function header() {}
```

React uses capitalization to distinguish components from HTML elements.

---

#### 2. Use components like HTML tags

```jsx
<Header />
```

Not:

```jsx
Header
```

---

## Nesting Components

Components can be placed inside other components.

Example:

```jsx
function Header() {
  return <h1>Develop. Preview. Ship.</h1>;
}

function HomePage() {
  return (
    <div>
      <Header />
    </div>
  );
}
```

Then render the top-level component:

```jsx
root.render(<HomePage />);
```

---

## Component Trees

Components can contain other components, forming a hierarchy called a  **component tree** .

Example structure:

```text
HomePage
├── Header
│   ├── Logo
│   ├── Title
│   └── Navigation
├── Article
└── Footer
```

Benefits:

* Better organization
* Reusability
* Easier maintenance
* Clear separation of responsibilities

---

## Quiz Answer

**How would you nest a `Nav` component inside a `Layout` component?**

```jsx
function Nav() {
  return <nav>Navigation</nav>;
}

function Layout() {
  return (
    <div>
      <Nav />
    </div>
  );
}
```

---

### Key Takeaways

* React UIs are built using  **components** .
* Components are  **JavaScript functions that return JSX** .
* Component names must be  **capitalized** .
* Components are used like HTML tags (`<Header />`).
* Components can be **nested** inside one another.
* Nested components form a  **component tree** .
* Usually, a top-level component (e.g., `HomePage`) is rendered with `root.render()`.

**Next Chapter:** Props — passing data between components.
