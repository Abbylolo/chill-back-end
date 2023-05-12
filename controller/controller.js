const db = require("../services/services");
let OSS = require("ali-oss");
const path = require("path");
const fs = require("fs");
const { log } = require("console");

class appController {
  /* 登录注册模块 */
  // 处理注册的业务逻辑
  async handleRegister(req, res) {
    // 1、获取前端传过来的数据
    // 2、校验注册信息是否符合标准
    // 3、从数据库校验用户是否注册过
    // 4、保存进数据库
    // 5、返回用户信息
    const { username, password, brief, avatarUrl } = req.body;
    try {
      await db.insertUser(username, password, brief, avatarUrl);
      const dbRes = await db.getUserByUsername(username);
      res.json({
        code: 200,
        data: dbRes[0],
        msg: "注册成功",
      });
    } catch (error) {
      res.status(500).send("服务器出问题:" + error);
    }
  }

  // 处理登录的业务逻辑
  async handleLogin(req, res) {
    const { username, password } = req.body;
    try {
      const dbRes = await db.getUserByUsername(username);
      if (dbRes.length !== 0 && dbRes[0].password == password) {
        res.json({
          code: 200,
          data: dbRes[0],
          msg: "登录成功",
        });
      } else {
        res.json({
          code: -1,
          msg: "用户名或密码错误",
        });
      }
    } catch (error) {
      res.status(500).send("服务器出问题:" + error);
    }
  }

  // 处理图片上传的业务逻辑
  async uploadPic(req, res) {
    let client = new OSS({
      // yourRegion填写Bucket所在地域。以华东1（杭州）为例，Region填写为oss-cn-hangzhou。
      region: "oss-cn-hangzhou",
      // 阿里云账号AccessKey拥有所有API的访问权限，风险很高。强烈建议您创建并使用RAM用户进行API访问或日常运维，请登录RAM控制台创建RAM用户。
      accessKeyId: "LTAI5t81hRNQYoT6ZSL4iRXR",
      accessKeySecret: "9TekM1hWC5x2VeGnFMQH6J21sXCWVT",
      bucket: "chill-pic",
      secure: true, //开启https
    });

    const headers = {
      // 指定该Object被下载时网页的缓存行为。
      // 'Cache-Control': 'no-cache',
      // 指定该Object被下载时的名称。
      // 'Content-Disposition': 'oss_download.txt',
      // 指定该Object被下载时的内容编码格式。
      // 'Content-Encoding': 'UTF-8',
      // 指定过期时间。
      // 'Expires': 'Wed, 08 Jul 2022 16:57:01 GMT',
      // 指定Object的存储类型。
      // 'x-oss-storage-class': 'Standard',
      // 指定Object的访问权限。
      // 'x-oss-object-acl': 'private',
      // 设置Object的标签，可同时设置多个标签。
      // 'x-oss-tagging': 'Tag1=1&Tag2=2',
      // 指定CopyObject操作时是否覆盖同名目标Object。此处设置为true，表示禁止覆盖同名Object。
      // 'x-oss-forbid-overwrite': 'true',
    };
    // 文件路径
    var filePath = "./" + req.files[0].path;
    // 文件类型
    var temp = req.files[0].originalname.split(".");
    var fileType = temp[temp.length - 1];
    var lastName = "." + fileType;
    var picName = req.files[0].filename;
    // 构建图片名
    var fileName = picName + lastName;
    // 图片重命名
    fs.rename(filePath, "./public/image/" + fileName, async (err) => {
      if (err) {
        return "";
      } else {
        var localFile = "./public/image/" + fileName;
        var key = fileName;
        try {
          // 填写OSS文件完整路径和本地文件的完整路径。OSS文件完整路径中不能包含Bucket名称。
          // 如果本地文件的完整路径中未指定本地路径，则默认从示例程序所属项目对应本地路径中上传文件。
          const result = await client.put(key, path.normalize(localFile));
          // const result = await client.put('exampleobject.txt', path.normalize('D:\\localpath\\examplefile.txt'), { headers });
          fs.unlink(localFile, (err) => {
            if (err) {
              throw err;
            }
          });
          res.send({
            code: 200,
            data: result.url,
          });
        } catch (error) {
          res.status(500).send("服务器出问题:" + error);
        }
      }
    });
  }

  /* 摄影圈模块 */
  // 查询摄影贴列表
  async getAllCircleList(req, res) {
    const { userId } = req.body;
    try {
      const allCircleList = await db.getAllCircleList();
      let circleList = [];
      for (let i = 1; i < allCircleList.length; i++) {
        const circle = allCircleList[i];
        // 添加状态 0-未加入的的；1-加入的；2-用户创建的
        circle.state = 0;
        // 粉丝列表 字符转数组
        circle.fans = strToArray(circle.fans);

        if (circle.creator == userId) {
          circle.state = 2;
        }

        circle.fansNum = circle.fans.length;
        if (circle.fans.includes(userId.toString())) {
          circle.state = 1;
        }
        circleList.push(circle);
      }

      res.json({
        code: 200,
        allCircleList: circleList,
        msg: "已查询到全部摄影圈",
      });
    } catch (error) {
      res.status(500).send("服务器出问题:" + error);
    }
  }

  // 创建摄影圈
  async createCircle(req, res) {
    const { userId, name, brief, avatarUrl } = req.body;
    const createTime = new Date().Format("yyyy年MM月dd日 HH:mm:ss");
    try {
      const dbRes = await db.insertCircle(
        userId,
        name,
        brief,
        avatarUrl,
        createTime
      );
      res.json({
        code: 200,
        circleId: dbRes,
        msg: "成功创建摄影圈",
      });
    } catch (error) {
      res.status(500).send("服务器出问题:" + error);
    }
  }

  // 改变摄影圈圈友信息
  async changeCircleFans(req, res) {
    const { circleId, fans } = req.body;
    const fansStr = arrayToStr(fans);
    try {
      await db.changeCircleFans(circleId, fansStr);
      res.json({
        code: 200,
        msg: "摄影圈圈友数据更新成功",
      });
    } catch (error) {
      res.status(500).send("服务器出问题:" + error);
    }
  }

  /* 摄影贴模块 */
  // 查询摄影贴详情
  async getPostByPostId(req, res) {
    const { postId } = req.body;
    try {
      const dbRes = await db.getPostByPostId(postId);
      const postDetail = dbRes[0];
      postDetail.tags = strToArray(postDetail.tags);
      postDetail.imgUrls = strToArray(postDetail.imgUrls);
      res.json({
        code: 200,
        data: postDetail,
        msg: "查询摄影贴成功",
      });
    } catch (error) {
      res.status(500).send("服务器出问题:" + error);
    }
  }

  // 查询用户摄影贴列表
  async getUserPostList(req, res) {
    const { userId } = req.body;
    try {
      const dbRes = await db.getPostListByUserId(userId);
      dbRes.forEach((item) => {
        item.tags = strToArray(item.tags);
        item.imgUrls = strToArray(item.imgUrls);
        item.liker = strToArray(item.liker);
        // liked - 该用户是否点赞该帖子
        item.liked = false;
        item.liker.forEach((likeUser) => {
          if (likeUser == userId.toString()) {
            item.liked = true;
          }
        });
      });
      // 按时间倒序返回
      dbRes.reverse();
      res.json({
        code: 200,
        data: dbRes,
        msg: "查询成功",
      });
    } catch (error) {
      res.status(500).send("服务器出问题:" + error);
    }
  }

  // 发布摄影贴
  async addPost(req, res) {
    const { brief, cameraInfo, imgUrls, parameter, tags, userId, circleId } =
      req.body;
    // 图片数组字符化
    const imgUrlStr = arrayToStr(imgUrls);
    // 标签数组字符化
    const tagStr = arrayToStr(tags);
    // 摄影圈编号处理
    let cId = circleId;
    if (!cId) {
      cId = 1;
    }
    // 获取当前时间
    var createTime = new Date().Format("yyyy年MM月dd日 HH:mm:ss");
    try {
      const postId = await db.insertPost(
        brief,
        cameraInfo,
        imgUrlStr,
        parameter,
        tagStr,
        userId,
        createTime,
        cId
      );
      res.json({
        code: 200,
        postId,
        msg: "发布摄影贴成功",
      });
    } catch (error) {
      res.status(500).send("服务器出问题:" + error);
    }
  }

  // 删除摄影贴
  async deletePost(req, res) {
    const { postId } = req.body;
    try {
      await db.deletePost(postId);
      res.json({
        code: 200,
        msg: "删除摄影贴成功",
      });
    } catch (error) {
      res.status(500).send("服务器出问题:" + error);
    }
  }

  // 点赞摄影贴
  async likePost(req, res) {
    const { userId, postId, flag } = req.body;
    try {
      let liker = "";
      let oldLiker = await db.getPostByPostId(postId);
      oldLiker = strToArray(oldLiker[0].liker) || [];

      if (flag) {
        oldLiker.push(userId);
      } else {
        remove(oldLiker, userId);
      }

      liker = arrayToStr(oldLiker);

      await db.alterPostLiker(postId, liker);
      res.json({
        code: 200,
        msg: "摄影贴点赞状态已更新",
      });
    } catch (error) {
      res.status(500).send("服务器出问题:" + error);
    }
  }

  // 编辑摄影贴
  async editPost(req, res) {
    const { postId, brief, cameraInfo, imgUrls, parameter, tags } = req.body;
    // 图片数组字符化
    const imgUrlStr = arrayToStr(imgUrls);
    // 标签数组字符化
    console.log("tags", tags);
    const tagStr = arrayToStr(tags);
    console.log("tagStr", tagStr);

    try {
      await db.editPost(
        postId,
        brief,
        cameraInfo,
        imgUrlStr,
        parameter,
        tagStr
      );
      res.json({
        code: 200,
        msg: "编辑摄影贴成功",
      });
    } catch (error) {
      res.status(500).send("服务器出问题:" + error);
    }
  }
}

/* 日期格式化方法 */
Date.prototype.Format = function (fmt) {
  var o = {
    "M+": this.getMonth() + 1, //月份
    "d+": this.getDate(), //日
    "H+": this.getHours(), //小时
    "m+": this.getMinutes(), //分
    "s+": this.getSeconds(), //秒
    "q+": Math.floor((this.getMonth() + 3) / 3), //季度
    S: this.getMilliseconds(), //毫秒
  };
  if (/(y+)/.test(fmt))
    fmt = fmt.replace(
      RegExp.$1,
      (this.getFullYear() + "").substr(4 - RegExp.$1.length)
    );
  for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt))
      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length)
      );
  return fmt;
};

// 删除数组指定值元素
function remove(arr, item) {
  for (var i = 0; i < arr.length; i++) {
    if (arr[i] == item) {
      //从i出开始删除1个元素
      arr.splice(i, 1);
      i--;
    }
  }
  return arr;
}

// 数组转字符串
function arrayToStr(arr) {
  if (arr.length == 0) {
    return "";
  }
  let str = "";
  arr.forEach((item) => {
    str += item + ",";
  });
  return str;
}

// 字符串转数组
function strToArray(str) {
  if (!str || str == null || str == "") {
    return [];
  }
  let arr = str.split(",");
  if (arr.length > 1) {
    arr.splice(arr.length - 1, 1);
  }

  return arr;
}

//appController是一个类，所以需要new一个实例对象出来
module.exports = new appController();
