---
title: "Network Fundamentals GPT Day 1"
date: "2026-05-28"
description: "Networking"
---
Nitheesh Prahalath, here’s a focused, interview-oriented revision guide for core networking fundamentals that most backend, full-stack, distributed systems, and platform engineering interviews expect.

---

# 1. Big Picture — How the Internet Works

At a high level:

```text
Browser/App
   ↓
DNS resolves domain → IP
   ↓
TCP connection established
   ↓
HTTP/HTTPS request sent
   ↓
Server responds
   ↓
Connection closed or reused
```

Example:

```text
https://google.com/search?q=test
```

Flow:

1. DNS finds Google’s IP
2. TCP handshake happens
3. TLS handshake (HTTPS)
4. HTTP request sent
5. Response returned
6. Browser renders page

---

# 2. OSI vs TCP/IP Model

Interviewers LOVE this.

## OSI Model (7 Layers)

| Layer          | Purpose               | Examples   |
| -------------- | --------------------- | ---------- |
| 7 Application  | User-facing protocols | HTTP, DNS  |
| 6 Presentation | Encoding/encryption   | TLS, SSL   |
| 5 Session      | Session mgmt          | WebSockets |
| 4 Transport    | Reliable delivery     | TCP, UDP   |
| 3 Network      | Routing               | IP         |
| 2 Data Link    | MAC communication     | Ethernet   |
| 1 Physical     | Hardware signals      | Cables     |

---

## TCP/IP Model (Practical Internet Model)

| Layer          | Protocols       |
| -------------- | --------------- |
| Application    | HTTP, DNS, SMTP |
| Transport      | TCP, UDP        |
| Internet       | IP              |
| Network Access | Ethernet/WiFi   |

---

# 3. IP Address Basics

## IPv4

32-bit number.

Example:

```text
192.168.1.10
```

## IPv6

128-bit.

Example:

```text
2001:0db8:85a3::8a2e:0370:7334
```

---

## Public vs Private IP

### Private ranges

```text
10.x.x.x
172.16.x.x – 172.31.x.x
192.168.x.x
```

Used inside local networks.

---

## NAT (Network Address Translation)

Router maps private IPs → public IP.

Without NAT, every device would need a public IP.

---

# 4. MAC Address

Layer 2 hardware address.

Example:

```text
00:1A:2B:3C:4D:5E
```

IP changes.
MAC usually fixed to network card.

---

# 5. Ports

IP identifies machine.
Port identifies application.

Example:

```text
192.168.1.5:8080
```

---

## Common Ports

| Port | Protocol   |
| ---- | ---------- |
| 80   | HTTP       |
| 443  | HTTPS      |
| 22   | SSH        |
| 3306 | MySQL      |
| 5432 | PostgreSQL |
| 6379 | Redis      |

---

# 6. TCP vs UDP

Most important interview topic.

---

# TCP

Connection-oriented.
Reliable.

Features:

* Ordered delivery
* Retransmission
* Error checking
* Flow control
* Congestion control

Used in:

* HTTP
* HTTPS
* Databases
* SSH

---

## TCP 3-Way Handshake

Critical interview question.

```text
Client → SYN
Server → SYN-ACK
Client → ACK
```

Connection established.

---

## Why handshake?

* Both sides agree to communicate
* Sequence numbers initialized
* Prevents stale packets

---

## TCP Connection Termination

```text
FIN → ACK
FIN → ACK
```

Usually 4-step termination.

---

# UDP

Connectionless.
Fast but unreliable.

No:

* Ordering
* Retransmission
* Delivery guarantee

Used in:

* Video streaming
* Gaming
* DNS
* VoIP

---

## TCP vs UDP Summary

| Feature   | TCP        | UDP    |
| --------- | ---------- | ------ |
| Reliable  | Yes        | No     |
| Ordered   | Yes        | No     |
| Fast      | Slower     | Faster |
| Handshake | Yes        | No     |
| Streaming | Less ideal | Better |

---

# 7. DNS (Domain Name System)

DNS converts domain → IP.

Example:

```text
google.com → 142.250.x.x
```

---

## DNS Resolution Flow

```text
Browser cache
↓
OS cache
↓
Router cache
↓
ISP DNS
↓
Root server
↓
TLD server (.com)
↓
Authoritative DNS
```

---

## Common DNS Records

| Record | Purpose        |
| ------ | -------------- |
| A      | Domain → IPv4 |
| AAAA   | Domain → IPv6 |
| CNAME  | Alias          |
| MX     | Mail server    |
| TXT    | Metadata       |

---

## DNS Uses UDP or TCP?

Usually UDP port 53.
TCP used for:

* Zone transfers
* Large responses

Interview favorite.

---

# 8. HTTP Fundamentals

HyperText Transfer Protocol.

Stateless request-response protocol.

---

# Structure of HTTP Request

```http
GET /users HTTP/1.1
Host: api.example.com
Authorization: Bearer token
```

---

# Structure of HTTP Response

```http
HTTP/1.1 200 OK
Content-Type: application/json
```

---

# HTTP Methods

| Method | Purpose        |
| ------ | -------------- |
| GET    | Fetch data     |
| POST   | Create         |
| PUT    | Replace        |
| PATCH  | Partial update |
| DELETE | Remove         |

---

# Idempotency

Huge interview topic.

## Idempotent

Multiple identical requests = same result.

Examples:

* GET
* PUT
* DELETE

---

## Non-idempotent

* POST

---

# HTTP Status Codes

## 2xx Success

| Code | Meaning    |
| ---- | ---------- |
| 200  | OK         |
| 201  | Created    |
| 204  | No Content |

---

## 3xx Redirect

| Code | Meaning   |
| ---- | --------- |
| 301  | Permanent |
| 302  | Temporary |

---

## 4xx Client Error

| Code | Meaning      |
| ---- | ------------ |
| 400  | Bad Request  |
| 401  | Unauthorized |
| 403  | Forbidden    |
| 404  | Not Found    |
| 429  | Rate Limited |

---

## 5xx Server Error

| Code | Meaning             |
| ---- | ------------------- |
| 500  | Internal Error      |
| 502  | Bad Gateway         |
| 503  | Service Unavailable |

---

# HTTP Headers

Examples:

```http
Authorization
Content-Type
Cookie
Cache-Control
User-Agent
```

---

# Cookies vs Sessions vs JWT

## Cookies

Stored in browser.

---

## Session

Server stores session data.

Browser stores session ID.

---

## JWT

Token contains encoded user info.

Stateless authentication.

---

# 9. HTTPS & TLS

HTTPS = HTTP + TLS/SSL.

Purpose:

* Encryption
* Integrity
* Authentication

---

# TLS Handshake (Simplified)

1. Client hello
2. Server certificate
3. Key exchange
4. Session key created
5. Encrypted communication

---

# Symmetric vs Asymmetric Encryption

## Symmetric

Same key encrypt/decrypt.

Fast.

Example:
AES

---

## Asymmetric

Public/private keys.

Example:
RSA

Used during TLS handshake.

---

# 10. REST API Fundamentals

REST = architectural style.

---

# REST Principles

## Stateless

Each request independent.

---

## Resource-based

```text
/users/10
/orders/5
```

---

## Uses HTTP methods properly

```text
GET /users
POST /users
DELETE /users/1
```

---

# Good REST Design

## Use nouns, not verbs

Good:

```text
GET /users
```

Bad:

```text
GET /getUsers
```

---

# Pagination

```text
GET /users?page=2&limit=20
```

---

# Filtering

```text
GET /products?category=books
```

---

# Versioning

```text
/api/v1/users
```

---

# REST vs SOAP

| REST        | SOAP    |
| ----------- | ------- |
| Lightweight | Heavy   |
| JSON        | XML     |
| Faster      | Verbose |

---

# REST vs GraphQL

| REST                  | GraphQL           |
| --------------------- | ----------------- |
| Multiple endpoints    | Single endpoint   |
| Fixed response        | Flexible response |
| Overfetching possible | Exact data        |

---

# 11. WebSockets

HTTP is request-response.

WebSocket enables full-duplex persistent communication.

---

# Why WebSockets?

Real-time communication:

* Chat apps
* Multiplayer games
* Stock prices
* Notifications

---

# Flow

```text
HTTP Upgrade Request
↓
Connection upgraded
↓
Persistent socket connection
```

---

# WebSocket vs HTTP

| Feature       | HTTP        | WebSocket  |
| ------------- | ----------- | ---------- |
| Connection    | Short-lived | Persistent |
| Real-time     | Poor        | Excellent  |
| Bidirectional | No          | Yes        |

---

# 12. Caching

Major backend topic.

---

# Types

## Browser Cache

Client-side.

---

## CDN Cache

Edge servers.

Example:
Cloudflare

---

## Server Cache

Redis/Memcached.

---

# Cache Headers

```http
Cache-Control
ETag
Expires
```

---

# 13. Load Balancing

Distributes traffic across servers.

---

## Algorithms

| Algorithm         | Meaning                  |
| ----------------- | ------------------------ |
| Round Robin       | Rotate requests          |
| Least Connections | Least busy server        |
| IP Hash           | Same user → same server |

---

# 14. Reverse Proxy

Client thinks it talks to one server.

Proxy forwards internally.

Examples:

* Nginx
* HAProxy

Uses:

* SSL termination
* Load balancing
* Caching

---

# 15. Important Interview Topics

You should deeply understand:

---

## Must Know Extremely Well

### TCP Handshake

```text
SYN → SYN-ACK → ACK
```

---

### HTTP Request Lifecycle

Browser → DNS → TCP → TLS → HTTP → Response

---

### HTTP vs HTTPS

Encryption via TLS.

---

### TCP vs UDP

Reliability vs speed.

---

### REST Principles

Stateless resource-oriented APIs.

---

### WebSockets

Persistent bidirectional communication.

---

### DNS Resolution

Domain → IP lookup chain.

---

# 16. Frequently Asked Interview Questions

## Explain what happens when you type google.com in browser.

Classic question.

Expected flow:

1. Browser cache
2. DNS lookup
3. TCP handshake
4. TLS handshake
5. HTTP request
6. Load balancer
7. App server
8. DB/cache
9. Response returned

---

## Why is TCP reliable?

* ACKs
* Retransmission
* Sequence numbers
* Flow control

---

## Why use UDP?

Lower latency.
No connection overhead.

---

## Difference between PUT and PATCH?

PUT:
Replace full resource.

PATCH:
Partial update.

---

## Difference between 401 and 403?

401:
Not authenticated.

403:
Authenticated but forbidden.

---

## Why WebSocket instead of polling?

Polling repeatedly makes HTTP requests.
WebSocket keeps one persistent connection.

---

# 17. Networking Tools You Should Know

## Ping

Check reachability.

```bash
ping google.com
```

---

## traceroute / tracert

Shows packet route.

---

## nslookup / dig

DNS lookup.

```bash
nslookup google.com
```

---

## netstat

Connections and ports.

---

## curl

HTTP requests.

```bash
curl https://api.github.com
```

---

# 18. Backend/System Design Connection

Networking is heavily used in:

* Microservices
* APIs
* Load balancing
* Reverse proxies
* CDNs
* Distributed systems
* Kubernetes
* Service mesh

---

# 19. Best Revision Strategy for Interviews

## Phase 1 — Core Concepts

Master:

* TCP/IP
* DNS
* HTTP
* HTTPS
* REST
* WebSockets

---

## Phase 2 — Practical

Use:

* curl
* Postman
* browser devtools
* Wireshark

---

## Phase 3 — System Design

Connect networking concepts with:

* scaling
* caching
* load balancing
* microservices

---

# 20. Strong Practical Questions To Practice

1. Explain browser request lifecycle.
2. Design chat system using WebSockets.
3. Why HTTPS is secure.
4. How DNS works internally.
5. How load balancer works.
6. Why TCP retransmits packets.
7. REST API best practices.
8. Long polling vs WebSocket vs SSE.
9. CDN request flow.
10. Reverse proxy vs forward proxy.

---

# Recommended Learning Resources

## Official Docs

* [MDN Web Docs](https://developer.mozilla.org?utm_source=chatgpt.com)
* [HTTP RFCs](https://httpwg.org/specs/?utm_source=chatgpt.com)
* [Cloudflare Learning Center](https://www.cloudflare.com/learning/?utm_source=chatgpt.com)

## Practice

* [Postman](https://www.postman.com?utm_source=chatgpt.com)
* [Wireshark](https://www.wireshark.org?utm_source=chatgpt.com)

## Deep Understanding

* [Computer Networking: A Top-Down Approach](https://gaia.cs.umass.edu/kurose_ross/index.php?utm_source=chatgpt.com)

If you want, next I can also give:

1. Complete networking interview questions with answers
2. Networking cheatsheet PDF-style notes
3. Real-world backend networking examples
4. HTTP/2 and HTTP/3 explained
5. Deep dive into TLS/SSL
6. CDN + Load Balancer + Reverse Proxy architecture
7. WebSocket vs SSE vs Polling
8. Network protocols every backend engineer should know
9. Kubernetes networking basics
10. Microservices networking and API gateway concepts
