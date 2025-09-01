import { StyleSheet, Text, View, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native'
import React from 'react'
import { lightTheme, darkTheme } from '../../constants/theme'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ICONS } from '../../constants/icons'
import ProfileCompareCard from '../../components/ProfileCompareCard';
import MyButton from '../../components/MyButton'
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { BottomTabParamList } from '../../navigation/types';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../../redux/store';

type Props = BottomTabScreenProps<BottomTabParamList, 'Compare'>;

const CompareScreen: React.FC<Props> = ({ navigation, route }) => {

  // const userA = route.params?.userA;
  // const userB = route.params?.userB;
  // const comparisonId = route.params?.comparisonId;

  const compareResults = [
    {
      username: "github",
      avatar_url: "https://avatars.githubusercontent.com/u/9919?v=4",
      name: "GitHub",
      bio: "How people build software.",
      public_repos: 500,
      commits: 1500,
      overall_stars: 3000,
      followers: 4000,
      following: 10,
      html_url: "",
      top_languages: [],
      top_repositories: [],
    }
  ]

  const mode = useSelector((state: RootState) => state.theme.mode);
  const theme = mode === 'light' ? lightTheme : darkTheme;


  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.light }]}>

      <View style={styles.headerRow}>
        <TouchableOpacity style={[styles.backButton, { backgroundColor: theme.secondary }]} onPress={() => {
          navigation.goBack();
        }}>
          <ICONS.BackIcon color={theme.light} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: theme.secondary }]}>Comparison Results</Text>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.mainContainer}>
          {compareResults.length > 0 && (
            compareResults.map((user, idx) => (
              <ProfileCompareCard
                key={user.username || idx}
                avatar_url={user.avatar_url}
                name={user.name}
                bio={user.bio}
                public_repos={user.public_repos}
                commits={user.commits}
                overall_stars={user.overall_stars}
                followers={user.followers}
                following={user.following}
                html_url={user.html_url}
                top_languages={user.top_languages}
                top_repositories={user.top_repositories}
              />
            ))
          )}

          <View style={{
            width: '90%',
          }}>
            <MyButton
              text="Compare Another"
              onPress={() => navigation.navigate('Home')}
              backgroundColor={theme.secondary}
              color={theme.light}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default CompareScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    paddingVertical: 20,
  },
  mainContainer: {
    alignItems: 'center',
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    width: '100%',
    paddingBottom: 10,
  },
  backButton: {
    padding: 8,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    textAlign: 'center',
    flex: 1,
    fontSize: 24,
    fontWeight: 'bold',
  },
});