let tentativas = 6;
let listaDinamica = [];
let palavraSecretaCategoria;
let palavraSecretaSorteada;

let arrayPalavras;

fetch("palavras.json")
    .then(response => response.json())
    .then(data => {
        arrayPalavras = data;
        //criarPalavraSecreta(arrayPalavras)[2]
        palavra = (criarPalavraSecreta(arrayPalavras));
        //console.log(palavra[1], palavra[2]);
        montarPalavraNaTela();
    })

function criarPalavraSecreta(arrayPalavras) {
    const indexPalavra = parseInt(Math.random() * arrayPalavras.length)

    indexDaPalavra = indexPalavra + 1;
    palavraSecretaSorteada = arrayPalavras[indexPalavra]["palavra" + (indexPalavra + 1)]["nome"];
    palavraSecretaCategoria = arrayPalavras[indexPalavra]["palavra" + (indexPalavra + 1)]["categoria"];

    return [
        indexDaPalavra,
        palavraSecretaSorteada,
        palavraSecretaCategoria
    ];
}

function montarPalavraNaTela() {
    const categoria = document.getElementById("categoria");
    categoria.innerHTML = palavraSecretaCategoria;

    const palavraTela = document.getElementById("palavra-secreta");
    palavraTela.innerHTML = "";

    for (i = 0; i < palavraSecretaSorteada.length; i++) {
        if (listaDinamica[i] == undefined) {
            listaDinamica[i] = "&nbsp;"
            palavraTela.innerHTML = palavraTela.innerHTML + "<div class='letras'>" + listaDinamica[i] + "</div>"
        } else {
            palavraTela.innerHTML = palavraTela.innerHTML + "<div class='letras'>" + listaDinamica[i] + "</div>"
        }
    }
}

function verificaLetraEscolhida(letra) {
    document.getElementById("tecla-" + letra).disabled = true;
    if (tentativas > 0) {
        mudarStyleLetra("tecla-" + letra);
        comparalistas(letra);
        montarPalavraNaTela();
    }
}

function mudarStyleLetra(tecla) {
    document.getElementById(tecla).style.background = "#054F77";
    document.getElementById(tecla).style.color = "#ffffff";
}

function comparalistas(letra) {
    const pos = palavraSecretaSorteada.indexOf(letra)
    if (pos < 0) {
        tentativas--
        carregaImagemForca();

        if (tentativas == 0) {
            alertDerrota(palavraSecretaSorteada);
        }
    } else {
        for (i = 0; i < palavraSecretaSorteada.length; i++) {
            if (palavraSecretaSorteada[i] === letra) {
                listaDinamica[i] = letra;
            }
        }
    }

    let vitoria = true;
    for (i = 0; i < palavraSecretaSorteada.length; i++) {
        if (palavraSecretaSorteada[i] != listaDinamica[i]) {
            vitoria = false;
        }
    }

    if (vitoria == true) {
        alertSucesso();
    }
}

function carregaImagemForca() {
    switch (tentativas) {
        case 5:
            document.getElementById("imagem").style.background = "url('./img/cabeca.png')";
            break;
        case 4:
            document.getElementById("imagem").style.background = "url('./img/corpo.png')";
            break;
        case 3:
            document.getElementById("imagem").style.background = "url('./img/braco1.png')";
            break;
        case 2:
            document.getElementById("imagem").style.background = "url('./img/braco2.png')";
            break;
        case 1:
            document.getElementById("imagem").style.background = "url('./img/perna1.png')";
            break;
        case 0:
            document.getElementById("imagem").style.background = "url('./img/perna2.png')";
            break;
        default:
            document.getElementById("imagem").style.background = "url('./img/forcavazio.png')";
            break;
    }
}

function alertVitoria() {
    alert("PARABÉNS! Você venceu...");
}

function alertDerrota(palavra) {
    alert("ESSA NÃO!" + "  A palavra correta era: " + palavraSecretaSorteada);
}

let bntReiniciar = document.querySelector("#btnReiniciar")
bntReiniciar.addEventListener("click", function () {
    location.reload();
});