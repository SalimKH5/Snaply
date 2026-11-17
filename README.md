# Snaply

A full-stack photo-sharing social network inspired by Instagram, built with
**Next.js (App Router), TypeScript, MongoDB and Firebase Storage**.

**Live demo:** https://instagram-clone-next-seven.vercel.app/

| Desktop | Mobile |
| --- | --- |
| ![Snaply on desktop](public/snaply-desk.png) | ![Snaply on mobile](public/snaply-mob.png) |

## Features

- **Accounts**: sign-up, login (NextAuth credentials provider + signed JWT for API calls), profile editing.
- **Password reset by email**: a 6-digit code is emailed (Nodemailer), expires after 15 minutes and is single-use; it is exchanged for a short-lived reset token.
- **Posts**: image upload with in-browser cropping (`react-image-crop`), stored in Firebase Storage; metadata in MongoDB.
- **Feed**: posts from the accounts you follow, newest first.
- **Interactions**: like / unlike posts, comment, like comments, save posts.
- **Social graph**: follow / unfollow, followers and following counts.
- **Search**: find users by username.
- **Responsive UI**: desktop sidebar and mobile bottom navigation (Tailwind CSS, Ant Design).

## Tech stack

| Layer | Technologies |
| --- | --- |
| Frontend | Next.js 14 (App Router), React 18, TypeScript, Tailwind CSS, Ant Design, Swiper |
| Backend | Next.js Route Handlers, NextAuth, jsonwebtoken, bcrypt, Nodemailer |
| Data | MongoDB with Mongoose (users, posts), Firebase Storage (images) |
| Hosting | Vercel |

## Architecture

```
src/app
├── (pages)          account/*, [username]/*, home feed
├── api/             REST route handlers
│   ├── register, Login, verification, CodeVerfication, passwordReset
│   ├── posts, posts/[id]/{likePost, commentPost, likeComment}
│   ├── User/[id], User/[id]/{posts, followers, following, profile}
│   └── Search
├── components/      UI components (feed, post, modals, navigation)
└── lib/             auth options, JWT helper, security helpers, Mongo models, Firebase client
```

The browser authenticates with NextAuth; the session carries a JWT that the
client sends as `Authorization: Bearer <token>` to protected API routes.

## Getting started

Requirements: Node.js 18+, a MongoDB database, a Firebase project with Storage,
and a Gmail account with an app password (for reset emails).

```bash
git clone https://github.com/SalimKH5/Snaply.git
cd Snaply
npm install
cp .env.example .env.local   # then fill in the values
npm run dev                  # http://localhost:3000
```

## Environment variables

| Variable | Description |
| --- | --- |
| `MONGODB_URI` | MongoDB connection string |
| `JWT_SECRET` | Secret used to sign API tokens and password-reset tokens |
| `NEXTAUTH_SECRET` | NextAuth session secret |
| `NEXT_PUBLIC_BASE_API_URL` | Base URL of the app, e.g. `http://localhost:3000` |
| `NODEMAILER_EMAIL`, `NODEMAILER_PASS` | Gmail address and app password used to send reset codes |
| `NEXT_PUBLIC_APIKEY`, `NEXT_PUBLIC_AUTHDOMAIN`, `NEXT_PUBLIC_PROJECTID`, `NEXT_PUBLIC_STORAGEBUCKET`, `NEXT_PUBLIC_MESSAGINSENDERID`, `NEXT_PUBLIC_APPID`, `NEXT_PUBLIC_MEASUREMENTID` | Firebase web configuration |

Never commit `.env*` files; they are ignored by `.gitignore`.

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Development server |
| `npm run build` / `npm start` | Production build / server |
| `npm run lint` | ESLint |
| `npx tsc --noEmit` | Type check |

## Security

- Every write route verifies the API token and uses the authenticated user id
  (ids sent in the URL or body cannot be used to act as another user).
- Password hashes and reset codes are never returned by the API or stored in tokens.
- User input used in MongoDB regex queries is escaped.

## Continuous integration

`.github/workflows/ci.yml` runs lint, type-check and a production build on every
push and pull request. Dependabot keeps npm packages and actions up to date.

## Roadmap

- Input validation with a schema library (e.g. Zod) on all route handlers.
- Automated tests (route handlers with an in-memory MongoDB, Cypress end-to-end).
- Real-time updates (WebSockets or Firebase listeners) and post deletion.

## License

[MIT](LICENSE)
