export function textoValido(valor, limite) {
    return typeof valor === "string"
        && valor.trim().length > 0
        && valor.trim().length <= limite;
}