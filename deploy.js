const spawn = require("child_process").spawn;
const ftp = require("basic-ftp");

require("dotenv").config();

let build = spawn("npm", ["run", "build"]);

build.stdout.on("data", d => {
    process.stdout.write(d);
});
build.stderr.on("data", d => {
    process.stderr.write(d);
});

build.on("close", (code) => {
    if (code !== 0) {
        console.error("😢 Something happenned. Can't upload.");
        process.exit(100);
    }

    console.log("\n\n🎉 Success! Let's try to put in on the internets now.");
    const c = new ftp.Client();
    c.ftp.verbose = false;
    c.access({
        host: process.env.HOST,
        user: process.env.FTP_USER,
        password: process.env.FTP_PASSWD
    }).then(_ => {
        console.log("Connected");
        return c.uploadFromDir("./public", "/public_html");
    }).then(result => {
        console.log(result);
        c.close();
        console.log("All done");
    });
});