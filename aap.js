let express = require('express');
let app = express();
let dotenv = require('dotenv');
dotenv.config();
let port = process.env.PORT || 2111;
let mongo = require('mongodb');
const { query } = require('express');
let MongoClient = mongo.MongoClient;
let bodyparser = require('body-parser');
let cors =require('cors');
// let mongoUrl = process.env.MongoUrl;
let MongoLiveUrl = process.env.MongoLiveUrl;
let db;

//------>>> First Route API//------>>>

app.get('/', (req, res) => {
    res.send('express server is running')
})

//------>>> CATEGORY API//------>>>

app.get('/category', (req, res) => {

    let categoryId = Number(req, query.id);
    let category_type = re.query.type;
    let query = {};
    if (categoryId && category_type) {
        query = {
            id: categoryId,
            type: category.type
        }
    } else if (categoryId) {
        query = {
            id: categoryId
        }
    } else if (category_type) {
        query = {
            id: category_type
        }
    }
    db.collection('category').find().toArray((err, result) => {
        if (err) throw err;
        res.send(result)
    });
})

app.get('/city', (req, res) => {
    db.collection('city').find().toArray((err, result) => {
        if (err) throw err;
        res.send(result)
    });
})

// --------->>>>>>> API FOR GIFTCARDS <<<<<<<--------

app.get('/giftCards', (req, res) => {
    let card_id = Number(req.params.id);
    db.collection('giftCards').find({ "gift_id": card_id }).toArray((err, result) => {
        if (err) throw err;
        res.send(result)
    });
})

// --->>>>>> GIFT CARDS BASED ON USER'S SELECTION <<<<<<<----

app.post('/giftCards', (req, res) => {
    console, log(req.body);
    db.collection('giftCards').find({ _id: { $in: req.body } }).toArray((err, result) => {
        if (err) throw err;
        res.send(result)
    });
});

// -------->>>>>>>PLACING ORDER FOR GIFT CARDS <<<<<<<<-----

app.post('/giftCards',(req, res)=>{
    db.collection('giftCards').insert(req.body, (err,result)=>{
        if(err) throw err
        res.send(result);
    });
});


// ------->>>>>>> UPDATE API FOR GIFT CARDS <<<<<<<------

app.put('/updategiftOrder/:id', (req, res) => {
    let oId = mongo.ObjectId(req.params.id)
    let status = req.query.status ? req.query.status : 'Panding'

    db.collection('giftCardOrders').updateOne({ _id: oId },
        {
            $set: {
                "status": status,
                "bank_name": req.body.bank_name,
                "bank_status": req.body.bank_status
            }
        }, (err, result) => {
            if (err) throw err
            res.send(`status update to ${status}`);
        })
})

// -------DELETING ORDER FOR GIFT CARDS -------

app.delete('/deletegiftCardOrder', (req, res) => {
    let email = req.params.email;
    let query = {}
    if (email) {
        query = { "email": email }
    };

    db.collection('giftCards').remove(query, (req, result) => {
        if (err) console.log(err)
        res.send("Gift cards order deleted")
    });
});


// ---------Filtering Orders --------

app.get('/filter', (req, res) => {
    let item_type = query.type;
    let sort = { Rating: 1 };
    let bprice = Number(req.query.bprice);
    let aprice = Number(req.query.aprice);
    let arate = Number(req.query.arate);
    let brate = Number(req.query.brate);
    let categoryId = Number(req.query.id);
    let query = {}
    if (sort) {
        sort = { Rating: req.query.sort };
    }
    if (categoryId && aprice && item_type && arate && brate) {
        query = { _id: categoryId, $and: [{ Price: { $bprice, $it: aprice } }], type: item_type, Ratings: { $gte: arate }, Ratings: { $lte: brate } }
    }
    else if (categoryId && bprice && aprice) {
        query = { _id: categoryId, $and: [{ Price: { $gt: bprice, $lt: aprice } }] }
    }
    else if (categoryId && item_type) {
        query = { _id: categoryId, type: item_type }
    }
    else if (bprice && aprice)
        query = {
            _and: [{ Price: { $gt: bprice, $lt: aprice } }]
        }
    else if (arate) {
        query = { Ratings: { $gte: arate } }
    }
    else if (brate) {
        query = { Ratings: { $lte: brate } }
    }
    if (item_type) {
        query = { type: item_type }
    }
    db.collection('Menu').find(query).sort(sort).tiArray((err, result) => {
        if (err) throw err;
        res.send(result)
    });
});

// ------>>>>>> PLACE ORDER FROM MENU (COFFEE/ FOOD) <<<<<<<------

app.post('/MenuItem',(req,res)=>{
    console.log(req.body);
    db.collection('Menu').find({_id:{$in:req.body}}).toArray((err,result)=>{
        if(err) throw err;
        res.send(result);
    });
});

// ------>>>>>> DELETE ORDERS <<<<<<------

app.delete('/deleteOrder',(req, res)=>{
    let email=req.query.email;
    let query = {};
    if(email){
        query={"email":email};
    }
    db.collection('orders').remove({},(err, result)=>{
        if(err) throw err 
        res.send("orders (s) deleted.");   
    });
});

// --------FIND A STORE --------- 
app.get('/store', (req, res) => {
    let city = Number(res.query.city_id);
    let cityName = req.query.city_Name;
    let query = {};
    if (city && cityName && Name) {
        query = {
            city_id: city,
            city_Name: cityName
        }
    } else if (city) {
        query = { city_id: city }
    }
    else if (cityName) {
        query = { city_Name: cityName }
    }
    else if (Name) {
        query = { Name: Name }
    }

    db.collection('store').find().toArray((err, result) => {
        if (err) throw err;
        res.send(result)
    });
});


// ---------API FOR JOBS ---------
app.get('/jobs', (req, res) => {
    let cityId = Number(req.query.city_id);
    let cityname = req.query.city_name;
    let profile = req.query.profile;
    if(cityId && profile){
        query = {city_id:city_Id,
        profile:profile
    };
    }
    else if(cityname && profile){
        query={city_Id:city_Id};
    }
    else if(cityId){
        query={city_Id:city_Id};
    }
    else if(cityname){
        query={cityname:cityname};
    }
    else if(profile){
        query={profile:profile}
    }
    db.collection('jobs').find(query).toArray((err, result) => {
         if (err) throw err;
        res.send(result)
 });
});


// ------>>>>>> Connection with db <<<<<<--------

MongoClient.connect(MongoLiveUrl, (err, client) => {
    if (err) console.log('Error While connecting');
    db = client.db('starbucksdata');
    app.listen(port, (err) => {
        if (err) throw err
        console.log(`server is run on port ${port}`)
    });
});


