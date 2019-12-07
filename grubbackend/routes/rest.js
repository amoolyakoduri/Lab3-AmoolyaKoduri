const routes = require('express').Router();
var multer = require('multer')
var upload = multer({ dest: 'uploads/' })
var passport = require('passport');
var jwt = require('jsonwebtoken');
require('./../config/passport')(passport);
const secret_key = "Passphrase for encryption should be 45-50 char long";
var requireAuth = passport.authenticate('jwt', { session: false });
var restService = require('./../services/restaurantService');
var orderService = require('./../services/orderService');

routes.post('/addSection', requireAuth, (req, res) => {
    var token = req.headers.authorization.substr(7);
    var payload = jwt.verify(token, secret_key);
    var ownerEmail = payload.email;
    var payload = {
            ownerEmail: ownerEmail,
            section: req.body.section,
        }
    restService.addSection(payload)
    .then( results => {
        res.status(200).json({ success: true, message: "Section added!", payload: null });
    })
    .catch( err => {
        res.status(500).json({ success: false, message: err.message, payload: null });
    })
})


routes.post('/deleteSection', requireAuth, (req, res) => {
    var token = req.headers.authorization.substr(7);
    var payload = jwt.verify(token, secret_key);
    var ownerEmail = payload.email;
    var payload = {
            ownerEmail: ownerEmail,
            section: req.body.section,
        }
    if (payload.section == undefined) {
        res.status(500).json({ success: false, message: "Section missing", payload: null });
    } else {
        restService.deleteSection(payload)
        .then( results => {
            res.status(200).json({ success: true, message: "Section deleted!", payload: null });
        })
        .catch( err =>{
            res.status(500).json({ success: false, message: err.message, payload: null });
        })
    }
})



routes.post('/addItem', upload.single('pic'), (req, res) => {
    var token = req.headers.authorization.substr(7);
    var payload = jwt.verify(token, secret_key);
    var ownerEmail = payload.email;
    var payload = {
            ownerEmail: ownerEmail,
            section: req.body.section,
            price: req.body.price,
            desc: req.body.desc,
            name: req.body.name,
            pic: req.file.path
        }
    if (payload.section == undefined) {
        res.status(500).json({ success: false, message: "Section missing", payload: null });
    } else {
        restService.addItem(payload)
        .then( results => {
            res.status(200).json({ success: true, message: "Item added!", payload: null });
        })
        .catch( err => {
            res.status(500).json({ success: false, message: err.message, payload: null });
        })
    }
})



routes.post('/deleteItem', requireAuth, (req, res) => {
    var token = req.headers.authorization.substr(7);
    var payload = jwt.verify(token, secret_key);
    var ownerEmail = payload.email;
    var payload = {
            ownerEmail: ownerEmail,
            section: req.body.section,
            itemName: req.body.name
        }
    if (payload.section === undefined || payload.itemName == undefined) {
        res.status(500).json({ success: false, message: "Section or name missing", payload: null });
    } else {
        restService.deleteItem(payload)
        .then( results => {
            res.status(200).json({ success: true, message: "Item deleted!", payload: null });
        })
        .catch( err => {
            res.status(500).json({ success: false, message: err.message, payload: null });
        })
    }
})



routes.get('/getOrders/:restName', requireAuth, (req, res) => {
    var payload  = {
            restName: req.params.restName
        }
    if (payload.restName == undefined) {
        res.status(400).json({ success: false, message: "Rest Name undefined", payload: null });
    } else {
        orderService.getOrdersByRestName(payload)
        .then ( results => {
            if (results.length != 0)
            res.status(200).json({ success: true, message: "Orders fetched", payload: results });
            else
            res.status(200).json({ success: true, message: "No orders", payload: null })
        })
        .catch( err => {
            res.status(500).json({ success: false, message: err.message, payload: null });
        })
    }
})



routes.get('/getPastOrders/:restName', requireAuth, (req, res) => {
    var payload = {
            restName: req.params.restName
        }
    if (payload.restName == undefined) {
        res.status(400).json({ success: false, message: "Rest Name undefined", payload: null });
    } else {
        orderService.getPastOrdersByRestName(payload)
        .then ( results => {
            if (results.length != 0)
            res.status(200).json({ success: true, message: "Orders fetched", payload: results });
            else
            res.status(200).json({ success: true, message: "No orders", payload: null })
        })
        .catch( err => {
            res.status(500).json({ success: false, message: err.message, payload: null });
        })
    }
})



routes.post('/updateOrder', requireAuth, (req, res) => {
    var payload = {
            orderId: req.body.orderId,
            status: req.body.status
        }
    if (payload.orderId == undefined || payload.status == undefined) {
        res.status(500).json({ success: false, message: "Status or order id undefined", payload: null });
    } else {
        orderService.updateOrderStatus(payload)
        .then( results => {
            res.status(200).json({ status: true, message: "Updated status", payload: null });
        })
        .catch ( err => {
            res.status(500).json({ success: false, message: err.message, payload: null });
        })
    }
})



routes.get('/getRestDetails/:ownerEmail', requireAuth, (req, res) => {
    var payload = {
            ownerEmail: req.params.ownerEmail
        }
    restService.getRestDetailsByOwnerEmail(payload)
    .then( results => {
        res.status(200).json({ success: true, message: "Fetching Rest Details", payload: results });
    })
    .catch( err => {
        res.status(400).json({ success: false, message: err.message, payload: null });
    })
});



routes.post('/getOrdersByStatus', requireAuth, (req, res) => {
    var payload = {
            restName: req.body.restName,
            status: req.body.status
        }
    if (payload.status == undefined || payload.restName == undefined) {
        res.status(500).json({ success: false, message: "Status or rest name undefined", payload: null });
    } else {
        orderService.getOrdersByStatus(payload)
        .then( results => {
            res.status(200).json({ success: true, message: "Fetching orders", payload: { orders: results } });
        })
        .catch( err => {
            res.status(500).json({ success: false, message: err.message, payload: null });
        })
    }
})



routes.post('/updateRestDetails', requireAuth, (req, res) => {
    var token = req.headers.authorization.substr(7);
    var payload = jwt.verify(token, secret_key);
    var emailId = payload.email;
    var restDetails = {
        ownerEmail: emailId,
        zipcode: req.body.restDetails.zip,
        phone: req.body.restDetails.phone,
        cuisine: req.body.restDetails.cuisine,
        address: req.body.restDetails.address
    }
    var body = {
            restDetails: restDetails
        }
    restService.updateDetails(body)
    .then( results => {
        res.status(200).json({ success: true, message: "Updated rest details", payload: results });
    })
    .catch( err => {
        res.status(400).json({ success: false, message: err.message, payload: null })
    })
})

module.exports.routes = routes;
