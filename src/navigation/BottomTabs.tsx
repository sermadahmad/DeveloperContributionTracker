import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SCREENS } from '../constants/screens';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { BottomTabParamList } from './types';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { lightTheme, darkTheme } from '../constants/theme';
import { Dimensions } from 'react-native';

const { height } = Dimensions.get('window');

const Tab = createBottomTabNavigator<BottomTabParamList>();

const BottomTabs = () => {
    const mode = useSelector((state: RootState) => state.theme.mode);
    const theme = mode === 'light' ? lightTheme : darkTheme;
    return (
        <Tab.Navigator
            initialRouteName='Home'
            screenOptions={({ route }) => ({
                tabBarHideOnKeyboard: true,
                headerShown: false,
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName = '';

                    if (route.name === 'Home') {
                        iconName = focused ? 'home' : 'home-outline';
                    } else if (route.name === 'Compare') {
                        iconName = focused ? 'swap-horizontal' : 'swap-horizontal-outline';
                    } else if (route.name === 'Comparisons') {
                        iconName = focused ? 'list' : 'list-outline';
                    } else if (route.name === 'Profile') {
                        iconName = focused ? 'person' : 'person-outline';
                    }

                    return <Ionicons name={iconName} size={size} color={color} />;
                },
                tabBarActiveTintColor: theme.secondary,
                tabBarInactiveTintColor: theme.primary,
                tabBarLabelStyle: {
                    fontSize: 12,
                },
                tabBarStyle: {
                    backgroundColor: theme.light,
                    height: height * 0.08,
                },
            })}
        >
            <Tab.Screen name="Home" component={SCREENS.HomeScreen} />
            <Tab.Screen name="Compare" component={SCREENS.CompareScreen} />
            <Tab.Screen name="Comparisons" component={SCREENS.ComparisonsHistoryScreen} />
            <Tab.Screen name="Profile" component={SCREENS.ProfileScreen} />
        </Tab.Navigator>
    );
}

export default BottomTabs;