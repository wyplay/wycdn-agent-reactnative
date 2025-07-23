# @wyplay/react-native-wycdn

A React Native module that allows integration of WyCDN into mobile and TV applications.

## Dependencies

- Node.js LTS 20 (or compatible release)

For Android:

- A `minSdkVersion` greater than or equal to API level 28.

## Installation

```sh
yarn add @wyplay/react-native-wycdn
```

## Configuration for Android

### 1. Ensure minSdkVersion is compatible with WyCDN service

At the start of your app root `build.gradle` file (not the one near the `src` directory), ensure `minSdkVersion` is greater than or equal to API level 28.

```gradle
buildscript {
    ext {
        ...
        minSdkVersion = 28 // or greater
        ...
    }
    ...
}
```

### 2. Add Wyplay maven repository to root build.gradle

At the end of your app root `build.gradle` file, add the following block to declare Wyplay Maven repository:

```gradle
allprojects {
  repositories {
    maven {
      name "wyplayRepositoryReleases"
      url "https://maven.wyplay.com/releases"
      credentials(PasswordCredentials)
    }
  }
}
```

### 3. Declare properties in gradle.properties

In your application `gradle.properties` file, declare the following properties for WyCDN repository credentials:

```properties
# Set wyplayRepositoryReleases repository username and password below or using command-line
# (eg: `./gradlew build -P wyplayRepositoryReleasesUsername=username -P wyplayRepositoryReleasesPassword=password`).
wyplayRepositoryReleasesUsername=USERNAME_PLACEHOLDER
wyplayRepositoryReleasesPassword=PASSWORD_PLACEHOLDER
```

Replace `USERNAME_PLACEHOLDER`, `PASSWORD_PLACEHOLDER` with values given by Wyplay.

This ensures that your project can download the required WyCDN service dependencies from Wyplay Maven repository.

### 4. Allow cleartext traffic

In order to communicate with the WyCDN proxy, you app need to allow cleartext traffic to `localhost`.

#### Add a networkSecurityConfig to AndroidManifest.xml

To enable the network security configuration, you need to add the following attribute to your application's tag in the `AndroidManifest.xml` file in the `src/main` directory.

_src/main/AndroidManifest.xml content:_

```xml
<application
    ...
    android:networkSecurityConfig="@xml/network_security_config">
    ...
</application>
```

#### Create network_security_config.xml file

Next, you need to create a new XML file named `network_security_config.xml` in the `src/main/res/xml` directory of your project.  If the `res/xml` directory does not exist, create it.

_src/main/res/xml/network_security_config.xml content:_

```xml
<?xml version="1.0" encoding="utf-8"?>
<network-security-config>
    <domain-config cleartextTrafficPermitted="true">
        <domain includeSubdomains="false">127.0.0.1</domain>
    </domain-config>
</network-security-config>
```

To allow debugging your app with Metro, you need to create another `network_security_config.xml` file in the `src/debug/res/xml` directory of your project. This configuration will only be used for debug builds.

_src/debug/res/xml/network_security_config.xml content:_

```xml
<?xml version="1.0" encoding="utf-8"?>
<network-security-config>
    <base-config cleartextTrafficPermitted="true">
    </base-config>
</network-security-config>
```

## Configuration for iOS

### 1. Ensure the iOS minimum deployment target is compatible with WyCDN agent

At the beginning of the `Podfile` of your project:

```ruby
platform :ios, '15.0'
```

### 2. Add Wyplay podspecs repository

At the beginning of the `Podfile` of your project:

```ruby
source 'https://cdn.cocoapods.org'
source 'git@github.com:wyplay/wycdn-agent-podspecs.git'
```

## Integration example

### Getting the example app

In the source code of this module, you can refer to the [example app](https://github.com/wyplay/wycdn-agent-reactnative/tree/main/example) for a quick sample code integrating the WyCDN service.

For a more advanced example, you may refer to the sample code of the [WyCDN React Native sample app](https://github.com/wyplay/wycdn-sampleapp-reactnative).

### Running the example app

Get the [source code](https://github.com/wyplay/wycdn-agent-reactnative) of this module.

In a shell, run from the root of the project:

```sh
yarn start
```

In another shell, prepare the example app:

```sh
yarn
```

Run the example app on Android:

```sh
yarn example android
```

Run the example app on iOS (not yet supported):

```sh
yarn example ios
```

## License

Please refer to the LICENSE file.
