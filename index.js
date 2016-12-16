'use strict';
const authLocalStorage = require('./localstorage-auth');
const request = require('superagent');
const BB = require('bluebird');

module.exports = function(unauthorizedRoute){

    this.unauthorizedRoute = unauthorizedRoute;

    var setHeaders = function  (request,headers,token){
        request
            .set('Accept', 'application/json')
            .set('X-API-Key', token);
        for(var header in headers){
            request.set(header,headers[header]);
        }
        return request;
    };
    
    this.get = function(apiDomain,url,headers,token){

        return new BB((resolve,reject) => {
            var authToken = token ? token : (authLocalStorage.enabled ? authLocalStorage.authToken : null);
            var req = request.get(`${apiDomain}${url}`);
            setHeaders(req,headers,authToken)
                .end((err,res)=>{
                    if (err){
                        // If request is unauthorized
                        if (res.status === 403 && this.unauthorizedRoute && window){
                            console.error('http.js API GET Request Unauthorized');
                            window.location = this.unauthorizedRoute;
                        } else {
                            console.error('http.js API GET Request Error');
                            reject(err);
                        }
                    } else {
                        resolve(res);
                    }
                });
        });
    };
    this.post = function(apiDomain,url,data,headers,token){

        return new BB((resolve,reject) => {
            var authToken = token ? token : (authLocalStorage.enabled ? authLocalStorage.authToken : null);
            var req = request.post(`${apiDomain}${url}`);
            setHeaders(req,headers,authToken)
                .send(this.data)
                .end((err,res)=>{
                    if (err){
                        if (res.status === 403 && this.unauthorizedRoute && window){
                            console.error('http.js API POST Request Unauthorized');
                            window.location = this.unauthorizedRoute;
                        } else {
                            console.error('http.js API POST Request Error');
                            reject(err);
                        }
                    } else {
                        resolve(res);
                    }
                });
        });


    };
    this.put = function(apiDomain,url,data,headers,token){

        return new BB((resolve,reject) => {
            var authToken = token ? token : (authLocalStorage.enabled ? authLocalStorage.authToken : null);
            var req = request.put(`${apiDomain}${url}`);
            setHeaders(req,headers,authToken)
                .send(data)
                .end((err,res)=>{
                    if (err){
                        if (res.status === 403 && this.unauthorizedRoute && window){
                            console.error('http.js API PUT Request Unauthorized');
                            window.location = this.unauthorizedRoute;
                        } else {
                            console.error('http.js API PUT Request Error');
                            reject(err);
                        }
                    } else {
                        resolve(res);
                    }
                });
        });

    };
    this.delete = function(apiDomain,url,headers,token){

        return new BB((resolve,reject) => {
            var authToken = token ? token : (authLocalStorage.enabled ? authLocalStorage.authToken : null);
            var req = request.delete(`${apiDomain}${url}`);
            setHeaders(req,headers,authToken)
                .end((err,res)=>{
                    if (err){
                        if (res.status === 403 && this.unauthorizedRoute && window){
                            console.error('http.js API DELETE Request Unauthorized');
                            window.location = this.unauthorizedRoute;
                        } else {
                            console.error('http.js API DELETE Request Error');
                            reject(err);
                        }
                    } else {
                        resolve(res);
                    }
                });
        });

    };
    
};