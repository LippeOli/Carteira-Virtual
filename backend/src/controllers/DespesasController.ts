import { Request, Response } from 'express';
import { Despesas } from '../model/Despesas'; // Importa o modelo de Despesas
import { somarPorTipo } from '../model/Despesas'; // Função para somar por tipo

class DespesasController {
    // Método para salvar uma despesa
    static async salvar(req: Request, res: Response): Promise<void> {
        const { tipo, valor, descricao, data } = req.body;
      
        if (!tipo || !valor || !descricao || !data) {
          res.status(400).json({ message: 'Todos os campos são obrigatórios' });
          return;
        }
      
        try {
          // Criamos a data com horário meio-dia para evitar problemas de fuso horário
          const [year, month, day] = data.split('-').map(Number);
          const dataAjustada = new Date(year, month - 1, day, 12, 0, 0);
          
          if (isNaN(dataAjustada.getTime())) {
            res.status(400).json({ message: 'Data inválida' });
            return;
          }
      
          const despesas = new Despesas(tipo, valor, descricao, dataAjustada);
          await despesas.salvar();
          res.status(201).json({ message: 'Despesa salva com sucesso!' });
        } catch (error) {
          console.error('Erro ao salvar despesa:', error);
          res.status(500).json({ message: 'Erro ao salvar a despesa' });
        }
      }

    // Método para listar todas as despesas
    static async listarDespesas(req: Request, res: Response): Promise<void> {
        try {
            const despesas = await Despesas.buscarDespesas();
            res.json(despesas);
        } catch (error) {
            console.error("Erro ao listar despesas:", error);
            res.status(500).json({ message: "Erro ao listar despesas" });
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

    // Método para deletar despesa
    static async deletar(req: Request, res: Response) {
        const { id } = req.params;

        if (!id || isNaN(Number(id))) {
            res.status(400).json({ message: 'ID inválido' });
            return;
        }

        try {
            await Despesas.deletar(Number(id));
            res.status(200).json({ message: 'Despesa deletada com sucesso!' });
        } catch (error) {
            console.error('Erro ao deletar despesa:', error);
            res.status(500).json({ message: 'Erro ao deletar a despesa' });
        }
    }
}

export default DespesasController;
