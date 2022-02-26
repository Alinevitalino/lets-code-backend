let tentativas = 6;
let listaDinamica = [];

let arrayPalavras;
//Puxa o JSON do arquivo palavras.json
fetch("palavras.json")
    .then(response => response.json())
    .then(data => {
        //variavel que contem o conteudo do JSON
        arrayPalavras = data;
        criarPalavraSecreta(arrayPalavras);
        //Apenas para mostrar os "_" da palavra
        montarPalavraNaTela();
    })

//Seleciona uma palavra aleatória da lista de palavras
//Function sem return 
function criarPalavraSecreta(arrayPalavras) {
    const indexPalavra = parseInt(Math.random() * arrayPalavras.length)

    indexDaPalavra = indexPalavra + 1;
    palavraSecretaSorteada = arrayPalavras[indexPalavra]["palavra" + (indexPalavra + 1)]["nome"];
    palavraSecretaCategoria = arrayPalavras[indexPalavra]["palavra" + (indexPalavra + 1)]["categoria"];
}

//Verifica a letra pelo ID "tecla" no html, desabilita ela e se tiver tentativas restantes faz as tratativas
function verificaLetraEscolhida(letra) {
    document.getElementById("tecla-" + letra).disabled = true;
    if (tentativas > 0) {
        mudarLetraSelecionada("tecla-" + letra);
        comparalistas(letra);
        montarPalavraNaTela();
    }
}

//Personaliza o fundo e a letra da tecla
function mudarLetraSelecionada(tecla) {
    document.getElementById(tecla).style.background = "#054F77";
    document.getElementById(tecla).style.color = "#ffffff";
}

//
function comparalistas(letra) {
    //indexOf pega a primeira posição da letra na palavra escolhida
    //Ex: Caminhao (letra n) = 5;
    const pos = palavraSecretaSorteada.indexOf(letra)
    //Se for 0, nao encontrou nenhuma letra na palavra
    if (pos < 0) {
        tentativas--
        carregaImagemForca();

        if (tentativas == 0) {
            alertDerrota(palavraSecretaSorteada);
        }
    //Senão, percorre a palavra inteira vai adicionando no array listaDinamica as letras encontradas
    } else {
        for (i = 0; i < palavraSecretaSorteada.length; i++) {
            if (palavraSecretaSorteada[i] === letra) {
                listaDinamica[i] = letra;
            }
        }
    }

    let vitoria = true;
    //Se o array com as letras adicionadas(listaDinamica) for diferente da palavra sorteada, vitoria = false
    for (i = 0; i < palavraSecretaSorteada.length; i++) {
        if (palavraSecretaSorteada[i] != listaDinamica[i]) {
            vitoria = false;
        }
    }

    if (vitoria == true) {
        alertVitoria();
    }
}

function montarPalavraNaTela() {
    //Atribui o texto na var categoria
    const categoria = document.getElementById("categoria");
    //Escreve na tela a categoria da palavra sorteada
    categoria.innerHTML = palavraSecretaCategoria;

    const palavraTela = document.getElementById("palavra-secreta");
    palavraTela.innerHTML = "";

    //Percorre a palavra sorteada e monta na tela as letras encontradas no array
    for (i = 0; i < palavraSecretaSorteada.length; i++) {
        if (listaDinamica[i] == undefined) {
            //Substitui por um caractere vazio no html 
            listaDinamica[i] = "&nbsp;"
            palavraTela.innerHTML = palavraTela.innerHTML + "<div class='letras'>" + listaDinamica[i] + "</div>"
        } else {
            palavraTela.innerHTML = palavraTela.innerHTML + "<div class='letras'>" + listaDinamica[i] + "</div>"
        }
    }
}

//De acordo com o número de tentativas, imprime a imagem 
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

//Adiciona evento de clique no botao
//location.reload recarrega o documento
let bntReiniciar = document.querySelector("#btnReiniciar")
bntReiniciar.addEventListener("click", function () {
    location.reload();
});