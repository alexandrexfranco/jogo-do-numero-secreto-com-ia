let numeroSecreto;
let tentativas;
const mensagemDiv = document.getElementById('mensagem');
const chuteInput = document.getElementById('chute');
const enviarChuteBotao = document.getElementById('enviar-chute');

function iniciarJogo() {
    numeroSecreto = Math.floor(Math.random() * 10) + 1;
    console.log(numeroSecreto);
    tentativas = 0;
    mensagemDiv.textContent = "";
    chuteInput.value = "";
    enviarChuteBotao.disabled = false;
}

function verificarChute() {
    let chute = parseInt(chuteInput.value);
    let mensagem = ""; // Variável para armazenar a mensagem

    if (isNaN(chute) || chute < 1 || chute > 10) {
        mensagem = "Por favor, insira um número válido entre 1 e 10.";
    } else {
        tentativas++;

        if (chute === numeroSecreto) {
            mensagem = `Parabéns! Você descobriu o número secreto ${numeroSecreto} em ${tentativas} tentativas.`;
            enviarChuteBotao.disabled = true;
        } else if (chute > numeroSecreto) {
            mensagem = `O número secreto é MENOR que ${chute}.`;
        } else {
            mensagem = `O número secreto é MAIOR que ${chute}.`;
        }
    }

    mensagemDiv.textContent = mensagem; // Exibe a mensagem na tela
    responsiveVoice.speak(mensagem, "Brazilian Portuguese Female"); // Reproduz a mensagem por voz
    chuteInput.value = "";
}

iniciarJogo();
enviarChuteBotao.addEventListener('click', verificarChute);