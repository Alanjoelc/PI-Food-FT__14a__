import React from 'react';
export default function Card ({title, summary, image, diets}) {
    return (
    <div>
        <div>
        <h5>{title}</h5>
        <div>
            <div>
                <img src={image}/>
            </div>
            <div>
                <p>{summary}</p>
            </div>
            </div>
        </div>
    </div>
    );
};