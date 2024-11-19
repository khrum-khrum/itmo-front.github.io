window.onload = function () {
  let time = performance.timing;
  let pageloadTime = time.loadEventStart - time.navigationStart;

  const footer = document.querySelector("footer");
  const loadTimeElement = document.createElement("p");
  loadTimeElement.textContent = `Page load time: ${pageloadTime.toFixed(2)} ms`;

  footer.appendChild(loadTimeElement);
};
