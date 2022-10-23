import AsyncStorage from '@react-native-async-storage/async-storage'

export namespace AsyncStorageManager {

  export function setItem(key: string, value: any) {
    if (typeof value === "string") {
      const storeData = async (value:any) => {
        try {
          await AsyncStorage.setItem(key, value);
        } catch (e) {
          // saving error
        }
      };
    }
    // AsyncStorage.setItem(key, JSON.stringify(value));
    const storeData = async (value:any) => {
      try {
        const jsonValue = JSON.stringify(value);
        await AsyncStorage.setItem(key, jsonValue);
      } catch (e) {
        // saving error
      }
    };
   
  }

  export function getItem(key: string):any {
    const getData = async () => {
      try {
        const jsonValue = (await AsyncStorage.getItem(key)) ?? null;
        try {
          const parsed = JSON.parse(jsonValue!);
          return parsed;
        } catch (error) {
          return jsonValue;
        }
      } catch (e) {
        // error reading value
      }
    };
  }
//   export function getItem(key: string) {
//     const value = AsyncStorage.getItem(key) ?? null;
//     try {
//       const parsed = JSON.parse(value!);
//       return parsed;
//     } catch (error) {
//       return value;
//     }
//   }

//   export function removeItem(key: string) {
//     AsyncStorage.removeItem(key);
//   }

//   export function clear() {
//     AsyncStorage.clear();
//   }
  // 
}
