import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';

export default function SignUpScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create New Account</Text>
      <Text style={styles.subtitle}>Already Registered? Log in here.</Text>

      <Text style={styles.label}>NAME</Text>
      <TextInput style={styles.input} placeholder="Jia Ranjan" />

      <Text style={styles.label}>EMAIL</Text>
      <TextInput style={styles.input} placeholder="hello@reallygreatsite.com" keyboardType="email-address" />

      <Text style={styles.label}>PASSWORD</Text>
      <TextInput style={styles.input} placeholder="*****" secureTextEntry />

      <Text style={styles.label}>SEX</Text>
      <TextInput style={styles.input} placeholder="F - M - Rather not say" />

      <TouchableOpacity style={styles.signupButton}>
        <Text style={styles.buttonText}>Sign up</Text>
      </TouchableOpacity>

      <Text style={styles.successMessage}>SUCCESSFULL SIGN UP!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#6A5ACD',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    color: '#A9A9A9',
    marginBottom: 20,
    textAlign: 'center',
  },
  label: {
    fontSize: 14,
    color: '#A9A9A9',
    alignSelf: 'flex-start',
    marginLeft: '10%',
    marginBottom: 5,
  },
  input: {
    width: '80%',
    padding: 10,
    borderWidth: 1,
    borderColor: '#d3d3d3',
    borderRadius: 5,
    marginBottom: 15,
    backgroundColor: '#f5f5f5',
  },
  signupButton: {
    backgroundColor: '#ADD8E6',
    width: '80%',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  successMessage: {
    color: '#228B22',
    fontSize: 14,
    marginTop: 20,
    fontWeight: 'bold',
  },
});