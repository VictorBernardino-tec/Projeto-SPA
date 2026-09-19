/*
SPA COM ROTEAMENTO POR HASH

1. O usuário clica em um link, como #projetos.
2. O hash da URL muda.
3. O evento "hashchange" percebe essa mudança.
4. A função carregarPagina() é executada.
5. window.location.hash verifica qual é o hash atual.
6. if / else if / else decide qual conteúdo mostrar.
7. innerHTML altera o conteúdo do <main> através do DOM.

Assim, conseguimos trocar o conteúdo da página
sem precisar abrir outro arquivo HTML.
*/
// Procura no DOM o elemento que possui o id="conteudo".
// Esse <main> será a área onde o JavaScript vai trocar os conteúdos da SPA.
import { salvarDados, recuperarDados } from "./storage.js";
import { validarEmail } from "./validacao.js";
const conteudo = document.querySelector("#conteudo");

/*
TEMPLATES DINÂMICOS

1. "projetos" é um array que guarda os dados.
2. Cada item do array é um objeto com titulo e descricao.
3. map() percorre cada projeto do array.
4. Para cada projeto, o Template Literal cria um card HTML.
5. ${} permite inserir valores do JavaScript dentro do HTML.
6. join("") junta todos os cards em uma única string.
7. Depois, innerHTML insere os cards no DOM.

Assim não precisamos escrever manualmente um card para cada projeto.
*/
const projetos = [
    {
        titulo: "Inclusão Digital",
        descricao: "Acesso à tecnologia e conhecimentos de informática."
    },
    {
        titulo: "Capacitação Profissional",
        descricao: "Preparação para o mercado de trabalho."
    },
    {
        titulo: "Educação para Todos",
        descricao: "Apoio ao aprendizado e à educação."
    }
];
console.log(projetos);

const cardsProjetos = projetos.map(function (projeto) {
    return `
        <article class="card">
            <h3>${projeto.titulo}</h3>
            <p>${projeto.descricao}</p>
            <button class="btn-detalhes" type="button"
            data-projeto="${projeto.titulo}"
            >
            Ver detalhes
            </button>
        </article>
    `;
}).join("");

console.log(cardsProjetos);

// Função responsável por verificar a URL
// e decidir qual conteúdo deve aparecer na página.
function carregarPagina() {

    // Pega o hash atual da URL.
    // Exemplos: #inicio, #projetos ou #contato.
    const pagina = window.location.hash;


    // Verifica qual hash está na URL.
    // Dependendo do resultado, troca o conteúdo do <main>.
    if (pagina === "#projetos") {

        // innerHTML altera o conteúdo HTML que existe dentro do elemento.
        conteudo.innerHTML = `
            <h2>Projetos</h2>
              <section class="lista-projetos">
            ${cardsProjetos}
        </section>
    `;
}
     else if (pagina === "#contato") {

        conteudo.innerHTML = `
            <h2>Contato</h2>
            <p>Entre em contato conosco.</p>
            <form id="form-contato" novalidate>
            <div>
                <label for="nome">Nome:</label>
                <input type="text" id="nome" name="nome">
                <small class="mensagem-erro" id="erro-nome"></small>
            </div>
            <div>
                <label for="email">Email:</label>
                <input type="email" id="email" name="email">
                <small class="mensagem-erro" id="erro-email"></small>
            </div>
            <button type="submit">enviar</button>
            </form>
        `;
        /*
PERSISTÊNCIA COM LOCALSTORAGE

1. O formulário é validado antes de salvar os dados.
2. formularioValido controla se existem erros.
3. localStorage.setItem() salva nome e e-mail no navegador.
4. Os dados continuam armazenados mesmo após atualizar a página.
5. localStorage.getItem() recupera os valores salvos.
6. A propriedade .value coloca os valores novamente nos inputs.

Assim, a aplicação consegue manter informações no navegador
mesmo depois que a página é atualizada.
*/
/*4. localStorage.getItem() recupera a string.
5. JSON.parse() transforma a string novamente em objeto.
6. Acessamos dadosUsuario.nome e dadosUsuario.email.
7. .value coloca os dados novamente nos inputs.*/
const dadosUsuario = recuperarDados();

if (dadosUsuario) {
    document.querySelector("#nome").value = dadosUsuario.nome;
    document.querySelector("#email").value = dadosUsuario.email;
}

    } else {

        // Se não for #projetos nem #contato,
        // mostra a página inicial.
        conteudo.innerHTML = `
            <h2>Início</h2>
            <p>Bem-vindo à página inicial.</p>
        `;
    }
}


// Executa a função quando a página é carregada pela primeira vez.
carregarPagina();


// "Escuta" mudanças no hash da URL.
// Quando o usuário clica em outro link e o hash muda,
// carregarPagina é executada novamente para atualizar o conteúdo.
window.addEventListener("hashchange", carregarPagina);

/*
DELEGAÇÃO DE EVENTOS

O listener fica no elemento pai #conteudo.
Quando ocorre um clique dentro dele, event.target identifica
qual elemento foi realmente clicado.

Se o elemento possuir a classe btn-detalhes,
o JavaScript acessa data-projeto através de dataset.projeto.

Isso é útil porque os botões dos cards são criados
dinamicamente pelo JavaScript.
*/

conteudo.addEventListener("click", function (event) {
    if (event.target.classList.contains("btn-detalhes")) {
        const nomeprojeto = event.target.dataset.projeto;

        alert(`Você selecionou o projeto: ${nomeprojeto}`);
    }
});

conteudo.addEventListener("submit", function (event) {
    if (event.target.id === "form-contato") {
        event.preventDefault();

        const nome = document.querySelector("#nome");
        const email = document.querySelector("#email");

        const erroNome = document.querySelector("#erro-nome");
        const erroEmail = document.querySelector("#erro-email");



        // Começamos considerando que o formulário está válido
        let formularioValido = true;

        // Validação do nome
        if (nome.value.trim() === "") {
            erroNome.textContent = "O nome é obrigatório.";

            nome.classList.add("campo-erro");
            nome.classList.remove("campo-sucesso");

            formularioValido = false;
        } else {
            erroNome.textContent = "";

            nome.classList.add("campo-sucesso");
            nome.classList.remove("campo-erro");
        }

        // Validação do e-mail
        if (email.value.trim() === "") {
            erroEmail.textContent = "O e-mail é obrigatório.";

            email.classList.add("campo-erro");
            email.classList.remove("campo-sucesso");

            formularioValido = false;

       } else if (!validarEmail(email.value)) {
            erroEmail.textContent = "Digite um e-mail válido.";

            email.classList.add("campo-erro");
            email.classList.remove("campo-sucesso");

            formularioValido = false;

        } else {
            erroEmail.textContent = "";

            email.classList.add("campo-sucesso");
            email.classList.remove("campo-erro");
        }

        console.log("Formulário válido:", formularioValido);
/*PERSISTÊNCIA DE OBJETOS COM LOCALSTORAGE

SALVAR:
1. Criamos um objeto com os dados do formulário.
2. JSON.stringify() transforma o objeto em string.
3. localStorage.setItem() armazena essa string.*/
        if (formularioValido) {

    const dadosUsuario = {
        nome: nome.value.trim(),
        email: email.value.trim()
    };

 salvarDados(dadosUsuario);

    Swal.fire({
    title: "Sucesso!",
    text: "Dados salvos com sucesso!",
    icon: "success",
    confirmButtonText: "OK"
    /*
BIBLIOTECA EXTERNA - SWEETALERT2

A biblioteca SweetAlert2 foi importada por CDN no index.html.

Swal.fire() substitui o alert() padrão por uma
notificação visual mais personalizada.

A biblioteca cuida apenas da apresentação da mensagem.
A validação, os eventos, o DOM e o localStorage continuam
sendo controlados pelo JavaScript da aplicação.
*/

});

/*Fluxo:
objeto → stringify → localStorage
localStorage → getItem → parse → objeto
*/

}
}
});
