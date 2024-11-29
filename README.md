# NestJS Product Management API

## Overview
A backend API built with NestJS and MongoDB for managing products with user authentication and authorization.

## Technologies Used
- NestJS
- MongoDB with Mongoose
- JWT for authentication

## Installation

### Prerequisites
- Node.js (>= 14.x)
- MongoDB (local or cloud)

### Clone the Repository
```bash
git clone https://github.com/salmahammad436/productManagement_API.git
cd productManagement_API

## To use the reposatory
1-Install Dependencies npm install
2-Create a .env file in the root directory and add the following:
 JWT_SECRET='Auth@%$14034'
 MONGO_URI='mongodb+srv://salmahammad436:bdVqoYizQCrpKfXm@cluster0.z9blk.mongodb.net/product-management'
 PORT=3000

3-Run the Application  npm run start:dev
//The API will be running at http://localhost:3000.
4-Open Postman or any other API client and send requests. You can see the Postman collection and some examples in productManagement.postman_collection.json 

##API Endpoints
#Authentication Routes
POST /auth/register
POST /auth/login
#Product Routes
POST /products - Create a new product
GET /products - Retrieve all products
GET /products/:id - Retrieve a product by ID
PATCH /products/:id - Update a product
DELETE /products/:id - Delete a product (Admin only)


#Testing with Postman
A Postman collection is included for testing the API. Import the productManagement.Postman_Collection.json file.

##Sample Requests

#Register a User
1-POST /auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123",
  "role": "User"
}

2-POST /auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}


#Manage products

3-GET /products
Authorization: Bearer your_jwt_token


4-GET /products/:id
Authorization: Bearer your_jwt_token

5-POST /products
Authorization: Bearer your_jwt_token
Content-Type: application/json

{
  "name": "Product Name",
  "description": "Product Description",
  "price": 99.99,
  "category": "Category Name",
  "createdBy":"User or Admin" the default is User
}

6-PATCH /products/:id
Authorization: Bearer your_jwt_token
Content-Type: application/json
{
  // Include the data you want to update

}

7-DELETE /products/:id
Authorization: Bearer your_jwt_token // must be 'Admin'
