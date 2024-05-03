import { Button, StyleSheet } from "react-native"
import { Text, View } from "./Themed"
import { useRouter } from "expo-router"

export const ContactItem = ({ name, lastName, phoneNumber, id }: { name: string, lastName?: string, phoneNumber?: string, id: string }) => {
    const navigation = useRouter()

    return <View style={styles.contactItem} testID="ConcactItem">
        <View>
            <View style={styles.nameRow}>
                <Text style={styles.nameItem}>{name}</Text>
                <Text>{lastName}</Text>
            </View>
            <Text style={styles.phoneRow}>{phoneNumber}</Text>
        </View>
        <View style={styles.buttonRow}>
            <Button testID={`Edit${id}`} title="Edit" onPress={()=>{
                navigation.navigate(`/modal/${id}`)
            }} />
        </View>
    </View>
}

const styles = StyleSheet.create({
    nameRow: {
        flexDirection: "row",
        justifyContent: "space-around"
    },
    phoneRow: {
        textAlign: "left"
    },
    contactItem: {
        borderBottomColor: "#000",
        borderBottomWidth: 2,
        padding: 8,
        flexDirection: "row",
        justifyContent: "space-between"
    },
    nameItem: {
        marginRight: 8
    },
    buttonRow: {
        flexDirection: "row",
        gap:8
    },
})