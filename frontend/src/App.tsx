import { ChartPrimeiro } from "./components/ChartPrimeiro";
import Despesas from './components/Despesas';

function App() {

  return (
    <div className="flex flex-col">
      <h1 className='text-purple-500'>Olaaa</h1>
      <br />
      <Despesas />
      <div className="flex justify-center mt-16">
        <ChartPrimeiro />
      </div>
    </div>
  );
}

export default App;
