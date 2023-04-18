import React from "react";
import Expent from "./Expent";

export default function ExpenseList({
  gastos,
  setEditSpent,
  deleteSpent,
  filters,
  spentfilters,
  selectedCurrency
}) {
  return (
    <div className="w-full flex flex-col gap-2">
      <h2 className="font-Inter text-center text-xl lg:text-lg text-[#FFFCF5]">
        {filters.value !== "todos"
          ? spentfilters.length > 0
            ? "Gastos"
            : "No hay gastos de esta categoria"
          : gastos.length > 0
          ? "Gastos"
          : "No hay gastos aun"}
      </h2>
      <div className="w-full h-72 lg:h-80 overflow-y-scroll ">
        {spentfilters.map((gasto) => (
          <Expent
            key={gasto.id}
            gasto={gasto}
            setEditSpent={setEditSpent}
            deleteSpent={deleteSpent}
            selectedCurrency={selectedCurrency}
          />
        ))}
      </div>
    </div>
  );
}
