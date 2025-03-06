import React, { useState, useEffect } from 'react';

// Tipagem para os dados individuais de despesa
interface Despesa {
  id: number;  
  tipo: string;
  valor: string; // String porque o total vem como string no JSON da API
}

const Legenda: React.FC = () => {
  const [despesas, setDespesas] = useState<Despesa[]>([]); // Estado para armazenar as despesas

  useEffect(() => {
    // Função para buscar dados da API
    async function fetchDespesas() {
      try {
        const response = await fetch('http://localhost:3333/despesas/'); // Substitua pela URL da sua API
        const data: Despesa[] = await response.json(); // Tipando os dados como array de Despesa

        setDespesas(data); // Armazena os dados no estado
      } catch (error) {
        console.error('Erro ao buscar despesas:', error);
      }
    }

    fetchDespesas();
  }, []);

  const handleDelete = async (id: number) => {
    try {
      const response = await fetch(`http://localhost:3333/despesas/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        // Atualiza a lista de despesas após a exclusão
        setDespesas((prevDespesas) => prevDespesas.filter((despesa) => despesa.id !== id));
      } else {
        console.error('Erro ao deletar despesa:', await response.json());
      }
    } catch (error) {
        console.error('Erro ao deletar despesa:', error);
    }

  }; 

  return (
    <div>
      <h1>Lista de Despesas</h1>
      <ul>
        {despesas.map((despesa, index) => (
          <li key={index} className='text-sm mt-2'>
            {despesa.tipo} -------- {despesa.valor}
            <button onClick={() => 
              handleDelete(despesa.id)}
              className='ml-3'
              >⋮</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Legenda;
