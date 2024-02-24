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

## Getting Started

### Prerequisites

- Node.js (v14.x or later)
- npm (v6.x or later) or Yarn (v1.22.x or later)

### Installation

1. **Clone the repository:**

gh repo clone VitorhugoBatista/ExchangeCurrency-API
cd currency-conversion-api

2. **Install dependencies::**

npm install

2. **Build the project::**

npm run build

3. **Run the API::**

npm start

## API DOCUMENTATION

Access comprehensive API documentation by navigating to http://localhost:4000/api-docs after starting the server. This interactive documentation allows you to explore available endpoints, try out the API in real-time, and view request/response examples.

## USAGE 

# Converting Currency
Endpoint: /v1/currencyexchange/
Method: POST
Body:
{
  "userId": 1,
  "fromCurrency": "USD",
  "toCurrency": "EUR",
  "amount": 100
}

Response:
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

# Listing User Transactions

Endpoint: /v1/currencyexchange/list/{userId}
Method: GET
Response:
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

## SECUTIRY
If you discover any security-related issues, please email me at vitorhugosjrp@gmail.com.

## lICENSE

This project is licensed under the MIT License - see the LICENSE file for details.


