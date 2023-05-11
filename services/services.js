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
 * @param username 入驻者名称
 * @param password 入驻者密码
 * @param brief 简介
 * @param avatarUrl 头像地址
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

/**
 * 插入一条摄影贴
 * @param brief 简介
 * @param cameraInfo 拍摄设备信息
 * @param imgUrls 图片存储地址
 * @param parameter 图片参数
 * @param tags 标签
 * @param userId 入驻者编号
 * @param createTime 创建时间
 * @param circleId 摄影圈编号
 * @returns
 */
function insertPost(
  brief,
  cameraInfo,
  imgUrls,
  parameter,
  tags,
  userId,
  createTime,
  circleId
) {
  return new Promise((resolve, reject) => {
    const sqlStr =
      "INSERT INTO Post  (`brief`,`cameraInfo`,`imgUrls`,`parameter`,`tags`,`User_userId`,`createTime`,`Circle_circleId`) VALUES('" +
      `${brief}` +
      "','" +
      `${cameraInfo}` +
      "','" +
      `${imgUrls}` +
      "','" +
      `${parameter}` +
      "','" +
      `${tags}` +
      "','" +
      `${userId}` +
      "','" +
      `${createTime}` +
      "','" +
      `${circleId}` +
      "');";
    connection.query(sqlStr, (err, results, fields) => {
      if (err) {
        reject(err);
      } else {
        resolve(results.insertId);
      }
    });
  });
}

/**
 * 删除一条摄影贴
 * @param {int} postId 摄影贴编号
 * @returns
 */
function deletePost(postId) {
  return new Promise((resolve, reject) => {
    const sqlStr = "DELETE FROM Post WHERE postId=" + `${postId}` + ";";
    connection.query(sqlStr, (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
}

/**
 * 获取摄影贴详情
 * @param postId 摄影贴编号
 * @returns 摄影贴详情
 */
function getPostByPostId(postId) {
  return new Promise((resolve, reject) => {
    const sqlStr = "SELECT * FROM Post WHERE postId='" + `${postId}` + "'";
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
 * 获取入驻者摄影贴列表
 * @param {String} userId 入驻者编号
 * @returns 摄影贴列表
 */
function getPostListByUserId(userId) {
  return new Promise((resolve, reject) => {
    const sqlStr = "SELECT * FROM Post where User_userId=" + `${userId}` + ";";
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
 * 更新摄影贴点赞者
 * @param {int} postId
 * @param {String} liker
 * @returns
 */
function alterPostLiker(postId, liker) {
  return new Promise((resolve, reject) => {
    const sqlStr =
      "UPDATE Post SET liker =" +
      `${liker}` +
      " WHERE `postId`='" +
      `${postId}` +
      "';";
    connection.query(sqlStr, (err, results, fields) => {
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
}

function editPost(postId, brief, cameraInfo, imgUrls, parameter, tags) {
  return new Promise((resolve, reject) => {
    const sqlStr =
      "UPDATE Post SET brief ='" +
      `${brief}` +
      "',cameraInfo='" +
      `${cameraInfo}` +
      "',imgUrls='" +
      `${imgUrls}` +
      "',parameter='" +
      `${parameter}` +
      "',tags='" +
      `${tags}` +
      "' WHERE `postId`='" +
      `${postId}` +
      "';";
    connection.query(sqlStr, (err, results, fields) => {
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
}

module.exports = {
  getUserByUsername,
  insertUser,
  insertPost,
  getPostByPostId,
  getPostListByUserId,
  deletePost,
  alterPostLiker,
  editPost,
};
