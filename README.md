# Rafue_GamingTournamentManagementSystem

This is a full-stack web application built using **React**, **Next.js**, **Firebase**, and **Leaflet**. This system allows university students to register for gaming tournaments and admin users to manage tournaments. 

---

## Login Credentials

### Admin Login
**Email**: admin@gmail.com
**Password**: admin123

### Regular User Login

**Email**: charles@yahoo.co.uk
**Password**: charles

**Email**: steven@gmail.com
**Password**: steven

**Email**: salmon@gmail.com
**Password**: salmon


## Features

### User Features
- Register/login with email and password
- Search tournaments by game title, location, and date
- Book one or more available spots in a tournament
- View and manage registration history
- Browse tournaments via **Leaflet map**
- Cancel registrations and free up spots for others

### Admin Features (includes *User Features*)
- Add new tournaments with game title, location, date, and coordinates
- Edit or delete tournaments


---

## Technologies Used
- Next.js (App Router)
- React
- Firebase Authentication
- Cloud Firestore
- Server Actions (for data operations)
- Leaflet (without react-leaflet)



## Setup Instructions

**Clone the repository**
'''bash
git clone https://github.com/rafue1968/Rafue_GamingTournamentManagementSystem

cd Rafue_GamingTournamentManagementSystem/gaming-tournament-app_2025


## Open Web Application through ZIP folder
1. Unzip the folder
2. Navigate to project directory:
'''bash
cd gaming-tournament-app_2025

### Install dependencies
'''bash
npm install

### Run the server
'''bash
npm run dev