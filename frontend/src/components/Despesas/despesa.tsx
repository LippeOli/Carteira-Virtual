import React, { useState, useEffect } from 'react';

// Tipagem para os dados individuais de despesa
interface Despesa {
  tipo: string;
  total: string; // String porque o total vem como string no JSON da API
}

// Tipagem para o estado das despesas agrupadas
type DespesasAgrupadas = Record<string, number>;

const Despesa: React.FC = () => {
  const [despesas, setDespesas] = useState<Despesa[]>([]); // Estado para armazenar as despesas
  const [despesasPorTipo, setDespesasPorTipo] = useState<DespesasAgrupadas>({}); // Estado para despesas agrupadas por tipo

  useEffect(() => {
    // Função para buscar dados da API
    async function fetchDespesas() {
      try {
        const response = await fetch('http://localhost:3333/despesas/soma-por-tipo'); // Substitua pela URL da sua API
        const data: Despesa[] = await response.json(); // Tipando os dados como array de Despesa

        setDespesas(data); // Armazena os dados no estado
        processarDespesas(data); // Processa as despesas
      } catch (error) {
        console.error('Erro ao buscar despesas:', error);
      }
    }

    fetchDespesas();
  }, []);

  // Função para separar as despesas por tipo
  function processarDespesas(despesas: Despesa[]) {
    const despesasAgrupadas: DespesasAgrupadas = despesas.reduce((acc, despesa) => {
      const tipoNormalizado = despesa.tipo.toLowerCase(); // Normaliza o tipo
      const total = parseFloat(despesa.total); // Converte o total para número

      // Se o tipo não existe no acumulador, inicialize
      if (!acc[tipoNormalizado]) {
        acc[tipoNormalizado] = 0;
      }

      // Adiciona o total ao tipo correspondente
      acc[tipoNormalizado] += total;

      return acc;
    }, {} as DespesasAgrupadas);

    setDespesasPorTipo(despesasAgrupadas); // Atualiza o estado com as despesas agrupadas
  }

  return (
    <div>
      <h1>Lista de Despesas</h1>
      <ul>
        {despesas.map((despesa, index) => (
          <li key={index}>
            Tipo: {despesa.tipo}, Total: {despesa.total}
          </li>
        ))}
      </ul>

      
    </div>
  );
};

export default Despesa;
