"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const DespesasController_1 = __importDefault(require("./controllers/DespesasController"));
const routes = (0, express_1.Router)();
// Definindo as rotas para o controlador de despesas
routes.post('/despesas', DespesasController_1.default.salvar);
routes.get('/despesas/soma', DespesasController_1.default.somarPorTipo);
routes.get('/despesas/', DespesasController_1.default.listarDespesas);
routes.delete('/despesas/:id', DespesasController_1.default.deletar);
exports.default = routes;
