// slick slider
$(".slider").slick({
  dots: false,
  infinite: true,
  speed: 600,
  fade: true,
  cssEase: "linear",
  arrows: true,
});

// navigation menu interaction - navbar scroll
const navBar = document.querySelector(".navbar");
let scrollTop = window.pageYOffset;

window.addEventListener("scroll", function () {
  let st = window.pageYOffset;
  if (window.scrollY > 75 && scrollTop < st) {
    navBar.style.top = "-275px";
  } else if (scrollTop > st && window.scrollY > 76) {
    navBar.style.top = "0";
  }
  scrollTop = st;
});

// navbar navigation
const navContent = document.querySelector(".navbar__content");

navContent.addEventListener("click", function (e) {
  e.preventDefault();
  if (e.target.classList.contains("js-nav-item")) {
    const id = e.target.getAttribute("href");
    document.querySelector(id).scrollIntoView({ behavior: "smooth" });
  }
});

// modal window
const modal = document.querySelector(".js-modal");
const overlay = document.querySelector(".js-overlay");
const btnsOpenModal = document.querySelectorAll(".js-open-modal");
const btnCloseModal = document.querySelector(".js-close-modal");
const btnBuyModal = document.querySelector(".js-buy-modal");

// product modal properties
const productImage = document.querySelector(".js-product-modal");
const productPrice = document.querySelector(".js-modal-price");
const productName = document.querySelector(".js-modal-name");
const productCheckboxes = document.querySelectorAll(".js-check");
const productForm = document.querySelector(".js-form");
const productModalCard = document.querySelector(".product__modal__left");

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");

  // changing modal image (url adapted to parcel)
  const dataSrc = e.target.dataset.src;
  productImage.src = `http://localhost:1234/${dataSrc}`;

  // adding new
  if (dataSrc.includes("q7") || dataSrc.includes("a3")) {
    productModalCard.classList.add("product--new");
  } else {
    productModalCard.classList.remove("product--new");
  }

  let dataPrice = +e.target.dataset.price;
  productPrice.innerHTML = `${dataPrice} €`;

  // checking checkboxes price
  // changing price
  productForm.addEventListener("click", function (e) {
    let additionalPrice;
    if (e.target.closest(".js-check")) {
      if (e.target.checked) {
        additionalPrice = +e.target.value;
      } else {
        additionalPrice = -e.target.value;
      }
      dataPrice += additionalPrice;
      const dataPriceFixed = dataPrice.toFixed(2);
      // getting decimals
      const decimals = String(dataPriceFixed).slice(-2);

      productPrice.innerHTML = `${
        decimals !== "00" ? dataPriceFixed : Number(dataPriceFixed).toFixed(0)
      } €`;
    }
  });

  // change name
  const dataName = e.target.dataset.name;
  productName.innerHTML = dataName;
};

const closeModal = function () {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");

  // reset checkboxes
  productCheckboxes.forEach((cbox) => (cbox.checked = false));
};

// open modal
for (let i = 0; i < btnsOpenModal.length; i++)
  btnsOpenModal[i].addEventListener("click", openModal);

// close modal
btnCloseModal.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);
btnBuyModal.addEventListener("click", closeModal);

// esc btn close modal
document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && !modal.classList.contains("hidden")) {
    closeModal();
  }
});
