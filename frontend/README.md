**Medicine Recommendation Web Application
Project Overview**

This is a full-stack web application that allows users to search for medicines, view personalized recommendations, and place orders. The application uses Angular for the frontend and Node.js + Express + MongoDB for the backend.

**Key Features:**

User registration and login

Search medicines by name, category, or symptoms

Personalized medicine recommendations based on user purchase history

Place orders and view order history

View detailed medicine information

**Technologies Used**
Frontend

Angular 

Bootstrap 5

HTML, CSS, TypeScript

Backend

Node.js

Express.js

MongoDB with Mongoose

**Other**

HTTPClient for API calls

RxJS for handling observables

bcrypt for password hashing

**Folder Structure**
/backend
  ├── models/           # Mongoose schemas (User, Medicine, Order)
  ├── routes/           # Express routes (users, medicines, orders)
  ├── app.js            # Main Express server
  ├── package.json
/frontend
  ├── src/
      ├── app/
          ├── services/ # Angular services (Medicine, UserService)
          ├── search/   # Search component
      ├── environments/ # Environment configs
  ├── angular.json
  ├── package.json

**Installation**
**Backend**

Navigate to the backend folder:

cd backend


Install dependencies:

npm install


Start the server (development):

npm run dev


Server will run at http://localhost:4000.

Note: The MongoDB connection string is currently hard-coded in app.js.

**Frontend**

Navigate to the frontend folder:

cd frontend


Install dependencies:

npm install


Start Angular development server:

ng serve


Frontend will run at http://localhost:4200.

**API Endpoints**
Users

POST /users/signup – Register new user

POST /users/login – Login

GET /users/rec/:userId – Get personalized recommendations

GET /users/recom/:medicineName – Get recommendations based on medicine

Medicines

GET /medicines – Get all medicines

GET /medicines/search?q= – Search medicines

GET /medicines/:id – Get medicine details

POST /medicines – Add medicine (admin)

Orders

POST /orders – Place an order

GET /orders/user/:userId – Get orders by user

Usage

Signup or login to the application

Search medicines by name, category, or symptoms

View personalized recommendations

Click “Buy Now” to place an order

Click “Get Recommendations” to see medicines related to a specific medicine


Update API URLs in medicine.ts and userservice.ts if hosting backend on a server

**Future Enhancements**

Add admin panel to manage medicines

Enable payment gateway integration

Implement user reviews and ratings for medicines

Improve recommendation algorithm using ML

