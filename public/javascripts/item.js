const itemForm = document.querySelector("#formItem");

itemForm.addEventListener("submit", (e) => {
	const item = {
		category: document.forms["formItem"]["category"].value,
		name: document.forms["formItem"]["name"].value,
		description: document.forms["formItem"]["description"].value,
		price: Number(document.forms["formItem"]["price"].value),
		stock: Number(document.forms["formItem"]["stock"].value),
	};

	if (item.category == "select") {
		document.querySelector("#category-error").textContent =
			"Please select a category";
		e.preventDefault();
	}

	if (item.name < 4 || item.name > 100) {
		document.querySelector("#name-error").textContent =
			"Name must contain 5 - 100 characters";
		e.preventDefault();
	}

	if (item.description.length > 200) {
		document.querySelector("#description-error").textContent =
			"Description must not exceed 200 characters";
		e.preventDefault();
	}

	if (item.price < 0 || item.price > 100000) {
		document.querySelector("#price-error").textContent = "Invalid amount";
		e.preventDefault();
	}

	if (item.stock < 0 || item.stock > 999) {
		document.querySelector("#stock-error").textContent =
			"Stock must be: 0 - 999";
		e.preventDefault();
	}
});
