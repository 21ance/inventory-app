//https://codepen.io/toddwebdev/pen/yExKoj
const allSlider = document.querySelectorAll(".scroll");

let isDown = false;
let startX;
let scrollLeft;

allSlider.forEach((slider) => {
	slider.addEventListener("mousedown", (e) => {
		isDown = !isDown;
		startX = e.pageX - slider.offsetLeft;
		scrollLeft = slider.scrollLeft;
	});
	slider.addEventListener("mouseleave", () => {
		isDown = false;
	});
	slider.addEventListener("mouseup", (e) => {
		isDown = !isDown;
		console.log(isDown);
	});
	slider.addEventListener("mousemove", (e) => {
		if (!isDown) return;
		e.preventDefault();
		const x = e.pageX - slider.offsetLeft;
		const walk = (x - startX) * 1;
		slider.scrollLeft = scrollLeft - walk;
	});
});
