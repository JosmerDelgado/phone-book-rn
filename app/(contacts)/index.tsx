import { Text, View } from "@/components/Themed";
import { useEffect, useState } from "react";
import { FlatList } from "react-native";
import { useContacts } from "@/components/useContacts";
import { useContactsDispatchStore, useContactsStore } from "@/components/ContactsContext";
import { useAsyncStorage } from "@react-native-async-storage/async-storage";
import { CONTACT_STORAGE_KEY } from "@/constants/Storage"
import { ContactItem } from "@/components/ContactItem";


export default function ContactsView() {
    const { loading, fetchContactList } = useContacts()
    const contactsList = useContactsStore()
    const dispatchContacts = useContactsDispatchStore()
    const [latestKey, setLatestKey] = useState<string | null>()
    const { getItem, setItem } = useAsyncStorage(CONTACT_STORAGE_KEY)


    useEffect(() => {
        const onFetchContacts = async () => {
            const responseContacts = await fetchContactList()
            if (responseContacts) {
                const strigifyContacts = JSON.stringify(responseContacts)
                await setItem(strigifyContacts)
                dispatchContacts?.(responseContacts.items)
                setLatestKey(responseContacts.nextToken)
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

    const onFetchConsecuentContacts = async () => {
        const responseContacts = await fetchContactList(latestKey)
        if (responseContacts) {
            dispatchContacts?.((oldContactList)=>{
                const newContactList = [...oldContactList, ...responseContacts.items];
                const strigifyContacts = JSON.stringify(newContactList)
                setItem(strigifyContacts)
                setLatestKey(responseContacts.nextToken)
                return newContactList})
            return;
        }
    }

    return <View style={{ flex: 1 }} >
        
        <Text>
            Contact List:
        </Text>
        {contactsList.length > 0
            && <FlatList
                onScrollEndDrag={()=>{
                    console.log("HERE")
                }}
                onEndReached={()=>{
                    if(latestKey){
                        onFetchConsecuentContacts()
                    }
                }}
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
        {loading && <Text>Loading ...</Text>}
    </View>
}