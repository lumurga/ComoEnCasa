import React from 'react';
import {Link } from 'react-router-dom';

const Button = (props) => {
    return (
        <Link to={props.route} className="linksHeader">
            {props.text}
        </Link>
    );
}

export default Button;