onmessage = function (event) {
  // Send the result back to the main thread
  //This is how we seperate the multiple events name in this case i called event start so whenever start event called then it executes that code
  if (event?.data === "start") {
    console.log("worker start");
    let finalSum = 0;
    for (let i = 0; i < 10000000000; i++) {
      finalSum += i;
    }
    console.log("worker finish");
    postMessage(finalSum);
  }
};
