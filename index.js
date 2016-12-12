'use strict';
const auth = require('./localstorage-auth');
const request = require('superagent');
const BB = require('bluebird');

module.exports = {

    get:function(apiDomain,url,headers,token){

        return new BB((resolve,reject) => {
            var authToken = token ? token : (localStorage.enabled ? localStorage.authToken : null);
            this.setHeaders(request,headers,authToken)
                .get(`${apiDomain}${url}`)
                .end((err,res)=>{
                    if (err){
                        console.error('http.js API GET Request Error');
                        reject(err);
                    } else {
                        resolve(res);
                    }
                });
        });
    },
    post:function(apiDomain,url,data,headers,token){

        return new BB((resolve,reject) => {
            var authToken = token ? token : (localStorage.enabled ? localStorage.authToken : null);
            this.setHeaders(request,headers,authToken)
                .post(`${apiDomain}${url}`)
                .send(this.data)
                .end((err,res)=>{
                    if (err){
                        console.error('http.js API POST Request Error');
                        reject(err);
                    } else {
                        resolve(res);
                    }
                });
        });


    },
    put:function(apiDomain,url,data,headers,token){

        return new BB((resolve,reject) => {
            var authToken = token ? token : (localStorage.enabled ? localStorage.authToken : null);
            this.setHeaders(request,headers,authToken)
                .put(`${apiDomain}${url}`)
                .send(this.data)
                .end((err,res)=>{
                    if (err){
                        console.error('http.js API PUT Request Error');
                        reject(err);
                    } else {
                        resolve(res);
                    }
                });
        });

    },
    delete:function(apiDomain,url,headers,token){

        return new BB((resolve,reject) => {
            var authToken = token ? token : (localStorage.enabled ? localStorage.authToken : null);
            this.setHeaders(request,headers,authToken)
                .delete(`${apiDomain}${url}`)
                .end((err,res)=>{
                    if (err){
                        console.error('http.js API DELETE Request Error');
                        reject(err);
                    } else {
                        resolve(res);
                    }
                });
        });

    },
    setHeaders: function (request,headers,token){
        request
            .set('Accept', 'application/json')
            .set('X-API-Key', token);
        for(var header in headers){
            request.set(header,headers[header]);
        }
        return request;
    }
};