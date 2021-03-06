import React from "react";
import {fireEvent, render} from "@testing-library/react"
import {MockedProvider, MockedResponse} from "@apollo/client/testing";
import FormSignUp, {SIGN_UP_USER} from "./FormSignUp";
import {mainTheme} from "../../utils/Theme";
import CustomThemeProvider from "../../utils/ThemeProvider";
import userEvent from "@testing-library/user-event";
import {signUpUser} from "./__generated__/signUpUser";
import {Gender} from "../../apollo/__generated__/globalTypes";

const mocks: ReadonlyArray<MockedResponse<signUpUser>> = [{
    request: {
        query: SIGN_UP_USER,
        variables: {
            name: 'Julian',
            email: 'julia777@gmail.com',
            password: '123123',
            country: 'Lebanon',
            gender: Gender.FEMALE
        }
    },
    result: {
        data: {
            signup: {
                id: "AuToGeNeRateD",
                name: 'Julian',
                email: 'julia777@gmail.com',
                country: 'Lebanon',
                gender: Gender.FEMALE,
                __typename: "UserType",
            }
        },
        errors: []
    }
}]

const FormSignUp_mocked_themeWrap = () =>
    (
        <MockedProvider mocks={mocks}>
            <CustomThemeProvider theme={mainTheme}>
                <FormSignUp/>
            </CustomThemeProvider>
        </MockedProvider>
    )


describe('Rendering', () => {
    it('Form should contain all required elements', () => {
        const component = render(<FormSignUp_mocked_themeWrap/>)
        expect(component.getByText(/Create a new account/i)).toBeInTheDocument()
        expect(component.getByPlaceholderText(/Enter your name/i)).toBeInTheDocument()
        expect(component.getByPlaceholderText(/Email/i)).toBeInTheDocument()
        expect(component.getByPlaceholderText(/Password/i)).toBeInTheDocument()
        expect(component.getByLabelText('Male')).toBeInTheDocument()
        expect(component.getByLabelText('Female')).toBeInTheDocument()
    })
    it('SignUp button should be disabled after mount', () => {
        const component = render(<FormSignUp_mocked_themeWrap/>)
        expect(component.getByRole('button')).toBeDisabled()
    })
})

describe('Error handling', () => {
    it('Name input should be valid with latin chars only', async () => {
        const values = {
            valid: 'Julian',
            invalid: 'Ju1455^$#',
        }

        const component = render(<FormSignUp_mocked_themeWrap/>)
        const nameInput = component.getByPlaceholderText('Enter your name')

        fireEvent.change(nameInput, {target: {value: values.invalid}});
        fireEvent.blur(nameInput);

        expect(await component.findByText('Please enter a valid name')).toBeInTheDocument()

        fireEvent.change(nameInput, {target: {value: values.valid}});
        fireEvent.blur(nameInput);

        expect(await component.findByText('Please enter a valid name')).not.toBeInTheDocument()

    })

    it('Email input value must have email pattern', async () => {
        const values = {
            numbers: '55555555',
            invalid: 'example@mail',
            valid: "example.mail@domen.net"
        }

        const component = render(<FormSignUp_mocked_themeWrap/>)
        const emailInput = component.getByPlaceholderText('Email')

        fireEvent.change(emailInput, {target: {value: values.numbers}});
        fireEvent.blur(emailInput);
        expect(await component.findByText('Please enter a valid email address')).toBeInTheDocument()

        fireEvent.change(emailInput, {target: {value: values.invalid}});
        fireEvent.blur(emailInput);
        expect(await component.findByText('Please enter a valid email address')).toBeInTheDocument()

        fireEvent.change(emailInput, {target: {value: values.valid}});
        fireEvent.blur(emailInput);
        expect(await component.findByText('Please enter a valid email address')).not.toBeInTheDocument()
    })

    it('Password input value must have 6 not below any symbols', async () => {
        const values = {
            belowSix: '1234',
            notBelowSix: '123456'
        }

        const component = render(<FormSignUp_mocked_themeWrap/>)
        const passwordInput = component.getByPlaceholderText('Password')

        fireEvent.change(passwordInput, {target: {value: values.belowSix}});
        fireEvent.blur(passwordInput);
        expect(await component.findByText('Password must contain at least 6 symbols')).toBeInTheDocument()

        fireEvent.change(passwordInput, {target: {value: values.notBelowSix}});
        fireEvent.blur(passwordInput);
        expect(await component.findByText('Password must contain at least 6 symbols')).not.toBeInTheDocument()
    })

    it('Country should be selected', async () => {
        const component = render(<FormSignUp_mocked_themeWrap/>)
        const countrySelect = component.getByPlaceholderText('Select country')

        fireEvent.click(countrySelect)
        fireEvent.blur(countrySelect)
        expect(await component.findByText('You must select your country')).toBeInTheDocument()

        userEvent.click(countrySelect)
        userEvent.click(await component.findByText('Lebanon'))
        expect(await component.findByText('You must select your country')).not.toBeInTheDocument()
    })

    it('Gender should be selected', async () => {
        const component = render(<FormSignUp_mocked_themeWrap/>)
        const genderRadioGroup = component.getAllByRole('radio')

        for (const genderRadioButton of genderRadioGroup) {
            fireEvent.focus(genderRadioButton)
            fireEvent.blur(genderRadioButton)
            expect(await component.findByText('You must select the gender')).toBeInTheDocument()
        }

        const maleOption = component.getByLabelText('Male')
        fireEvent.click(maleOption)
        expect(await component.findByText('You must select the gender')).not.toBeInTheDocument()
    })

    it('Terms should be accepted', async () => {
        const component = render(<FormSignUp_mocked_themeWrap/>)
        const termsCheckbox = component.getByLabelText('Accept terms and conditions')

        fireEvent.focus(termsCheckbox)
        fireEvent.blur(termsCheckbox)
        expect(await component.findByText('You must accept the policies')).toBeInTheDocument()

        fireEvent.change(termsCheckbox, {target: {value: false}})
        expect(await component.findByText('You must accept the policies')).toBeInTheDocument()

        fireEvent.click(termsCheckbox)
        expect(await component.findByText('You must accept the policies')).not.toBeInTheDocument()
    })
})

describe('SubmittingFormData', () => {
    const validMock = {
        name: 'Julian',
        email: 'julia777@gmail.com',
        password: '123456',
    }
    it('Valid form data should available to sending to server', async () => {
        const component = render(<FormSignUp_mocked_themeWrap/>)

        const nameInput = component.getByPlaceholderText('Enter your name')
        fireEvent.change(nameInput, {target: {value: validMock.name}});

        const emailInput = component.getByPlaceholderText('Email')
        fireEvent.change(emailInput, {target: {value: validMock.email}});

        const passwordInput = component.getByPlaceholderText('Password')
        fireEvent.change(passwordInput, {target: {value: validMock.password}})

        const countrySelect = component.getByPlaceholderText('Select country')
        userEvent.click(countrySelect)
        userEvent.click(await component.findByText('Lebanon'))

        const maleOption = component.getByLabelText('Male')
        fireEvent.click(maleOption)

        const termsCheckbox = component.getByLabelText('Accept terms and conditions')
        fireEvent.click(termsCheckbox)

        expect(await component.findByRole('button')).not.toBeDisabled()
    })
})