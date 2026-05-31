---
title: "Learning React - Day 1"
date: "2026-05-21"
description: "First steps into React and Next.js"
---
Today I set up my portfolio project using Next.js. Here's what I learned.

# Chapter 1: About React and Next.js

#### 1. Building Modern Web Applications Requires Multiple Components

When creating a web application, developers must consider:

* **User Interface (UI)** – what users see and interact with.
* **Routing** – navigation between pages.
* **Data Fetching** – getting and managing data.
* **Rendering** – deciding when and where content is generated.
* **Integrations** – connecting services like authentication, CMS, or payments.
* **Infrastructure** – deployment and hosting environments.
* **Performance** – making the application fast.
* **Scalability** – handling growth in users, data, and features.
* **Developer Experience** – making development and maintenance easier.

---

#### 2. What is React?

* React is a **JavaScript library** used to build  **interactive user interfaces (UI)** .
* It provides APIs and tools for creating UI components.
* React focuses mainly on the UI layer and leaves many application decisions to developers.
* Because React is flexible and unopinionated, a large ecosystem of tools has grown around it.
* Building a complete application with React alone often requires additional setup and third-party tools.

**Key idea:**
👉 React helps you build the UI but doesn't provide everything needed for a full application.

---

#### 3. What is Next.js?

* Next.js is a  **React framework** .
* It builds on React and provides additional features and structure.
* Next.js handles much of the configuration and tooling automatically.

It includes solutions for:

* Routing
* Data fetching
* Rendering
* Caching
* Performance optimization

**Key idea:**
👉 Next.js provides the missing pieces needed to build complete web applications efficiently.

---

#### 4. Relationship Between React and Next.js

Think of them like this:

| React                       | Next.js                                                  |
| --------------------------- | -------------------------------------------------------- |
| Library                     | Framework                                                |
| Builds UI                   | Builds full web applications                             |
| Flexible but requires setup | Provides structure and built-in features                 |
| Focuses on components       | Handles routing, rendering, data fetching, caching, etc. |

**React = Building the interface**
**Next.js = Building the entire application around that interface**

---

#### 5. Benefits of Using Next.js

* Faster development with less configuration.
* Better developer experience.
* Improved application performance.
* Built-in solutions for common web application needs.
* Suitable for both individual developers and large teams.
* Enables creation of highly interactive, dynamic, and scalable applications.

---

### One-Sentence Summary

**React is a library for building user interfaces, while Next.js is a framework built on React that provides everything needed to create fast, scalable, full-stack web applications.**



# Chapter 2: Rendering User Interfaces (UI)

This chapter explains how web browsers render user interfaces and introduces the  **Document Object Model (DOM)** .

#### Key Points

1. **Browser Receives HTML**

* When a user visits a website, the server sends an HTML file to the browser.

1. **Browser Creates the DOM**

* The browser reads the HTML and converts it into a  **Document Object Model (DOM)** .
* The DOM is a tree-like structure that represents all HTML elements and their relationships (parent and child nodes).

1. **DOM Connects Code and UI**

* The DOM acts as a bridge between your JavaScript code and what users see on the screen.

1. **JavaScript Can Manipulate the DOM**

* Developers can use JavaScript and DOM methods to:
  *  Select elements
  *  Add new elements
  *  Update existing elements
  *  Delete elements
  *  Change styles and content
  *  Respond to user interactions (clicks, keyboard input, etc.)

1. **Why This Matters for React**

* Understanding how browsers render HTML and how the DOM works is important before learning how React updates user interfaces.

### Quiz Answer

**True or False: You can update the page content by manipulating the DOM.**

✅ **True**

JavaScript can manipulate the DOM to change the content, structure, and appearance of a webpage dynamically.

### One-Sentence Takeaway

The browser converts HTML into a DOM tree, and JavaScript can manipulate that DOM to dynamically update the user interface.

# Chapter 3 Summary: Updating UI with JavaScript

This chapter teaches how to use **JavaScript and the DOM (Document Object Model)** to dynamically update a web page.

#### 1. Creating the HTML Structure

Start with a simple HTML file:

<pre class="overflow-visible! px-0!" data-start="246" data-end="316"><div class="relative w-full mt-4 mb-1"><div class=""><div data-custom-highlighting-behavior="boundary" class="relative"><div class="h-full min-h-0 min-w-0"><div class="h-full min-h-0 min-w-0"><div class="border border-token-border-light border-radius-3xl corner-superellipse/1.1 rounded-3xl"><div class="h-full w-full border-radius-3xl bg-token-bg-elevated-secondary corner-superellipse/1.1 overflow-clip rounded-3xl lxnfua_clipPathFallback"><div class="pointer-events-none absolute inset-x-4 top-12 bottom-4"><div class="pointer-events-none sticky z-40 shrink-0 z-1!"><div class="sticky bg-token-border-light"></div></div></div><div class="relative [container-type:inline-size]"><div class="w-full overflow-x-hidden overflow-y-auto"><div class="relative z-0 flex max-w-full"><div id="code-block-viewer" dir="ltr" class="q9tKkq_viewer cm-editor z-10 light:cm-light dark:cm-light flex h-full w-full flex-col items-stretch ͼs ͼ16"><div class="cm-scroller"><pre class="cm-content q9tKkq_readonly m-0"><code><span class="ͼ13"><html></span><br/><span></span><span class="ͼ13"><body></span><br/><span></span><span class="ͼ13"><div</span><span></span><span class="ͼ12">id</span><span class="ͼv">=</span><span class="ͼz">"app"</span><span class="ͼ13">></div></span><br/><span></span><span class="ͼ13"></body></span><br/><span class="ͼ13"></html></span></code></pre></div></div></div></div></div></div></div></div></div><div class=""><div class=""></div></div></div></div></div></pre>

The `id="app"` allows JavaScript to target this specific element.

---

#### 2. Adding JavaScript

A `<script>` tag is added inside the HTML:

<pre class="overflow-visible! px-0!" data-start="461" data-end="513"><div class="relative w-full mt-4 mb-1"><div class=""><div class="relative" data-custom-highlighting-behavior="boundary"><div class="h-full min-h-0 min-w-0"><div class="h-full min-h-0 min-w-0"><div class="border border-token-border-light border-radius-3xl corner-superellipse/1.1 rounded-3xl"><div class="h-full w-full border-radius-3xl bg-token-bg-elevated-secondary corner-superellipse/1.1 overflow-clip rounded-3xl lxnfua_clipPathFallback"><div class="pointer-events-none absolute inset-x-4 top-12 bottom-4"><div class="pointer-events-none sticky z-40 shrink-0 z-1!"><div class="sticky bg-token-border-light"></div></div></div><div class="relative [container-type:inline-size]"><div class="w-full overflow-x-hidden overflow-y-auto"><div class="relative z-0 flex max-w-full"><div id="code-block-viewer" dir="ltr" class="q9tKkq_viewer cm-editor z-10 light:cm-light dark:cm-light flex h-full w-full flex-col items-stretch ͼs ͼ16"><div class="cm-scroller"><pre class="cm-content q9tKkq_readonly m-0"><code><span class="ͼ13"><script</span><span></span><span class="ͼ12">type</span><span class="ͼv">=</span><span class="ͼz">"text/javascript"</span><span class="ͼ13">></script></span></code></pre></div></div></div></div></div></div></div></div></div><div class=""><div class=""></div></div></div></div></div></pre>

JavaScript can then access the div:

<pre class="overflow-visible! px-0!" data-start="552" data-end="613"><div class="relative w-full mt-4 mb-1"><div class=""><div class="relative"><div class="h-full min-h-0 min-w-0"><div class="h-full min-h-0 min-w-0"><div class="border border-token-border-light border-radius-3xl corner-superellipse/1.1 rounded-3xl"><div class="h-full w-full border-radius-3xl bg-token-bg-elevated-secondary corner-superellipse/1.1 overflow-clip rounded-3xl lxnfua_clipPathFallback"><div class="pointer-events-none absolute inset-x-4 top-12 bottom-4"><div class="pointer-events-none sticky z-40 shrink-0 z-1!"><div class="sticky bg-token-border-light"></div></div></div><div class="relative"><div class=""><div class="relative z-0 flex max-w-full"><div id="code-block-viewer" dir="ltr" class="q9tKkq_viewer cm-editor z-10 light:cm-light dark:cm-light flex h-full w-full flex-col items-stretch ͼs ͼ16"><div class="cm-scroller"><pre class="cm-content q9tKkq_readonly m-0"><code><span class="ͼv">const</span><span></span><span class="ͼ11">app</span><span></span><span class="ͼv">=</span><span></span><span class="ͼ11">document</span><span class="ͼv">.</span><span>getElementById(</span><span class="ͼz">'app'</span><span>);</span></code></pre></div></div></div></div></div></div></div></div></div><div class=""><div class=""></div></div></div></div></div></pre>

---

#### 3. Creating and Inserting Elements

JavaScript uses DOM methods to:

1. Create an `<h1>` element.
2. Create a text node.
3. Attach the text to the `<h1>`.
4. Insert the `<h1>` into the page.

Example:

<pre class="overflow-visible! px-0!" data-start="827" data-end="1088"><div class="relative w-full mt-4 mb-1"><div class=""><div class="relative"><div class="h-full min-h-0 min-w-0"><div class="h-full min-h-0 min-w-0"><div class="border border-token-border-light border-radius-3xl corner-superellipse/1.1 rounded-3xl"><div class="h-full w-full border-radius-3xl bg-token-bg-elevated-secondary corner-superellipse/1.1 overflow-clip rounded-3xl lxnfua_clipPathFallback"><div class="pointer-events-none absolute inset-x-4 top-12 bottom-4"><div class="pointer-events-none sticky z-40 shrink-0 z-1!"><div class="sticky bg-token-border-light"></div></div></div><div class="relative"><div class=""><div class="relative z-0 flex max-w-full"><div id="code-block-viewer" dir="ltr" class="q9tKkq_viewer cm-editor z-10 light:cm-light dark:cm-light flex h-full w-full flex-col items-stretch ͼs ͼ16"><div class="cm-scroller"><pre class="cm-content q9tKkq_readonly m-0"><code><span class="ͼv">const</span><span></span><span class="ͼ11">app</span><span></span><span class="ͼv">=</span><span></span><span class="ͼ11">document</span><span class="ͼv">.</span><span>getElementById(</span><span class="ͼz">'app'</span><span>);</span><br/><br/><span class="ͼv">const</span><span></span><span class="ͼ11">header</span><span></span><span class="ͼv">=</span><span></span><span class="ͼ11">document</span><span class="ͼv">.</span><span>createElement(</span><span class="ͼz">'h1'</span><span>);</span><br/><span class="ͼv">const</span><span></span><span class="ͼ11">text</span><span></span><span class="ͼv">=</span><span></span><span class="ͼz">'Develop. Preview. Ship.'</span><span>;</span><br/><span class="ͼv">const</span><span></span><span class="ͼ11">headerContent</span><span></span><span class="ͼv">=</span><span></span><span class="ͼ11">document</span><span class="ͼv">.</span><span>createTextNode(</span><span class="ͼ11">text</span><span>);</span><br/><br/><span class="ͼ11">header</span><span class="ͼv">.</span><span>appendChild(</span><span class="ͼ11">headerContent</span><span>);</span><br/><span class="ͼ11">app</span><span class="ͼv">.</span><span>appendChild(</span><span class="ͼ11">header</span><span>);</span></code></pre></div></div></div></div></div></div></div></div></div><div class=""><div class=""></div></div></div></div></div></pre>

Result:

<pre class="overflow-visible! px-0!" data-start="1099" data-end="1143"><div class="relative w-full mt-4 mb-1"><div class=""><div data-custom-highlighting-behavior="boundary" class="relative"><div class="h-full min-h-0 min-w-0"><div class="h-full min-h-0 min-w-0"><div class="border border-token-border-light border-radius-3xl corner-superellipse/1.1 rounded-3xl"><div class="h-full w-full border-radius-3xl bg-token-bg-elevated-secondary corner-superellipse/1.1 overflow-clip rounded-3xl lxnfua_clipPathFallback"><div class="pointer-events-none absolute inset-x-4 top-12 bottom-4"><div class="pointer-events-none sticky z-40 shrink-0 z-1!"><div class="sticky bg-token-border-light"></div></div></div><div class="relative [container-type:inline-size]"><div class="w-full overflow-x-hidden overflow-y-auto"><div class="relative z-0 flex max-w-full"><div id="code-block-viewer" dir="ltr" class="q9tKkq_viewer cm-editor z-10 light:cm-light dark:cm-light flex h-full w-full flex-col items-stretch ͼs ͼ16"><div class="cm-scroller"><pre class="cm-content q9tKkq_readonly m-0"><code><span class="ͼ13"><h1></span><span>Develop. Preview. Ship.</span><span class="ͼ13"></h1></span></code></pre></div></div></div></div></div></div></div></div></div><div class=""><div class=""></div></div></div></div></div></pre>

appears on the page.

---

#### 4. HTML vs. DOM

* **HTML** = the original source code.
* **DOM** = the browser's live representation of the page.

When JavaScript modifies the page, the DOM changes, but the original HTML file remains the same.

---

#### 5. Imperative Programming

The JavaScript example is **imperative** because it tells the browser exactly **how** to perform each step:

<pre class="overflow-visible! px-0!" data-start="1537" data-end="1601"><div class="relative w-full mt-4 mb-1"><div class=""><div class="relative"><div class="h-full min-h-0 min-w-0"><div class="h-full min-h-0 min-w-0"><div class="border border-token-border-light border-radius-3xl corner-superellipse/1.1 rounded-3xl"><div class="h-full w-full border-radius-3xl bg-token-bg-elevated-secondary corner-superellipse/1.1 overflow-clip rounded-3xl lxnfua_clipPathFallback"><div class="pointer-events-none absolute inset-x-4 top-12 bottom-4"><div class="pointer-events-none sticky z-40 shrink-0 z-1!"><div class="sticky bg-token-border-light"></div></div></div><div class="relative"><div class=""><div class="relative z-0 flex max-w-full"><div id="code-block-viewer" dir="ltr" class="q9tKkq_viewer cm-editor z-10 light:cm-light dark:cm-light flex h-full w-full flex-col items-stretch ͼs ͼ16"><div class="cm-scroller"><pre class="cm-content q9tKkq_readonly m-0"><code><span class="ͼ11">createElement</span><span>()</span><br/><span class="ͼ11">createTextNode</span><span>()</span><br/><span class="ͼ11">appendChild</span><span>()</span></code></pre></div></div></div></div></div></div></div></div></div><div class=""><div class=""></div></div></div></div></div></pre>

You manually describe every action required to update the UI.

---

#### 6. Declarative Programming

A **declarative** approach focuses on **what** should appear on the screen rather than **how** to build it.

**Pizza analogy:**

* Imperative → Give the chef step-by-step instructions to make a pizza.
* Declarative → Simply order a pizza and let the chef handle the process.

---

#### 7. Introduction to React

React is a  **declarative UI library** .

Instead of manually manipulating the DOM, developers describe the desired UI, and React determines how to update the DOM efficiently.

Example idea:

<pre class="overflow-visible! px-0!" data-start="2206" data-end="2249"><div class="relative w-full mt-4 mb-1"><div class=""><div class="relative"><div class="h-full min-h-0 min-w-0"><div class="h-full min-h-0 min-w-0"><div class="border border-token-border-light border-radius-3xl corner-superellipse/1.1 rounded-3xl"><div class="h-full w-full border-radius-3xl bg-token-bg-elevated-secondary corner-superellipse/1.1 overflow-clip rounded-3xl lxnfua_clipPathFallback"><div class="pointer-events-none absolute inset-x-4 top-12 bottom-4"><div class="pointer-events-none sticky z-40 shrink-0 z-1!"><div class="sticky bg-token-border-light"></div></div></div><div class="relative"><div class=""><div class="relative z-0 flex max-w-full"><div id="code-block-viewer" dir="ltr" class="q9tKkq_viewer cm-editor z-10 light:cm-light dark:cm-light flex h-full w-full flex-col items-stretch ͼs ͼ16"><div class="cm-scroller"><pre class="cm-content q9tKkq_readonly m-0"><code><span class="ͼ13"><h1></span><span>Develop. Preview. Ship.</span><span class="ͼ13"></h1></span></code></pre></div></div></div></div></div></div></div></div></div><div class=""><div class=""></div></div></div></div></div></pre>

React handles the DOM updates behind the scenes.

---

### Key Takeaways

* JavaScript can dynamically update web pages using DOM methods.
* `getElementById()`, `createElement()`, and `appendChild()` are common DOM APIs.
* The **DOM** is the browser's current view of the page, while **HTML** is the original source.
* Manual DOM manipulation is  **imperative programming** .
* React promotes  **declarative programming** , where developers describe the UI and React updates the DOM automatically.
* Declarative approaches become more useful as applications grow in size and complexity.

## The easiest way to understand the difference is:

* **Imperative = Tell the computer HOW to do something.**
* **Declarative = Tell the computer WHAT you want.**

### Example 1: Making Tea

#### Imperative

You give exact instructions:

```text
1. Boil water
2. Put tea bag in cup
3. Pour water into cup
4. Wait 3 minutes
5. Remove tea bag
```

You're describing **how** to make tea.

#### Declarative

You simply say:

```text
I want a cup of tea.
```

You're describing **what** you want.

---

### Example 2: Updating a Web Page

Suppose you want this on the screen:

```html
<h1>Hello World</h1>
```

#### Imperative (Plain JavaScript)

```javascript
const app = document.getElementById("app");

const heading = document.createElement("h1");

const text = document.createTextNode("Hello World");

heading.appendChild(text);

app.appendChild(heading);
```

You're telling the browser every step:

* Create element
* Create text
* Attach text
* Insert into page

This is  **imperative** .

---

#### Declarative (React)

```jsx
function App() {
  return <h1>Hello World</h1>;
}
```

You only describe the final UI:

```text
Show an h1 with "Hello World"
```

React figures out:

* Creating elements
* Updating the DOM
* Optimizing changes

This is  **declarative** .

---

### Example 3: Filtering Data

Suppose you have:

```javascript
const numbers = [1, 2, 3, 4, 5];
```

#### Imperative

```javascript
const evens = [];

for (let i = 0; i < numbers.length; i++) {
  if (numbers[i] % 2 === 0) {
    evens.push(numbers[i]);
  }
}
```

You explain every step.

---

#### Declarative

```javascript
const evens = numbers.filter(num => num % 2 === 0);
```

You simply declare:

```text
Give me all even numbers.
```

The implementation details are hidden.

---

### Quick Rule

If your code contains lots of:

```javascript
create
append
insert
remove
loop
step-by-step instructions
```

it's usually  **imperative** .

If your code mostly says:

```javascript
I want this result
I want this UI
I want these filtered items
```

and another system figures out the steps, it's  **declarative** .

React, SQL, and HTML are largely declarative.

Plain DOM manipulation with JavaScript is largely imperative.
