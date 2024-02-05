require("dotenv").config();
const jwt = require("jsonwebtoken");
const SessionService = require("../../../src/services/session-service");

const mockedEmail = { email: "test@example.com" };
const mockedSecret = "security-secret";

describe("SessionService", () => {
  jest.spyOn(SessionService, "generateToken");

  it("should generate a valid JWT token", () => {
    const token = SessionService.generateToken(mockedEmail.email);

    expect(token).toBeDefined();

    const decoded = jwt.verify(token, mockedSecret);
    expect(decoded.email).toBe(mockedEmail.email);
  });

  it("should expire the token after thirty seconds", async () => {
    jest.useFakeTimers();
    /* explicação da função: 
        useFakeTimers para simular o tempo, essa função funciona da seguinte forma:
        jest.useFakeTimers() - ativa a simulação de tempo
        jest.advanceTimersByTime(1000) - avança o tempo em 1 segundo

        suondo que o tenhamos uma função que espera 2 segundos para executar, podemos avançar o tempo em 2 segundos e a função será executada.

        o pessoal da squad usa muito essa função.
      */

    const SECONDS = {
      two: 2 * 1000,
      twentyNine: 29 * 1000,
    };

    const token = SessionService.generateToken({ mockedEmail });

    jest.advanceTimersByTime(SECONDS.twentyNine);
    expect(() => jwt.verify(token, mockedSecret)).not.toThrow();

    jest.advanceTimersByTime(SECONDS.two);
    expect(() => jwt.verify(token, mockedSecret)).toThrow("jwt expired");

    jest.useRealTimers();
  });
});
