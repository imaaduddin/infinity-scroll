const imageContainer = document.getElementById("image-container");
const loader = document.getElementById("loader");

let read = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];


// Unsplash API 
const count = 30;
const apiKey = "tIll1mt4gQKOGrJeS993jWui_spw-BN4UZO3wjp6xRg";
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

// cheack if all images were loaded 
function imageLoaded() {
  imagesLoaded++;
  console.log(imagesLoaded);
  if (imagesLoaded === totalImages) {
    ready = true;
    loader.hidden = true;
    console.log("ready =", ready);
  }
}

// Helper Fuction to Set Attributes on DOM Elements 
function setAttributes(element, attributes) {
  for (const key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
}

// Create Elements For Links & Photos, Add To DOM
function displayPhotos() {
  imagesLoaded = 0;
  totalImages = photosArray.length;
  console.log("total images", totalImages);
  // Run function for each object in photosArray
  photosArray.forEach((photo) => {
    // Create <a> to link to Unsplash
    const item = document.createElement("a");
    setAttributes(item, {
      href: photo.links.html,
      target: "_blank",
    });
    // Create <img> for photo
    const img = document.createElement("img");
    setAttributes(img, {
      src : photo.urls.regular,
      alt: photo.alt_description,
      title: photo.alt_description,
    });
    // Eveent Listener, check when each is finished loading 
    img.addEventListener("load", imageLoaded);
    // Put <img> inside <a>, then put both isnide imageConatiner Element 
    item.appendChild(img);
    imageContainer.appendChild(item);
  });
}

// Get Photos From Unsplash API
async function getPhotos() {
  try {
    const response = await fetch(apiUrl);
    photosArray = await response.json();
    displayPhotos();
  } catch {
    // Catch Error Here
  }
}

// Check to see if scrolling near bottom of page, Load more photos 
window.addEventListener("scroll", () => {
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
    ready = false;
    getPhotos();
  }
});

// On Load 
getPhotos();