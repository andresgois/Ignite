import request from 'supertest';
import { hash } from 'bcryptjs';
import { v4 as uuidV4 } from "uuid";
import { app } from '@shared/infra/http/app';
import createConnection from "@shared/infra/typeorm";
import { Connection } from 'typeorm';


let connection: Connection;

describe("Create category controller", () => {

  beforeAll( async () => {
    connection = await createConnection();
    await connection.runMigrations();

    const id = uuidV4();
    const password = await hash("admin", 8);

    await connection.query(
      `
      INSERT INTO USERS (id, name, email, password, "isAdmin", created_at, driver_license)
      values
      ('${id}','admin','admin@rentx.com.br','${password}', true, 'now()', 'XXXXXX')
      `
    );
  });
  
  afterAll( async () => {
    await connection.dropDatabase();
    await connection.close();
  });

  it("Shold be able to crate a new category", async () => {
    const responseToken = await request(app).post("/session").send({
      email: "admin@rentx.com.br",
      password: "admin"
    });

    //console.log(responseToken.body);
    const { token } = responseToken.body;

    const response = await request(app).post("/categories").send({
      name: "Category Supertest",
      description: "Category Supertest",
    }).set({
      Authorization: `Bearer ${token}`,
    })

    expect(response.status).toBe(201);
  });

  it("Shold not be able to crate a new category with name exists", async () => {
    const responseToken = await request(app).post("/session").send({
      email: "admin@rentx.com.br",
      password: "admin"
    });

    const { token } = responseToken.body;

    const response = await request(app).post("/categories").send({
      name: "Category Supertest",
      description: "Category Supertest",
    }).set({
      Authorization: `Bearer ${token}`,
    })

    expect(response.status).toBe(400);
  });

});
