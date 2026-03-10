import {Bt2 } from "../../../ui/Bt";

const GeneriqueHeader = ({title, label, text}) =>{

    return(
        < div className="flex justify-between items-center">
            <div className="flex flex-col items-start text-left space-y-2">
                <h4 className="text-xl text-primary font-medium">{title}</h4>
                <h1 className="text-3xl font-bold text-black leading-tight">{label}</h1>
                <p className="text-xl text-text-soft max-w-md">{text}</p>
            </div>
            <Bt2 label="Voir plus" />
        </div>
    )
}

export default GeneriqueHeader;