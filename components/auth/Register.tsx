import Auth from '../../interfaces/auth';
import { useState } from 'react';
import AuthModel from '../../models/auth';
import AuthFields from './Authfields';
import { showMessage } from "react-native-flash-message";

export default function Login({navigation}) {
    const [auth, setAuth] = useState<Partial<Auth>>({});

    async function doRegister() {
        if (auth.email && auth.password) {
            const result = await AuthModel.register(auth.email, auth.password);

            navigation.navigate("Login");
            if (typeof result.errors !== 'undefined') {
                showMessage({
                    message: result.errors.title,
                    description: "Account is already registered",
                    type: "warning",
                });
            } else {
                showMessage({
                    message: "Account created",
                    description: result.data.message,
                    type: "success",
                });
            }
            
        } else {
            showMessage({
                message: "Missing fields",
                description: "E-mail or password is missing",
                type: "warning",
            });
        }
    }

    return (
        <AuthFields
            auth={auth}
            setAuth={setAuth}
            submit={doRegister}
            title="Registrera"
            navigation={navigation}
        />
    );
};