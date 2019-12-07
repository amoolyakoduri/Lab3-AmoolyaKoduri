const restSchema = require('./../models/restaurants').Restaurant;


module.exports.addItem = (payload) => {
    return new Promise(function (resolve, reject) {
        var ownerEmail = payload.ownerEmail;
        var name = payload.name;
        var desc = payload.desc;
        var price = payload.price;
        var section = payload.section;
        var pic = payload.pic;
        var menuInstance = { "name": name, "descr": desc, "price": price, "pic": pic };
        restSchema.update({ "ownerEmail": ownerEmail, "sections.name": section },
            { $push: { "sections.$.menu": menuInstance } }, function (err, results) {
                if (err) {
                    console.log("Error in addMenu");
                    reject(err);
                } else {
                    if (results.nModified === 0) {
                        var err = {
                            message: "Could not find restaurant with ownerEmail " + ownerEmail + " or section " + section
                        }
                        console.log(err.message);
                        reject(err);
                    } else {
                        console.log("Item added");
                        resolve(results);
                    }
                }
            })
    })
}



module.exports.getRestaurants = () => {
    return new Promise(function (resolve, reject) {
        restSchema.find({}, function (err, results) {
            if (err) {
                console.log("Error in getRestaurants");
                reject(err);
            } else {
                resolve(results);
            }
        })
    })
}

module.exports.deleteItem = (payload) => {
    return new Promise(function (resolve, reject) {
        var ownerEmail = payload.ownerEmail;
        var itemName = payload.itemName;
        var section = payload.section;
        restSchema.update(
            { "ownerEmail": ownerEmail, "sections.name": section },
            { $pull: { "sections.$.menu": { name: itemName } } },
            function (err, results) {
                if (err) {
                    console.log("Error in deleteItem");
                    reject("error");
                } else {
                    if (results.nModified === 0) {
                        var err = {
                            message: "Could not find restaurant with ownerEmail " + ownerEmail + " or section " + section + " or item name " + itemName
                        }
                        console.log(err.message);
                        reject(err);
                    } else {
                        console.log("Section added");
                        resolve(results);
                    }
                }
            })
    })
}

module.exports.search = (payload) => {
    return new Promise(function (resolve, reject) {
        let findObj = {};
        if (payload.name != "") {
            findObj = Object.assign({}, findObj, { "name": payload.name })
        }
        if (payload.cuisine != "") {
            findObj = Object.assign({}, findObj, { "cuisine": payload.cuisine })
        }
        if (payload.item != "") {
            var item = payload.item;
            findObj = Object.assign({}, findObj, {
                "sections": {
                    $elemMatch: {
                        "menu": {
                            $elemMatch: {
                                "name": { $regex: new RegExp(item, 'i') }
                            }
                        }
                    }
                }
            })
        }
        restSchema.find(findObj, function (err, results) {
            if (err) {
                console.log("Error in search api");
                reject("error");
            } else {
                resolve(results);
            }
        })
    })
}

module.exports.addSection = (payload) => {
    return new Promise(function (resolve, reject) {
        var sectionInstance = { "name": payload.section };
        restSchema.update({ "ownerEmail": payload.ownerEmail }, { $push: { "sections": sectionInstance } }, function (error, results) {
            if (error) {
                console.log("Error in addSection");
                reject(error);
            } else {
                if (results.nModified === 0) {
                    var err = {
                        message: "Could not find restaurant with ownerEmail " + payload.ownerEmail
                    }
                    console.log(err.message);
                    reject(err);
                } else {
                    console.log("Section added");
                    resolve(results);
                }
            }
        })
    })
}


module.exports.deleteSection = (payload) => {
    return new Promise(function (resolve, reject) {
        restSchema.update({ "ownerEmail": payload.ownerEmail }, { $pull: { sections: { name: payload.section } } },
            function (err, results) {
                if (err) {
                    console.log("Error in deleteSection");
                    reject(err);
                } else {
                    if (results.nModified === 0) {
                        var err = {
                            message: "Could not find restaurant with ownerEmail " + payload.ownerEmail + " or section " + payload.section
                        }
                        console.log(err.message);
                        reject(err);
                    } else {
                        console.log("Section deleted");
                        resolve(results);
                    }
                }
            })
    })
}


module.exports.getItemsInSection = (payload) => {
    return new Promise(function (resolve, reject) {
        restSchema.find({ _restaurant_id: payload.restId, $elemMatch: { "sections.name": payload.section } }, function (err, results) {
            if (err) {
                console.log("Error in getItemsInSection");
                reject("error");
            } else {
                console.log("Items in section ", payload.section, " are : ", results);
                resolve(results);
            }
        })
    })
}

module.exports.getRestDetailsByOwnerEmail = (payload) => {
    return new Promise(function (resolve, reject) {
        restSchema.find({ "ownerEmail": payload.ownerEmail }, function (err, results) {
            if (err) {
                reject(err);
            } else {
                resolve(results);
            }
        })
    })
}

module.exports.getRestDetailsByRestName = (payload) => {
    return new Promise(function (resolve, reject) {
        restSchema.find({ name: payload.restName }, function (err, results) {
            if (err) {
                console.log("error in getRestDetails");
                reject(err);
            } else {
                resolve(results[0]);
            }
        })
    })
}


module.exports.updateDetails = (payload) => {
    return new Promise(function (resolve, reject) {
        restSchema.update({ "ownerEmail": payload.restDetails.ownerEmail }, {
            "zip": payload.restDetails.zipcode,
            "phone": payload.restDetails.phone,
            "cuisine": payload.restDetails.cuisine,
            "address": payload.restDetails.address
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
