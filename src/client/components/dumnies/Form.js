import React from "react";

export default props => {
    return (
        <form onSubmit={props.onSubmit}>
            <span>tests</span>
            <input type="submit" />
        </form>
    );
};
