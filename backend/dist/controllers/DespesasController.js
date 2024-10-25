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
Object.defineProperty(exports, "__esModule", { value: true });
const Despesas_1 = require("../model/Despesas"); // Importa o modelo de Despesa
const Despesas_2 = require("../model/Despesas"); // Função para somar por tipo
class DespesasController {
    // Método para salvar uma despesa
    static salvar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { tipo, valor } = req.body;
            try {
                const despesas = new Despesas_1.Despesas(tipo, valor);
                yield despesas.salvar();
                res.status(201).json({ message: 'Despesa salva com sucesso!' });
            }
            catch (error) {
                console.error('Erro ao salvar despesa:', error);
                res.status(500).json({ message: 'Erro ao salvar a despesa' });
            }
        });
    }
    // Método para somar os valores por tipo
    static somarPorTipo(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const dados = yield (0, Despesas_2.somarPorTipo)();
                res.json(dados);
            }
            catch (error) {
                console.error('Erro ao obter a soma por tipo:', error);
                res.status(500).json({ message: 'Erro ao obter a soma por tipo' });
            }
        });
    }
}
exports.default = DespesasController;
