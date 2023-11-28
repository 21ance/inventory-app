modalForm.addEventListener("submit", (e) => {
	const item = {
		category: document.forms["modalForm"]["category"].value,
		name: document.forms["modalForm"]["name"].value,
		description: document.forms["modalForm"]["description"].value,
		price: Number(document.forms["modalForm"]["price"].value),
		stock: Number(document.forms["modalForm"]["stock"].value),
	};

	if (item.category == "select") {
		document.querySelector("#category-error").textContent =
			"Please select a category";
		e.preventDefault();
	}

	if (item.name < 10 || item.name > 100) {
		document.querySelector("#name-error").textContent =
			"Name must contain 10 - 100 characters";
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
