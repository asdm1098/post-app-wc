import React from 'react';
import { Link } from 'react-router-dom';


import { useDispatch, useSelector } from 'react-redux';

import validator from 'validator';
import { removeError, setError } from '../../redux/actions/ui';
import { startRegisterWithEmailPasswordName } from '../../redux/actions/auth';
import { useForm } from '../../hook/useForm';

export const RegisterScreen = () => {

    const dispatch = useDispatch();
    //Obtener información del state redux
    const {msgError} = useSelector(state => state.ui);
    //console.log(msgError);

    const [ formValues, handleInputChange ] = useForm({
        name: 'Stiven',
        email: 'stiven@mail.com',
        password: '123456',
        password2: '123456',
    });

    const { name, email, password, password2 } = formValues;

    const handleRegister = (e) => {
        e.preventDefault();

        if( isFormValid() ) {
            //acción creación usuario
            dispatch( startRegisterWithEmailPasswordName(email, password, name));
        }
    }

    //Validación del formulario
    const isFormValid = () => {

        if( name.trim().length <= 2 ) {
            dispatch(setError( 'Name is required' ))
            return false;
        } else if ( !validator.isEmail( email ) ) {
            dispatch(setError( 'Email is not valid' ))
            return false;
        } else if ( password !== password2 || password.length < 5 ) {
            dispatch(setError( 'Password should be at least 6 characters and match each other' ))
            return false 
        }

        dispatch(removeError());
        return true
    }


    return (
        <div>
            <h3 className="auth__title">Register</h3>

            <form 
                onSubmit = { handleRegister }
                className= "animate__animated animate__fadeIn animate__faster"    
            >

                {
                    msgError &&
                    (
                        <div className="auth__alert-error">
                            { msgError }
                        </div>
                    )
                }

                <input
                    type="text"
                    placeholder="Name"
                    name="name"
                    className="auth__input"
                    autoComplete="off"
                    value = { name }
                    onChange = { handleInputChange }

                />
                
                <input
                    type="text"
                    placeholder="Email"
                    name="email"
                    className="auth__input"
                    autoComplete="off"
                    value = { email }
                    onChange = { handleInputChange }
                />

                <input
                    type="password"
                    placeholder="Password"
                    name="password"
                    className="auth__input"     
                    value = { password }
                    onChange = { handleInputChange }                             
                />

                <input
                    type="password"
                    placeholder="Confirm password"
                    name="password2"
                    className="auth__input"  
                    value = { password2 }
                    onChange = { handleInputChange }                                
                />

                <button
                    type="submit"
                    className="btn btn-primary btn-block mb-5"
                >
                    Register
                </button>

                
                <Link 
                    to="/auth/login"
                    className="link"
                >
                    Already registered?
                </Link>
            </form>
        </div>
    )
}
