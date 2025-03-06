import React, { useState, useCallback } from 'react';
import { GrafDesp } from "./components/despesas/grafDesp";
import CriarDesp from './components/despesas/criarDesp';
import Legenda from "./components/despesas/legendaDesp";

function App() {
  // Estado para armazenar a função de recarga do gráfico
  const [recarregarGrafico, setRecarregarGrafico] = useState<(() => Promise<void>) | null>(null);

  // Função para ser chamada quando o gráfico é inicializado (memoizada com useCallback)
  const handleGraficoInit = useCallback((recarregarFn: () => Promise<void>) => {
    setRecarregarGrafico(() => recarregarFn);
  }, []);

  // Função para recarregar o gráfico quando o formulário for enviado com sucesso (memoizada com useCallback)
  const handleSubmitSuccess = useCallback(() => {
    if (recarregarGrafico) {
      console.log("Recarregando gráfico após nova despesa...");
      recarregarGrafico();
    }
  }, [recarregarGrafico]);

  return (
    <div className="bg-stone-950 h-screen text-white flex flex-col justify-center items-center">
      <div className="bg-slate-950 h-64 w-9/12 rounded-xl border-2 border-slate-600">
        <div className="bg-slate-900 rounded-t-xl h-14 flex justify-between border-b-2 border-slate-600">
          <h1 className="ml-4 mt-3 font-mono text-lg">Adicione sua despesa</h1>
          <button className="mr-6 mt-2 bg-slate-400 w-10 h-10 rounded-xl">Info</button>
        </div>

        <div className="ml-4 mt-4">
          {/* Passar a função de callback para o formulário */}
          <CriarDesp onSubmitSuccess={handleSubmitSuccess} />
        </div>
      </div>

      <div className="bg-slate-950 w-9/12 mt-12 rounded-xl border-2 border-slate-600">
        <div className="mt-8 ml-4 mb-4 flex gap-8">
          {/* Passar a função de inicialização para o gráfico */}
          <GrafDesp onInitialize={handleGraficoInit} />
          <Legenda />
        </div>
      </div>
    </div>
  );
}

export default App;