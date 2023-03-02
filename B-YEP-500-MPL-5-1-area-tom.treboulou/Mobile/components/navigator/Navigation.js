import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import Login from '../Login'
import MainPage from '../MainPage'
import Auth from '../Auth'

const SearchStackNavigator = createStackNavigator({
    Login: { screen: Login, navigationOptions: {headerShown: false}},
    MainPage: { screen: MainPage, navigationOptions: {headerShown: false}},
    Auth: { screen: Auth, navigationOptions: {title: 'Auth'}}
})

export default createAppContainer(SearchStackNavigator)