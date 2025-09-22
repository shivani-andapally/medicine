**Medicine Recommendation Web Application**

This is a full-stack web application that allows users to search for medicines, view personalized recommendations, and place orders.

**Frontend:** Angular

**Backend:** Node.js + Express

**Database:** MongoDB

**🚀 Key Features**

✅ User registration and login

✅ Search medicines by name, category, or symptoms

✅ Personalized recommendations based on purchase history

✅ Place and view orders

✅ View detailed medicine information

**🛠️ Technologies Used**

**Frontend**

Angular

Bootstrap 5

HTML, CSS, TypeScript

**Backend**

Node.js

Express.js

MongoDB with Mongoose

**Other**

Angular HttpClient (API calls)

RxJS (observables)

bcrypt (password hashing)

**⚙️ Installation**

**Backend**

cd backend

npm install

npm run dev


Server runs at: http://localhost:4000

(MongoDB connection string is configured directly in app.js)

**Frontend**

cd frontend

npm install

ng serve


App runs at: http://localhost:4200

**📡 API Endpoints**

**Users**

POST /users/signup – Register new user

POST /users/login – Login

GET /users/rec/:userId – Get personalized recommendations

GET /users/recom/:medicineName – Get recommendations by medicine

**Medicines**

GET /medicines – Get all medicines

GET /medicines/search?q= – Search medicines

GET /medicines/:id – Get medicine details

POST /medicines – Add new medicine (admin only)

**Orders**

POST /orders – Place an order

GET /orders/user/:userId – Get orders by user

📖 Functionalities Explained

**User Module**

Signup and login with validation.

Passwords are securely hashed before saving.

Each user has their own purchase history.

**Medicine Module**

Users can search medicines by name, category, or symptom.

View details such as name, brand, usage, and description.

**Recommendation Module**

Personalized recommendations fetched based on user’s previous purchases.

You can see recommendations under the search bar by default that recomendations are from previous purchases and most purchased medicins by all users.

Related recommendations fetched when searching by medicine name.

After clicking on buynow button go goes to details page of the medicin and here under that you can see the recomendations of the medicins related to that medicin.

**Orders Module**

Users can add medicines to order.

After ordering the medicines those are added to the history of the purchase of a particular user.click on the orders on the navbar and you can see orders history.

Orders are linked to user profiles.

Users can view their past orders.

**🗄️ Database Schema Design******

The application uses MongoDB with Mongoose schemas for structured storage.

kindly add data to the storage using these schemas and check the project.

**User Schema**
const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  purchaseHistory: [{
    medicineId: { type: mongoose.Schema.Types.ObjectId, ref: "Medicine" },
    quantity: { type: Number, default: 1 }
  }]
});

**Medicine Schema**
const MedicineSchema = new mongoose.Schema({
  name: { type: String, required: true },
  composition: { type: String },
  category: { type: String },
  price: { type: Number },
  symptoms: {type: [String]},
  createdAt: { type: Date, default: Date.now }
});

**Order Schema**
const OrderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  medicineId: { type: mongoose.Schema.Types.ObjectId, ref: 'Medicine', required: true },
  quantity: { type: Number, default: 1 },
  createdAt: { type: Date, default: Date.now }
});



**🔮 Future Enhancements**

Admin panel to manage medicines

Payment gateway integration

User reviews and ratings

Smarter recommendation algorithm using ML
