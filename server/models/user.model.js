// const db = require("./");

module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("users", {
      id: {
       type: Sequelize.INTEGER,
       primaryKey: true,
       autoIncrement: true
      },
      name: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      password: {
        type: Sequelize.STRING
      },
      roleid: {
        type: Sequelize.INTEGER
      }
    });
  
    return User;
  };