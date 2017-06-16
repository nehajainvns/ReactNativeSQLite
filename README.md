# react-native-sqlite-storage

# How to use (Android):

#### Step 1 - NPM Install

npm install --save react-native-sqlite-storage

#### Step 2 - Update Gradle Settings

// file: android/settings.gradle

include ':react-native-sqlite-storage'
project(':react-native-sqlite-storage').projectDir = new File(rootProject.projectDir, '../node_modules/react-native-sqlite-storage/src/android')

#### Step 3 - Update app Gradle Build

// file: android/app/build.gradle

dependencies {
    ...
    compile project(':react-native-sqlite-storage')
}

// file: android/app/src/main/java/com/myapp
Find getPackages method and add sync like following

import org.pgsqlite.SQLitePluginPackage;

public class MainApplication extends Application implements ReactApplication {
  ......

  /**
   * A list of packages used by the app. If the app uses additional views
   * or modules besides the default ones, add more packages here.
   */
    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
        new SQLitePluginPackage(),   // register SQLite Plugin here
        new MainReactPackage());
    }
}

#### Step 3 - Replace index.android.js with our file @ project root location