# Commands to run

npm install

npm install -g react-native-cli

react-native bundle --platform android --dev false --entry-file index.android.js --bundle-output android/app/src/main/assets/index.android.bundle --assets-dest android/app/src/main/res

Keep an AVD running on your system and the run following command

react-native run-android