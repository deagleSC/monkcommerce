import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import CategoryCard from '../components/CategoryCard';

const Home = () => {

  const [categories, setCategories] = useState([])

  useEffect(() => {

    const getCategories = async () => {
      const response = (await axios.get(`${process.env.REACT_APP_BACKEND_URL}/shop/categories?page=1&limit=20`)).data.categories
      setCategories(response)
    }

    getCategories()

  }, [])

  return (
    <div className='home'>
      {categories.map((category) => ( 
        <div>
          <CategoryCard name={category.name} id={category.categoryID}/>
        </div>
      ))}

    </div>
  )
}

export default Home;