import './Option.css';

const Option = ({ icon, type, onClick }) => {

    return (
        <div className={`Option ${type}`} onClick={onClick}>
            {icon}
            0.00
        </div>
    );
}

export default Option;