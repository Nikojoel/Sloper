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
import MyFiles from '../views/MyFiles'
import {Icon} from 'native-base';
import Update from "../views/Update";
import UpdateUser from '../views/UpdateUser';

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

TabNavigator.navigationOptions = ({navigation}) => {
  const {routeName} = navigation.state.routes[navigation.state.index];
  // You can do whatever you like here to pick the title based on the route name
  const headerTitle = routeName;
  return {
    headerTitle,
  };
};

const StackNavigator = createStackNavigator(
  // RouteConfigs
  {
    Home: {
      screen: TabNavigator,
      navigationOptions: {
        headerMode: 'none', // this will hide the header
      },
    },
    Single: {
      screen: Single,
    },
    Logout: {
      screen: Login,
    },
    MyFiles: {
      screen: MyFiles,
    },
    Update: {
      screen: Update,
    },
    UpdateUser: {
      screen: UpdateUser
    },
    Profile: {
      screen: Profile
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
