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
            <button class="btn-detalhes" type="button">
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
        `;

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