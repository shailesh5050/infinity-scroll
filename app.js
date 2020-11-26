let imageContainer = document.getElementById("image-container");
let loader = document.getElementById("loader");
const count = 10;
const apiKey = "mrLpesKkUEhEEfoQb252rx55Zs8HF-dHkJvBBI9oa8M";
let ready = false;
let totalImage = 0;
let imagesLoaded = 0;
const photosArray = [];
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;
//function to check images are loaded or not
function imageLoaded() {
  imagesLoaded++;
  if (imagesLoaded == totalImage) {
    ready = true;
    loader.hidden = true;
    console.log("ready = " + ready);
  }
}
//helper function to set setAttribute on the DOM
function attributeStter(element, attributes) {
  for (const key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
}
//create element for link and photos
function displayPhotos(photosArrayItem) {
  imagesLoaded = 0;
  totalImage = photosArrayItem.length;
  console.log(totalImage);
  photosArrayItem.forEach((photo) => {
    //element for unshplash links
    const item = document.createElement("a");
    attributeStter(item, {
      href: photo.links.html,
      target: "_blank",
    });
    //element for unshplash image
    const img = document.createElement("img");
    attributeStter(img, {
      src: photo.urls.regular,
      alt: photo.alt_description,
    });
    item.appendChild(img);
    imageContainer.appendChild(item);
    //event to check that image is loaded or not
    img.addEventListener("load", imageLoaded);
  });
}
async function getPhotos() {
  try {
    const response = await fetch(apiUrl);
    const photosArray = await response.json();

    displayPhotos(photosArray);
  } catch (err) {}
}

//infinity scroll
window.addEventListener("scroll", () => {
  if (
    window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 &&
    ready
  ) {
    ready = false;
    getPhotos();
  }
});

getPhotos();
