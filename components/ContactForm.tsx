import { View, TextInput, Button, StyleSheet } from "react-native"
import { Text } from "./Themed"
import { ItemContact } from "./useContacts";

type ContactFormProps = {
    form: ItemContact | {
        name: string;
        lastName: string;
        phoneNumber: string;
    },
    onChange: React.Dispatch<React.SetStateAction<ItemContact | {
        name: string;
        lastName: string;
        phoneNumber: string;
    }>>,
    onConfirm: () => Promise<void>,
    loading: boolean,
    error: boolean,
    buttonTitle: string,
    onDelete?: () => Promise<void>
}

export const ContactForm = ({ form, onConfirm, onChange, loading, error, buttonTitle, onDelete }: ContactFormProps) => {
    const nameError = form.name && form.name.length < 2
    const lastNameError = form.lastName && form.lastName?.length < 2
    const phoneNumberError = form.phoneNumber && !/^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$/.test(form.phoneNumber)
    return <View style={styles.container}>
        {loading && <Text>Loading...</Text>}
        {error && <Text> Something went wrong...</Text>}
        <Text style={styles.title}>
            Add Contact
        </Text>
        <TextInput testID="name" style={styles.input} value={form.name} onChangeText={(innertext) => { onChange((oldForm) => ({ ...oldForm, name: innertext })) }} placeholder='Name' />
        {nameError && <Text> Name should be longer than 2 </Text>}
        <TextInput testID="lastName" style={styles.input} value={form.lastName || ""} onChangeText={(innertext) => { onChange((oldForm) => ({ ...oldForm, lastName: innertext })) }} placeholder='Last Name' />
        {lastNameError && <Text> Last Name should be longer than 2 </Text>}
        <TextInput testID="phoneNumber" style={styles.input} value={form.phoneNumber || ""} inputMode='tel' onChangeText={(innertext) => { onChange((oldForm) => ({ ...oldForm, phoneNumber: innertext })) }} placeholder='###-###-####' />
        {phoneNumberError && <Text>Fix phone format</Text>}
        <Button disabled={!!nameError || !!lastNameError || !!phoneNumberError} title={buttonTitle} onPress={onConfirm} />
        {onDelete && <Button title={"Delete"} onPress={onDelete} />}
    </View>
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 40
    },
    input: {
        flexDirection: "row",
        width: "100%",
        margin: 12,
        borderWidth: 1,
        padding: 10,
    },
    row: {
        flexDirection: "row",
        width: "100%",
        justifyContent: "space-between",
        alignItems: "center"
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
});