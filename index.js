'use strict';
const authLocalStorage = require('./localstorage-auth');
const request = require('superagent');
let unauthorizedRoute = null;

module.exports = {

    configure(options) {
        unauthorizedRoute = options.unauthorizedRoute;
    },

    get(options){
        let apiDomain = options.apiDomain || '';
        let url = options.url || '';
        let headers = options.headers || {};
        let token = options.token;

        let authToken = token ? token : (authLocalStorage.enabled ? authLocalStorage.authToken : null);
        return request
            .get(`${apiDomain}${url}`)
            .set(getHeaders(headers, authToken))
            .catch(err=>{
                // If request is unauthorized
                if (err.status === 403 && unauthorizedRoute&& window){
                    console.error('http.js API GET Request Unauthorized');
                    window.location = unauthorizedRoute;

                }
            });
    },

    post(options){
        let apiDomain = options.apiDomain || '';
        let url = options.url || '';
        let data = options.data || {};
        let headers = options.headers || {};
        let token = options.token;
        let authToken = token ? token : (authLocalStorage.enabled ? authLocalStorage.authToken : null);

        return request
            .post(`${apiDomain}${url}`)
            .set(getHeaders(headers,authToken))
            .send(data)
            .catch(err=>{
                if (err.status === 403 && unauthorizedRoute && window){
                    console.error('http.js API POST Request Unauthorized');
                    window.location = unauthorizedRoute;
                }
            });


    },

    put(options){
        let apiDomain = options.apiDomain || '';
        let url = options.url || '';
        let data = options.data || {};
        let headers = options.headers || {};
        let token = options.token;

        let authToken = token ? token : (authLocalStorage.enabled ? authLocalStorage.authToken : null);
        return request
            .put(`${apiDomain}${url}`)
            .set(getHeaders(headers,authToken))
            .send(data)
            .catch(err=>{
                if (err.status === 403 && unauthorizedRoute&& window){
                    console.error('http.js API PUT Request Unauthorized');
                    window.location = unauthorizedRoute;
                }
            });

    },

    delete(options){
        let apiDomain = options.apiDomain || '';
        let url = options.url || '';
        let headers = options.headers || {};
        let token = options.token;

        let authToken = token ? token : (authLocalStorage.enabled ? authLocalStorage.authToken : null);
        return request.delete(`${apiDomain}${url}`)
            .set(getHeaders(headers,authToken))
            .catch(err=>{
                if (err.status === 403 && unauthorizedRoute&& window){
                    console.error('http.js API DELETE Request Unauthorized');
                    window.location = unauthorizedRoute;
                }
            });

    }

};

function getHeaders(headers,token){
    return Object.assign({}, {
        'Accept': 'application/json',
        'X-API-KEY': token
    }, headers);
}
