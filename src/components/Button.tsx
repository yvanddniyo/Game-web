import { ButtonProps } from "../types";

const Button = ({id, title, leftIcon, containerClass}: ButtonProps) => {
  return (
    <button id={id} className={`${containerClass} group relative z-10 w-fit overflow-hidden cursor-pointer rounded-full bg-voilet-50 px-7 py-3 text-black`}>
        {leftIcon}
        <span className="relative inline-flex overflow-hidden font-general text-xs uppercase">
            <div className="">
            {title}
            </div>
        </span>
        
    </button>
  )
}

export default Button