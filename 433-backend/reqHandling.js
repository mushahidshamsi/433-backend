"use strict";
var reqObj = require("./database");
var mongoose = require("mongoose");

async function run(userId, requestId, requestMsg, reqDT) {
  var msg = "";
  console.log(userId);
  const doc = {
    userId: userId,
    requestId: requestId,
    requestMsg: requestMsg,
    reqDT: reqDT,
  };
  await mongoose.connect(
    "mongodb+srv://mushahidshamsi:Mujtaba%2306@cluster0.hyfz5xj.mongodb.net/?retryWrites=true&w=majority"
  );
  await reqObj.insertMany(doc, function (err) {
    if (err) return err;
    else {
      reqObj.find(
        { userId: userId },
        { reqId: reqId },
        { reqDt: reqDT },
        function (err, result) {
          if (err) {
            console.log(err);
          } else if (result == null) {
            reqObj.find({ reqId: reqId }, function (err, result) {
              if (err) {
                console.log(err);
              } else {
                return {
                  msg: result.reqMsg,
                };
              }
            });
          } else {
            return {
              msg: "duplicate request!",
            };
            console.log("Second function call : ", docs);
          }
        }
      );
      return {
        msg: "request registered!",
      };
    }
  });
  process.send("request registered");
  process.exit();
  //return connection.close();
}

process.on("message", (message) => {
  var reqDT = new Date();
  console.log(message.requestId);
  const jsonResponse = run(
    message.userId,
    message.requestId,
    message.requestMsg,
    reqDT
  );
  //process.send(jsonResponse);
});

function isPrime(number) {
  let startTime = new Date();
  let endTime = new Date();
  let isPrime = true;
  for (let i = 3; i < number; i++) {
    //it is not a prime break the loop,
    // see how long it took
    if (number % i === 0) {
      endTime = new Date();
      isPrime = false;
      break;
    }
  }

  if (isPrime) endTime = new Date();

  return {
    number: number,
    isPrime: isPrime,
    time: endTime.getTime() - startTime.getTime(),
  };
}
