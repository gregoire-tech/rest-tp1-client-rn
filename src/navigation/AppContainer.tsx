import React from 'react'
// @ts-ignore
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native'
import { useTheme, TouchableRipple } from 'react-native-paper'

import AuthorScreen from '../screens/Author'
import AuthorBooksScreen from '../screens/AuthorBooks'
import BookScreen from '../screens/Book'

const AuthorStack = () => {
  const Stack = createStackNavigator()
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="Author" component={AuthorScreen} />
      <Stack.Screen name="AuthorBooks" component={AuthorBooksScreen} />
    </Stack.Navigator>
  )
}

export default function AppContainer() {
  const Tab = createBottomTabNavigator()
  const { colors } = useTheme()

  const renderIcon = (iconSource: string) => ({ focused, size }: { focused: boolean; size: number }) => (
    <TouchableRipple rippleColor={colors.primary}>
      <Icon name={iconSource} size={size} color={focused ? colors.primary : colors.disabled} />
    </TouchableRipple>
  )

  return (
    <NavigationContainer>
      <Tab.Navigator
        tabBarOptions={{
          activeTintColor: colors.primary,
          activeBackgroundColor: colors.background,
          inactiveBackgroundColor: colors.background,
          style: { borderTopWidth: 0 }
        }}>
        <Tab.Screen
          name="Author"
          options={{
            tabBarIcon: renderIcon('face'),
            tabBarLabel: 'Auteurs'
          }}
          component={AuthorStack}
        />
        <Tab.Screen
          name="Book"
          options={{
            tabBarIcon: renderIcon('book-open-page-variant'),
            tabBarLabel: 'Livres'
          }}
          component={BookScreen}
        />
      </Tab.Navigator>
    </NavigationContainer>
  )
}
