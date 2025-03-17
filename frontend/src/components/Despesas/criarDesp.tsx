import React, { useState } from 'react';
import { Button } from '../ui/button';

interface CriarDespProps {
  onSubmitSuccess?: () => void;
}

function CriarDesp({ onSubmitSuccess }: CriarDespProps) {
  const [selection, setSelection] = useState<string>('');
  const [value, setValue] = useState<string>('');
  const [descricao, setDescricao] = useState<string>(''); // Novo campo
  const [data, setData] = useState<string>(''); // Novo campo

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Criar objeto da Despesa com os novos atributos
    const dataToSend = {
      tipo: selection,
      valor: parseFloat(value),
      descricao: descricao,
      data: data, 
    };
    
    try {
      // Faz o Request da API
      const response = await fetch('http://localhost:3333/despesas', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToSend),
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Sucesso:', result);

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

    // Resetando os valores dos inputs após envio
    setSelection('');
    setValue('');
    setDescricao('');
    setData('');
  };

  return (
    <div>
      <h2>Despesas</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Selecione uma opção:
          <select value={selection} onChange={(e) => setSelection(e.target.value)} className='text-slate-800 mb-2'>
            <option value="">Escolha uma opção</option>
            <option value="transporte">Transporte</option>
            <option value="mercado">Mercado</option>
            <option value="lazer">Lazer</option>
            <option value="util">Utilidades</option>
          </select>
        </label>
        <br />
        <label>
          Insira um valor:
          <input
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className='bg-slate-800 ml-4 rounded-[2px] border border-white gap-4 max-w-md mx-auto'
          />
        </label>
        <br />
        <label>
          Descrição:
          <input
            type="text"
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            className='bg-slate-800 ml-4 rounded-[2px] border border-white gap-4 max-w-md mx-auto mt-1.5'
          />
        </label>
        <br />
        <label>
          Data:
          <input
            type="date"
            value={data}
            onChange={(e) => setData(e.target.value)}
            className=' bg-slate-800 ml-4 rounded-[2px] border border-white gap-4 max-w-md mx-auto mt-1.5'
          />
        </label>
        <br />
        <Button 
          type='submit'
          className='bg-slate-800 rounded-[4px] mt-2 ml-14'
        >
          Enviar
        </Button>
      </form>
    </div>
  );
}

export default CriarDesp;
