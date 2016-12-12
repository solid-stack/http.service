'use strict';
const auth = require('./localstorage-auth');
const request = require('superagent');
const BB = require('bluebird');

module.exports = {

    get:function(apiDomain,url){
        return BB.bind({url: url, apiDomain: apiDomain})
            .then(function() {
                return new BB((resolve,reject) => {
                    request
                        .get(`${this.apiDomain}${this.url}`)
                        .set('Accept', 'application/json')
                        .set('X-API-Key', auth.authToken)
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
        return BB.bind({url: url, apiDomain: this.apiDomain, data: data})
            .then(function() {
                return new BB((resolve,reject) => {
                    request
                        .post(`${this.apiDomain}${this.url}`)
                        .send(this.data)
                        .set('Accept', 'application/json')
                        .set('X-API-Key', auth.authToken)
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
        return BB.bind({url: url, apiDomain: this.apiDomain, data: data})
            .then(function() {
                return new BB((resolve,reject) => {
                    request
                        .post(`${this.apiDomain}${this.url}`)
                        .send(this.data)
                        .set('Accept', 'application/json')
                        .set('X-API-Key', auth.authToken)
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
        return BB.bind({url: url, apiDomain: this.apiDomain})
            .then(function() {
                return new BB((resolve,reject) => {
                    request
                        .delete(`${this.apiDomain}${this.url}`)
                        .set('Accept', 'application/json')
                        .set('X-API-Key', auth.authToken)
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