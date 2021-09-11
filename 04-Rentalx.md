

# Projeto Rentalx
## Configurações Prettier e Eslint
- [Configs](https://www.notion.so/ESLint-e-Prettier-Trilha-Node-js-d3f3ef576e7f45dfbbde5c25fa662779#eaf6e8bdcabc4d809cdae302e29750da)

## Dependências
- yarn init -y
- yarn add eslint -D
- yarn eslint --init
- yarn add @typescript-eslint/eslint-plugin@latest eslint-config-airbnb-base@latest eslint-plugin-import@^2.22.1 @typescript-eslint/parser@latest -D
- yarn add -D eslint-plugin-import-helpers eslint-import-resolver-typescript
- yarn add prettier eslint-config-prettier eslint-plugin-prettier -D
- fará a converção do ts para js automático
  - yarn add ts-node-dev -D
- yarn add typescript -D
- yarn tsc --init
- desabilitar
  - "strict": true, 
- yarn add uuid
- yarn add @types/uuid -D

### Configurando debug
- Clique no botão Play que tem um inserto
- Em Baixo de Run adn Debug
  - create a launc.json file
  - opção de NodeJS
- **launch** : Executa o debug assim que roda a aplicação
```
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "node",
      "request": "attach",
      "name": "Launch Program",
      "skipFiles": ["<node_internals>/**"],
      "outFiles": ["${workspaceFolder}/**/*.js"]
    }
  ]
}
```
#### Adicionar --inspect aos scripts de dev
![Diagrama do projeto](./img/diagrama.png)

## SOLID
##### S
  - **SRP** Single Responsability Principle (Princípio da Responsabilidade Única)
##### O
  - **OCP** Open Closed Principle (Princípio do Aberto/Fechado)
##### L
  - **LSP** Liskov Substituion Priciple (Princípio da Substituição de Liskov)
##### I
  - **ISP** Interface Segregation Principle (Princípio da Segregação de Interface)
##### D
  - **DIP** Dependency Inversion Principle (Princípio da Inversão de Dependência)


