function toggleModal(index) {
	const modal = document.querySelectorAll(".modal");
	modal[index].classList.toggle("hidden");
}

function hideModal() {
	document.querySelectorAll(".modal").forEach((modal) => {
		modal.classList.add("hidden");
	});
}

document.querySelectorAll(".modalButton").forEach((button) => {
	button.addEventListener("click", (e) => {
		if (e.target.classList.contains("buttonCreate")) {
			toggleModal(0);
		}
		if (e.target.classList.contains("buttonUpdate")) {
			toggleModal(0);
		}
		if (e.target.classList.contains("buttonDelete")) {
			toggleModal(1);
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
