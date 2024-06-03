import React, { useEffect, useState } from "react";

const MainFile = () => {
  const [sum, setSum] = useState(0);
  const [workerInstance, setWorkerInstance] = useState(null);
  const [colorText, setColorText] = useState(null);

  //Heavy calculation that block the main thread of browser
  const handleCalculationSum = () => {
    if (workerInstance) {
      workerInstance.postMessage("start");
    }
  };

  const handleChangeColor = () => {
    const red = Math.floor(Math.random() * 256);
    const green = Math.floor(Math.random() * 256);
    const blue = Math.floor(Math.random() * 256);
    setColorText("rgb(" + red + ", " + green + ", " + blue + ")");
  };

  useEffect(() => {
    const worker = new Worker(new URL("./worker.js", import.meta.url));

    worker.onmessage = function (message) {
      setSum(message.data);
    };

    setWorkerInstance(worker);

    //Terminate on unmount
    return () => {
      worker.terminate();
    };
  }, []);

  return (
    <div>
      <button onClick={handleCalculationSum}>Calculate Sum</button>
      <div>total: {sum}</div>
      <div>Background color</div>

      <h3>We can change the color until worker working in the background</h3>
      <button onClick={handleChangeColor}>Change color</button>
      <h2 style={{ ...(colorText ? { color: colorText } : {}) }}>
        Change of text color
      </h2>
    </div>
  );
};

export default MainFile;
