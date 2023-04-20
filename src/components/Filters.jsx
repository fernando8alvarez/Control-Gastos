import { useState, useEffect } from "react";
import Category from "./Category";

export default function Filters({ filters, setFilters }) {
  return (
    <div className="w-full h-[15%] px-6 py-1.5 lg:px-2 bg-[#F2AB37] font-Inter flex items-center justify-center rounded-lg">

      <div className="w-full h-auto text-base flex flex-col sm:flex-row  gap-1 sm:gap-2 lg:gap-1 items-center justify-center">
        <p className="sm:w-[35%] lg:w-[45%]  font-Inter text-[#252322] text-lg sm:text-lg min-[900px]:text-lg lg:text-base xl:text-lg text-center">Filtrar Gastos </p>
        <Category filters={filters} setFilters={setFilters} />
      </div>

    </div>
  );
}
