const postsContainer = document.querySelector(".blog-container");
const loadMoreBtn = document.querySelector(".more-btn");
const loader = document.querySelector(".loader-wrapper");
let offset = 0;
const perPage = 10;

loadMoreBtn.addEventListener("click", () => {
	loadPosts();
});

async function loadPosts() {
	try {
		const response = await fetch(
			`https://www.sanhan.one/wp-json/wp/v2/posts?_embed=true&per_page=${perPage}&offset=${offset}`
		);
		const posts = await response.json();
		let result = "";
		
		for (i = 0; i < posts.length; i++) {
			console.log(posts[i].id)
			result += `
        <div class="blog-post">
          <h2>${posts[i].title.rendered}</h2>
          <img src="${posts[i]._embedded["wp:featuredmedia"][0].media_details.sizes.full.source_url}" alt="${posts[i]._embedded["wp:featuredmedia"][0].alt_text}">
          <p>${posts[i].excerpt.rendered}</p>
          <a href="posts.html?id=${posts[i].id}">Read More</a>
        </div>
      `;
		}
		postsContainer.innerHTML += result;
		offset += perPage;
		if ((loader.style.display = "contents")) {
			loader.style.display = "none";
		}

		if (posts.length < perPage) {
			loadMoreBtn.style.display = "none";
		}
	} catch (error) {
		console.error(error);
	}
}
loadPosts();
