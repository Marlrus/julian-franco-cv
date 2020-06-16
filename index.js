const descriptions = document.getElementsByClassName('project-description');
const readMore = document.getElementsByClassName('leer-mas');

const readMoreShow = (description, readMoreText) => {
	let readLess = description.classList.toggle('expand-description');
	readLess
		? (readMoreText.innerHTML = '...Leer menos')
		: (readMoreText.innerHTML = '...Leer mas');
};

for (let i = 0; i < descriptions.length; i++) {
	readMore[i].addEventListener('click', () => {
		readMoreShow(descriptions[i], readMore[i]);
	});
}
