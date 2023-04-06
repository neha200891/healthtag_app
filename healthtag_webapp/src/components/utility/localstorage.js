export const loadState = () => {
  try {
    const serializedState = localStorage.getItem("ht_userState");
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};

export const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("ht_userState", serializedState);
  } catch (err) {
    // Ignore write errors.
  }
};
