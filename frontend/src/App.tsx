import { GraficoDespesas } from "./components/GraficoDespesas";
import CriarDespesa from './components/CriarDespesa';
import Despesa from "./components/Despesa";

function App() {

  return (
    <div className="flex flex-col">
      <br />
      <CriarDespesa />
      <div className="flex justify-center mt-16">
        <GraficoDespesas />
        
        <Despesa />
      </div>
    </div>
  );
}

export default App;
