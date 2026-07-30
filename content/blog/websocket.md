---
title: "WebSocket"
date: "2026-07-30"
description: "WebSocket from scratch"
tags: ["WebSocket", "Networking", "Real-time", "JavaScript"]
---

Natsu, let's learn **WebSockets from scratch**, assuming you know basic programming but nothing about WebSockets.

---

# 1. First: What problem does WebSocket solve?

Imagine you build a chat application.

You send a message:

> Natsu: Hello!

The server needs to immediately tell the other person:

> Friend: Hey! I received a new message.

The problem is: **How does the server notify the browser?**

With normal HTTP, communication usually looks like this:

```text
Browser  ──────── Request ────────>  Server
Browser  <─────── Response ───────  Server
```

For example:

```text
GET /messages
```

Server responds:

```json
[
  {
    "from": "Natsu",
    "text": "Hello!"
  }
]
```

The connection is then generally finished.

If the server gets a new message 1 second later, the browser doesn't automatically know about it.

The browser has to ask again:

```text
Browser ── "Any new messages?" ──> Server
Browser <── "Nope." ───────────── Server

... 1 second ...

Browser ── "Any new messages?" ──> Server
Browser <── "Nope." ───────────── Server

... 1 second ...

Browser ── "Any new messages?" ──> Server
Browser <── "Yes! Here's one." ── Server
```

This is called **polling**.

It works, but it is inefficient.

WebSockets solve this problem by allowing the client and server to maintain a **persistent, two-way communication channel**.

---

# 2. The core idea

A WebSocket connection looks like this:

```text
                 Persistent connection
        ┌─────────────────────────────────┐
        │                                 │
Browser ╞═════════════════════════════════╡ Server
        │                                 │
        └─────────────────────────────────┘
           ↑                         ↑
        Can send                  Can send
```

Both sides can send messages whenever they want.

The browser can send:

```text
Hello server
```

The server can send:

```text
Hey browser, something changed!
```

The server doesn't have to wait for the browser to ask.

That's the **most important thing to understand about WebSockets**:

> **WebSockets provide a persistent, bidirectional communication channel between a client and a server.**

"Bidirectional" means:

```text
Client ────────────────> Server
Client <──────────────── Server
```

Both directions work independently.

---

# 3. HTTP vs WebSocket

Let's compare them.

### Traditional HTTP

```text
Client                      Server

  │                           │
  │────── HTTP Request ──────>│
  │                           │
  │<──── HTTP Response ───────│
  │                           │
  X Connection ends
```

Then later:

```text
  │                           │
  │────── HTTP Request ──────>│
  │                           │
  │<──── HTTP Response ───────│
```

Every interaction follows the request-response model.

---

### WebSocket

```text
Client                      Server

  │                           │
  │──── Connection Request ──>│
  │                           │
  │<──── Connection Open ─────│
  │                           │
  │<══════ Persistent ═══════>│
  │                           │
  │────── Message ───────────>│
  │                           │
  │<────── Message ───────────│
  │                           │
  │<────── Message ───────────│
  │                           │
  │────── Message ───────────>│
```

The connection stays alive until one side closes it.

---

# 4. How does a WebSocket connection actually start?

This is where things get interesting.

WebSockets usually **start as an HTTP connection**.

The browser initially makes a special HTTP request asking the server:

> "Can we upgrade this connection to a WebSocket?"

This is called the **WebSocket handshake**.

Conceptually:

```text
Client
   │
   │ HTTP Request
   │ "I want to upgrade to WebSocket"
   ▼
Server
   │
   │ HTTP Response
   │ "Okay, let's upgrade"
   ▼
WebSocket Connection
```

The request contains something similar to:

```http
GET /chat HTTP/1.1
Host: example.com
Upgrade: websocket
Connection: Upgrade
Sec-WebSocket-Key: ...
Sec-WebSocket-Version: 13
```

The server responds:

```http
HTTP/1.1 101 Switching Protocols
Upgrade: websocket
Connection: Upgrade
Sec-WebSocket-Accept: ...
```

The important response is:

```text
101 Switching Protocols
```

This essentially means:

> "We're no longer going to communicate using normal HTTP request/response semantics. We're switching protocols to WebSocket."

After that, you have a WebSocket connection.

---

# 5. `ws://` and `wss://`

You will see URLs like:

```text
ws://example.com/chat
```

and:

```text
wss://example.com/chat
```

They are the WebSocket equivalents of:

```text
http://
https://
```

Think of it like this:

| Protocol   | Meaning               |
| ---------- | --------------------- |
| `http://`  | HTTP without TLS      |
| `https://` | HTTP with TLS         |
| `ws://`    | WebSocket without TLS |
| `wss://`   | WebSocket with TLS    |

In production, you generally want:

```text
wss://
```

because the communication is encrypted.

For example:

```javascript
const socket = new WebSocket("wss://example.com/chat");
```

---

# 6. Your first WebSocket client

Modern browsers have a built-in WebSocket API.

A simple client looks like this:

```javascript
const socket = new WebSocket("ws://localhost:8080");
```

This starts connecting to the server.

You can listen for events.

### Connection opened

```javascript
socket.onopen = () => {
    console.log("Connected!");
};
```

### Message received

```javascript
socket.onmessage = (event) => {
    console.log("Server says:", event.data);
};
```

### Error

```javascript
socket.onerror = (error) => {
    console.error("WebSocket error:", error);
};
```

### Connection closed

```javascript
socket.onclose = () => {
    console.log("Disconnected");
};
```

### Send a message

```javascript
socket.send("Hello server!");
```

So the basic lifecycle is:

```text
new WebSocket()
       │
       ▼
  Connecting
       │
       ▼
     Open
       │
       ├── send()
       │
       ├── receive message
       │
       ├── error
       │
       ▼
    Closed
```

---

# 7. A complete browser example

Imagine this HTML:

```html
<!DOCTYPE html>
<html>
<head>
    <title>WebSocket Demo</title>
</head>
<body>

    <input id="messageInput" placeholder="Enter message">
    <button id="sendButton">Send</button>

    <div id="messages"></div>

    <script>
        const socket = new WebSocket("ws://localhost:8080");

        const input = document.getElementById("messageInput");
        const button = document.getElementById("sendButton");
        const messages = document.getElementById("messages");

        socket.onopen = () => {
            console.log("Connected to server");
        };

        socket.onmessage = (event) => {
            const message = document.createElement("p");
            message.textContent = event.data;

            messages.appendChild(message);
        };

        button.addEventListener("click", () => {
            socket.send(input.value);
            input.value = "";
        });

        socket.onclose = () => {
            console.log("Disconnected");
        };
    </script>

</body>
</html>
```

The flow is:

```text
User types:
"Hello"

      │
      ▼

Browser calls:

socket.send("Hello")

      │
      ▼

WebSocket connection

      │
      ▼

Server receives:
"Hello"

      │
      ▼

Server sends:
"Hello back!"

      │
      ▼

Browser receives message

      │
      ▼

socket.onmessage()
```

---

# 8. The server side

The browser cannot communicate with a WebSocket server unless something is listening on the server.

There are many WebSocket libraries.

For Node.js, one popular library is `ws`.

Conceptually:

```javascript
const WebSocket = require("ws");

const server = new WebSocket.Server({
    port: 8080
});

server.on("connection", (socket) => {

    console.log("Client connected");

    socket.on("message", (message) => {

        console.log("Client says:", message.toString());

        socket.send("Hello from server!");

    });

    socket.on("close", () => {

        console.log("Client disconnected");

    });

});
```

Now imagine:

```text
Browser A
    │
    │ "Hello"
    ▼
WebSocket Server
    │
    │ "Hello from server!"
    ▼
Browser A
```

The connection stays open.

---

# 9. The real power: Server-initiated messages

This is the part that makes WebSockets useful.

Imagine you have a chat app.

Alice and Bob are connected:

```text
Alice Browser
      │
      │ WebSocket
      │
      ▼
   Server
      ▲
      │ WebSocket
      │
Bob Browser
```

Alice sends:

```text
"Hey Bob!"
```

The server receives it.

Then the server can immediately send:

```text
"Hey Bob!"
```

to Bob.

Bob doesn't need to ask:

```text
"Do I have any new messages?"

```

The server can simply push the message.

```text
Alice
  │
  │ "Hey Bob!"
  ▼
Server
  │
  │ "Hey Bob!"
  ▼
Bob
```

That's the fundamental reason WebSockets are so useful.

---

# 10. WebSockets are not just for chat

WebSockets are useful whenever you need **real-time or near-real-time updates**.

Examples:

### Chat

```text
Alice ──> Server ──> Bob
```

### Multiplayer games

```text
Player A moves
       │
       ▼
Server
       │
       ├──> Player B
       ├──> Player C
       └──> Player D
```

### Live notifications

```text
Server
  │
  ├── "You have a new notification"
  ├── "Your order shipped"
  └── "Someone liked your post"
```

### Live dashboards

For example, monitoring:

```text
CPU: 72%
Memory: 61%
Requests: 1,204/sec
```

The server can continuously send updates.

### Collaborative editing

Think of multiple people editing the same document.

```text
User A types "Hello"
        │
        ▼
      Server
        │
        ├────> User B
        └────> User C
```

### Financial market data

Prices can update continuously:

```text
$100.20
$100.25
$100.18
$100.31
```

The server can push new values as they arrive.

---

# 11. WebSocket messages

A WebSocket message can contain text or binary data.

For example:

```text
Hello
```

or:

```json
{
    "type": "message",
    "username": "Natsu",
    "text": "Hello!"
}
```

In JavaScript:

```javascript
socket.send(JSON.stringify({
    type: "message",
    username: "Natsu",
    text: "Hello!"
}));
```

The server receives a string:

```text
"{\"type\":\"message\",\"username\":\"Natsu\",\"text\":\"Hello!\"}"
```

It parses it:

```javascript
const data = JSON.parse(message);

console.log(data.type);
console.log(data.username);
console.log(data.text);
```

This is extremely common.

Instead of sending random strings like:

```text
"Hello"
```

you define a **message protocol**.

For example:

```json
{
    "type": "chat_message",
    "payload": {
        "text": "Hello!"
    }
}
```

Another message:

```json
{
    "type": "typing",
    "payload": {
        "userId": 123
    }
}
```

Another:

```json
{
    "type": "user_joined",
    "payload": {
        "userId": 456
    }
}
```

This is how real applications often structure WebSocket communication.

---

# 12. WebSocket vs HTTP

Here's an important mental model.

HTTP is excellent for:

```text
Client:
"Give me this resource."

Server:
"Here it is."
```

WebSocket is excellent for:

```text
Client:
"Let's maintain a connection."

Server:
"Okay."

Client:
"Here's an update."

Server:
"Here's an update."

Server:
"Here's another update."

Server:
"Something just happened."

Client:
"Got it."
```

A simplified comparison:

| Feature                      | HTTP                  | WebSocket                 |
| ---------------------------- | --------------------- | ------------------------- |
| Request/response             | Yes                   | Not the primary model     |
| Persistent connection        | Usually no            | Yes                       |
| Server can initiate messages | Not normally          | Yes                       |
| Bidirectional                | Request/response      | Yes                       |
| Real-time communication      | Possible, but awkward | Excellent                 |
| Typical use                  | APIs, web pages       | Chat, games, live updates |

---

# 13. Polling vs WebSocket

Let's compare.

### Polling

```text
Client ──> "Any updates?"
Server ──> "No"

Client ──> "Any updates?"
Server ──> "No"

Client ──> "Any updates?"
Server ──> "Yes!"
```

You're constantly asking.

This can waste requests.

---

### WebSocket

```text
Client ═══════════════════ Server
             │
             │
             │ Server sends
             ▼
          "Update!"
```

No repeated asking is necessary.

---

# 14. What about Server-Sent Events?

You may also hear about **SSE**, or Server-Sent Events.

SSE is another technique for server-to-client updates.

The difference is roughly:

```text
WebSocket:

Client  <══════════>  Server

Two-way communication
```

Whereas:

```text
SSE:

Client  <══════════  Server

Server → Client
```

SSE is primarily one-way.

For example:

```text
Server
  │
  ├──> Update
  ├──> Update
  └──> Update
```

The client doesn't use the SSE connection to send messages back.

WebSockets are better when you need:

```text
Client ↔ Server
```

SSE can be a great choice when you mainly need:

```text
Server → Client
```

For example, a live feed.

---

# 15. WebSockets and REST APIs can coexist

This is important.

You don't have to choose between:

```text
REST
```

and:

```text
WebSocket
```

You can use both.

For example:

```text
                Your Application
                       │
              ┌────────┴────────┐
              │                 │
           REST API          WebSocket
              │                 │
              │                 │
       CRUD operations     Real-time events
              │                 │
              │                 │
        Create message     New message
        Get profile        Typing event
        Update profile     User online
```

You might have:

```text
GET /users/123
```

to retrieve a user's profile.

But use:

```text
WebSocket
```

for:

```text
"User 123 is now online"
```

This architecture is extremely common.

---

# 16. A practical chat architecture

Let's imagine you're building Discord-like chat.

You might have:

```text
                    Backend
                       │
          ┌────────────┴────────────┐
          │                         │
       REST API                 WebSocket
          │                         │
          │                         │
    User profiles             Chat messages
    Login                     Typing status
    Message history            Online status
    Server list                Notifications
```

When you open a chat:

```text
GET /messages/123
```

The server returns old messages.

Then:

```text
WebSocket connection
```

handles new messages.

So:

```text
HTTP
  │
  └── "Give me the history."

WebSocket
  │
  └── "Tell me whenever something happens."
```

That's a very useful architecture to remember.

---

# 17. A very important concept: WebSocket state

WebSockets are **stateful connections**.

Suppose 1,000 users are connected:

```text
User A ──┐
User B ──┤
User C ──┤
User D ──┼──> WebSocket Server
User E ──┤
   ...   │
User Z ──┘
```

The server needs to know which connection belongs to which user.

For example:

```text
User 123 → Socket A
User 456 → Socket B
User 789 → Socket C
```

Then if User 123 sends a message to User 456:

```text
User 123
   │
   │ message
   ▼
Server
   │
   │ find socket for User 456
   ▼
Socket B
   │
   ▼
User 456
```

This is why WebSocket applications often maintain connection maps.

Conceptually:

```javascript
const users = new Map();

users.set(userId, socket);
```

Then:

```javascript
const socket = users.get(userId);

socket.send(message);
```

Of course, production systems need much more robust handling than this simple example.

---

# 18. Scaling WebSockets

This is where things get more complicated.

Imagine you have two servers:

```text
              Load Balancer
               /          \
              /            \
             ▼              ▼
         Server A        Server B
             │              │
          Alice            Bob
```

Alice connects to Server A.

Bob connects to Server B.

Now Alice sends Bob a message.

```text
Alice
  │
  ▼
Server A
  │
  X
```

Server A doesn't necessarily have Bob's WebSocket connection.

Bob is connected to Server B.

So you need some mechanism for servers to communicate.

Often, architectures use something like:

```text
              Redis Pub/Sub
             /             \
            ▼               ▼
        Server A         Server B
            │               │
         Alice             Bob
```

Alice sends:

```text
"Hello Bob"
```

Server A publishes an event:

```text
channel: user:456
message: Hello Bob
```

Server B receives it and sends it to Bob.

This is where WebSockets become a distributed-systems problem.

At small scale:

```text
Browser
   │
   ▼
One WebSocket server
```

Easy.

At large scale:

```text
Users
  │
  ▼
Load Balancer
  │
  ├──> WebSocket Server A
  ├──> WebSocket Server B
  ├──> WebSocket Server C
  └──> WebSocket Server D
           │
           ▼
      Message Broker
           │
           ▼
        Database
```

Now you have to think about:

* connection routing
* authentication
* reconnection
* message delivery
* duplicate messages
* ordering
* server failures
* horizontal scaling
* load balancing
* presence tracking

This is where real-world WebSocket engineering gets interesting.

---

# 19. WebSockets don't magically guarantee message delivery

This is a subtle but important point.

Suppose:

```text
Client ──> Server
```

You call:

```javascript
socket.send("Hello");
```

That does **not automatically mean**:

> "The message has been permanently stored in the database and the recipient definitely received it."

Those are different guarantees.

You might need an application-level system like:

```text
Client
  │
  │ Message ID: 123
  ▼
Server
  │
  ├── Save message
  │
  ├── Send to recipient
  │
  └── Send acknowledgment
  │
  ▼
Client
```

For example:

```json
{
    "type": "message_ack",
    "messageId": 123
}
```

If you need guaranteed delivery, you build that behavior into your application protocol.

---

# 20. Reconnection

The internet is unreliable.

Your user might:

* lose Wi-Fi
* switch from Wi-Fi to mobile data
* put their laptop to sleep
* enter a tunnel
* lose network connectivity

So this:

```text
Client ═════════ Server
```

can suddenly become:

```text
Client       Server
   X
Connection lost
```

A good WebSocket client typically reconnects.

Conceptually:

```text
Connect
   │
   ▼
Connected
   │
   ▼
Connection lost
   │
   ▼
Wait
   │
   ▼
Reconnect
   │
   ▼
Connected
```

Often you use **exponential backoff**:

```text
Wait 1 second
Wait 2 seconds
Wait 4 seconds
Wait 8 seconds
Wait 16 seconds
```

This prevents thousands of clients from hammering your server simultaneously after an outage.

---

# 21. Authentication

A WebSocket connection needs authentication too.

For example:

```text
Browser
   │
   │ Connect
   │
   ▼
WebSocket Server
   │
   │ Authenticate
   ▼
Connection accepted
```

The server needs to know:

> "Who is this user?"

Authentication can involve cookies, tokens, or other mechanisms depending on your architecture.

After authentication:

```text
User 123
    │
    ▼
WebSocket Connection A
```

The server associates the connection with the authenticated user.

Then the server can enforce permissions:

```text
User 123
   │
   ├── Can send to Room A
   └── Cannot access Room B
```

Never assume that because a client is connected, it is automatically authorized to perform every action.

---

# 22. WebSocket connection vs WebSocket message

This distinction is very important.

A **connection** is the persistent communication channel:

```text
Client ═══════════════ Server
```

A **message** is something sent over that channel:

```text
"Hello"
```

You might have:

```text
1 connection

100,000 messages
```

The connection stays alive while many messages travel through it.

Think of it like a phone call:

```text
Connection = Phone call
Message    = Something you say during the call
```

You don't create a new phone call every time you say a sentence.

Similarly, you don't create a new WebSocket connection for every message.

---

# 23. WebSocket frames

Under the hood, WebSocket communication is organized into **frames**.

You don't usually need to manually manipulate frames when building an application.

The browser and WebSocket library handle this for you.

Conceptually:

```text
WebSocket Message
       │
       ▼
    Frames
       │
       ▼
Network
```

There are different frame types, including:

* Text
* Binary
* Ping
* Pong
* Close

The ping/pong mechanism helps with connection health.

Conceptually:

```text
Server ── Ping ──> Client
Server <── Pong ── Client
```

This can help detect whether the connection is still alive.

---

# 24. A mental model you should remember

If you remember only one diagram, remember this:

```text
                    HTTP

Client ─────── Request ───────> Server
Client <────── Response ────── Server


                  WebSocket

Client ═══════════════════════ Server
   ↑                              ↑
   │                              │
   │         Messages             │
   │                              │
   └──────────────┬───────────────┘
                  │
        Both can send anytime
```

HTTP:

> "I ask, you answer."

WebSocket:

> "Let's keep a communication channel open."

---

# 25. When should you use WebSockets?

Use WebSockets when you have a genuine need for **continuous, bidirectional, low-latency communication**.

Good examples:

```text
✓ Chat applications
✓ Multiplayer games
✓ Collaborative editing
✓ Live notifications
✓ Real-time dashboards
✓ Live operational monitoring
✓ Interactive applications
```

You probably don't need WebSockets for:

```text
✗ Simple CRUD APIs
✗ Static websites
✗ Blog websites
✗ Normal form submissions
✗ Fetching a user's profile
✗ One-time API requests
```

For these, normal HTTP is usually simpler.

---

# 26. Your learning path

Since you're a software engineer, I recommend learning WebSockets in this order:

```text
1. HTTP basics
       │
       ▼
2. Request / Response
       │
       ▼
3. TCP basics
       │
       ▼
4. WebSocket handshake
       │
       ▼
5. WebSocket client API
       │
       ▼
6. WebSocket server
       │
       ▼
7. JSON message protocols
       │
       ▼
8. Authentication
       │
       ▼
9. Reconnection
       │
       ▼
10. Heartbeats / Ping / Pong
       │
       ▼
11. Rooms and broadcasting
       │
       ▼
12. Scaling with multiple servers
       │
       ▼
13. Redis / message brokers
       │
       ▼
14. Delivery guarantees
       │
       ▼
15. Production architecture
```

---

# 27. The best beginner project

I strongly recommend building a **real-time chat application**.

Start with:

```text
Browser A
    │
    │ WebSocket
    ▼
Node.js Server
    ▲
    │ WebSocket
    │
Browser B
```

Implement:

### Step 1

Connect the browser.

```javascript
const socket = new WebSocket("ws://localhost:8080");
```

### Step 2

Send a message.

```javascript
socket.send("Hello");
```

### Step 3

Receive a message.

```javascript
socket.onmessage = (event) => {
    console.log(event.data);
};
```

### Step 4

Broadcast messages.

```text
Alice ──> Server ──> Bob
```

### Step 5

Add usernames.

```json
{
    "type": "chat",
    "username": "Alice",
    "message": "Hello!"
}
```

### Step 6

Add rooms.

```text
Room A
 ├── Alice
 ├── Bob
 └── Charlie

Room B
 ├── Dave
 └── Eve
```

### Step 7

Add authentication.

### Step 8

Add reconnection.

### Step 9

Add message persistence.

### Step 10

Scale it across multiple server instances.

By the time you finish that, you will understand WebSockets much more deeply than by just reading theory.

---

# The one-sentence definition

**A WebSocket is a protocol that establishes a persistent connection between a client and server, allowing both sides to send messages to each other at any time over that connection.**

The mental progression I would use is:

```text
HTTP
  ↓
Request / Response
  ↓
Why polling is inefficient
  ↓
WebSocket handshake
  ↓
Persistent connection
  ↓
Bidirectional messages
  ↓
JSON message protocols
  ↓
Chat application
  ↓
Authentication + reconnection
  ↓
Scaling
```

If you want to truly master it, the **next thing I'd teach you is building a WebSocket server and client from scratch**, starting with a tiny Node.js chat app and then progressively adding **rooms, broadcasting, authentication, reconnection, heartbeats, Redis, and horizontal scaling**.
