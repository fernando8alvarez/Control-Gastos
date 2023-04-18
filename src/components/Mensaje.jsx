import React from "react";

export default function Mensaje({ children, tipo }) {
  return <div className={`font-Inter text-sm sm:text-base lg:text-xl text-[#AC2026] ${tipo}`}>{children}</div>;
}
