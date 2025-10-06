fetch("http://localhost:3000/api/events/home")
  .then(res => res.json())
  .then(events => {
    const container = document.getElementById("event-list");
    if (events.length === 0) {
      container.innerHTML = "<p>No upcoming events.</p>";
      return;
    }
    events.forEach(ev => {
      const div = document.createElement("div");
      div.className = "event-card";
      div.innerHTML = `
        <h3>${ev.name}</h3>
        <p><strong>Category:</strong> ${ev.category}</p>
        <p><strong>Location:</strong> ${ev.city}, ${ev.state}</p>
        <p><strong>Starts:</strong> ${new Date(ev.start_datetime).toLocaleString()}</p>
        <a href="detail.html?id=${ev.id}">View Details</a>
      `;
      container.appendChild(div);
    });
  })
  .catch(err => console.error(err));
