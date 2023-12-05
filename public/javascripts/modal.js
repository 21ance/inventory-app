function toggleModal(element) {
	element.closest(".modal").classList.toggle("hidden");
}

function hideModal() {
	document.querySelectorAll(".modal").forEach((modal) => {
		modal.classList.add("hidden");
	});
}

document.querySelectorAll(".modalButton").forEach((button) => {
	button.addEventListener("click", (e) => {
		if (!isLoggedIn) return alert("Please login first");
		if (e.target.classList.contains("buttonCreate")) {
			toggleModal(document.querySelector("#formItem"));
		}
		if (e.target.classList.contains("buttonCreateCat")) {
			toggleModal(document.querySelector("#formCategory"));
		}
		if (e.target.classList.contains("buttonUpdate")) {
			document.querySelector("#formCategory") === null
				? toggleModal(document.querySelector("#formItem"))
				: toggleModal(document.querySelector("#formCategory"));
		}
		if (e.target.classList.contains("buttonDelete")) {
			toggleModal(document.querySelector("#formDelete"));
		}
	});
});

document.addEventListener("click", (e) => {
	if (e.target.classList.contains("modal")) {
		e.target.classList.add("hidden");
	}
	if (e.target.classList.contains("modalCancel")) {
		hideModal();
	}
});

document.addEventListener("keydown", (e) => {
	if (e.key === "Escape") {
		hideModal();
	}
});
