let numeroSecreto;
let tentativas;
let falando = false;
const mensagemDiv = document.getElementById('mensagem');
const chuteInput = document.getElementById('chute');
const enviarChuteBotao = document.getElementById('enviar-chute');
const novoJogoBotao = document.getElementById('novo-jogo');

function iniciarJogo() {
    numeroSecreto = Math.floor(Math.random() * 10) + 1;
    console.log(numeroSecreto);
    tentativas = 0;
    mensagemDiv.textContent = "";
    chuteInput.value = "";
    enviarChuteBotao.disabled = false; // Garante que o botão esteja habilitado ao iniciar um novo jogo
    falar("Novo Jogo Iniciado. Tente adivinhar o número secreto entre 1 e 10.");
}

function verificarChute() {
    if (falando) {
        return;
    }

    let chute = parseInt(chuteInput.value);
    let mensagem = "";

    if (isNaN(chute) || chute < 1 || chute > 10) {
        mensagem = "Por favor, insira um número válido entre 1 e 10.";
    } else {
        tentativas++;

        if (chute === numeroSecreto) {
            mensagem = `Parabéns! Você descobriu o número secreto ${numeroSecreto} em ${tentativas} tentativas.`;
            enviarChuteBotao.disabled = true; // Desabilita o botão APENAS quando o jogador acerta
        } else if (chute > numeroSecreto) {
            mensagem = `O número secreto é MENOR que ${chute}.`;
        } else {
            mensagem = `O número secreto é MAIOR que ${chute}.`;
        }
    }

    mensagemDiv.textContent = mensagem;
    falar(mensagem);
    chuteInput.value = "";
}

function falar(texto) {
    if ('speechSynthesis' in window) {
        const synth = window.speechSynthesis;

        if (synth.speaking) {
            synth.cancel();
        }

        const utterance = new SpeechSynthesisUtterance(texto);
        utterance.lang = 'pt-BR';
        synth.speak(utterance);
    } else {
        console.error('A API Web Speech Synthesis não é suportada neste navegador.');
        alert('A reprodução de voz não está disponível no seu navegador.');
    }
}

document.addEventListener('DOMContentLoaded', function() {
    iniciarJogo();
    enviarChuteBotao.addEventListener('click', verificarChute);
    novoJogoBotao.addEventListener('click', iniciarJogo);
});