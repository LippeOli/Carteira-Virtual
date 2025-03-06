import pool from "../database";

//Modelo de Despesas

export class Despesas {

    tipo: string;
    valor: number;

    constructor(tipo: string, valor: number) {
        this.tipo = tipo;
        this.valor = valor;
    }


    async salvar() {
        try {
            const query = `INSERT INTO despesas (tipo, valor) VALUES ($1, $2)`
            const valores = [this.tipo, this.valor];
            await pool.query(query, valores);
            console.log('Despesa salva no banco de dados!');
       
        } catch (err) {
            console.error('Erro ao salvar a despesa:', err);
       
        }
    }

    static async buscarDespesas(): Promise<{ id: number; tipo: string; valor: number }[]> {
        try {
            const query = `SELECT id, tipo, valor FROM despesas ORDER BY id ASC`;
            const result = await pool.query(query); 
            return result.rows;
        } catch (err) {
            console.error("Erro ao buscar todas as despesas:", err);
            throw err;
        }
    }

    static async deletar(id: number) {
            try {
                const query = `DELETE FROM despesas WHERE id = $1`;
                await pool.query(query, [id]); 
                console.log(`Despesa com ID ${id} deletada!`);
            } catch (err) {
                console.error('Erro ao deletar a despesa:', err);
                throw err;
            }
        
    }
    

}
    
    // Função para criar a tabela no banco de dados
    async function  criarTabela() {
        const query = `
            CREATE TABLE IF NOT EXISTS despesas (
                id SERIAL PRIMARY KEY,
                tipo VARCHAR(50),
                valor NUMERIC
            )
        `;

        await pool.query(query);
    }


    
    //Soma por tipos 
    export async function somarPorTipo() {
        try {
            const query = `
                SELECT tipo, SUM(valor) AS total FROM despesas GROUP BY tipo
            `;
            const result = await pool.query(query); // Executa a consulta no banco
            return result.rows; // Retorna as linhas resultantes
        
        }
        
        catch (err) {
            console.error('Erro ao consultar o banco de dados:', err);
            throw err; // Caso ocorra algum erro, ele é propagado para o chamador
        }
    }

    