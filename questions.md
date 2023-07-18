- What is the best way to send a JWT token to the client?
- Which token is better way of authentication?
-

Where is a good place to store the JWT token in clients side?

- We need to save our JWT token somewhere in client side, so that we can forward it to our API as a header. You might be tempted to persist it in localStorage; don’t do it! This is prone to XSS attacks.

- Creating cookies on the client to save the JWT will also be prone to XSS. If it can be read on the client from Javascript outside of your app - it can be stolen. You might think an HttpOnly cookie (created by the server instead of the client) will help, but cookies are vulnerable to CSRF attacks. It is important to note that HttpOnly and sensible CORS policies cannot prevent CSRF form-submit attacks and using cookies require a proper CSRF mitigation strategy.

- Note that a SameSite cookie will make Cookie based approaches safe from CSRF attacks. It might not be a solution if your Auth and API servers are hosted on different domains, but it should work really well otherwise! (Study about sameSite)

- 


### How to Prevent token from leakage:
- Store the token using the browser sessionStorage container.
- Add it as a Bearer HTTP Authentication header with JavaScript when calling services.
- Add fingerprint information to the token

Note : By storing the token in browser sessionStorage container it exposes the token to being stolen through a XSS attack. However, fingerprints added to the token prevent reuse of the stolen token by the attacker on their machine. To close a maximum of exploitation surfaces for an attacker, add a browser Content Security Policy to harden the execution context.






Question - How to check if a JWT stored in our cookies/storage is a valid one? Once we have done the verification we can then we can allows user to go to new pages in client side.
- We send the JWT token to backend API, if it says yes the token is VALID then we can go ahead and direct user to the requested page in client side




### How does a refresh token work?

This token is issued as part of authentication process along with the JWT. The auth server should saves this refresh token and associates it to a particular user in its own database, so that it can handle the renewing JWT logic.

On the client, before the previous JWT token expires, we wire up our app to make a /refresh_token endpoint and grab a new JWT.


### How does the refresh token (Silent refresh) works ? 
- The user logs in with a login API call.
- Server generates JWT token and refresh_token, and a fingerprint
- The server returns the JWT token, refresh token, and a SHA256-hashed version of the fingerprint in the token claims
- The un-hashed version of the generated fingerprint is stored as a hardened, HttpOnly cookie on the client
- When the JWT token expires, a silent refresh will happen. This is where the client calls the /refresh token endpoint.

- During the refresh request, The refresh endpoint(in the server) must check for the existence of the fingerprint cookie
- Decode the hashed value (Fingerprint value) and match it with the un-hashed value from httpOnly cookie.
- If they both match then we can go ahead and generate a new jwt token and send it back to client side.
- This silent refresh should happen every 15 mins, because we set JWT tokens expiration time to 15 mins.
