# Stacksy

Mobile-first social-commerce app for independent fashion and jewelry makers. The frontend is split into feature modules in `src/apps/`: OTP login, customer shop, chats, customer settings, and the admin workspace.

## Run locally

1. Set up XAMPP MySQL and OTP settings using [the backend setup guide](../backend/README.md).
2. In `frontend/`, run `npm install` and `npm run dev`.
3. In `backend/`, run `npm install` and `npm start`.

For local development without SMS/email provider credentials, one-time codes (including the owner admin code) are printed in the backend terminal and the API marks the response `devMode: true`. Phone numbers accept local Indian format or international E.164 format. Production requires real SMS/email delivery and has no console-code bypass.

## Included

- Product discovery, search, categories, saved products, and a local shopping bag.
- OTP sign-in with phone or email.
- User-to-user and support chats with periodic refresh.
- Personal profile and device-local dark appearance preference.
- Admin overview, customer deactivation, conversation review, missing-item requests, product management, and admin access management.
