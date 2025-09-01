import { StyleSheet, Text, View, SafeAreaView, FlatList, Dimensions, RefreshControl, ActivityIndicator } from 'react-native'
import React from 'react'
import { lightTheme, darkTheme } from '../../constants/theme';
import ComparisonHistoryComponent from '../../components/ComparisonHistoryComponent';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { BottomTabParamList } from '../../navigation/types';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../../redux/store';
import dayjs from 'dayjs';

type Props = BottomTabScreenProps<BottomTabParamList, 'Comparisons'>;

const { height } = Dimensions.get('window');

type ListEmptyComponentProps = {
  title: string;
};
const ListEmptyComponent: React.FC<ListEmptyComponentProps> = ({ title }) => {
  const mode = useSelector((state: RootState) => state.theme.mode);
  const theme = mode === 'light' ? lightTheme : darkTheme;
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 }}>
      <Text style={{ fontSize: 20, color: theme.tertiary }}>{title}</Text>
    </View>
  );
};

const ComparisonsHistoryScreen: React.FC<Props> = ({ navigation }) => {
  const dispatch = useDispatch<AppDispatch>();
  const mode = useSelector((state: RootState) => state.theme.mode);
  const theme = mode === 'light' ? lightTheme : darkTheme;

  const [refreshing, setRefreshing] = React.useState(false);
  // sample data for testing
  const history = [
    { id: 1, usernames: 'userA,userB', names: ['User A', 'User B'], created_at: '2023-10-01T10:00:00Z' },
    { id: 2, usernames: 'userC,userD', names: ['User C', 'User D'], created_at: '2023-10-02T11:30:00Z' },
    { id: 3, usernames: 'userE,userF', names: ['User E', 'User F'], created_at: '2023-10-03T14:15:00Z' },
  ];
  const loading = false;
  const error = null;
  

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.light }]}>

      <View style={{ flex: 1 }}>
        <Text style={[styles.infoText, { color: theme.primary }]}>
          To delete an item from the comparison history, long press on it.
        </Text>
        <Text style={[styles.heading, { color: theme.secondary }]}>Comparisons History</Text>
        {loading ? (
          <ActivityIndicator size="large" color={theme.secondary} style={{ marginTop: 20 }} />
        ) : error ? (
          <Text style={{ textAlign: 'center', marginTop: 20, color: 'red' }}>{error}</Text>
        ) : (
          <FlatList
            data={history}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => {
              let time = '';
              if (item.created_at) {
                const adjusted = dayjs(item.created_at).add(5, 'hour');
                time = adjusted.format('hh:mm A');
              }
              return (
                <ComparisonHistoryComponent
                  user1={item.names?.[0] || item.usernames?.split(',')[0]}
                  user2={item.names?.[1] || item.usernames?.split(',')[1]}
                  date={item.created_at ? item.created_at.split('T')[0] : ''}
                  time={time}
                  navigation={navigation}
                  comparisonId={item.id}
                />
              );
            }}
            ListEmptyComponent={() => (
              <ListEmptyComponent title="No comparisons history found." />
            )}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 10 }}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                // onRefresh={onRefresh}
                colors={[theme.secondary]}
                tintColor={theme.secondary}
              />
            }
          />
        )}
      </View>
    </SafeAreaView>
  )
}

export default ComparisonsHistoryScreen

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  infoText: {
    paddingHorizontal: 20,
    fontSize: 20,
    fontWeight: '400',
    paddingTop: height * 0.02,
    textAlign: 'center',
  },
  heading: {
    fontWeight: '600',
    fontSize: 24,
    padding: height * 0.02,
  },
})