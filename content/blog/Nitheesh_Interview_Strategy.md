# Nitheesh — Interview & Job Strategy Quick Reference

---

## YOUR IDENTITY (Repeat this until it's automatic)

> **"Backend & Edge AI Engineer. Production experience with real-time computer vision, NVIDIA Jetson edge devices, YOLOv7/TensorRT inference, FastAPI backends, and radar/GPS integration. Not a tutorial developer — I've built systems that are live."**

---

## PROJECT ANSWERS (Memorize these)

### Car Interceptor — Full Answer

**Problem:** Mobile edge-based traffic violation detection system running in real time from cameras mounted on vehicles.

**Architecture:** 3 RTSP camera streams → OpenCV frame capture → YOLOv7 inference via TensorRT on NVIDIA Jetson → violation metadata combined with 4D radar speed data + GPS coordinates → violation event generation → AWS S3 cloud sync.

**My contribution:** Backend feature development, data sync pipeline, triple-camera support, GPS geo-zone no-parking logic, data retention, frontend functionality, and production bug fixes.

**Violations detected:** Speeding, no helmet, triple riding, wrong entry, no parking, no license plate, driver on call.

**Violation event contains:** Plate number, speed, violation type, GPS coordinates, timestamp, captured GIF evidence, cloud sync status.

---

### Relay ANPR — Full Answer

**Problem:** High-security automated ANPR system for the Bengaluru Air Force Base — only capture plate when a vehicle exceeds a speed threshold.

**My solution:** Built a custom time + frame buffer in Python that retains frames with timestamps and velocity from radar. The inference engine is triggered ONLY when a vehicle breaches the speed threshold — exact millisecond precision.

**Why this matters:** Avoids false positives, reduces compute load, and ensures plates are captured at the right moment.

---

### Video Downloader — How to Explain (Once Built)

**Problem:** A backend-heavy media processing tool with async download queues.

**Architecture:** FastAPI backend → yt-dlp subprocess → FFmpeg transcoding → PostgreSQL download history → React frontend → Dockerized deployment.

**Demonstrates:** Subprocess management, async process handling, queue architecture, file streaming, media pipeline design, Linux tooling.

---

## BEHAVIORAL ANSWERS

### Tell Me About Yourself
"I'm Nitheesh — Backend & Edge AI Engineer with 1.5 years at Datacorp Traffic in Bangalore. I've built real-time traffic violation detection systems on NVIDIA Jetson edge devices — RTSP streams, YOLOv7/TensorRT inference, radar integration, FastAPI backends, cloud sync. I deployed a system at the Bengaluru Air Force Base. I'm now looking for a product-company role with stronger engineering ownership and architectural depth."

### Why Are You Switching?
"I want to work in a product-focused environment where I can own larger system components, work on scalable backend challenges, and grow technically at a faster pace. The startup environment was great for real-world exposure — I want to build on that with more structured engineering depth."

### Biggest Challenge?
Use the triple-camera synchronization or the Air Force Base buffer system:
"One challenge was synchronizing 3 simultaneous RTSP camera streams with low latency on a Jetson device. I had to architect separate threads for each camera's ingestion, inference, and event generation to prevent any stream from blocking another. Debugging threading race conditions in a real-time system with no tolerance for frame drops was a significant learning experience."

### Why Should We Hire You?
"I bring production-grade real-time systems experience that most SDE-1 candidates don't have. I've built and shipped systems that run on edge hardware, integrate radar and GPS, and sync to cloud — in real enforcement environments. I'm strong in backend, Linux, and real-time pipelines. I learn fast, communicate clearly, and I can explain my systems in depth."

### Salary Expectations?
"Based on my experience and the market rate for backend/edge AI roles in Bangalore, I'm looking for 8–12 LPA. I'm open to discussing based on the role's scope and growth trajectory."

---

## TECHNICAL QUESTIONS — CHEAT SHEET

### Python / Backend

| Question | Your Answer Direction |
|---|---|
| async vs threading | Async: single-threaded, event loop, good for I/O. Threading: multiple threads, blocked by GIL for CPU tasks. Used threading in Car Interceptor to isolate streams. |
| What is the GIL? | Global Interpreter Lock — only 1 Python thread runs at a time. For CPU-bound tasks, use multiprocessing. For I/O-bound (RTSP, network), threading still works. |
| Why FastAPI over Flask? | Async support, Pydantic validation, automatic OpenAPI docs, better performance for real-time systems. |
| How did you handle queues? | Structured input queues between threads — inference thread reads from a camera queue, event thread reads from inference output queue. |
| JWT Auth flow? | Client sends credentials → server generates signed JWT → client sends token in header → server verifies signature on each request. |

### Edge AI

| Question | Your Answer Direction |
|---|---|
| Why TensorRT? | Optimizes model for GPU inference — layer fusion, precision calibration (FP16/INT8). Significantly reduces latency on Jetson. |
| Why YOLOv7? | Best accuracy/speed tradeoff for real-time multi-class object detection at the time. |
| How did you optimize FPS? | TensorRT acceleration, threaded stream processing, batching where possible, reducing non-essential preprocessing. |
| How was radar integrated? | Radar outputs speed + position data. We correlated this with vehicle detection bounding boxes from YOLO to map speed to specific vehicles. |

### DBMS

| Question | Your Answer Direction |
|---|---|
| Indexing? | Creates data structure for faster lookups. Used on plate number, timestamp, vehicle ID columns for fast event queries. |
| ACID? | Atomicity, Consistency, Isolation, Durability — guarantees transaction reliability. |
| JOIN types? | INNER: matching rows only. LEFT: all from left, matching from right. Used LEFT JOIN for event + sync status queries. |

---

## COMPANY TARGETING QUICK LIST

**Search these keywords on LinkedIn/Wellfound:**
- Edge AI Bangalore
- Computer vision engineer Bangalore
- Video analytics startup Bangalore
- Real-time systems engineer
- Backend engineer FastAPI Bangalore
- NVIDIA Jetson developer
- Traffic AI startup
- Surveillance tech startup

**Cold message template (copy-paste ready):**
> Hi [Name], I'm a Backend & Edge AI Engineer with 1.5 years of production experience building real-time computer vision systems on NVIDIA Jetson devices (YOLOv7, TensorRT, RTSP, FastAPI, radar integration). Actively looking for SDE-1 or Edge AI roles in Bangalore. Would love to connect if [Company] has relevant openings — happy to share my resume. Thanks!

---

## WEEKLY MINIMUM NON-NEGOTIABLES

| Day | Minimum |
|---|---|
| Monday | 1 DSA problem + 20 mins DBMS |
| Tuesday | 30 mins FastAPI/Python concept |
| Wednesday | 30 mins project work |
| Thursday | 1 DSA problem |
| Friday | 15 mins speak about your projects aloud |
| Saturday | 2 DSA problems + 1 job application |
| Sunday | 1 mock interview round |

---

*Nitheesh Prahalath C S — Interview Quick Reference*
