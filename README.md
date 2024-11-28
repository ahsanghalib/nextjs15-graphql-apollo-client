##Nextjs 15 + Apollo Client + JWT Token (Access & Refresh)

This project is a starting point for building a web application using Next.js 15, Apollo Client, and JWT Token (Access & Refresh) for authentication.

## Table of Contents

* [Getting Started](#getting-started)
* [Project Structure](#project-structure)
* [Features](#features)
* [Authentication](#authentication)
* [Apollo Client](#apollo-client)
* [Next.js 15](#nextjs-15)
* [JWT Token (Access & Refresh)](#jwt-token-access-refresh)
* [License](#license)

## Getting Started

To get started with this project, follow these steps:

1. Clone the repository: `git clone https://github.com/your-username/your-repo-name.git`
2. Install dependencies: `pnpm install`
3. Start the development server: `pnpm dev`
4. Open your browser and navigate to `http://localhost:3000`

## Project Structure

The project is structured as follows:

* `components`: Reusable React components
* `containers`: Containers for the application
* `pages`: Next.js pages
* `public`: Public assets
* `styles`: Global CSS styles
* `utils`: Utility functions

## Features

* Authentication using JWT Token (Access & Refresh)
* Apollo Client for GraphQL queries and mutations
* Next.js 15 for server-side rendering and static site generation

## Authentication

This project uses JWT Token (Access & Refresh) for authentication. The authentication flow is as follows:

1. User logs in with their credentials
2. Server generates an access token and a refresh token
3. Access Token & Refresh Token is sent to the client and stored in cookies with Expiry.
4. When the access token expires cookie gets removed and middleware will send the mutation to server to get new tokens and store in cookies

## Apollo Client

This project uses Apollo Client for GraphQL queries and mutations. The Apollo Client is configured to use the `http` link and the `cache` is set to `InMemoryCache`.

## Next.js 15

This project uses Next.js 15 for server-side rendering and static site generation. The Next.js configuration is set to use the `target` as `serverless` and the `webpack` configuration is set to use the `next-babel-loader`.

## JWT Token (Access & Refresh)

This project uses JWT Token (Access & Refresh) for authentication. The JWT token is generated using the `jsonwebtoken` library and is stored in local storage.

## License

This project is licensed under the MIT License.
 Nextjs 15 + Apollo Client + JWT Token (Access & Refresh)
