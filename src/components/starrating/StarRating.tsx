import React from 'react';
import './StarRating.scss';
import FullStar from './FullStar';
import HalfStar from './HalfStar';
import EmptyStar from './EmptyStar';

interface StarRatingProps{
    rating: number;
}

const StarRating: React.FC<StarRatingProps> = ({rating}) => {
    
    const filledStars = Math.floor(rating);
    const halfStar = rating % 1 !== 0;
    const emptyStars = 5 - filledStars - (halfStar ? 1 : 0);
  
    return (
    <div className='star-rating'>
        {Array(filledStars).fill(null).map((_,index) => (
            <span key={index} className='star filled'><FullStar/></span>
        ))}
        {halfStar && <span className='star half-filled'><HalfStar/></span>}
        {Array(emptyStars).fill(null).map((_, index) => (
            <span key={index + filledStars + (halfStar ? 1 : 0)} className='star'><EmptyStar/></span>
        ))}
    </div>
  )
}

export default StarRating