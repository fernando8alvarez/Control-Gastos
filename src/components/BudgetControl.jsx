import { useEffect, useState } from "react";
import { buildStyles, CircularProgressbarWithChildren } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import Swal from "sweetalert2";

export default function BudgetControl({
  budget,
  gastos,
  setGastos,
  setBudget,
  setIsValidBudget,
  selectedCurrency,
  setSelectedCurrency
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
    const { value, iso } = selectedCurrency;
    return new Intl.NumberFormat(iso, {
      style: "currency",
      currency: value,
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
        setSelectedCurrency("")
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
    <div className="flex flex-col justify-center items-center gap-3 sm:gap-5 w-full">
      <div className="w-full flex flex-col min-[600px]:flex-row sm:flex-row items-center justify-center gap-4 sm:gap-5 p-3 sm:p-4 lg:p-2 border-4 rounded-lg border-[#252322]">
        <div className="w-36 sm:w-40 min-[900px]:w-44 lg:w-36 xl:w-44">
          <CircularProgressbarWithChildren
            value={percentage}
            duration={1.4}

            styles={buildStyles({
              pathColor: available < 0 ? "#AC2026" : "#F2AB37",
              trailColor: available < 0 ? "#AC2026" : "#FFFCF5",
              pathTransitionDuration: 2,
            })}
          >
            <div className={available < 0 ? "font-Inter text-center text-lg sm:text-xl lg:text-lg xl:text-xl text-[#AC2026]" : "font-Inter text-center text-lg sm:text-xl lg:text-lg xl:text-xl text-[#F2AB37]"}>
              {percentage} % <br /> Gastado
            </div>
          </CircularProgressbarWithChildren>
        </div>
        <div className="w-auto">
          <div className="flex flex-col  text-base min-[520px]:text-lg min-[600px]:text-sm min-[670px]:text-lg md:text-lg min-[900px]:text-xl lg:text-sm justify-center xl:text-lg w-full gap-2">
            <p className="font-Inter text-[#FFFCF5]">
              <span className="text-[#F2AB37]">Presupuesto: </span>
              {formatCount(budget)}
            </p>
            <p className={available < 0 ? "font-Inter  text-[#AC2026]" : "font-Inter  text-[#FFFCF5]"}>
              <span className="text-[#F2AB37]">Disponible: </span>
              {formatCount(available)}
            </p>
            <p className="font-Inter  text-[#FFFCF5]">
              <span className="text-[#F2AB37]">Gastado: </span>
              {formatCount(spent)}
            </p>
            <div className="w-full flex text-[#252322]  items-center justify-start gap-1 sm:gap-2">
              <p className="font-Inter  text-[#F2AB37]">
                Moneda:
              </p>
              <img
                src={selectedCurrency.img}
                alt=""
                className="w-[20px] sm:w-[25px] md:w-[30px] lg:w-[25px]"
              />
              <div className="font-Inter  text-[#FFFCF5]">{selectedCurrency.name}</div>
            </div>

          </div>
        </div>

      </div>
      <button type="button" className="appearance-none px-10 py-2 bg-[#AC2026] hover:bg-[#580d11] w-full min-[520px]:w-fit font-Inter text-base md:text-base min-[800px]:text-lg text-[#FFFCF5] rounded-lg cursor-pointer  transition-colors ease-in duration-200" onClick={handleResetApp}>
        Reiniciar App
      </button>
    </div>
  );
}
