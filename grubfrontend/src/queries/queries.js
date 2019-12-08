import { gql } from 'apollo-boost';

const getUserDetails = gql`
{
        UserDetails {
            firstName
            lastName
            address
            phone
            userType
            emailId
        }
    }
`

const getRestDetails = gql`
{
        RestDetails (emailId : $emailId) {
            name
            zip
            phone
            cuisine
            address
            ownerEmail
            sections
        }
    }
`

export { getRestDetails, getUserDetails}