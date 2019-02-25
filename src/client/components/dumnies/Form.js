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
