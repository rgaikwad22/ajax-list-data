// variable for selectors declaration 
var loadData = document.querySelector(".load-more-btn"),
  initialPosts = document.querySelector(".data-list");

// global variable declaratiion 
var obj,
  loadedData = 6;

// window onload declaration
window.addEventListener("load", function () {
  fetchData();
});

// event declarations
loadData.addEventListener("click", function () {
  var appendData = '';
  endValue = loadedData + 6;
  for (i = loadedData; i < endValue && i < obj.length; i++) {
    appendData += `<li>
        <span>${ obj[i].title }</span>
        <p>${ obj[i].body }</p>
        </li>`;
  }

  loadedData += 6;
  initialPosts.innerHTML += appendData;
  if (endValue >= obj.length) {
    loadData.style.display = 'none';
  }
})

// function declaration
function fetchData() {
  var xhr = new XMLHttpRequest();

  xhr.open('GET', 'https://jsonplaceholder.typicode.com/posts', true);

  xhr.onload = function () {
    if (this.status === 200) {
      obj = JSON.parse(this.responseText);
      var appendData = '';
      for (i = 0; i < 6; i++) {
        appendData += `<li>
            <span>${ obj[i].title }</span>
            <p>${ obj[i].body }</p>
            </li>`;
      }
      initialPosts.innerHTML = appendData;
    } else {
      var li = document.createElement("li"),
        p = document.createElement("p");

      initialPosts.append(li);
      li.append(p);
      p.classList.add("error")
      p.innerHTML = "Some Error Occured!";

      loadData.disabled = true;
    }
  }

  xhr.send();
}