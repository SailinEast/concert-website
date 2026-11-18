const savedTheme = localStorage.getItem("crunchrock-theme") || "dark";
document.documentElement.setAttribute("data-theme", savedTheme);