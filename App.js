import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import {
  HomeScreen,
  Loading,
  LoginIn,
  Movie,
  MovieList,
  Person,
  Search,
  SignIn,
  TrendingMovie,
  Welcome,
} from "./component";
import useAuth from "./hooks/useAuth";

export default function App() {
  const Stack = createNativeStackNavigator();

  const { user } = useAuth();

  if (user) {
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="TrendingMovie"
            component={TrendingMovie}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="MovieList"
            component={MovieList}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Movie"
            component={Movie}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Person"
            component={Person}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Search"
            component={Search}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Loading"
            component={Loading}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  } else {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Welcome">
          <Stack.Screen
            name="Welcome"
            component={Welcome}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="SignIn"
            component={SignIn}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="LogIn"
            component={LoginIn}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}
