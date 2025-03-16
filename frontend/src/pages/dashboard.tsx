import { useState, useCallback } from 'react';
import { GrafDesp } from "../components/despesas/grafDesp";
import CriarDesp from '../components/despesas/criarDesp';
import Legenda from "../components/despesas/legendaDesp";

function Dashboard() {
  // Estado para armazenar a função de recarga do gráfico
  const [recarregarGrafico, setRecarregarGrafico] = useState<(() => Promise<void>) | null>(null);
  // Estado para armazenar a função de recarga da legenda
  const [recarregarLegenda, setRecarregarLegenda] = useState<(() => Promise<void>) | null>(null);

  // Função para ser chamada quando o gráfico é inicializado
  const handleGraficoInit = useCallback((recarregarFn: () => Promise<void>) => {
    setRecarregarGrafico(() => recarregarFn);
  }, []);

  // Função para ser chamada quando a legenda é inicializada
  const handleLegendaInit = useCallback((recarregarFn: () => Promise<void>) => {
    setRecarregarLegenda(() => recarregarFn);
  }, []);

  // Função para recarregar o gráfico e a legenda quando houver alterações
  const handleDataChange = useCallback(() => {
    if (recarregarGrafico) {
      console.log("Recarregando gráfico após alteração nas despesas...");
      recarregarGrafico();
    }
    
    if (recarregarLegenda) {
      console.log("Recarregando legenda após alteração nas despesas...");
      recarregarLegenda();
    }
  }, [recarregarGrafico, recarregarLegenda]);

  return (
    <div className="bg-stone-950 h-auto text-white flex flex-col justify-center">
      <div className="bg-slate-950 h-72 w-5/12 ml-12 mt-8 rounded-xl border-2 border-slate-600">
        <div className="bg-slate-900 rounded-t-xl h-14 flex justify-between border-b-2 border-slate-600">
          <h1 className="ml-4 mt-3 font-mono text-lg">Adicione sua despesa</h1>
          <button className="mr-6 mt-2 bg-slate-400 w-10 h-10 rounded-xl">Info</button>
        </div>

        <div className="ml-4 mt-4">
          {/* Usar a função genérica de alteração de dados */}
          <CriarDesp onSubmitSuccess={handleDataChange} />
        </div>
      </div>

      <div className="bg-slate-950 w-5/12 ml-12 mt-8 mb-24 rounded-xl border-2 border-slate-600">
        <div className="mt-8 ml-4 mb-4 flex gap-8">
          <GrafDesp onInitialize={handleGraficoInit} />
          {/* Passar a função de callback para deleção também */}
          <Legenda 
            onInitialize={handleLegendaInit} 
            onDeleteSuccess={handleDataChange}
          />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;