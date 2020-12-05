const imageContainer = document.getElementById("image-container");
const loader = document.getElementById("loader");

let photosArray = [];


// Unsplash API 
const count = 10;
const apiKey = "tIll1mt4gQKOGrJeS993jWui_spw-BN4UZO3wjp6xRg";
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

// Helper Fuction to Set Attributes on DOM Elements 
function setAttributes(element, attributes) {
  for (const key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
}

// Create Elements For Links & Photos, Add To DOM
function displayPhotos() {
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

// On Load 
getPhotos();