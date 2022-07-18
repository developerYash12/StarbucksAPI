let express = require('express');
let app = express();
let dotenv = require('dotenv');
dotenv.config();
let port = process.env.PORT || 2111;
let mongo = require('mongodb');
const { query } = require('express');
let MongoClient = mongo.MongoClient;
let bodyparser = require('body-parser');
let cors = require('cors');
// let mongoUrl = process.env.MongoUrl;
let MongoLiveUrl = process.env.MongoLiveUrl;
let db;

//------>>> First Route API//------>>>

// First route Api
app.get('/',(req,res) => {
    res.send(' Starbucks Node Server ')
})

// Category Api
app.get('/category',(req,res)=>{
    let categoryId = Number(req.query.id);
    let category_type = req.query.type;
    let query = {};

    if(categoryId && category_type){
        query = {
            id:categoryId,
            type:category_type
        }
    }
    else if(categoryId){
        query={
            id:categoryId
        }
    }
    else if(category_type){
        query={
            type:category_type
        }
    }
    
    db.collection('category').find(query).toArray((err,result)=>{
        if(err) console.log(err)
        res.send(result);
    })
})

// Stores Finder Api
app.get('/store',(req,res)=>{
    let city = Number(req.query.city_id);
    let cityname = req.query.city_name;
    let name = req.query.name;
    let query = {};
    if(city && cityname && name){
        query = {
            city_id:city, 
            city_name:cityname
        }
    }
    else if(city){
        query = {city_id:city}
    }
    else if(cityname){
        query = {city_name:cityname}
    }
    else if(name){
        query = {name:name}
    }

    db.collection('store').find(query).toArray((err,result)=>{
        if(err) throw err;
        res.send(result);
    })
})


app.get('/city',(req,res) => {
    db.collection('city').find().toArray((err,result) => {
        if (err) throw err;
        res.send(result)
    })
})

app.get('/item/:id',(req,res)=>{
    let categoryId = Number(req.params.id);
    
    db.collection('menu').find({"category_id":categoryId}).toArray((err,result)=>{
        if(err) console.log(err)
        res.send(result);
    })
})

// Api For Jobs
app.get('/jobs',(req,res)=>{
    let cityId = Number(req.query.city_id);
    let cityname = req.query.city_name;
    let profile = req.query.profile;
    let query = {};
    if(cityId && profile){
        query = {city_id:cityId,
            profile:profile
            };
    }
    else if(cityname && profile){
        query = {city_name:cityname,
            profile:profile
        };
    }
    else if(cityId){
        query = {city_id:cityId};
    }
    else if(cityname){
        query = {city_name:cityname};
    }
    else if(profile){
        query = {profile:profile};
    }
    
    db.collection('jobs').find(query).toArray((err,result)=>{
        if(err) throw err;
        res.send(result);
    })
})


// Gift cards
app.get('/giftcards/:id',(req,res)=>{
    let card_id=Number(req.params.id);
  
    db.collection('giftCards').find({"gift_id":card_id}).toArray((err,result)=>{
        if(err) throw err;
        res.send(result);    
    })
})

// Gift card based on user's selection
app.post('/giftCards',(req,res)=>{
    console.log(req.body);
    db.collection('giftCards').find({_id:{$in:req.body}}).toArray((err,result)=>{
        if(err) throw err;
        res.send(result);
    })
})

// Placing Order For gift cards
app.post('/giftCardOrder',(req,res)=>{
    db.collection('giftCards').insert(req.body,(err,result)=>{
        if(err) throw err;
        res.send("Order for gift card successful.");
    })
})

// Update Api for gift cards
app.put('/updategiftOrder/:id',(req,res)=>{
    let oId=mongo.ObjectId(req.params.id)

    let status=req.query.status?req.query.status:'Pending'
    db.collection('giftcardOrders').updateOne(
        {_id:oId},
        {$set:{
                "status":status,
                "bank_name":req.body.bank_name,
                "bank_status":req.body.bank_status
            
        }},(err,result)=>{
            if(err) throw err
            res.send(`status updated to ${status}`);
            
        }
    )
})

// Deleting Order for gift cards
app.delete('/deletegiftOrder',(req,res)=>{
    let email=req.query.email;
    let query={}
    if(email){
        query={"email":email}
    }
    db.collection('giftcardOrders').remove(query,(err,result)=>{
       if(err) console.log(err)
       res.send("Gift card orders deleted.")
    })
})

// Filtering Orders
app.get('/filter',(req,res)=>{
    let item_type=req.query.type;
    let sort = {Ratings:1}
    let bprice = Number(req.query.bprice);  
    let aprice = Number(req.query.aprice);
    let arate= Number(req.query.arate);
    let brate= Number(req.query.brate);
    let categoryId = Number(req.query.id);
    let query={}
    if(sort){
        sort={Ratings:req.query.sort}
    }
    if(categoryId && bprice && aprice && item_type && arate && brate){
        query={_id:categoryId,$and:[{Price:{$gt:bprice,$lt:aprice}}],type:item_type, Ratings:{$gte:arate}, Ratings:{$lte:brate}}
    }
    else if(categoryId && bprice && aprice){
        query={_id:categoryId,$and:[{Price:{$gt:bprice,$lt:aprice}}]}
    }
    else if(categoryId && item_type){
        query={_id:categoryId,type:item_type}
    }
    else if(bprice && aprice){
        query={$and:[{Price:{$gt:bprice,$lt:aprice}}]}
    }
    else if(arate){
        query={Ratings:{$gte:arate}}
    }
    else if(brate){
        query={Ratings:{$lte:brate}}
    }
    if(item_type){
        query={type:item_type}
    }
       
    
    db.collection('menu').find(query).sort(sort).toArray((err,result)=>{
        if(err) throw err;
        res.send(result)
    })

})

// Place order from menu (Coffee/Food)
app.post('/placeOrder',(req,res)=>{
    db.collection('orders').insert(req.body,(err,result)=>{
        if(err) throw err;
        res.send("Order Added.");
    })
})

// Menu item based on user's selection
app.post('/menuItem',(req,res)=>{
    console.log(req.body);
    db.collection('menu').find({_id:{$in:req.body}}).toArray((err,result)=>{
        if(err) throw err;
        res.send(result);
    })
})

// Update orders
app.put('/updateOrder/:id',(req,res) => {
    let oId = mongo.ObjectId(req.params.id)
    let status = req.query.status?req.query.status:'Pending'
    db.collection('orders').updateOne(
        {_id:oId},
        {$set:{
            "status":status,
            "bank_name":req.body.bank_name,
            "bank_status":req.body.bank_status
        }},(err,result)=>{
            if(err) throw err;
            res.send(`Status Updated to ${status}`)
        }
    )
})

// Delete orders
app.delete('/deleteOrder',(req,res)=>{
    let email=req.query.email;
    let query={}
    if(email){
        query={"email":email}
    }
    db.collection('orders').remove({},(err,result)=>{
        if(err) throw err;
        res.send("Order(s) deleted.");
    })
})

// ------>>>>>> Connection with db <<<<<<--------

MongoClient.connect(MongoLiveUrl , (err, client) => {
    if (err) console.log('Error While connecting');
    db = client.db('starbucksdata');
    app.listen(port, (err) => {
        if (err) throw err
        console.log(`server is run on port ${port}`)
    });
});


