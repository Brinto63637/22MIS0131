

async function getNotifications() {
  try {
    const response = await fetch(
      "http://4.224.186.213/evaluation-service/notifications",
      {
        headers: {
            Authorization: `Bearer ${process.env.ACCESS_TOKEN}`
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