const express = require('express');

const app = express();

app.use(express.json());
// localhost:3333

/**
 * GET - Busca informação dentro do servidor
 * POST - Inserir uma informação
 * PUT - Altera um informação
 * PACTH - Altera uma informação especifica
 * DELETE - Deleta uma informação
 */

/**
 * Tipos de parâmetro
 * 
 * Route Params => identifica um recurso Editar/Deletar/Buscar
 * Query Params => Paginação/Filtro
 * Body Params => Os objetos inserção/alteração
 */

app.get("/", (request, response) => {
    //return response.send("Hello world");
    return response.json({message: "Hello world"});
});

app.get("/courses", (request, response) => {
    // ?id=50&nome=joao
    const query = request.query;
    console.log(query);
    return response.json(["Curso 1","Curso 2","Curso 3"]);
});

app.post("/courses", (request, response) => {
    const body = request.body;
    console.log(body);
    return response.json(["Curso 1","Curso 2","Curso 3","Curso 4"]);
});

app.put("/courses/:id", (request, response) => {
    const { id } = request.params;
    console.log(id);
    return response.json(["Curso 6","Curso 2","Curso 3","Curso 4"]);
});

app.patch("/courses/:id", (request, response) => {
    return response.json(["Curso 6","Curso 7","Curso 3","Curso 4"]);
});

app.delete("/courses/:id", (request, response) => {
    return response.json(["Curso 6","Curso 7","Curso 4"]);
});

app.listen(3333);