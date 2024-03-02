// select element & asing them to varivale
let chooseImgBtn = document.querySelector(".choose-img");
let resetFilterBtn = document.querySelector(".reset-filter");
let saveImageBtn = document.querySelector(".save-img");
let fileInput = document.querySelector(".file-input");
let previewImage = document.querySelector(".preview-img img");
let filtersBtns = document.querySelectorAll(".filter button");
let rotateBtns = document.querySelectorAll(".rotate button");
let sliderName = document.querySelector(".slider .name");
let sliderValue = document.querySelector(".slider .value");
let sliderInput = document.querySelector(".slider input");
let brightness = 100;
let saturation = 100;
let inversion = 0;
let grayscale = 0;
let rotate = 0;
let flipHorizontal = 1;
let flipVertical = 1;

// necessary funstions
let applyFilters = () => {
  previewImage.style.transform = `rotate(${rotate}deg) scale(${flipHorizontal}, ${flipVertical})`;
  previewImage.style.filter = `brightness(${brightness}%) saturate(${saturation}%) invert(${inversion}%) grayscale(${grayscale}%)`;
};

filtersBtns.forEach((option) => {
  option.addEventListener("click", () => {
    document.querySelector(".filter .active").classList.remove("active");
    option.classList.add("active");
    sliderName.innerText = option.innerText;

    if (option.id === "brightness") {
      sliderInput.value = brightness;
      sliderValue.innerText = brightness + "%";
    } else if (option.id === "saturation") {
      sliderInput.value = saturation;
      sliderValue.innerText = saturation + "%";
    } else if (option.id === "inversion") {
      sliderInput.value = inversion;
      sliderValue.innerText = inversion + "%";
    } else {
      sliderInput.value = grayscale;
      sliderValue.innerText = grayscale + "%";
    }
  });
});

rotateBtns.forEach((option) => {
  option.addEventListener("click", function () {
    if (option.id === "left") {
      rotate -= 90;
    } else if (option.id === "right") {
      rotate += 90;
    } else if (option.id === "horizontal") {
      flipHorizontal = flipHorizontal === 1 ? -1 : 1;
    } else {
      flipVertical = flipVertical === 1 ? -1 : 1;
    }
    applyFilters();
  });
});

// event listener functions
let loadImage = (e) => {
  let file = e.target.files[0];
  let imageUrl = URL.createObjectURL(file);
  previewImage.src = imageUrl;

  previewImage.addEventListener("load", () => {
    document.querySelector(".container").classList.remove("disable");
  });
};

let updateSlider = () => {
  sliderValue.innerText = sliderInput.value + "%";
  let selectFilters = document.querySelector(".filter .active");

  if (selectFilters.id === "brightness") {
    brightness = sliderInput.value;
  } else if (selectFilters.id === "saturation") {
    saturation = sliderInput.value;
  } else if (selectFilters.id === "inversion") {
    inversion = sliderInput.value;
  } else {
    grayscale = sliderInput.value;
  }
  applyFilters();
};

let resetFilter = () => {
  brightness = 100;
  saturation = 100;
  inversion = 0;
  grayscale = 0;
  rotate = 0;
  flipHorizontal = 1;
  flipVertical = 1;
  filtersBtns[0].click();
  applyFilters();
};

let saveImage = () => {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  canvas.width = previewImage.naturalWidth;
  canvas.height = previewImage.naturalHeight;

  ctx.filter = `brightness(${brightness}%) saturate(${saturation}%) invert(${inversion}%) grayscale(${grayscale}%)`;
  ctx.translate(canvas.width / 2, canvas.height / 2);
  if (rotate !== 0) {
    ctx.rotate((rotate * Math.PI) / 180);
  }
  ctx.scale(flipHorizontal, flipVertical);
  ctx.drawImage(
    previewImage,
    -canvas.width / 2,
    -canvas.height / 2,
    canvas.width,
    canvas.height
  );

  const link = document.createElement("a");
  link.download = "image.jpg";
  link.href = canvas.toDataURL();
  link.click();
};

// event listeners
fileInput.addEventListener("change", loadImage);
chooseImgBtn.addEventListener("click", () => fileInput.click());
sliderInput.addEventListener("input", updateSlider);
resetFilterBtn.addEventListener("click", resetFilter);
saveImageBtn.addEventListener("click", saveImage);
