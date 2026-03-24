import GuideForm from "./GuideForm";


const AddGuide = ({open, onClose, onSuccess, initialData = null}) =>{



    if (!open) return null;
    return(
        <GuideForm
            open={open}
            onClose={onClose}
            onSuccess={onSuccess}
            initialData={initialData} 
        />
    );
}
export default AddGuide;