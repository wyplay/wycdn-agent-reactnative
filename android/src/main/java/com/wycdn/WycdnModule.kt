package com.wyplay.wycdn.reactnative

import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.Promise
import com.wyplay.wycdn.WycdnServiceConnection

/**
 * A React Native module that provides an interface to interact with the WyCDN service.
 *
 * This module allows JavaScript code to start or stop the WyCDN service, and sets its configuration.
 * The methods in this module return Promises, which are resolved or rejected based
 * on the outcome of the operation.
 *
 * @constructor Creates an instance of the `WycdnModule` class with the given React context.
 * @param reactContext The `ReactApplicationContext` used for accessing the React Native environment.
 */
class WycdnModule(reactContext: ReactApplicationContext) :
  ReactContextBaseJavaModule(reactContext) {

  /** Connection to the WyCDN service. */
  val wycdn: WycdnServiceConnection = WycdnServiceConnection(reactContext)

  /**
   * Returns the name of the native module to be used in the JavaScript code.
   *
   * This name is used to access the module from the JavaScript side, typically through `NativeModules.Wycdn`.
   *
   * @return The name of the module as a `String`, which is `"Wycdn"`.
   */
  override fun getName(): String {
    return NAME
  }

  /**
   * Starts the WyCDN service.
   *
   * Attempts to bind to the WyCDN service. If successful, resolves the promise;
   * otherwise, rejects it with the `"WYCDN_START_ERROR"` code.
   *
   * @param promise The `Promise` to handle success or failure of the service start.
   */
  @ReactMethod
  fun startWycdn(promise: Promise) {
    try {
      if (wycdn.bindService())
        promise.resolve(null)
      else
        promise.reject("WYCDN_START_ERROR", RuntimeException("Failed to start WyCDN service"))
    } catch(e : Exception) {
      promise.reject("WYCDN_START_ERROR", "Error while starting the WyCDN service", e)
    }
  }

  /**
   * Stops the WyCDN service.
   *
   * Attempts to unbind from the WyCDN service. If successful, resolves the promise;
   * otherwise, rejects it with the `"WYCDN_STOP_ERROR"` code.
   *
   * @param promise The `Promise` to handle success or failure of the service stop.
   */
  @ReactMethod
  fun stopWycdn(promise: Promise) {
    try {
      wycdn.unbindService()
      promise.resolve(null)
    } catch(e : Exception) {
      promise.reject("WYCDN_STOP_ERROR", "Error while stopping the WyCDN service", e)
    }
  }

  /**
   * Sets the WyCDN configuration from the specified file in the application assets.
   *
   * The configuration will only be applied when the service is starting.
   * To re-apply a configuration change, stop and restart the service.
   *
   * The specified asset file must contain a JSON dictionary with valid key-value pairs.
   * Ensure the asset file exists and is valid; otherwise, the configuration will not be applied
   * on service startup and an error will be logged.
   *
   * If successful, resolves the promise; otherwise, catches and rejects the promise with the `"WYCDN_CONFIG_ASSETS_ERROR"` code.
   *
   * @param configAssetFileName The name of the config file in the assets, or `null` to unset a previously set config.
   * @param promise The `Promise` to handle success or failure of the configuration load.
   */
  @ReactMethod
  fun setConfigFromAssets(configAssetFileName: String?, promise: Promise) {
    try {
      wycdn.setConfigFromAssets(configAssetFileName)
      promise.resolve(null)
    } catch(e : Exception) {
      promise.reject("WYCDN_CONFIG_ASSETS_ERROR", "Error while setting WyCDN config from assets", e)
    }
  }

  /**
   * Sets the value of a WyCDN configuration property identified by the given key.
   *
   * The configuration will only be applied when the service is starting.
   * To re-apply a configuration change, stop and restart the service.
   * If the value is `null`, the specified key will be removed from the configuration.
   *
   * If successful, resolves the promise; otherwise, catches and rejects the promise with the `"WYCDN_CONFIG_PROPERTY_ERROR"` code.
   *
   * @param key The key of the configuration property. Must not be `null` or empty.
   * @param value The value to set, or `null` to remove the key from the configuration.
   * @param promise The `Promise` to handle success or failure of the operation.
   */
  @ReactMethod
  fun setConfigProperty(key: String, value: String?, promise: Promise) {
    try {
      wycdn.setConfigProperty(key, value)
      promise.resolve(null)
    } catch(e : Exception) {
      promise.reject("WYCDN_CONFIG_PROPERTY_ERROR", "Error while setting a WyCDN config property", e)
    }
  }

  /**
   * A companion object that holds constant values for the `WycdnModule`.
   */
  companion object {
    /** The name of the Wycdn module as exposed to JavaScript. */
    const val NAME = "Wycdn"
  }
}
