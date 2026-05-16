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