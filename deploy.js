#! /bin/node
const { exec } = require("child_process");
const FtpDeploy = require("ftp-deploy");
const ftpDeploy = new FtpDeploy();

let config = {
  user: "gatsbydeploy@javascripteverything.com",
  password: "Depl0yNow!",
  host: "ftp.javascripteverything.com",
  port: 21,
  localRoot: `${__dirname}/public`,
  remoteRoot: "/public_html/",
  include: ["*.*"],
  deleteRemote: false
};

console.log("Packaging...");

exec("gatsby build", (result) => {
  console.log("Packed and ready to go");
  ftpDeploy.deploy(config).then(r => {
    console.log("All done!");
  });
});
