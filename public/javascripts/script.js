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

// create category validation
modalForm.addEventListener("submit", (e) => {
	const categoryName = document.forms["modalForm"]["name"].value;
	const categoryDescription =
		document.forms["modalForm"]["description"].value;

	if (categoryName.length === 0 || categoryName.length >= 100) {
		document.querySelector("#name-error").textContent =
			"Category must contain 3 - 100 characters";
		e.preventDefault();
	}

	if (categoryDescription.length >= 200) {
		document.querySelector("#description-error").textContent =
			"Description must not exceed 200 characters";
		e.preventDefault();
	}
});
