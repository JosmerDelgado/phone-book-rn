import { fireEvent, render, screen } from '@testing-library/react-native'
import { ContactForm } from '../ContactForm';

describe("ContactForm", () => {
    it(`ContactForm onChange`, () => {
        const onChange = jest.fn()
        render(<ContactForm form={{
            id: '',
            name: '',
            lastName: undefined,
            phoneNumber: undefined,
            createdAt: '',
            updatedAt: '',
            _version: 0,
            _deleted: undefined,
            _lastChangedAt: 0
        }} onChange={onChange}
            onConfirm={() => {
                return new Promise(() => { })
            }} loading={false} error={false} buttonTitle={'Confirm'} />)
        const nameInput = screen.getByTestId("name")
        fireEvent.changeText(nameInput, "Test")
        const lastNameInput = screen.getByTestId("lastName")
        fireEvent.changeText(lastNameInput, "Test")
        const phoneNumberInput = screen.getByTestId("phoneNumber")
        fireEvent.changeText(phoneNumberInput, "Test")
        expect(onChange).toHaveBeenCalledTimes(3)
    });

    it(`ContactForm errors`, () => {
        const onChange = jest.fn()
        render(<ContactForm form={{
            id: '',
            name: 'a',
            lastName: "a",
            phoneNumber: "a",
            createdAt: '',
            updatedAt: '',
            _version: 0,
            _deleted: undefined,
            _lastChangedAt: 0
        }} onChange={onChange}
            onConfirm={() => {
                return new Promise(() => { })
            }} loading={false} error={false} buttonTitle={'Confirm'} />)
        screen.getByText(/^Name should be longer than 2/i)
        screen.getByText(/Last Name should be longer than 2/i)
        screen.getByText(/Fix phone format/i)
    });
})