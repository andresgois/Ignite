const express = require('express');
const { v4:uuid4 } = require('uuid');
const app = express();
 
app.use(express.json());
//clientes
const customers = [];
/**
 * cpf - string
 * name - string
 * id - uuid
 * statement []
 */

app.post("/account", (request, response) => {
  const { cpf, name } = request.body;

  customerAlreadyExists = customers.some(
    (customer) => customer.cpf = cpf
  );

  if(customerAlreadyExists) {
    return response.status(400).json({ error: "Customer already exists!" });
  }

  customers.push({
    name,
    cpf,
    id: uuid4(),
    customers: []
  });

  return response.status(201).send();
})

app.listen(3333, () => {
  console.log("Server rodando");
}); 