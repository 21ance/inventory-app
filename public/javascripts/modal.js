const modal = document.querySelector("#modal");
const modalButton = document.querySelector("#modalButton");
const modalForm = document.querySelector("#modalForm");
const modalCancel = document.querySelector("#modalCancel");

function modalToggle() {
	modal.classList.toggle("hidden");
}

modalButton.addEventListener("click", modalToggle);
modalCancel.addEventListener("click", modalToggle);
document.addEventListener("click", (e) => {
	if (e.target.id === "modal") {
		modalToggle();
	}
});
