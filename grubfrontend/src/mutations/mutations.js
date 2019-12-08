
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

export {signUpMutation};