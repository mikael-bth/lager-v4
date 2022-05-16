import Auth from '../../interfaces/auth';
import { useState } from 'react';
import { Alert } from "react-native";
import AuthModel from '../../models/auth';
import AuthFields from './Authfields';

export default function Login({navigation, setIsLoggedIn}) {
    const [auth, setAuth] = useState<Partial<Auth>>({});

    async function doLogin() {
        if (auth.email && auth.password) {
            const result = await AuthModel.login(auth.email, auth.password);
            if (typeof result.title !== 'undefined') {
                Alert.alert(
                    "ERROR",
                    `${result.title}`,
                    [
                        {
                            text: "Close",
                            style: "cancel"
                        }
                    ]
                );
            }else {
                setIsLoggedIn(true);
            }   
        }
    }

    return (
        <AuthFields
            auth={auth}
            setAuth={setAuth}
            submit={doLogin}
            title="Logga in"
            navigation={navigation}
        />
    );
};