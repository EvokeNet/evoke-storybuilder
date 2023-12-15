const StepTwo = ({ onNext, onBack }) => {
    return (
        <div>
            <h2 className="text-xl font-bold mb-4">Step 2</h2>
            {/* Your form fields for step 1 */}
            <button 
                className="bg-blue-500 text-white px-4 py-2 rounded"
                onClick={onBack}>
                Prev
            </button>
            <button 
                className="bg-blue-500 text-white px-4 py-2 rounded"
                onClick={onNext}>
                Next
            </button>
        </div>
    );
};

export default StepTwo;