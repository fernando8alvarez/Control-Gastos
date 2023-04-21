import { useEffect, useState } from "react";
import { buildStyles, CircularProgressbarWithChildren } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import Swal from "sweetalert2";
import { useSpring, animated } from "@react-spring/web";

export default function BudgetControl({
  budget,
  gastos,
  setGastos,
  setBudget,
  setIsValidBudget,
  selectedCurrency,
  setSelectedCurrency,
  loading,
  setLoading
}) {
  const [percentage, setPercentage] = useState(0);
  const [available, setAvailable] = useState(0);
  const [spent, setSpent] = useState(0);
  const [editBudget, setEditBudget] = useState(false);
  const [changeBudget, setChangeBudget] = useState("");
  const [error, setError] = useState(false);

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
        setLoading(true)
        setTimeout(() => {
          setLoading(false)
        }, 1000);
        // Swal.fire({
        //   text: `El sistema se ha reestablecido`,
        //   icon: "warning",
        //   showConfirmButton: false,
        //   timer: 2500,
        //   timerProgressBar: false,
        // })
      }
    });
  };

  const animation = useSpring({
    from: { y: 200, opacity: 0 },
    to: { y: 0, opacity: 1 },
    config: {
      mass: 10,
      tension: 2000,
      friction: 500,
    },
    delay: 800,
  });

  const handleEditBudget = () => {
    setEditBudget(editBudget ? false : true)
  }

  const handleChange = (value) => {

    if (value === "") setChangeBudget(value);
    else setChangeBudget(Number(value));

    if (Number(value) && Number(value) > 0) setError(false);
    else if (value === "") setError(false);
    else setError(true);

  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!error && changeBudget) {
      localStorage.setItem("budget", JSON.stringify(changeBudget));
      setBudget(JSON.parse(localStorage.getItem("budget")));
      setEditBudget(false);
      setError(false);
      setLoading(true)
      setTimeout(() => {
        setLoading(false)
      }, 1000);
    }else{
      setError(true);
    }
  }

  console.log(changeBudget);

  return (
    <animated.div style={animation} className="flex flex-col justify-center items-center gap-3 sm:gap-5 w-full">
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
      <div className={`flex flex-col w-full gap-2 ${editBudget ? "min-[520px]:flex-col" : "min-[520px]:flex-row"} justify-center items-center`}>
        <button type="button" className="appearance-none  py-2 bg-[#AC2026] hover:bg-[#580d11] w-full min-[520px]:w-1/2 min font-Inter text-base md:text-base min-[800px]:text-lg text-[#FFFCF5] rounded-lg cursor-pointer  transition-colors ease-in duration-200" onClick={handleResetApp}>
          Reiniciar App
        </button>
        <div className={`w-full ${editBudget ? "min-[520px]:w-full" : "min-[520px]:w-1/2"} flex gap-2 justify-center`}>
          <button type="button" onClick={() => handleEditBudget()} className={editBudget ? "flex  justify-center items-center w-[20%] lg:w-[25%] appearance-none px-10 py-2 bg-[#AC2026] hover:bg-[#580d11] font-Inter text-sm md:text-base min-[800px]:text-base text-[#FFFCF5] rounded-lg cursor-pointer transition-colors ease-in duration-200" : "w-full appearance-none py-2 bg-[#44a71a] hover:bg-[#24540f] min-[520px]:w-full font-Inter text-base md:text-base min-[800px]:text-lg text-[#FFFCF5] rounded-lg cursor-pointer transition-colors ease-in duration-200"}>
            {editBudget ? "Cancelar" : "Editar presupuesto"}
          </button>
          {editBudget && (
            <div className="w-full flex gap-2">
              <input
                type="number"
                className={`w-[70%] rounded-r-lg rounded-l-lg font-Inter text-[11px] min-[450px]:text-sm sm:text-base md:text-base lg:text-base ${error ? "text-[#AC2026] border-2 border-[#AC2026]" : "text-[#252322]"} placeholder-[#A6A6A6] focus:outline-none text-center shadow-[#00000074] shadow-md`}
                placeholder="Nuevo presupuesto..."
                value={changeBudget}
                onChange={(e) => handleChange(e.target.value)}
              />
              <button
                type="button"
                className="w-[30%] bg-[#F2AB37] hover:bg-[#97691f] font-Inter text-sm sm:text-base md:text-base lg:text-base text-[#252322] rounded-lg cursor-pointer transition-colors ease-in duration-200"
                onClick={(e) => handleSubmit(e)}
              >
                Enviar
              </button>
            </div>
          )}

        </div>
      </div>
    </animated.div>
  );
}
