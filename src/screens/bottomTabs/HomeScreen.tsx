import React, { useCallback, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Dimensions,
  TextInput,
  Image,
  TouchableOpacity,
  Keyboard,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { debounce } from 'lodash';
import { lightTheme, darkTheme } from '../../constants/theme';
import { ICONS } from '../../constants/icons';
import MyButton from '../../components/MyButton';
import { RootState, AppDispatch } from '../../redux/store';
import { BottomTabParamList } from '../../navigation/types';

type Props = BottomTabScreenProps<BottomTabParamList, 'Home'>;

const { height } = Dimensions.get('window');
const itemHeight = 60;

const HomeScreen: React.FC<Props> = ({ navigation }) => {
  const mode = useSelector((state: RootState) => state.theme.mode);
  const theme = mode === 'light' ? lightTheme : darkTheme;

  const [user1, setUser1] = useState<{ username: string; avatar_url: string } | null>(null);
  const [query1, setQuery1] = useState('');
  const [results1, setResults1] = useState<any[]>([]);
  const [showDropdown1, setShowDropdown1] = useState(false);

  const [user2, setUser2] = useState<{ username: string; avatar_url: string } | null>(null);
  const [query2, setQuery2] = useState('');
  const [results2, setResults2] = useState<any[]>([]);
  const [showDropdown2, setShowDropdown2] = useState(false);

  const [compareError, setCompareError] = useState<string | null>(null);

  const dispatch = useDispatch<AppDispatch>();

  const debouncedSearch = useCallback(
    debounce((query: string, setResults: any, setShow: any) => {
      if (!query.trim()) return;
    }, 400),
    [dispatch]
  );

  const handleSelectUser1 = (user: any) => {
    setUser1(user);
    setQuery1(user.username);
    setShowDropdown1(false);
  };

  const handleSelectUser2 = (user: any) => {
    setUser2(user);
    setQuery2(user.username);
    setShowDropdown2(false);
  };

  const handleCompareNow = () => {
    Keyboard.dismiss();
    if (!user1) {
      setCompareError('Please select the first user.');
      return;
    }
    if (!user2) {
      setCompareError('Please select the second user.');
      return;
    }
    setCompareError(null);

    navigation.navigate('Compare', {
      userA: user1.username,
      userB: user2.username,
    });
  };

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.light }]}>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.mainContainer}>
          <View style={styles.logoContainer}>
            <ICONS.Logo height={height * 0.09} />
          </View>

          <Text style={[styles.introText, { color: theme.primary }]}>
            Track and compare GitHub contributions side by side.
          </Text>

          {/* First User */}
          <View style={styles.labelContainer}>
            <Text style={[styles.labelText, { marginTop: height * 0.1, color: theme.secondary }]}>
              First GitHub Username:
            </Text>
          </View>
          <View style={[styles.inputContainer, { borderColor: theme.primary }]}>
            <Image
              source={
                user1
                  ? { uri: user1.avatar_url }
                  : require('../../assets/images/github-light.png')
              }
              style={styles.avatar}
            />
            <TextInput
              placeholder="Search for a developer..."
              style={[styles.textInput, { color: theme.primary }]}
              placeholderTextColor={theme.tertiary}
              value={query1}
              onChangeText={(text) => {
                setQuery1(text);
                setUser1(null);
                debouncedSearch(text, setResults1, setShowDropdown1);
              }}
              returnKeyType="search"
            />
          </View>

          {showDropdown1 && (
            <View
              style={[
                styles.dropdownContainer,
                { borderColor: theme.primary, 
                  maxHeight: itemHeight * 6,
                  backgroundColor: theme.light
                 },
              ]}
            >
              {results1.length === 0 ? (
                <Text style={styles.noResultsText}>No user found</Text>
              ) : (
                results1.map((item) => (
                  <TouchableOpacity
                    key={item.username}
                    style={[styles.dropdownItem, { borderBottomColor: theme.primary }]}
                    onPress={() => handleSelectUser1(item)}
                  >
                    <Image source={{ uri: item.avatar_url }} style={styles.avatar} />
                    <Text style={[styles.dropdownText, { color: theme.primary }]}>{item.username}</Text>
                  </TouchableOpacity>
                ))
              )}
            </View>
          )}

          <View style={styles.labelContainer}>
            <Text style={[styles.labelText, { color: theme.secondary }]}>Second GitHub Username:</Text>
          </View>
          <View style={[styles.inputContainer, { borderColor: theme.primary }]}>
            <Image
              source={
                user2
                  ? { uri: user2.avatar_url }
                  : require('../../assets/images/github-light.png')
              }
              style={styles.avatar}
            />
            <TextInput
              placeholder="Search for a developer..."
              style={[styles.textInput, { color: theme.primary }]}
              placeholderTextColor={theme.tertiary}
              value={query2}
              onChangeText={(text) => {
                setQuery2(text);
                setUser2(null);
                debouncedSearch(text, setResults2, setShowDropdown2);
              }}
              returnKeyType="search"
            />
          </View>

          {showDropdown2 && (
            <View
              style={[
                styles.dropdownContainer,
                { borderColor: theme.primary, maxHeight: itemHeight * 6 },
              ]}
            >
              {results2.length === 0 ? (
                <Text style={styles.noResultsText}>No user found</Text>
              ) : (
                results2.map((item) => (
                  <TouchableOpacity
                    key={item.username}
                    style={[styles.dropdownItem, { borderBottomColor: theme.primary }]}
                    onPress={() => handleSelectUser2(item)}
                  >
                    <Image source={{ uri: item.avatar_url }} style={styles.avatar} />
                    <Text style={[styles.dropdownText, { color: theme.primary }]}>{item.username}</Text>
                  </TouchableOpacity>
                ))
              )}
            </View>
          )}

          <View style={styles.buttonContainer}>
            <MyButton
              text={'Compare Now'}
              onPress={handleCompareNow}
              // disabled={compareLoading}
              backgroundColor={theme.secondary}
              color={theme.light}
            />
            {compareError && (
              <Text style={{ color: 'red', fontSize: 13, textAlign: 'center', marginTop: 8 }}>
                {compareError}
              </Text>
            )}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    paddingVertical: 20,
  },
  mainContainer: {
    alignItems: 'center',
  },
  logoContainer: {
    paddingTop: 20,
    paddingBottom: 30,
  },
  introText: {
    fontWeight: '500',
    fontSize: 20,
    paddingHorizontal: 22,
    textAlign: 'center',
  },
  labelContainer: {
    alignItems: 'flex-start',
    width: '90%',
    paddingVertical: 10,
  },
  labelText: {
    fontWeight: '500',
    fontSize: 18,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '90%',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderWidth: 1,
    borderRadius: 10,
  },
  textInput: {
    paddingLeft: 10,
    flex: 1,
    fontSize: 18,
  },
  buttonContainer: {
    width: '80%',
    paddingVertical: 10,
    marginTop: height * 0.1,
  },
  dropdownContainer: {
    width: '90%',
    borderRadius: 8,
    borderWidth: 1,
    alignSelf: 'center',
    marginTop: 5,
    zIndex: 999,
  },
  dropdownItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 0.5,
    height: itemHeight,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  dropdownText: {
    fontSize: 16,
    fontWeight: '500',
  },
  noResultsText: {
    textAlign: 'center',
    color: 'red',
    padding: 10,
    fontSize: 14,
  },
});
