import { View, Text, Button } from 'react-native';
import { Base, Typography } from './../../styles';
import AuthModel from './../../models/auth';

export default function Home({navigation, setIsLoggedIn}) {
  return (
    <View style={[Base.base, {alignItems: "center"}]}>
        <Text style={{ ...Typography.header2 }}>Vill du logga ut?</Text>
        <Button
            title="Ja"
            onPress={() => {
                AuthModel.logout()
                setIsLoggedIn(false);
                navigation.navigate('Lager');
            }}
        />
        <Button
            title="Nej"
            onPress={() => {
                navigation.navigate('Lager');
            }}
        />
    </View>
  );
}