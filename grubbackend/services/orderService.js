const orderSchema = require('./../models/orders').Order;
const chatSchema = require('./../models/orders').Chat;
const orderItemsSchema = require('./../models/orders').OrderItems;
var mongoose = require('mongoose');

module.exports.getChatForOrderId = (paylaod) => {
    return new Promise(function (resolve, reject) {
        orderSchema.find({ "_id": paylaod.orderId }, function (err, results) {
            if (err) {
                console.log("Error in getMessagesForOrderId");
                reject(err);
            } else {
                resolve(results.chat);
            }
        })
    })
}

module.exports.sendMessage = (paylaod) => {
    return new Promise(function (resolve, reject) {
        chatInstance = new chatSchema({ text: paylaod.text, senderId: paylaod.senderId });
        orderSchema.update({ _id: paylaod.orderId }, { $push: { "chat": chatInstance } }, function (err, results) {
            if (err) {
                console.log("Error in sendMessage");
                reject(err);
            } else {
                resolve(results);
            }
        })
    })
}

module.exports.getOrdersByRestName = (payload) => {
    return new Promise(function (resolve, reject) {
        orderSchema.find({
            restName: payload.restName,
            $or: [{ status: "New" }, { status: "Preparing" }, { status: "Ready" }]
        }, function (err, results) {
            if (err) {
                console.log("Error in getOrders");
                reject(err);
            } else {
                resolve(results);
            }
        })
    })
}

module.exports.placeOrder = (payload) => {
    var restPic = payload.restPic;
    var restName = payload.restName;
    var emailId = payload.email;
    var orderItems = payload.orderItems;
    var deliveryDetails = payload.deliveryDetails;
    return new Promise(function (resolve, reject) {
        var amt = 0;
        const promiseForAmt = orderItems.map((orderItem) => {
            amt = amt + (orderItem.quantity * orderItem.price);
        })
        Promise.resolve(promiseForAmt).then(() => {
            var orderItemsArray = [];
            const promiseForOrderItems = orderItems.map((orderItem) => {
                orderItemsInstance = new orderItemsSchema({ name: orderItem.name, quantity: orderItem.quantity, price: orderItem.price });
                orderItemsArray.push(orderItemsInstance);
            })
            Promise.resolve(promiseForOrderItems).then(() => {
                orderInstance = new orderSchema({
                    name: deliveryDetails.firstName, address: deliveryDetails.address,
                    amt: amt, restPic: restPic, buyerEmail: emailId, restName: restName, status: "New", order_items: orderItemsArray
                })
                orderInstance.save(function (err, results) {
                    if (err) {
                        console.log("Error in placeOrder");
                        reject(err);
                    } else {
                        console.log("Order placed ");
                        resolve(results);
                    }
                })
            })
        })
    })
}

module.exports.getUpcomingOrdersByBuyerEmail = (payload) => {
    return new Promise(function (resolve, reject) {
        orderSchema.find({
            buyerEmail: payload.email,
            $or: [{ status: "New" }, { status: "Preparing" }, { status: "Ready" }]
        }, function (err, results) {
            if (err) {
                console.log("error in upcomingOrders", err.message);
                reject(err);
            } else {
                resolve(results);
            }
        })
    })
}

module.exports.getPastOrdersByBuyerEmail = (payload) => {
    return new Promise(function (resolve, reject) {
        orderSchema.find({
            buyerEmail: payload.email,
            $or: [{ status: "Delivered" }, { status: "Cancelled" }]
        }, function (err, results) {
            if (err) {
                console.log("error in pastOrders");
                reject(err);
            } else {
                resolve(results);
            }
        })
    })
}


module.exports.getPastOrdersByRestName = (payload) => {
    return new Promise(function (resolve, reject) {
        orderSchema.find({
            restName: payload.restName,
            $or: [{ status: "Delivered" }, { status: "Cancelled" }]
        }, function (err, results) {
            if (err) {
                console.log("Error in getOrders");
                reject(err);
            } else {
                resolve(results);
            }
        })
    })
}

module.exports.updateOrderStatus = (paylaod) => {
    return new Promise(function (resolve, reject) {
        var id = new mongoose.Types.ObjectId(paylaod.orderId);
        orderSchema.update({ '_id': id }, { status: paylaod.status }, function (err, results) {
            if (err) {
                console.log("Error in updateOrderStatus");
                reject(err);
            } else {
                resolve(results);
            }
        })
    })
}

module.exports.getOrdersByStatus = (paylaod) => {
    return new Promise(function (resolve, reject) {
        orderSchema.find({
            restName: paylaod.restName,
            status: paylaod.status
        }, function (err, results) {
            if (err) {
                console.log("Error in getOrdersByStatus");
                reject(err.message);
            } else {
                resolve(results);
            }
        })
    })
}
