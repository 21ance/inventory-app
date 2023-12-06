const isLoggedIn = localStorage.getItem("hello") === "world";
const btnLogin = document.querySelector("#login");
const loginModalOpener = document.querySelector(".buttonLogin");

loginModalOpener.addEventListener("click", () => {
	if (!isLoggedIn) {
		toggleModal(document.querySelector("#formLogin"));
	}
	if (isLoggedIn) {
		localStorage.removeItem("hello");
		location.href = "/";
	}
});

function validateLogin() {
	const username = document.forms["formLogin"]["username"].value;
	const password = document.forms["formLogin"]["password"].value;
	const error = document.querySelector("#login-error");

	if (username !== "admin") {
		error.textContent = "Invalid credentials";
	} else if (password !== "0101") {
		error.textContent = "Invalid credentials";
	} else {
		localStorage.setItem("hello", "world");
		location.href = "/";
	}
}

btnLogin.addEventListener("click", () => {
	validateLogin();
});

document.addEventListener("keypress", (e) => {
	if (e.key === "Enter") {
		validateLogin();
		e.preventDefault();
	}
});

if (isLoggedIn) {
	document.querySelector(".buttonLogin").textContent = "Logout";
}
