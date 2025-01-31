import React from "react";

const ActiveButton = ({ title, desc, index, current, onClick, progress }) => {
  return (
    <button
      className={`${current == index ? "active-slide" : ""} p-5`}
      onClick={onClick}
    >
      <div className="px-10">
        <progress
          className="progress w-full h-[2px]"
          value={`${progress}`}
          max="100"
        ></progress>
      </div>
      <div className="p-5">
        <h2 className="font-bold">{title}</h2>
        {/* <p>{desc}</p> */}
      </div>
    </button>
  );
};

export default ActiveButton;
