function validatePassword(password, secondPassword) {
    if (password.length >= 6 && password.length <= 15 && password === secondPassword) {
        return true;
    }

    return false;
}

module.exports = validatePassword;