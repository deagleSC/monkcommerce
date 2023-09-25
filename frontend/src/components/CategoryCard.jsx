import React from 'react';
import { useNavigate } from 'react-router-dom';

const CategoryCard = ({name, id}) => {

    const navigate = useNavigate()

    const handleClick = () => {
        navigate(`/${id}`)
    }

    return (
        <div className='categoryCard' onClick={handleClick}>
            <p>{name}</p>
        </div>
    )
}

export default CategoryCard