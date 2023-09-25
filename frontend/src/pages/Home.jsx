import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import CategoryCard from '../components/CategoryCard';
import { CircularProgress } from '@mui/material';

const Home = () => {

  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {

    const getCategories = async () => {
      const response = (await axios.get(`${process.env.REACT_APP_BACKEND_URL}/shop/categories?page=1&limit=20`)).data.categories
      setCategories(response)
      setLoading(false)
    }

    getCategories()
  }, [])

  return (
    <div className='home'>
      {loading && <CircularProgress />}
      {!loading && categories?.map((category) => ( 
        <div>
          <CategoryCard name={category.name} id={category.categoryID}/>
        </div>
      ))}

    </div>
  )
}

export default Home;