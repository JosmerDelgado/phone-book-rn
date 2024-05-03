import { Button, StyleSheet, TextInput } from 'react-native';

import { Text, View } from '@/components/Themed';
import { useEffect, useState } from 'react';
import { ItemContact, useContacts } from '@/components/useContacts';
import { useContactsDispatchStore, useContactsStore } from '@/components/ContactsContext';
import { useLocalSearchParams, useNavigation } from 'expo-router';
import { useAsyncStorage } from '@react-native-async-storage/async-storage';
import { CONTACT_STORAGE_KEY } from '@/constants/Storage';
import { ContactForm } from '@/components/ContactForm';

export default function ModalScreen() {
	const params = useLocalSearchParams()

	const contacts = useContactsStore()
	const contact = contacts.find(({id})=> id === params.contact_id) || {name:"", lastName: "", phoneNumber: ""}
	const [form, setForm] = useState(contact)
	const { loading, error, editContact, removeContact } = useContacts()
	const dispatchContacts = useContactsDispatchStore()
	const { setItem } = useAsyncStorage(CONTACT_STORAGE_KEY)

	const navigation = useNavigation()
	useEffect(() => {
		// This is a workaround, the new stack navigation title is not working as expected
		navigation.setOptions({ title: "Edit Contact" })
	}, [])

	const onClickCreateNewContact = async () => {
		const response = await editContact(form as ItemContact)

		if (response) {
			dispatchContacts?.((oldContacts) => {
				const newContactlist = [...oldContacts.filter(({id})=> id !== response.id), form as ItemContact]
				const stringifyNewContactlist = JSON.stringify(newContactlist)
				setItem(stringifyNewContactlist)
				return (newContactlist)
			})
			navigation.goBack()
		}

	}
	const onClickDeleteContact = async () => {
		const response = await removeContact(form as ItemContact)

		if (response) {
			dispatchContacts?.((oldContacts) => {
				const newContactlist = oldContacts.filter(({id})=> id !== response.id)
				const stringifyNewContactlist = JSON.stringify(newContactlist)
				setItem(stringifyNewContactlist)
				return (newContactlist)
			})
			navigation.goBack()
		}

	}

	return (
		<ContactForm 
			form={form} 
			onConfirm={onClickCreateNewContact} 
			onChange={setForm} 
			loading={loading} 
			error={error} 
			buttonTitle='Update Contact'
			onDelete={onClickDeleteContact}/>
	);
}
