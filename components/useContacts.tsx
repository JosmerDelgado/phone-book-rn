
import { generateClient } from 'aws-amplify/api';
import { listContacts } from "@/src/graphql/queries";
import { useState } from 'react';
import { createContact, updateContact } from '@/src/graphql/mutations';

const client = generateClient();

export type ItemContact = {
    id: string,
    name: string,
    lastName?: string | null,
    phoneNumber?: string | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
}

export const useContacts = () => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)
    async function fetchContactList() {
        try {
            setLoading(true)
            setError(false)
            const contactListResponse = await client.graphql({
                query: listContacts,
            });
            setLoading(false)
            return  contactListResponse.data.listContacts.items;
        } catch (err) {
            console.log('error fetching contacts');
            setError(true)
            setLoading(false)
        }
    }

    async function createNewContact(variables: { name: string, lastName:string, phoneNumber: string}){
        try {
            setLoading(true)
            setError(false)
            const newContactResponse = await client.graphql({
                query: createContact,
                variables: { input: variables }
            })
            setLoading(false)

            return newContactResponse.data.createContact
        } catch(err){
            console.log('on creation of new contact');
            setError(true)
            setLoading(false)
        }

    }
    async function editContact(variables: ItemContact){
        try {
            setLoading(true)
            setError(false)
            const newContactResponse = await client.graphql({
                query: updateContact,
                variables: { 
                    input: { 
                        id: variables.id, 
                        name: variables.name, 
                        lastName: variables.lastName, 
                        phoneNumber: variables.phoneNumber,
                        _version: variables._version
                    } 
                }
            })
            setLoading(false)

            return newContactResponse.data.updateContact
        } catch(err){
            console.log('on creation of new contact');
            setError(true)
            setLoading(false)
        }

    }
    return { loading, error, fetchContactList, createNewContact, editContact }
}