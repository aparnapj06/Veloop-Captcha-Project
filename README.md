# VELoop CAPTCHA Earn

A full-stack MERN CAPTCHA Earn module developed as part of the VELoop internship project.

The module allows authenticated users to complete CAPTCHA challenges, receive backend-controlled Gem rewards, claim rewards, and continue earning through new CAPTCHA challenges.

## Live Project

**Frontend:**  
https://veloop-captcha-project.vercel.app/

**Backend:**  
https://veloop-captcha-project.onrender.com/

**Database:** MongoDB Atlas

## Demo Login
Email: demo@velop.test
Password: Demo@12345


Project Overview

VELoop CAPTCHA Earn is a secure full-stack reward system built using the MERN stack.

The application follows a backend-authoritative architecture where CAPTCHA correctness, challenge validity, reward calculation, user identity, wallet balance, reward transactions, and claim eligibility are controlled by the backend.

The frontend is responsible for presentation and user interaction, while Node.js, Express.js, and MongoDB remain the source of truth for all important business operations.

## Main Flow

User Login  
↓  
CAPTCHA Earn Page  
↓  
Backend provides a CAPTCHA challenge  
↓  
User views CAPTCHA and 4 answer options  
↓  
User selects an option  
↓  
Selected option is highlighted  
↓  
User clicks **Submit Answer**  
↓  
Checking state  
↓  
Backend validates the submission  
↓  
Correct → +1 Gem  
Wrong → +0.5 Gem  
↓  
Wallet and transaction updated by backend  
↓  
Result screen  
↓  
Claim / No Thanks  
↓  
New CAPTCHA


### CAPTCHA Challenge Features:

CAPTCHA challenges are generated and provided by the backend.
Each challenge belongs to the authenticated user.
Each challenge contains exactly four answer options.
The correct answer is stored securely on the backend.
The correct answer is never exposed to the frontend.
Challenges have an expiration time.
A completed challenge cannot be verified again.
Answer Verification
Users select one of four options.
The selected option is sent to the backend.
The backend determines whether the answer is correct.
The frontend does not determine CAPTCHA correctness.
A verification/checking state is displayed before the result.


### Reward System:

Correct answer: +1 Gem
Wrong answer: +0.5 Gems

Reward values are controlled by the backend reward configuration.The frontend does not calculate or directly modify the user's Gem balance.

### Wallet:

Wallet balance is stored in MongoDB.
New users receive an initial balance of 100 Gems.
Correct CAPTCHA verification adds 1 Gem.
Wrong CAPTCHA verification adds 0.5 Gems.
Wallet updates are performed by the backend.
Gem transactions are recorded in the database.
Claim Flow. After a successful CAPTCHA result, the user can claim the reward.

### The backend checks:

Challenge ownership,completion status,reward existence,reward claim status,a reward cannot be claimed more than once.

### Mock rewarded-ad
The project uses a mock rewarded-ad state for development/demo purposes rather than a real third-party advertising network.

### No Thanks Flow

When the user chooses not to claim the displayed reward:
No Thanks
    ↓
New CAPTCHA

The old challenge is not reused.

## Technology Stack

### Frontend

- React
- Vite
- React Router
- JavaScript
- CSS
- React Hooks
- React Icon
- Responsive UI

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT authentication
- CORS
- API validation
- Rate limiting
- Database
- MongoDB Atlas

### Deployment

- Frontend: Vercel
- Backend: Render
- Database: MongoDB Atlas


## Architecture

```text
                    ┌──────────────────┐
                    │  React Frontend  │
                    │     (Vercel)     │
                    └────────┬─────────┘
                             │
                             │ HTTPS API
                             ▼
                    ┌──────────────────┐
                    │ Express / Node.js│
                    │     (Render)     │
                    └────────┬─────────┘
                             │
                             ▼
                    ┌──────────────────┐
                    │  MongoDB / Atlas │
                    └──────────────────┘
```

The frontend communicates with the backend through authenticated API requests. The backend communicates with MongoDB for persistent application data.

## Backend-Authoritative Security
```text
The frontend is treated as an untrusted client. All security-sensitive and reward-related decisions are controlled and validated by the backend.

The following values are controlled by the backend:

- Authenticated user identity
- CAPTCHA correctness
- Challenge ownership
- Challenge expiration
- Challenge completion status
- Reward amount
- Wallet balance
- Reward transaction
- Reward claim status

The frontend cannot determine or modify its own reward or wallet balance.

Client-supplied values, such as a fake reward amount or a fake `isCorrect` value, are not trusted by the backend.
```
## Authentication

The application uses JWT-based authentication.Authenticated requests include the JWT in the `Authorization` header:

Authorization: Bearer <token>

## CAPTCHA Security

Each CAPTCHA challenge is associated with the authenticated user.

The backend validates:

- Authentication
- Challenge existence
- Challenge ownership
- Challenge expiration
- Challenge status
- Selected option
- Reward configuration

Completed challenges cannot be verified again.

Expired challenges cannot receive rewards.

## Reward Transactions
```text

Every CAPTCHA reward is recorded as a Gem transaction.

A transaction contains information such as:

- Transaction ID
- User ID
- Amount
- Transaction type
- Reference challenge
- Balance before
- Balance after
- Status
- Creation time

CAPTCHA rewards use the following transaction type:

API Endpoints
Authentication
Method	Endpoint
POST	/api/auth/register
POST	/api/auth/login
CAPTCHA
Method	Endpoint
GET	/api/captcha/current
POST	/api/captcha/verify
POST	/api/captcha/claim
POST	/api/captcha/new
GET	/api/captcha/history
GET	/api/captcha/config
Wallet
Method	Endpoint
GET	/api/wallet/gems
CAPTCHA Verification

The verification request contains only the required challenge information:

{
  "challengeId": "CAP-XXXXXXXXXXXX",
  "selectedOption": "OPTION"
}

The backend determines:

Whether the challenge is valid
Whether it belongs to the authenticated user
Whether it has expired
Whether it was already completed
Whether the selected option is correct
What reward should be issued

The client does not submit the authoritative reward amount.

Example Reward Flow
Correct Answer
Initial Balance: 100 Gems
        ↓
Correct CAPTCHA
        ↓
Backend verifies answer
        ↓
Reward: +1 Gem
        ↓
New Balance: 101 Gems
        ↓
Gem transaction recorded
Wrong Answer
Initial Balance: 101 Gems
        ↓
Wrong CAPTCHA
        ↓
Backend verifies answer
        ↓
Reward: +0.5 Gem
        ↓
New Balance: 101.5 Gems
        ↓
Gem transaction recorded
Database Models

The backend uses MongoDB/Mongoose models for the application's persistent data.

Important entities include:

User
Wallet
CaptchaChallenge
GemTransaction
CaptchaRewardConfig
AuditLog

The CAPTCHA challenge stores the authoritative correct option on the backend and does not expose it through the public CAPTCHA response.

```
## Project Structure

## Project Structure

```text
VELoop-Captcha-Project/
│
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   │   ├── authController.js
│   │   │   ├── captchaController.js
│   │   │   └── walletController.js
│   │   │
│   │   ├── middleware/
│   │   │   └── authMiddleware.js
│   │   │
│   │   ├── models/
│   │   │   ├── AuditLog.js
│   │   │   ├── CaptchaChallenge.js
│   │   │   ├── CaptchaRewardConfig.js
│   │   │   ├── GemTransaction.js
│   │   │   ├── User.js
│   │   │   └── Wallet.js
│   │   │
│   │   ├── queries/
│   │   │   ├── auditLogQueries.js
│   │   │   ├── captchaChallengeQueries.js
│   │   │   ├── captchaRewardConfigQueries.js
│   │   │   ├── gemTransactionQueries.js
│   │   │   ├── userQueries.js
│   │   │   └── walletQueries.js
│   │   │
│   │   ├── routes/
│   │   │   ├── authRoutes.js
│   │   │   ├── captchaRoutes.js
│   │   │   └── walletRoutes.js
│   │   │
│   │   ├── services/
│   │   │   ├── authService.js
│   │   │   └── captchaService.js
│   │   │
│   │   └── app.js
│   │
│   ├── package.json
│   └── package-lock.json
│
├── frontend/
│   ├── public/
│   │   ├── favicon.svg
│   │   └── icons.svg
│   │
│   ├── src/
│   │   ├── assets/
│   │   ├── api.js
│   │   ├── App.css
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   │
│   ├── .gitignore
│   ├── eslint.config.js
│   ├── index.html
│   ├── package.json
│   ├── package-lock.json
│   ├── README.md
│   └── vite.config.js
│
├── .gitignore
├── README.md
├── API_DOCUMENTATION.md
├── SECURITY.md
└── TESTING.md
```

## Environment Variables

## Backend

The backend requires environment variables for database connectivity and authentication configuration.

Example:

```env
MONGO_URI=
JWT_SECRET=
PORT=5000
```
### Frontend

The frontend uses:
VITE_API_BASE_URL=<backend API URL>

For the deployed application:
VITE_API_BASE_URL=https://veloop-captcha-project.onrender.com/api

Production secrets are not stored in the source code.

### Local Development
```text
Backend:
- cd backend
- npm install
- npm run dev

The backend runs locally on: http://localhost:5000

Frontend:
Open another terminal:
 
- cd frontend
- npm install
- npm run dev

The frontend runs locally on: http://localhost:5173
```

### Testing and Security Validation
```text
The implementation has been tested against several negative and abuse scenarios, including:

- Duplicate CAPTCHA verification
- Duplicate reward claim
- Expired CAPTCHA
- Invalid CAPTCHA challenge
- Invalid answer option
- Unauthorized request
- Cross-user challenge access
- Fake user ID manipulation
- Fake reward manipulation
- Fake isCorrect manipulation
- Rate limiting
- CAPTCHA history response
- No Thanks/new CAPTCHA flow
- Claim/new CAPTCHA flow
- Wallet reward updates
- Correct answer reward
- Wrong answer reward

The purpose of these tests is to verify that important reward and CAPTCHA logic remains controlled by the backend.
```
### Responsive Design
```text
The CAPTCHA Earn interface is designed for:

- Mobile phones
- Tablets
- Laptops
- Desktop screens
- Large desktop screens

The interface uses responsive layouts and touch-friendly interactions.
```
### UI / UX
```text
The interface follows the VELoop design direction described in the project assignment:

Premium rewards appearance
Clean visual hierarchy
Interactive CAPTCHA option cards
Selection states
Hover and touch states
Checking animation
Correct and incorrect result states
Reward presentation
Responsive layout
Mobile-friendly interactions

The interface uses actual React components rather than using a screenshot as the UI.
```
### Security Considerations
```text
The application is designed so that important business logic is not trusted from the frontend.The backend protects against common manipulation attempts such as:

Replaying completed challenges
Reusing expired challenges
Claiming rewards multiple times
Modifying reward values
Sending fake correctness values
Accessing another user's challenge
Supplying a fake user identity
Repeated API requests
Rate limiting 
Authentication 
```
### Deployment

Frontend deployed using Vercel: https://veloop-captcha-project.vercel.app/

Backend deployed using Render: https://veloop-captcha-project.onrender.com/

### Database

MongoDB Atlas is used for persistent application data.

### Project Status
```text
The VELoop CAPTCHA Earn module is deployed and accessible through the live frontend.

The implementation includes:

Authentication
CAPTCHA generation
Four-option CAPTCHA interaction
Backend verification
Correct and incorrect rewards
Wallet management
Gem transaction records
Claim flow
No Thanks flow
Challenge expiration
Replay protection
User isolation
Rate limiting
CAPTCHA history
Responsive UI
Production deployment
```