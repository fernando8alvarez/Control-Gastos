import BudgetControl from "./BudgetControl";
import NewBudget from "./NewBudget";

export default function Header({
  budget,
  setBudget,
  isValidBudget,
  setIsValidBudget,
  gastos,
  setGastos,
}) {
  return (
    <header>
      <h1>Planificador de Gastos</h1>
      {isValidBudget ? (
        <BudgetControl
          budget={budget}
          gastos={gastos}
          setGastos={setGastos}
          setBudget={setBudget}
          setIsValidBudget={setIsValidBudget}
        />
      ) : (
        <NewBudget
          budget={budget}
          setBudget={setBudget}
          setIsValidBudget={setIsValidBudget}
        />
      )}
    </header>
  );
}
