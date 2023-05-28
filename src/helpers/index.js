//GENERADOR DE ID UNICO
export const idGenerate = () => {
  const radom = Math.random().toString(36).substring(2);
  const fecha = Date.now().toString(36);

  return fecha + radom;
};

//FORMATEAR FECHA Y HORA
export const formatDateHour = (fecha) => {
  const newDate = new Date(fecha);

  const optionsDate = {
    year: "numeric",
    month: "long",
    day: "2-digit",
  };

  const optionsHour = {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  };

  const date = newDate.toLocaleDateString("es-ES", optionsDate);
  const hour = newDate.toLocaleTimeString("es-US", optionsHour);

  return `${date} a las ${hour}`;
};

//PONER PRIMERA LETRA EN MAYUSCULAS DE UNA ORACION
export const toUpperString = (frase) => {
  const primeraLetra = frase.slice(0, 1).toUpperCase(); //Obtener la priemra letra de la frase y pasarla a mayuscula
  const restoFrase = frase.slice(1); //Obtener el resto de la frase sin la primera letra
  return primeraLetra + restoFrase;
};

//GENERANDO FECHA ACTUAL EN FORMATO DD/MM/YYYY
export const getCurrentDate = () => {
  const date = new Date();

  //Obtener dia, mes y año de la fecha actual
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2,'0');
  const year = String(date.getFullYear());

  //Formatear fecha con DD/MM/YYYY
  const formartDate = `${day}/${month}/${year}`;

  return formartDate;
}

