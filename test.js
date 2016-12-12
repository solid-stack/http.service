var chai = require('chai');
var expect = chai.expect; // we are using the "expect" style of Chai
var mock = require('mock-require');

var called = {
    superagent:{}
};

mock('auth',{});
mock('superagent',{
    get: function(){

    },
    post: function(){

    },
    put: function(){

    },
    delete: function(){

    },
    set: function(){

    },
    send: function(){

    },
    end: function(){

    }
});
mock('bluebird',function(callback){
    this.name = 'bluebird';
    this.bind = function(obj){
        for(key in obj){
            this[key] = obj[key];
        }
        return this;
    };
    this.then = function(){
        return this;
    };
    callback();
});

var httpService = require('./index');

describe('http.service', function() {
    describe('get', function() {
        var call = httpService.get('domain.com','/endpoint');
        it('should return a promise',function(){
            expect(call.name).to.equal('bluebird');
        });
    });
    describe('post', function() {

    });
    describe('put', function() {

    });
    describe('delete', function() {

    });
});