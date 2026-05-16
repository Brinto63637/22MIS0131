import { useState } from "react";

import {
  Container,
  Card,
  CardContent,
  Typography,
  Chip,
  Button,
  Stack
} from "@mui/material";

const initialNotifications = [
  {
    id: 1,
    type: "Placement",
    message: "CSX Corporation hiring",
    unread: true
  },
  {
    id: 2,
    type: "Result",
    message: "Mid-sem results published",
    unread: false
  },
  {
    id: 3,
    type: "Event",
    message: "Tech fest starts tomorrow",
    unread: true
  }
];

function App() {

  const [notifications, setNotifications] =
    useState(initialNotifications);

  const [filter, setFilter] = useState("All");

  const markAsRead = (id) => {
    const updated = notifications.map((n) =>
      n.id === id ? { ...n, unread: false } : n
    );

    setNotifications(updated);
  };

  const filteredNotifications =
    filter === "All"
      ? notifications
      : notifications.filter(
          (n) => n.type === filter
        );

  return (
    <Container sx={{ marginTop: 4 }}>

      <Typography variant="h4" gutterBottom>
        Notification System
      </Typography>

      <Stack
        direction="row"
        spacing={2}
        sx={{ marginBottom: 3 }}
      >
        <Button
          variant="contained"
          onClick={() => setFilter("All")}
        >
          All
        </Button>

        <Button
          variant="contained"
          color="success"
          onClick={() => setFilter("Placement")}
        >
          Placement
        </Button>

        <Button
          variant="contained"
          color="primary"
          onClick={() => setFilter("Result")}
        >
          Result
        </Button>

        <Button
          variant="contained"
          color="warning"
          onClick={() => setFilter("Event")}
        >
          Event
        </Button>
      </Stack>

      {filteredNotifications.map((notification) => (

        <Card
          key={notification.id}
          sx={{
            marginBottom: 2,
            backgroundColor:
              notification.unread
                ? "#e3f2fd"
                : "#f5f5f5"
          }}
        >
          <CardContent>

            <Typography variant="h6">
              {notification.message}
            </Typography>

            <Chip
              label={notification.type}
              color={
                notification.type === "Placement"
                  ? "success"
                  : notification.type === "Result"
                  ? "primary"
                  : "warning"
              }
              sx={{ marginTop: 1 }}
            />

            <br />

            {notification.unread && (
              <Button
                variant="outlined"
                sx={{ marginTop: 2 }}
                onClick={() =>
                  markAsRead(notification.id)
                }
              >
                Mark as Read
              </Button>
            )}

          </CardContent>
        </Card>
      ))}
    </Container>
  );
}

export default App;