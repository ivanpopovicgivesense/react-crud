# React CRUD Application

Welcome to the React CRUD App project! This application is designed to demonstrate a full-featured **CRUD** (Create, Read, Update, Delete) interface built with **React**, **TypeScript**, and **Fluent UI**.

***


## Features

- **User Management:** Effortlessly add, update, delete, and view user information directly from an intuitive table interface.
- **Selection Capabilities:** Select or deselect multiple users with ease for batch operations.
- **Sidebar Navigation:** Navigate through different sections using a responsive sidebar, including pages for Calendar and Logout.
- **Modern UI:** Enjoy a sleek and modern user experience, powered by Fluent UI components.

***


## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine.



***
## Clone the Repository

First, clone the repository to your local machine:

```
git clone https://github.com/ivanpopovicgivesense/react-crud.git
```


***
## Install Dependencies

Navigate into the project directory:

```
cd your-repository-name
```

Install the required dependencies using npm or Yarn:

```
npm install
```
or
```
yarn install
```


***
## Set Up JSON Server

Install JSON Server globally if you haven’t already:

```
npm install -g json-server
```
or

```
yarn global add json-server
```
Create a db.json file in the root directory of your project with the following content:

```
{
  "person": [
    {
      "id": "1",
      "Name": "John",
      "Surname": "Doe",
      "UserType": "Admin",
      "CreatedDate": "2024-01-01",
      "City": "New York",
      "Address": "123 Main St"
    },
    {
      "id": "2",
      "Name": "Jane",
      "Surname": "Doe",
      "UserType": "User",
      "CreatedDate": "2024-01-02",
      "City": "Los Angeles",
      "Address": "456 Elm St"
    }
  ]
}
```


***
## Start JSON Server

Run the JSON Server to serve the mock API:

```
json-server --watch db.json --port 3000
```
This command will start the JSON Server on port 3000.


***
## Start the React Application

In a separate terminal window, start the React application:

```
npm start
```
or
```
yarn start
```
***
