# Secure Document Verification System

A comprehensive platform for secure digital document issuance and verification, designed for universities, employers, and government offices.

## Overview

This system provides a trusted environment for issuing and verifying digital documents with role-based access control. It features automated document expiration, QR code generation for easy verification, and detailed analytics dashboards for different user roles.

## Features

### 🔐 Authentication & Authorization
- JWT-based authentication
- Role-based access control (Admin, Issuer, Verifier)
- Secure password hashing with bcrypt

### 📄 Document Management
- Document issuance with metadata
- QR code generation for verification
- Document status tracking (Active, Expired, Revoked)
- Automated expiration via cron jobs
- PDF generation and export capabilities

### 👥 User Roles

#### Admin
- User management and approval
- System-wide analytics
- Document oversight and logs

#### Issuer (Universities/Government)
- Issue digital documents
- Track issued documents
- Analytics on document usage

#### Verifier (Employers)
- Verify document authenticity via QR codes
- View verification history
- Access to verification logs

### 📊 Analytics & Reporting
- Real-time charts and statistics
- Document status pie charts
- Upload activity line charts
- Comprehensive logging system

### 🔧 Technical Features
- Responsive React frontend
- RESTful API backend
- MongoDB database
- Automated document expiration
- CORS enabled for cross-origin requests

## Tech Stack

### Frontend
- **React 19** - UI framework
- **Vite** - Build tool and dev server
- **React Router** - Client-side routing
- **Axios** - HTTP client
- **Framer Motion** - Animations
- **Recharts** - Data visualization
- **Lucide React** - Icons
- **HTML5 QR Code** - QR code scanning
- **jsPDF** - PDF generation

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **QRCode** - QR code generation
- **node-cron** - Scheduled tasks

## Project Structure

```
secure-docs/
├── client/                          # React frontend
│   └── secure-docReactapp/
│       ├── public/                  # Static assets
│       ├── src/
│       │   ├── components/          # Reusable UI components
│       │   │   ├── Hero/           # Landing page hero section
│       │   │   ├── LoginSignup/    # Authentication components
│       │   │   ├── Navbar/         # Navigation
│       │   │   └── ...             # Other components
│       │   ├── pages/              # Page components
│       │   │   ├── AdminDashboard/ # Admin-specific pages
│       │   │   ├── IssuerDashboard/# Issuer pages
│       │   │   ├── VerifyDashboard/# Verifier pages
│       │   │   └── Dashboard.jsx   # Main dashboard
│       │   ├── routes/             # Route configurations
│       │   ├── Axios/              # HTTP client setup
│       │   └── assets/             # Images and media
│       ├── package.json
│       └── vite.config.js
└── server/                          # Node.js backend
    ├── config/
    │   └── db.js                   # Database configuration
    ├── controllers/                # Route handlers
    │   ├── authcontroller.js       # Authentication logic
    │   ├── documentController.js   # Document operations
    │   ├── userController.js       # User management
    │   └── analyticsController.js  # Analytics
    ├── middleware/                 # Express middleware
    │   ├── errorHandler.js         # Error handling
    │   ├── rolemiddleware.js       # Role-based access
    │   └── validateToken.js        # JWT validation
    ├── models/                     # Mongoose schemas
    │   ├── User.js                 # User model
    │   └── documentSchema.js       # Document model
    ├── routes/                     # API routes
    │   ├── authRoutes.js           # Auth endpoints
    │   ├── userRoutes.js           # User endpoints
    │   ├── documentRoute.js        # Document endpoints
    │   └── analyticsRoutes.js      # Analytics endpoints
    ├── utils/                      # Utility functions
    ├── package.json
    └── index.js                    # Server entry point
```

## Installation

### Prerequisites
- Node.js (v16 or higher)
- MongoDB
- npm or yarn

### Backend Setup

1. Navigate to the server directory:
   ```bash
   cd server
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the server directory with the following variables:
   ```
   PORT=3000
   MONGODB_URI=mongodb://localhost:27017/secure-docs
   JWT_SECRET=your_jwt_secret_key
   ```

4. Start the MongoDB service on your system

5. Start the server:
   ```bash
   npm run dev
   ```

The server will run on `http://localhost:3000`

### Frontend Setup

1. Navigate to the client directory:
   ```bash
   cd client/secure-docReactapp
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

The frontend will run on `http://localhost:5173`

## Usage

1. **Registration**: Users can register with different roles (Admin, Issuer, Verifier)
2. **Login**: Authenticate using email and password
3. **Document Issuance**: Issuers can upload and issue documents with metadata
4. **Verification**: Verifiers can scan QR codes or enter document IDs to verify authenticity
5. **Analytics**: Each role has access to relevant dashboards and analytics

## API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout

### Users
- `GET /api/user/profile` - Get user profile
- `PUT /api/user/profile` - Update user profile

### Documents
- `POST /api/document/issue` - Issue a new document
- `GET /api/document/list` - Get user's documents
- `GET /api/document/verify/:id` - Verify a document
- `PUT /api/document/status` - Update document status

### Analytics
- `GET /api/analytics/overview` - Get system analytics
- `GET /api/analytics/documents` - Document statistics

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the ISC License.

## Contact

For questions or support, please contact the development team.
