import React from 'react';
import { View, Text, Modal, TouchableOpacity, StyleSheet } from 'react-native';
import { ICONS } from '../constants/icons';
import { lightTheme, darkTheme } from '../constants/theme';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';

type DeleteModalProps = {
    isVisible: boolean;
    onClose: () => void;
    onDelete: () => void;
    message?: string;
    btnTitle?: string;
};

const DeleteModal: React.FC<DeleteModalProps> = ({ isVisible, onClose, onDelete, message, btnTitle }) => {
    const mode = useSelector((state: RootState) => state.theme.mode);
    const theme = mode === 'light' ? lightTheme : darkTheme;

    return (
        <Modal
            visible={isVisible}
            transparent={true}
            animationType="fade"
            onRequestClose={onClose}
        >
            <View style={[styles.modalOverlay, { backgroundColor: theme.modalOverlay }]}>
                <View style={[styles.modalContainer, { backgroundColor: theme.light }]}>
                    <View style={styles.modalHeader}>
                        <Text style={[styles.modalTitle, { color: theme.secondary }]}>Are You Sure?</Text>
                        <TouchableOpacity onPress={onClose}>
                            <ICONS.DeleteModalIcon />
                        </TouchableOpacity>
                    </View>

                    <Text style={[styles.modalMessage, { color: theme.tertiary }]}>
                        {message || 'Are you sure you want to delete this item? This action cannot be undone.'}
                    </Text>

                    <View style={styles.modalActions}>
                        <TouchableOpacity
                            style={[
                                styles.modalButton,
                                styles.cancelButton,
                                { borderColor: theme.tertiary, backgroundColor: theme.light }
                            ]}
                            onPress={onClose}
                        >
                            <Text style={[styles.modalButtonText, { color: theme.secondary }]}>Cancel</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[
                                styles.modalButton,
                                { backgroundColor: theme.secondary }
                            ]}
                            onPress={onDelete}
                        >
                            <Text style={[styles.modalButtonText, { color: theme.light }]}>{btnTitle || 'Delete'}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

export default DeleteModal;

const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContainer: {
        padding: 20,
        borderRadius: 20,
        width: '90%',
        alignItems: 'center',
    },
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        alignItems: 'center',
    },
    modalTitle: {
        fontSize: 22,
        textAlign: 'center',
        flex: 1,
    },
    modalMessage: {
        fontSize: 14,
        marginVertical: 10,
        textAlign: 'center',
        marginBottom: 20,
    },
    modalActions: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginBottom: 5,
    },
    modalButton: {
        paddingVertical: 10,
        borderRadius: 10,
        width: '48%',
    },
    cancelButton: {
        borderWidth: 1,
    },
    modalButtonText: {
        fontSize: 16,
        textAlign: 'center',
        fontWeight: '500',
    },
});

