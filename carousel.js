const imageSource = {
  0: {
    src: "./img/sunny.jpg",
    alt: "sunny skies",
    display: "visible",
  },
  1: {
    src: "./img/rainy.jpg",
    alt: "rainy skies",
    display: "hidden",
  },
  2: {
    src: "./img/snowy.jpg",
    alt: "snowy skies",
    display: "hidden",
  },
};

let currPosition = 0;
const numOfImages = Object.keys(imageSource).length;

window.addEventListener("load", () => {
  createCarousel();
  clickArrow();
  clickDot();
  return currPosition;
});

function createCarousel() {
  const carousel = document.querySelector(".carousel");

  for (let i = 0; i < numOfImages; i++) {
    const imageContainer = document.createElement("div");
    const image = document.createElement("img");
    image.setAttribute("id", [i]);
    image.classList.add(imageSource[i].display);
    image.setAttribute("src", imageSource[i].src);
    image.setAttribute("alt", imageSource[i].alt);
    carousel.appendChild(imageContainer);
    imageContainer.appendChild(image);
  }
  return;
}

function clickArrow() {
  const arrows = document.querySelectorAll(".arrow");
  arrows.forEach((arrow) => {
    const arrowIdentifier = arrow.innerText;
    arrow.addEventListener("click", () => {
      if (arrow.innerText == "arrow_forward_ios") {
        if (currPosition + 2 > numOfImages) {
          currPosition = 0;
        } else {
          currPosition++;
        }
        updateImageVisibility(currPosition);
      } else if (arrow.innerText == "arrow_back_ios") {
        if (currPosition - 2 < 0) {
          currPosition = numOfImages - 1;
        } else {
          currPosition--;
        }
        updateImageVisibility(currPosition);
      }
    });
  });
}

function updateImageVisibility(currPosition) {
  const images = document.querySelectorAll("img");
  images.forEach((image) => {
    const position = image.getAttribute("id");
    image.classList.toggle("hidden", parseInt(position) !== currPosition);
  });
  const dots = document.querySelectorAll(".navigation-dots span");
  dots.forEach((dot) => {
    if (parseInt(dot.getAttribute("id")) === currPosition) {
      dot.innerText = "radio_button_checked";
    } else {
      dot.innerText = "radio_button_unchecked";
    }
  });
}

function clickDot() {
  const dotsContainer = document.querySelector(".navigation-dots");
  for (let i = 0; i < numOfImages; i++) {
    const dot = document.createElement("span");
    dot.setAttribute("id", i);
    if (i == 0) {
      dot.innerText = "radio_button_checked";
    } else {
      dot.innerText = "radio_button_unchecked";
    }
    dot.classList.add("material-symbols-outlined");
    dot.addEventListener("click", (e) => {
      currPosition = parseInt(e.target.id);
      updateImageVisibility(currPosition);
    });
    dotsContainer.appendChild(dot);
  }
}

for (let i = 0; i < 100; i++) {
  setTimeout(() => {
    const auto = document.getElementById("auto");
    auto?.click(); // optional chaining in case it's null
  }, i * 5000);
}
