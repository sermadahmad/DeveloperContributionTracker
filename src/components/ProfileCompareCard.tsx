import React from 'react';
import { View, Text, Image, StyleSheet, Linking } from 'react-native';
import ProfileLinkRow from './ProfileLinkRow';
import { lightTheme, darkTheme } from '../constants/theme';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';

type Repo = { name: string; html_url: string };
type ProfileCompareCardProps = {
  avatar_url?: any;
  name: string;
  bio: string;
  public_repos: number, 
  commits: number, 
  overall_stars: number,
  followers: number;
  following: number;
  html_url: string;
  top_languages: string[];
  top_repositories: Repo[];
};

const ProfileCompareCard: React.FC<ProfileCompareCardProps> = ({
  avatar_url,
  name,
  bio,
  public_repos, 
  commits, 
  overall_stars,
  followers,
  following,
  html_url,
  top_languages,
  top_repositories,
}) => {
  const mode = useSelector((state: RootState) => state.theme.mode);
  const theme = mode === 'light' ? lightTheme : darkTheme;

  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: theme.light,
          shadowColor: theme.dark,
          borderColor: theme.secondary,
        },
      ]}
    >
      <Image
        source={avatar_url ? { uri: avatar_url } : require('../assets/images/github-light.png')}
        style={styles.profileImage}
      />
      <Text style={[styles.nameText, { color: theme.secondary }]}>{name}</Text>
      <Text style={[styles.bioText, { color: theme.primary }]}>{bio}</Text>
      <View style={styles.statsRow}>
        <Text style={[styles.statsText, { color: theme.secondary }]}>Repos: {public_repos}</Text>
        <Text style={[styles.statsText, { color: theme.secondary }]}>Commits: {commits}</Text>
        <Text style={[styles.statsText, { color: theme.secondary }]}>Stars: {overall_stars}</Text>
      </View>
      <Text style={[styles.followText, { color: theme.primary }]}>
        {followers} followers - {following} following
      </Text>
      <ProfileLinkRow
        iconName="logo-github"
        text={html_url}
        onPress={() => Linking.openURL(html_url.startsWith('http') ? html_url : `https://${html_url}`)}
      />
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: theme.primary }]}>Top Languages: </Text>
        <View style={styles.languagesRow}>
          {
            top_languages !== undefined && top_languages.length > 0 ? top_languages.map((lang, idx) => (
              <View
              key={idx}
              style={[
                styles.languageTag,
                { backgroundColor: theme.secondary },
              ]}
            >
              <Text style={[styles.languageText, { color: theme.light }]}>{lang}</Text>
            </View>
            )) : (
              <Text style={[styles.languageText, { color: theme.primary }]}>No languages data available</Text>
            )
          }
        </View>
      </View>
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: theme.primary }]}>Top Repos: </Text>
        <View style={styles.reposList}>
          {Array.isArray(top_repositories) && top_repositories.length > 0 ? (
            top_repositories.map((repo, idx) => (
              <View key={idx} style={styles.repoRow}>
                <Text style={[styles.bullet, { color: theme.secondary }]}>•</Text>
                <Text
                  style={[styles.repoLink, { color: theme.primary }]}
                  onPress={() => {
                    if (repo.html_url) {
                      Linking.openURL(repo.html_url);
                    }
                  }}
                  numberOfLines={1}
                  ellipsizeMode="tail"
                >
                  {repo.name}
                </Text>
              </View>
            ))
          ) : (
            <Text style={[styles.languageText, { color: theme.primary }]}>No repositories data available</Text>
          )}
        </View>
      </View>
    </View>
  );
};

export default ProfileCompareCard;

const styles = StyleSheet.create({
  card: {
    width: '92%',
    margin: 20,
    padding: 20,
    borderRadius: 10,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    alignItems: 'center',
    borderWidth: 0.6,
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    alignSelf: 'center',
    resizeMode: 'cover',
  },
  nameText: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: '600',
    marginTop: 10,
  },
  bioText: {
    textAlign: 'justify',
    fontSize: 16,
    marginTop: 5,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  statsText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 8,
  },
  followText: {
    fontSize: 16,
    marginTop: 10,
    textAlign: 'left',
    width: '100%',
  },
  section: {
    width: '100%',
  },
  sectionTitle: {
    fontSize: 18,
    marginTop: 10,
    fontWeight: 'bold',
  },
  languagesRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 10,
    width: '100%',
  },
  languageTag: {
    borderRadius: 15,
    paddingHorizontal: 12,
    paddingVertical: 6,
    margin: 4,
  },
  languageText: {
    fontWeight: '500',
  },
  reposList: {
    marginTop: 8,
  },
  repoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  bullet: {
    fontSize: 20,
    fontWeight: '900',
    marginRight: 8,
  },
  repoLink: {
    fontSize: 14,
    textDecorationLine: 'underline',
  },
});
