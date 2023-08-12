import { View, Text, TextInput, Touchable, TouchableWithoutFeedback } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

const Login = () => {
    const [email, setEmail] = useState('')
    const [pass, setPass] = useState('')
    return (
        <SafeAreaView style={{
            flex: 1,
            justifyContent: 'center',
            alignContent: 'center',
            backgroundColor: 'white'
        }}>
            <View style={{
                backgroundColor: 'lightgrey',
                width: 500,
                height: 200
            }}>
                <View style={{
                    flexDirection: 'column',
                    justifyContent: 'flex-start'
                }}>
                    <Text>Email</Text>
                    <TextInput
                        style={{
                            backgroundColor: 'white',
                            color: 'gray',
                            paddingHorizontal: 20,
                            paddingVertical: 5
                        }}
                        placeholderTextColor={'gray'}
                        placeholder='Email' value={email} onChangeText={(text) => setEmail(text)} />
                </View>
                <View style={{
                    flexDirection: 'column',
                    justifyContent: 'flex-start'
                }}>
                    <Text>Password</Text>
                    <TextInput
                        style={{
                            backgroundColor: 'white',
                            color: 'gray',
                            paddingHorizontal: 20,
                            paddingVertical: 5
                        }}
                        placeholderTextColor={'gray'} placeholder='Email' value={pass} onChangeText={(text) => setPass(pass)} />
                </View>
                <TouchableWithoutFeedback style={{
                    paddingHorizontal: 20,
                    paddingVertical: 5,
                    justifyContent: 'center',
                    alignContent: 'center'
                }}>
                    <Text style={{
                        fontSize: 15,
                        color: 'white'
                    }}>Login</Text>
                </TouchableWithoutFeedback>
            </View>
        </SafeAreaView>
    )
}

export default Login