# Wooden Puppy
 
Wooden Puppy is a web game of challanges for players to solve.  
Each challange is locked with a password  
In order to solve a challange the player needs to find the unique solution for it,  
Once they find it they will get the password for the next challange.  

### The backend

The backend has two main endpoints  
GET /challenge/{challenge_password} - this endpoint is used for the player to get the challange  
POST /solve_challenge/{challenge_password} - this endpoint let the player the ability to try and solve the challange  