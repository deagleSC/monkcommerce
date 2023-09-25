import Category from "../models/Category.js";
import Product from "../models/Product.js";

export const productsController = async (req, res, next) => {
    try {
        const limit = req.query.limit || 1
        const page = req.query.page || 1
        const categoryID = req.query.categoryID

        if (!categoryID) return res.status(400).json({"Error": "Missing query parameters: categoryID"})

        let products = await Product.find({category: categoryID})
        .sort({ customerReviewCount: -1 })
        .limit(limit || 1)
        .skip((page - 1) * limit)

        if (products.length == 0) products = null

        const response = {
            page: page,
            products: products
        }

        return res.status(200).json(response)

    } catch (error) {
        console.log(error)
        return res.status(500).json({"Error": "Internal Server Error"})
    }
}

export const categoriesController = async (req, res, next) => {
    try {

        const limit = req.query.limit || 1
        const page = req.query.page || 1

        let categories = await Category.find()
        .sort({productCount: -1})
        .limit(limit)
        .skip((page - 1) * limit)

        if (categories.length == 0) categories = null

        const response = {
            page: page, 
            categories: categories
        }

        return res.status(200).json(response)

    } catch (error) {
        console.log(error)
        return res.status(200).json({"Error": "Internal Server Error"})
    }
}