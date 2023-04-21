import React from "react";
import loading from "../img/loading.svg"

function Loading() {
  return (
    <div className="bg-[#151515] w-full h-screen flex justify-center items-center absolute">
      <div role="status">
        <img src={loading} alt="" className="w-20" />
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
}

export default Loading;