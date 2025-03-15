import React, { useState, useEffect } from 'react';

// Tipagem para os dados individuais de despesa
interface Despesa {
  id: number;
  tipo: string;
  valor: string;  
  descricao?: string;
  data?: string;
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
          <li key={index} className='flex text-sm mt-2'>
           <div className='flex-col'>
              {despesa.tipo} -------- {despesa.valor}
              <div className='flex'>
                {despesa.descricao && <p className="text-xs text-gray-400">{despesa.descricao}</p>}
                {despesa.data && (
                  <p className="ml-6 text-xs text-gray-400">
                    dia: {new Date(despesa.data).getDate()} {/* Exibe apenas o dia */}
                  </p>
                )}

              </div>           
            </div>
            <button 
              onClick={() => 
              handleDelete(despesa.id)}
              className='ml-6 '
              >✖
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Legenda;
