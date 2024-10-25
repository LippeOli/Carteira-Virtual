import { Request, Response } from 'express';
import { Despesas } from '../model/Despesas'; // Importa o modelo de Despesa
import { somarPorTipo } from '../model/Despesas'; // Função para somar por tipo

class DespesasController {
    // Método para salvar uma despesa
    static async salvar(req: Request, res: Response): Promise<void> {
        const { tipo, valor } = req.body;

        try {
            const despesas = new Despesas(tipo, valor);
            await despesas.salvar();
            res.status(201).json({ message: 'Despesa salva com sucesso!' });
        } catch (error) {
            console.error('Erro ao salvar despesa:', error);
            res.status(500).json({ message: 'Erro ao salvar a despesa' });
        }
    }

    // Método para somar os valores por tipo
    static async somarPorTipo(req: Request, res: Response): Promise<void> {
        try {
            const dados = await somarPorTipo();
            res.json(dados);
        } catch (error) {
            console.error('Erro ao obter a soma por tipo:', error);
            res.status(500).json({ message: 'Erro ao obter a soma por tipo' });
        }
    }
}

export default DespesasController;
