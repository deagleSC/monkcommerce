import React from 'react'

const ProductCard = ({name, salePrice, customerReviewCount, imageURL}) => {
  return (
    <div className='productCard'>
        <img src={imageURL}></img>
        {name.substring(0, 20)}...
        <b>${salePrice}</b>
        <small>{customerReviewCount} reviews</small>
    </div>
  )
}

export default ProductCard