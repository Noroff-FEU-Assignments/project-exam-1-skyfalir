const carousel = document.querySelector(".carousel");
const carouselInner = document.querySelector(".carousel-inner");
const prevButton = document.querySelector(".prev-button");
const nextButton = document.querySelector(".next-button");
const apiUrl = "https://www.sanhan.one/wp-json/wp/v2/posts?_embed";
const numPosts = 12;
let numVisible = 4;
let currentPosition = 0;
let posts = [];

async function getPosts() {
	try {
		const response = await fetch(apiUrl);
		posts = await response.json();
		createSlides();
	} catch (error) {
		console.log(error);
	}
}

function createSlides() {
	if (window.innerWidth <= 600) {
		numVisible = 1;
	}

	const slicedPosts = posts.slice(currentPosition, currentPosition + numVisible);

	carouselInner.innerHTML = "";

	slicedPosts.forEach((post) => {
		const carouselItem = document.createElement("div");
		carouselItem.classList.add("carousel-item");
		carouselItem.addEventListener("click", () => {
			window.location.href = `posts.html?id=${postId}`;
		});

		const image = post._embedded["wp:featuredmedia"][0].source_url;
		const caption = post.title.rendered;
		const postId = post.id;
		const altText = post._embedded["wp:featuredmedia"][0].alt_text;
		const carouselImage = document.createElement("img");
		carouselImage.src = image;
		carouselImage.alt = altText;
		carouselImage.classList.add("carousel-image");

		const carouselCaption = document.createElement("div");
		carouselCaption.classList.add("carousel-caption");
		carouselCaption.innerHTML = `<h3>${caption}</h3>`;

		carouselItem.appendChild(carouselImage);
		carouselItem.appendChild(carouselCaption);
		carouselInner.appendChild(carouselItem);
	});

	carouselInner.style.width = `${numPosts * 25}%`;
}

prevButton.addEventListener("click", () => {
	if (currentPosition > 0) {
		currentPosition -= numVisible;
		createSlides();
	}
});

nextButton.addEventListener("click", () => {
	if (currentPosition < numPosts - numVisible) {
		currentPosition += numVisible;
		createSlides();
	}
});

getPosts();
