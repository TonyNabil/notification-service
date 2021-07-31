# notification-service
Notification service for sending Notifications (SMS/Email/Push Notification) to specifec user or group of users.

technologies:
  - node js
  - express
  - mongodb
  - redis
  - bullmq
  - jest
  - swagger
  - docker

to start this project :
  - approach 1:
    - prerequisites:
      - install node     https://nodejs.org/en/download/
      - install mongo    https://docs.mongodb.com/manual/administration/install-community/
      - install redis    https://redis.io/download
      
    - to run this project:
      - clone this repo
      - run: 'npm i'
      - run: npm run build-ts  "you need typescript installed globally to run this command"
      - run: npm run start
      - optional: for unit testing run: npm run test

  - approach 2:
    - prerequisites:
      - install docker     
      - install docker-compose    
    
    - to run this project:
      - clone this repo
      - run docker-compose build
      - run docker-compose up
    
 
API documnetation:
  - http://localhost:3009/api-docs
  

Steps to Send a notification:
  - for specific user:
    - create user: http://localhost:3009/api-docs/#/User/createUser
    - create notification: http://localhost:3009/api-docs/#/Notification/createNotification  
  
  - for group of users:
    - create user: http://localhost:3009/api-docs/#/User/createUser
    - create group: http://localhost:3009/api-docs/#/User/createGroup
    - add users to group: http://localhost:3009/api-docs/#/User/addUsersToGroup
    - create notification: http://localhost:3009/api-docs/#/Notification/createNotification

DB SCHEMA
  ![DB SCHEMA](https://user-images.githubusercontent.com/11231159/127750784-687e2e55-0a1e-4139-8c4d-4b6d065d8dce.png)

