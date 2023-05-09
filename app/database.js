const mysql = require("mysql2");
const {
  MYSQL_host,
  MYSQL_user,
  MYSQL_password,
  MYSQL_port,
  MYSQL_database,
  MYSQL_waitForConnections,
  MYSQL_connectionLimit,
  MYSQL_queueLimit,
} = require("./config");

const connections = mysql.createPool({
  host: MYSQL_host,
  user: MYSQL_user,
  password: MYSQL_password,
  port: MYSQL_port,
  database: MYSQL_database,
  waitForConnections: MYSQL_waitForConnections,
  connectionLimit: MYSQL_connectionLimit,
  queueLimit: MYSQL_queueLimit,
});

connections.getConnection(function (err, conn) {
  conn.connect((err) => {
    if (err) {
      console.log("连接失败", err);
    } else {
      console.log("数据库连接成功~");
    }
  });
});

// module.exports = connections.promise();
module.exports = connections;
