// https://github.com/marcuswestin/store.js/
const localstorage = require('store');
console.log(localstorage,localstorage.get('authToken'));
module.exports = {
    authToken: localstorage.get('authToken')
};