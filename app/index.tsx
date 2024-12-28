// app/index.tsx
import { router } from 'expo-router';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';


export default function Index() {
  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <Image 
          source={require('../assets/images/bible.png')} // Make sure to add your image to assets folder
          style={styles.image}
          resizeMode="contain"
        />
        <Text style={styles.text1}>The Holy Bible </Text>
        <Text style={styles.text}>The bible is scared book of christianity </Text>
        <Text style={styles.text2}>Bayibuli ky'ekitabo ekitukuvu eky'abakulisitaayo. </Text>
      </View>
      
      <TouchableOpacity 
  style={styles.buttonContainer}
  onPress={() => { router.push('/tabs') }}
>
  <Text style={styles.buttonText}>Get Started</Text>
</TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7dd94',
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 400,
    height: 400,
  
  },
  text: {
    color: '#000',
    fontSize: 24,
    textAlign: 'center',
  },
  text2:{
    color: '#8cb891',
    fontSize: 24,
    textAlign: 'center',
  },
  text1:{
    color: '#000',
    fontSize: 30,
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom: 20,
  },
  buttonContainer: {
    backgroundColor: '#0fff2f',
    padding: 15,
    borderRadius: 10,
    marginBottom: 30,
    marginHorizontal: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 25,
    textAlign: 'center',
    fontWeight: 'bold',
  },
});