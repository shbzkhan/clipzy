# Clipzy

### A Modern Full-Stack Video Streaming & Social Media Application

Built with **Node.js**, **Express.js**, **MongoDB**, **Mongoose**, **React Native**, and **TypeScript**.

## Overview

Clipzy is a full-stack video-sharing and social media application inspired by modern video platforms.

The project consists of two independent applications:

- **Backend** – REST APIs built with Node.js, Express.js, MongoDB, Mongoose, and JavaScript.
- **Mobile** – Cross-platform mobile application built using React Native CLI and TypeScript.

The application provides a complete video-sharing experience including video uploads, video playback, likes, comments, subscriptions, playlists, user profiles, and social interactions.

## Project Goals

- Secure Authentication & Authorization
- Video Upload & Playback
- Cloud-Based Media Storage
- Social Interactions
- Scalable REST APIs
- Modern Mobile UI
- Efficient State Management
- Clean & Maintainable Architecture

## Problem Statement

Many beginner-level video-sharing applications focus only on basic video playback and lack features such as authentication, media management, social interactions, subscriptions, and scalable backend architecture.

Clipzy solves these problems by providing:

- Modular backend architecture
- Secure JWT-based authentication
- Cloudinary-based media storage
- Video upload and playback
- User subscriptions
- Likes and comments
- Playlist management
- Social media features
- Mobile-first user experience
- Scalable RESTful APIs

## Repository Structure

```text
clipzy/
│
├── backend/
│   ├── public/
│   ├── src/
│   ├── package.json
│   └── package-lock.json
│
├── mobile/
│   ├── android/
│   ├── ios/
│   ├── src/
│   ├── package.json
│   └── tsconfig.json
│
└── README.md
```

# Backend

## Tech Stack

| Technology | Purpose |
| ---------- | ------- |
| Node.js | Runtime Environment |
| Express.js | Web Framework |
| MongoDB | Database |
| Mongoose | ODM |
| JWT | Authentication |
| Bcrypt | Password Hashing |
| Cloudinary | Video & Image Storage |
| Multer | File Upload Handling |
| Firebase Admin | Firebase Services |
| Google Auth Library | Google Authentication |

## Backend Features

### Authentication

- User Registration
- Secure Login
- JWT-based Authentication
- Access Token & Refresh Token Authentication
- Logout Functionality
- Password Hashing with Bcrypt
- Google Authentication
- Protected Routes

### User Management

- User Profiles
- Update Profile Information
- Avatar Management
- Cover Image Management
- User Channel
- Subscriber Management
- Subscription System

### Video Management

- Upload Videos
- Video Playback
- Video Thumbnail Support
- Video Metadata Management
- Update Video Information
- Delete Videos
- Search Videos
- Pagination
- Video Views Tracking

### Social Features

- Like Videos
- Unlike Videos
- Comment on Videos
- Update Comments
- Delete Comments
- Subscribe / Unsubscribe to Channels
- View Subscriber Information

### Playlist Management

- Create Playlists
- Add Videos to Playlists
- Remove Videos from Playlists
- Update Playlist Information
- Delete Playlists
- Fetch User Playlists

### Tweet / Post System

- Create Posts
- Update Posts
- Delete Posts
- View User Posts

### Dashboard

- User Dashboard
- Video Statistics
- Subscriber Statistics
- Channel Analytics

## Backend Folder Structure

```text
backend/
│
├── public/
│   └── temp/
│
├── src/
│   │
│   ├── controllers/
│   │   ├── comment.controller.js
│   │   ├── dashboard.controller.js
│   │   ├── like.controller.js
│   │   ├── playlist.controller.js
│   │   ├── subscription.controller.js
│   │   ├── tweet.controller.js
│   │   ├── user.controller.js
│   │   └── video.controller.js
│   │
│   ├── db/
│   │   └── index.js
│   │
│   ├── middlewares/
│   │   ├── auth.middleware.js
│   │   └── multer.middleware.js
│   │
│   ├── models/
│   │   ├── comment.model.js
│   │   ├── like.model.js
│   │   ├── playlist.model.js
│   │   ├── subscription.model.js
│   │   ├── tweet.model.js
│   │   ├── user.model.js
│   │   └── video.model.js
│   │
│   ├── routes/
│   │   ├── comment.routes.js
│   │   ├── dashboard.routes.js
│   │   ├── like.routes.js
│   │   ├── playlist.routes.js
│   │   ├── subscription.routes.js
│   │   ├── tweet.routes.js
│   │   ├── user.routes.js
│   │   └── video.routes.js
│   │
│   ├── utils/
│   │   ├── ApiError.js
│   │   ├── ApiResponse.js
│   │   ├── asyncHandler.js
│   │   ├── cloudinary.js
│   │   └── firebase.js
│   │
│   ├── app.js
│   ├── constant.js
│   └── index.js
│
├── .env
├── .gitignore
├── package.json
└── package-lock.json
```

# Database

## Core Entities

- **User** – User accounts and channel information
- **Video** – Uploaded video content
- **Comment** – Video comments
- **Like** – Video likes
- **Subscription** – Channel subscriptions
- **Playlist** – User-created playlists
- **Tweet** – Social posts

# REST API Documentation

## Authentication & User APIs

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/v1/users/register` | Register a new user |
| `POST` | `/api/v1/users/login` | Login user |
| `POST` | `/api/v1/users/logout` | Logout user |
| `POST` | `/api/v1/users/refresh-token` | Refresh access token |
| `POST` | `/api/v1/users/change-password` | Change password |
| `GET` | `/api/v1/users/current-user` | Get current user |
| `PATCH` | `/api/v1/users/update-account` | Update account details |
| `PATCH` | `/api/v1/users/avatar` | Update avatar |
| `PATCH` | `/api/v1/users/cover-image` | Update cover image |
| `GET` | `/api/v1/users/c/:username` | Get user channel profile |

## Video APIs

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/v1/videos` | Get all videos |
| `POST` | `/api/v1/videos` | Upload a new video |
| `GET` | `/api/v1/videos/:videoId` | Get video by ID |
| `PATCH` | `/api/v1/videos/:videoId` | Update video |
| `DELETE` | `/api/v1/videos/:videoId` | Delete video |
| `PATCH` | `/api/v1/videos/toggle/publish/:videoId` | Publish or unpublish video |

## Comments APIs

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/v1/comments/:videoId` | Get video comments |
| `POST` | `/api/v1/comments/:videoId` | Add a comment |
| `PATCH` | `/api/v1/comments/c/:commentId` | Update a comment |
| `DELETE` | `/api/v1/comments/c/:commentId` | Delete a comment |

## Likes APIs

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/v1/likes/toggle/v/:videoId` | Like or unlike a video |
| `GET` | `/api/v1/likes/videos` | Get liked videos |

## Subscription APIs

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/v1/subscriptions/c/:channelId` | Subscribe or unsubscribe from a channel |
| `GET` | `/api/v1/subscriptions/c/:channelId` | Get channel subscribers |
| `GET` | `/api/v1/subscriptions/u/:subscriberId` | Get subscribed channels |

## Playlist APIs

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/v1/playlists` | Create a playlist |
| `GET` | `/api/v1/playlists/user/:userId` | Get user playlists |
| `GET` | `/api/v1/playlists/:playlistId` | Get playlist details |
| `PATCH` | `/api/v1/playlists/:playlistId` | Update a playlist |
| `DELETE` | `/api/v1/playlists/:playlistId` | Delete a playlist |
| `PATCH` | `/api/v1/playlists/add/:videoId/:playlistId` | Add video to playlist |
| `PATCH` | `/api/v1/playlists/remove/:videoId/:playlistId` | Remove video from playlist |

## Tweet APIs

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/v1/tweets` | Create a tweet |
| `GET` | `/api/v1/tweets/user/:userId` | Get user tweets |
| `PATCH` | `/api/v1/tweets/:tweetId` | Update a tweet |
| `DELETE` | `/api/v1/tweets/:tweetId` | Delete a tweet |

## Dashboard APIs

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/v1/dashboard/stats` | Get dashboard statistics |
| `GET` | `/api/v1/dashboard/videos` | Get dashboard videos |

# Mobile Application

## Tech Stack

| Technology | Purpose |
| ---------- | ------- |
| React Native | Mobile Framework |
| React Native CLI | Native Development |
| TypeScript | Type Safety |
| Redux Toolkit | State Management |
| Axios | API Communication |
| React Navigation | Navigation |
| NativeWind | Styling |
| React Native Video | Video Playback |
| Firebase | Push Notifications |
| Notifee | Local Notifications |
| Google Sign-In | Google Authentication |
| AsyncStorage | Local Storage |
| React Native Reanimated | Animations |

## Mobile Features

### Authentication

- User Registration
- Secure Login
- JWT Authentication
- Google Sign-In
- Persistent Authentication
- Logout

### Video Experience

- Video Feed
- Video Playback
- Video Upload
- Video Thumbnails
- Video Search
- Video Details
- Like Videos
- Comment on Videos
- Share Videos

### User & Channel

- User Profiles
- Channel Profiles
- Subscribe / Unsubscribe
- Subscriber Information
- User Uploaded Videos

### Social Features

- Likes
- Comments
- Subscriptions
- Playlists
- Social Posts
- User Interaction

### Notifications

- Firebase Cloud Messaging
- Push Notifications
- Local Notifications with Notifee
- Notification Permission Handling

### Mobile UI

- Responsive Mobile Interface
- Bottom Tab Navigation
- Drawer Navigation
- Material Top Tabs
- Smooth Animations
- Video-Focused UI
- Loading & Shimmer Effects
- Modern UI

## Mobile Folder Structure

```text
mobile/
│
├── android/
├── ios/
│
├── src/
│   ├── assets/
│   ├── components/
│   ├── constants/
│   ├── hooks/
│   ├── navigation/
│   ├── redux/
│   ├── screens/
│   ├── types/
│   └── utils/
│
├── __tests__/
├── app.json
├── babel.config.js
├── metro.config.js
├── tailwind.config.js
├── tsconfig.json
└── package.json
```

# Media Management

Clipzy uses **Cloudinary** for cloud-based media management.

Videos and images can be uploaded to cloud storage while their URLs and associated metadata are managed by the backend.

The backend uses **Multer** for handling multipart file uploads and **Cloudinary** for cloud media storage.

# Authentication Flow

```text
User
 │
 ▼
Mobile Application
 │
 ▼
REST API
 │
 ▼
Authentication Middleware
 │
 ▼
JWT Verification
 │
 ▼
Protected Controller
 │
 ▼
MongoDB
```

# Getting Started

## Prerequisites

- Node.js 18+
- npm or yarn
- MongoDB
- Android Studio for Android development
- Xcode for iOS development
- React Native development environment
- Cloudinary account
- Firebase project

## Clone Repository

```bash
git clone https://github.com/shbzkhan/clipzy.git
cd clipzy
```

## Backend Setup

```bash
cd backend

npm install

npm run dev
```

## Mobile Setup

```bash
cd mobile

npm install
```

### Start Metro

```bash
npm start
```

### Run Android

```bash
npm run android
```

### Run iOS

```bash
npm run ios
```

# Environment Variables

## Backend `.env`

```env
PORT=8000

MONGODB_URI=your_mongodb_connection_string

CORS_ORIGIN=*

ACCESS_TOKEN_SECRET=your_access_token_secret
ACCESS_TOKEN_EXPIRY=your_access_token_expiry

REFRESH_TOKEN_SECRET=your_refresh_token_secret
REFRESH_TOKEN_EXPIRY=your_refresh_token_expiry

CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

GOOGLE_CLIENT_ID=your_google_client_id

FIREBASE_PROJECT_ID=your_firebase_project_id
FIREBASE_CLIENT_EMAIL=your_firebase_client_email
FIREBASE_PRIVATE_KEY=your_firebase_private_key
```
| Variable | Purpose |
|---|---|
| `PORT` | Port on which the backend server runs |
| `MONGODB_URI` | MongoDB database connection string |
| `CORS_ORIGIN` | Defines allowed client origins for API requests |
| `ACCESS_TOKEN_SECRET` | Secret key used to sign JWT access tokens |
| `ACCESS_TOKEN_EXPIRY` | Expiration time for access tokens |
| `REFRESH_TOKEN_SECRET` | Secret key used to sign JWT refresh tokens |
| `REFRESH_TOKEN_EXPIRY` | Expiration time for refresh tokens |
| `CLOUDINARY_CLOUD_NAME` | Cloudinary cloud name for media storage |
| `CLOUDINARY_API_KEY` | Cloudinary API key |
| `CLOUDINARY_API_SECRET` | Cloudinary API secret |
| `GOOGLE_CLIENT_ID` | Google OAuth client ID for Google authentication |
| `FIREBASE_PROJECT_ID` | Firebase project identifier |
| `FIREBASE_CLIENT_EMAIL` | Firebase service account email |
| `FIREBASE_PRIVATE_KEY` | Firebase service account private key |


## Mobile `.env`

```env
API_BASE_URL=http://your-backend-url/api
GOOGLE_WEB_CLIENT_ID=your_google_web_client_id
```
| Variable | Purpose |
|---|---|
| `API_BASE_URL` | Base URL used by the mobile app to communicate with the backend API |
| `GOOGLE_WEB_CLIENT_ID` | Google OAuth web client ID used for Google Sign-In |


# Future Improvements

- Real-Time Chat
- Live Streaming
- Video Recommendations
- Advanced Search
- Video Categories
- Watch History
- Watch Later
- Advanced Creator Dashboard
- Video Analytics
- Content Moderation
- Admin Dashboard
- Video Transcoding
- Adaptive Bitrate Streaming
- Advanced Recommendation System
# License

This project is licensed under the **ISC License**.

### Developed By
Shahbaz Husain Khan

Portfolio 
https://shahbazkhan.vercel.app

Linkedin
https://www.linkedin.com/in/shahbaz-husain
