import { useState, useEffect, useRef } from "react";
import Header from "./components/Header";
import ExpenseList from "./components/ExpenseList";
import Modal from "./components/Modal";
import Filters from "./components/Filters";
import iconoNewGasto from './img/nuevo-gasto.svg';
import { idGenerate } from "./helpers";

export default function App() {

  //Arreglo de gastos
  const [gastos, setGastos] = useState(
    JSON.parse(localStorage.getItem("gastos")) ? JSON.parse(localStorage.getItem("gastos")) : []
  );
  //Manejo de presupuesto
  const [budget, setBudget] = useState(
    JSON.parse(localStorage.getItem("budget")) ? JSON.parse(localStorage.getItem("budget")) : ""
  );
  const [isValidBudget, setIsValidBudget] = useState(false);

  //Manejo de modal
  const [modal, setModal] = useState(false);
  const [animateModal, setAnimateModal] = useState(false);

  //Manejo de edicion de un gasto
  const [EditSpent, setEditSpent] = useState({});

  //Manejo de filtros
  const [filters, setFilters] = useState("todos");
  const [spentfilters, setSpentFilters] = useState([]);

  useEffect(() => {
    if (Object.keys(EditSpent).length > 0) {
      setModal(true);

      setTimeout(() => {
        setAnimateModal(true)

      }, 300);
    }
  }, [EditSpent]);

  useEffect(() => {
    localStorage.setItem('budget', JSON.stringify(budget));
    localStorage.setItem('gastos', JSON.stringify(gastos));

  }, [gastos, budget]);

  useEffect(() => {
    const presupuestoLS = JSON.parse(localStorage.getItem("budget")) ? JSON.parse(localStorage.getItem("budget")) : ""
    presupuestoLS && setIsValidBudget(true);

  }, [])

  useEffect(() => {

    if (filters === "todos") {
      setSpentFilters(gastos);
    } else {
      const filtrados = gastos.filter((gasto) => gasto.categoria === filters);
      setSpentFilters(filtrados);
    }
  }, [filters, gastos])

  //MANEJANDO MODAL
  const handleNewExpense = () => {


    setModal(true);

    setTimeout(() => {
      setAnimateModal(true)

    }, 300);
  }


  //GUARDAR GASTO
  const saveExpend = (gasto) => {

    if (gasto.id) {
      //Actualizando Gasto
      const updatedExpenses = gastos.map(gastoState => gastoState.id === gasto.id ? gasto : gastoState);
      setGastos(updatedExpenses);
    }
    else {
      //Agregando Nuevo Gasto
      gasto.id = idGenerate();
      gasto.fecha = Date.now();
      setGastos([...gastos, gasto]);
    }
    setAnimateModal(false);
    setTimeout(() => {
      setModal(false);
    }, 500);
  }

  const deleteSpent = (id) => {
    const deleteSpentId = gastos.filter((gasto) => (gasto.id !== id && gasto));
    setGastos(deleteSpentId);
  }

  return (

    <div className={modal ? 'fijar' : ''}>
      <Header
        gastos={gastos}
        budget={budget}
        setBudget={setBudget}
        isValidBudget={isValidBudget}
        setIsValidBudget={setIsValidBudget}
        setGastos={setGastos}
      />

      {isValidBudget &&
        (
          <>
            <main>
              <Filters filters={filters} setFilters={setFilters} />
              <ExpenseList
                gastos={gastos}
                setEditSpent={setEditSpent}
                deleteSpent={deleteSpent}
                filters={filters}
                spentfilters={spentfilters}
              />
            </main>
            <div className="nuevo-gasto">
              <img
                id="plus"
                src={iconoNewGasto}
                alt="Icono nuevo gasto"
                onClick={() => handleNewExpense()}

              />
            </div>
          </>
        )}

      {modal && (
        <Modal
          setModal={setModal}
          animateModal={animateModal}
          setAnimateModal={setAnimateModal}
          saveExpend={saveExpend}
          EditSpent={EditSpent}
          setEditSpent={setEditSpent}
          setFilters={setFilters}
        />)}

    </div>

  )
}
