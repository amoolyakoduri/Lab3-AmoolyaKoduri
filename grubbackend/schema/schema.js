const graphql = require('graphql');
const _ = require('lodash');
var userService = require('../services/userService');
var restService = require('./../services/restaurantService');
var authService = require('./../services/authenticationService');
var passport = require('passport');
var requireAuth = passport.authenticate('jwt', { session: false });

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLInt,
    GraphQLList,
    GraphQLID,
    GraphQLNonNull
} = graphql;

const SectionType = new GraphQLObjectType({
    name: 'Section',
    fields: ( ) => ({
        name: {type: GraphQLString},
        menu: {type : new GraphQLList(MenuType)},
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

const UserType = new GraphQLObjectType({
    name: 'User',
    fields: ( ) => ({
        firstName : { type : GraphQLString},
        lastName: { type: GraphQLString },
        address: { type: GraphQLString },
        phone: { type: GraphQLString },
        userType: { type: new GraphQLNonNull(GraphQLString) },
        emailId : { type : new GraphQLNonNull(GraphQLString) },
    })
});

const RestDetailsType = new GraphQLObjectType({
    name: 'RestDetails',
    fields: ( ) => ({
        _id : { type : GraphQLID},
        name: {type: new GraphQLNonNull(GraphQLString)},
        zip: {type: GraphQLString},
        phone: {type: GraphQLString},
        cuisine: {type: GraphQLString},
        address: {type: GraphQLString},
        ownerEmail: {type: new GraphQLNonNull(GraphQLString)},
        displayPic : { type : GraphQLString},
        sections : { type : new GraphQLList(SectionType)}
    })
})

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        user: {
            type: UserType,
            args: { emailId: { type: GraphQLString } },
            resolve(parent, args){
                var payload = {
                    email: args.emailId
                }
                return userService.getUserDetails(payload)
            }
        },
        restDetails: {
            type: RestDetailsType,
            args: { name: { type: new GraphQLNonNull(GraphQLString) } },
            resolve(parent, args){
                var payload = {
                    restName: args.name
                }
                return restService.getRestDetailsByRestName(payload)
            }
        }
    }
});

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        signUpUser: {
            type: UserType,
            args: {
                firstName: { type: GraphQLString },
                lastName: { type: GraphQLString },
                emailId: { type: new GraphQLNonNull(GraphQLString)},
                password : {  type: GraphQLString },
                userType : { type : GraphQLString },
                phone : {  type : GraphQLString },
                address : {  type : GraphQLString },
                displayPic : { type : GraphQLString }
            },
            resolve(parent, args){
                var userDetails = {
                    firstName: args.firstName,
                    lastName: args.lastName,
                    emailId: args.emailId,
                    userType : args.userType,
                    address : args.address,
                    phone : args.phone,
                    displayPic : args.displayPic
                }
                var payload = {
                        email: args.emailId,
                        password: args.password,
                        userDetails: userDetails,
                    }
                return authService.createUser(payload)
                
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
                displayPic : { type :  GraphQLString}
            },
            resolve(parent, args){
                var payload = {
                    name: args.name,
                    zip: args.zip,
                    phone: args.phone,
                    cuisine: args.cuisine,
                    address: args.address,
                    ownerEmail: args.ownerEmail,
                    displayPic : args.displayPic
                }
                return authService.createRestaurant(payload)
                
            }
        },
        updateUserDetails: {
            type: UserType,
            args: {
                firstName: { type: GraphQLString },
                lastName: { type: GraphQLString },
                emailId: { type: new GraphQLNonNull(GraphQLString)},
                phone : {  type : GraphQLString },
                address : {  type : GraphQLString },
            },
            resolve(parent, args){
                userService.updateDetails(args)
                return args   
            }
        },
        addSection : {
            type : SectionType,
            args : {
                ownerEmail : { type : GraphQLString},
                section : { type : GraphQLString}
            },
            resolve(parent,args){
                restService.addSection(args)
                return args;
            }
        },
        addItem : {
            type : MenuType,
            args : {
                ownerEmail :  { type : GraphQLString },
                name : { type : GraphQLString },
                desc : { type : GraphQLString},
                price : { type : GraphQLID},
                section : { type : GraphQLString}
            },
            resolve(parent,args){
                restService.addItem(args)
                return args;
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});