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

const heightContainer = containerNode.clientHeight;
const widthContainer = containerNode.clientWidth;

const slidesInSidebarNode = mainSlideNode.querySelectorAll("div");
const countSlides = slidesInSidebarNode.length;

let activeSlideIndex = 0;
const screenWidth = window.screen.width;

/////////////////////////////////////////////////////////////////////////

let positionX = 0;
let transform = 0;
let calc;

mainSlideNode.addEventListener("touchstart", (event) => {
	touchstart(event);
});
mainSlideNode.addEventListener("touchmove", (event) => {
	event.preventDefault();

	touchmove(event, "mainSlide");
});
mainSlideNode.addEventListener("touchend", () => {
	touchend("mainSlide");
});

sidebarNode.addEventListener("touchstart", (event) => {
	touchstart(event);
});
sidebarNode.addEventListener("touchmove", (event) => {
	event.preventDefault();

	touchmove(event, "sidebar");
});
sidebarNode.addEventListener("touchend", () => {
	touchend("sidebar");
});

function touchstart(event) {
	const touch = event.touches[0];
	positionX = touch.clientX;
}

function touchmove(event, node) {
	const touch = event.touches[0];
	let positionMoveX = touch.clientX;

	calc = positionX - positionMoveX;

	mainSlideNode.style.transform = `translateX(-${calcShift(node)}px)`;
	sidebarNode.style.transform = `translateX(${calcShift(node)}px)`;
}

function touchend(node) {
	let dirOne;
	let dirTwo;

	if (node === "mainSlide") {
		dirOne = "up";
		dirTwo = "down";
	} else if (node === "sidebar") {
		dirOne = "down";
		dirTwo = "up";
	}

	if (calc > 0) {
		changeSlide(dirOne);
	} else if (calc < 0) {
		changeSlide(dirTwo);
	}

	calc = 0;
}

function calcShift(node) {
	const widthInVW = 100;
	if (node === "mainSlide") {
		return (widthContainer / widthInVW) * calc * 2 + transform;
	} else if (node === "sidebar") {
		return -((widthContainer / widthInVW) * calc * 2 - transform);
	}
}

/////////////////////////////////////////////////////////////////////////

screenWidth > 500
	? (sidebarNode.style.top = calсHeightSidebar())
	: (sidebarNode.style.left = calсHeightSidebar());

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
	mainSlideNode.style.transform = `translateY(-${offsetSlides()}px)`;
	sidebarNode.style.transform = `translateY(${offsetSlides()}px)`;

	function offsetSlides() {
		return activeSlideIndex * heightContainer;
	}
}

function changeSlideMobile() {
	mainSlideNode.style.transform = `translateX(-${offsetSlides()}px)`;
	sidebarNode.style.transform = `translateX(${offsetSlides()}px)`;

	transform = offsetSlides();

	function offsetSlides() {
		return activeSlideIndex * widthContainer;
	}
}
