# qa-junior-playwright-frontend

## Pré requisitos

1.  **Node.js e npm (ou yarn)**: valide se já está instalado

        ```bash
        node -v
        npm -v
        ```

## Setup

### 1. Clone o repositório

```bash
git clone https://github.com/kalineduttra/qa-junior-playwright-frontend.git
cd qa-junior-playwright-frontendS
```

### 2. Instala as dependencias

```bash 
npm install
# ou 
# yarn install
```

### 3. Configure os valores das variáveis de ambiente
```bash
# copia o arquivo de exemplo e salva essa cópia com o nome de env. 
# coloque seu user e password aqui
cp .env.example .env
```

### 4. Execute os testes

```bash 
npx playwright test # Rodar todos os testes e2e
npx playwright test --ui # Iniciar modo interativo de UI
```
