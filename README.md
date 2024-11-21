# Carteira Virtual

Este é um projeto Node.js com TypeScript para o back-end e React para o front-end, configurado para rodar ambos os servidores simultaneamente. Este README fornece os passos para configurar e iniciar o projeto.

## Pré-requisitos

- **TypeScript**, **Node.js** e **npm** instalados.
- **concurrently** para executar os scripts automaticamente.

## Estrutura de Pastas
- ./backend: Contém o código do back-end em TypeScript e Node.js.
- ./frontend: Contém o código do front-end em React.

## Instruções para executar

### 1. Instalar Dependências

   ```bash
   npm install
 ```

### 2. Scripts Principais

Inicia tanto o front-end quanto o back-end simultaneamente, no diretório raiz:

   ```bash
   npm start
 ``` 

Compila e executa apenas o back-end.
  
  ```bash
    npm run server
  ```

Executa apenas o front-end.

  ```bash
    npm run frontend
  ```