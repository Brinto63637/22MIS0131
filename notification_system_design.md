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
