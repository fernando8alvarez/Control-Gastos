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
  setShowDropDown,
  loading,
  setLoading,
  previewInvoice,
  setPreviewInvoice,
  balance,
  setBalance
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
    <header className={!isValidBudget ? "h-full w-full" : "w-full h-auto lg:w-[50%] "}>
      {isValidBudget ? (
        <div className="flex flex-col">
          <BudgetControl
            budget={budget}
            setBudget={setBudget}
            gastos={gastos}
            setGastos={setGastos}
            setIsValidBudget={setIsValidBudget}
            selectedCurrency={selectedCurrency}
            setSelectedCurrency={setSelectedCurrency}
            loading={loading}
            setLoading={setLoading}
            previewInvoice={previewInvoice}
            setPreviewInvoice={setPreviewInvoice}
            balance={balance}
            setBalance={setBalance}
          />
        </div>
      ) : (
        <div className="flex w-full flex-col h-full">
          <div className="flex w-full h-full bg-[#151515] pt-8 sm:px-10 sm:pt-10 sm:pb-10 lg:px-20 lg:py-20 xl:px-40">
            <div className="flex w-full md:w-full flex-col h-full justify-between lg:gap-40">
              <div className="flex justify-center">
                <animated.h1
                  style={animation1}
                  className="w-fit font-Montserrat text-white text-4xl sm:text-6xl xl:text-7xl uppercase"
                >
                  Planificador <br />
                  de <span className="text-[#F2AB37]">Gastos</span>{" "}
                </animated.h1>
              </div>
              {/*IMAGENES VERTICALES*/}
              <div className="w-full flex justify-center h-1/2 sm:h-auto lg:hidden">
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
                loading={loading}
                setLoading={setLoading}
              />
            </div>
            {/*IMAGENES HORIZONTALES*/}
            <div className="hidden w-full h-full lg:flex">
              <Imgs />
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
