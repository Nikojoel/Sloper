/* eslint-disable react/display-name */
import React from 'react';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import {createStackNavigator} from 'react-navigation-stack';
import Home from '../views/Home';
import Profile from '../views/Profile';
import Single from '../views/Single';
import Upload from '../views/Upload';
import AuthLoading from '../views/AuthLoading';
import Login from '../views/Login';
import MyFiles from '../views/MyFiles';
import {Icon} from 'native-base';
import Update from '../views/Update';
import UpdateUser from '../views/UpdateUser';
import ShowProfile from '../views/ShowProfile';

const TabNavigator = createBottomTabNavigator(
  {
    Home,
    Profile,
    Upload,
  },
  {
    defaultNavigationOptions: ({navigation}) => ({
      tabBarIcon: () => {
        const {routeName} = navigation.state;
        let iconName;
        if (routeName === 'Home') {
          iconName = 'home';
        } else if (routeName === 'Profile') {
          iconName = 'person';
        } else if (routeName === 'Upload') {
          iconName = 'add';
        }
        // You can return any component that you like here!
        return <Icon
          name={iconName}
          size={25}
        />;
      },
    }),
    tabBarOptions: {
      activeTintColor: '#000',
    },
  },
);

const StackNavigator = createStackNavigator(
  // RouteConfigs
  {
    Home: {
      screen: TabNavigator,
      navigationOptions: {
        headerShown: false,
      },

    },
    Single: {
      screen: Single,
      navigationOptions: {
        headerShown: false,
      },
    },
    Logout: {
      screen: Login,
    },
    MyFiles: {
      screen: MyFiles,
      navigationOptions: {
        headerShown: false,
      },
    },
    Update: {
      screen: Update,
      navigationOptions: {
        headerShown: false,
      },
    },
    UpdateUser: {
      screen: UpdateUser,
      navigationOptions: {
        headerShown: false,
      },
    },
    ShowProfile: {
      screen: ShowProfile,
      navigationOptions: {
        headerShown: false,
      },
    }
  },
);

const Navigator = createSwitchNavigator(
  {
    AuthLoading: AuthLoading,
    App: StackNavigator,
    Auth: Login,
  },
  {
    initialRouteName: 'AuthLoading',
  },
);

export default createAppContainer(Navigator);

/* END OF FILE */
