export function validarEmail(email) {
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    return regexEmail.test(email);
}