import ContactsView from "@/app/(contacts)"
import { fireEvent, render, screen } from "@testing-library/react-native"
import * as Router from "expo-router"

jest.mock("aws-amplify/api", ()=>({generateClient:()=>{}}))
jest.mock("@react-native-async-storage/async-storage", ()=>({useAsyncStorage:()=>({
    getItem: ()=>{},
    setItem: ()=>{},
})}))
jest.mock("@/components/useContacts", ()=>({
    useContacts: ()=>{
        return {fetchContactList: ()=>{
            
        }}
    }
}))
jest.mock("@/components/ContactsContext", ()=>({
    useContactsStore: ()=>{
        return [{id: "00", name: "Name", lastName: "LName", phoneNumber: "PNumber"},{id: "01", name: "Name", lastName: "LName", phoneNumber: "PNumber"}]
    },
    useContactsDispatchStore: ()=>{}
}))


jest.mock("expo-router", ()=>({
    useRouter: ()=>({ navigate: ()=>{}})    
}))

describe("Contacts", ()=>{
    it("Render List", ()=>{
        render(<ContactsView />)
        const contactsList = screen.getAllByTestId("ConcactItem")

        expect(contactsList).toHaveLength(2)
        const editButton = screen.getByTestId("Edit00")
        
        fireEvent.press(editButton)
        // TODO: add expect related with navigation      
    })
})