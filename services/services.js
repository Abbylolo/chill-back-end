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
 * @returns 摄影贴编号
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
    const sqlStr = `SELECT p.*,u.userId,u.userName,u.avatarUrl,u.brief as uBrief FROM User u,Post p  WHERE postId=
      ${postId} AND u.userId=p.User_userId;`;
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
 * 根据关键词搜索摄影贴
 * @param {String} keyword
 * @param {int} currentPage
 * @param {int} pageSize
 * @returns
 */
function getPostListByKeyword(keyword, currentPage, pageSize) {
  let sqlStr = "";
  if (keyword == "全部") {
    sqlStr = `SELECT p.*,u.userId,u.userName,u.avatarUrl,u.brief as uBrief FROM User u,Post p where u.userId=p.User_userId`;
  } else {
    sqlStr = `SELECT p.*,u.userId,u.userName,u.avatarUrl,u.brief as uBrief FROM User u,Post p where u.userId=p.User_userId AND (p.brief like "%${keyword}%" OR tags like "%${keyword}%")`;
  }
  return new Promise((resolve, reject) => {
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
      "UPDATE Post SET liker ='" +
      `${liker}` +
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

/**
 * 编辑摄影贴信息
 * @param {int} postId
 * @param {String} brief
 * @param {String} cameraInfo
 * @param {String} imgUrls
 * @param {String} parameter
 * @param {String} tags
 * @returns
 */
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

/**
 * 获取全部摄影圈列表
 * @returns 摄影圈列表
 */
function getAllCircleList() {
  const sqlStr = "SELECT * FROM Circle;";
  return new Promise((resolve, reject) => {
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
 * 创建一个摄影圈
 * @param {int} userId
 * @param {String} name
 * @param {String} brief
 * @param {String} avatarUrl
 * @returns 摄影圈编号
 */
function insertCircle(userId, name, brief, avatarUrl, createTime) {
  const sqlStr =
    "INSERT INTO Circle (`creator`,`name`,`brief`,`avatarUrl`,`createTime`) VALUES('" +
    `${userId}` +
    "','" +
    `${name}` +
    "','" +
    `${brief}` +
    "','" +
    `${avatarUrl}` +
    "','" +
    `${createTime}` +
    "');";
  return new Promise((resolve, reject) => {
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
 * 删除一个摄影圈
 * @param {int} circleId
 * @returns
 */
function deleteCircle(circleId) {
  return new Promise((resolve, reject) => {
    const sqlStr = `DELETE FROM Circle WHERE circleId=${circleId};`;
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
 * 设置摄影圈信息
 * @param {int} circleId
 * @param {String} name
 * @param {String} brief
 * @param {String} avatarUrl
 * @returns
 */
function updateCircle(circleId, name, brief, avatarUrl) {
  return new Promise((resolve, reject) => {
    const sqlStr =
      "UPDATE Circle SET brief ='" +
      `${brief}` +
      "',name='" +
      `${name}` +
      "',avatarUrl='" +
      `${avatarUrl}` +
      "' WHERE `circleId`='" +
      `${circleId}` +
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

/**
 * 获取摄影圈详情
 * @param {int} circleId
 * @returns
 */
function getCircleDetail(circleId) {
  return new Promise((resolve, reject) => {
    const sqlStr = "SELECT * FROM Circle WHERE circleId=" + `${circleId}` + ";";
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
 * 改变摄影圈圈友
 * @param {int} circleId
 * @param {String} fans
 * @returns
 */
function changeCircleFans(circleId, fans) {
  const sqlStr =
    "UPDATE Circle SET fans ='" +
    `${fans}` +
    "' WHERE `circleId`='" +
    `${circleId}` +
    "';";
  return new Promise((resolve, reject) => {
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
 * 获取摄影圈中的摄影贴列表
 * @param {int} circleId
 * @returns 摄影贴列表
 */
function getCirclePostList(circleId) {
  return new Promise((resolve, reject) => {
    const sqlStr =
      "SELECT * FROM User u,Post p WHERE u.userId=p.User_userId AND Circle_circleId=" +
      `${circleId}` +
      ";";
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
  insertCircle,
  getAllCircleList,
  changeCircleFans,
  getCirclePostList,
  updateCircle,
  getCircleDetail,
  getPostListByKeyword,
  deleteCircle,
};
