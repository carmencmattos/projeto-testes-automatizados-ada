const User = require("../schemas/User");

class UserService {
<<<<<<< HEAD
    static async createUser({ name, email, password }) {
        const { id } = await User.create({
            name,
            email,
            password
        })
        
        console.log("olha o id aquiii: " + id);
=======
  static async createUser({ name, email, password }) {
    const { id } = await User.create({
      name,
      email,
      password,
    });
    console.log(id + " dentro createUser");
    return { id };
  }
>>>>>>> refs/remotes/origin/main

  static async userExistsAndCheckPassword({ email, password }) {
    const user = await User.findOne({ email });

    if (!user) {
      return false;
    }

    if (password !== user.password) {
      throw { status: 400, message: "As senhas não batem" };
    }

    return true;
  }
}

module.exports = UserService;
