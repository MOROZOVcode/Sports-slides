const containerNode = document.querySelector(".container");
const upBtnNode = document.querySelector(".up-button");
const downBtnNode = document.querySelector(".down-button");
const sidebarNode = document.querySelector(".sidebar");
const mainSlideNode = document.querySelector(".main-slide");

const slidesInSidebarNode = mainSlideNode.querySelectorAll("div");
const countSlides = slidesInSidebarNode.length;

let activeSlideIndex = 0;

sidebarNode.style.top = calсHeightSidebar();

upBtnNode.addEventListener("click", () => {
	changeSlide("up");
});
downBtnNode.addEventListener("click", () => {
	changeSlide("down");
});

function calсHeightSidebar() {
	const viewportHeight = 100;
	const prepareCount = countSlides - 1;
	const heightSidebar = prepareCount * viewportHeight;

	return `-${heightSidebar}vh`;
}

function changeSlide(direction) {
	if (direction === "up") {
		activeSlideIndex++;
		if (activeSlideIndex === countSlides) {
			activeSlideIndex = 0;
		}
		console.log("up");
	} else if (direction === "down") {
		activeSlideIndex--;
		if (activeSlideIndex < 0) {
			activeSlideIndex = countSlides - 1;
		}
		console.log("down");
	}

	const heightContainer = containerNode.clientHeight;

	mainSlideNode.style.transform = `translateY(-${offsetSlides()}px)`;
	sidebarNode.style.transform = `translateY(${offsetSlides()}px)`;

	function offsetSlides() {
		return activeSlideIndex * heightContainer;
	}
}
