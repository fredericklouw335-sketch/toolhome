# Build ToolHome V6 on Windows

Requirements:
- Node.js 20+
- Android Studio
- Android SDK
- JDK compatible with your installed Android Gradle plugin

Commands from this folder:
1. npm install
2. npm run build
3. npx cap add android
4. npx cap sync android
5. npx cap open android

In Android Studio, test on a physical phone/emulator, then create a signed Android App Bundle (.aab) for Google Play.

For iOS, use a Mac with Xcode:
1. npm install
2. npm run build
3. npx cap add ios
4. npx cap sync ios
5. npx cap open ios
