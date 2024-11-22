# VRV Security - Role Based Access Control

## Overview

This project implements a role-based access control (RBAC) system for managing permissions and access levels within an application. The system allows for the creation of roles, assignment of permissions to roles, and assignment of roles to users.

## Features

- **Role Management**:
  - Create and manage roles.
  - Assign permissions to roles.
  - Assign roles to users.
  - Enforce access control based on roles and permissions.

- **User Management**:
  - Viewing all users in a tabular format.
  - **Searching users by**:
    - Name
    - Email
    - Role
    - Status
  - **Filtering users by role**:
    - Admin
    - Developer
    - Client
  - Adding, editing, and deleting users.
  - Changing roles and statuses dynamically.
  
- **Permission Management**:
  - Permission is assigned accordingly to the role

## Installaion

To install the project, clone the repository and install the necessary dependencies:

## Usage

To start the application, run the following command:

## Mock API

This project uses `json-server` to create a mock API for testing purposes. To install `json-server`, run the following command:
json-server --watch db.json --port 5000


The application will be available at `http://localhost:3000`

## Demo Accounts

### Admin Account
- Email: admin@vrvsecurity.com
- Password: admin123
- Access: Full system access, including user management, role management, and permission management

### Developer Account
- Email: developer@vrvsecurity.com
- Password: dev123
- Access: Limited to development-related features and viewing permissions

## API Documentation

The mock API runs on `http://localhost:5000` and provides the following endpoints:

- `/users` - User management
- `/projects` - projects


## Demo - Admin Dashboard

Here are some images showcasing our admin dashboard:

### Admin Dashboard Overview

### User Management - Table View
![User Management Table View](https://firebasestorage.googleapis.com/v0/b/startup-d20cb.appspot.com/o/Screenshot%202024-11-22%20212950.png?alt=media&token=c4a72b9b-8a23-46a3-bc34-cdc8e2630a7e)

### Permissions Management
![Permissions Management](https://firebasestorage.googleapis.com/v0/b/startup-d20cb.appspot.com/o/Screenshot%202024-11-22%20213004.png?alt=media&token=bebfe2d8-a189-4940-a257-1cbc3e865e94)

### Filtering and Searching Users
![Filtering and Searching Users](https://firebasestorage.googleapis.com/v0/b/startup-d20cb.appspot.com/o/Screenshot%202024-11-22%20214338.png?alt=media&token=5a9e4909-7a20-4803-b4a1-4874967f5c6a)



## License

This project is licensed under the MIT License - see the LICENSE file for details.
