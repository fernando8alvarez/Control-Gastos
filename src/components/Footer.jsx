import linkedin from "../img/logo-linkedin.png";
import github from "../img/logo-github.png";
import codigo from "../img/logo-codigo.png";

export default function () {

    const año = new Date().getFullYear().toString();

    return (
        <>
            <div className="h-full font-Inter bg-transparent flex flex-col items-center justify-center gap-2">
                <div className="flex justify-center gap-4">
                    <a href="https://www.linkedin.com/in/luis-fernando-alvarez-leccia-3a5b7b151/" target="_blank" title="Click para acceder a mi Linkedin" >
                        <img src={linkedin} alt="Img not found" className="cursor-pointer w-[30px] sm:w-[35px] " />
                    </a>
                    <a href="https://github.com/fernando8alvarez" target="_blank" title="Click para acceder a mi Github">
                        <img src={github} alt="Img not found" className="cursor-pointer w-[30px] sm:w-[35px] " />
                    </a>
                    <a href="https://github.com/fernando8alvarez/Control-Gastos" target="_blank" title="Click para aceder al Repositorio">
                        <img src={codigo} alt="Img not found" className="cursor-pointer w-[30px] sm:w-[35px]" />
                    </a>
                </div>
                <div className="w-full text-center text-[#FFFCF5] text-[10px] sm:text-sm">© Copyright {año} | Coded by Luis Fernando Alvarez</div>
            </div>
        </>
    )
}