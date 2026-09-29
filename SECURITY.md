# Security

## Overview

VELoop CAPTCHA Earn uses a backend-authoritative security model.

The frontend is treated as untrusted. Important business logic is controlled by the backend using Node.js, Express.js, and MongoDB.

The frontend must not be trusted for:

- CAPTCHA correctness
- Reward amount
- User identity
- Wallet balance
- Challenge ownership
- Challenge validity
- Challenge completion
- Reward transaction creation
- Reward claim eligibility

## Authentication

The application uses JWT-based authentication.

Authenticated API requests use:

Authorization: Bearer <token>

The backend derives the authenticated user from the JWT rather than trusting a user ID supplied by the frontend.

Unauthenticated requests to protected CAPTCHA and wallet operations are rejected.

## CAPTCHA Challenge Security

Each CAPTCHA challenge is associated with the authenticated user.

The backend validates:

- Authentication
- Challenge existence
- Challenge ownership
- Challenge expiration
- Challenge completion status
- Selected option
- Reward configuration

The authoritative correct option is stored on the backend and is not exposed to the frontend.

A challenge can only be used according to its backend-controlled status.

Expired challenges cannot receive rewards.

Completed challenges cannot be verified again.

## Reward Security

Reward values are determined by the backend reward configuration.

The frontend does not determine the reward amount.

The backend ignores client attempts to supply:

- A fake reward amount
- A fake correctness value
- A fake user identity

For the implemented reward configuration:

- Correct answer: +1 Gem
- Wrong answer: +0.5 Gems

Wallet balance updates are performed by the backend.

Gem reward transactions are recorded in MongoDB.

## Claim Protection

The backend validates reward claims using:

- Authenticated user identity
- Challenge ownership
- Challenge completion status
- Reward existence
- Reward claim status

A completed reward cannot be claimed repeatedly.

Duplicate claim attempts are rejected by the backend.

The project uses a mock rewarded-ad state for development/demo purposes and does not use a real third-party advertising network.

## Replay and Duplicate Submission Protection

A completed CAPTCHA challenge cannot be verified again.

The backend checks the challenge status before issuing a reward.

This prevents replaying the same completed challenge to obtain additional Gems.

Duplicate verification attempts are rejected.

## Challenge Expiration

CAPTCHA challenges have an expiration time.

When a challenge expires, verification is rejected and the expired challenge cannot receive a reward.

A new challenge can then be generated for the authenticated user.

## User Isolation

Challenges belong to the authenticated user who created them.

The backend does not trust a client-supplied user ID for authorization.

A user cannot use another user's challenge to obtain a reward.

Cross-user challenge access is rejected.

## Input Validation

The backend validates CAPTCHA verification input.

Verification requires:

- A valid challenge ID
- A selected option

Invalid challenge IDs and invalid answer options are rejected.

The backend does not accept client-supplied reward or correctness values as authoritative data.

## Rate Limiting

Rate limiting is applied to protect CAPTCHA-related API operations from rapid repeated requests and API abuse.

Rate limiting was tested using repeated verification requests.

## Security Testing

The implementation was tested against the following scenarios:

- Duplicate CAPTCHA verification
- Duplicate reward claim
- Expired CAPTCHA
- Invalid CAPTCHA challenge
- Invalid answer option
- Unauthorized request
- Cross-user challenge access
- Fake user ID manipulation
- Fake reward manipulation
- Fake `isCorrect` manipulation
- Rate limiting
- CAPTCHA history response
- No Thanks / new CAPTCHA flow
- Claim / new CAPTCHA flow
- Correct reward
- Wrong reward
- Wallet reward updates

## Frontend Security Boundary

The React frontend is responsible for presentation and interaction only.

The frontend must not be treated as the source of truth for reward or security decisions.

Important values are obtained from the backend.

The application does not use frontend state or local storage as the authoritative wallet balance.

## Sensitive Configuration

Production secrets must not be committed to the repository.

Backend configuration uses environment variables such as:

- `MONGO_URI`
- `JWT_SECRET`
- `PORT`

Frontend configuration uses:

- `VITE_API_BASE_URL`

Actual secret values must remain in the appropriate local or deployment environment configuration.

## Security Limitations

These protections are designed for the internship project requirements and common manipulation/replay scenarios.

They should not be interpreted as a claim that the system is completely fraud-proof against every possible attack.

Further production hardening would depend on the deployment environment, threat model, monitoring requirements, and operational controls.