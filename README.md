# Developer Contribution Tracker (DCT)

A React Native app to track and compare GitHub contributions side by side. Analyze developer activity, view contribution patterns, and compare multiple GitHub profiles in an intuitive mobile interface.

## 📱 Screenshots

<table>
  <tr>
    <td><img src="src/assets/screenshots/home screen dct.jpg" width="200" alt="Home Screen"/></td>
    <td><img src="src/assets/screenshots/compare screen dct.jpg" width="200" alt="Compare Screen"/></td>
    <td><img src="src/assets/screenshots/profile screen dct.jpg" width="200" alt="Profile Screen"/></td>
  </tr>
  <tr>
    <td align="center">Home Screen</td>
    <td align="center">Compare Screen</td>
    <td align="center">Profile Screen</td>
  </tr>
</table>

<details>
<summary>View More Screenshots</summary>

<table>
  <tr>
    <td><img src="src/assets/screenshots/login screen dct.jpg" width="200" alt="Login Screen"/></td>
    <td><img src="src/assets/screenshots/sgnup screen dct.jpg" width="200" alt="Signup Screen"/></td>
    <td><img src="src/assets/screenshots/onboarding screen dct.jpg" width="200" alt="Onboarding Screen"/></td>
  </tr>
  <tr>
    <td align="center">Login Screen</td>
    <td align="center">Signup Screen</td>
    <td align="center">Onboarding Screen</td>
  </tr>
  <tr>
    <td><img src="src/assets/screenshots/comparison history screen dct.jpg" width="200" alt="History Screen"/></td>
    <td><img src="src/assets/screenshots/otp screen dct.jpg" width="200" alt="OTP Screen"/></td>
    <td><img src="src/assets/screenshots/modal dct.jpg" width="200" alt="Modal"/></td>
  </tr>
  <tr>
    <td align="center">Comparison History</td>
    <td align="center">OTP Verification</td>
    <td align="center">Modal Dialog</td>
  </tr>
</table>

</details>

## ✨ Features

- 🔍 **GitHub Profile Analysis** - Track and analyze GitHub user contributions
- 📊 **Side-by-Side Comparison** - Compare multiple developers' contribution patterns
- 📱 **Mobile-First Design** - Optimized for mobile devices with intuitive UI
- 🔐 **Firebase Authentication** - Secure user authentication and management
- 📈 **Contribution History** - View historical comparison data
- 🎨 **Modern UI/UX** - Clean, responsive design with smooth animations
- 🌙 **Theme Support** - Light and dark mode support
- 💾 **Offline Storage** - Local data persistence with Redux Persist

## 🛠️ Tech Stack

- **Framework**: React Native 0.80.0
- **Language**: TypeScript
- **Navigation**: React Navigation 7.x
- **State Management**: Redux Toolkit & React Redux
- **Authentication**: Firebase Auth
- **Storage**: AsyncStorage & Redux Persist
- **UI Components**: Custom components with SVG support
- **API Calls**: Axios
- **Testing**: Jest & React Native Testing Library

## 📋 Prerequisites

Before running this project, make sure you have:

- **Node.js** >= 18.0.0
- **React Native CLI** installed globally
- **Android Studio** (for Android development)
- **Xcode** (for iOS development, macOS only)
- **Java Development Kit (JDK)** version 11 or newer
- **Android SDK** and **Android Virtual Device (AVD)**

## 🚀 Installation

1. **Clone the repository**
   ```sh
   git clone https://github.com/sermadahmad/DeveloperContributionTracker.git
   cd DeveloperContributionTracker
   ```

2. **Install dependencies**
   ```sh
   npm install
   ```

3. **Install iOS dependencies** (macOS only)
   ```sh
   cd ios && pod install && cd ..
   ```

4. **Set up Firebase** (Optional - for authentication features)
   - Create a Firebase project
   - Add your `google-services.json` to `android/app/`
   - Add your `GoogleService-Info.plist` to `ios/DCT/`

## 🏃‍♂️ Running the App

### Android

1. **Start Metro bundler:**
   ```sh
   npm start
   ```

2. **In a new terminal, run:**
   ```sh
   npm run android
   ```

### iOS (macOS only)

1. **Start Metro bundler:**
   ```sh
   npm start
   ```

2. **In a new terminal, run:**
   ```sh
   npm run ios
   ```

## 📝 Available Scripts

| Script | Description |
|--------|-------------|
| `npm start` | Start Metro bundler |
| `npm run android` | Build and run on Android emulator/device |
| `npm run ios` | Build and run on iOS simulator/device |
| `npm run lint` | Run ESLint for code linting |
| `npm test` | Run Jest tests |

## 📁 Project Structure

```
src/
├── assets/           # Images, icons, and screenshots
├── components/       # Reusable UI components
├── constants/        # App constants and theme
├── navigation/       # Navigation configuration
├── redux/           # Redux store and slices
├── screens/         # App screens
└── types/           # TypeScript type definitions
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 👨‍💻 Author

**Sermad Ahmad**
- GitHub: [@sermadahmad](https://github.com/sermadahmad)

## 🙏 Acknowledgments

- React Native community for amazing tools and libraries
- GitHub API for providing contribution data
- Firebase for authentication services

## 📞 Support

If you have any questions or need help, please open an issue on GitHub or contact the author.
