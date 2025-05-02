# BookMyShow Clone

A full-stack movie ticket booking application that replicates the core functionality of BookMyShow, built using the MERN stack (MongoDB, Express.js, React.js, Node.js).

## Live Demo

🎬 **Live Application**: [BookMyShow Clone](https://bookmyshowclone-1-zere.onrender.com/)

## Features

- **User Authentication**: Secure sign-up, login, and password reset functionality
- **Movie Browsing**: Browse and search available movies
- **Theater & Show Selection**: Select theaters and show timings for a chosen movie
- **Interactive Seat Selection**: Visual seat layout with real-time availability
- **Secure Payments**: Integrated Stripe payment gateway
- **Role-Based Access**: Different privileges for regular users, theater partners, and admins
- **Responsive Design**: Seamless experience across devices of all sizes

## Tech Stack

### Frontend
- **React.js**: UI library for building the user interface
- **React Router**: For handling client-side routing
- **Ant Design**: UI component library for consistent design
- **Axios**: For making HTTP requests to the backend
- **Stripe Checkout**: For handling payment processing

### Backend
- **Node.js**: JavaScript runtime for the server
- **Express.js**: Web framework for building the API
- **MongoDB**: NoSQL database for data storage
- **Mongoose**: ODM for MongoDB
- **JWT**: For secure authentication
- **Bcrypt**: For password hashing
- **Nodemailer**: For sending OTP emails
- **Express Rate Limit**: For API rate limiting

## Project Structure

```
BookMyShowClone/
├── Client/             # Frontend React application
│   └── book-my-show/   
│       ├── src/
│       │   ├── Components/  # Reusable UI components
│       │   ├── pages/       # Page components
│       │   ├── calls/       # API integration
│       │   └── ...
│       └── ...
└── Server/             # Backend Node.js application
    ├── src/
    │   ├── Controllers/  # Route controllers
    │   ├── Models/       # Database schemas
    │   ├── Routes/       # API routes
    │   ├── Middlewares/  # Custom middlewares
    │   ├── Utils/        # Utility functions
    │   └── Scripts/      # Email templates, etc.
    └── ...
```

## Key Features Explained

### Authentication System
- JWT-based authentication
- Role-based authorization (user, admin, partner)
- Password reset via OTP (sent to email)

### Booking Flow
1. Browse and select a movie
2. Choose date, theater, and show time
3. Select available seats
4. Make payment using Stripe
5. Receive booking confirmation

### Security Measures
- Password hashing with bcrypt
- JWT authentication
- API rate limiting
- Input sanitization for NoSQL injection protection
- Secure storage of sensitive information using environment variables

## Local Development Setup

### Prerequisites
- Node.js (v14+)
- MongoDB
- Stripe account for payment integration
- Gmail account for sending OTPs

### Installation Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/aj4abinjacob/BookMyShowClone.git
   cd BookMyShowClone
   ```

2. **Backend Setup**
   ```bash
   cd Server
   npm install
   
   # Create a .env file with the following variables
   # PORT=8000
   # DB_URL=your_mongodb_connection_string
   # JWT_SECRET=your_jwt_secret
   # STRIPE_SECRET_KEY=your_stripe_secret_key
   # ADMIN_EMAIL=your_gmail_email
   # ADMIN_PASSWORD=your_google_app_password
   
   npm start
   ```

3. **Frontend Setup**
   ```bash
   cd ../Client/book-my-show
   npm install
   npm start
   ```

## API Documentation

### Authentication Endpoints
- `POST /register` - Register a new user
- `POST /login` - Authenticate a user
- `POST /forget` - Request password reset OTP
- `POST /reset` - Reset password with OTP

### Movie Endpoints
- `GET /movies` - Get all movies
- `GET /movies/:id` - Get movie by ID
- `POST /movies` - Create a new movie (admin only)
- `PUT /movies/:id` - Update a movie (admin only)
- `DELETE /movies/:id` - Delete a movie (admin only)

### Theater Endpoints
- `GET /theatres` - Get all theaters
- `POST /theatres` - Create a new theater (admin/partner only)

### Show Endpoints
- `GET /shows` - Get all shows
- `POST /shows` - Create a new show (admin/partner only)
- `GET /movies/:movieId/shows` - Get shows for a movie
- `GET /shows/:showId` - Get show details

### Booking Endpoints
- `POST /payment` - Process payment
- `POST /bookings` - Create a new booking

## Future Enhancements

- User profile management
- Booking history
- Food and beverage pre-ordering
- Recommendations based on booking history
- Native mobile applications
- Enhanced admin dashboard
- Multi-language support

## Acknowledgments

- [Scaler Academy](https://www.scaler.com/) for providing the guidance and mentorship
- [Stripe](https://stripe.com/) for payment processing
- [Ant Design](https://ant.design/) for UI components
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) for database hosting
- [Render](https://render.com/) for application hosting

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Contact

Abin Jacob - [aj4abinjacob@gmail.com](mailto:aj4abinjacob@gmail.com)
