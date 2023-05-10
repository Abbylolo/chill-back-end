const connection = require("../app/database");

/**
 * 查询用户名在数据库中是否存在
 * @param username 用户名
 * @returns 匹配的用户信息/空
 */
function getUserByUsername(username) {
  return new Promise((resolve, reject) => {
    const sqlStr = "SELECT * FROM User where userName='" + `${username}` + "'";
    connection.query(sqlStr, (err, results, fields) => {
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
}

/**
 * 插入一条用户信息
 * @param username
 * @param password
 * @returns
 */
function insertUser(username, password, brief, avatarUrl) {
  return new Promise((resolve, reject) => {
    const sqlStr =
      "INSERT INTO User  (`userName`,`avatarUrl`,`brief`,`password`) VALUES('" +
      `${username}` +
      "','" +
      `${avatarUrl}` +
      "','" +
      `${brief}` +
      "','" +
      `${password}` +
      "');";
    connection.query(sqlStr, (err, results, fields) => {
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
}

module.exports = { getUserByUsername, insertUser };
