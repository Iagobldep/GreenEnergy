export function textoValido(valor, limite) {
    return typeof valor === "string"
        && valor.trim().length > 0
        && valor.trim().length <= limite;
}

export function inteiroPositivo(valor) {
    return typeof valor === "number"
        && Number.isSafeInteger(valor)
        && valor > 0;
}

export function precoValido(valor) {
    return typeof valor === "number"
        && Number.isFinite(valor)
        && valor > 0;
}

export function valorMonetarioValido(valor) {
    return typeof valor === "number"
        && Number.isFinite(valor)
        && valor >= 0
        && valor <= 99999999.99
        && Math.abs(valor * 100 - Math.round(valor * 100)) < 0.000001;
}

export function dataHoraValida(valor) {
    if (typeof valor !== "string") return false;

    const correspondencia = valor.match(/^(\d{4})-(\d{2})-(\d{2})[ T](\d{2}):(\d{2}):(\d{2})$/);
    if (!correspondencia) return false;

    const [, ano, mes, dia, hora, minuto, segundo] = correspondencia;
    const data = new Date(`${ano}-${mes}-${dia}T${hora}:${minuto}:${segundo}Z`);

    return Number(ano) >= 1000
        && !Number.isNaN(data.getTime())
        && data.toISOString().slice(0, 19) === `${ano}-${mes}-${dia}T${hora}:${minuto}:${segundo}`;
}

import { randomBytes, scrypt as scryptCallback, timingSafeEqual } from "node:crypto";
import { promisify } from "node:util";

const scrypt = promisify(scryptCallback);

export async function hashSenha(senha) {
    const salt = randomBytes(16);
    const hash = await scrypt(senha, salt, 64);

    return `${salt.toString("hex")}:${hash.toString("hex")}`;
}

export async function verificarSenha(senha, senhaSalva) {
    if (typeof senha !== "string" || typeof senhaSalva !== "string") return false;

    if (!senhaHasheada(senhaSalva)) {
        const senhaEnviada = Buffer.from(senha);
        const senhaLegada = Buffer.from(senhaSalva);
        return senhaEnviada.length === senhaLegada.length
            && timingSafeEqual(senhaEnviada, senhaLegada);
    }

    const [saltHex, hashHex] = senhaSalva.split(":");
    const salt = Buffer.from(saltHex, "hex");
    const hashOriginal = Buffer.from(hashHex, "hex");
    const hashTentativa = await scrypt(senha, salt, 64);

    return timingSafeEqual(hashOriginal, hashTentativa);
}

export function senhaHasheada(senha) {
    return typeof senha === "string" && /^[\da-f]{32}:[\da-f]{128}$/i.test(senha);
}