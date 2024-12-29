import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Snackbar } from 'react-native-paper';
import { useRouter } from 'expo-router';

const languages = [
  { name: 'English', route: '/content/books' },
  { name: 'French', route: '/french' },
  { name: 'Luganda', route: '/luganda' },
  { name: 'Runyankole', route: '/runyankole' },
  { name: 'Lusoga', route: '/lusoga' },
  { name: 'Acholi', route: '/acholi' },
];

const Language = () => {
  const [visible, setVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const router = useRouter();

  const handlePress = (language: { name: string; route: string }) => {
    if (language.name === 'English') {
      router.push({ pathname: language.route as any });
    } else {
      setSnackbarMessage(`${language.name} Version coming soon`);
      setVisible(true);
    }
  };

  const onDismissSnackbar = () => {
    setVisible(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Select Language</Text>
      {languages.map((language, index) => (
        <TouchableOpacity
          key={index}
          style={styles.languageButton}
          onPress={() => handlePress(language)}
        >
          <Text style={styles.languageText}>{language.name}</Text>
        </TouchableOpacity>
      ))}
      <Snackbar
        visible={visible}
        onDismiss={onDismissSnackbar}
        duration={Snackbar.DURATION_SHORT}
      >
        {snackbarMessage}
      </Snackbar>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#F9FAFB',
    justifyContent: 'center',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  languageButton: {
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    marginBottom: 16,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  languageText: {
    fontSize: 18,
    color: '#1F2937',
  },
});

export default Language;