import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { lightTheme, darkTheme } from '../../constants/theme';
import { ICONS } from '../../constants/icons';
import { Dimensions } from 'react-native';
import ProfileComponent from '../../components/ProfileComponent';
import MyButton from '../../components/MyButton';
import DeleteModal from '../../components/DeleteModal';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { BottomTabParamList } from '../../navigation/types';
import { useDispatch, useSelector } from 'react-redux';
import { toggleTheme } from '../../redux/themeSlice';
import { RootState, AppDispatch } from '../../redux/store';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StackNavigationParamList } from '../../navigation/types';

type Props = BottomTabScreenProps<BottomTabParamList, 'Profile'>;

const { height } = Dimensions.get('window');

const ProfileScreen: React.FC<Props> = ({ navigation }) => {
  const [modalVisible, setModalVisible] = React.useState(false);
  const [modalType, setModalType] = React.useState<'logout' | 'delete' | null>(null);
  const dispatch = useDispatch<AppDispatch>();
  const mode = useSelector((state: RootState) => state.theme.mode);
  const theme = mode === 'light' ? lightTheme : darkTheme;
  const { firstName, lastName, email, authError } = { "authError": null, "email": "", "firstName": "John", "lastName": "Doe" };

  const stackNavigation = useNavigation<NativeStackNavigationProp<StackNavigationParamList>>();

  const handleModalAction = () => {
    setModalVisible(false);
    if (modalType === 'logout') {
      stackNavigation.replace('LoginScreen');
    } else if (modalType === 'delete') {
    }
  };


  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.light }]}>

      <ScrollView style={{ flex: 1, backgroundColor: theme.light }} showsVerticalScrollIndicator={false}>
        <View style={styles.mainContainer}>
          <View style={styles.logoContainer}>
            <ICONS.Logo height={height * 0.09} />
          </View>
          <View style={styles.spacer} />
          <ProfileComponent heading={'First Name'} subHeading={firstName ?? ''} />
          <ProfileComponent heading={'Last Name'} subHeading={lastName ?? ''} />
          <ProfileComponent heading={'Email'} subHeading={email ?? ''} />
          <TouchableOpacity
            style={[
              styles.toggleContainer,
              {
                backgroundColor: theme.light,
                shadowColor: theme.dark,
              },
            ]}
            onPress={() => dispatch(toggleTheme())}
          >
            <Text style={[styles.toggleText, { color: theme.primary }]}>Dark Mode</Text>
            <View>
              {mode === 'dark' ? <ICONS.ToggleOn /> : <ICONS.ToggleOff />}
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.toggleContainer,
              {
                backgroundColor: theme.light,
                shadowColor: theme.dark,
              },
            ]}
            onPress={() => {
              navigation.navigate('Comparisons');
            }}>
            <Text style={[styles.toggleText, { color: theme.primary }]}>Comparisons History</Text>
            <ICONS.DropDown color={theme.secondary} />
          </TouchableOpacity>
          <View style={styles.buttonGroup}>
            <MyButton
              text={'LOGOUT'}
              onPress={() => {
                setModalType('logout');
                setModalVisible(true);
              }}
              color={theme.secondary}
              backgroundColor={theme.light}
              isborder={true}
            />
            <MyButton
              text={'Delete Account'}
              onPress={() => {
                setModalType('delete');
                setModalVisible(true);
              }}
              color={theme.light}
              backgroundColor={theme.secondary}
            />
          </View>
          {authError ? (
            <Text style={{ color: 'red', fontSize: 13, textAlign: 'center' }}>
              {authError}
            </Text>
          ) : null}
        </View>
      </ScrollView>
      <DeleteModal
        isVisible={modalVisible}
        onClose={() => setModalVisible(false)}
        onDelete={handleModalAction}
        message={
          modalType === 'logout'
            ? 'Do you really want to log out?'
            : 'Deleting your account will permanently erase all your data. If you wish to keep your data, you can log out instead. This action cannot be undone.'
        }
        btnTitle={modalType === 'logout' ? 'Logout' : 'Delete Account'}
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  mainContainer: {
    alignItems: 'center',
    paddingBottom: 10,
  },
  logoContainer: {
    paddingTop: 20,
    paddingBottom: 30,
  },
  spacer: {
    height: height * 0.03,
  },
  toggleContainer: {
    width: '93%',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 10,
    elevation: 5,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    marginVertical: 6,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  toggleText: {
    fontWeight: '500',
    fontSize: 20,
  },
  buttonGroup: {
    width: '90%',
    marginTop: height * 0.06,
    gap: 10,
  },
});

export default ProfileScreen;