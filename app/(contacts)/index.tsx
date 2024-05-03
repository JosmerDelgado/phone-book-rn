import { Text, View } from "@/components/Themed";
import { useEffect } from "react";
import { FlatList, ScrollView } from "react-native";
import { useContacts } from "@/components/useContacts";
import { useContactsDispatchStore, useContactsStore } from "@/components/ContactsContext";
import { useAsyncStorage } from "@react-native-async-storage/async-storage";
import { CONTACT_STORAGE_KEY } from "@/constants/Storage"
import { ContactItem } from "@/components/ContactItem";


export default function ContactsView() {
    const { loading, fetchContactList } = useContacts()
    const contactsList = useContactsStore()
    const dispatchContacts = useContactsDispatchStore()
    const { getItem, setItem } = useAsyncStorage(CONTACT_STORAGE_KEY)


    useEffect(() => {
        const onFetchContacts = async () => {
            const responseContacts = await fetchContactList()
            if (responseContacts) {
                const strigifyContacts = JSON.stringify(responseContacts)
                await setItem(strigifyContacts)
                dispatchContacts?.(responseContacts)
                return;
            }
            const storedContacts = await getItem()
            if (storedContacts) {
                const storedContactsJSON = JSON.parse(storedContacts)
                dispatchContacts?.(storedContactsJSON)
                return;
            }
        }
        onFetchContacts()
    }, [])

    return <View style={{ flex: 1 }} >
        {loading && <Text>Loading ...</Text>}
        {!loading && <Text>
            Contact List:
        </Text>}
        {!loading && contactsList.length > 0
            && <FlatList
                data={
                    contactsList.sort((a, b) => {
                        if (a.name + a.lastName < b.name + b.lastName) {
                            return -1
                        }
                        if (a.name + a.lastName > b.name + b.lastName) {
                            return 1
                        }
                        return 0
                    })
                }
                renderItem={(contact) =>
                    <ContactItem
                        name={contact.item.name}
                        lastName={contact.item.lastName || ""}
                        phoneNumber={contact.item.phoneNumber || ""}
                        id={contact.item.id}
                    />}
            />}
    </View>
}