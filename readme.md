Food Finder YYC Web Application
===

![CodeShip status](https://app.codeship.com/projects/1eba5be0-18b2-0135-1f80-7aae1ad91a87/status)

Prerequisites 
---

1. NodeJS
1. NPM

Installation
---

1. Check out this repository
1. Run `npm install`. This should resolve all package dependencies
1. Run `npm start`

Development
---
1. There are 2 main branches: `master` and `dev`, create additional branches as necessary
1. Run `npm run batch`. This will start Webpack dev server

Deployment
---
1. Simply push to either `master` or `dev` would trigger a build on CodeShip
1. If the build was successful, CodeShip would deploy to the corresponding environment
