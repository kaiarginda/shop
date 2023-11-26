// "use client";
// import React from "react";
// import { useState } from "react";
// const RenderHello = ({ name }) => {
//   const [show, setShow] = useState(true);
//   setTimeout(() => {
//     setShow(false);
//   }, 4000);

//   return (
//     <div>
//       <div className="">
//         {show ? (
//           <h1 className="text-3xl font-bold text-green-500 text-center p-4">
//             {`Welcome, ${name}`}{" "}
//           </h1>
//         ) : null}
//       </div>
//     </div>
//   );
// };

// export default RenderHello;
"use client";
import React, { useState, useEffect } from "react";

const RenderHello = ({ name }) => {
  const [show, setShow] = useState(true);
  const [lineWidth, setLineWidth] = useState("100%");

  useEffect(() => {
    setTimeout(() => {
      setShow(false);
    }, 8000);

    // Start reducing the line width
    const lineTimer = setInterval(() => {
      setLineWidth((prevWidth) => {
        // Reduce the width gradually
        const newWidth = parseInt(prevWidth) - 1;
        return newWidth + "%";
      });
    }, 40); // Adjust the interval for smoother animation

    // Stop the line animation after 4 seconds
    setTimeout(() => {
      clearInterval(lineTimer);
    }, 4000);

    return () => {
      clearInterval(lineTimer);
    };
  }, []);

  return (
    <div>
      <div className="">
        {show ? (
          <h1 className="text-3xl font-bold text-green-500 text-center p-4">
            {`Welcome, ${name}`}
          </h1>
        ) : null}
      </div>
      <div
        style={{
          width: lineWidth,
          height: "2px", // Adjust the line height as needed
          backgroundColor: "green", // Adjust the line color as needed
          transition: "width 4s linear", // Smoothly transition width over 4 seconds
        }}
      ></div>
    </div>
  );
};

export default RenderHello;
