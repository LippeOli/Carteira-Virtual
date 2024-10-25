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
