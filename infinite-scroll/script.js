// Unsplash API
const imageContain = document.getElementById('image-contain');
const loader = document.getElementById('loader');
const initialLoad = true;

const count = 5;
const apiKey = 'nFUM00Y_KQrmh1ajplv19QPS2H7YyRQ_QRZpihyzDdM';
const url = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

let photosArray = [];
let ready = false;
let imagesLoaded = 0;
let totalImages = 0;

getPhotos();

// Get photos from Unsplash API
async function getPhotos() {
    try {
        axios.get(url)
            .then(r => {
                photosArray = r.data.data
                console.log(r.data.data)
            })
            .catch(err => console.log(err));
        displayPhotos();
    } catch (e) {
        console.error(e);
    }
}

function displayPhotos() {
    imagesLoaded = 0;
    totalImages = photosArray.length;
    photosArray.forEach(photo => {
        const item = document.createElement('a');
        setAttributes(item, {
            href: photo.links.html,
            target: '_blank'
        });

        const img = document.createElement('img');

        setAttributes(img, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description
        });
        img.addEventListener('load', imageLoaded());

        item.appendChild(img);
        imageContain.appendChild(item);
    });
}

function setAttributes(element, attributes) {
    for (const key in attributes) {
        element.setAttribute(key, attributes[key]);
    }
}

window.addEventListener('scroll', () => {
    if (window.scrollY + window.innerHeight >= document.body.offsetHeight - 1000 && ready) {
        ready = false;
        getPhotos();
    }
});

function imageLoaded() {
    imagesLoaded++;
    if (imagesLoaded === totalImages) {
        ready = loader.hidden = true;
        count = 30;
    }
}