# CRM Client side API

This api is a part of create CRM Ticket system with MERN stack from scratch tutorial series.
Link for the series is https://youtu.be/XWbEzWSKBfs

## How to use

- run `git clone https://github.com/DentedCode/client-api.git`
- run `npm install`
- run `npm start`

Note: Make sure you have nodemon is installed in your system otherwise you can install as a dev dependencies in the project.

## API Resources

### User API Resources

All the user API router follows `/v1/user/`

| #   | Routers                   | Verbs  | Progress | Is Private | Description                                      |
| --- | ------------------------- | ------ | -------- | ---------- | ------------------------------------------------ |
| 1   | `/v1/user`                | GET    | Done     | Yes        | Get user Info                                    |
| 2   | `/v1/user`                | POST   | Done     | No         | Create a user                                    |
| 3   | `/v1/user/login`          | POST   | Done     | No         | Verify user Authentication and return JWT        |
| 4   | `/v1/user/reset-password` | PATCH  | Done     | No         | Replace with new password                        |
| 5   | `/v1/user/logout`         | DELETE | Done     | Yes        | Delete user accessJWT                            |

### Admin API Resources

All the user API router follows `/v1/user/`

| #   | Routers                   | Verbs  | Progress | Is Private | Description                                      |
| --- | ------------------------- | ------ | -------- | ---------- | ------------------------------------------------ |
| 1   | `/v1/users`               | GET    | Done     | Yes        | Get all Users                                    |
| 2   | `/v1/user{id}`            | GET    | Done     | Yes        | Get User                                         |
| 3   | `/v1/user/{id }`          | DELETE | Done     | Yes        | Delete User                                      |
| 4   | `/v1/user/reset-password` | PATCH  | Done     | Yes        | Replace with new password                        |

### Product API Resources

All the user API router follows `/v1/product/`

| #   | Routers                        | Verbs | Progress | Is Private | Description                             |
| --- | ------------------------------ | ----- | -------- | ---------- | --------------------------------------- |
| 1   | `/v1/product`                  | GET   | Done     | Yes        | Get all products                        |
| 2   | `/v1/product/{id}`             | GET   | Done     | Yes        | Get a product details                   |
| 3   | `/v1/product`                  | POST  | Done     | Yes        | Create a new product                    |
| 4   | `/v1/product/{id}`             | PUT   | Done     | Yes        | Update product details ie. count        |
| 6   | `/v1/product/{id}`             | DELET | Done     | Yes        | Delete a product                        |

### Tokens API Resources

All the user API router follows `/v1/tokens`

| #   | Routers      | Verbs | Progress | Is Private | Description            |
| --- | ------------ | ----- | -------- | ---------- | ---------------------- |
| 1   | `/v1/tokens` | GET   | Done     | No         | Get a fresh access JWT |




Get User Profile -----> user.routes