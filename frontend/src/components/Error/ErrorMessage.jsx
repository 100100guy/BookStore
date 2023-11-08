//error message jsx template
import React from "react";

const ErrorMessage = ({ children }) => {
    return (
        <div className="alert alert-danger" role="alert">
        {children}
        </div>
    );
    }

export default ErrorMessage;