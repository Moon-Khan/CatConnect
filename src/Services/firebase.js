// FirebaseService.js
import firestore from '@react-native-firebase/firestore';

class FirebaseService {
  static async addCatProfile(catProfileData, collection) {
    try {
      // Make sure catProfileData is an object
      if (typeof catProfileData === 'object' && catProfileData !== null) {
        await firestore().collection(collection).add(catProfileData);
        console.log('Cat profile added to Firestore');
      } else {
        console.error('Error adding cat profile to Firestore: Invalid data format');
      }
    } catch (error) {
      console.error('Error adding cat profile to Firestore', error);
    }
  }
}

export default FirebaseService;
