const containerNode = document.querySelector(".container");
const upBtnNode = document.querySelector(".up-button");
const downBtnNode = document.querySelector(".down-button");
const sidebarNode = document.querySelector(".sidebar");
const mainSlideNode = document.querySelector(".main-slide");

for (let i = 0; i < arr.length; i++) {
	const element = arr[i];
	const text = "Movement - is Life";

	const sidebarItemNode = document.createElement("div");
	const mainSlideItemNode = document.createElement("div");

	sidebarItemNode.innerHTML = `<h1>${element.sportName}</h1> <p>${text}</p>`;
	sidebarItemNode.style.background = element.backgroundColor;

	mainSlideItemNode.style.backgroundImage = `url(${element.backgroundImage})`;

	sidebarNode.prepend(sidebarItemNode);
	mainSlideNode.append(mainSlideItemNode);
}

const slidesInSidebarNode = mainSlideNode.querySelectorAll("div");
const countSlides = slidesInSidebarNode.length;

let activeSlideIndex = 0;
const screenWidth = window.screen.width;

if (screenWidth > 500) {
	sidebarNode.style.top = calсHeightSidebar();
} else {
	sidebarNode.style.left = calсHeightSidebar();

	console.log(containerNode.clientWidth);
}

upBtnNode.addEventListener("click", () => {
	changeSlide("up");
});
downBtnNode.addEventListener("click", () => {
	changeSlide("down");
});

document.addEventListener("keydown", (event) => {
	if (event.key === "ArrowUp") {
		changeSlide("up");
	} else if (event.key === "ArrowDown") {
		changeSlide("down");
	}
});

function calсHeightSidebar() {
	const viewportHeight = 100;
	const prepareCount = countSlides - 1;
	const heightSidebar = prepareCount * viewportHeight;

	let result;
	screenWidth > 500
		? (result = `-${heightSidebar}vh`)
		: (result = `-${heightSidebar}vw`);

	return result;
}

function changeSlide(direction) {
	if (direction === "up") {
		activeSlideIndex++;
		if (activeSlideIndex === countSlides) {
			activeSlideIndex = 0;
		}
	} else if (direction === "down") {
		activeSlideIndex--;
		if (activeSlideIndex < 0) {
			activeSlideIndex = countSlides - 1;
		}
	}

	screenWidth > 500 ? changeSlideDesktop() : changeSlideMobile();
}

function changeSlideDesktop() {
	const heightContainer = containerNode.clientHeight;

	mainSlideNode.style.transform = `translateY(-${offsetSlides()}px)`;
	sidebarNode.style.transform = `translateY(${offsetSlides()}px)`;

	function offsetSlides() {
		return activeSlideIndex * heightContainer;
	}

	console.log(activeSlideIndex * heightContainer);
}

function changeSlideMobile() {
	const widthContainer = containerNode.clientWidth;

	mainSlideNode.style.transform = `translateX(-${offsetSlides()}px)`;
	sidebarNode.style.transform = `translateX(${offsetSlides()}px)`;

	function offsetSlides() {
		return activeSlideIndex * widthContainer;
	}

	console.log(activeSlideIndex * widthContainer);
}
