package com.wyplay.wycdn.reactnative

import com.facebook.react.ReactPackage
import com.facebook.react.bridge.NativeModule
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.uimanager.ViewManager

/**
 * A React Native package that provides the WyCDN native module to the JavaScript environment.
 *
 * This package registers the `WycdnModule`, which exposes methods to interact with the WyCDN service
 * from JavaScript. It does not provide any custom view managers.
 *
 * @see WycdnModule
 */
class WycdnPackage : ReactPackage {
  /**
   * Creates and returns a list of native modules to be registered with the React Native context.
   *
   * @param reactContext The `ReactApplicationContext` for the current React Native environment.
   * @return A list containing the `WycdnModule`.
   */
  override fun createNativeModules(reactContext: ReactApplicationContext): List<NativeModule> {
    return listOf(WycdnModule(reactContext))
  }

  /**
   * Returns an empty list as this package does not provide any view managers.
   *
   * @param reactContext The `ReactApplicationContext` for the current React Native environment.
   * @return An empty list.
   */
  override fun createViewManagers(reactContext: ReactApplicationContext): List<ViewManager<*, *>> {
    return emptyList()
  }
}
