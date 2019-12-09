const userSchema = require('./../models/users').User;

module.exports.getUserDetails = (payload) => {
    return new Promise(function (resolve, reject) {
        console.log(JSON.stringify(payload));
        userSchema.find({
            emailId: payload.email
        }, function (err, results) {
            if (err) {
                console.log("error in getUserDetails");
                reject("error");
            } else {
                console.log(results);
                resolve(results[0].userDetails);
            }
        })
    })
}

module.exports.updateDetails = (payload) => {
    return new Promise(function (resolve, reject) {
        const firstName = payload.firstName;
        const lastName = payload.lastName;
        const address = payload.address;
        const phone = payload.phone;
        userSchema.update({ "emailId": payload.emailId }, {
            "userDetails.lastName": lastName,
            "userDetails.address": address,
            "userDetails.phone": phone,
            "userDetails.firstName" : firstName
        }, {new : true}, function (error, results) {
            if (error) {
                console.log("Error in updateDetails ");
                reject(error);
            } else {
                console.log(results)
                resolve(results);
            }
        })
    })
}

module.exports.updatePassword = (payload) => {
    return new Promise(function (resolve, reject) {
        userSchema.update({ "emailId": payload.email, "password": payload.oldPassword }, {
            "password": payload.newPassword
        }, function (error, results) {
            if (error) {
                console.log("Error in updatePassword");
                reject("error");
            } else {
                resolve(results);
            }
        })
    })
}
