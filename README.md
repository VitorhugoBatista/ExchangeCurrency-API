# Currency Conversion API

Welcome to the Currency Conversion API, an efficient, reliable solution designed to facilitate real-time currency exchange rates and conversion operations for developers, financial analysts, and businesses worldwide. This API provides a robust platform for integrating currency conversion functionalities into your applications, offering up-to-date exchange rates, user-specific transaction tracking, and extensive documentation to ensure seamless implementation.

## Features

### Real-Time Currency Conversion
Convert amounts between a wide range of global currencies with real-time exchange rates.

### Transaction Tracking
Each conversion operation is saved as a transaction, allowing users to track their currency exchange history.

### Embedded SQLite Database
Leveraging an embedded SQLite database, this database integration facilitates swift data retrieval and transaction storage without the complexities of external database management.


### Rate Limiting
To ensure uninterrupted service and avoid potential downtimes due to excessive requests, our API implements rate limiting. This crucial feature prevents abuse and guarantees the API's availability and performance, even under high traffic conditions.

### Scalable
Whether you're a startup or a large enterprise, our API is built to scale with your needs, handling requests efficiently regardless of volume.

### Automatic Deployment via Heroku
To automate deployments to Heroku and ensure your application is always up to date with the latest commits in your GitHub repository, you can set up a CI/CD pipeline using GitHub Actions.

## Steps for Setup:
Heroku CLI and GitHub Secrets:

## Ensure the Heroku CLI is installed and you are logged in.
In your GitHub repository, go to Settings > Secrets and add the following secrets:
```
HEROKU_API_KEY: Your Heroku API key.
HEROKU_APP_NAME: The name of your Heroku app.
```
## Getting Started

### Environment Setup:

-To ensure the proper operation of the Currency Conversion API, it is necessary to correctly set up the environment variables. This includes specifying the API URL for currency conversion, the API key to access the currency conversion service, and the port on which the API will run. Follow the steps below to configure your environment:

**Step 1: Create the .env File**

Based on the .env.example file located at the root of the project, create a new .env file. This file should contain all the environment variables required for the project’s execution.

**Step 2: Configure Environment Variables**

Add the following variables to the .env file, replacing your_api_url, your_api_key, and server_port with the corresponding values:
```
API_EXCHANGE_URL=your_api_url
EXCHANGE_RATE_API_KEY=your_api_key
SERVER_PORT=server_port
```
### Pre requisites
```
- Node.js (v14.x or later)
- npm (v6.x or later) or Yarn (v1.22.x or later)
```

### Installation

1. **Clone the repository:**
```
gh repo clone VitorhugoBatista/ExchangeCurrency-API
cd currency-conversion-api
```
2. **Install dependencies::**
```
npm install
```
3. **Build the project::**
```
npm run build
```
4. **Run the API::**
```
npm start
```
## RUNNING TESTS

**Run the tests using the following command:**
```
npm run test
```
![image](https://github.com/VitorhugoBatista/ExchangeCurrency-API/assets/62615687/18b9b385-5dc2-4841-ba88-a92f76dd6be0)


## Using Docker

1. **Build the Docker image:**
```
docker build -t currency-conversion-api .
```
2. **Run the container:**
```
docker run -p 4000:4000 currency-conversion-api
```

## API DOCUMENTATION

Access comprehensive API documentation by navigating to http://localhost:4000/api-docs after starting the server. This interactive documentation allows you to explore available endpoints, try out the API in real-time, and view request/response examples.

# USAGE

## Converting Currency

- **Endpoint:** `/v1/currencyexchange/`
- **Method:** POST
- **Body:**

```json
{
  "userId": 1,
  "fromCurrency": "USD",
  "toCurrency": "EUR",
  "amount": 100
}
```

- **Response:**
```json
{
  "userId": 1,
  "sourceCurrency": "USD",
  "targetCurrency": "EUR",
  "sourceValue": 100,
  "targetValue": 85,
  "conversionRate": 0.85,
  "date": "2023-09-21T14:55:00.000Z",
  "id": 12345
}
```

### Listing User Transactions

- **Endpoint:** ` /v1/currencyexchange/list/{userId}`
- **Method:** GET
- **Response:**
```json
[
  {
    "sourceCurrency": "USD",
    "targetCurrency": "EUR",
    "sourceValue": 100,
    "targetValue": 85,
    "conversionRate": 0.85,
    "date": "2023-09-21T14:55:00.000Z",
    "id": 12345
  }
]
```
## SECUTIRY
If you discover any security-related issues, please email me at vitorhugosjrp@gmail.com.

## lICENSE

This project is licensed under the MIT License - see the LICENSE file for details.


