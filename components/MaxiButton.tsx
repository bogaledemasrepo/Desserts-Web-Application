"use client";
import IncrementSvg from "@/public/assets/images/icon-increment-quantity.svg";
import React from "react";

const MaxiButton = ({ clickHandler }: { clickHandler: () => void }) => {
  return (
    <button
      className="w-4 h-4 rounded-full  ring-1 ring-offset-1 ring-slate-100 flex items-center justify-center"
      onClick={clickHandler}
    >
      <IncrementSvg />
    </button>
  );
};

export default MaxiButton;
