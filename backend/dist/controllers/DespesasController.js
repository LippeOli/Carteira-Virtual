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
const Despesas_1 = require("../model/Despesas"); // Importa o modelo de Despesas
const Despesas_2 = require("../model/Despesas"); // Função para somar por tipo
class DespesasController {
    // Método para salvar uma despesa
    static salvar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { tipo, valor, descricao, data } = req.body;
            if (!tipo || !valor || !descricao || !data) {
                res.status(400).json({ message: 'Todos os campos são obrigatórios' });
                return;
            }
            try {
                const dataConvertida = new Date(data);
                if (isNaN(dataConvertida.getTime())) {
                    res.status(400).json({ message: 'Data inválida' });
                    return;
                }
                const despesas = new Despesas_1.Despesas(tipo, valor, descricao, dataConvertida);
                yield despesas.salvar();
                res.status(201).json({ message: 'Despesa salva com sucesso!' });
            }
            catch (error) {
                console.error('Erro ao salvar despesa:', error);
                res.status(500).json({ message: 'Erro ao salvar a despesa' });
            }
        });
    }
    // Método para listar todas as despesas
    static listarDespesas(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const despesas = yield Despesas_1.Despesas.buscarDespesas();
                res.json(despesas);
            }
            catch (error) {
                console.error("Erro ao listar despesas:", error);
                res.status(500).json({ message: "Erro ao listar despesas" });
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
    // Método para deletar despesa
    static deletar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            if (!id || isNaN(Number(id))) {
                res.status(400).json({ message: 'ID inválido' });
                return;
            }
            try {
                yield Despesas_1.Despesas.deletar(Number(id));
                res.status(200).json({ message: 'Despesa deletada com sucesso!' });
            }
            catch (error) {
                console.error('Erro ao deletar despesa:', error);
                res.status(500).json({ message: 'Erro ao deletar a despesa' });
            }
        });
    }
}
exports.default = DespesasController;
