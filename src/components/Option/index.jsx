import './Option.css';

const Option = ({ icon, type, onClick, total=-1 }) => {

    return (
        <div className={`Option ${type}`} onClick={onClick}>
            {icon}
            {total >= 0 ? total.toFixed(2) : null}
        </div>
    );
}

export default Option;