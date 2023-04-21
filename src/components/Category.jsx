import { useEffect, useState } from "react";
import { idGenerate } from "../helpers";

export default function Category({ filters, setFilters }) {


    const [showDropDown2, setShowDropDown2] = useState(false)

    const currencyOptions = [
        { idCategory: idGenerate(), name: "Todas las categorias", value: "todos" },
        { idCategory: idGenerate(), name: "Comida", value: "comida" },
        { idCategory: idGenerate(), name: "Casa", value: "casa" },
        { idCategory: idGenerate(), name: "Personal", value: "personal" },
        { idCategory: idGenerate(), name: "Vehículo", value: "vehículo" },
        { idCategory: idGenerate(), name: "Salud", value: "salud" },
        { idCategory: idGenerate(), name: "Ropa", value: "ropa" },
        { idCategory: idGenerate(), name: "Ahorro", value: "ahorro" },
        { idCategory: idGenerate(), name: "Ocio", value: "ocio" },
        { idCategory: idGenerate(), name: "Belleza", value: "belleza" },
        { idCategory: idGenerate(), name: "Otros", value: "otros" },

    ];

    const handleFilter = (category) => {
        setFilters({ name: category.name, value: category.value });
        setShowDropDown2(false);
    };

    return (
        <div className="w-full sm:w-[55%] lg:w-full flex flex-col justify-center gap-4 relative">
            <div className="flex w-full relative gap-1 sm:gap-2 px-3 items-center justify-center bg-[#FFFCF5] font-Inter text-base md:text-lg text-[#252322] rounded-full p-1">
                <div className="w-[90%] flex justify-between text-xs min-[400px]:text-sm sm:text-base lg:text-base">
                    <div className="w-full flex text-[#252322]  items-center justify-center gap-1 sm:gap-2">
                        <div>{filters.name}</div>
                    </div>
                </div>
                <button
                    id="dropdownDefaultButton"
                    data-dropdown-toggle="dropdown"
                    type="button"
                    onClick={() => setShowDropDown2(showDropDown2 ? false : true)}
                    className="w-[10%] flex justify-center"
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
            {showDropDown2 && (
                <div
                    id="dropdown"
                    className="absolute w-full z-10 font-Inter mt-64 sm:mt-[295px] md:mt-[300px] bg-[#FFFCF5] rounded-xl shadow-[#00000094] shadow-sm py-2 sm:py-2 "
                >
                    <ul
                        className="w-full h-auto gap-0.5 text-xs sm:text-sm flex flex-col justify-center items-center text-[#252322] "
                        aria-labelledby="dropdownDefaultButton"
                    >
                        {currencyOptions.map((category) => {
                            return (
                                <li key={category.idCategory} className="hover:bg-[#e6e6e6] w-full ">
                                    <button
                                        onClick={() => handleFilter(category)}
                                        className="w-full text-[#252322]  items-center justify-center flex"
                                    >
                                        <div>{category.name}</div>
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
