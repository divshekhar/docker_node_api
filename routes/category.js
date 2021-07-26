const express = require('express');
const router = express.Router();

router.get('/',(req, res, next) =>{
    res.status(200).json({
        type: 'category type',
        message: 'Category GET Working',
    });
});

router.post('/',(req, res, next) =>{
    const category = {
        name: req.body.name
    };
    res.status(200).json({
        type: 'category type',
        message: 'Category POST Working',
        category: category
    });
});

router.get('/:categoryName',(req, res, next) =>{
    const categoryName = req.params.categoryName;
    res.status(200).json({
        type: `${categoryName} - Route Name`,
        message: 'Category Name GET Route Working',
    });
});

router.post('/:categoryName',(req, res, next) =>{
    const newCategory = {
        name: req.body.name
    };
    const categoryName = req.params.categoryName;
    res.status(200).json({
        type: `${categoryName} - Route Name`,
        message: 'Category Name POST Route Working',
        newCategory: newCategory
    });
});

module.exports = router;