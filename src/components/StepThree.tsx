const StepThree = ({ onBack }) => {
    return (
        <div>
            <h2 className="text-xl font-bold mb-4">Step 3</h2>
            {/* Your form fields for step 1 */}
            <button 
                className="bg-blue-500 text-white px-4 py-2 rounded"
                onClick={onBack}>
                Prev
            </button>
        </div>
    );
};

export default StepThree;