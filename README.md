# Manifesto
This APi is an implementation of [Test task](https://gist.github.com/yetithefoot/96899b317d90c90a7034f92e885d5850) from Pics.io.

## Introduction
Task was to develop a router-app that handles incoming events and routes them to one or multiple destinations. To receive events app exposes a simple HTTP-endpoint, whereto authorized clients may send HTTP-requests. App should operate according to the specified destinations config and routing strategy. Custom strategy might be specified in client request.


Table of Contents
=================

* [API](#manifesto)
    * [Introduction](#introduction)
* [Table of Contents](#table-of-contents)
* [Getting started](#getting-started)
    * [Prerequisites](#prerequisites)
    * [Installing](#installing)
    * [Running](#running)
* [Api](#api)
    * [Endpoints](#endpoints)
    * [Authorization](#authorization)
    * [Requests](#requests)
        * [Login User](#login-user)
        * [Register User](#register-user)
        * [Route Event](#route-event)
    * [Errors](#errors)

# Getting started
These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. [Postman collection file](https://github.com/mogu4iy/pics.io-test/blob/main/pics.io-test.postman_collection.json) is available to import for testing purposes.

## Prerequisites
Production configurations for routes are stored in [production.json](https://github.com/mogu4iy/pics.io-test/blob/main/production.json). It will be passed to docker compose configuration via [volume](https://github.com/mogu4iy/pics.io-test/blob/b7db99e550c3aebf2b0c6973c940a9676e058dd9/docker-compose.yml#L24).

So if you want to define your own routes configurations, you need:
- Copy [production.json](https://github.com/mogu4iy/pics.io-test/blob/main/production.json) to [configs](https://github.com/mogu4iy/pics.io-test/tree/main/configs)
- Export NODE_ENV production
- Update copied production.json for your needs.

All possible enviroment variables are described in [.env.example](https://github.com/mogu4iy/pics.io-test/blob/main/.env.example).

For local development .env file is possible way to export env variables.

## Installing
You need to have docker installed on your host machine.

Clone repository.
```
git clone https://github.com/mogu4iy/pics.io-test.git
```
## Running
In case you want to run local instance of API and have infrustucture for testing.

Create and .env file based on [.env.example](https://github.com/mogu4iy/pics.io-test/blob/main/.env.example).
```
touch .env
```
Run project
```
docker compose -f docker-compose-dev.yml up -d --remove-orphans
npm run i
npm run start
```
To run fully predefined project.
```
docker compose up -d --remove-orphans
```

# API
All api requests fit such structure:
```
{
    "success": boolean,
    "data": any,
    "message": string
}
```
## Endpoints
|Method|URL|Description|
|--------|----------------------------------------|----------------------------------------|
|`POST`|`/auth/login`|[Login user](#login-user)|
|`POST`|`/auth/register`|[Register user](#register-user)|
|`POST`|`/route-event`|[Route an event](#route-event)|

## Authorization
App authorize incoming requests via JWT tokens.
## Requests
### Login User
Request Body Schema
```
{
    "name": string,
    "password": string
}
```
Response schema
```
{
    "success": true,
    "data": <<token>>
}
```
Examples
- example #1

  Request
   ```
   {
      "name": "bohdan2",
      "password": "password2"
   }
   ```
  Response
   ```
   {
      "success": true,
      "data": "token"
   }
   ```
### Register User
Request Body Schema
```
{
    "name": string,
    "password": string
}
```
Response schema
```
{
    "success": true,
    "data": <<token>>
}
```
Examples
- example #1

  Request
   ```
   {
      "name": "bohdan2",
      "password": "password2"
   }
   ```
  Response
   ```
   {
      "success": true,
      "data": "token"
   }
   ```
### Route Event
Request Body Schema
```
{
	payload: { a:1, b:2, c:3 /* any data */ }, 
	possibleDestinations: [
		{
			[string]: boolean
		}
	],
	strategy: 'ALL' | 'ANY' | <<function string>>
	
}
```
Response schema
```
{
    "success": true,
    "data": {
        [string]: boolean
    }
}
```
Examples
- example #1

  Request
   ```
   {
      "payload": any, 
      "possibleDestinations": [
         {
            "destination1": true,
            "destination2": false,
            "destination3": true,
            "destination5": true
         }, 
         {
            "destination1": true,
            "destination2": false,
            "destination4": true
         },
         {
            "destination3": true
         }
	   ],
	   "strategy": "function(possibleDestinations) { return true; }"
   }
   ```
  Response
   ```
   {
      "success": true,
      "data": {
         "destination1": true,
         "destination2": true,
         "destination3": false,
         "destination5": false,
         "destination4": false
      }
   }
   ```
## Errors
ValidationError
```
{
    "success": false,
    "message": "Validation Error",
    "data": {
        "errors": [
            {
                "type": string,
                "msg": string,
                "path": string,
                "location": string
            }
        ]
    }
}
```
HttpError
```
{
    "success": false,
    "message": string
}
```
