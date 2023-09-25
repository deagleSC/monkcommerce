import Category from "../models/Category.js";
import Product from "../models/Product.js";
import axios from "axios";

const syncCategories = async () => {
  let pageCount = 1
  
  while (true) {
    const categoriesResponse = await axios.get(
        'https://stageapi.monkcommerce.app/task/categories',
        {
          headers: {
            'x-api-key': process.env.STAGE_API_KEY, // Replace with your API key
          },
          params: {
            page: pageCount, 
            limit: 100
          }
        }
    );

    if (!categoriesResponse.data.categories) return null

    let categories = (categoriesResponse.data.categories).map((c) => {return {...c, categoryID: c.id}})
    let existingCategories = (await Category.find()).map((c) => c.categoryID)

    let categoriesToInsert = categories.filter((category) => !existingCategories.includes(category.categoryID))
    let categoriesToUpdate = categories.filter((category) => existingCategories.includes(category.categoryID))

    categoriesToUpdate = categoriesToUpdate.map((c) => {
        return {
            updateOne: {
                filter: { categoryID: c.categoryID },
                update: { ...c },
                upsert: true
            }
        }
    })

    await Category.insertMany(categoriesToInsert)
    await Category.bulkWrite(categoriesToUpdate)

    return categories
  }
}

const syncProduct = async (categoryID) => {
    try {
    const productsResponse = await axios.get(
        'https://stageapi.monkcommerce.app/task/products',
        {
          headers: {
            'x-api-key': process.env.STAGE_API_KEY, // Replace with your API key
          },
          params: {
            categoryID: categoryID,
            page: 1, 
            limit: 100
          },
        }
      );

    let products = productsResponse.data.products;
    if (!products) return null

    products = products.map((p) => {return {...p, category: categoryID}})

    await Product.insertMany(products)

    let category = await Category.find({categoryID: categoryID})
    let categoryProducts = (await Product.find({category: categoryID})).map((p) => p._id.toString())

    await Category.updateOne({categoryID: categoryID}, 
    {...category, products: categoryProducts, productCount: products.length})

    return products
    } catch (error) {
        console.log(error)
    }
}

export const syncController = async (req, res, next) => {
  try {
      const categories = await syncCategories()
      if (categories) {
        for (const category of categories) {
            const products = await syncProduct(category.categoryID)
        }
      }

      return res.status(200).json("Synced succesfully!")
  } catch (error) {
      res.status(500).json({"Error": error.message})
  }
}