import React from 'react';
import './Front.css';

const Front = ({value})=>{
    return <div className={'game-card-front'}>
        <div className={'game-card-value'}>{value}</div>
    </div>;
};

export default Front;
