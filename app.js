/**
 * Simples simulador de uma lâmpada
 * @author Erica Viana
*/

// variáveis de apoio
let chave = false // o interruptor inicia desligado

function quebrar() {
    document.getElementById('lamp').src = "img/broken.jpg"
    // reproduzindo um arquivo de áudio no JS
    // Passo 1: copiar o arquivo de áudio para o projeto
    // Passo 2: usar a classe Audio (biblioteca interna do JS)
    let som = new Audio()
    som.src = "sound/glassbreaking.wav"
    som.play()
}

function onoff() {
    if (chave === false) {
        document.getElementById('interruptor').src = "img/swon.png"
        chave = true // o JS agora sabe que a chave está ligada
    } else {
        document.getElementById('interruptor').src = "img/swoff.png"
        chave = false // o JS agora sabe que a chave está desligada
    }
}
