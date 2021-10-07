

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
- yarn add multer
- yarn add @types/multer
- yarn add csv-parse 
- yarn add swagger-ui-express
- yarn add @types/swagger-ui-express -D
- yarn add typeorm reflect-metadata
- yarn add pg
- yarn add tsyringe
- yarn add bcrypt
- yarn add @types/bcrypt -D

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

![Diagrama do projeto](../img/diagrama.png)

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
  
## Instalação do Docker

- O Docker é uma ferramenta sensacional que nos permite pular as etapas chatas de configuração de serviços para nossa aplicação. Além disso, ele permite reaproveitarmos o Kernel da máquina hospedeira entre vários serviços executados simultaneamente, conhecidos como containers.

- Para iniciar a instalação do Docker vamos prosseguir para a seção "Get Started" presente no site da ferramenta: 

- [Get Started with Docker | Docker](https://www.docker.com/get-started)

---

### Windows (64 Bit)

- O Docker no Windows possui alguns requisitos: 

- Microsoft Windows 10 Professional  ou Enterprise 64-bit
- Caso você possua o Windows 10 Home 64-bit também é possível usar o Docker mas será necessário instalar o WSL2 também (o instalador já se encarrega disso para você)

- Caso você possua o Windows 32-bit, não será possível realizar a instalação do Docker.

- Caso tenha todos requisitos, então faça a instalação do Docker para Windows:

- [Docker Desktop for Mac and Windows | Docker](https://www.docker.com/products/docker-desktop)

- Depois de instalar o Docker e abrir o software você já está pronto para continuar. Lembrando que essa versão do Docker para Windows tem uma interface visual muito bacana, ou seja, você pode usar a interface para visualizar os serviços sendo executados, logs, imagens e muito mais.

- Para verificar que o Docker foi instalado corretamente, em **uma nova janela** do terminal execute:

```bash
docker version
```

---

### Mac OSX

- No macOS o processo de instalação do Docker é extremamente simples, você precisa apenas baixar o app executável e executa-lo na máquina para iniciar o Docker:

- [Docker Desktop for Mac - Docker Hub](https://hub.docker.com/editions/community/docker-ce-desktop-mac)

- Depois de aberto você pode garantir que o Docker foi instalado corretamente executando o comando abaixo em uma nova janela do terminal:

```bash
docker version
```

---

### Linux (Ubuntu/Debian)

- No Linux, vamos instalar o Docker utilizando o `apt`, para isso, em seu terminal, execute os comandos abaixo:

```bash
sudo apt update
sudo apt remove docker docker-engine docker.io
sudo apt install docker.io
```

- Agora com o Docker instalado, vamos habilitar para que seu serviço seja iniciado automaticamente com o sistema:

```bash
sudo systemctl start docker
sudo systemctl enable docker
```

- Para garantir que o Docker foi instalado da forma correta, execute no terminal:

```bash
docker version
```

- Você precisará executar todos comandos do Docker utilizando o `sudo`, mas caso queira executa-los sem o `sudo`, utilize [esse guia](https://docs.docker.com/engine/install/linux-postinstall/#manage-docker-as-a-non-root-user).

## Instalação do Docker Compose

- Como visto durante as aulas, o Docker Compose precisará ser instalado apenas no Linux, já que nos demais sistemas ele já vem instalado junto com o Docker.

### Linux (Ubuntu/Debian)

- Rode o seguinte comando para instalar o Docker Compose:

```bash
sudo curl -L "https://github.com/docker/compose/releases/download/1.28.5/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
```

- Aplique as permissões necessárias ao binário:

```bash
sudo chmod +x /usr/local/bin/docker-compose
```

- Após isso, rode o comando `docker-compose --version` para assegurar que a instalação foi um sucesso. Caso retorne algum erro (mesmo reiniciando o terminal), crie um link simbólico para `usr/bin` com o seguinte comando:

```bash
sudo ln -s /usr/local/bin/docker-compose /usr/bin/docker-compose
```

- Por fim, teste novamente com o comando `docker-compose --version` para checar se está tudo funcionando.
### Comandos utilizados durante aplicação
- docker -v
- docker build -t rentx .
- docker run -p 3333:3333 rentx
- docker exec -it nome_container /bin/bash
- docker exec -it nome_container bash
- docker stop nome_container

### Dockerfile da aplicação
```
FROM node

WORKDIR /usr/app

COPY package.json ./

RUN npm install

COPY . .

EXPOSE 3333

CMD ["npm","run","dev"]
```

### docker-compose da aplicação
- docker-compose up
- **mostra logs do container em execução**
- docker logs nome-container -f 
- docker-compose up --force-recreate
- docker inspect --format='{{range.NetworkSettings.Networks}}{{.IPAddress}}{{end}}' rentx
- docker inspect --format='{{range.NetworkSettings.Networks}}{{.IPAddress}}{{end}}' database_ignite

```
version: "3.7"
services:
  app:
    build: .
    conatainer_name: rentx
    ports:
      - 3333:3333
    volumes:
      - .:/usr/app

```
- Habilitar para permitir decorators
	- "experimentalDecorators": true,  
	- "emitDecoratorMetadata": true,   

### Migrations
- Executando migrations
	- package.json 
```
"typeorm": "ts-node-dev ./node_modules/typeorm/cli"
```
- yarn typeorm migration:create -n CreateCategories
- yarn typeorm migration:run
- yarn typeorm migration:revert
- yarn typeorm migration:create -n CreateSpecifications
- yarn typeorm migration:create -n CreateUsers

