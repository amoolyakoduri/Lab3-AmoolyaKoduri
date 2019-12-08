const graphql = require('graphql');
const _ = require('lodash');
var userService = require('../services/userService');
var restService = require('./../services/restaurantService');
var authService = require('./../services/authenticationService');

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLID,
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull
} = graphql;

const SectionType = new GraphQLObjectType({
    name: 'Section',
    fields: ( ) => ({
        name: {type: new GraphQLNonNull(GraphQLString)},
        menu: {type : new GraphQLList(MenuType)}
    })
});


const MenuType = new GraphQLObjectType({
    name: 'Menu',
    fields: ( ) => ({
            name: {type: new GraphQLNonNull(GraphQLString)},
            descr: {type: GraphQLString},
            price: {type: new GraphQLNonNull(GraphQLInt)},
            pic: {type: GraphQLString}
        })
    })

const UserDetailsType = new GraphQLObjectType({
    name: 'UserDetails',
    fields: ( ) => ({
        firstName: { type: new GraphQLNonNull(GraphQLString) },
        lastName: { type: GraphQLString },
        address: { type: GraphQLString },
        phone: { type: GraphQLString },
        displayPic: { type: GraphQLString },
        userType: { type: new GraphQLNonNull(GraphQLString) },
        emailId : { type : new GraphQLNonNull(GraphQLString) },
    })
});

const RestDetailsType = new GraphQLObjectType({
    name: 'RestDetails',
    fields: ( ) => ({
        name: {type: new GraphQLNonNull(GraphQLString)},
        zip: {type: GraphQLString},
        phone: {type: GraphQLString},
        cuisine: {type: GraphQLString},
        address: {type: GraphQLString},
        ownerEmail: {type: new GraphQLNonNull(GraphQLString)},
        displayPic: {type: GraphQLString},
        sections: {type: new GraphQLList(SectionType)}
    })
})

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        UserDetails: {
            type: UserDetailsType,
            args: { emailId: { type: GraphQLString } },
            resolve(parent, args){
                var payload = {
                    email: args.emailId
                }
                userService.getUserDetails(payload)
                .then( results => {
                    return results;
                }).catch( err => {
                    return err;
                })
            }
        },
        RestDetails: {
            type: RestDetailsType,
            args: { ownerEmail: { type: new GraphQLNonNull(GraphQLString) } },
            resolve(parent, args){
                var payload = {
                    email: parent.emailId
                }
                restService.getRestDetailsByOwnerEmail(payload)
                .then( results => {
                    return results;
                }).catch( err => {
                    return err;
                })
            }
        }
    }
});

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        signUpUser: {
            type: UserDetailsType,
            args: {
                firstName: { type: GraphQLString },
                lastName: { type: GraphQLString },
                emailId: { type: new GraphQLNonNull(GraphQLString)},
                password : {  type: GraphQLString },
                userType : { type : GraphQLString }
            },
            resolve(parent, args){
                var userDetails = {
                    firstName: args.firstName,
                    lastName: args.lastName,
                    emailId: args.emailId,
                    userType : args.userType
                }
                var payload = {
                        email: args.emailId,
                        password: args.password,
                        userDetails: userDetails
                    }
                authService.createUser(payload)
                .then( results => {
                    return results;
                })
                .catch( err => {
                    return err;
                })
            }
        },
        signUpRestaurant: {
            type: RestDetailsType,
            args: {
                name: {type: new GraphQLNonNull(GraphQLString)},
                zip: {type: GraphQLString},
                phone: {type: GraphQLString},
                cuisine: {type: GraphQLString},
                address: {type: GraphQLString},
                ownerEmail: {type: new GraphQLNonNull(GraphQLString)},
                sections: {type: new GraphQLList(SectionType)}
            },
            resolve(parent, args){
                var payload = {
                    name: args.name,
                    zip: args.zipcode,
                    phone: args.phone,
                    cuisine: req.args.cuisine,
                    address: args.address,
                    ownerEmail: args.emailId,
                }
                authService.createRestaurant(payload)
                .then( results => {
                    return results;
                })
                .catch( err => {
                    return err;
                })
            }
        }
                
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});