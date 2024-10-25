"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const routes_1 = __importDefault(require("./routes"));
const app = (0, express_1.default)();
app.use(express_1.default.json()); // Para interpretar o body em JSON
app.use(routes_1.default); // Usa as rotas
// Configura o servidor para escutar na porta 3333
app.listen(3333, () => {
    console.log('Servidor rodando na porta 3333');
});
