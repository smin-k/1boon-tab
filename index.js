/* eslint-disable no-undef */
/* eslint-disable no-loop-func */
const list = document.getElementById("list");
const moreBtn = document.getElementById("moreBtn");
const tab = document.getElementsByClassName("tab");
const visibleSize = 10;

let currentActive = "recent";

// eslint-disable-next-line no-undef

// function get

function addSizeVisible() {
  const card = document.getElementsByClassName(`card ${currentActive}`);
  return Array.from(card)
    .slice(0, visibleSize)
    .forEach((element) => {
      element.classList.add("visible");
    });
}

function removeAllVisible() {
  const rCard = document.getElementsByClassName(`visible`);
  return Array.from(rCard).forEach((element) => {
    element.classList.remove("visible");
  });
}

function addAllVisible() {
  const card = document.getElementsByClassName(`card ${currentActive}`);
  return Array.from(card).forEach((element) => {
    element.classList.add("visible");
  });
}

function LoadAnimaiton() {
  const loading = document.getElementById("loading");
  loading.classList.add("visible");
  return new Promise((resolve) =>
    setTimeout(() => {
      resolve();
      loading.classList.remove("visible");
    }, 1000)
  );
}

async function changeTab() {
  await removeAllVisible();
  await LoadAnimaiton();
  moreBtn.style.display = "table-cell";
  addSizeVisible();
}

async function viewAll() {
  await removeAllVisible();
  await LoadAnimaiton();
  addAllVisible();
}

function getJSONFile(filename) {
  return $.getJSON(`${filename}.json`, (data) => {
    // eslint-disable-next-line no-undef
    let html = " ";
    // eslint-disable-next-line no-undef
    $.each(data, (index, key) => {
      html += `<div onclick="location.href='${key.url}';" class="card ${filename}";>`;
      html += `<div class="img-warp"><img class="card-img-top" src="${key.img}" alt="Card image cap"></div>`;
      html += '<div class="card-body">';
      html += `<div class="card-title">${key.title}</div>`;
      html += `<div class="card-url">${key.url}</div>`;
      html += `<div class="card-cp">${key.cp}</div>`;
      html += "</div></div>";
    });
    list.innerHTML += html;
  });
}

document.addEventListener("DOMContentLoaded", async () => {
  list.innerHTML += `<div id="loading"><img src="loading.gif" alt="Card image cap"></div>`;

  for (i = 0; i < tab.length; i += 1) {
    tab[i].addEventListener("click", (event) => {
      for (n = 0; n < tab.length; n += 1) tab[n].classList.remove("active");
      event.target.parentElement.classList.add("active");
      currentActive = event.target.title;
      changeTab();
    });
  }

  moreBtn.addEventListener("click", () => {
    moreBtn.style.display = "none";
    viewAll();
  });

  await Promise.all([
    getJSONFile("recent"),
    getJSONFile("view"),
    getJSONFile("popular"),
  ]);

  changeTab();
});
