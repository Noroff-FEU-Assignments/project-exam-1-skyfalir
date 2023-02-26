const form = document.querySelector(".form");
const formName = document.querySelector("#name");
const formNameError = document.querySelector("#nameError");
const formEmail = document.querySelector("#email");
const formEmailError = document.querySelector("#emailError");
const formSubject = document.querySelector("#subject");
const formSubjectError = document.querySelector("#subjectError");
const formMessage = document.querySelector("#message");
const formMessageError = document.querySelector("#messageError");



function validateForm() {
	event.preventDefault();

	if (checkLength(formName.value, 5) === true) {
		formNameError.style.display = "none";
	} else {
		formNameError.style.display = "block";
	}

	if (validEmail(formEmail.value) === true) {
		formEmailError.style.display = "none";
	} else {
		formEmailError.style.display = "block";
	}

	if (checkLength(formSubject.value, 15) === true) {
		formSubjectError.style.display = "none";
	} else {
		formSubjectError.style.display = "block";
	}

	if (checkLength(formMessage.value, 25) === true) {
		formMessageError.style.display = "none";
	} else {
		formMessageError.style.display = "block";
	}

}

form.addEventListener("submit", validateForm);

function checkLength(value, len) {
	if (value.trim().length > len) {
		return true;
	} else {
		return false;
	}
}

// Validates email address of course!

function validEmail(email) {
	const filter =
		/^\s*[\w\-\+_]+(\.[\w\-\+_]+)*\@[\w\-\+_]+\.[\w\-\+_]+(\.[\w\-\+_]+)*\s*$/;
	return String(email).search(filter) != -1;
}
