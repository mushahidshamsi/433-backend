const app = require("express")();
const { fork } = require("child_process");

app.get("/isprime", (req, res) => {
  console.log("id" + JSON.stringify(req.query.userId));
  const childProcess = fork("./reqHandling.js");
  childProcess.send({
    userId: req.query.userId,
    requestId: req.query.requestId,
    requestMsg: req.query.requestMsg,
  });
  childProcess.on("message", (message) => res.send(message));
});

app.listen(8081, () => console.log("Listening on 8081"));

/*

2367949 (16 ms)
43686389 (200 ms)
93686687 (500 ms)
936868033(4 seconds)
29355126551 (very long time)

*/
