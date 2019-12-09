
import { gql } from 'apollo-boost';

const signUpMutation = gql`
    mutation SignUp(
        $firstName: String,
        $lastName: String,
        $emailId: String,
        $password : String,
        $userType : String){
        signUpUser(
            firstName : $firstName,
            lastName : $lastName,
            emailId : $emailId,
            password : $password,
            userType : $userType )
    }
`;

const signUpRestMutation = gql`
    mutation SignUpRest(
        $name: String,
        $ownerEmail: String,
        $address : String,
        $zip : String,
        $cuisine : String) {
        signUpRest(
            name : $name,
            ownerEmail : $ownerEmail,
            address : $address ,
            zip : $zip ,
            cuisine : $cuisine )
    }
`;

const updateUserDetailsMutation = gql`
    mutation UpdateUserDetails(
        $firstName: String ,
        $lastName: String ,
        $emailId: String,
        $phone : String,
        $address : String ) {
        updateUserDetails(
            firstName : $firstName ,
            lastName : $lastName ,
            emailId : $emailId ,
            phone : $phone ,
            address : $address )
        }
   `;

const addSectionMutation =  gql`
    mutation AddSection(
        $ownerEmail : String,
        $section : String  ) {
        addSection(
            ownerEmail : $ownerEmail ,
            section : $section )
    }
`;

const addItemMutation = gql`
    mutation AddItem(
        $ownerEmail :  String,
        $name : String,
        $desc : String,
        $price : Integer,
        $section : String) {
            addItem(
                ownerEmail : $ownerEmail,
                name : $name ,
                desc : $desc ,
                price : $price ,
                section : $section )
        }
    `;


export {signUpMutation , signUpRestMutation, updateUserDetailsMutation, addSectionMutation, addItemMutation};