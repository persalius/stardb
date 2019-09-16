import React from "react";
import PropType from "prop-types";

const Row = ({left, right}) => {
    return (
        <div className="row mb2">
            <div className="col-md-6">
                {left}
            </div>
            <div className="col-md-6">
                {right}
            </div>
        </div>
    )
};

Row.propsTypes = {
    left: PropType.node,
    right: PropType.node
};

export default Row;