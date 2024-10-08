import { useState } from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';
import Wycdn from '@wyplay/react-native-wycdn';

/**
 * Main application component that interacts with the WyCDN service.
 */
export default function App() {
  // State variable to track if the WyCDN service is currently started
  const [isWycdnStarted, setIsWycdnStarted] = useState<boolean>(false);

  // State variable to track if the WyCDN service is currently being toggled (starting/stopping)
  const [isWycdnToggling, setIsWycdnToggling] = useState<boolean>(false);

  // State variable to hold the status message
  const [statusMessage, setStatusMessage] = useState<string>(
    'Click the button to start the WyCDN service.'
  );

  /**
   * Toggles the WyCDN service state (start or stop).
   *
   * This function updates the toggling state, calls the appropriate method to
   * start or stop the WyCDN service, and handles any errors that occur.
   */
  const toggleWycdn = async () => {
    // Set the toggling state to true while the service is being toggled
    setIsWycdnToggling(true);

    try {
      // Check whether WyCDN is currently started or stopped to determine action
      if (!isWycdnStarted) {
        // If not started, attempt to start the service
        await Wycdn.startWycdn();

        // Wait a little before going on
        await delay(3000);

        setIsWycdnStarted(true);
        setStatusMessage('WyCDN service started.');

        // Call the test health check after WyCDN is started
        await testHealthCheck();
      } else {
        // If started, attempt to stop the service
        await Wycdn.stopWycdn();
        setIsWycdnStarted(false);
        setStatusMessage('WyCDN service stopped.');
      }
    } catch (error: any) {
      // Handle any errors that occur during start/stop operations
      setStatusMessage(`Failed to ${isWycdnStarted ? 'stop' : 'start'} WyCDN: ${error.message}`);
    } finally {
      // Reset the loading state after the operation is complete
      setIsWycdnToggling(false);
    }
  };

  /**
   * Creates a delay for the specified duration.
   *
   * @param {number} duration - Duration of the delay in milliseconds.
   * @returns {Promise<void>} A promise that resolves after the specified duration.
   */
  const delay = async (duration: number): Promise<void> => {
    return new Promise((resolve) => setTimeout(resolve, duration));
  };

  /**
   * Performs a health check on the WyCDN service.
   * <p>
   * This method is for testing purposes only and should not be included in a real application.
   * It checks the /wycdn/health endpoint to ensure the WyCDN service is functioning correctly.
   */
  const testHealthCheck = async () => {
    // Create an AbortController to handle request timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 1000); // Timeout in 1000ms

    try {
      const response = await fetch('http://127.0.0.1:8000/wycdn/health', {
        method: 'GET',
        signal: controller.signal,
      });

      // Check if the response is OK (HTTP 200)
      if (response.status === 200) {
        setStatusMessage((prevMessage) => `${prevMessage} Health check successful.`);
      } else {
        throw new Error(`Health check failed: response code ${response.status}`);
      }
    } finally {
      // Clear the timeout once the request is done
      clearTimeout(timeoutId);
    }
  };

  return (
    <View style={styles.container}>
      {/* Button to start or stop the WyCDN service, disabled while toggling */}
      <Button
        title={isWycdnStarted ? 'Stop WyCDN' : 'Start WyCDN'}
        onPress={toggleWycdn}
        disabled={isWycdnToggling}
      />
      {/* Display the current status message */}
      <Text style={styles.statusText}>{statusMessage}</Text>
    </View>
  );
}

// Styles for the component
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  statusText: {
    marginTop: 20,
    fontSize: 16,
    color: 'gray',
  },
});
