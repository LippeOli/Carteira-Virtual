import * as readline from 'readline';

// Configurar readline para pegar inputs do terminal
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

class Despesa {
    tipo: string;
    valor: number;
  
    //contrutor
    constructor( tipo: string, valor: number){
        this.tipo = tipo;
        this.valor = valor;
    }

      // Método que retorna uma saudação
      saldo(): string {
        return `Olá, sua despesa é do tipo: ${this.tipo} no valor de ${this.valor} $.`;
      }
};

// Função para pegar os inputs e criar a despesa
function criarDespesa() {
    rl.question("Qual tipo de despesa: ", (tipo) =>{
        rl.question('Digite o valor da despesa: ', (valor) => {
            const despesa1 = new Despesa(tipo, parseFloat(valor));
            console.log(despesa1.saldo());
            rl.close();
        })

    })

}

criarDespesa();