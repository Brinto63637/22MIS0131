

async function getNotifications() {
  try {
    const response = await fetch(
      "http://4.224.186.213/evaluation-service/notifications",
      {
        headers: {
          Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJicmludG9qZW5pdGhAZ21haWwuY29tIiwiZXhwIjoxNzc4OTMzMzQ1LCJpYXQiOjE3Nzg5MzI0NDUsImlzcyI6IkFmZm9yZCBNZWRpY2FsIFRlY2hub2xvZ2llcyBQcml2YXRlIExpbWl0ZWQiLCJqdGkiOiI4YzJlNGM5NC1jM2IxLTQ3MmQtOTQ2NS1mOGNkNDEwMTcxZjAiLCJsb2NhbGUiOiJlbi1JTiIsIm5hbWUiOiJicmludG8gamVuaXRoIGIiLCJzdWIiOiI4YzMwNjRjYi04MWQyLTQwNGYtOGY3MC04ZDE3ZDdkZmE3MWIifSwiZW1haWwiOiJicmludG9qZW5pdGhAZ21haWwuY29tIiwibmFtZSI6ImJyaW50byBqZW5pdGggYiIsInJvbGxObyI6IjIybWlzMDEzMSIsImFjY2Vzc0NvZGUiOiJTZkZ1V2ciLCJjbGllbnRJRCI6IjhjMzA2NGNiLTgxZDItNDA0Zi04ZjcwLThkMTdkN2RmYTcxYiIsImNsaWVudFNlY3JldCI6IlVDWVFjRHpWQkNTS2RTSmUifQ.Fn6VOaVu4wqwY24Tem8GEPeovxHXL62_-u6BrdV4zZI"
        }
      }
    );

    const data = await response.json();


    console.log("\nAPI Response:\n", data);

    const notifications = data.notifications;

    if (!Array.isArray(notifications)) {
      console.log("\nNotifications array not found.");
      return;
    }

    const weights = {
      Placement: 3,
      Result: 2,
      Event: 1
    };

    notifications.forEach((notification) => {
      notification.score = weights[notification.Type] || 0;
    });

    notifications.sort((a, b) => {
      if (b.score !== a.score) {
        return b.score - a.score;
      }

      return new Date(b.Timestamp) - new Date(a.Timestamp);
    });

    const topNotifications = notifications.slice(0, 10);

    console.log("\nTop Priority Notifications:\n");

    topNotifications.forEach((notification, index) => {
      console.log(
        `${index + 1}. ${notification.Type} | ${notification.Message}`
      );
    });

  } catch (error) {
    console.log("Error:", error);
  }
}

getNotifications();