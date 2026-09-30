VELoop CAPTCHA Earn — API Documentation

API Overview

The VELoop CAPTCHA Earn backend is a Node.js + Express API connected to MongoDB.

Base URLs:

Local:
http://localhost:5000/api

Live:
https://veloop-captcha-project.onrender.com/api

Authentication uses a JWT Bearer token.

Header:

Authorization: Bearer <JWT_TOKEN>
Content-Type: application/json

The backend is the source of truth for CAPTCHA correctness, reward amounts, wallet balance, challenge ownership, expiry, completion status, and reward claim status.

Authentication APIs

2.1 Register User

Endpoint

POST /auth/register

Authentication: Not required.

Request body

{
"email": "newuser@velop.test",
"password": "Test@12345"
}

Success response — 201

{
"success": true,
"message": "User registered successfully.",
"data": {
"user": {
"id": "<user_id>",
"email": "newuser@velop.test"
},
"token": "<JWT_TOKEN>"
}
}

A new user's wallet is created by the backend with the configured starting balance.

Possible errors

409 — user already exists

500 — server error

2.2 Login User

Endpoint

POST /auth/login

Authentication: Not required.

Request body

{
"email": "demo@velop.test",
"password": "Demo@12345"
}

Success response — 200

{
"success": true,
"message": "Login successful.",
"data": {
"user": {
"id": "<user_id>",
"email": "demo@velop.test"
},
"token": "<JWT_TOKEN>"
}
}

Possible errors

401 — invalid credentials

500 — server error

CAPTCHA APIs

All CAPTCHA endpoints require JWT authentication.

3.1 Get Current CAPTCHA

Endpoint

GET /captcha/current

Authentication: Required.

Success response — 200

{
"success": true,
"captcha": {
"challengeId": "CAP-XXXXXXXXXXXX",
"captchaText": "ABC123",
"options": [
"ABC123",
"ABC12X",
"ABZ123",
"Q7M9KP"
],
"status": "ACTIVE",
"expiresAt": "2026-09-30T10:35:58.780Z",
"createdAt": "2026-09-30T10:33:58.780Z"
}
}

The response intentionally does not expose the authoritative correctOption.

The challenge belongs to the authenticated user.

CAPTCHA challenges expire after the configured challenge lifetime. The current implementation uses a 2-minute challenge expiry.

3.2 Verify CAPTCHA

Endpoint

POST /captcha/verify

Authentication: Required.

Request body

{
"challengeId": "CAP-XXXXXXXXXXXX",
"selectedOption": "ABC123"
}

Only challengeId and selectedOption are trusted as request inputs.

The backend determines:

whether the challenge exists

whether it belongs to the authenticated user

whether it is still active

whether it has expired

whether the selected option is valid

whether the selected option is correct

which reward amount applies

Client-supplied reward, isCorrect, or userId values are not used to determine the reward.

Correct response — 200

{
"success": true,
"result": "CORRECT",
"reward": {
"currency": "GEM",
"amount": 1
}
}

Wrong response — 200

{
"success": true,
"result": "WRONG",
"reward": {
"currency": "GEM",
"amount": 0.5
}
}

The reward is created by the backend and the wallet is updated server-side.

Possible errors

400 — missing challenge ID

400 — missing selected option

400 — selected option is invalid

404 — challenge not found / does not belong to authenticated user

409 — challenge already completed

410 — challenge expired

429 — CAPTCHA request rate limit exceeded

500 — server error

3.3 Claim CAPTCHA Reward

Endpoint

POST /captcha/claim

Authentication: Required.

Request body

{
"challengeId": "CAP-XXXXXXXXXXXX"
}

The backend checks that:

The challenge belongs to the authenticated user.

The challenge has been completed.

The reward has not already been claimed.

Success response — 200

{
"success": true,
"message": "Reward claimed successfully."
}

Possible errors

400 — challenge ID is missing

404 — challenge not found

409 — challenge has not been completed

409 — reward already claimed

429 — CAPTCHA request rate limit exceeded

500 — server error

A duplicate claim cannot create another reward.

3.4 No Thanks / Discard Current CAPTCHA

Endpoint

POST /captcha/no-thanks

Authentication: Required.

Request body

{
"challengeId": "CAP-XXXXXXXXXXXX"
}

The current challenge is discarded for the authenticated user and a completely new challenge is created.

Success response — 200

{
"success": true,
"captcha": {
"challengeId": "CAP-NEWXXXXXXXX",
"captchaText": "XYZ789",
"options": [
"XYZ789",
"XYZ78Q",
"XYA789",
"P4K2MN"
],
"status": "ACTIVE",
"expiresAt": "2026-09-30T10:40:00.000Z",
"createdAt": "2026-09-30T10:38:00.000Z"
}
}

The previous challenge is not reused.

3.5 Get New CAPTCHA

Endpoint

POST /captcha/new

Authentication: Required.

Request body

{}

Success response — 201

{
"success": true,
"captcha": {
"challengeId": "CAP-XXXXXXXXXXXX",
"captchaText": "ABC123",
"options": [
"ABC123",
"ABC12X",
"ABZ123",
"Q7M9KP"
],
"status": "ACTIVE",
"expiresAt": "2026-09-30T10:35:58.780Z",
"createdAt": "2026-09-30T10:33:58.780Z"
}
}

Possible errors

429 — CAPTCHA request rate limit exceeded

500 — server error

3.6 CAPTCHA History

Endpoint

GET /captcha/history

Authentication: Required.

Success response — 200

{
"success": true,
"history": [
{
"challengeId": "CAP-XXXXXXXXXXXX",
"result": "CORRECT",
"reward": 1,
"rewardStatus": "CLAIMED",
"createdAt": "2026-09-30T10:20:00.000Z",
"completedAt": "2026-09-30T10:20:15.000Z"
}
]
}

The history response does not expose the authoritative correct option.

Wallet API

4.1 Get GEM Wallet Balance

Endpoint

GET /wallet/gems

Authentication: Required.

Success response — 200

{
"success": true,
"wallet": {
"currency": "GEM",
"balance": 103
}
}

The wallet balance is read from MongoDB through the authenticated user's wallet.

The frontend does not calculate the authoritative balance.

CAPTCHA Reward Rules

The active CAPTCHA reward configuration is controlled by the backend.

Current configured behavior:

Result

Reward

Correct CAPTCHA

+1 GEM

Wrong CAPTCHA

+0.5 GEM

The backend selects the reward based on the stored challenge result.

The frontend does not send the reward amount as an authoritative value.

Authentication and User Isolation

Every protected CAPTCHA and wallet request uses the authenticated user's JWT.

The backend derives the user identity from the JWT rather than trusting a client-provided userId.

A user cannot use another user's CAPTCHA challenge.

Attempts to access another user's challenge return an error rather than exposing or rewarding the other user's challenge.

Challenge Security

Each challenge contains private server-side information including the authoritative correct option.

The public CAPTCHA response contains:

challengeId

captchaText

options

status

expiresAt

createdAt

The public response does not contain correctOption.

Challenges are:

associated with a user

time-limited

usable only while active

completed after verification

protected against duplicate verification

protected against duplicate reward claims

Reward and Wallet Processing

For CAPTCHA verification, the backend performs the reward operation using the authenticated user and server-side challenge data.

The reward transaction records include:

transaction ID

user ID

currency

amount

type

source

challenge reference

balance before

balance after

transaction status

creation time

CAPTCHA rewards use:

type: CAPTCHA_REWARD
source: CAPTCHA_EARN

The wallet balance is maintained by the backend and stored in MongoDB.

Rate Limiting

CAPTCHA request protection uses a rate limiter of:

30 requests per 60 seconds

The limiter is applied to:

GET  /captcha/current
POST /captcha/verify
POST /captcha/claim
POST /captcha/new

A rate-limited request returns HTTP 429.

Example:

{
"success": false,
"message": "Too many CAPTCHA requests. Please try again later."
}

Important Security Behaviors

The API is designed to reject or prevent:

unauthorized CAPTCHA access

invalid challenge IDs

missing challenge IDs

missing selected options

options not belonging to the current challenge

expired challenges

duplicate verification

duplicate reward claims

cross-user challenge access

client-supplied fake reward amounts

client-supplied fake correctness values

client-supplied user identity manipulation

rapid CAPTCHA API abuse

The backend is authoritative for CAPTCHA correctness, reward calculation, wallet balance, challenge ownership, and reward state.

Example API Flow

Correct flow

Login
↓
GET /captcha/current
↓
POST /captcha/verify
↓
result: CORRECT
reward: +1 GEM
↓
POST /captcha/claim
↓
GET /wallet/gems
↓
POST /captcha/new

Wrong answer flow

Login
↓
GET /captcha/current
↓
POST /captcha/verify
↓
result: WRONG
reward: +0.5 GEM
↓
GET /wallet/gems

No Thanks flow

GET /captcha/current
↓
POST /captcha/no-thanks
↓
new CAPTCHA returned

## Local API Endpoints Summary

| Method | Endpoint | Authentication | Purpose |
|---|---|---|---|
| POST | `/auth/register` | No | Register a user |
| POST | `/auth/login` | No | Login and receive JWT |
| GET | `/captcha/current` | Yes | Get current CAPTCHA |
| POST | `/captcha/verify` | Yes | Verify selected CAPTCHA option |
| POST | `/captcha/claim` | Yes | Claim completed CAPTCHA reward |
| POST | `/captcha/no-thanks` | Yes | Discard current challenge and create a new one |
| POST | `/captcha/new` | Yes | Create a new CAPTCHA |
| GET | `/captcha/history` | Yes | Get authenticated user's CAPTCHA history |
| GET | `/wallet/gems` | Yes | Get authenticated user's GEM balance |