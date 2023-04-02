import { useEffect, useState } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import Swal from "sweetalert2";

export default function BudgetControl({
  budget,
  gastos,
  setGastos,
  setBudget,
  setIsValidBudget,
}) {
  const [percentage, setPercentage] = useState(0);
  const [available, setAvailable] = useState(0);
  const [spent, setSpent] = useState(0);

  useEffect(() => {
    const totalSpent = gastos.reduce(
      (total, spent) => spent.cantidad + total,
      0
    );
    const totalAviable = budget - totalSpent;
    const percent = (spent * 100) / budget;
    //Porcentaje gastado
    const newPercentage = percent % 1 === 0 ? percent : percent.toFixed(2);

    setAvailable(totalAviable);
    setSpent(totalSpent);

    setPercentage(newPercentage);
  }, [gastos, percentage, spent]);

  const formatCount = (count) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
      currencyDisplay: "narrowSymbol",
    }).format(count);
  };

  const handleResetApp = () => {
    Swal.fire({
      text: "¿Estás seguro de resetear el sistema?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3B82F6",
      cancelButtonColor: "#3B82F6",
      cancelButtonText: "Cancelar",
      confirmButtonText: "Reiniciar",
    }).then((result) => {
      if (result.isConfirmed) {
        setBudget("");
        setGastos([]);
        setIsValidBudget(false);
        localStorage.clear();
        Swal.fire({
          text: `El sistema se ha reestablecido`,
          icon: "warning",
          showConfirmButton: false,
          timer: 2500,
          timerProgressBar: false,
        }).then(() => {
          location.reload();
        });
      }
    });
  };

  return (
    <div className="contenedor-presupuesto contenedor sombra dos-columnas">
      <div>
        <CircularProgressbar
          styles={buildStyles({
            pathColor: available < 0 ? "#DC2626" : "#3B82F6",
            trailColor: available < 0 ? "#DC2626" : "#F5F5F5",
            pathTransitionDuration: 2,
            textColor: available < 0 ? "#DC2626" : "#3B82F6",
          })}
          value={percentage}
          text={`${percentage} % Gastado`}
          duration={1.4}
        />
      </div>
      <div className="contenido-presupuesto">
        <button type="button" className="reset-app" onClick={handleResetApp}>
          Reiniciar App
        </button>
        <p>
          <span>Presupuesto: </span>
          {formatCount(budget)}
        </p>
        <p className={available < 0 ? "negativo" : ""}>
          <span>Disponible: </span>
          {formatCount(available)}
        </p>
        <p>
          <span>Gastado: </span>
          {formatCount(spent)}
        </p>
      </div>
    </div>
  );
}
