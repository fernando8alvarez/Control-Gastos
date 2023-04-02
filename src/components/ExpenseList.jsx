import React from "react";
import Expent from "./Expent";

export default function ExpenseList({
  gastos,
  setEditSpent,
  deleteSpent,
  filters,
  spentfilters,
}) {
  return (
    <div className="listado-gastos contenedor">
      <h2>
        {filters !== "todos"
          ? spentfilters.length > 0
            ? "Gastos"
            : "No hay gastos de esta categoria"
          : gastos.length > 0
          ? "Gastos"
          : "No hay gastos aun"}
      </h2>
      <div className="listado">
        {spentfilters.map((gasto) => (
          <Expent
            key={gasto.id}
            gasto={gasto}
            setEditSpent={setEditSpent}
            deleteSpent={deleteSpent}
          />
        ))}
      </div>
    </div>
  );
}
