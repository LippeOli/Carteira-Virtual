import React, { useState, useEffect, useCallback } from 'react';

interface Despesa {
  id: number;
  tipo: string;
  valor: string;  
  descricao?: string;
  data?: string;
}

interface LegendaProps {
  onInitialize?: (recarregarFn: () => Promise<void>) => void;
  onDeleteSuccess?: () => void; // Nova prop para notificar sobre remoção bem-sucedida
}

const Legenda: React.FC<LegendaProps> = ({ onInitialize, onDeleteSuccess }) => {
  const [despesas, setDespesas] = useState<Despesa[]>([]); 

  // Função para buscar dados da API
  const fetchDespesas = useCallback(async () => {
    try {
      const response = await fetch('http://localhost:3333/despesas/');
      const data: Despesa[] = await response.json();
      setDespesas(data);
      return data;
    } catch (error) {
      console.error('Erro ao buscar despesas:', error);
      return [];
    }
  }, []);

  // Função adaptadora que retorna Promise<void>
  const recarregarDespesas = useCallback(async () => {
    await fetchDespesas();
    // Não retorna nenhum valor, então é Promise<void>
  }, [fetchDespesas]);

  useEffect(() => {
    // Inicializa os dados
    fetchDespesas();
    
    // Se onInitialize for fornecido, passa a função de recarga adaptada
    if (onInitialize) {
      onInitialize(recarregarDespesas);
    }
  }, [fetchDespesas, onInitialize, recarregarDespesas]);
  

  const handleDelete = async (id: number) => {
    try {
      const response = await fetch(`http://localhost:3333/despesas/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        // Atualiza a lista de despesas após a exclusão
        setDespesas((prevDespesas) => prevDespesas.filter((despesa) => despesa.id !== id));
        
        // Notifica o componente pai sobre a exclusão bem-sucedida
        if (onDeleteSuccess) {
          onDeleteSuccess();
        }
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
                    dia: {new Date(despesa.data).getDate()}
                  </p>
                )}
              </div>           
            </div>
            <button 
              onClick={() => handleDelete(despesa.id)}
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