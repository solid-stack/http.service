// https://github.com/marcuswestin/store.js/
const localstorage = require('store');

module.exports = {
    authToken: localstorage.get('authToken')
};