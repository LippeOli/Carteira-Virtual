import express from 'express';
import routes from './routes'; 

const app = express();

app.use(express.json()); // Para interpretar o body em JSON

app.use(routes); // Usa as rotas

// Configura o servidor para escutar na porta 3333
app.listen(3333, () => {
    console.log('Servidor rodando na porta 3333');
});
