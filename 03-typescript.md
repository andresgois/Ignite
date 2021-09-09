
# TypeScript

## 
###
####
#####

## TypeScript
- Uma linguagem open-source da microsorf
- Superset do javascript
- Tipagem estática

##### Javascript
```
const user = {
  name: "teste",
  username: "teste_pro",
  document: "33333"
}

user.document = 2222 //Erro tipo de dado errado
```
##### TS
```
class User {
  name: String;
  username: String;
  document: String;
}

const user: User = {
  name: "teste",
  username: "teste_pro",
  document: 33333       // dado incompatível
}
```

##### Javascript
```
function soma(num1, num2){
  return num1 + num2;
}

console.log(soma(1,2))     //3
console.log(soma("1","2")) //12
console.log(soma()) 
```
##### TS
```
function soma(num1: number, num2: number){
  return num1 + num2;
}

console.log(soma(1,2))      //3
console.log(soma("1","2"))  //erro, dado incompatível
console.log(soma())         // erro

```

### Mitos e verdades
- (X)   Typescript veio para substituir o javascript
- (V)   Posso usar o typescript junto com javascript no mesmo projeto
- (X|V) A produtividade com typescript diminui
- (X)   Preciso tipar todas as variáveis?
- (X)   Typescript veio para transformar JS em C# ou Java
- (X)   TypeScript auxilia no desenvolvimento

### Projeto proj_typescript
#### Dependências
- yarn init -y
- yarn add express -D
- yarn add @types/express -D
> necessário a instalação da dependência do typescript para que funcione
- yarn add typescript -D
> Iniciar o typescript
- yarn tsc --init
> Compilar o arquivo
- yarn tsc
  - vai gerar um arquivo js para que seja executado com
  - node pasta/nome-arquivo.js
##### Isso se torna muito verboso e burrocratico, então
- entra no arquivo tsconfig.json e configura uma pasta na propriedade 
  - "outDir": "./dist"
  - criará os arquivos compilados na raiz do projeto

