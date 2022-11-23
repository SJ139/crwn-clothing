import { useState } from "react";

import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from "../../utils/firebase/firebase.utils";

import FormInput from "../../form-input/form-input.component";

const defaultFormFields = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: '',
}

const SignUpForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const {displayName, email, password, confirmPassword}= formFields;

    console.log(formFields);

    const resetFormFields = ()=> {
        setFormFields(defaultFormFields);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (password !== confirmPassword){
            alert("Passwords do not match!");
            return;
        }

        try {
            const {user} = await createAuthUserWithEmailAndPassword (email, password);
            
            await createUserDocumentFromAuth(user, {displayName});
            resetFormFields ();

        }catch(error){
            if(error.code === 'auth/email-already-in-use'){
             alert ('Cannot create User, Email already in use');   
            }else{ 
                console.log('User Creation caused an Error', error);
            }
        }
    };

    const handleChange = (event) => {
        const {name, value} = event.target;
        setFormFields ({...formFields, [name]: value});
    };

    return (
        <div>
            <h1>Sign Up with Your Email & Password</h1>
            <form onSubmit={handleSubmit}>
            <FormInput
                label = "Display Name"
                type = "text" 
                required 
                onChange={handleChange} 
                name="displayName" 
                value={displayName}
            />
            <FormInput
                label = "Email"
                type = "temail" 
                required 
                onChange={handleChange} 
                name="email" 
                value={email}
            />
        
            <FormInput
                label = "Password"
                type = "text" 
                required 
                onChange={handleChange} 
                name="password" 
                value={password}
            />
            <FormInput
                label = "Confirm Password"
                type = "text" 
                required 
                onChange={handleChange} 
                name="confirmPassword" 
                value={confirmPassword}
            />
    
            <button type="submit">SIgn Up</button>

            </form>
        </div>
    )
}
export default SignUpForm;