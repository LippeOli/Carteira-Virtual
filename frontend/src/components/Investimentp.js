
let mensal = 600; 
let tempo = 6;   
let selecionar = false;
let selecionados = [1, 3, 4];


function Investimento(mensal, tempo, selecionar, selecionados) {
    let total = 0;
    let investido = 0;
    let lucro = 0;
    let lucroAnt = 0;


    for (let i = 1; i <= tempo; i++) {
        
        total = (total + mensal) * (1 + 0.0093); // 0.93% de taxa de juros (0.0093)
        investido += mensal
        lucro = total - investido 
        
        let lucroMes = lucro - lucroAnt
        lucroAnt =  lucro
        
        if(selecionar){
            
            if(selecionados.includes(i)){
                console.log(`\n`)
                console.log(`Mês: ${i}`);
                console.log(`Final: R$ ${total.toFixed(2)}`);
                console.log(`Investido: R$ ${investido.toFixed(2)}`);
                console.log(`Lucro: R$ ${lucro.toFixed(2)}`);
                console.log(`Lucro Mes: R$ ${lucroMes.toFixed(2)}`);        
            }
        }else{
            console.log(`\n`)
            console.log(`Mês: ${i}`);
            console.log(`Final: R$ ${total.toFixed(2)}`);
            console.log(`Investido: R$ ${investido.toFixed(2)}`);
            console.log(`Lucro: R$ ${lucro.toFixed(2)}`);
            console.log(`Lucro Mes: R$ ${lucroMes.toFixed(2)}`);
    
        }
    }
}

Investimento(mensal, tempo, selecionar, selecionados);
