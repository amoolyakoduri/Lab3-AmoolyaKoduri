import { gql } from 'apollo-boost';

const getUserDetails = gql`
{
        userDetails {
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
        restDetails (emailId : $emailId) {
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