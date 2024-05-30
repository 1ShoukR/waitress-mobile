# waitress-mobile

## Introduction

Welcome to Waitress! This is a mobile application that allows users to  reserve tables and order food from their favorite restaurants.

## Installation

1. Clone the repositoryq
```
git clone https://github.com/1ShoukR/waitress-mobile.git
```

2. cd into waitress-mobile and install the dependencies
```
cd waitress-mobile && npm i
```

3. Install ngrok globally
```
npm i -g ngrok
```

4. Initialize ngrok. You may need to sign up for an account to get an authtoken if you have not done so already.
```
ngrok authtoken <your_auth_token>
```

5. Start the ngrok tunnel, and copy the https URL that is given to you
```
ngrok http <local_server_port>
```

6. Receieve an env file from a senior team member and place it in the root of the project. The env file should contain the following:
```env
REACT_APP_API_URL=<ngrok_https_url>
```

7. Start the application
```
npm start
```

8. Open the application on your mobile device using the Expo Go app and scan the QR code
    - NOTE: You may need to sign up for an account on Expo if you have not done so already, and you may need to install the Expo Go app on your mobile device.
    - Depending on the complexity of the project, a development build mayb be required.