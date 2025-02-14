function updateYear() {
  const currentYear = new Date().getFullYear();
  document.getElementById("current-year").textContent = currentYear;
}

module.exports = updateYear;
