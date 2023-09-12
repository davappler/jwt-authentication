# jwt-authentication

- In this repo you will find a working example of JWT-Authentication system.
- Further down in this README you will find some information about JWT tokens.
- JWt authentication is used to register or authenticate a user to the website
- This repo is not complete yet, I will keep adding more code and I will also make a client and connect it with the backend.

## Repository Structure

- Server.js is the entry point in this repo.
- You can test the requests in postman

## Instructions to run this project locally

- `npm i` to install the dependencies
- Make sure mongo is installed and running
- I use the community version and run it like this => `brew services start mongodb-community`
- Running backend server =>
  - `npm run start`

## You can also use docker to run the app

- Backend can be run as follow (refer to makefile for respective commands)
  - `make build` (For building the image)
  - `make up` ( Runs the containers)
  - `make down` (Stops the containers)

## What is JWT token?

- JWT stands for JSON-Web token
- It is self-contained way for securely transmitting information between parties as a JSON object.
-

## When should you use JSON Web Tokens?

Here are some scenarios where JSON Web Tokens are useful:

- Authorization: This is the most common scenario for using JWT. Once the user is logged in, each subsequent request will include the JWT, allowing the user to access routes, services, and resources that are permitted with that token. Single Sign On is a feature that widely uses JWT nowadays, because of its small overhead and its ability to be easily used across different domains.

- Information Exchange: JSON Web Tokens are a good way of securely transmitting information between parties. Because JWTs can be signed—for example, using public/private key pairs—you can be sure the senders are who they say they are. Additionally, as the signature is calculated using the header and the payload, you can also verify that the content hasn't been tampered with.

## JWT Structure

JSON Web Tokens consist of three parts separated by dots (.), which are:

- Header
- Payload
- Signature
- Therefore, a JWT typically looks like the following `xxxxx.yyyyy.zzzzz`

## Header

The header typically consists of two parts: the type of the token, which is JWT, and the signing algorithm being used, such as HMAC SHA256 or RSA.`

```
{
  "alg": "HS256",
  "typ": "JWT"
}
```

## Payload

The second part of the token is the payload, which contains the claims. Claims are statements about an entity (typically, the user) and additional data. There are three types of claims: registered, public, and private claims.

```
{
  "sub": "1234567890",
  "name": "John Doe",
  "admin": true
}
```

## Signature

- To create the signature part you have to take the encoded header, the encoded payload, a secret, the algorithm specified in the header, and sign that.
- The signature is used to verify the message wasn't changed along the way, and, in the case of tokens signed with a private key, it can also verify that the sender of the JWT is who it says it is.

For example if you want to use the HMAC SHA256 algorithm, the signature will be created in the following way:

```
HMACSHA256(
  base64UrlEncode(header) + "." +
  base64UrlEncode(payload),
  secret)
```

## How do JSON Web Tokens work?

- In authentication, when the user successfully logs in using their credentials, a JSON Web Token will be returned. Since tokens are credentials, great care must be taken to prevent security issues. In general, you should not keep tokens longer than required.
- Whenever the user wants to access a protected route or resource, the user agent should send the JWT, typically in the Authorization header using the Bearer schema. The content of the header should look like the following:

```
Authorization: Bearer <token>
```

- This can be, in certain cases, a stateless authorization mechanism. The server's protected routes will check for a valid JWT in the Authorization header, and if it's present, the user will be allowed to access protected resources. If the JWT contains the necessary data, the need to query the database for certain operations may be reduced, though this may not always be the case.

-

## References used

- https://jwt.io/introduction
