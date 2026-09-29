# Testing

## Overview

The VELoop CAPTCHA Earn module was tested for functional behavior, backend security, reward processing, user isolation, replay protection, and frontend integration.

The tests were performed against the implemented backend APIs and the deployed/frontend flow where applicable.

## Functional Tests

### Correct Answer Reward

**Test:**
- Authenticate a user.
- Request a CAPTCHA challenge.
- Submit the correct option.

**Expected:**
- Verification succeeds.
- Result is `CORRECT`.
- Backend determines the reward.
- Wallet increases by 1 Gem.
- A Gem transaction is recorded.

**Status:** Passed

### Wrong Answer Reward

**Test:**
- Authenticate a user.
- Request a CAPTCHA challenge.
- Submit an incorrect option.

**Expected:**
- Verification succeeds with an incorrect result.
- Backend determines the wrong-answer reward.
- Wallet increases by 0.5 Gems.
- A Gem transaction is recorded.

**Status:** Passed

### CAPTCHA Expiration

**Test:**
- Request a CAPTCHA challenge.
- Allow the challenge to expire.
- Attempt verification after expiration.

**Expected:**
- Verification is rejected.
- No reward is issued.
- The expired challenge cannot be reused.

**Status:** Passed

### New CAPTCHA Flow

**Test:**
- Complete a CAPTCHA result.
- Request a new CAPTCHA.

**Expected:**
- A new challenge is returned.
- The previous challenge is not reused.

**Status:** Passed

### No Thanks Flow

**Test:**
- Complete a CAPTCHA result.
- Select the No Thanks option.

**Expected:**
- The current result flow ends.
- A new CAPTCHA challenge is loaded.

**Status:** Passed

### Claim Flow

**Test:**
- Complete a correct CAPTCHA.
- Select the claim option.

**Expected:**
- Backend validates the claim.
- Reward claim succeeds.
- The application proceeds to the next CAPTCHA flow.

**Status:** Passed

## Replay and Duplicate Tests

### Duplicate CAPTCHA Verification

**Test:**
- Verify the same completed challenge twice.

**Expected:**
- The first verification is processed.
- The second verification is rejected.
- No second reward is created.

**Result:**
- The second request returned `CHALLENGE_ALREADY_COMPLETED`.

**Status:** Passed

### Duplicate Reward Claim

**Test:**
- Claim the same reward twice.

**Expected:**
- The first claim succeeds.
- The second claim is rejected.
- No duplicate reward is created.

**Result:**
- The second request returned `REWARD_ALREADY_CLAIMED`.

**Status:** Passed

## Validation and Manipulation Tests

### Invalid Challenge ID

**Test:**
- Submit verification using a non-existent challenge ID.

**Expected:**
- The backend rejects the request.
- No reward is issued.

**Status:** Passed

### Invalid Answer Option

**Test:**
- Submit an option that is not one of the challenge's valid options.

**Expected:**
- The backend rejects the request.
- No reward is issued.

**Status:** Passed

### Missing Selected Option

**Test:**
- Submit a verification request without `selectedOption`.

**Expected:**
- The backend rejects the request.

**Status:** Passed

### Fake Reward Manipulation

**Test:**
- Submit a valid verification request together with a fake reward amount.

**Expected:**
- The backend ignores the client-supplied reward amount.
- The configured backend reward is used.

**Result:**
- A fake reward value of `999999` did not change the authoritative reward.

**Status:** Passed

### Fake `isCorrect` Manipulation Passed

**Test:**
- Submit an incorrect option while supplying a fake `isCorrect` value.

**Expected:**
- The backend determines correctness from the stored challenge data.
- The client-supplied correctness value is ignored.

**Status:** Passed

### Fake User ID Manipulation

**Test:**
- Authenticate as one user.
- Supply a different user ID in the request.

**Expected:**
- The backend uses the authenticated identity from the JWT.
- The client-supplied user ID does not control authorization or reward ownership.

**Status:** Passed

## Authentication Tests

### Unauthorized Request

**Test:**
- Call a protected API without an Authorization header.

**Expected:**
- The request is rejected.

**Result:**
- The backend returned an authorization error requiring a token.

**Status:** Passed

## User Isolation Tests

### Cross-User Challenge Access

**Test:**
- Authenticate as one user.
- Attempt to verify a CAPTCHA challenge belonging to another user.

**Expected:**
- The backend rejects access to the other user's challenge.
- No reward is issued.

**Result:**
- The request returned `Challenge not found`.

**Status:** Passed

## Rate Limiting Test

### Rapid Verification Requests

**Test:**
- Send repeated verification requests rapidly.

**Expected:**
- Rate limiting prevents unrestricted repeated requests.

**Result:**
- Rapid repeated verification requests were rate limited.

**Status:** Passed

## History Test

### CAPTCHA History

**Test:**
- Request CAPTCHA history after completing CAPTCHA activity.

**Expected:**
- Completed activity is returned.
- Sensitive authoritative values such as `correctOption` are not exposed.

**Status:** Passed

## Wallet Tests

### Initial User Balance

**Expected:**
- New users receive the configured initial balance of 100 Gems.

**Status:** Passed

### Correct Reward Balance Update

**Expected:**
- Correct verification adds 1 Gem to the backend wallet balance.

**Status:** Passed

### Wrong Reward Balance Update

**Expected:**
- Wrong verification adds 0.5 Gems to the backend wallet balance.

**Status:** Passed

### Gem Transaction Record

**Expected:**
- CAPTCHA rewards create Gem transaction records containing the reward and balance information.

**Status:** Passed

## Frontend End-to-End Test

The frontend flow was tested from CAPTCHA selection through reward processing.

### Tested Flow

Login
  ↓
CAPTCHA Earn Page
  ↓
CAPTCHA displayed
  ↓
Four answer options displayed
  ↓
Option selected
  ↓
Submit Answer
  ↓
Checking state
  ↓
Backend verification
  ↓
Correct / Incorrect result
  ↓
Claim or No Thanks
  ↓
New CAPTCHA

Status: Passed

Responsive Testing

The interface was tested on mobile and desktop layouts.

The implementation supports:

Mobile phones
Tablets
Laptops
Desktop screens
Large desktop screens

The interface was also checked for touch interaction and horizontal overflow.

Status: Passed

Deployment Testing

The deployed frontend and backend were tested after deployment.

Frontend:

https://veloop-captcha-project.vercel.app/

Backend:

https://veloop-captcha-project.onrender.com/

The frontend successfully communicates with the deployed backend API.

Status: Passed

Test Summary

The tested areas include:

Test Area	               Status
Correct reward	           Passed
Wrong reward	           Passed
Challenge expiration	   Passed
Duplicate verification	   Passed
Duplicate claim	           Passed
Invalid challenge	       Passed
Invalid option	           Passed
Missing option	           Passed
Fake reward manipulation   Passed
Fake isCorrect manipulationPassed
Fake user ID manipulation  Passed
Unauthorized request	   Passed
Cross-user access	       Passed
Rate limiting	           Passed
CAPTCHA history	           Passed
Wallet updates	           Passed
Claim flow	               Passed
No Thanks flow	           Passed
Frontend end-to-end flow   Passed
Responsive behavior	       Passed
Deployment connectivity	   Passed


Testing Notes

The tests are intended to verify the internship assignment requirements and demonstrate that important CAPTCHA, reward, wallet, authentication, and replay-related decisions remain controlled by the backend.

Passing these tests does not mean the application is completely fraud-proof against every possible attack. Further production security testing would depend on the deployment environment and threat model.

