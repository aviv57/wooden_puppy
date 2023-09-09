# Wooden Puppy

Wooden Puppy is a web game of challenges for players to solve.

## Introduction

Wooden Puppy is a web game where players must solve a series of challenges in order to progress.  
Each challenge is locked with a password, and players must find the unique solution to each challenge in order to unlock the next one.

The game is divided into two parts: the backend and the frontend.

## Backend

The backend is responsible for storing the challenges and their solutions. It also provides two main endpoints:

* `GET /challenge/{challenge_password}`: This endpoint returns the challenge with the specified password.
* `POST /solve_challenge/{challenge_password}`: This endpoint allows players to try to solve a challenge. If the solution is correct, the player will be given the password for the next challenge.

The backend is written in Python using FastAPI.

## Frontend

The frontend is responsible for displaying the challenges to the player and allowing them to submit their solutions.  
It is written in TypeScript with React framework.  
It uses Axios to get the challenges from the backend.  
When the player answers a challenge correctly, the next challenge is automatically displayed.

## Getting Started

To play Wooden Puppy, you can visit the live demo at [this link](https://wooden-puppy.xyz/).