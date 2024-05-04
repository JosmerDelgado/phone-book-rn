
import { generateClient } from 'aws-amplify/api';
import { contactsByUser, listContacts } from "@/src/graphql/queries";
import { useState } from 'react';
import { createContact, deleteContact, updateContact } from '@/src/graphql/mutations';
import { ModelSortDirection } from '@/src/API';

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
    async function fetchContactList(nextToken?: string | null) {
        try {
            setLoading(true)
            setError(false)
            const contactListResponse = await client.graphql({
                query: contactsByUser,
                variables: { 
                    userId: "USER",
                    filter: {_deleted: {attributeExists: false}}, 
                    limit: 10, 
                    sortDirection: ModelSortDirection.ASC,
                    nextToken,
                },
            });
            setLoading(false)
            return  contactListResponse.data.contactsByUser;
        } catch (err) {
            console.log('error fetching contacts');
            setError(true)
            setLoading(false)
        }
    }

    async function createNewContact(variables: ItemContact | { name: string, lastName:string, phoneNumber: string}){
        try {
            setLoading(true)
            setError(false)
            const newContactResponse = await client.graphql({
                query: createContact,
                variables: { input: {...variables, userId: "USER"} }
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
            console.log('on Edit of new contact');
            setError(true)
            setLoading(false)
        }

    }
    async function removeContact(variables: ItemContact){
        try {
            setLoading(true)
            setError(false)
            const newContactResponse = await client.graphql({
                query: deleteContact,
                variables: { 
                    input: { 
                        id: variables.id,
                        _version: variables._version
                    } 
                }
            })
            setLoading(false)

            return newContactResponse.data.deleteContact
        } catch(err){
            console.log('on delete of new contact');
            setError(true)
            setLoading(false)
        }

    }

    return { loading, error, fetchContactList, createNewContact, editContact, removeContact }
}