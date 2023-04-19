import organiza from "../img/img-organiza.png";
import ahorra from "../img/img-ahorro.png";
import compra from "../img/img-compra.png";
import { useSpring, animated } from "@react-spring/web";
import { idGenerate } from "../helpers";

export default function Imgs() {
    //ANIMACION IMAGENES
    const typeAnimate2 = {
        img1: { y: 200, delay: 500 },
        img2: { y: 200, delay: 800 },
        img3: { y: 100, delay: 1100 },
    };

    const animation2 = (property) => {
        return useSpring({
            from: { y: property.y, opacity: 0 },
            to: { y: 0, opacity: 1 },
            config: {
                mass: 10,
                tension: 2000,
                friction: 500,
            },
            delay: property.delay,
        });
    };

    const imgs = [
        {
            id: idGenerate(),
            style: animation2(typeAnimate2.img1),
            text: "Organícese!",
            img: organiza
        },
        {
            id: idGenerate(),
            style: animation2(typeAnimate2.img2),
            text: "Ahorre!",
            img: ahorra
        },
        {
            id: idGenerate(),
            style: animation2(typeAnimate2.img3),
            text: "Compre!",
            img: compra
        }
    ]



    return (
        <div className="w-full h-full flex justify-center pl-8 pr-16 gap-3">
            <div className="hidden sm:flex lg:hidden gap-4">
                {imgs.map((item) => {
                    return (
                        <animated.div
                            style={item.style}
                            className="flex flex-col gap-2"
                            key={item.id}
                        >
                            <p className="w-full text-center text-base sm:text-xl font-Ubuntu text-[#F2AB37]">
                                {item.text}
                            </p>
                            <div className="sm:w-36 border-4 border-white rounded-md flex items-center justify-center">
                                <img
                                    src={item.img}
                                    alt="Img not found"
                                    className="w-full"
                                />
                            </div>
                        </animated.div>
                    )
                })}
            </div>
            <div className="w-full sm:hidden lg:flex flex items-center justify-center gap-4 ">
                <div className="w-1/2 z-20">
                    <animated.div
                        style={animation2(typeAnimate2.img2)}
                        className="flex flex-col w-full ml-10 gap-1 lg:gap-2 -mr-8"
                    >
                        <p className="w-full text-center text-base sm:text-xl lg:2xl font-Ubuntu text-[#F2AB37]">
                            Ahorre!
                        </p>
                        <div className="w-full sm:w-36 lg:w-auto border-4 border-white rounded-md flex items-center justify-center">
                            <img
                                src={ahorra}
                                alt="Img not found"
                                
                            />
                        </div>
                    </animated.div>
                </div>
                <div className="w-1/2 flex flex-col items-center justify-center gap-3 lg:gap-4 z-10 ">
                    <animated.div
                        style={animation2(typeAnimate2.img1)}
                        className="flex flex-col w-full gap-2"
                    >
                        <p className="w-full text-center text-base sm:text-xl lg:text-2xl font-Ubuntu text-[#F2AB37]">
                            Organícese!
                        </p>
                        <div className=" sm:w-36 lg:w-auto border-4 border-white rounded-md flex items-center justify-center">
                            <img
                                src={organiza}
                                alt="Img not found"
                                
                            />
                        </div>
                    </animated.div>
                    <animated.div
                        style={animation2(typeAnimate2.img3)}
                        className="flex flex-col gap-2"
                    >
                        <p className="w-full text-center text-base sm:text-xl lg:text-2xl font-Ubuntu text-[#F2AB37]">
                            Compre!
                        </p>
                        <div className="w-full sm:w-36 lg:w-auto border-4 border-white rounded-md flex items-center justify-center">
                            <img
                                src={compra}
                                alt="Img not found"
                                
                            />
                        </div>
                    </animated.div>
                </div>
            </div>
        </div>
    );
}
