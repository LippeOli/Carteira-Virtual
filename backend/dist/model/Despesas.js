"use strict";
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
exports.Despesas = void 0;
exports.somarPorTipo = somarPorTipo;
const database_1 = __importDefault(require("../database"));
//Modelo de Despesas
class Despesas {
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
exports.Despesas = Despesas;
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
//Soma por tipos 
function somarPorTipo() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const query = `
                SELECT tipo, SUM(valor) AS total FROM despesas GROUP BY tipo
            `;
            const result = yield database_1.default.query(query); // Executa a consulta no banco
            return result.rows; // Retorna as linhas resultantes
        }
        catch (err) {
            console.error('Erro ao consultar o banco de dados:', err);
            throw err; // Caso ocorra algum erro, ele é propagado para o chamador
        }
    });
}
