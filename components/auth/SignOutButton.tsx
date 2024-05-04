import { Pressable, StyleSheet } from "react-native";
import { Text } from "../Themed";
import { useAuthenticator } from '@aws-amplify/ui-react-native';

export const userSelector: Parameters<typeof useAuthenticator>[0] = (context) => [context.user];

export const SignOutButton = () => {
    const { user, signOut } = useAuthenticator(userSelector);
    return (
        <Pressable onPress={signOut} style={{
            alignSelf: 'center',
            backgroundColor: 'black',
            paddingHorizontal: 8
        }}>
            <Text style={{ color: 'white', padding: 16, fontSize: 18 }}>
                Hello, {user.username}! Click here to sign out!
            </Text>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    buttonText: { 
        color: 'white', padding: 16, fontSize: 18 
    },
    buttonContainer: {
        alignSelf: 'center',
        backgroundColor: 'black',
        paddingHorizontal: 8
    }
})
