/* eslint-disable no-undef */
/* eslint-disable no-loop-func */
const list = document.getElementById("list");
const moreBtn = document.getElementById("moreBtn");
const tab = document.getElementsByClassName("tab");
const visibleSize = 10;

let currentActive = "recent";

// eslint-disable-next-line no-undef

// function get

// 기본 사이즈 만큼 카드를 출력하는 함수
function addSizeVisible() {
  const card = document.getElementsByClassName(`card ${currentActive}`);
  return Array.from(card)
    .slice(0, visibleSize)
    .forEach((element) => {
      element.classList.add("visible");
    });
}

// 보여지는 카드들을 전부 지우는 함수
function removeAllVisible() {
  const rCard = document.getElementsByClassName(`visible`);
  return Array.from(rCard).forEach((element) => {
    element.classList.remove("visible");
  });
}

// 탭에 소속된 이미지를 전부 보여지게 하는 함수
function addAllVisible() {
  const card = document.getElementsByClassName(`card ${currentActive}`);
  return Array.from(card).forEach((element) => {
    element.classList.add("visible");
  });
}

// 로딩 애니메이션을 보여주는 함수
function LoadAnimaiton() {
  const loading = document.getElementById("loading");
  moreBtn.style.display = "none";
  loading.classList.add("visible");
  return new Promise((resolve) =>
    setTimeout(() => {
      resolve();
      loading.classList.remove("visible");
      moreBtn.style.display = "table-cell";
    }, 1000)
  );
}

// 탭 변경 함수
async function changeTab() {
  for (n = 0; n < tab.length; n += 1) tab[n].classList.remove("active");
  await removeAllVisible();
  await LoadAnimaiton();
  addSizeVisible();
}

// 더보기를 눌럿을 때 실행되는 함수
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
      event.target.parentElement.classList.add("active");
      currentActive = event.target.title;
      changeTab(event);
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
