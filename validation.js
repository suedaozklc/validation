function isValidName(name) {
    // Hem sadece harf olmalı hem de örneğin en fazla 50 karakter olmalı
    return typeof name === "string" && /^[A-Za-z]+$/.test(name) && name.length <= 50;
}

function isValidEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

function isValidDOB(dob) {
    const date = new Date(dob);
    const today = new Date();
    return date < today; // future olmamalı
}

function isValidPassword(password) {
    // min 6 char, en az 1 harf + 1 sayı
    const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@#$%^&*!]{6,}$/;
    return regex.test(password);
}

function isSafeInput(input) {
    // basit XSS / SQL injection kontrolü
    const forbidden = /<script>|SELECT|DROP|--|'|"/i;
    return !forbidden.test(input);
}

function createAccount(firstName, lastName, email, dob, password, confirmPassword) {

    // boş kontrol
    if (!firstName || !lastName || !email || !dob || !password || !confirmPassword) {
        return false;
    }

    // güvenlik kontrolü
    if (!isSafeInput(firstName) || !isSafeInput(lastName) || !isSafeInput(email)) {
        return false;
    }

    // validasyonlar
    if (!isValidName(firstName)) return false;
    if (!isValidName(lastName)) return false;
    if (!isValidEmail(email)) return false;
    if (!isValidDOB(dob)) return false;
    if (!isValidPassword(password)) return false;

    // password match
    if (password !== confirmPassword) return false;

    return true;
}

module.exports = {
    createAccount,
    isValidEmail,
    isValidPassword
};