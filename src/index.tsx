import { NativeModules, Platform } from 'react-native';

const LINKING_ERROR =
  `The package '@wyplay/react-native-wycdn' doesn't seem to be linked. Make sure: \n\n` +
  Platform.select({ ios: "- You have run 'pod install'\n", default: '' }) +
  '- You rebuilt the app after installing the package\n' +
  '- You are not using Expo Go\n';

type WycdnType = {
  /**
   * Starts the WyCDN service.
   *
   * @returns {Promise<void>} A promise that resolves when the WyCDN service starts successfully.
   * @throws {Error} Throws an error with a "WYCDN_START_ERROR" code if the service fails to start.
   */
  startWycdn: () => Promise<void>;

  /**
   * Stops the WyCDN service.
   *
   * @returns {Promise<void>} A promise that resolves when the WyCDN service is stopped successfully.
   * @throws {Error} Throws an error with a "WYCDN_STOP_ERROR" code if the service fails to stop.
   */
  stopWycdn: () => Promise<void>;

  /**
   * Sets the WyCDN configuration from an asset file.
   *
   * The configuration will only be applied when the service is starting.
   * To re-apply a configuration change, stop and restart the service.
   *
   * The specified asset file must contain a JSON dictionary with valid key-value pairs.
   * Ensure the asset file exists and is valid; otherwise, the configuration will not be applied
   * on service startup and an error will be logged.
   *
   * @param {string} configAssetFileName - The name of the config file in the assets.
   * @returns {Promise<void>} A promise that resolves when the configuration is successfully loaded.
   * @throws {Error} Throws an error with a "WYCDN_CONFIG_ASSETS_ERROR" code if the configuration fails to be set.
   */
  setConfigFromAssets: (configAssetFileName: string) => Promise<void>;

  /**
   * Sets a configuration property for the WyCDN service.
   *
   * The configuration will only be applied when the service is starting.
   * To re-apply a configuration change, stop and restart the service.
   * If the value is `null`, the specified key will be removed from the configuration.
   *
   * @param {string} key - The key of the configuration property to set.
   * @param {string | null} value - The value to set for the key, or `null` to remove the key.
   * @returns {Promise<void>} A promise that resolves when the property is successfully set or removed.
   * @throws {Error} Throws an error with a "WYCDN_CONFIG_PROPERTY_ERROR" code if the property fails to be set or removed.
   */
  setConfigProperty: (key: string, value: string | null) => Promise<void>;
};

const Wycdn: WycdnType = NativeModules.Wycdn
  ? NativeModules.Wycdn
  : new Proxy(
      {},
      {
        get() {
          throw new Error(LINKING_ERROR);
        },
      }
    );

export default Wycdn;
export const { startWycdn, stopWycdn, setConfigFromAssets, setConfigProperty } = Wycdn;
