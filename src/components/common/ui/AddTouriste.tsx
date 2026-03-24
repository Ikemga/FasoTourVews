import TouristeForm from "./TouristeForm";


const AddTouriste = ({open, onClose, onSuccess, initialData = null}) =>{


    if (!open) return null;
    return(
        <div>
            <TouristeForm
                open={open}
                onClose={onClose}
                onSuccess={onSuccess}
                initialData={initialData}
            />
        </div>
    );
}
export default AddTouriste;