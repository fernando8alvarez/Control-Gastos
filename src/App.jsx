import { useState, useEffect, useRef } from "react";
import Header from "./components/Header";
import ExpenseList from "./components/ExpenseList";
import Modal from "./components/Modal";
import Filters from "./components/Filters";
import iconoNewGasto from "./img/icon-add.svg";
import { idGenerate } from "./helpers";
import Footer from "./components/Footer";
import { useSpring, animated } from "@react-spring/web";

export default function App() {

  //Manejo de presupuesto
  const [isValidBudget, setIsValidBudget] = useState(false);

  const [budget, setBudget] = useState(
    JSON.parse(localStorage.getItem("budget"))
      ? JSON.parse(localStorage.getItem("budget"))
      : ""
  );

  //Arreglo de gastos
  const [gastos, setGastos] = useState(
    JSON.parse(localStorage.getItem("gastos"))
      ? JSON.parse(localStorage.getItem("gastos"))
      : []
  );

  //Manejo de moneda
  const [selectedCurrency, setSelectedCurrency] = useState(
    JSON.parse(localStorage.getItem("coin"))
      ? JSON.parse(localStorage.getItem("coin"))
      : ""
  );

  //Manejo de modal
  const [modal, setModal] = useState(false);
  const [animateModal, setAnimateModal] = useState(false);

  //Manejo de edicion de un gasto
  const [EditSpent, setEditSpent] = useState({});

  //Manejo de filtros
  const [filters, setFilters] = useState({ name: "Todas las categorias", value: "todos" });
  const [spentfilters, setSpentFilters] = useState([]);

  //Manejo DropDown
  const [showDropDonw, setShowDropDown] = useState(false);

  useEffect(() => {
    if (Object.keys(EditSpent).length > 0) {
      setModal(true);

      setTimeout(() => {
        setAnimateModal(true);
      }, 300);
    }
  }, [EditSpent]);

  useEffect(() => {
    localStorage.setItem("gastos", JSON.stringify(gastos));
  }, [gastos, budget, selectedCurrency]);

  useEffect(() => {
    const presupuestoLS = JSON.parse(localStorage.getItem("budget"))
      ? JSON.parse(localStorage.getItem("budget"))
      : "";
    presupuestoLS && setIsValidBudget(true);
  }, []);

  useEffect(() => {
    if (filters.value === "todos") {
      setSpentFilters(gastos);
    } else {
      const filtrados = gastos.filter((gasto) => gasto.categoria === filters.value);
      setSpentFilters(filtrados);
    }
  }, [filters, gastos]);

  //MANEJANDO MODAL
  const handleNewExpense = () => {
    setModal(true);

    setTimeout(() => {
      setAnimateModal(true);
    }, 300);
  };

  //GUARDAR GASTO
  const saveExpend = (gasto) => {
    if (gasto.id) {
      //Actualizando Gasto
      const updatedExpenses = gastos.map((gastoState) =>
        gastoState.id === gasto.id ? gasto : gastoState
      );
      setGastos(updatedExpenses);
    } else {
      //Agregando Nuevo Gasto
      gasto.id = idGenerate();
      gasto.fecha = Date.now();
      setGastos([...gastos, gasto]);
    }
    setAnimateModal(false);
    setTimeout(() => {
      setModal(false);
    }, 500);
  };

  const deleteSpent = (id) => {
    const deleteSpentId = gastos.filter((gasto) => gasto.id !== id && gasto);
    setGastos(deleteSpentId);
  };

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
    <div className={modal ? "h-screen overflow-hidden" : "h-screen"}>
      <div className={modal ? "w-full h-auto lg:h-[88%] bg-[#151515] flex" : (isValidBudget && budget && selectedCurrency) ? ("w-full h-auto lg:h-[88%] bg-[#151515] flex") : ("w-full h-[88%] bg-[#151515] flex")}>

        <div className={(isValidBudget && budget && selectedCurrency) ? "flex w-full lg:h-full px-10 py-8 min-[600px]:px-16 md:px-20 md:py-16 min-[900px]:px-32 lg:px-20 lg:py-10 xl:px-44 gap-5" : "w-full"}>

          <div className="flex flex-col w-full h-full gap-8">
            {(isValidBudget && budget && selectedCurrency) && (<div className="flex text-center lg:text-start justify-center">

              <animated.h1
                style={animation1}
                className="w-fit font-Montserrat text-white text-4xl sm:text-5xl xl:text-6xl uppercase"
              >
                Planificador de <span className="text-[#F2AB37]">Gastos</span>
              </animated.h1>

            </div>)}
            <div className="flex flex-col lg:flex-row w-full h-full lg:h-[88%] mb-16 gap-10">
              <Header
                gastos={gastos}
                budget={budget}
                setBudget={setBudget}
                isValidBudget={isValidBudget}
                setIsValidBudget={setIsValidBudget}
                setGastos={setGastos}
                selectedCurrency={selectedCurrency}
                setSelectedCurrency={setSelectedCurrency}
                showDropDonw={showDropDonw}
                setShowDropDown={setShowDropDown}

              />
              {/*FILTRO Y LISTA DE GASTOS*/}
              {(isValidBudget && budget && selectedCurrency) && (
                <div className="flex flex-col w-full lg:h-full lg:w-[50%]">
                  <main className="flex flex-col w-full lg:h-[88%] items-center justify-center gap-2 sm:gap-5 lg:gap-2 p-3 min-[550px]:px-10 sm:px-8 sm:py-4 lg:px-4 lg:py-3 xl:px-8 border-4 rounded-lg border-[#252322]">
                    <Filters filters={filters} setFilters={setFilters} />
                    <ExpenseList
                      gastos={gastos}
                      setEditSpent={setEditSpent}
                      deleteSpent={deleteSpent}
                      filters={filters}
                      spentfilters={spentfilters}
                      selectedCurrency={selectedCurrency}
                    />
                  </main>
                </div>
              )}

            </div>

          </div>
          {/*BOTON AÑADIR NUEVO GASTO*/}
          {(isValidBudget && budget && selectedCurrency) && (
            <div className="fixed bottom-0 right-0 sm:flex mr-6 mb-24 md:mr-10 md:mb-24 items-end ">
              <img
                id="plus"
                src={iconoNewGasto}
                alt="Icono nuevo gasto"
                onClick={() => handleNewExpense()}
                className="w-14 min-[600px]:w-16 md:w-20 lg:w-16 cursor-pointer sm:animate-bounce hover:animate-none appearance-none transition-colors ease-in duration-2000"
                title="Añadir nuevo gasto"
              />
            </div>
          )}
        </div>
        {/*FORMULARIO AÑADIR NUEVO GASTO*/}
        {modal && (
          <div className="fixed w-full h-screen bottom-0 right-0 bg-[#000000d9] p-6">
            <Modal
              setModal={setModal}
              animateModal={animateModal}
              setAnimateModal={setAnimateModal}
              saveExpend={saveExpend}
              EditSpent={EditSpent}
              setEditSpent={setEditSpent}
              setFilters={setFilters}
            />
          </div>
        )}
      </div>
      {/*FOOTTER*/}
      <div className="h-[12%] bg-[#151515] py-4 flex items-center justify-center">
        <Footer />
      </div>
    </div>
  );
}
