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
exports.criarTabela = criarTabela;
exports.somarPorTipo = somarPorTipo;
const database_1 = __importDefault(require("../database"));
// Modelo de Despesas
class Despesas {
    constructor(tipo, valor, descricao, data) {
        this.tipo = tipo;
        this.valor = valor;
        this.descricao = descricao;
        this.data = data;
    }
    salvar() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const query = `INSERT INTO despesas (tipo, valor, descricao, data) VALUES ($1, $2, $3, $4)`;
                const valores = [this.tipo, this.valor, this.descricao, this.data];
                yield database_1.default.query(query, valores);
                console.log('Despesa salva no banco de dados!');
            }
            catch (err) {
                console.error('Erro ao salvar a despesa:', err);
            }
        });
    }
    static buscarDespesas() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const query = `SELECT id, tipo, valor, descricao, data FROM despesas ORDER BY id ASC`;
                const result = yield database_1.default.query(query);
                return result.rows;
            }
            catch (err) {
                console.error("Erro ao buscar todas as despesas:", err);
                throw err;
            }
        });
    }
    static deletar(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const query = `DELETE FROM despesas WHERE id = $1`;
                yield database_1.default.query(query, [id]);
                console.log(`Despesa com ID ${id} deletada!`);
            }
            catch (err) {
                console.error('Erro ao deletar a despesa:', err);
                throw err;
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
            tipo VARCHAR(50) NOT NULL,
            valor NUMERIC NOT NULL,
            descricao TEXT NOT NULL,
            data DATE NOT NULL
        )
    `;
        yield database_1.default.query(query);
    });
}
// Soma por tipos
function somarPorTipo() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const query = `
            SELECT tipo, SUM(valor) AS total FROM despesas GROUP BY tipo
        `;
            const result = yield database_1.default.query(query);
            return result.rows;
        }
        catch (err) {
            console.error('Erro ao consultar o banco de dados:', err);
            throw err;
        }
    });
}
