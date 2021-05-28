import Auth from '@aws-amplify/auth';
import React, {useState} from 'react'
import { View, Text } from 'react-native'
import AppButton from '../../Components/AppButton';
import AppTextInput from '../../Components/AppTextInput';

export default function ForgotPassword({navigation}) {
    const [page, setPage] = useState(true);
    const [username, setUsername] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [code, setCode] = useState("");
    async function submitForgot({navigation}) {
        try {
            await Auth.forgotPassword(username);
            setPage(false);
        } catch (error) {
            console.log(' Error with forgot password...', error);
        }
    }
    async function submitReset(){
        try {
            await Auth.forgotPasswordSubmit(username,code,newPassword);
            navigation.navigate('SignIn');
        } catch (error) {
            console.log(' Error with forgot password...', error);
        }
    }
    return (
        <View>
            {
                page?<View>
                    <Text>Enter Username</Text>
                    <AppTextInput
                        value={username}
                        onChangeText={text => setUsername(text)}
                        leftIcon="account"
                        placeholder="Enter username"
                        autoCapitalize="none"
                        keyboardType="email-address"
                        textContentType="emailAddress"
                        />
                    <AppButton title ="Submit" onPress={submitForgot}/>
                    

                </View>:<View>
                    <AppButton title ="Back" onPress={()=>setPage(true)}/>
                    <Text>Enter New Password</Text>
                    <AppTextInput
                    value={newPassword}
                    onChangeText={text => setNewPassword(text)}
                    leftIcon="lock"
                    placeholder="Enter password"
                    autoCapitalize="none"
                    autoCorrect={false}
                    secureTextEntry
                    textContentType="password"
                    />
                    <Text>Enter Verification Code Sent To Your Email</Text>
                    <AppTextInput
                    value={code}
                    onChangeText={text => setCode(text)}
                    leftIcon="numeric"
                    placeholder="Enter verification code"
                    keyboardType="numeric"
                    />
                     <AppButton title ="Submit" onPress={submitReset}/>
                </View>
            }
            
        </View>
    )
}
