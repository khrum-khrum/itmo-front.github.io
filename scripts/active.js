document.addEventListener("DOMContentLoaded", function () {
  const currentPath = document.location.pathname;
  var menuItems = document.querySelectorAll(".topics .list-elem a");
  console.log("current path: ", currentPath)

  menuItems.forEach((item) => {
    console.log("item: ", item)
    const itemPath = item.href.replace(document.location.origin, "");
    if (itemPath === currentPath) {
      item.classList.add("active");
    } else {
      item.classList.remove("active");
    }
  });
});
