import {Pool} from 'pg';

// Configuração da conexão com o PostgreSQL
const pool = new Pool({

    user: 'postgres', 
    host: 'localhost',
    database: 'BDcarteira', 
    password: '33614',
    port: 5432, 

});


// Função para testar a conexão
async function testConnection() {
    try {
        const client = await pool.connect();
        console.log('Conexão bem-sucedida com o PostgreSQL');
        client.release();
    } catch (err) {
        console.error('Erro ao conectar ao PostgreSQL', err);
    }
}


// Testa a conexão
testConnection();

export default pool;
