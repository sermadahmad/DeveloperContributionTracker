import { StyleSheet, Text, View, TextInput, Dimensions, ScrollView } from 'react-native';
import React, { useState, useEffect } from 'react';
import { ICONS } from '../../constants/icons';
import { SafeAreaView } from 'react-native-safe-area-context'
import MyButton from '../../components/MyButton';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StackNavigationParamList } from '../../navigation/types';
import { lightTheme, darkTheme } from '../../constants/theme';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../../redux/store';

const { height } = Dimensions.get('window');

type ForgotPasswordScreenProps = NativeStackScreenProps<StackNavigationParamList, 'ForgotPasswordScreen'>;

const ForgotPasswordScreen: React.FC<ForgotPasswordScreenProps> = ({ navigation }) => {
    const [email, setEmail] = useState("");
    const [error, setError] = useState<string | null>(null);
    const mode = useSelector((state: RootState) => state.theme.mode);
    const theme = mode === 'light' ? lightTheme : darkTheme;


    const handleForgotPassword = () => {
        if (!email.trim()) {
            setError("Email is required.");
            return;
        } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email.trim())
        ) {
            setError("Enter a valid email address.");
            return;
        }
        setError(null);
    }


    return (
        <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.light }]}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.mainContainer}>
                    <View style={styles.logoContainer}>
                        <ICONS.Logo height={height * 0.09} />
                    </View>
                    <View style={styles.headingContainer}>
                        <Text style={[styles.subHeading, { color: theme.tertiary }]}>FORGOT PASSWORD</Text>
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
                            {error ? (
                                <Text style={{ color: 'red', fontSize: 12 }}>{error}</Text>
                            ) : null}
                        </View>
                    </View>
                    <View style={styles.buttonContainer}>
                        <MyButton
                            text={'CONTINUE'}
                            // loading={authLoading}
                            backgroundColor={theme.secondary}
                            color={theme.light}
                            onPress={handleForgotPassword}
                            // disabled={authLoading}
                        />
                        {/* {authError ? ( */}
                            {/* <Text style={{ color: 'red', fontSize: 12, textAlign: 'center', marginTop: 8 }}> */}
                                {/* {authError} */}
                            {/* </Text> */}
                        {/* ) : null} */}
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
};

export default ForgotPasswordScreen;

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
        marginTop: height * 0.2,
    },
    subHeading: {
        fontWeight: '800',
        fontSize: 20,
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
    textInput: {
        fontWeight: '400',
        fontSize: 15,
        lineHeight: 15,
        flex: 1,
        height: '100%',
    },
    buttonContainer: {
        width: '90%',
        marginTop: height * 0.02,
    },
});
