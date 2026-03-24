import AgenceForm from "./AgenceForm";

const AddAgence = ({ open, onClose, onSuccess, initialData = null }) => {
    return (
        <AgenceForm
            open={open}
            onClose={onClose}
            onSuccess={onSuccess}
            initialData={initialData} 
        />
    );
};

export default AddAgence;