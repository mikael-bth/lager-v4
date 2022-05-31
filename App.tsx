import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState, useEffect } from 'react';
import Home from "./components/Home";
import Pick from "./components/Pick";
import Deliveries from "./components/Deliveries";
import Invoices from "./components/Invoices";
import Shipping from "./components/Shipping";
import Auth from "./components/auth/Auth";
import Logout from "./components/auth/Logout";
import AuthModel from './models/auth';
import { Base } from './styles';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FlashMessage from 'react-native-flash-message';


const Tab = createBottomTabNavigator();
const routeIcons = {
  "Lager": "home",
  "Plock": "list",
  "Beställ": "list-circle",
  "Skicka": "airplane",
  "Logga in": "log-in",
  "Logga ut": "log-out",
  "Faktura": "stats-chart"
}

export default function App() {
  const [products, setProducts] = useState([]);
  const [allOrders, setAllOrders] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState<Boolean>(false);
  
  useEffect(async () => {
    setIsLoggedIn(await AuthModel.loggedIn());
  }, []);
  return (
    <SafeAreaView style={Base.container}>
      <NavigationContainer>
          <Tab.Navigator screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName = routeIcons[route.name] || "alert";

              return <Ionicons name={iconName} size={size} color={color} />;
          },
            tabBarActiveTintColor: 'tomato',
            tabBarInactiveTintColor: 'gray',
          })}
        >
          <Tab.Screen name="Lager">
            {() => <Home products={products} setProducts={setProducts} />}
          </Tab.Screen>
          <Tab.Screen name="Plock">
            {() => <Pick setProducts={setProducts} allOrders={allOrders} setAllOrders={setAllOrders} />}
          </Tab.Screen>
          <Tab.Screen name="Beställ">
            {() => <Deliveries setProducts={setProducts} />}
          </Tab.Screen>
          <Tab.Screen name="Skicka">
            {() => <Shipping allOrders={allOrders} setAllOrders={setAllOrders} />}
          </Tab.Screen>
          {isLoggedIn ?
            <Tab.Screen name="Faktura">
              {() => <Invoices setAllOrders={setAllOrders} />}
            </Tab.Screen> :
            <Tab.Screen name="Logga in">
              {() => <Auth setIsLoggedIn={setIsLoggedIn} />}
            </Tab.Screen>
          }
          {isLoggedIn &&
            <Tab.Screen name="Logga ut">
              {(screenProps) => <Logout {...screenProps} setIsLoggedIn={setIsLoggedIn} />}
            </Tab.Screen>
          }
        </Tab.Navigator>
      </NavigationContainer>
      <StatusBar style="auto" />
      <FlashMessage position="top" />
    </SafeAreaView>
  );
}

