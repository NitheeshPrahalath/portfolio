---
title: "FastAPI Deepdive - Day 1"
date: "2026-06-10"
description: "A deepdive on FastAPI - "
---
## Topic 1: What is FastAPI & The ASGI Foundation

At its core, **FastAPI** is a wrapper. It isn't a server and it isn't a low-level web framework. It sits on top of two giants:

1. **Starlette:** Handles the web parts (routing, requests, websockets).
2. **Pydantic:** Handles the data parts (validation, serialization).

### 1.1 Understanding ASGI (Asynchronous Server Gateway Interface)

Before FastAPI, Python used **WSGI** (Web Server Gateway Interface). Think of WSGI like a  **walkie-talkie** : only one person can talk at a time. If a request is waiting for a database, the entire "worker" is stuck.

**ASGI** is like a  **modern smartphone** . It can handle multiple "conversations" (requests) at once. It allows for:

* **Long-lived connections:** Like WebSockets.
* **Concurrency:** Handling thousands of requests on a single thread.
* **Background Tasks:** Sending an email while still finishing the HTTP response.

### 1.2 The Request Lifecycle (The "Path" of a Packet)

When a user hits your FastAPI endpoint, the journey looks like this:

1. **The Server (Uvicorn):** Listens for the byte stream and parses the HTTP protocol.
2. **The Middleware:** The request passes through "layers" (CORS, GZip, Auth).
3. **Routing:** Starlette looks at the URL and finds the right function.
4. **Dependency Injection:** Before your function runs, FastAPI resolves everything in `Depends()`.
5. **Validation:** Pydantic checks if the input JSON matches your model.
6. **The Endpoint:** Your code finally runs.
7. **Serialization:** Your return value (dict/model) is turned back into JSON.
8. **The Response:** Sent back through the middleware and out to the user.

## Case Study: The "Interceptor" API

To keep this practical, let’s build a case study called  **Interceptor API** . It’s a traffic monitoring system where we receive vehicle data.

### The Basic Setup

**Python**

```
from fastapi import FastAPI
import uvicorn

# 1. Initialize the app (This is an ASGI application)
app = FastAPI()

@app.get("/")
async def root():
    return {"message": "Traffic System Online"}

if __name__ == "__main__":
    # 2. Run with Uvicorn (The ASGI Server)
    uvicorn.run(app, host="127.0.0.1", port=8000)
```

### Why this matters for a Job Switch:

Interviewers love to ask: **"Is FastAPI faster than Flask because of Python's speed?"**

* **The Answer:** No. Python's execution speed is the same. FastAPI is faster because it uses **Non-blocking I/O** (ASGI). It doesn't wait for the "wait." It switches to another task while the first one is waiting for the database.

### 💡 Quick Knowledge Check

Before we move to **Async I/O vs. Blocking I/O** (where we'll discuss the "Event Loop" and why `async def` sometimes makes your app *slower* if used incorrectly):

1. If you have a very heavy calculation (CPU-bound), does `async def` help you?
2. In the lifecycle above, where do you think **Pydantic** does its work?

You are spot on with **Question 2!** Pydantic acts as the guard right before the request hits your path operation function. If the JSON is bad, it halts the lifecycle early and returns a `422 Unprocessable Entity` status without ever running your business logic.

However, for  **Question 1** , we hit a massive architectural trap that trips up many developers in interviews. Let's clear that up right now, as it leads perfectly into our next topic.

## Topic 2: Async I/O vs. Blocking I/O (The Event Loop Internals)

In your response, you mentioned that `async` helps by blocking other calls. In reality, **we never want to block.** The entire goal of an async architecture is to remain non-blocking.

To understand this, we have to look at the  **Event Loop** .

### 2.1 The Event Loop: The Single-Threaded Conductor

FastAPI (via Python's `asyncio`) runs on a **single thread** managed by an Event Loop. Think of the Event Loop like a busy waiter in a restaurant:

* The waiter takes Table 1's order and passes it to the kitchen (I/O operation like a database query).
* Instead of standing there waiting for the chef to cook, the waiter immediately walks over to Table 2 to take their order.
* When the kitchen bell rings, the waiter returns to Table 1 to serve the food.

### 2.2 The "Async" Trap: CPU-Bound Tasks

What happens if Table 1 asks the waiter to solve a Rubik's cube (a heavy CPU calculation)?
The waiter stops taking any other orders and sits at Table 1 solving the cube. **Table 2 and Table 3 starve.**

This is exactly what happens when you use `async def` with heavy CPU-bound math:

**Python**

```
# ❌ THE INTERVIEW TRAP: This blocks the entire server!
@app.get("/process-traffic-image")
async def process_image():
    # Imagine calculating license plate frames (Heavy CPU)
    count = 0
    for i in range(10_000_000):
        count += i
    return {"result": count}
```

Because there is no `await` keyword inside that loop, the Event Loop cannot pause it. The single thread is completely hijacked. **Every other user trying to hit your API will experience a timeout.**

### 2.3 How FastAPI Handles `def` vs `async def`

FastAPI has a brilliant built-in mechanism to save you from blocking the server, but you have to know how to use it.

| Definition                  | Execution Mechanism                                                       | When to Use                                                                                                |
| --------------------------- | ------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------- |
| **`async def`**     | Runs directly on the**Event Loop**thread.                           | **I/O Bound tasks**that use async libraries (e.g.,`await database.fetch()`,`await httpx.get()`). |
| **`def`**(Standard) | FastAPI automatically offloads this to an external**Thread Pool** . | **Blocking I/O**(e.g., standard `requests.get()`,`time.sleep()`) or heavy CPU work.              |

#### Case Study Example: The Interceptor Worker

Let's see how we handle both scenarios correctly in our traffic system:

**Python**

```
import asyncio
import time
from fastapi import FastAPI

app = FastAPI()

# Scenario A: Correct Async I/O
@app.get("/fetch-vehicle-record/{vehicle_id}")
async def get_vehicle(vehicle_id: str):
    # This yields control back to the loop while the DB fetches data
    await asyncio.sleep(1) 
    return {"status": "Active", "id": vehicle_id}

# Scenario B: Correct CPU/Blocking offloading
@app.get("/process-plate-image")
def process_plate():
    # By using standard 'def', FastAPI runs this inside a separate thread pool.
    # The main event loop stays free to handle other incoming requests!
    time.sleep(2)  # Simulating a heavy model inference
    return {"plate": "KA-01-MH-1234"}
```

### Interview Goldmine: "How do you scale heavy CPU tasks in FastAPI?"

If an interviewer asks you this, standard `def` threads are a decent answer, but the **Senior-level answer** is:

> "For massive CPU-bound tasks like image processing or data science matrix operations, threads still hit Python's GIL (Global Interpreter Lock). The best architecture is to handle the request asynchronously, offload the heavy execution to a distributed task queue like  **Celery or Drama** , and return a `202 Accepted` status to the client."

### 💡 Quick Knowledge Check

Before we move to **Topic 3: Uvicorn/Gunicorn Workers** (how we manage multiple processes to maximize multi-core CPUs), let’s make sure this is locked in:

If you are writing an endpoint that uses the standard `pandas.read_csv()` to read a 500MB log file of traffic metrics, should you define the endpoint with `async def` or standard `def`? Why?
