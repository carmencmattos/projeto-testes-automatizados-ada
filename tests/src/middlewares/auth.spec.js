require("dotenv").config();
const jwt = require("../../../src/middlewares/auth");
const SessionService = require("../../../src/services/session-service");

class ResMock {
  _status;
  status(value) {
    this._status = value;
    return this;
  }
  json(value) {}
}

describe("Authenticate jwt", () => {
  it("should return status 401 ", () => {
    const req = {
      headers: {},
    };
    const res = new ResMock();
    const next = () => {};

    jwt(req, res, next);

    expect(res._status).toEqual(401);
  });

  it("should call the next fuction ", () => {
   
    const token = SessionService.generateToken({
      email: "carol@gmail.com",
    });
    const req = {
      headers: {
        authorization: token,
        
      },
    };
    const res = new ResMock();
    const next = () => {};
    const spy = jest.spyOn(res, "status")
    jwt(req, res, next);

    expect(spy).not.toHaveBeenCalled();
  });
});
