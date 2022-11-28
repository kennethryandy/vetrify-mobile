
// Email regular expression for validating email address
const EMAIL_REGEX =
	/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

export const validateSignup = (cred) => {
	let isError = false;
	let errors = {};

	if (cred.firstname.trim() === '') {
		isError = true;
		errors.firstname = "First name must not be empty.";
	}

	if (cred.lastname.trim() === '') {
		isError = true;
		errors.lastname = "Last name must not be empty.";
	}

	if (!EMAIL_REGEX.test(cred.email)) {
		isError = true;
		errors.email = "Must be a valid email address.";
	};

	if (!cred.password || !cred.password?.trim() === "") {
		isError = true;
		errors.password = "Password name must not be empty.";
	};

	if (cred.password !== cred.confirmpassword) {
		isError = true;
		errors.confirmpassword = "Password and confirm password does not match."
	}

	if (!cred.birthDate) {
		isError = true;
		errors.birthDate = true;
	}

	return { isError, errors, cred }
}