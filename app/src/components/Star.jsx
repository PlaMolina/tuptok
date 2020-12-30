import React, { useState, useEffect, useContext } from 'react';
import StarRatingComponent from 'react-star-rating-component';

import Context from "../context/Context";

const Star = (props) => {

    const context = useContext(Context);
    const [rating, setRating] = useState(props.valor);

    const onStarClick = (nextValue, prevValue, name) => {
        setRating(nextValue);
    }

    useEffect(() => {
        console.log(props.valor);
        setRating(rating);
    }, [rating])

    context.setRating(rating);

    const Estrellas = () => {
        if (props.valor !== "") {
            return (
                <StarRatingComponent
                    name="rate1"
                    starCount={5}
                    value={rating}
                    onStarClick={onStarClick} />
            )
        }
        return null;
    }

    return (
        <>
            <Estrellas />
        </>
    );
}

export default Star;
