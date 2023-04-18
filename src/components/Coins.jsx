import { useEffect, useState } from "react";
import arg from "../img/B-Arg.svg";
import col from "../img/B-Col.svg";
import esp from "../img/B-Esp.svg";
import mex from "../img/B-Mex.svg";
import usa from "../img/B-Usa.svg";
import vzl from "../img/B-Vzl.svg";
import { idGenerate } from "../helpers";

export default function Coins({
  mensaje,
  selectedCurrency,
  setSelectedCurrency,
  showDropDonw,
  setShowDropDown,
}) {
  useEffect(() => {
    if (mensaje) {
      setShowDropDown(false);
    }
  }, [mensaje]);

  const currencyOptions = [
    { id: idGenerate(), text: "$ (ARS)", value: "ARS", img: arg, name: "Pesos", iso: "es-AR", symbol: "$" },
    { id: idGenerate(), text: "$ (COP)", value: "COP", img: col, name: "Pesos", iso: "es-CO", symbol: "$" },
    { id: idGenerate(), text: "€ (EUR)", value: "EUR", img: esp, name: "Euros", iso: "es-ES", symbol: "€" },
    { id: idGenerate(), text: "$ (MXN)", value: "MXN", img: mex, name: "Pesos", iso: "es-MX", symbol: "$" },
    { id: idGenerate(), text: "$ (USD)", value: "USD", img: usa, name: "Dolar", iso: "en-US", symbol: "$" },
    { id: idGenerate(), text: "Bs (VES)", value: "VES", img: vzl, name: "Bolivares", iso: "es-VE", symbol: "Bs" },
  ];

  const handleCoin = (item) => {
    setSelectedCurrency(item);
    setShowDropDown(false);
  };

  return (
    <div className="w-[23%] h-auto flex flex-col gap-4">
      <div className="flex gap-1 sm:gap-2 items-center justify-center appearance-none w-full h-8 sm:h-10 lg:h-12 bg-[#F2AB37] font-Inter text-base md:text-lg text-[#252322] rounded-lg">
        <div className="text-xs sm:text-base lg:text-lg">
          {selectedCurrency ? (
            <div className="w-full flex text-[#252322]  items-center justify-start gap-1 sm:gap-2">
              <img
                src={selectedCurrency.img}
                alt=""
                className="w-[20px] sm:w-[25px] md:w-[30px] lg:w-[35px]"
              />
              <div>{selectedCurrency.value}</div>
            </div>
          ) : (
            "Moneda"
          )}
        </div>
        <button
          id="dropdownDefaultButton"
          data-dropdown-toggle="dropdown"
          type="button"
         onMouseOver={() => setShowDropDown(!showDropDonw && true)}
        >
          <svg
            className="w-3 h-3 sm:w-4 sm:h-4 "
            aria-hidden="true"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="3"
              d="M19 9l-7 7-7-7"
            ></path>
          </svg>
        </button>
      </div>
      {/* <!-- Dropdown menu --> */}
      {showDropDonw && (
        <div
          id="dropdown"
          className="absolute font-Inter mt-10 sm:mt-12 md:mt-12 lg:mt-14 bg-white divide-y divide-gray-100 rounded-lg shadow-[#00000094] shadow-sm pr-2 py-2 sm:py-3 "
        >
          <ul
            className=" text-xs lg:text-sm text-[#252322] h-[60px] sm:h-[75px] md:h-[85px] lg:h-[100px] overflow-y-scroll pl-2 sm:pl-3 pr-1"
            aria-labelledby="dropdownDefaultButton"
          >
            {currencyOptions.map((item) => {
              return (
                <li key={item.id}>
                  <button
                    onClick={() => handleCoin(item)}
                    className="w-full text-[#252322]  items-center justify-start gap-2 flex hover:bg-[#e6e6e6] "
                  >
                    <img
                      src={item.img}
                      alt=""
                      className="w-[20px] sm:w-[25px] md:w-[30px] lg:w-[35px]"
                    />
                    <div>{item.text}</div>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}
