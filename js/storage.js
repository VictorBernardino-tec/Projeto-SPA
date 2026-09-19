export function salvarDados(dadosUsuario) {
    localStorage.setItem(
        "dadosUsuario",
        JSON.stringify(dadosUsuario)
    );
}

export function recuperarDados() {
    const dadosSalvos = localStorage.getItem("dadosUsuario");

    if (dadosSalvos) {
        return JSON.parse(dadosSalvos);
    }

    return null;
}