const userSchema = require('./../models/users').User;

module.exports.getUserDetails = (payload) => {
    return new Promise(function (resolve, reject) {
        userSchema.find({
            emailId: payload.email
        }, function (err, results) {
            if (err) {
                console.log("error in getUserDetails");
                reject("error");
            } else {
                resolve(results);
            }
        })
    })
}

module.exports.updateDetails = (payload) => {
    return new Promise(function (resolve, reject) {
        const lastName = payload.userDetails.lastName;
        const address = payload.userDetails.address;
        const phone = payload.userDetails.phone;
        userSchema.update({ "emailId": payload.email }, {
            "userDetails.lastName": lastName,
            "userDetails.address": address,
            "userDetails.phone": phone
        }, function (error, results) {
            if (error) {
                console.log("Error in updateDetails ");
                reject(error);
            } else {
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
