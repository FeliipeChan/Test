const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);

// Permite que qualquer site se conecte a esse servidor
const io = new Server(server, {
  cors: { origin: "*" }
});

io.on('connection', (socket) => {
  console.log('Novo usuário conectado:', socket.id);

  // Escuta quando alguém envia uma mensagem
  socket.on('mensagem', (dados) => {
    // Retransmite a mensagem para todo mundo conectado
    io.emit('mensagem', dados);
  });

  socket.on('disconnect', () => {
    console.log('Usuário desconectou');
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
