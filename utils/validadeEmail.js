function validateEmail(email){
	// eslint-disable-next-line no-useless-escape
	const regularExpression = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

	return String(email)
		.toLocaleLowerCase()
		.match(regularExpression);
}

module.exports = validateEmail;