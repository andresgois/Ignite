# IGNITE

## MÓDULO I

### Conceitos do Node
> Plataforma javascript
> Execução no lado do servidor
> v8 + libuv + conjunto de módulos
> O que o node veio resolver
- Ryan Dahl
- Barra de progresso flickr
- Tecnologias não davam suporte ao I/O
> Arquitetura Event Loop
- Call Stack
> Single thread
> Non-blocking I/O
> módulos próprios
- http
- dns
- fs
- buffer
- ...
#### Event Loop

| Call stack |
|:----------:|
|function4() |
|function3() |
|function2() |
|function1() |
- **Event Loop** ouve as funções que chegam e envia para as thread disponíveis, PILHA

#### Gerenciadores de Pacote
> NPM
> YARN
> Instalar bibliotecas externas
> Disponibilizar bibliotecas

#### Frameworks
> Express
> Egg.js
> Nest.js
> Adonis.js

### API
> Apllication Programing Interface (Interface de programação de aplicativos)
> Conjunto de especificações de possíveis interações entre aplicações
> Documentação para desenvolvedor

### REST
> Representation State Transfer (Transferência representacional de estado)
> Modelo de arquitetura
> 6 Regras
- Client-server
- Stateless
    - Não armazena estado ou requisição
- Cache
- Interface uniforme
    - Identificação de recursos
        - http://enderecoserver.com.br/products
        - http://enderecoserver.com.br/clients
    - Representação dos recursos
    - Mensagens auto-descritivas
    - HATEOAS (Hypertext As The Engine Of Application State)
```
{
    "id": 1,
    "user": "Andre",
    "created_at": "2020-10-10",
    "commentsLink": "api/users/1/comments"
}
```
- Camadas
    - Balanceamento de carga
    - Segurança
- Código sob demanda

### Métodos de requisição - HTTP Verbs           
- **GET**
    - Leitura
- **POST**
    - Criação
- **PUT**
    - Atualização
- **DELETE**
    - Deletar
- **PATCH**
    - Atualização parcial

### HTTP Codes
- **1XX: Informativo**
    - A solicitação foi aceita ou o processo continua em andamento
- **2XX: Confirmação**
    - 200: requisição bem sucedida
    - 201: Created
    - Geralmente usado para  POST após inserção
- **3XX: Redirecionamento**
    - 301: Moved permanently
    - 302: Moved
- **4XX: Erro do cliente**
    - 400: Bad request
    - 401: Unauthorized
    - 403: Forbidden
    - 404: Not found
    - 422: Unprocessable entity
- **5XX: Erro no servidor**
    - 500: Internal server error
    - 502: Bad gateway

### Parâmetros das requisições
- Header Params
```
authority: app.teste.com.br
method: POST
path: /api/nodes
scheme: https
referer: https://app.teste.com.br/node
```
- Query Params
    - http://app.teste.com.br/v1/users?page=2&limit=50
    - Chave
    - Valor
    - Separação
- Route Params 
    - http://app.teste.com.br/v1/users/{id}
- Body Params
```
{
    "name": "Andre",
    "username": "andregois"
}
```

### Boas práticas API REST
- A utilização correta dos métodos
- A utilização correta dos status no retorno das respostas
- Padrão de nomeclatura
    - Busca de usuários - GET
        - http://enderecoserver.com.br/v1/users
    - Busca de usuários por id - GET
        - http://enderecoserver.com.br/v1/users/1
    - Busca de endereço do usuários - GET
        - http://enderecoserver.com.br/v1/users/address
    - Deleção de usuários - DELETE
        - http://enderecoserver.com.br/v1/users/1
    - Atualização do status do usuários - PATCH
        - http://enderecoserver.com.br/v1/users/status

#### Projeto Fundamentos
> fundamentos-nodejs
- 01-Fundamentos.md
#### Projeto Finapi
> Finapi
- 02-Finapi.md

## MÓDULO II - TypeScript
> typescript
### 03-typescript.md
- Configurar debug

