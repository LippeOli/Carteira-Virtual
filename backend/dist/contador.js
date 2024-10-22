"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const readline = __importStar(require("readline"));
// Configurar readline para pegar inputs do terminal
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
class Despesa {
    //contrutor
    constructor(tipo, valor) {
        this.tipo = tipo;
        this.valor = valor;
    }
    // Método que retorna uma saudação
    saldo() {
        return `Olá, sua despesa é do tipo: ${this.tipo} no valor de ${this.valor} $.`;
    }
}
;
// Função para pegar os inputs e criar a despesa
function criarDespesa() {
    rl.question("Qual tipo de despesa: ", (tipo) => {
        rl.question('Digite o valor da despesa: ', (valor) => {
            const despesa1 = new Despesa(tipo, parseFloat(valor));
            console.log(despesa1.saldo());
            rl.close();
        });
    });
}
criarDespesa();
