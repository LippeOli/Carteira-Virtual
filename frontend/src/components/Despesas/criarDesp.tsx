import React, { useState } from 'react';
import { Button } from '../ui/button';

interface CriarDespProps {
  onSubmitSuccess?: () => void;
}

function CriarDesp({ onSubmitSuccess }: CriarDespProps) {
  const [selection, setSelection] = useState<string>('');
  const [value, setValue] = useState<string>('');
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
   
    // Criar objeto da Despesa
    const data = {
      tipo: selection,
      valor: parseFloat(value),
    };

    try {
      // Faz o Request da API dentro da função handleSubmit
      const response = await fetch('http://localhost:3333/despesas', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Sucesso:', result);
        
        // Chamar a função para recarregar o gráfico se ela existir
        if (onSubmitSuccess) {
          onSubmitSuccess();
        }
      } else {
        console.error('Erro:', response.statusText);
        alert('Falha ao enviar os dados');
      }
    } catch (error) {
      console.error('Erro na requisição:', error);
      alert('Erro na conexão com a API');
    }

    // Após a resposta ser tratada, redefina os valores dos inputs
    setSelection('');
    setValue('');
  };


  return (
    <div>
      <h2>Despesas</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Selecione uma opção:
          <select value={selection} onChange={(e) => setSelection(e.target.value)} className='text-slate-800 mb-2'>
            <option value="">Escolha uma opção</option>
            <option value="comida">Comida</option>
            <option value="milho">Milho</option>
            <option value="bebida">Bebida</option>
            <option value="transporte">Transporte</option>
          </select>
        </label>
        <br />
        <label>
          Insira um valor:
          <input
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className='bg-slate-800 ml-4 rounded-md'
          />
        </label>
        <br />
        <Button 
          type='submit'
          className='bg-slate-800 rounded-md'
        >
          Enviar
        </Button>
      </form>
    </div>
  );
}

export default CriarDesp;