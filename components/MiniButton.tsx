"use client";
import DecrementSvg from "@/public/assets/images/icon-decrement-quantity.svg";
import React from "react";

const MiniButton = ({ clickHandler }: { clickHandler: () => void }) => {
  return (
    <button
      className="w-4 h-4 rounded-full  ring-1 ring-offset-1 ring-slate-100 flex items-center justify-center"
      onClick={clickHandler}
    >
      <DecrementSvg />
    </button>
  );
};

export default MiniButton;
