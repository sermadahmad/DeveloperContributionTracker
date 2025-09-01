import { StyleSheet, Text, View, Dimensions, TouchableOpacity, TextInput, ScrollView, Keyboard, ActivityIndicator } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ICONS } from '../../constants/icons'
import MyButton from '../../components/MyButton';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StackNavigationParamList } from '../../navigation/types';
import { lightTheme, darkTheme } from '../../constants/theme';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../../redux/store';

const { height } = Dimensions.get('window');

type OTPScreenProps = NativeStackScreenProps<StackNavigationParamList, 'OTPScreen'>;

const OTPScreen: React.FC<OTPScreenProps> = ({ navigation }) => {
    const mode = useSelector((state: RootState) => state.theme.mode);
    const theme = mode === 'light' ? lightTheme : darkTheme;

    const dispatch = useDispatch<AppDispatch>();

    const [count, setCount] = useState(60);
    // Update OTP state to 6 digits
    const [otp, setOtp] = useState<[string, string, string, string, string, string]>(['', '', '', '', '', '']);
    const inputsRef = useRef<Array<TextInput | null>>([]);
    const [otpError, setOtpError] = useState<string | null>(null);
    const [submitted, setSubmitted] = useState(false);
    const [resendClicked, setResendClicked] = useState(false);
    const [resendLoading, setResendLoading] = useState(false);

    const handleNextPress = () => {
        const isOtpValid = otp.every(digit => /^\d$/.test(digit)) && otp.join('').length === 6;
        if (!isOtpValid) {
            setOtpError('Please enter a valid 6-digit code.');
            return;
        }
        setOtpError(null);
        setSubmitted(true);
    };


    const handleTextChange = (text: string, index: number) => {
        if (text === '' || /^\d$/.test(text)) {
            const newOtp = [...otp] as [string, string, string, string, string, string];
            newOtp[index] = text;
            setOtp(newOtp);
            if (text && index < otp.length - 1) {
                inputsRef.current[index + 1]?.focus();
            } else if (text && index === otp.length - 1) {
                Keyboard.dismiss();
            }
        }
    };
    React.useEffect(() => {
        if (count === 0) return;

        const timer = setInterval(() => {
            setCount(prev => {
                if (prev <= 1) {
                    clearInterval(timer);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [count]);




    return (
        <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.light }]}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.mainContainer}>
                    <View style={styles.logoContainer}>
                        <ICONS.Logo height={height * 0.09} />
                    </View>
                    <View>
                        <ICONS.OTPImage height={height * 0.17} />
                    </View>
                    <View style={styles.smsTextContainer}>
                        <Text style={[styles.smsText, { color: theme.tertiary }]}>WHAT’S THE CODE?</Text>
                    </View>
                    <View style={styles.codeTextContainer}>
                        <Text style={[styles.codeText, { color: theme.tertiary }]}>Enter the 6-digit code sent on </Text>
                        <Text style={[styles.codeText, { color: theme.secondary }]}>{'email'}</Text>
                    </View>
                    <View style={styles.codeContainer}>
                        {otp.map((value, index) => (
                            <View
                                key={index}
                                style={[
                                    styles.codeBoxContainer,
                                    {
                                        borderColor: theme.tertiary,
                                        backgroundColor: theme.light,
                                    }
                                ]}
                            >
                                <TextInput
                                    ref={(ref) => { inputsRef.current[index] = ref }}
                                    style={[styles.codeDigitText, { color: theme.secondary }]}
                                    placeholder='-'
                                    placeholderTextColor={theme.secondary}
                                    keyboardType='numeric'
                                    maxLength={1}
                                    value={value}
                                    onChangeText={(text) => handleTextChange(text, index)}
                                    returnKeyType='next'
                                    onKeyPress={({ nativeEvent }) => {
                                        if (nativeEvent.key === 'Backspace') {
                                            const newOtp = [...otp] as [string, string, string, string, string, string];
                                            if (!otp[index] && index > 0) {
                                                newOtp[index - 1] = '';
                                                setOtp(newOtp);
                                                inputsRef.current[index - 1]?.focus();
                                            } else {
                                                newOtp[index] = '';
                                                setOtp(newOtp);
                                            }
                                        }
                                    }}
                                />
                            </View>
                        ))}
                    </View>
                    {otpError ? (
                        <Text style={{ color: 'red', fontSize: 13, textAlign: 'center', marginTop: 8 }}>
                            {otpError}
                        </Text>
                    ) : null}
                    {/* {authError ? (
                        <Text style={{ color: 'red', fontSize: 13, textAlign: 'center', marginTop: 4 }}>
                            {authError}
                        </Text>
                    ) : null} */}
                    <View style={styles.btnContainer}>
                        <MyButton
                            text={'Next'}
                            // loading={authLoading}
                            // disabled={authLoading}
                            onPress={handleNextPress}
                            color={theme.light}
                            backgroundColor={theme.secondary}
                        />
                    </View>
                    <View style={styles.resentTextContainer}>
                        <Text style={[styles.resentText, { color: theme.tertiary }]}>Code not received? </Text>
                        {
                            count > 0 ? (
                                <Text style={[styles.resentText, { color: theme.tertiary }]}>Resent again in {count} seconds</Text>
                            ) : (
                                <TouchableOpacity 
                                // onPress={handleResendCode} 
                                disabled={resendLoading}>
                                    {
                                        resendLoading ? (
                                            <ActivityIndicator size='small' color={theme.secondary} />
                                        ) : (
                                            <Text style={[styles.resentText, { color: theme.secondary }]}>
                                                Resend Code
                                            </Text>
                                        )
                                    }
                                </TouchableOpacity>
                            )
                        }
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default OTPScreen;

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        padding: 20,
    },
    mainContainer: {
        alignItems: 'center',
    },
    logoContainer: {
        paddingTop: 20,
        paddingBottom: 30,
    },
    smsTextContainer: {
        marginTop: height * 0.04,
    },
    smsText: {
        fontWeight: '800',
        fontSize: 20,
        lineHeight: 20,
    },
    codeTextContainer: {
        flexDirection: 'row',
        marginTop: height * 0.01,
        flexWrap: 'wrap',
        justifyContent: 'center',
    },
    codeText: {
        fontWeight: '400',
        fontSize: 13,
        textAlign: 'center',
    },
    codeContainer: {
        flexDirection: 'row',
        marginTop: height * 0.03,
    },
    codeBoxContainer: {
        width: 42,
        height: 42,
        margin: 5,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 6,
        borderWidth: 0.6,
    },
    codeDigitText: {
        fontWeight: '400',
        fontSize: 20,
    },
    btnContainer: {
        width: '90%',
        marginTop: height * 0.08,
    },
    resentTextContainer: {
        marginTop: height * 0.01,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        flexWrap: 'wrap',
    },
    resentText: {
        fontWeight: '400',
        fontSize: 13,
    },
});