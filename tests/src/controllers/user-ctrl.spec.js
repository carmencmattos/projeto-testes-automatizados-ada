const SessionController = require("../../../src/controllers/session-ctrl");
const UserController = require("../../../src/controllers/user-ctrl");
const SessionService = require("../../../src/services/session-service");
const UserService = require("../../../src/services/user-service");
const User = require("../../../src/schemas/User");

describe("UserController", () => {
  const resMock = {
    status: jest.fn(() => resMock),
    json: jest.fn(),
  };
  const reqMock = {
    body: { email: "ada", password: "senha" },
  };

  const reqMock2 = {
    body: { email: "ada@email.com", password: "" },
  };

  const reqMock3 = {
    body: { name: "Boticario", email: "boti@email.com", password: "1234" },
  };

  describe("Create", () => {
    jest.mock("../../../src/services/user-service");

    it(`should return status 400`, async () => {
      await UserController.create(reqMock, resMock);

      expect(resMock.status).toHaveBeenCalledWith(400);
    });
    it(`should return message "Email"`, async () => {
      await UserController.create(reqMock, resMock);

      expect(resMock.json).toHaveBeenCalledWith("Email inválido");
    });

    it(`should return "senha inválida"`, async () => {
      await UserController.create(reqMock2, resMock);

      expect(resMock.json).toHaveBeenCalledWith("Senha inválida");
    });

    it(`should return status "200" and id generated`, async () => {
      const spy = jest.spyOn(UserService, "createUser");
      spy.mockReturnValue({ id: "1" });
      await UserController.create(reqMock3, resMock);

      expect(resMock.json).toHaveBeenCalledWith({ id: "1" });
      expect(resMock.status).toHaveBeenCalledWith(200);
    });

    it(`should return status "500"`, async () => {
      const spy = jest.spyOn(UserService, "createUser");
      spy.mockImplementation(() => {
        throw new Error("Erro no servidor");
      });

      await UserController.create(reqMock3, resMock);

      expect(resMock.json).toHaveBeenCalledWith("Erro no servidor");
      expect(resMock.status).toHaveBeenCalledWith(500);
    });
  });

  describe("changePassword", () => {
    it(`should return status "200" on changePassword`, async () => {
      await UserController.changePassword(reqMock3, resMock);
      expect(resMock.json).toHaveBeenCalledWith({ message: "ok" });
      expect(resMock.status).toHaveBeenCalledWith(200);
    });
  });
});
