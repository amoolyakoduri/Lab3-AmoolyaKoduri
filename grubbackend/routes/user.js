const routes = require('express').Router();
var passport = require('passport');
var jwt = require('jsonwebtoken');
require('./../config/passport')(passport);
const secret_key = "Passphrase for encryption should be 45-50 char long";
var requireAuth = passport.authenticate('jwt', { session: false });
var orderService = require('./../services/orderService')
var restService = require('./../services/restaurantService')
var userService = require('./../services/userService')

routes.get('./getChat/:orderId', requireAuth, (req, res) => {
    var payload = {
            orderId: req.params.orderId
        }
    if (body.payload.orderId == undefined) {
        res.status(400).json({ success: false, message: "OrderId undefined", payload: null });
    } else {
        orderService.getChatForOrderId(payload)
        .then( results => {
            res.status(200).json({ success: true, message: "Fetching chat", payload: results });
        })
        .catch( err => {
            res.status(500).json({ success: false, message: err.message, payload: null });
        })
    }
})



routes.get('/getRestaurants', requireAuth, (req, res) => {
    restService.getRestaurants()
    .then( results => {
        res.status(200).json({ success: true, message: "Fetching restaurants", payload: results });
    })
    .catch( err => {
        res.status(500).json({ success: false, message: err.message, payload: null });
    })
})



routes.get('/getUserDetails/:email', requireAuth, (req, res) => {
    var payload = {
            email: req.params.email
        }
    userService.getUserDetails(payload)
    .then( results => {
        if (results.length != 0) {
            res.status(200).json({ success: true, message: "Fetching user details", payload: results[0].userDetails });
        } else {
            res.status(200).json({ success: true, message: "Invalid user email", payload: null });
        }
    })
    .catch(err => {
        res.status(400).json({ success: false, message: err.message, payload: null });
    })
})



routes.post('/updatePassword', requireAuth, (req, res) => {
    var token = req.headers.authorization.substr(7);
    var payload = jwt.verify(token, secret_key);
    var emailId = payload.email;
    var body = {
            email: emailId,
            oldPassword: req.body.oldPassword,
            newPassword: req.body.newPassword
        }
    userService.updatePassword(body)
    .then( results => {
        if (results.nModified === 1) {
            res.status(200).json({ success: true, message: "Password Updated", payload: results });
        } else {
            res.status(500).json({ success: false, message: "Invalid password", payload: null });
        }
    })
    .catch( err => {
        res.status(500).json({ success: false, message: err.message, payload: null });
    })
})



routes.post('/placeOrder', requireAuth, (req, res) => {
    var token = req.headers.authorization.substr(7);
    var payload = jwt.verify(token, secret_key)
    var body = {
            email: payload.email,
            restName: req.body.restName,
            orderItems: req.body.orderItems,
            deliveryDetails: req.body.deliveryDetails,
            restPic: req.body.restPic
        }
    if (payload.restName == undefined || payload.orderItems == undefined || payload.deliveryDetails == undefined) {
        res.status(500).json({ success: false, message: "rest name or order items or delivery details undefined", payload: null });
    } else {
        orderService.placeOrder(body)
        .then( results => {
            res.status(200).json({ success: true, message: "Order Placed", payload: null });
        })
        .catch( err => {
            res.status(500).json({ success: false, message: err.message, payload: null });
        })
    }
})



routes.get('/pastOrders/:emailId', requireAuth, (req, res) => {
    var payload = {
            email: req.params.emailId
        }
    if (payload.email == undefined) {
        res.status(400).json({ success: false, message: "Email id undefined", payload: null });
    } else {
        orderService.getPastOrdersByBuyerEmail(payload)
        .then( results => {
            res.status(200).json({ success: true, message: "Fetching past orders", payload: results });
        })
        .catch( err => {
            res.status(400).json({ success: false, message: err.message, payload: null });
        })
    }
})



routes.get('/upcomingOrders/:emailId', requireAuth, (req, res) => {
    var payload = {
            email: req.params.emailId
        }
    if (payload.email == undefined) {
        res.status(400).json({ success: false, message: "Email id undefined", payload: null });
    } else {
        orderService.getUpcomingOrdersByBuyerEmail(payload)
        .then( results => {
            res.status(200).json({ success: true, message: "Fetching upcoming orders", payload: results });
        })
        .catch( err => {
            res.status(400).json({ success: false, message: err.message, payload: null });
        })
    }
})



routes.post('/updateDetails', requireAuth, (req, res) => {
    var token = req.headers.authorization.substr(7);
    var payload = jwt.verify(token, secret_key);
    var emailId = payload.email;
    var body = {
            email: emailId,
            userDetails: req.body.userDetails,
    }
    userService.updateDetails(body)
    .then( results => {
        res.status(200).json({ success: true, message: "Updated details", payload: body.userDetails });
    })
    .catch( err => {
        res.status(400).json({ success: false, message: err.message, payload: null });
    })
})



routes.get('/getRestDetailsByRestName/:restName', requireAuth, (req, res) => {
    var body = {
            restName: req.params.restName
        }
    restService.getRestDetailsByRestName(body)
    .then( results => {
        res.status(200).json({ success: true, message: "Fetching Rest Details", payload: results });
    })
    .catch( err => {
        res.status(400).json({ success: false, message: err.message, payload: null });
    })
});



routes.post('/search', requireAuth, (req, res) => {
    var payload = {
            name: req.body.name,
            item: req.body.item,
            cuisine: req.body.cuisine
        }
    restService.search(payload)
    .then( results => {
        res.status(200).json({ success: true, message: "Fetching search results", payload: results });
    })
    .catch( err => {
        res.status(400).json({ success: false, message: err.message, payload: null });
    })
})


module.exports.routes = routes;

