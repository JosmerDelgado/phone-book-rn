import React, { useContext, useState } from "react"
import { ItemContact } from "./useContacts"

const ContactsContext = React.createContext<ItemContact[]>([])
const ContactsDispatchContext = React.createContext<React.Dispatch<React.SetStateAction<ItemContact[]>> | null>(null)


export const ContactsProvider = ({ children }: { children: React.ReactNode }) => {
    const [value, setValue] = useState<ItemContact[]>([])
    return <ContactsContext.Provider value={value}>
        <ContactsDispatchContext.Provider value={setValue}>
            {children}
        </ContactsDispatchContext.Provider>
    </ContactsContext.Provider>
}


export const useContactsStore = () => {
    const contacts = useContext(ContactsContext)

    return contacts
}

export const useContactsDispatchStore = () => {
    const dispatchContacts = useContext(ContactsDispatchContext)
    return dispatchContacts
}