import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons';
import DeleteModal from './DeleteModal';
import { lightTheme, darkTheme } from '../constants/theme';
import { useDispatch, useSelector } from 'react-redux';
import { deleteComparison } from '../redux/compareThunks';
import { RootState } from '../redux/store';
import { AppDispatch } from '../redux/store';

type ComparisonHistoryComponentProps = {
    user1: string;
    user2: string;
    date: string;
    time: string;
    navigation: any;
    comparisonId: number;
};

const ComparisonHistoryComponent: React.FC<ComparisonHistoryComponentProps> = ({ user1, user2, date, time, navigation, comparisonId }) => {
    const [modalVisible, setModalVisible] = React.useState(false);
    const dispatch = useDispatch<AppDispatch>();
    const mode = useSelector((state: RootState) => state.theme.mode);
    const theme = mode === 'light' ? lightTheme : darkTheme;
    const handleDelete = () => {
        dispatch(deleteComparison(comparisonId))
            .then(() => setModalVisible(false));
    };

    return (
        <>
            <TouchableOpacity
                style={[
                    styles.container,
                    {
                        backgroundColor: theme.light,
                        shadowColor: theme.dark,
                        borderColor: theme.secondary,
                    }
                ]}
                onPress={() => {
                    navigation.navigate('Compare', { comparisonId });
                }}
                onLongPress={() => setModalVisible(true)}
            >
                <View style={styles.row}>
                    <Text
                        style={[
                            styles.userText,
                            { width: '44%', minWidth: 0, color: theme.primary }
                        ]}
                        numberOfLines={1}
                        ellipsizeMode="tail"
                    >
                        {user1}
                    </Text>
                    <Ionicons name="swap-horizontal" size={26} color={theme.secondary} />
                    <Text
                        style={[
                            styles.userText,
                            { width: '44%', textAlign: 'right', color: theme.primary }
                        ]}
                        numberOfLines={1}
                        ellipsizeMode="tail"
                    >
                        {user2}
                    </Text>
                </View>
                <View style={styles.dateRow}>
                    <Text style={[styles.dateText, { color: theme.tertiary }]}>{date}</Text>
                    <Text style={[styles.dateText, { color: theme.tertiary }]}>{time}</Text>
                </View>
            </TouchableOpacity>
            <DeleteModal
                isVisible={modalVisible}
                onClose={() => setModalVisible(false)}
                onDelete={handleDelete}
                message="Are you sure you want to delete this comparison? This action cannot be undone."
            />
        </>
    )
}

export default ComparisonHistoryComponent;

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 10,
        marginHorizontal: 15,
        marginVertical: 5,
        borderRadius: 10,
        elevation: 5,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        borderWidth: 0.6,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: 10,
    },
    userText: {
        fontWeight: '500',
        fontSize: 16,
    },
    dateRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingBottom: 10,
    },
    dateText: {
        fontWeight: '400',
        fontSize: 12,
        marginTop: 5,
    },
});