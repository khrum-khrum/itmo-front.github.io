
document.addEventListener("DOMContentLoaded", () => {
  function fetchData() {
	requestCount = localStorage.getItem('requestCount');
	if (requestCount == null) {
		requestCount = 0;
	} else {
		requestCount = parseInt(requestCount) + 1;
	}

	localStorage.setItem("requestCount", requestCount);

    const preloader = document.getElementById("preloader");
    const commentsContainer = document.getElementById("comments");
    const errorContainer = document.createElement("div");
    errorContainer.id = "error";

	const commentsName = document.createElement("h1");
	commentsName.textContent = `Comments`

    preloader.style.display = "block";
    commentsContainer.innerHTML = "";
    errorContainer.innerHTML = "";

    console.log(requestCount);
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
		commentsContainer.appendChild(commentsName);
        const commentList = document.createElement("ul");
        data.forEach((comment) => {
          if (requestCount % 2 != comment.id % 2) {
            return;
          }

          const listItem = document.createElement("li");
          listItem.innerHTML = `<h2>${comment.title}:</h2> 
		  	<p class='comments-body'>${comment.body}</p>
			<p class='comments-author'>Author: ${comment.userId}</p>`;
          commentList.appendChild(listItem);
        });
        commentsContainer.appendChild(commentList);
        requestCount++;
      })
      .catch((error) => {
        errorContainer.textContent = "⚠ Что-то пошло не так";
        commentsContainer.appendChild(errorContainer);
      })
      .finally(() => {
        preloader.style.display = "none";
      });
  }

  fetchData();
});
