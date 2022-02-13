require("dotenv").config();
const express = require("express");
require("./config/database").connect();
var cors = require('cors');
const product = require("./model/model-product");
const cartProduct = require("./model/cart-model");
const path=require("path");
const app = express();
app.use(express.json());
app.use(cors());

app.use(express.static(path.join(__dirname, 'public/dist/TechCommerceUi')));
app.get("/",(req,res)=>{
    res.sendFile(path.join(__dirname, "public/dist/TechCommerceUi/index.html"));
  
})


app.get("/all-product", async (req, res) => {
  const products = await product.find();
  res.status(200).json(products);
});

app.post("/add-product",async (req, res) => {
  const{name,imageLink,price} = req.body
  if(!(name && imageLink && price)){
    res.status(400).send("All fileds are req.")
  }
  const products=await product.findOne({name})
  if(products){
    res.status(400).send("Product is already there.")
  }
  //  "https://material.angular.io/assets/img/examples/shiba2.jpg"
  product
    .create({
      name,
      imageLink,
      price,
    })
    .then(() => {
      res.status(200).json("product created succussfully");
    })
    .catch(() => {
      res.status(400).json("product  not created");
    });
});

app.get("/all-product-cart", async (req, res) => {
    const products = await cartProduct.find();
    if(products){
        res.status(200).json(products);
    }else{
        res.status(401).send("No product found in cart")
    }
  });
app.post("/add-cart", async (req, res) => {
  const { name, imageLink, quantity, price } = req.body;
  const products = await cartProduct.find({ name });
  if (!products.length || products[0].isBought) {
    cartProduct
      .create({
        name,
        imageLink,
        price,
        quantity,
        isBought:false,
        details:''
      })
      .then(() => {
        res.status(200).json("product added to cart");
      })
      .catch(() => {
        res.status(400).json("product  not added");
      });
  } else {
    res.status(401).send("Product is already there");
  }
});
app.put("/edit-product", (req, res) => {
  const price = req.body.price;
  const imageLink = req.body.imageLink;
  const name = req.body.name;
  if (imageLink || price) {
    product
      .findOne({ name: name })
      .then(() => {
        if (price) {
          product
            .updateMany(
              { name: name },
              {
                price: price,
              }
            )
            .then(() => {
              res.status(200).send("price updated");
            });
        }
        if (imageLink) {
          product
            .updateMany(
              { name: name },
              {
                imageLink: imageLink,
              }
            )
            .then(() => {
              res.status(200).send("imageLink updated");
            });
        }
      })
      .catch(() => {
        res.status(400).send("No such product found");
      });
  }
});
app.delete("/remove-from-cart/:id",(req,res)=>{
  cartProduct.deleteOne({ _id:req.params.id }).then(()=>{
    res.status(200).send("Product removed from cart")
  }).catch(()=>{
    res.status(400).send("Product can not be removed")
  })
})
app.put('/order',async(req,res)=>{
  const isBought = req.body.isBought;
  const details = req.body.details;
  const name = req.body.name;
  if (isBought && details && name) {
    cartProduct
      .findOne({ name: name })
      .then(() => {
        cartProduct
            .updateMany(
              { name: name },
              {
                isBought:isBought,
                details:details
              }
            )
            .then(() => {
              res.status(200).send("Product Order completed");
            });
      })
      .catch(() => {
        res.status(400).send("Order failed.");
      });
  }
})

const { PORT } = process.env;

app.listen(PORT, () => console.log(`server is runing at port ${PORT}`));
