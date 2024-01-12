let container = document.getElementById("container");
let page = 1;
let flag = true;

function createCard(item) {
  // Create card container element
  const card = document.createElement("div");
  card.classList.add("card");

  // Create image element
  const image = document.createElement("img");
  image.src = item.url;
  image.alt = item.title;
  card.appendChild(image);

  // Create title element
  const title = document.createElement("h2");
  title.textContent = item.title;
  card.appendChild(title);

  return card;
}

function appendData(data) {
  data.forEach((item) => container.append(createCard(item)));
  flag = true;
}

async function fetchData(page = 1) {
  try {
    let res = await fetch(
      `https://jsonplaceholder.typicode.com/photos?_page=${page}&_limit=10`
    );
    let data = await res.json();
    //console.log(data);
    appendData(data);
  } catch (err) {
    console.log(err);
  }
}
fetchData();

window.addEventListener("scroll", () => {
  //write your code here...
  let clientHeight = document.documentElement.clientHeight;
  let scrollHeight = document.documentElement.scrollHeight;

  let scrollTop = document.documentElement.scrollTop;
  //console.log(scrollTop);
  if (scrollHeight - clientHeight <= Math.ceil(scrollTop)) {
    console.log("we reach");
    page++;

    fetchData(page);
    flag = false;
  }
});
