import { StyleSheet, Text, View, Dimensions, useWindowDimensions, ScrollView } from 'react-native'
import React, { useMemo } from 'react'
import { ICONS } from '../constants/icons'
import { SafeAreaView } from 'react-native-safe-area-context'
import MyButton from '../components/MyButton';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StackNavigationParamList } from '../navigation/types';
import { lightTheme, darkTheme } from '../constants/theme';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';

const { width, height } = Dimensions.get('window');

type OnBoardingScreenProps = NativeStackScreenProps<StackNavigationParamList, 'OnBoardingScreen'>;

const OnBoardingScreen: React.FC<OnBoardingScreenProps> = ({ navigation }) => {
  const { width: rWidth, height: rHeight } = useWindowDimensions();
  const mode = useSelector((state: RootState) => state.theme.mode);
  const theme = mode === 'light' ? lightTheme : darkTheme;

  const backgroundDimensions = useMemo(() => ({
    width: rWidth,
    height: rHeight,
  }), [rWidth, rHeight]);

  return (
    <SafeAreaView style={{ flex: 1, padding: 20, backgroundColor: theme.light }}>
      <View style={{ position: 'absolute', top: 0, left: 0, width: rWidth, height: rHeight, backgroundColor: theme.light }}>
        <ICONS.OBSBackground {...backgroundDimensions} />
      </View>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={styles.container}>
          <View style={styles.logoContainer}>
            <ICONS.Logo height={height * 0.09} />
            <Text style={[styles.heading, { color: theme.primary }]}>Developer Contribution Tracker</Text>
          </View>
          <View style={{ alignItems: 'center' }}>
            <View>
              <ICONS.OBSImage height={height * 0.20} width={width * 0.7} />
            </View>
            <View style={styles.debtTextContainer}>
              <Text style={[styles.debtText, { color: theme.primary }]}>Compare GitHub Journeys</Text>
            </View>
            <View style={styles.subTextContainer}>
              <Text style={[styles.subText, { color: theme.tertiary }]}>
                See how two developers stack up — visually track commits, contributions, and growth side by side.
              </Text>
            </View>
          </View>
          <View style={styles.btnContainer}>
            <MyButton
              text='GET STARTED'
              onPress={() => {
                navigation.replace('RegisterScreen');
              }}
              color={theme.light}
              backgroundColor={theme.secondary}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default OnBoardingScreen;

const styles = StyleSheet.create({
  btnContainer: {
    width: '90%',
  },
  debtTextContainer: {
    marginTop: height * 0.035,
  },
  subTextContainer: {
    marginTop: height * 0.01,
    width: width * 0.8,
  },
  heading: {
    fontWeight: '700',
    fontStyle: 'normal',
    fontSize: 22,
    letterSpacing: 0,
  },
  debtText: {
    fontWeight: '700',
    fontStyle: 'normal',
    fontSize: 16,
    letterSpacing: 0,
  },
  subText: {
    fontWeight: '400',
    fontStyle: 'normal',
    fontSize: 14,
    letterSpacing: 0,
    textAlign: 'center',
    padding: 1,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: height * 0.01,
  },
});