// Google Maps API Key
const GOOGLE_MAPS_API_KEY = "AIzaSyCkcaT2SmzV-hMs1DrdHswLMaT5Aplbm4U";

let isLoading = false;
let isLoaded = false;
const callbacks: (() => void)[] = [];
const SCRIPT_ID = 'google-maps-script';

/**
 * Load Google Maps JavaScript API once globally
 */
export function loadGoogleMaps(): Promise<void> {
  return new Promise((resolve, reject) => {
    // Already loaded and ready
    if (isLoaded && window.google && window.google.maps && window.google.maps.Map) {
      resolve();
      return;
    }

    // Check if script already exists in DOM
    const existingScript = document.getElementById(SCRIPT_ID);
    if (existingScript) {
      // Script exists, check if fully loaded
      if (window.google && window.google.maps && window.google.maps.Map) {
        isLoaded = true;
        resolve();
        return;
      }
      // Script exists but not loaded yet, add to callback queue
      if (!callbacks.includes(resolve as any)) {
        callbacks.push(resolve);
      }
      return;
    }

    // Currently loading, add to callback queue
    if (isLoading) {
      if (!callbacks.includes(resolve as any)) {
        callbacks.push(resolve);
      }
      return;
    }

    // Start loading
    isLoading = true;
    callbacks.push(resolve);

    // Create a global callback that Google Maps will call when ready
    (window as any).initGoogleMaps = () => {
      isLoaded = true;
      isLoading = false;
      // Execute all queued callbacks
      callbacks.forEach(cb => cb());
      callbacks.length = 0;
    };

    const script = document.createElement('script');
    script.id = SCRIPT_ID;
    script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&callback=initGoogleMaps`;
    script.async = true;
    script.defer = true;
    
    script.onerror = () => {
      isLoading = false;
      isLoaded = false;
      // Remove the script on error so it can be retried
      const failedScript = document.getElementById(SCRIPT_ID);
      if (failedScript) {
        failedScript.remove();
      }
      const error = new Error('Failed to load Google Maps');
      callbacks.forEach(cb => reject(error));
      callbacks.length = 0;
    };

    document.head.appendChild(script);
  });
}

// Declare global google types
declare global {
  interface Window {
    google: any;
  }
}
