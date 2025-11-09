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

// 测试数据库连接
try {
  connections.getConnection(function (err, conn) {
    if (err) {
      console.error("获取连接失败:", err);
    } else {
      console.log("数据库连接成功~");
      // 获取连接后记得释放回池中
      conn.release();
    }
  });
} catch (error) {
  console.error("数据库连接错误:", error);
}

// module.exports = connections.promise();
module.exports = connections;
