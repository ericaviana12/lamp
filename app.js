/**
 * Simples simulador de uma lâmpada
 * @author Erica Viana
 */ 

// Variaveis de apoio lógico
let chave = false // o interruptor inicia desligada
// Declaração da variável `chave` que controla o estado do interruptor (inicia desligada).
let lampada = true // a lâmpada está ok
// Declaração da variável `lampada`, que indica o estado da lâmpada (inicia ligada).

// Pré carregamento de arquivo de áudio
let som = new Audio("sound/breaking-glass.mp3")
// Criação de um objeto `Audio` para pré-carregar o arquivo de áudio que será tocado quando a lâmpada quebrar.


// Lanterna (pré carregamento)
let stream, track // variáveis de apoio
// Declaração das variáveis `stream` e `track`, que serão usadas para controlar o acesso à câmera do dispositivo.
inicializarLanterna()
// Chama a função `inicializarLanterna()` para configurar a lanterna do dispositivo (acesso à câmera).

function quebrar() {
    if (lampada === true) {
        document.getElementById('lamp').src = "img/broken.jpg"
        // Verifica se a lâmpada está ligada. Se sim, troca a imagem da lâmpada para "quebrada".

        // Reproduzindo um arquivo de áudio no JS
        // Passo 1: copiar o arquivo de áudio para o projeto
        // Passo 2: usar a classe Audio (biblioteca interna do JS)
        // Passo 3: pré carregar o arquivo de áudio para sincronizar com a troca de imagem (Experêmcia do usúrio)
        som.play()
        // Toca o arquivo de áudio que foi carregado (som do vidro quebrando).
        
        // Apoio a lógica para oJS identificar a lâmpada quebrada
        lampada = false
        // Define o estado da lâmpada como "quebrada" (desligada).
    }
}

function onoff() {
    if (chave === false) {
        document.getElementById('interruptor').src = "img/swon.png"
        chave = true // O JS agora sabe que a chave está ligada
        // Muda a imagem do interruptor para a posição "ligado".
        
        // Verificar se a lâmpada está intacta antes de ascender
        if (lampada === true) {
            document.getElementById('lamp').src = "img/on.jpg"
        }
        // Se a lâmpada não estiver quebrada, muda a imagem da lâmpada para "ligada".
    } else {
        document.getElementById('interruptor').src = "img/swoff.png"
        chave = false
        // Muda a imagem do interruptor para a posição "desligado".
        
        // Verificar se a lâmpada está intacta antes de apagar
        if (lampada === true) {
            document.getElementById('lamp').src = "img/off.jpg"
        }
        // Se a lâmpada não estiver quebrada, muda a imagem da lâmpada para "desligada".
    }
}

// Estudo de eventos relacionados a click do mouse (pressionado ou não pressionado) e telas touch
// Passo 1: Capturar os elementos do html (DOM)
const botao = document.getElementById('button')
const lampadaImg = document.getElementById('lamp')
// Captura os elementos HTML com os ids "button" e "lamp" e os armazena em variáveis.


// Passo 2: Manipular o evento mouse pressionado
// AddEventListener ("esculta um evento em tempo real")
// Mousedown (mouse pressionado constantimente)
// Mouseup (soltar o botão do mouse)
// Touchstart (tocar na tela e manter)
// Touchend (deixar de pressionar a tela touch)

// Pressionar o botão do mouse e manter
botao.addEventListener('mousedown', (event) => {
    event.preventDefault() //ignorar o comportamento padrão
    // Previne o comportamento padrão do evento (evitar ações padrões ao pressionar o botão do mouse).
    
    // Se a lâmpada estiver intacta e o interruptor principal estiver desligado
    if (lampada === true && chave === false){
        lampadaImg.src = "img/on.jpg"
    }
    // Se a lâmpada não estiver quebrada e o interruptor estiver desligado, muda a imagem da lâmpada para "ligada".
})

// Soltar o botão do mouse
botao.addEventListener('mouseup', (event) => {
    event.preventDefault()
    // Previne o comportamento padrão do evento (evitar ações padrões ao soltar o botão do mouse).
    
    if (lampada === true && chave === false){
        lampadaImg.src = "img/off.jpg"
    }
    // Se a lâmpada não estiver quebrada e o interruptor estiver desligado, muda a imagem da lâmpada para "desligada".
})

// Pressionar a tela toch e manter
botao.addEventListener('touchstart', (event) => {
    event.preventDefault()
    // Previne o comportamento padrão do evento (evitar ações padrões ao pressionar a tela).
    
    if (lampada === true && chave === false){
        lampadaImg.src = "img/on.jpg"
    }
    // Se a lâmpada não estiver quebrada e o interruptor estiver desligado, muda a imagem da lâmpada para "ligada".
})

// Deixar de pressionar a tela touch
botao.addEventListener('touchend', (event) => {
    event.preventDefault()  
    // Previne o comportamento padrão do evento (evitar ações padrões ao soltar a tela de toque).
    
    if (lampada === true && chave === false){
        lampadaImg.src = "img/off.jpg"
    }
    // Se a lâmpada não estiver quebrada e o interruptor estiver desligado, muda a imagem da lâmpada para "desligada".
})

// Lanterna (torch é igual a tocha)

async function inicializarLanterna() {
    // try-cat (tratamento de exceções)
    try {
        // Solicita acesso à câmera traseira sem exibir o vídeo
        stream = await navigator.mediaDevices.getUserMedia({
            video: { facingMode: "environment" }
        })
        // Acessa a câmera traseira do dispositivo (sem exibir a imagem).

        // Obtém o track do vídeo para controlar a lanterna
        track = stream.getVideoTracks()[0]
        // Obtém o primeiro vídeo da stream (a câmera traseira).

        // Verifica se o dispositivo suporta o uso da lanterna
        const capabilities = track.getCapabilities()
        if (!capabilities.torch) {
            console.log("Lanterna não suportada no dispositivo.")
            return
        }
        // Se o dispositivo não suportar a lanterna, exibe uma mensagem no console e encerra a função.
    } catch (error) {
        console.error(`Erro ao inicializar a lanterna: ${error}`)
    }
}

async function ligar() {
    if (track) {
        try {
            await track.applyConstraints({ advanced: [{ torch: true }] })
            // Aplica a configuração de ativação da lanterna, se o track estiver disponível.
        } catch (error) {
            console.error(`Erro ao inicializar a lanterna: ${error}`)
        }
    }
}

// Função para desligar a lanterna sem parar o stream
async function desligar() {
    if (track) {
        try {
            await track.applyConstraints({ advanced: [{ torch: false }] })
            // Aplica a configuração de desativação da lanterna, se o track estiver disponível.
        } catch (error) {
            console.error(`Erro ao inicializar a lanterna: ${error}`)
        }
    }
}
