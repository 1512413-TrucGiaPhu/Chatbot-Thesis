const router = require('express').Router();
const Product = require("../models/product");

const checkJWT = require('../middlewares/check-jwt');

const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
const s3 = new aws.S3({ accessKeyId: "AKIAIS3M5G63LT5NGRMQ", secretAccessKey: "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" });

var upload = multer({
    storage: multerS3({
      s3: s3,
      bucket: 'amazonopkurt',
      metadata: function (req, file, cb) {
        cb(null, {fieldName: file.fieldname});
      },
      key: function (req, file, cb) {
        cb(null, Date.now().toString())
      }
    })
  });
  
  

const faker = require('faker')

router.route('/products')
    .get(checkJWT, (req, res, next)=>{
        Product.find({ owner: req.decoded.user._id })
        .populate('owner')
        .populate('category')
        .exec((err, products) => {
            if(products){
                res.json({
                    success: true,
                    message: "Products",
                    products: products
                })
            }
        })
    })
    .post([checkJWT, upload.single('product_picture')], (req,res,next)=>{
        console.log(upload);
        console.log(req.file);
        let product = new Product();
        product.owner = req.decoded.user._id;
        product.category = req.body.categoryId;
        product.title = req.body.title;
        product.price = req.body.price;
        product.description = req.body.description;
        product.image = req.file.location;
        product.save();
        res.json({
            success: true,
            message: 'Successfully Added the product'
        });
    });

router.get('/faker/test', (req,res,next)=>{
    for ( i = 0; i < 20; i++){
        let product = new Product();
        product.category = '5c224bad7a16ee07c85fbd16';
        product.owner = '5c28908004c604452c246d6e';
        product.image = faker.image.cats();
        product.title = faker.commerce.productName();
        product.description = faker.commerce.price();
        product.save();
    }
    res.json({
        message: 'Images added'
    })
})

module.exports = router;