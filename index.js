//Stream Logic

const delay = seconds => {
	return new Promise(resolve => setTimeout(resolve, seconds * 1000));
};

const flickrTagSearch = tag => {
	const flickrTagSearch = (tag, page) => {
		return fetch(
			'https://www.flickr.com/services/rest/' +
				'?method=flickr.photos.search' +
				'&api_key=' +
				'4576c6ec4b241e8d36729659c07027e7' +
				'&page=' +
				page +
				'&tags=' +
				tag +
				'&format=json' +
				'&nojsoncallback=1'
		)
			.then(response => {
				return response.json();
			})
			.then(body => {
				return body.photos.photo;
			})
			.then(photos => {
				return photos.map(
					photo =>
						`https://farm${photo.farm}.staticflickr.com/` +
						`${photo.server}/${photo.id}_${photo.secret}_q.jpg`
				);
			});
	};

	return {
		[Symbol.asyncIterator]: async function* () {
			let pageIndex = 1;
			while (true) {
				const photoUrls = await flickrTagSearch(tag, pageIndex);
				for (const url of photoUrls) {
					await delay(2);
					yield url;
				}
				pageIndex = pageIndex + 1;
			}
		},
	};
};

//IMPURE

//DOM Interaction Stream
const searchTerm = document.getElementById('search-term');
const searchButton = document.getElementById('search-button');
const streamImage = document.getElementById('stream-image');

//handle click
searchButton.addEventListener('click', async () => {
	const stream = flickrTagSearch(searchTerm.value);
	for await (const url of stream) {
		streamImage.src = url;
	}
});

//DOM Interaction read more
const descriptions = document.getElementsByClassName('project-description');
const readMore = document.getElementsByClassName('leer-mas');

const readMoreShow = (description, readMoreText) => {
	let readLess = description.classList.toggle('expand-description');
	readLess
		? (readMoreText.innerHTML = 'Leer menos')
		: (readMoreText.innerHTML = 'Leer mas');
};

for (let i = 0; i < descriptions.length; i++) {
	readMore[i].addEventListener('click', () => {
		readMoreShow(descriptions[i], readMore[i]);
	});
}
