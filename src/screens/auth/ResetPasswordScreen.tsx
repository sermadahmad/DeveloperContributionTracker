import { StyleSheet, Text, View, TextInput, TouchableOpacity, Dimensions, ScrollView, Keyboard, ActivityIndicator } from 'react-native';
import React, { useState, useRef } from 'react';
import { ICONS } from '../../constants/icons';
import { SafeAreaView } from 'react-native-safe-area-context'
import MyButton from '../../components/MyButton';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StackNavigationParamList } from '../../navigation/types';
import Icon from 'react-native-vector-icons/Ionicons';
import { lightTheme, darkTheme } from '../../constants/theme';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../../redux/store';

const { height } = Dimensions.get('window');

type ResetPasswordScreenProps = NativeStackScreenProps<StackNavigationParamList, 'ResetPasswordScreen'>;

const ResetPasswordScreen: React.FC<ResetPasswordScreenProps> = ({ navigation, route }) => {
    const email = route.params?.email ?? "";
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isSecurePassword, setIsSecurePassword] = useState(true);
    const [isSecureConfirmPassword, setIsSecureConfirmPassword] = useState(true);
    const [otp, setOtp] = useState<[string, string, string, string, string, string]>(['', '', '', '', '', '']);
    const inputsRef = useRef<Array<TextInput | null>>([]);
    const mode = useSelector((state: RootState) => state.theme.mode);
    const theme = mode === 'light' ? lightTheme : darkTheme;
    const [count, setCount] = useState(60);
    const [resetLoading, setResetLoading] = useState(false);
    const [resendLoading, setResendLoading] = useState(false);
    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    const handleOtpChange = (text: string, index: number) => {
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

    const validate = () => {
        const newErrors: { [key: string]: string } = {};

        // Password validations
        if (!password) {
            newErrors.password = "Password is required.";
        } else if (password.length < 8) {
            newErrors.password = "Password must be at least 8 characters.";
        } else if (
            !/(?=.*[a-z])/.test(password) ||
            !/(?=.*[A-Z])/.test(password) ||
            !/(?=.*\d)/.test(password) ||
            !/(?=.*[!@#$%^&*(),.?":{}|<>])/.test(password)
        ) {
            newErrors.password = "Password must contain lowercase, uppercase letters, digits, and a special character.";
        }

        // Confirm password
        if (!confirmPassword) {
            newErrors.confirmPassword = "Confirm password is required.";
        } else if (password !== confirmPassword) {
            newErrors.confirmPassword = "Passwords do not match.";
        }

        // OTP validations
        const isOtpValid = otp.every(digit => /^\d$/.test(digit)) && otp.join('').length === 6;
        if (!isOtpValid) {
            newErrors.otp = "Please enter a valid 6-digit OTP code.";
        }

        return newErrors;
    };


    const handleResetPassword = () => {
        const validationErrors = validate();
        setErrors(validationErrors);
        if (Object.keys(validationErrors).length === 0) {
        }
    };

    return (
        <SafeAreaView style={{ flex: 1, padding: 20, backgroundColor: theme.light }}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.mainContainer}>
                    <View style={styles.logoContainer}>
                        <ICONS.Logo height={height * 0.09} />
                    </View>
                    <View style={styles.inputsContainer}>
                        <View style={styles.headingContainer}>
                            <Text style={[styles.subHeading, { color: theme.tertiary }]}>RESET PASSWORD</Text>
                        </View>
                        <Text style={[styles.phoneText, { color: theme.secondary }]}>
                            email
                        </Text>
                        <View style={[styles.phoneTextInput, { borderColor: theme.primary }]}>
                            <TextInput
                                placeholder='example@gmail.com'
                                style={[styles.textInput, { color: theme.tertiary }]}
                                placeholderTextColor={theme.tertiary}
                                keyboardType='email-address'
                                value={email}
                                editable={false}
                            />
                        </View>
                        <Text style={[styles.phoneText, { color: theme.secondary }]}>enter new password</Text>
                        <View style={[styles.phoneTextInput, { borderColor: theme.tertiary }]}>
                            <View style={styles.passwordContainer}>
                                <TextInput
                                    placeholder='********'
                                    style={[styles.textInput, { color: theme.tertiary }]}
                                    placeholderTextColor={theme.tertiary}
                                    secureTextEntry={isSecurePassword}
                                    value={password}
                                    onChangeText={setPassword}
                                />
                                <TouchableOpacity onPress={() => {
                                    setIsSecurePassword(!isSecurePassword);
                                }}>
                                    <Icon name={isSecurePassword ? 'eye-off' : 'eye'} size={25} color={theme.tertiary} />
                                </TouchableOpacity>
                            </View>
                        </View>
                        {errors.password ? (
                            <Text style={{ color: 'red', fontSize: 12 }}>{errors.password}</Text>
                        ) : null}
                        <Text style={[styles.phoneText, { color: theme.secondary }]}>confirm password</Text>
                        <View style={[styles.phoneTextInput, { borderColor: theme.tertiary }]}>
                            <View style={styles.passwordContainer}>
                                <TextInput
                                    placeholder='********'
                                    style={[styles.textInput, { color: theme.tertiary }]}
                                    placeholderTextColor={theme.tertiary}
                                    secureTextEntry={isSecureConfirmPassword}
                                    value={confirmPassword}
                                    onChangeText={setConfirmPassword}
                                />
                                <TouchableOpacity onPress={() => {
                                    setIsSecureConfirmPassword(!isSecureConfirmPassword);
                                }}>
                                    <Icon name={isSecureConfirmPassword ? 'eye-off' : 'eye'} size={25} color={theme.tertiary} />
                                </TouchableOpacity>
                            </View>
                        </View>
                        {errors.confirmPassword ? (
                            <Text style={{ color: 'red', fontSize: 12 }}>{errors.confirmPassword}</Text>
                        ) : null}
                        <Text style={[styles.phoneText, { color: theme.secondary }]}>Enter OTP Code</Text>
                        <View style={[styles.codeContainer]}>
                            {otp.map((value, index) => (
                                <View
                                    key={index}
                                    style={[
                                        styles.codeBoxContainer,
                                        {
                                            borderColor: theme.primary,
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
                                        onChangeText={(text) => handleOtpChange(text, index)}
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
                        {errors.otp ? (
                            <Text style={{ color: 'red', fontSize: 12, textAlign: 'center' }}>
                                {errors.otp}
                            </Text>
                        ) : null}

                    </View>
                    <View style={{ width: '90%', marginTop: height * 0.05 }}>
                        <MyButton
                            text={'RESET PASSWORD'}
                            loading={resetLoading}
                            backgroundColor={theme.secondary}
                            color={theme.light}
                            onPress={handleResetPassword}
                            disabled={resetLoading}
                        />
                        {/* {authError ? (
                            <Text style={{ color: 'red', fontSize: 12, textAlign: 'center', marginTop: 8 }}>
                                {authError}
                            </Text>
                        ) : null} */}
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
                                    {resendLoading ? (
                                        <ActivityIndicator size='small' color={theme.secondary} />
                                    ) : (
                                        <Text style={[styles.resentText, { color: theme.secondary }]}>Resend Code</Text>
                                    )}
                                </TouchableOpacity>
                            )
                        }
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
};

export default ResetPasswordScreen;

const styles = StyleSheet.create({
    btnforgotContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        width: '100%',
    },
    forgotPasswordText: {
        fontStyle: 'normal',
        fontSize: 12,
        letterSpacing: 0,
        textTransform: 'uppercase',
    },
    headingContainer: {
        alignItems: 'center',
        paddingBottom: height * 0.03,
    },
    mainContainer: {
        alignItems: 'center',
    },
    logoContainer: {
        paddingTop: 20,
        paddingBottom: 30,
    },
    loginHeading: {
        fontWeight: '400',
        fontStyle: 'normal',
        fontSize: 18,
        lineHeight: 18,
        letterSpacing: 0,
    },
    subHeading: {
        fontWeight: '800',
        fontStyle: 'normal',
        fontSize: 20,
        letterSpacing: 0,
    },
    inputsContainer: {
        width: '100%',
    },
    phoneText: {
        fontWeight: '400',
        fontStyle: 'normal',
        fontSize: 12,
        lineHeight: 12,
        letterSpacing: 0,
        textTransform: 'uppercase',
        marginTop: 10,
    },
    phoneTextInput: {
        borderRadius: 10,
        borderWidth: 1,
        height: 47,
        alignItems: 'center',
        paddingHorizontal: 10,
        flexDirection: 'row',
        marginTop: 5,
    },
    passwordContainer: {
        flexDirection: 'row',
        flex: 1,
        alignItems: 'center',
        height: '100%',
    },
    textInput: {
        fontWeight: '400',
        fontStyle: 'normal',
        fontSize: 15,
        lineHeight: 15,
        letterSpacing: 0,
        flex: 1,
        height: '100%',
    },
    codeContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    codeBoxContainer: {
        width: 45,
        height: 45,
        margin: 4,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 6,
        borderWidth: 0.6,
    },
    codeDigitText: {
        fontWeight: '400',
        fontSize: 22,
        textAlign: 'center',
    },
    resentTextContainer: {
        marginTop: 8,
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
