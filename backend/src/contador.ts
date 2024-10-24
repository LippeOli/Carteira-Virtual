import * as readline from 'readline';

import pool from './database';

// Configurar readline para pegar inputs do terminal
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

class Despesa {
    tipo: string;
    valor: number;
  
    //contrutor
    constructor( tipo: string, valor: number){
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
};



// Função para criar a tabela no banco de dados
async function criarTabela() {
    const query = `
        CREATE TABLE IF NOT EXISTS despesas (
            id SERIAL PRIMARY KEY,
            tipo VARCHAR(50),
            valor NUMERIC
        )
    `;

    await pool.query(query);
}



// Cria a tabela e salva uma despesa de exemplo
async function main() {
    await criarTabela();
    const despesa = new Despesa('Mercado', 42);
    await despesa.salvar();
}

main();
