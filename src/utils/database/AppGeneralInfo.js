import {AsyncStorage} from 'react-native';
import {txtErrSaveDB, txtErrGetDB} from '../constants/strings';

export async function saveAppGeneralInfo(ThemeNumber, Language, FontNumber) {
  const neededData = {
    Language: Language,
    ThemeNumber: ThemeNumber,
    FontNumber: FontNumber,
  };
  try {
    await AsyncStorage.setItem('AppGeneralInfo', JSON.stringify(neededData));
  } catch (error) {
    throw txtErrSaveDB;
  }
}

export async function getAppGeneralInfo() {
  try {
    const AppGeneralInfo = await AsyncStorage.getItem('AppGeneralInfo');
    return JSON.parse(AppGeneralInfo);
  } catch (error) {
    throw txtErrGetDB;
  }
}

// export async function removeAppGeneralInfo() {
//   try {
//     await AsyncStorage.removeItem('AppGeneralInfo');
//   } catch (error) {
//     throw error;
//   }
// }
