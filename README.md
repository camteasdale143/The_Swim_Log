# The Swim Log App

Welcome to the swim log. This is an app designed to store and save people's daily logs for long term trend analysis.

## Colours

## API Routes

these are all the endpoints that can be accessed from the server.

### Auth

##### Sign Up

- method: `POST`
- route: `/signup`
- Body:
  - username
  - password
  - firstName
  - lastName
  - email
  - birthday

##### Sign In

- method: `POST`
- route: `/user/signin`
- body:
  - `email`
  - `password`

##### Sign Out

N.A.

### Data

data routes are currently being developed.

##### Get Most Recent Data

Data will return all data belonging to a given user

- method: `GET`
- url: `/data`
- Auth:
  - Bearer Token

##### return data of a type

- method: `GET`
- url: `/data/`
- Auth:
  - Bearer Token

##### Create Datum

- method: `POST`
- url: `/data`
- Auth:
  - Bearer Token
- body:
  - type,
  - value,
  - title,
  - date

##### Delete Datum

- method: `DELETE`
- url: `/data`
- Auth:
  - Bearer Token
- body:
  - \_id

### Teams

TODO:

- Full Crud Access

### Coach

N.A.

### Dev

##### Salt

deletes all users and log data then salts the database with 10 sample users. User data is returned as json

- url: `/salt`

## Models

The following models describe the way that data is stored in the database. Essentially data is rolled up into logs.

##### Data

- date: the date the datum was created
- created: the date the datum was meant for
- type: the type of datum stored (Number, Word)
- value: the actual value of the stored data
- title: the title fo the data, to be referenced later for data analysis and compilation
- author: the object ID of who created the datum
