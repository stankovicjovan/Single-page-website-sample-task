// slick slider
$(".slider").slick({
  dots: false,
  infinite: true,
  speed: 500,
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
    navBar.style.top = "-175px";
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

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");

  // changing modal image (src is usually just url, but becouse of parcel it has to be localhost targeted to be shown in preview)
  const dataSrc = e.target.dataset.src;
  productImage.src = `http://localhost:1234/${dataSrc}`;

  let dataPrice = +e.target.dataset.price;
  productPrice.innerHTML = `${dataPrice} €`;

  // checking checkboxes price
  // changing price
  productForm.addEventListener("click", function (e) {
    let startingPrice;
    if (e.target.closest(".js-check")) {
      if (e.target.checked) {
        startingPrice = +e.target.value;
      } else {
        startingPrice = -e.target.value;
      }
      let stn = +startingPrice.toFixed(2);
      dataPrice += stn;
      productPrice.innerHTML = `${dataPrice.toFixed(2)} €`;
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

// open
for (let i = 0; i < btnsOpenModal.length; i++)
  btnsOpenModal[i].addEventListener("click", openModal);

// close
btnCloseModal.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);
btnBuyModal.addEventListener("click", closeModal);

// esc btn
document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && !modal.classList.contains("hidden")) {
    closeModal();
  }
});
