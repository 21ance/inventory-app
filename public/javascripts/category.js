const categoryForm = document.querySelector("#formCategory");

categoryForm.addEventListener("submit", (e) => {
	const categoryName = document.forms["formCategory"]["name"].value;
	const categoryDescription =
		document.forms["formCategory"]["description"].value;

	if (categoryName.length < 3 || categoryName.length > 100) {
		document.querySelector("#name-error").textContent =
			"Category must contain 3 - 100 characters";
		e.preventDefault();
	}

	if (categoryDescription.length > 200) {
		document.querySelector("#description-error").textContent =
			"Description must not exceed 200 characters";
		e.preventDefault();
	}
});
