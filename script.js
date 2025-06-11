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

// Dropdown toggle logic (all closed by default)
document.querySelectorAll('.dropdown-menu').forEach(menu => {
  menu.style.display = 'none';
});
document.querySelectorAll('.dropdown-toggle').forEach(btn => {
  btn.addEventListener('click', function(e) {
    e.stopPropagation();
    document.querySelectorAll('.dropdown-menu').forEach(menu => {
      if (menu !== btn.nextElementSibling) menu.style.display = 'none';
    });
    const menu = btn.nextElementSibling;
    menu.style.display = (menu.style.display === 'block') ? 'none' : 'block';
  });
});
document.addEventListener('click', () => {
  document.querySelectorAll('.dropdown-menu').forEach(menu => menu.style.display = 'none');
});

// Tab switching logic
const tabCards = document.getElementById('tab-cards');
const tabTable = document.getElementById('tab-table');
const resultsCards = document.getElementById('results-cards');
const resultsTable = document.getElementById('results-table');

function showResults(showCards) {
    // Remove show/hide classes
    resultsCards.classList.remove("show", "hide");
    resultsTable.classList.remove("show", "hide");

    if (showCards) {
      resultsTable.classList.add("hide");
      setTimeout(() => {
        resultsTable.style.display = "none";
        resultsCards.style.display = "";
        resultsCards.classList.add("show");
      }, 300);
    } else {
      resultsCards.classList.add("hide");
      setTimeout(() => {
        resultsCards.style.display = "none";
        resultsTable.style.display = "";
        resultsTable.classList.add("show");
      }, 300);
    }
  }

tabCards.addEventListener('click', function(e) {
  e.preventDefault();
  if (!tabCards.classList.contains("active")) {
    tabCards.classList.add("active");
    tabTable.classList.remove("active");
    showResults(true);
  }
});
tabTable.addEventListener('click', function(e) {
  e.preventDefault();
  if (!tabTable.classList.contains("active")) {
    tabTable.classList.add("active");
    tabCards.classList.remove("active");
    showResults(false);
  }
});

// 초기 상태
resultsCards.classList.add("show");
resultsTable.style.display = "none";

// 밑줄 이동 로직 추가
document.addEventListener("DOMContentLoaded", function () {
  const tabCards = document.getElementById("tab-cards");
  const tabTable = document.getElementById("tab-table");
  const underline = document.getElementById("view-toggle-underline");

  function moveUnderline() {
    const activeTab = document.querySelector(".view-tab.active");
    if (activeTab && underline) {
      const parentRect = activeTab.parentElement.getBoundingClientRect();
      const tabRect = activeTab.getBoundingClientRect();
      underline.style.width = tabRect.width + "px";
      underline.style.transform = `translateX(${tabRect.left - parentRect.left}px)`;
    }
  }

  tabCards.addEventListener("click", function (e) {
    e.preventDefault();
    if (!tabCards.classList.contains("active")) {
      tabCards.classList.add("active");
      tabTable.classList.remove("active");
      showResults(true);
    }
    setTimeout(moveUnderline, 10);
  });

  tabTable.addEventListener("click", function (e) {
    e.preventDefault();
    if (!tabTable.classList.contains("active")) {
      tabTable.classList.add("active");
      tabCards.classList.remove("active");
      showResults(false);
    }
    setTimeout(moveUnderline, 10);
  });

  // 초기 위치 설정
  moveUnderline();

  // 창 크기 변경 시 underline 위치 재조정
  window.addEventListener("resize", moveUnderline);
});