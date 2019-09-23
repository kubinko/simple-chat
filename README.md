# SimpleChat

This project serves as a demo for some of Firebase capabilities.

## Firebase setup

1. Create [Firebase account ](firebase.google.com).
2. Install Firebase CLI tools from [GitHub](https://github.com/firebase/firebase-tools).
3. Authenticate to your Firebase account - run `firebase login` from command line.

## Project setup

1. Create new project in [Firebase console](console.firebase.google.com).
2. Create new web app in this project.
3. Create environment file *environment.ts* in *src\environments*.
4. Set Firebase config values in environment file from Project settings (can be found in Firebase console via gear icon at the top left).
5. Install all project packages via `npm install`.
6. Install packages to work with Firebase in Angular via `npm i firebase @angular/fire`.

## App overview

Application serves as a simple chat and consists of 3 components:
- **Login** - used for logging in (Google, Anonymous)
- **Home** - used for creating new chats and loading list of available chats
- **Chat** - chat window with capability to send/receive text/image chat messages
