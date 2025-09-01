import { StyleSheet, Text, View, TouchableOpacity, ActivityIndicator } from 'react-native'
import React from 'react'
import { lightTheme, darkTheme } from '../constants/theme';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';

type MyButtonProps = {
    text: string;
    onPress: () => void;
    backgroundColor: string;
    color: string;
    isborder?: boolean;
    disabled?: boolean;
    loading?: boolean;
};

const MyButton: React.FC<MyButtonProps> = ({text, onPress, backgroundColor, color, isborder, disabled, loading}) => {
    const mode = useSelector((state: RootState) => state.theme.mode);
    const theme = mode === 'light' ? lightTheme : darkTheme;
    return (
        <View>
            <TouchableOpacity
                disabled={disabled}
                onPress={onPress}
                style={[
                    styles.signInBtnContainer,
                    { backgroundColor },
                    isborder && { borderWidth: 1, borderColor: theme.tertiary }
                ]}
            >
                {
                    loading ? (
                        <ActivityIndicator size='small' color={color} />
                    ) : (
                        <Text style={[styles.signInText, { color }]}>{text}</Text>
                    )
                }
            </TouchableOpacity>
        </View>
    )
}

export default MyButton;

const styles = StyleSheet.create({
    signInBtnContainer: {
        width: '100%',
        paddingVertical: 12,
        borderRadius: 13,
    },
    signInText: {
        fontWeight: '600',
        fontSize: 18,
        letterSpacing: 0,
        textAlign: 'center',
        textTransform: 'uppercase',
    },
});
