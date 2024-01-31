require("dotenv").config();
const mongoose = require("mongoose");
const { faker } = require("@faker-js/faker");
const { cpf: cpfGenerator } = require("cpf-cnpj-validator");

const UserService = require("../../../src/services/user");
const User = require("../../../src/schemas/User");

const userMock = {
  name: faker.person.fullName(),
  email: faker.internet.email(),
  cpf: cpfGenerator.generate(),
  password: faker.internet.password(),
};

describe("Test integration between Service and database", () => {
  beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_DB_URL);
  });

  afterAll(async () => {
    await User.deleteMany({});
    await mongoose.connection.close();
  });

  test("Should create a new user", async () => {
    const createUser = await UserService.create({
      name: faker.person.fullName(),
      email: faker.internet.email(),
      cpf: cpfGenerator.generate(),
      password: faker.internet.password(),
    });

    expect(createUser).toHaveProperty("id");
  });
});
