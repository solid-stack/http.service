# http-service
Front End / Back End REST Service.

This service uses an **authToken** variable from localstorage on the client side, or, if used on the serverside a token can be sent with the request

##Methods

* **get(domain,endpoint,headers,token)**

    * domain - for setting API domain
    * endpoint - REST Api endpoint
    * headers - X-API-KEY is set automatically, as is Accept 'application/json', other headers can be added using this object using key:value pairs
    * token - overrides the localstorage token (which would not be available on the serverside)
    

* **post(domain,endpoint,data,headers,token)**

    * domain - for setting API domain
    * endpoint - REST Api endpoint
    * headers - X-API-KEY is set automatically, as is Accept 'application/json', other headers can be added using this object using key:value pairs
    * token - overrides the localstorage token (which would not be available on the serverside)
    

* **put(domain,endpoint,data,headers,token)**

    * domain - for setting API domain
    * endpoint - REST Api endpoint
    * headers - X-API-KEY is set automatically, as is Accept 'application/json', other headers can be added using this object using key:value pairs
    * token - overrides the localstorage token (which would not be available on the serverside)
    

* **delete(domain,endpoint,headers,token)**

    * domain - for setting API domain
    * endpoint - REST Api endpoint
    * headers - X-API-KEY is set automatically, as is Accept 'application/json', other headers can be added using this object using key:value pairs
    * token - overrides the localstorage token (which would not be available on the serverside)
    
