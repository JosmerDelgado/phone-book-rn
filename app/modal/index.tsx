import { Button, StyleSheet, TextInput } from 'react-native';

import { Text, View } from '@/components/Themed';
import { useState } from 'react';
import { ItemContact, useContacts } from '@/components/useContacts';
import { useContactsDispatchStore } from '@/components/ContactsContext';
import { useNavigation } from 'expo-router';
import { useAsyncStorage } from '@react-native-async-storage/async-storage';
import { CONTACT_STORAGE_KEY } from '@/constants/Storage';

export default function ModalScreen() {
  const [form, setForm] = useState({name:"", lastName: "", phoneNumber: ""})
  const { loading, error, createNewContact } = useContacts()
  const dispatchContacts = useContactsDispatchStore()
  const { setItem } = useAsyncStorage(CONTACT_STORAGE_KEY)    

  const navigation = useNavigation()


  const onClickCreateNewContact = async () => {
    const response = await createNewContact(form)
    if(response) {
      dispatchContacts?.((oldContacts)=>{
        const newContactlist = [...oldContacts, form as ItemContact ]
        const stringifyNewContactlist = JSON.stringify(newContactlist)
        setItem(stringifyNewContactlist)
        return (newContactlist)
      })
      navigation.goBack()
    }
    
  }
  
  return (
    <View style={styles.container}>
        {loading && <Text>Loading...</Text>}
        <Text style={styles.title}>
          Add Contact
        </Text>
        <TextInput style={styles.input} value={form.name} onChangeText={(innertext) => { setForm((oldForm)=>({...oldForm, name: innertext})) }} placeholder='Name' />
        <TextInput style={styles.input} value={form.lastName} onChangeText={(innertext) => { setForm((oldForm)=>({...oldForm, lastName: innertext})) }} placeholder='Last Name' />
        <TextInput style={styles.input} value={form.phoneNumber} inputMode='tel' onChangeText={(innertext) => { setForm((oldForm)=>({...oldForm, phoneNumber: innertext})) }} placeholder='Phone Number' />      
        <Button title="Create Contact" onPress={onClickCreateNewContact}/>
    </View>
  );
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