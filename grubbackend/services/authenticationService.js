const userSchema = require('./../models/users').User;
const restSchema = require('./../models/restaurants').Restaurant;

module.exports.authenticate = (payload) => {
    return new Promise((resolve, reject) => {
        userSchema.find({
            emailId: payload.email,
            password: payload.password
        }, function (err, results) {
            if (err) {
                console.log("error in authenticate")
                reject(err);
            } else {
                if (results.length == 0) {
                    console.log("Not logged in!");
                } else {
                    console.log("logged in! ", results);
                }
                resolve(results);
            }
        })
    })
}

module.exports.findUser = (payload) => {
    return new Promise((resolve, reject) => {
        userSchema.find({
            emailId: payload.email
        }, function (err, results) {
            if (err) {
                reject("Invalid Credentials!");
            }
            resolve(results);
        })
    })

}



module.exports.createUser = (payload) => {
    return new Promise((resolve, reject) => {
        var userInstance = new userSchema({
            emailId: payload.email,
            password: payload.password,
            userDetails: payload.userDetails
        });
        userInstance.save(function (err, results) {
            if (err) {
                console.log("error in create user")
                reject(err);
            } else {
                console.log("user created! ", results);
                resolve(results.userDetails);
            }
        })
    })
}

module.exports.createRestaurant = (payload) => {
    return new Promise((resolve, reject) => {
        var restInstance = new restSchema({
            name: payload.name,
            zip: payload.zip,
            phone: payload.phone,
            cuisine: payload.cuisine,
            address: payload.address,
            ownerEmail: payload.ownerEmail,
            displayPic: payload.displayPic,
        });
        restInstance.save(function (err, results) {
            if (err) {
                console.log("Error occurred in createRestaurant.");
                reject(err);
            } else {
                console.log("Restaurant created ", results);
                resolve(results);
            }
        })
    })
}
