const jwt = require("../../../src/middlewares/auth");

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
});
