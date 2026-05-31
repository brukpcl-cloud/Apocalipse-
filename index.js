const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const express = require('express');

// ==========================================
// TRUQUE PARA O RENDER NÃO DESLIGAR O BOT
// ==========================================
const app = express();
const port = process.env.PORT || 3000;
app.get('/', (req, res) => res.send('🤖 Apocalipse X está Online e vigiando!'));
app.listen(port, () => console.log(`🌐 Servidor web camuflado rodando na porta ${port}`));
// ==========================================

console.log('⏳ Iniciando os motores do Apocalipse X...');

const client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: {
        args: [
            '--no-sandbox', 
            '--disable-setuid-sandbox',
            '--disable-dev-shm-usage',
            '--disable-gpu',
            '--no-zygote',
            '--single-process'
        ],
        timeout: 120000,
        protocolTimeout: 300000
    }
});

// O LID do seu grupo base
const GRUPO_BASE_LID = '120363425117645148@g.us';

client.on('qr', qr => {
    console.log('\n================================================================');
    console.log('⚠️ TRUQUE DO QR CODE PARA O RENDER:');
    console.log('1. Selecione e COPIE todo o texto maluco que está abaixo:');
    console.log('\n' + qr + '\n');
    console.log('2. Abra no seu navegador: https://br.qr-code-generator.com/');
    console.log('3. Escolha "TEXTO", cole o código lá e escaneie a imagem gerada!');
    console.log('================================================================\n');
});

client.on('ready', () => {
    console.log('🤖 𝓐𝓹𝓸𝓬𝓪𝓵𝓲𝓹𝓼𝓮 𝓧 📁 Online! Infiltrado e monitorando ataques...');
});

client.on('message', async msg => {
    const textoMensagem = msg.body.toLowerCase();

    const temLinkSuspeito = textoMensagem.includes('chat.whatsapp.com/') || textoMensagem.includes('whatsapp.com/channel');
    const temTextoGolpe = textoMensagem.includes('grupo será encerrado') || 
                          textoMensagem.includes('grupo sera encerrado') || 
                          textoMensagem.includes('grupo será desativado') ||
                          textoMensagem.includes('grupo sera desativado') ||
                          textoMensagem.includes('transferencia oficial') ||
                          textoMensagem.includes('transferência oficial');

    if (temLinkSuspeito && temTextoGolpe) {
        const chat = await msg.getChat();
        const contato = await msg.getContact();

        const nomeInvasor = contato.pushname || 'Nome não definido';
        const numeroInvasor = contato.number;

        const relatorio = `📁 *𝓐𝓹𝓸𝓬𝓪𝓵𝓲𝓹𝓼𝓮 𝓧* 📁\n` +
                          `🚨 *ALERTA DE INVASÃO IDENTIFICADO* 🚨\n\n` +
                          `👀 *Grupo Atacado:* ${chat.name}\n` +
                          `👤 *Invasor:* ${nomeInvasor}\n` +
                          `📞 *Número:* +${numeroInvasor}\n\n` +
                          `👽 *Atenção Etzinho, alvo na mira para ban!* 🔪\n\n` +
                          `📝 *Mensagem Capturada:*\n"${msg.body}"`;

        client.sendMessage(GRUPO_BASE_LID, relatorio);
        console.log(`[Apocalipse X] Invasão detectada! Invasor: ${nomeInvasor} no grupo ${chat.name}`);
    }
});

client.initialize();
