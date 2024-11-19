document.addEventListener("DOMContentLoaded", function () {
  const currentPath = document.location.pathname;
  var menuItems = document.querySelectorAll(".topics .list-elem a");

  menuItems.forEach((item) => {
    const itemPath = item.href.replace(document.location.origin, "");
    if (itemPath === currentPath) {
      item.classList.add("active");
    } else {
      item.classList.remove("active");
    }
  });
});
