import React, { useState } from 'react';
import { Button } from '../ui/button';


function Despesas() {
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
        alert('Dados enviados com sucesso!');
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
          <select value={selection} onChange={(e) => setSelection(e.target.value)}>
            <option value="">Escolha uma opção</option>
            <option value="mercado">Mercado</option>
            <option value="bandeco">Bandeco</option>
            <option value="saida">Saida</option>
          </select>
        </label>
        <br />
        <label>
          Insira um valor:
          <input
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
        </label>
        <br />
        <Button type='submit'>Enviar</Button>
        </form>
    </div>

  );
}

export default Despesas;