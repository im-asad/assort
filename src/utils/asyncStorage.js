import { AsyncStorage } from "react-native";

export const _storeData = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, value);
    return true;
  } catch (error) {
    // Error saving data
    return false;
  }
};

export const _retrieveData = async name => {
  try {
    const value = await AsyncStorage.getItem(name);
    if (value !== null) {
      console.log(value);
      return value;
    }
  } catch (error) {
    // Error retrieving data
    return false;
  }
};
