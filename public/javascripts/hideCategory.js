const indexCategories = document.querySelectorAll(".categoryItems");

indexCategories.forEach((category) => {
	if (category.children.length === 0) {
		category.parentElement.parentElement.classList.add("hidden");
	}
});
