---
title: "Data Structures Day 3"
date: "2026-05-30"
description: "Solved Linked List Cycle 2 using Floyd's Algorithm"
---
# Floyd's Cycle Detection Algorithm or Tortoise and Hare

 This will help us find if there is a cycle present in a linked list or a sequence.

### 🐢🐇 Key Idea

Use two pointers:

* **Slow pointer** → moves 1 step
* **Fast pointer** → moves 2 steps

If there is a cycle:

* They will eventually **meet inside the loop**

---

### ⏱️ Complexity

* Time: **O(n)**
* Space: **O(1)** (no extra memory)

---

### 📌 Where it's used

* Linked list cycle detection
* Finding duplicate numbers in arrays
* Functional iteration problems
