var express = require("express");
var fs = require("fs");
var path = require("path");
var bodyParser = require("body-parser");
const axios = require("axios");
var cfg = require("./data.config.json");
var cfg1 = require("./data1.config.json");
var app = express();
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);

function Login(pwd) {
  if (pwd == "de074ff674dde2a1f3b243c2a749abe8") {
    return 0;
  }
  if (pwd == "68c7f78d53fc6cb65ba5aae6f44c4036") {
    return 1;
  }
  return -1;
}
// 访问静态资源
app.use(express.static(path.resolve(__dirname, "../dist")));
// 访问单页
app.get("/", function (req, res) {
  var html = fs.readFileSync(
    path.resolve(__dirname, "../dist/index.html"),
    "utf-8"
  );
  res.send(html);
});
//get请求
app.get("/type", function (req, res) {
  var params = req.query;
  var src = 0;
  if (params.src.length > 1) {
    for (var i = 0; i < cfg.urls.length; i++) {
      if (cfg.urls[i].name == params.src) {
        src = i;
        break;
      }
    }
  } else {
    src = params.src;
  }
  var lv = Login(params.pwd);
  if (lv >= 0) {
    axios
      .get(cfg.urls[src].url, {
        params: { ac: "list" },
      })
      .then(function (response) {
        res.json(response.data.class);
      })
      .catch(function (error) {
        console.log(error);
      });
  } else {
    console.log("当前用户没有权限！");
  }
  //next();
});
//
/**
 * pwd
 * wd
 * pg
 * tp
 * src
 */
app.get("/lux", function (req, res) {
  var params = req.query;
  var src = 0;
  if (params.src.length > 1) {
    for (var i = 0; i < cfg.urls.length; i++) {
      if (cfg.urls[i].name == params.src) {
        src = i;
        break;
      }

    }
  } else {
    src = params.src;
  }

  var lv = Login(params.pwd);
  if (lv >= 0) {
    axios
      .get(cfg.urls[src].url, {
        params: { ac: "detail", wd: params.wd, pg: params.pg, t: params.tp },
      })
      .then(function (response) {
        res.json(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  } else {
    console.log("当前用户没有权限！");
  }
  //next();
});
//
app.get("/login", function (req, res) {
  var params = req.query;
  var lv = Login(params.pwd);
  if (lv >= 0) {
    if (lv == 0) {
      res.json(cfg);
      console.log('管理员登录')
    } else {
      res.json(cfg1);
      console.log('会员登录')
    }
  } else {
    res.send(null);
  }
});
// 监听
app.listen(80, function () {
  var port = this.address().port;
  console.log("访问地址为 %s", port);
});

/*
var SqliteDB = require('./sqlite.js').SqliteDB;
var file = "data.db";
var sqliteDB = new SqliteDB(file);
var createTileTableSql = "create table if not exists tiles(level INTEGER, column INTEGER, row INTEGER, content BLOB);";
var createLabelTableSql = "create table if not exists labels(level INTEGER, longitude REAL, latitude REAL, content BLOB);";
sqliteDB.createTable(createTileTableSql);
sqliteDB.createTable(createLabelTableSql);
/// insert data.
var tileData = [[1, 10, 10], [1, 11, 11], [1, 10, 9], [1, 11, 9]];
var insertTileSql = "insert into tiles(level, column, row) values(?, ?, ?)";
sqliteDB.insertData(insertTileSql, tileData);
/// query data.
var querySql = 'select * from tiles where level = 1 and column >= 10 and column <= 11 and row >= 10 and row <=11';
sqliteDB.queryData(querySql, dataDeal);
/// update data.
var updateSql = 'update tiles set level = 2 where level = 1 and column = 10 and row = 10';
sqliteDB.executeSql(updateSql);
/// query data after update.
querySql = "select * from tiles where level = 2";
sqliteDB.queryData(querySql, dataDeal);
sqliteDB.close();
function dataDeal(objects) {
  for (var i = 0; i < objects.length; ++i) {
    console.log(objects[i]);
  }
}
*/
