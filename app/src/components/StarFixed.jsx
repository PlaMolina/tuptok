import React from 'react';
import StarRatingComponent from 'react-star-rating-component';

const StarFixed = (props) => {

    return (
        <StarRatingComponent
            name="rate2"
            editing={false}
            starCount={5}
            value={props.valor} />
    );
}

export default StarFixed;
