# The Magic Word App

A React-based personal dashboard application with weather tracking, task management, and quotes collection.

## Quick Start

### Prerequisites
Ensure you have Node.js and npm installed locally.
- Check Node.js version: `node --version` (recommended: v14 or higher)
- Check npm version: `npm --version`

If not installed, download from [nodejs.org](https://nodejs.org/)

### Installation & Running

1. **Clone the repository**
   ```bash
   git clone https://github.com/blink18/magic-word-app.git
   ```

2. **Navigate to the project directory**
   ```bash
   cd magic-word-app
   ```

3. **Install dependencies**
   ```bash
   npm install
   ```

4. **Start the development server**
   ```bash
   npm start
   ```

The app will open automatically in your browser at [http://localhost:3000/magic-word-app](http://localhost:3000/magic-word-app)

**Login:** Use the magic word `open sesame` to access the app.

---

## Features

### 🔐 Authentication
- Password-protected login (magic word: "open sesame")

### 🌤️ Weather Widget
- Auto-detects your location via IP geolocation
- Manual location search capability
- Real-time weather data from WeatherAPI
- Data cached in localStorage for offline access

### ✅ Task Manager
- Add, delete, and mark tasks as complete
- All tasks persist in localStorage
- Simple and intuitive interface

### 💬 Quotes Collection
- Store your favorite quotes
- Add and delete quotes easily
- Persistent storage using localStorage

## Tech Stack

- **React** 19.1.0
- **FontAwesome** icons
- **Create React App** tooling
- **External APIs:** WeatherAPI, IP4only.me, IP-API

## Live Demo

Visit the live app: [https://blink18.github.io/magic-word-app/](https://blink18.github.io/magic-word-app/)

## Architecture

- Single-page application with tab navigation
- All user data stored in browser's localStorage (no backend required)
- Responsive design for desktop and mobile


# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)

## Contributing

This is a personal project. Feel free to fork and modify for your own use!

## License

Open source - feel free to use and modify as needed.


