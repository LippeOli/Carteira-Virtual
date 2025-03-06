import { Router } from 'express';
import DespesasController from './controllers/DespesasController';

const routes = Router();

// Definindo as rotas para o controlador de despesas
routes.post('/despesas', DespesasController.salvar);
routes.get('/despesas/soma', DespesasController.somarPorTipo);
routes.get('/despesas/', DespesasController.listarDespesas);
routes.delete('/despesas/:id', DespesasController.deletar);

export default routes;
