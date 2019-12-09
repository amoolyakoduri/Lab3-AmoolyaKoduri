import ls from 'local-storage';

export const isLoggedIn = () => {
    return ls.get('isLoggedIn') === true;
}

export const isBuyer = () => {
    return ls.get('userDetails').userType === "buyer";
}

export const isOwner = () => {
    return ls.get('userDetails').userType === "owner";
}