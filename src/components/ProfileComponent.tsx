import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { lightTheme, darkTheme } from '../constants/theme';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';

type ProfileComponentProps = {
  heading: string;
  subHeading: string;
};

const ProfileComponent: React.FC<ProfileComponentProps> = ({ heading, subHeading }) => {
  const mode = useSelector((state: RootState) => state.theme.mode);
  const theme = mode === 'light' ? lightTheme : darkTheme;

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: theme.light,
          shadowColor: theme.dark,
        },
      ]}
    >
      <Text style={[styles.heading, { color: theme.primary }]}>
        {heading}
      </Text>
      <Text numberOfLines={1} ellipsizeMode='tail' style={[styles.subHeading, { color: theme.tertiary }]}>
        {subHeading}
      </Text>
    </View>
  )
}

export default ProfileComponent;

const styles = StyleSheet.create({
  container: {
    width: '93%',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 10,
    elevation: 5,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    marginVertical: 6,
  },
  heading: {
    fontWeight: '500',
    fontSize: 20,
  },
  subHeading: {
    fontWeight: '400',
    fontSize: 16,
    marginTop: 5,
  },
});