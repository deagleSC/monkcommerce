import React from 'react';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import ProductCard from '../components/ProductCard';

const Products = () => {

    const { id } = useParams()
    const [products, setProducts] = useState([])

    useEffect(() => {

        const getProducts = async () => {
            const response = (await axios.get(`${process.env.REACT_APP_BACKEND_URL}/shop/products?page=1&limit=20&categoryID=${id}`)).data.products
            setProducts(response)
        }

        getProducts()

    }, [])

    return (
    <div className='products'>
        
        {products.map((product) => ( 
            <div>
                <ProductCard 
                name={product.name}
                salePrice={product.salePrice}
                customerReviewCount={product.customerReviewCount}
                imageURL={product.images[0].href}
                />
            </div>
        ))}

    </div>
    )
}

export default Products;