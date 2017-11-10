import firebase from '../fire.js';

let database = firebase.database();

/*
Before implementing the login functionality, use this function to generate a new UID every time.
It will decrease your iteration time.
*/
export function genUID() {
    return Math.floor(Math.random() * 10000)
}

/*
initializeUserIfNeeded adds the UID to our database unless it's already there
parameter: [uid] the UID of the user.
returns: A promise
*/

export async function initializeUserIfNeeded(uid, displayName, email, photoURL) {
    return database.ref(`/users/${uid}`).once('value').then(snapshot => {
        if (!snapshot.val()) {
            database.ref(`/users/${uid}`).set({username: "name", email: "none@none.com", avatar: "url"})
        }
    })
}

export async function login(uid) {

}

// user.user.displayName
// user.user.email
// user.user.photoURL
// user.user.uid


/* 
createListing adds a new listing to our global state.
This function is incomplete. You need to complete it.
    parameters: 
      [sellerID] The ID of the seller
      [price] The price of the item
      [blurb] A blurb describing the item
    returns: A promise containing the ID of the new listing
*/
export async function createListing(sellerID, price, blurb, imageURL) {
    const listingID = "item" + genUID();
    Promise.all([
        await database.ref(`/itemsForSale/${sellerID}/${listingID}`).set(listingID),
        await database.ref(`/items/${listingID}`).set({listingID: listingID, sellerID: sellerID, imageURL: imageURL, price: price, blurb: blurb, rating: {totalStars: 0, timesRated: 0}})
    ]);
    return listingID;
}

/* 
getItemDescription returns the description of a listing
    parameter: [listingID] The ID of the listing
    returns: A promise that contains an object containing the price and blurb properties.
*/
export async function getItemDescription(listingID) {
    const result = (await database.ref(`items/${listingID}`).once('value')).val();
    // console.log(result.val().blurb)
    return result
}

/* 
buy changes the global state.
Another buyer will not be able to purchase that listing
The listing will no longer appear in search results
The buyer will see the listing in his history of purchases
The seller will see the listing in his history of items sold
    parameters: 
     [buyerID] The ID of buyer
     [sellerID] The ID of seller
     [listingID] The ID of listing
    returns: a promise
*/
export async function buy(buyerID, sellerID, listingID) {
    Promise.all([
        await database.ref(`/itemsBought/${buyerID}/${listingID}`).set(listingID),
        await database.ref(`/itemsSold/${sellerID}/${listingID}`).set(listingID),
        await database.ref(`/itemsForSale/${sellerID}/${listingID}`).remove()
    ]);
}


/* 
allItemsSold returns the IDs of all the items sold by a seller
    parameter: [sellerID] The ID of the seller
    returns: a promise containing an array of listing IDs
*/
export async function allItemsSold(sellerID) {
    const soldItems = await database.ref(`/itemsSold/${sellerID}`).once('value');
    const objectWithKeys = soldItems.val();
    let finalArray = [];
    if (objectWithKeys) {
        finalArray = Object.keys(objectWithKeys)
    }
    return finalArray
}

export async function allItemsForSale(sellerID) {
    const sellingItems = await database.ref(`/itemsForSale/${sellerID}`).once('value');
    const objectWithKeys = sellingItems.val();
    let finalArray = [];
    if (objectWithKeys) {
        finalArray = Object.keys(objectWithKeys)
    }
    return finalArray
}

/*
allItemsBought returns the IDs of all the items bought by a buyer
    parameter: [buyerID] The ID of the buyer
    returns: a promise containing an array of listing IDs
*/
export async function allItemsBought(buyerID) {
    const boughtItems = await database.ref(`/itemsBought/${buyerID}`).once('value');
    const objectWithKeys = boughtItems.val();
    let finalArray = [];
    if (objectWithKeys) {
        finalArray = Object.keys(objectWithKeys)
    }
    return finalArray
}

/*
allListings returns the IDs of all the listings currently on the market
Once an item is sold, it will not be returned by allListings
    returns: a promise containing an array of listing IDs
*/
export async function allListings() {
    const objectOfUsers = (await database.ref(`/itemsForSale/`).once('value')).val();
    // const arrayOfUsers = Object.keys(objectOfUsers);
    let arrayOfItems = []
    for (let userID in objectOfUsers) {
        const someArray = Object.keys(objectOfUsers[userID])
        arrayOfItems = arrayOfItems.concat(someArray)
    }
    return arrayOfItems
}

/*
searchForListings returns the IDs of all the listings currently on the market
Once an item is sold, it will not be returned by searchForListings
    parameter: [searchTerm] The search string matching listing descriptions
    returns: a promise containing an array of listing IDs
*/
export async function searchForListings(searchTerm) {
    let searchResults = []
    let lst = await allListings();
    const itemObjectsToSearch = (await database.ref(`/items/`).once('value')).val();
    for (let itemIndex=0; itemIndex<lst.length; itemIndex++) {
        if (itemObjectsToSearch[lst[itemIndex]].blurb.search(searchTerm)>-1) {
            searchResults.push(lst[itemIndex])
        }
    }
    return searchResults
}

export async function searchForUsers(searchTerm) {

}

export async function giveRating(listingID, rating) {
    const itemInfo = (await database.ref(`/items/${listingID}/rating`).once('value')).val()
    await database.ref(`/items/${listingID}/rating`).set({totalStars: itemInfo.totalStars + rating, timesRated: itemInfo.timesRated + 1})
}