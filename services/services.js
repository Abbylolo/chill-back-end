const connection = require("../app/database");

/**
 * 查询用户名在数据库中是否存在
 * @param username 用户名
 * @returns 匹配的用户信息/空
 */
function getUserByUsername(username) {
  connection.query("SELECT * FROM User", (err, results, fields) => {
    if (err) throw err;
    results.forEach((item) => {
      if (item.userName == username) {
        return item;
      }
    });
  });
}

function insertUserByUsername(username, password) {
  return;
}

module.exports = { getUserByUsername, insertUserByUsername };
