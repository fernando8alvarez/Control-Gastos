import { useEffect, useState } from "react";
import Mensaje from "./Mensaje";
import { useSpring, animated } from "@react-spring/web";
import Coins from "./Coins";

export default function NewBudget({
  budget,
  setBudget,
  setIsValidBudget,
  selectedCurrency,
  setSelectedCurrency,
  showDropDonw,
  setShowDropDown,
  loading, setLoading
}) {
  const [mensaje, setMensaje] = useState("");

  const animation = useSpring({
    from: { x: 200, opacity: 0 },
    to: { x: 0, opacity: 1 },
    config: {
      mass: 10,
      tension: 2000,
      friction: 500,
    },
    delay: 800,
  });

  const handleChange = (value) => {
    if (value === "") setBudget(value);
    else setBudget(Number(value));

    if (Number(value) && Number(value) > 0) setMensaje("");
    else if (value === "") setMensaje("");
    else setMensaje("¡No es un presupuesto valido!");
  };

  const handleBuget = (e) => {
    e.preventDefault();
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
    }, 1000);

    if (budget && budget > 0 && selectedCurrency) {
      localStorage.setItem("budget", JSON.stringify(budget));
      localStorage.setItem("coin", JSON.stringify(selectedCurrency));
      return setIsValidBudget(true);
    } else if (!(budget > 0)) {
      return setMensaje("!Ingrese un presupuesto!");
    } else if (!selectedCurrency) {
      return setMensaje("!Seleccione una moneda!");
    } else setMensaje("¡No es un presupuesto valido!");
  };

  return (
    <animated.div
      style={animation}
      className={
        mensaje
          ? "w-full flex justify-center mb-1 lg:mb-5 xl:mb-12"
          : "w-full flex justify-center mb-8 lg:mb-16 xl:mb-24"
      }
    >
      <form
        onSubmit={(e) => handleBuget(e)}
        className="flex flex-col w-full justify-center items-center gap-2 lg:gap-4 xl:gap-5 md:gap-2 md:px-20 lg:px-0 xl:px-0"
      >
        <label
          htmlFor="input-presupuesto"
          className="font-Ubuntu uppercase text-[#FFFCF5] text-xl sm:text-2xl lg:text-3xl"
        >
          Defina su Presupuesto
        </label>
        <div className="w-80 sm:w-[85%] md:w-[90%] min-[930px]:w-[70%] lg:w-full flex gap-1.5 sm:gap-3">
          <input
            type="number"
            name="input-presupuesto"
            className="h-8 sm:h-10 lg:h-12 w-[50%] rounded-l-full rounded-r-[3000px] pl-1 md:pl-5 lg:pl-2 font-Inter text-xs sm:text-base md:text-base lg:text-lg text-[#252322] placeholder-[#A6A6A6] focus:outline-none text-center shadow-[#00000074] shadow-md"
            placeholder="Ingresa tu presupuesto..."
            value={budget}
            onChange={(e) => handleChange(e.target.value)}
            onClick={() => setShowDropDown(false)}
          />
          <Coins
            mensaje={mensaje}
            selectedCurrency={selectedCurrency}
            setSelectedCurrency={setSelectedCurrency}
            showDropDonw={showDropDonw}
            setShowDropDown={setShowDropDown}
          />
          <input
            type="submit"
            value="Empezar"
            className="appearance-none h-8 sm:h-10 lg:h-12 bg-[#F2AB37] hover:bg-[#97691f] w-[20%] font-Inter text-xs sm:text-base md:text-base lg:text-lg text-[#252322] rounded-lg cursor-pointer transition-colors ease-in duration-200"
          />
        </div>
        {mensaje && <Mensaje tipo="error">{mensaje}</Mensaje>}
      </form>
    </animated.div>
  );
}
