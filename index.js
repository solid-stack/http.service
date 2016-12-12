'use strict';
const auth = require('./localstorage-auth');
const request = require('superagent');
const BB = require('bluebird');

module.exports = {

    get:function(apiDomain,url,headers,token){
        return BB.bind({url: url, apiDomain: apiDomain})
            .then(function() {
                return new BB((resolve,reject) => {
                    request
                        .get(`${apiDomain}${url}`)
                        .set('Accept', 'application/json')
                        .set('X-API-Key', auth.authToken ? auth.authToken : null)
                        .end((err,res)=>{
                            if (err){
                                console.error('http.js API GET Request Error');
                                reject(err);
                            } else {
                                resolve(res);
                            }
                        });
                });
            });
    },
    post:function(apiDomain,url,data){
        return BB.bind({url: url, apiDomain: apiDomain, data: data})
            .then(function() {
                return new BB((resolve,reject) => {
                    request
                        .post(`${apiDomain}${url}`)
                        .send(this.data)
                        .set('Accept', 'application/json')
                        .set('X-API-Key', auth.authToken ? auth.authToken : null)
                        .end((err,res)=>{
                            if (err){
                                console.error('http.js API POST Request Error');
                                reject(err);
                            } else {
                                resolve(res);
                            }
                        });
                });
            });

    },
    put:function(apiDomain,url,data){
        return BB.bind({url: url, apiDomain: apiDomain, data: data})
            .then(function() {
                return new BB((resolve,reject) => {
                    request
                        .put(`${apiDomain}${url}`)
                        .send(this.data)
                        .set('Accept', 'application/json')
                        .set('X-API-Key', auth.authToken ? auth.authToken : null)
                        .end((err,res)=>{
                            if (err){
                                console.error('http.js API PUT Request Error');
                                reject(err);
                            } else {
                                resolve(res);
                            }
                        });
                });
            });
    },
    delete:function(apiDomain,url){
        return BB.bind({url: url, apiDomain: apiDomain})
            .then(function() {
                return new BB((resolve,reject) => {
                    request
                        .delete(`${apiDomain}${url}`)
                        .set('Accept', 'application/json')
                        .set('X-API-Key', auth.authToken ? auth.authToken : null)
                        .end((err,res)=>{
                            if (err){
                                console.error('http.js API DELETE Request Error');
                                reject(err);
                            } else {
                                resolve(res);
                            }
                        });
                });
            });
    }
};