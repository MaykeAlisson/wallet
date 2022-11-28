### Comands

##### NestJs
Gerar module -> nest g resource <Name>

##### TypeOrm
Criar migration -> npx typeorm migration:create <Path>(./src/database/migrations/createTableUser)
Run migration -> npm run build -> npx typorm migration:run -d <Path_aquivo_DATA_SOURCE>(dist/database/data-source.js)


##### Run

Dev -> npm start:dev
Build -> npm build


. O usuario pode ter mais de uma carteira, ao cadastrar ativo deve escolher a carteira, os graficos serao exibidos por carteiras

v1
. Crud usuario
    . Nome, email, senha
. Crud ativo
    . Nome, Tipo, Moeda, Tipo Ativo, PM, Qtd, Investido, Total, Carteira
    . Tipo( FII, AÇAO, RENDA FIXA, CAIXA, ETF, STOCK, Cripto, NFT, Token)
    . Moeda(REAL, DOLAR, VALOR)
    . Tipo Ativo(Buy Hold, TPB)
. Crud Carteira
    . Nome
    . Porcentagem por tipo
    . Porcentagem por Moeda
    . Porcentagem por tipo de ativo
    . Porcentagem maxima em ativos    
. Retornar resumo carteira
. FRONT

v2
. Crud Lancamento
    . Ativo, Status, Data, Corretora, Carteira
    . Status(Compra, Venda)
. Crud Divulgaçao Resultado    
    . Add data no ativo
    . Lucro, Faturamento VER OQUE MAIS E DIVULGADO

v3 
. Job para enviar email de venda quando um ativo passar do definido para a carteira  (nestjs/schedule)  