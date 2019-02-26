import React from "react";

export default props => {
    const generateInputs = () => {
        const form = [];
        props.inputs.forEach(elem => {
            form.push(
                <input
                    name={elem.name}
                    type={elem.type}
                    key={elem.name}
                    value={elem.value}
                    placeholder={elem.placeholder}
                    min={elem.min}
                    max={elem.max}
                    step={elem.step}
                    defaultValue={elem.defaultValue}
                    className={elem.className}
                />,
            );
        });
        return form;
    };

    return (
        <form onSubmit={props.onSubmit} className="formComp">
            {generateInputs()}
        </form>
    );
};
