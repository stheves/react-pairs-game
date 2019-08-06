import React, {useContext, useEffect, useState} from "react";
import './card.css';
import {Front} from "./front";
import {Back} from "./back";
import PropTypes from 'prop-types';
import {GameContext} from "./react-pairs-game";

export const CardSide = {
    FRONT: true,
    BACK: false
};

export function Card({id, label, delay}) {
    const [side, setSide] = useState(null);
    const {updateCardSide} = useContext(GameContext);

    useEffect(() => {
        updateCardSide(id, side);
        if (!side) {
            return;
        }
        const timer = setTimeout(() => {
            turnAround();
        }, delay);
        return () => clearTimeout(timer);
    }, [side, delay, id, updateCardSide]);

    function turnAround() {
        setSide(s => !s);
    }

    function getSide() {
        if (side === CardSide.FRONT) {
            return <Front label={label}/>;
        } else {
            return <Back/>;
        }
    }

    return (
        <div className={'rp-card'} onClick={turnAround}>
            {getSide()}
        </div>
    );
}

Card.propTypes = {
    id: PropTypes.string,
    label: PropTypes.string,
    delay: PropTypes.number
};

Card.defaultProps = {
    id: "N/A",
    label: 'Front',
    delay: 3000
};