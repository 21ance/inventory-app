const isLoggedIn = sessionStorage.getItem("hello") === "world";
const btnLogin = document.querySelector("#login");
const loginModalOpener = document.querySelector(".buttonLogin");

loginModalOpener.addEventListener("click", () => {
	if (!isLoggedIn) {
		toggleModal(document.querySelector("#formLogin"));
	}
	if (isLoggedIn) {
		sessionStorage.removeItem("hello");
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
		sessionStorage.setItem("hello", "world");
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
