const { exec } = require("child_process");
const fs = require("fs");
const path = require("path");
const moment = require("moment");
const ynp1 = require("yn-p1/package.json");
const version = ynp1.version;

let mode = process.env.NODE_ENV;
let tag = process.env.tag;

let { log } = console;

let options = {
  maxBuffer: 100 * 1024 * 1024
};

exec(`vue-cli-service build`, options, (err, stdout) => {
  err && log(err);
  log(stdout);
  log("build dist over");

  // 给html写入版本信息
  let time = moment(Date.now()).format("YYYY-MM-DD HH:mm:ss");
  let extraInfo = `<!-- ${"mode:" + mode} ${
    process.env.LOG_STRING
  } time:${time} ${tag ? "tag:" + tag : ""} yn-p1: ${version} -->`;

  fs.appendFile(
    path.join(__dirname, "../dist/index.html"),
    extraInfo,
    "utf-8",
    function(err) {
      if (err) {
        log("dist/index.html版本信息写入失败！");
        log(err);
        return;
      }
      log("dist/index.html版本信息写入成功");
    }
  );
});
