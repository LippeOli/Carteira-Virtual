"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const readline = __importStar(require("readline"));
const database_1 = __importDefault(require("./database"));
// Configurar readline para pegar inputs do terminal
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
class Despesa {
    //contrutor
    constructor(tipo, valor) {
        this.tipo = tipo;
        this.valor = valor;
    }
    salvar() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const query = `INSERT INTO despesas (tipo, valor) VALUES ($1, $2)`;
                const valores = [this.tipo, this.valor];
                yield database_1.default.query(query, valores);
                console.log('Despesa salva no banco de dados!');
            }
            catch (err) {
                console.error('Erro ao salvar a despesa:', err);
            }
        });
    }
}
;
// Função para criar a tabela no banco de dados
function criarTabela() {
    return __awaiter(this, void 0, void 0, function* () {
        const query = `
        CREATE TABLE IF NOT EXISTS despesas (
            id SERIAL PRIMARY KEY,
            tipo VARCHAR(50),
            valor NUMERIC
        )
    `;
        yield database_1.default.query(query);
    });
}
// Cria a tabela e salva uma despesa de exemplo
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        yield criarTabela();
        const despesa = new Despesa('Mercado', 42);
        yield despesa.salvar();
    });
}
main();
