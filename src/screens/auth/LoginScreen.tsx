import { StyleSheet, Text, View, TextInput, TouchableOpacity, Dimensions, ScrollView } from 'react-native';
import React, { useState, useEffect } from 'react';
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

type LoginScreenProps = NativeStackScreenProps<StackNavigationParamList, 'LoginScreen'>;

const LoginScreen: React.FC<LoginScreenProps> = ({ navigation }) => {
    const [isSecure, setIsSecure] = useState(true);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const mode = useSelector((state: RootState) => state.theme.mode);
    const theme = mode === 'light' ? lightTheme : darkTheme;
    const dispatch = useDispatch<AppDispatch>();

    const validate = () => {
        const newErrors: { [key: string]: string } = {};
        if (!email.trim()) {
            newErrors.email = "Email is required.";
        } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email.trim())
        ) {
            newErrors.email = "Enter a valid email address.";
        }
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
        return newErrors;
    };

    const handleSignIn = () => {
        const validationErrors = validate();
        setErrors(validationErrors);
        if (Object.keys(validationErrors).length === 0) {
        }
    }

    useEffect(() => {
        setEmail('');
        setPassword('');
        setErrors({});
        setIsSecure(true);
    }, [dispatch]);


    return (
        <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.light }]}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.mainContainer}>
                    <View style={styles.logoContainer}>
                        <ICONS.Logo height={height * 0.09} />
                    </View>
                    <View style={styles.headingContainer}>
                        <Text style={[styles.loginHeading, { color: theme.tertiary }]}>LOGIN INTO YOUR</Text>
                        <Text style={[styles.subHeading, { color: theme.tertiary }]}>Developer Insights</Text>
                    </View>
                    <View style={styles.inputsContainer}>
                        <View>
                            <Text style={[styles.phoneText, { color: theme.secondary }]}>
                                Enter Your Email
                            </Text>
                            <View style={[styles.phoneTextInput, { borderColor: theme.tertiary }]}>
                                <TextInput
                                    placeholder='example@gmail.com'
                                    style={[styles.textInput, { color: theme.tertiary }]}
                                    placeholderTextColor={theme.tertiary}
                                    keyboardType="email-address"
                                    value={email}
                                    onChangeText={setEmail}
                                />
                            </View>
                            {errors.email ? (
                                <Text style={{ color: 'red', fontSize: 12 }}>{errors.email}</Text>
                            ) : null}
                        </View>
                        <Text style={[styles.phoneText, { color: theme.secondary }]}>enter your password</Text>
                        <View style={[styles.phoneTextInput, { borderColor: theme.tertiary }]}>
                            <View style={styles.passwordContainer}>
                                <TextInput
                                    placeholder='********'
                                    style={[styles.textInput, { color: theme.tertiary }]}
                                    placeholderTextColor={theme.tertiary}
                                    secureTextEntry={isSecure}
                                    value={password}
                                    onChangeText={setPassword}
                                />
                                <TouchableOpacity onPress={() => {
                                    setIsSecure(!isSecure);
                                }}>
                                    <Icon name={isSecure ? 'eye-off' : 'eye'} size={25} color={theme.tertiary} />
                                </TouchableOpacity>
                            </View>
                        </View>
                        {errors.password ? (
                            <Text style={{ color: 'red', fontSize: 12 }}>{errors.password}</Text>
                        ) : null}
                    </View>
                    {/* {authError === 'Incorrect password.' && (
                        <TouchableOpacity
                            style={styles.btnforgotContainer}
                            onPress={() => {
                                if (!authLoading) {
                                    navigation.navigate('ForgotPasswordScreen');
                                }
                            }}
                        >
                            <Text style={[styles.forgotPasswordText, { color: theme.secondary }]}>FORGOT PASSWORD?</Text>
                        </TouchableOpacity>
                    )} */}
                    <View style={styles.buttonContainer}>
                        <MyButton
                            text={'SIGN IN'}
                            // loading={authLoading}
                            // disabled={authLoading}
                            backgroundColor={theme.secondary}
                            color={theme.light}
                            onPress={handleSignIn}
                        />
                        <MyButton
                            text={'SIGN UP'}
                            backgroundColor={theme.light}
                            color={theme.secondary}
                            onPress={() => {
                                    navigation.navigate('RegisterScreen')
                            }}
                            isborder={true}
                        />
                        {/* {authError === 'Email not confirmed.' && (
                            <TouchableOpacity
                                style={[styles.btnforgotContainer, { alignSelf: 'center', marginTop: -10 }]}
                                onPress={() => {
                                    if (!authLoading) {
                                        navigation.navigate('OTPScreen');
                                    }
                                }}
                            >
                                <Text style={[styles.forgotPasswordText, { color: theme.secondary }]}>Verify Email?</Text>
                            </TouchableOpacity>
                        )} */}
                    </View>
                    {/* {authError ? (
                        <Text style={{ color: 'red', fontSize: 13, textAlign: 'center', marginTop: 8 }}>
                            {authError}
                        </Text>
                    ) : null} */}
                </View>
            </ScrollView>
        </SafeAreaView>
    )
};

export default LoginScreen;

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
    headingContainer: {
        alignItems: 'center',
        gap: 8,
    },
    loginHeading: {
        fontWeight: '400',
        fontSize: 18,
        lineHeight: 18,
    },
    subHeading: {
        fontWeight: '800',
        fontSize: 20,
    },
    inputsContainer: {
        width: '100%',
        marginTop: 70,
    },
    phoneText: {
        fontWeight: '400',
        fontSize: 12,
        lineHeight: 12,
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
        fontSize: 15,
        lineHeight: 15,
        flex: 1,
        height: '100%',
    },
    btnforgotContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        alignSelf: 'flex-end',
    },
    forgotPasswordText: {
        fontSize: 12,
        textTransform: 'uppercase',
        marginTop: 5,
    },
    buttonContainer: {
        width: '90%',
        marginTop: 50,
        gap: 10,
    },
});
