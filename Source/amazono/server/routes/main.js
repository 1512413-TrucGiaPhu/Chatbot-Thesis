const router = require('express').Router();
const Category = require('../models/category');
const Product = require('../models/product')
const Conversation = require('../models/conversation')
const async = require('async');
const Review = require('../models/review');
const stripe = require('stripe')('sk_test_Rqg4fZ6ZxWiorEXiHxJG6Jvh');
const Order = require('../models/order');
const checkJWT = require('../middlewares/check-jwt');
const sendEmail = require('../middlewares/sendEmail');

router.route('/categories')
    .get((req, res, next)=>{
        Category.find({}, (err,categories)=>{
            res.json({
                success: true,
                message: "Success",
                categories: categories
            })
        })
    })
    .post((req, res, next)=>{
        let category = new Category();
        category.name = req.body.category;
        category.save();
        res.json({
            success: true,
            message: "Successful"
        });
    });

    // router.get('/products', (req, res, next) => {
    //   const perPage = 10;
    //   const page = req.query.page;
    //   async.parallel([
    //     function(callback) {
    //       Product.count({}, (err, count) => {
    //         var totalProducts = count;
    //         callback(err, totalProducts);
    //       });
    //     },
    //     function(callback) {
    //       Product.find({})
    //         .skip(perPage * page)
    //         .limit(perPage)
    //         .populate('category')
    //         .populate('owner')
    //         .exec((err, products) => {
    //           if(err) return next(err);
    //           callback(err, products);
    //         });
    //     }
    //   ], function(err, results) {
    //     var totalProducts = results[0];
    //     var products = results[1];
       
    //     res.json({
    //       success: true,
    //       message: 'category',
    //       products: products,
    //       totalProducts: totalProducts,
    //       pages: Math.ceil(totalProducts / perPage)
    //     });
    //   });
      
    // });

    router.get('/products', (req,res,next)=>{
      Product.find({}, (err, products) =>{
        res.json({
          success: true,
          message: 'category',
          products: products
        })
      })
    })
    
    router.get('/product/:id', (req, res, next) => {
      Product.findById({ _id: req.params.id })
        .populate('category')
        .populate('owner')
        .deepPopulate('reviews.owner')
        .exec((err, product) => {
          if (err) {
            res.json({
              success: false,
              message: 'Product is not found'
            });
          } else {
            if (product) {
              res.json({
                success: true,
                product: product
              });
            }
          }
        });
    });

// router.get('/categories/:id', (req,res,next)=>{
//     const perPage = 10;
//     const page = req.query.page;

    
//     async.waterfall([
//         function(callback){
//             Product.count({ category: req.params.id }, (err,count)=>{
//                 var totalProducts = count;
//                 callback(err, totalProducts);
//             });
//         },
//         function(totalProducts, callback){
//             Product.find({ category: req.params.id})
//             .skip(perPage * page)
//             .limit(perPage)
//             .populate('category')
//             .populate('owner')
//             .exec((err, products) =>{
//                 if (err) return next(err);
//                 callback(err, products, totalProducts);
//             });
//         },
//         function(products, totalProducts, callback){
//             Category.findOne({ _id: req.params.id}, (err, category) =>{
//                 res.json({
//                     success: true,
//                     message: 'category',
//                     products: products,
//                     categoryName: category.name,
//                     totalProducts: totalProducts,
//                     pages: Math.ceil(totalProducts / perPage)
//                 });
//             });
//         }

//     ]);
// });

router.get('/categories/:id', (req, res, next) => {
    const perPage = 10;
    const page = req.query.page;
    async.parallel([
      function(callback) {
        Product.count({ category: req.params.id }, (err, count) => {
          var totalProducts = count;
          callback(err, totalProducts);
        });
      },
      function(callback) {
        Product.find({ category: req.params.id })
          .skip(perPage * page)
          .limit(perPage)
          .populate('category')
          .populate('owner')
          .populate('reviews')
          .exec((err, products) => {
            if(err) return next(err);
            callback(err, products);
          });
      },
      function(callback) {
        Category.findOne({ _id: req.params.id }, (err, category) => {
         callback(err, category)
        });
      }
    ], function(err, results) {
      var totalProducts = results[0];
      var products = results[1];
      var category = results[2];
      res.json({
        success: true,
        message: 'category',
        products: products,
        categoryName: category.name,
        totalProducts: totalProducts,
        pages: Math.ceil(totalProducts / perPage)
      });
    });
    
  });



  router.get('/productsearch', async (req, res) => {
    // extract param:
    let queryName = req.query.name;
    Product.findOne({ title: new RegExp(queryName, "i") })
      .exec()
      .then(product => {
        res.json({
          success: true,
          product: product
        })
    }).catch(err => {
      res.json({
        success: false,
        message: 'An error has occurred' + err
      })
    })
  })

  router.post('/conversation', (req, res) => {
    let {userId, dialog} = req.body;
    let conversation = new Conversation();
    conversation.userId = userId;
    conversation.dialog = dialog;
    conversation.save().then(result => {
      console.log(result);
      // save conversation success, start to send email to admin

      let adminList = ['trucgiaphu@gmail.com','lifabled@yahoo.com']
      let content = `<h1>Chào admin</h1><p>Hiện giờ có user cần được support, click vào link: <a href="http://localhost:4200/admin-chat/${result._id}">http://localhost:4200/admin-chat/${result._id}</a> để chat với user</p>`;
      adminList.forEach(admin => {
        sendEmail(admin, content)
      })

      res.json({
        success: true,
        message: 'conversation',
        conversation: result
      })
    }).catch(err => {
      res.json({
        success: false,
        message: 'conversation',
        error: err
      })
    })
  })

  router.put('/conversation', checkJWT, (req, res) => {
    let {id, userId, dialog, isClosedChat } = req.body;
    console.log(req.body);
    Conversation.findByIdAndUpdate({ _id: id }, { dialog, userId, isClosedChat }).then(result => {
      console.log(result);
      res.json({ success: true, message: 'conversation', conversation: result})
    }).catch(err => {
      res.json({ success: false, message: 'conversation', error: err })
    })

  })

  router.get('/conversations', checkJWT, (req, res) => {
    Conversation.find({}, (err, conversations) =>{
      res.json({
        success: true,
        message: 'conversations',
        conversations: conversations
      })
    })
  })

  router.post('/review', checkJWT, (req,res,next)=>{
    async.waterfall([
      function(callback){
        Product.findOne({_id: req.body.productId}, (err, product)=>{
          if (product){
            callback(err, product);
          }
        });
      },
      function(product){
        let review = new Review();
        review.owner = req.decoded.user._id;

        if(req.body.title) review.title = req.body.title;
        if(req.body.description) review.description = req.body.description
        review.rating = req.body.rating;

        product.reviews.push(review._id);
        product.save();
        review.save();
        res.json({
          success: true,
          message: "Successfully added the review"
        });

      }
    ])
  })

  router.post('/payment', checkJWT, (req, res, next) => {
    const stripeToken = req.body.stripeToken;
    const currentCharges = Math.round(req.body.totalPrice * 100);
  
    stripe.customers
      .create({
        source: stripeToken.id
      })
      .then(function(customer) {
        return stripe.charges.create({
          amount: currentCharges,
          currency: 'usd',
          customer: customer.id
        });
      })
      .then(function(charge) {
        const products = req.body.products;
  
        let order = new Order();
        order.owner = req.decoded.user._id;
        order.totalPrice = currentCharges;
        
        products.map(product => {
          order.products.push({
            product: product.product,
            quantity: product.quantity
          });
        });
  
        order.save();
        res.json({
          success: true,
          message: "Successfully made a payment"
        });
      });
  });
  

module.exports = router;