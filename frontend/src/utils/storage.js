const STORAGE_KEY = "rag-assistant-data";

export function saveAppState(state) {

  try {

    localStorage.setItem(

      STORAGE_KEY,

      JSON.stringify(state)

    );

  }

  catch (error) {

    console.error("Failed to save app state:", error);

  }

}

export function loadAppState() {

  try {

    const data = localStorage.getItem(STORAGE_KEY);

    if (!data) {

      return null;

    }

    return JSON.parse(data);

  }

  catch (error) {

    console.error("Failed to load app state:", error);

    return null;

  }

}

export function clearAppState() {

  localStorage.removeItem(STORAGE_KEY);

}