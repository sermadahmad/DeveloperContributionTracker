import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { lightTheme, darkTheme } from '../constants/theme';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';

type ProfileLinkRowProps = {
  iconName: string;
  text: string;
  onPress?: () => void;
};

const ProfileLinkRow: React.FC<ProfileLinkRowProps> = ({ iconName, text, onPress }) => {
  const mode = useSelector((state: RootState) => state.theme.mode);
  const theme = mode === 'light' ? lightTheme : darkTheme;

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={onPress ? 0.7 : 1}
      style={styles.row}
    >
      <Icon name={iconName} size={24} color={theme.secondary} style={styles.icon} />
      <Text
        style={[
          styles.text,
          { color: theme.primary },
          onPress && styles.underline,
        ]}
      >
        {text}
      </Text>
    </TouchableOpacity>
  );
};

export default ProfileLinkRow;

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    alignSelf: 'flex-start',
  },
  icon: {
    marginTop: 10,
  },
  text: {
    fontSize: 14,
    marginLeft: 10,
    marginTop: 10,
  },
  underline: {
    textDecorationLine: 'underline',
  },
});
