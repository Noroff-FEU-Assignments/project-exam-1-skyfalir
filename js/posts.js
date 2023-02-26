const post = document.querySelector(".posts-container");

const queryString = document.location.search;

const query = new URLSearchParams(queryString);

const blogID = query.get("id");

const apiUrl = "https://www.sanhan.one/wp-json/wp/v2/posts";

async function getBlog() {
	try {
		const res = await fetch(apiUrl + "/" + blogID + "?_embed");
		const json = await res.json();
		const altText = json._embedded["wp:featuredmedia"][0].alt_text;
		let image = "";

		if (json.featured_media && json._embedded && json._embedded["wp:featuredmedia"]) {
			image =
				json._embedded["wp:featuredmedia"][0].media_details.sizes.full.source_url;


			if (image) {
				result = post.innerHTML = `<div class="post">
								<h1>${json.title.rendered}</h1>
								<img class="image" src="${image}" alt="${altText}" />
								<div class="content">
								<p>${json.content.rendered}</p>
								</div>
								</div>`;
				result = document.title = `The Jazz | ${json.title.rendered}`;
			}
		} else {
			result = post.innerHTML = `<div class="post">
			  <h1>${json.title.rendered}</h1>
			  <img src="https://via.placeholder.com/300x200?text=No+Image" alt="placeholder image"></img>
			  <p>${json.content.rendered}</p>
			</div>`;
			result = document.title = `The Jazz | ${json.title.rendered}`;
		}

		setupModal();
	} catch (err) {
		console.error(err);
		return (post.innerHTML = `<div class="error">'error', <br> ${err}</div>`);
	}
}

function setupModal() {
	try {
		const modal = document.querySelector(".modal");
		const closeBtn = document.querySelector(".close");
		const postImg = document.querySelector(".image");
		const modalimg = document.querySelector(".modal-img");

		postImg.addEventListener("click", () => {
			modal.style.display = "block";
			modalimg.src = postImg.src;
			modalimg.alt = postImg.alt;
		});

		closeBtn.onclick = function () {
			modal.style.display = "none";
		};

		modal.addEventListener("click", (event) => {
			if (event.target === modal) {
				modal.style.display = "none";
			}
		});
	} catch (err) {
		console.error(err);
	}
}

getBlog();
