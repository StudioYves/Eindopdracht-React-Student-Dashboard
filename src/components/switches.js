const Switches = (props) => {
    const handleSelectChange = (event) => {
        props.selectChange(props.selectName, event.target.checked)
    }
    return (
        <div className="switchWithLabel">
            <label className="switch">
                <input className={props.inputClass}
                    type="checkbox"
                    onClick={handleSelectChange}
                    defaultChecked
                >
                </input>

                <span className="slider round"></span>

            </label>
            <span className="switchLabel">{props.selectText}</span>
        </div>
    )
}

export default Switches
