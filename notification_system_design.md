# Stage 1

# Notification System Design

## Base URL
`https://api.example.com/api/v1`

## Headers
```http
authorization: Bearer <JWT_TOKEN>
content-Type: application/json
```

## Notification Schema
```json
{
  "id": "id_of_notification_101",
  "userId": "user_no_1",
  "title": "infosys drive",
  "message": "congradulations you selected for round 2",
  "type": "MESSAGE",
  "isRead": false,
  "createdAt": "2026-05-16T10:00:00Z"
}
```

## Flow
1. User logs in
2. Frontend opens WebSocket connection
3. Backend pushes notifications instantly
4. UI updates notification bell in real time

# Stage 2

## Recommended Database

I recommend using postgreSQL because in this problem we dont need to deel with unstructured data so we can use postgreSQL since it is reliable ,scalable ,and supports structured data efficiently.

Advantages:
- compliance with ACID 
- Fast querying because of indexes
- JSON support by using JSONB
- nice scalability also good partitioning and replicas

---

# Database Schema

```sql
CREATE TABLE notifications (
    id UUID PRIMARY KEY,
    user_id UUID NOT NULL,
    title VARCHAR(255),
    message TEXT,
    type VARCHAR(50),
    priority VARCHAR(20),
    is_read BOOLEAN DEFAULT FALSE,
    metadata JSONB,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

# Indexes

```sql
CREATE INDEX idx_By_user_id
ON notifications(user_id);

CREATE INDEX idx_By_user_read
ON notifications(user_id, is_read);
```

---

# SQL Queries for APIs

## Create Notification

```sql
INSERT INTO notifications (
    id,
    user_id,
    title,
    message,
    type,
    priority
)
VALUES (
    gen_random_uuid(),
    'id_of_notification_501',
    'New Login',
    'Login from new device',
    'SECURITY',
    'HIGH'
);
```

---

## Fetch Notifications

```sql
SELECT *
FROM notifications
WHERE user_id = 'id_of_notification_501'
ORDER BY created_at DESC
LIMIT 10 OFFSET 0;
```

---

## Fetch Unread Notifications

```sql
SELECT *
FROM notifications
WHERE user_id = 'id_of_notification_501'
AND is_read = FALSE;
```

---

## Mark Notification as Read

```sql
UPDATE notifications
SET is_read = TRUE
WHERE id = 'id_of_notification_101';
```

---

## Delete Notification

```sql
DELETE FROM notifications
WHERE id = 'id_of_notification_101';
```

---

## Get Unread Count

```sql
SELECT COUNT(*) AS unread_count
FROM notifications
WHERE user_id = 'user_no_501'
AND is_read = FALSE;
```

---

# Problems at Large Scale

| Problem | Solution |
|---|---|
| Slow queries | Add indexes |
| Large tables | Use partitioning |
| High read traffic | Use Redis cache |
| High write traffic | Use Kafka/RabbitMQ |
| Too many WebSocket connections | Horizontal scaling |

---
# Recommended Architecture

```text
React Frontend
      ↓
Node.js + Express API
      ↓
Redis Cache
      ↓
PostgreSQL Database
      ↓
Socket.IO WebSocket Service
```

---

# Final Technology Stack

| Component | Technology |
|---|---|
| Frontend | React |
| Backend | Node.js + Express |
| Database | PostgreSQL |
| Real-Time Notifications | Socket.IO |
| Authentication | JWT |

# Stage 3

## Given Query

```sql
SELECT * FROM notifications
WHERE studentID = 1042 AND isRead = false
ORDER BY createdAt ASC;
```

---

# Is the Query Accurate?

yes ,it fetches unread notifications correctly for the student.

---

# Why is it Slow?

- Table has rows increased to 5,000,000 records 
- DB performs full table scan Without indexes
- `ORDER BY` increases our sorting cost
- `SELECT *` does work in unnecessary columns

Time complexity:
```text
O(N)
```

---

# Optimized Query

```sql
SELECT id, title, message, createdAt
FROM notifications
WHERE studentID = 1042
AND isRead = false
ORDER BY createdAt ASC;
```

---

# Best Index

```sql
CREATE INDEX idx_student_read_created
ON notifications(studentID, isRead, createdAt);
```

After indexing:
```text
O(log N)
```

---

# Should We Add Indexes on Every Column?

No.

Problems:
- it will cost More storage usage
- makes queries Slower 
- wastage of resources will happen because Unused indexes

Indexes should be used with frequently searched columns.

---

# Query for Placement Notifications in Last 7 Days

```sql
SELECT DISTINCT studentID
FROM notifications
WHERE notificationType = 'Placement'
AND createdAt >= NOW() - INTERVAL '7 days';
```

---

# Recommended Index

```sql
CREATE INDEX idx_type_created
ON notifications(notificationType, createdAt);
```
