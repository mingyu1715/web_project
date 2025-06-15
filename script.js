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

// Pagination logic: update results on page change (demo)
document.addEventListener('DOMContentLoaded', function () {
  const pageNumbers = Array.from(document.querySelectorAll('.pagination .page-number'));
  const prevBtn = document.getElementById('page-prev');
  const nextBtn = document.getElementById('page-next');
  const resultsCards = document.getElementById('results-cards');
  const resultsTable = document.getElementById('results-table');

  // Dummy data for demonstration (replace with real data in production)
  const demoData = [
    [
      {
        id: "CVE-2023-1234",
        title: "Critical Vulnerability in Network Devices",
        desc: "A critical vulnerability has been discovered in network devices from multiple vendors, allowing for remote code execution."
      },
      {
        id: "CVE-2023-2345",
        title: "Privilege Escalation in OS",
        desc: "A privilege escalation vulnerability exists in the operating system kernel."
      },
      {
        id: "CVE-2023-3456",
        title: "SQL Injection in Web App",
        desc: "SQL injection vulnerability found in the login form of a popular web application."
      }
    ],
    [
      {
        id: "CVE-2023-4567",
        title: "Remote Code Execution in Service",
        desc: "A remote code execution vulnerability in a widely used service."
      },
      {
        id: "CVE-2023-5678",
        title: "Denial of Service in API",
        desc: "A denial of service vulnerability in the API endpoint."
      },
      {
        id: "CVE-2023-6789",
        title: "Cross-Site Scripting in Portal",
        desc: "XSS vulnerability in the user portal page."
      }
    ],
    [
      {
        id: "CVE-2023-7890",
        title: "Buffer Overflow in Driver",
        desc: "Buffer overflow in device driver allows arbitrary code execution."
      },
      {
        id: "CVE-2023-8901",
        title: "Directory Traversal in FTP",
        desc: "Directory traversal vulnerability in FTP server."
      },
      {
        id: "CVE-2023-9012",
        title: "Information Disclosure in App",
        desc: "Sensitive information disclosure in application logs."
      }
    ],
    [
      {
        id: "CVE-2023-1010",
        title: "Authentication Bypass",
        desc: "Authentication bypass in admin panel."
      },
      {
        id: "CVE-2023-2020",
        title: "Insecure Deserialization",
        desc: "Insecure deserialization in backend service."
      },
      {
        id: "CVE-2023-3030",
        title: "CSRF in Payment Gateway",
        desc: "CSRF vulnerability in payment gateway."
      }
    ],
    [
      {
        id: "CVE-2023-4040",
        title: "Race Condition in Scheduler",
        desc: "Race condition in task scheduler."
      },
      {
        id: "CVE-2023-5050",
        title: "Open Redirect in Login",
        desc: "Open redirect in login endpoint."
      },
      {
        id: "CVE-2023-6060",
        title: "Weak Encryption in Storage",
        desc: "Weak encryption algorithm used in data storage."
      }
    ]
  ];

  function renderResults(pageIdx) {
    // Cards
    if (resultsCards) {
      resultsCards.innerHTML = demoData[pageIdx].map(item => `
        <a href="#" class="cve-card-link no-link-style">
          <div class="cve-card-with-image">
            <div class="cve-text">
              <p class="cve-id">${item.id}</p>
              <p class="cve-title">${item.title}</p>
              <p class="cve-description">${item.desc}</p>
            </div>
            <div class="cve-image" style='background-image: url("https://lh3.googleusercontent.com/aida-public/AB6AXuC4LnuDgjaqFkKlZ9mcyfWOCq-Rt1UYTURiLlSZVYKBtpIxTx-oFRdQGfCJ-_Dr-vRHUxZS7dRBG9TM7UiK_5UA9X17aCc7TmajRdKi94_yu5TqBPgp9-ysqx1kynp0gAhOClTikuVh10Vl4RaEpg5U_k0mRi7pxYwQMd6Lu2tzni7g6bapBvsMc1mo_VFik_d74YIDHFEAm4VL5whiz11NO6_oq1v3ikVRP9uyPj4ijrWF1WpN1UtESJcX-uFc9DDC78tFjMxBNQ");'></div>
          </div>
        </a>
      `).join('');
    }
    // Table
    if (resultsTable) {
      const tbody = resultsTable.querySelector("tbody");
      if (tbody) {
        tbody.innerHTML = demoData[pageIdx].map(item => `
          <tr>
            <td><a href="#" class="no-link-style">${item.id}</a></td>
            <td><a href="#" class="no-link-style">${item.title}</a></td>
            <td><a href="#" class="no-link-style">${item.desc}</a></td>
          </tr>
        `).join('');
      }
    }
  }

  function setActivePage(idx) {
    pageNumbers.forEach((el, i) => {
      el.classList.toggle('active', i === idx);
    });
    renderResults(idx);
  }

  pageNumbers.forEach((el, idx) => {
    el.addEventListener('click', function (e) {
      e.preventDefault();
      setActivePage(idx);
    });
  });

  if (prevBtn && nextBtn) {
    prevBtn.addEventListener('click', function (e) {
      e.preventDefault();
      const currentIdx = pageNumbers.findIndex(el => el.classList.contains('active'));
      if (currentIdx > 0) setActivePage(currentIdx - 1);
    });

    nextBtn.addEventListener('click', function (e) {
      e.preventDefault();
      const currentIdx = pageNumbers.findIndex(el => el.classList.contains('active'));
      if (currentIdx < pageNumbers.length - 1) setActivePage(currentIdx + 1);
    });
  }

  // 최초 렌더링
  setActivePage(0);

  // 필터 드롭다운 선택 시 버튼 텍스트 변경 및 해제
  document.querySelectorAll('.filter-buttons .dropdown').forEach(function(dropdown) {
    const button = dropdown.querySelector('.dropdown-toggle');
    const menu = dropdown.querySelector('.dropdown-menu');
    const defaultText = button.textContent.trim().replace(/ ▼$/, ''); // 기본 텍스트 저장

    menu.querySelectorAll('.dropdown-item').forEach(function(item) {
      item.addEventListener('click', function(e) {
        e.preventDefault();
        // 이미 선택된 아이템을 다시 클릭하면 해제
        if (item.classList.contains('selected-item')) {
          item.classList.remove('selected-item');
          button.innerHTML = defaultText + ' <span class="icon-dropdown">▼</span>';
          button.classList.remove('selected');
        } else {
          // 모든 아이템에서 선택 표시 제거
          menu.querySelectorAll('.dropdown-item').forEach(i => i.classList.remove('selected-item'));
          // 현재 선택된 아이템에 표시
          item.classList.add('selected-item');
          button.innerHTML = item.textContent + ' <span class="icon-dropdown">▼</span>';
          button.classList.add('selected');
        }
      });
    });
  });
});