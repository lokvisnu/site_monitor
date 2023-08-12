
import { View, Text, TextInput, TouchableOpacity, SafeAreaView } from 'react-native'
import React, { useState } from 'react'
import isUrl from 'is-url';
import * as EmailValidator from 'email-validator';
const App = () => {

  const [email, setEmail] = useState('');
  const [url, SetUrl] = useState('');
  const [errorText, setErrorText] = useState('')
  const SubmitOnPress = async () => {
    if (email.trim() === '' || url.trim() === '') {

      setErrorText('Email and URL must be enetered')
    }
    else if (!isUrl(url)) {
      setErrorText('Enter valid URL')
    }
    else if (!EmailValidator.validate(email)) {
      setErrorText('Enter valid Email')
    }
    else {
      const res = await fetch('http://192.168.45.198:3000/addurl', {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: email,
          url: url
        })
      });
      setEmail('');
      SetUrl('');
    }
  }
  function isValidUrl(string) {
    try {
      new URL(string);
      return true;
    } catch (err) {
      return false;
    }
  }
  return (
    <SafeAreaView style={{
      flex: 1,
      justifyContent: 'center',
      paddingHorizontal: 50,
      backgroundColor: 'black'
    }}>
      <View style={{
        justifyContent: 'flex-start',
        flexDirection: 'column',
        marginBottom: 10
      }}>
        <Text>Email</Text>
        <TextInput onChangeText={(text) => {
          setEmail(text)
          setErrorText('')
        }}
          value={email} placeholder='Email'
          placeholderTextColor={'gray'} style={{
            paddingLeft: 20,
            paddingRight: 5,
            paddingVertical: 5,
            color: 'gray',
            fontSize: 15,
            backgroundColor: 'white',
            borderRadius: 10,
            marginTop: 8


          }} />
      </View>
      <View style={{
        justifyContent: 'flex-start',
        flexDirection: 'column',
        marginBottom: 10
      }}>
        <Text>URL</Text>
        <TextInput onChangeText={(text) => {
          SetUrl(text)
          setErrorText('')
        }}
          value={url}
          placeholder='URL'
          placeholderTextColor={'gray'} style={{
            paddingLeft: 20,
            paddingRight: 5,
            paddingVertical: 5,
            color: 'gray',
            fontSize: 15,
            backgroundColor: 'white',
            borderRadius: 10,
            marginTop: 8
          }} />
      </View>
      {errorText.length != 0 && <Text style={{
        color: 'red',
        fontWeight: '300',
        paddingHorizontal: 20
      }}>
        {errorText}
      </Text>}
      <TouchableOpacity style={{
        paddingHorizontal: 20,
        paddingVertical: 15,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        borderRadius: 25
      }} onPress={SubmitOnPress}>
        <Text style={{
          color: 'gray',
          fontWeight: '500',
          fontSize: 15,
          textTransform: 'uppercase',
          textAlign: 'center'
        }}>Submit</Text>
      </TouchableOpacity>
    </SafeAreaView>

  )
}

export default App