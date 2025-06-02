document.addEventListener("DOMContentLoaded", () => {
	const bellButton = document.getElementById("bell-button");
	const bellIcon = document.getElementById("bell-icon");
	const bellIconPath = document.querySelector("#bell-icon path"); // Select the <path> inside the bell-icon SVG
	const markReadButton = document.getElementById("mark-read");
	const notificationItems = document.querySelectorAll(".notification-item");

	// Toggle dropdown visibility
	bellButton.addEventListener("click", () => {
		const dropdown = document.getElementById("notification-dropdown");
		dropdown.style.display = dropdown.style.display === "block" ? "none" : "block";
	});

	// Mark all notifications as read
	markReadButton.addEventListener("click", () => {
		notificationItems.forEach((item) => {
			item.classList.add("read"); // Add 'read' class to change color
		});
		bellIconPath.setAttribute("fill", "white"); // Change bell icon path fill color to white
	});
});
