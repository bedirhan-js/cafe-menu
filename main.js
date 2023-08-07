import { menu, buttonsData } from "./db.js";
import { calculatePrice } from "./helpers.js";

const cardContainer = document.getElementById("container");
const buttonsArea = document.querySelector(".button-area");

document.addEventListener("DOMContentLoaded", () => {
  renderMenuItems(menu);
  renderButtons("all");
});

buttonsArea.addEventListener("click", searchCategory);

function renderMenuItems(items) {
  // dizideki her bir obje için
  // bir elemanını temsil eden html oluştur
  // bu html'i bir diziye aktar
  // stringe çevir
  let menuHtml = items.map((item) => {
    return `
    <div class="card">
    <div class="card-image">
     <a href="/productDetail.html?id=${item.id}" > <img
        src=${item.img}
        alt="${item.title}"
      />
      </a>
    </div>
    <div class="card-header">
      <p>${item.title}</p>
      <button class="icon-button">$ ${calculatePrice(item.price)}</button>
    </div>
    <div class="card-footer">
      <div class="card-meta">
      ${item.desc}    
       </div>
    </div>
  </div>
    `;
  });

  // diziyi stringe çevir
  menuHtml = menuHtml.join(" ");

  // oluşturduğumuz html'i ekrana bas
  cardContainer.innerHTML = menuHtml;
}

function searchCategory(e) {
  const category = e.target.dataset.category;

  // tüm dizi elemalarından yalnızca kategori değeri
  // butonun kategori değeriyle eşleşenleri getir
  const filtredMenu = menu.filter((item) => item.category === category);

  // hepsi seçilirse bütün menüyü ekrana bas
  if (category === "all") {
    renderMenuItems(menu);
  } else {
    // filtrelenmiş diziyi ekrana basma
    renderMenuItems(filtredMenu);
  }

  // butonları güncelle
  renderButtons(category);
}

function renderButtons(active) {
  //* eski butonları kaldırma
  buttonsArea.innerHTML = " ";

  //* yeni butonları oluşturma
  buttonsData.forEach((btn) => {
    // html butonu oluştur
    const buttonEle = document.createElement("button");

    // gerekli class'ları verme
    buttonEle.className = "buton-stil";

    // içeriswindeki yazıyı değiştirme
    buttonEle.innerText = btn.text;

    // hangi kategori olduğu bilgisini buton elementine ekleme
    buttonEle.dataset.category = btn.value;

    // eğerki aktif kategoriyle buton eşleşirse ona farklı class ver
    if (btn.value === active) {
      buttonEle.classList.add("active");
    }

    // html'e gönderme
    buttonsArea.appendChild(buttonEle);
  });
}
