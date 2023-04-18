import BudgetControl from "./BudgetControl";
import NewBudget from "./NewBudget";
import Footer from "./Footer";
import organiza from "../img/img-organiza.png";
import ahorra from "../img/img-ahorro.png";
import compra from "../img/img-compra.png";
import { useSpring, animated } from "@react-spring/web";
import Imgs from "./Imgs";

export default function Header({
  budget,
  setBudget,
  isValidBudget,
  setIsValidBudget,
  gastos,
  setGastos,
  selectedCurrency,
  setSelectedCurrency,
  showDropDonw,
  setShowDropDown
}) {
  //ANIMACION TITULO
  const animation1 = useSpring({
    from: { x: 200, opacity: 0 },
    to: { x: 0, opacity: 1 },
    config: {
      mass: 10,
      tension: 2000,
      friction: 500,
    },
    delay: 500,
  });

  return (
    <header className={!isValidBudget ? "h-screen w-full" : "w- full lg:w-[50%] "}>
      {isValidBudget ? (
        <div className="flex flex-col">
          <BudgetControl
            budget={budget}
            gastos={gastos}
            setGastos={setGastos}
            setBudget={setBudget}
            setIsValidBudget={setIsValidBudget}
            selectedCurrency={selectedCurrency}
            setSelectedCurrency={setSelectedCurrency}
          />
        </div>
      ) : (
        <div className="flex w-full flex-col h-full">
          <div className="flex w-full h-[88%] md:h-[85%] bg-[#151515] px-10 pt-20 pb-10 lg:px-20 lg:py-20 xl:px-40">
            <div className="flex w-full md:w-full flex-col justify-between">
              <div className="flex justify-center">
                <animated.h1
                  style={animation1}
                  className="w-fit font-Montserrat text-white text-4xl sm:text-6xl xl:text-7xl uppercase"
                >
                  Planificador <br />
                  de <span className="text-[#F2AB37]">Gastos</span>{" "}
                </animated.h1>
              </div>
              {/*IMAGENES HORIZONTALES*/}
              <div className="w-full lg:hidden">
                <Imgs />
              </div>
              <NewBudget
                budget={budget}
                setBudget={setBudget}
                setIsValidBudget={setIsValidBudget}
                selectedCurrency={selectedCurrency}
                setSelectedCurrency={setSelectedCurrency}
                showDropDonw={showDropDonw}
                setShowDropDown={setShowDropDown}
              />
            </div>
            {/*IMAGENES VERTICALES*/}
            <div className="hidden w-full lg:flex">
              <Imgs />
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
