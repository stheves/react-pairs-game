import React, {useEffect, useState} from "react";
import './card.css';
import {Front} from "./front";
import {Back} from "./back";
import PropTypes from 'prop-types';

const SIDE = {
    FRONT: true,
    BACK: false
};

export function Card({label, delay}) {
    const [side, setSide] = useState(null);

    useEffect(() => {
        if (!side) {
            return;
        }
        const timer = setTimeout(() => {
            otherSide();
        }, delay);
        return () => clearTimeout(timer);
    }, [side]);

    function otherSide() {
        setSide(s => !s);
    }

    function handleClick() {
        otherSide();
    }

    function getSide() {
        if (side === SIDE.FRONT) {
            return <Front label={label}/>;
        } else {
            return <Back/>;
        }
    }


    return (
        <div className={'rp-card'} onClick={handleClick}>
            {getSide()}
        </div>
    );
}

Card.propTypes = {
    label: PropTypes.string,
    delay: PropTypes.number
};

Card.defaultProps = {
    label: 'Front',
    delay: 3000
};