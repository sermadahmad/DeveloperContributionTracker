import { StyleSheet, Text, View, Dimensions, TextInput, TouchableOpacity, ScrollView } from 'react-native'
import React, { useState, useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ICONS } from '../../constants/icons'
import MyButton from '../../components/MyButton';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StackNavigationParamList } from '../../navigation/types';
import Icon from 'react-native-vector-icons/Ionicons';
import { lightTheme, darkTheme } from '../../constants/theme';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../../redux/store';

const { width, height } = Dimensions.get('window');

type RegisterScreenProps = NativeStackScreenProps<StackNavigationParamList, 'RegisterScreen'>;

const RegisterScreen: React.FC<RegisterScreenProps> = ({ navigation }) => {
    const [isSecurePassword, setIsSecurePassword] = useState(true);
    const [isSecureConfirmPassword, setIsSecureConfirmPassword] = useState(true);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const mode = useSelector((state: RootState) => state.theme.mode);
    const theme = mode === 'light' ? lightTheme : darkTheme;

    const validate = () => {
        const newErrors: { [key: string]: string } = {};
        if (!firstName.trim()) newErrors.firstName = "First name is required.";
        if (!lastName.trim()) newErrors.lastName = "Last name is required.";
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
            !/(?=.*[!@#$%^&*(),.?":{}|<>])/ .test(password)
        ) {
            newErrors.password = "Password must contain lowercase, uppercase letters, digits, and a special character.";
        }
        if (!confirmPassword) {
            newErrors.confirmPassword = "Confirm password is required.";
        } else if (password !== confirmPassword) {
            newErrors.confirmPassword = "Passwords do not match.";
        }
        return newErrors;
    };

    const handleSignUp = () => {
        const validationErrors = validate();
        setErrors(validationErrors);
        if (Object.keys(validationErrors).length === 0) {
        }
    };

    return (
        <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.light }]}>
            <ScrollView showsVerticalScrollIndicator={false} >
                <View style={styles.mainContainer}>
                    <View style={styles.logoContainer}>
                        <ICONS.Logo height={height * 0.09} />
                    </View>
                    <View style={styles.setupTextContainer}>
                        <Text style={[styles.setupText, { color: theme.tertiary }]}>SETUP YOUR Account</Text>
                    </View>
                    <View style={styles.inputsContainer}>
                        <Text style={[styles.phoneText, { color: theme.secondary }]}>
                            First Name
                        </Text>
                        <View style={[styles.phoneTextInput, { borderColor: theme.primary }]}>
                            <TextInput
                                placeholder='Enter your first name'
                                style={[styles.textInput, { color: theme.tertiary }]}
                                placeholderTextColor={theme.tertiary}
                                value={firstName}
                                onChangeText={setFirstName}
                            />
                        </View>
                        {errors.firstName ? (
                            <Text style={{ color: 'red', fontSize: 12 }}>{errors.firstName}</Text>
                        ) : null}
                        <Text style={[styles.phoneText, { color: theme.secondary }]}>
                            Last name
                        </Text>
                        <View style={[styles.phoneTextInput, { borderColor: theme.primary }]}>
                            <TextInput
                                placeholder='Enter your last name'
                                style={[styles.textInput, { color: theme.tertiary }]}
                                placeholderTextColor={theme.tertiary}
                                value={lastName}
                                onChangeText={setLastName}
                            />
                        </View>
                        {errors.lastName ? (
                            <Text style={{ color: 'red', fontSize: 12 }}>{errors.lastName}</Text>
                        ) : null}
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
                                onChangeText={setEmail}
                            />
                        </View>
                        {errors.email ? (
                            <Text style={{ color: 'red', fontSize: 12 }}>{errors.email}</Text>
                        ) : null}
                        <Text style={[styles.phoneText, { color: theme.secondary }]}>password</Text>
                        <View style={[styles.phoneTextInput, { borderColor: theme.primary }]}>
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
                        <View style={[styles.phoneTextInput, { borderColor: theme.primary }]}>
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
                    </View>
                    <View style={styles.btnContainer}>
                        <MyButton
                            text={'Sign Up'}
                            // loading={authLoading}
                            // disabled={authLoading}
                            color={theme.light}
                            backgroundColor={theme.secondary}
                            onPress={handleSignUp}
                        />
                    </View>
                    {/* {authError ? (
                        <Text style={{ color: 'red', fontSize: 12, textAlign: 'center', padding: 10  }}>{authError}</Text>
                    ) : null} */}
                    <View style={styles.alreadyTextContainer}>
                        <Text style={[styles.alreadyText, { color: theme.tertiary }]}>Already have an account?</Text>
                    </View>
                    <View style={styles.loginTextContainer}>
                        <TouchableOpacity onPress={() => {
                            navigation.replace('LoginScreen')
                        }}>
                            <Text style={[styles.loginText, { color: theme.secondary }]}>Login</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default RegisterScreen;

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
    setupTextContainer: {
        marginTop: height * 0.001,
    },
    setupText: {
        fontWeight: '800',
        fontSize: 20,
        textAlign: 'center',
        textTransform: 'uppercase',
    },
    inputsContainer: {
        width: '100%',
        marginTop: height * 0.03,
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
        flex: 1,
        height: '100%',
    },
    btnContainer: {
        width: '90%',
        marginTop: height * 0.01,
    },
    alreadyTextContainer: {
        marginTop: height * 0.08,
    },
    alreadyText: {
        fontWeight: '400',
        fontSize: 16,
        textAlign: 'center',
        padding: 1,
    },
    loginTextContainer: {
        flexDirection: 'row',
    },
    loginText: {
        fontWeight: '400',
        fontSize: 16,
        textTransform: 'uppercase',
        textAlign: 'center',
        padding: 1,
    },
});