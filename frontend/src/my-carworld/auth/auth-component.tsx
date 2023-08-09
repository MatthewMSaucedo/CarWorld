// Style
import './auth.scss'
import carWorldImg from '../../logo.svg'

// React state
import { useState } from "react"

// React Hook Form
import { useForm, SubmitHandler } from "react-hook-form"

// Toast (yum!)
import { ToastContainer, toast } from 'react-toastify';
import { CW_API_ENDPOINTS } from '../../AppConstants';

type Inputs = {
  devotion: boolean
  email: string
  username: string
  password: string
}

function CWAuthComponent() {
    // Toast
    const notify = (input: string) => {
        toast.error(input, {
            theme: "dark",
            position: "top-right",
            // TODO: Bring up with William - use img of his head, not Logo?
            icon: ({theme, type}) =>  <img src={carWorldImg}/>
        })
    }

    // State-managed auth form toggle - Register or Login
    const [showRegister, setShowRegister] = useState(true);
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<Inputs>()

    // Form Requirements
    const checkboxValidator = (value: any, formValues: any) => value
    const checkboxRequirements = {
        required: { value: true, message: "YOU MUST DEVOTE TO WILLIAM BANKS"},
        validate: checkboxValidator
    }
    const usernameRequirements = {
        required: { value: true, message: "Username is required"},
        minLength: { value: 6, message: "Username must be at least 6 characters long" },
        maxLength: { value: 64, message: "Username cannot exceed 64 characters long" },
    }
    const emailRequirements = {
        required: { value: true, message: "Valid Email is required"},
        maxLength: { value: 84, message: "Email cannot exceed 84 characters long" },
    }
    const passwordRequirements = {
        required: { value: true, message: "Password is required"},
        minLength: { value: 6, message: "Password must be at least 6 characters long" },
        maxLength: { value: 64, message: "Password cannot exceed 64 characters long" },
    }

    // ERROR HANDLING
    // This section ensure failed form submissions spit out specific errors,
    // as toasts, to the user
    const onClickLogin = () => {
        console.log("in onClickLogin")
        console.log(errors)

        if(errors?.email) {
            notify(errors?.email?.message || "")
        }
        if(errors?.password) {
            notify(errors?.password?.message || "")
        }
    }
    const onClickRegister = () => {
        console.log("in onClickRegister")
        console.log(errors)

        if(errors?.email) {
            notify(errors?.email?.message || "")
        }
        if(errors?.password) {
            notify(errors?.password?.message || "")
        }
        if(errors?.username) {
            notify(errors?.username?.message || "")
        }
        if(errors?.devotion) {
            notify(errors?.devotion?.message || "")
        }
    }

    // FORM SUBMISSION
    // Send validated input to backend, handle response
    const onSubmit: SubmitHandler<Inputs> = async (data: any) => {
        console.log(data)
        const registerRawApiRes = await fetch(CW_API_ENDPOINTS.auth.register, {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*"
            },
            body: JSON.stringify({ username: data.username, password: data.password, email: data.email }),
        })
        const registerRes = await registerRawApiRes.json()

        console.log(registerRes)

        if (registerRes.code === 200) {
        // TODO: Get rid of body, but data in header
         const loginRawApiRes = await fetch(CW_API_ENDPOINTS.auth.login, {
            method: "GET",
            headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*"
            },
            body: JSON.stringify({ username: data.username, password: data.password }),
        })
        const loginRes = await loginRawApiRes.json()

        console.log(loginRes)
        }
    }

    // Register Form
    const registerForm = () => {
        return (
        <div className="Auth-form-container">
            { /* RegisterForm */ }
            <form className="Auth-form-register" onSubmit={handleSubmit(onSubmit)}>
                <div className="Auth-form-content">

                    { /* Form Header */ }
                    <div className="form-header">
                        { /* Title */ }
                        <div className="Auth-form-title">
                            Register
                        </div>

                        { /* Toggle for Signup form */ }
                        <div className="text-center">
                            Already registered?
                            <p className="displayed-form-toggle"
                            onClick={() => setShowRegister(false)}>
                            Sign in!
                            </p>
                        </div>
                    </div>

                    { /* Email */ }
                    <div className="form-group mt-3">
                        <label>
                            Email address
                        </label>
                        <input
                        type="email"
                        className="form-control mt-1"
                        placeholder="Email Address"
                        {...register("email", emailRequirements)}
                        />
                    </div>

                    { /* Username */ }
                    <div className="form-group mt-3">
                        <label>Username</label>
                        <input
                        type="username"
                        className="form-control mt-1"
                        placeholder="e.g Jane Doe"
                        {...register("username", usernameRequirements)}
                        />
                    </div>

                    { /* Password */ }
                    <div className="form-group mt-3">
                        <label>Password</label>
                        <input

                        type="password"
                        className="form-control mt-1"
                        placeholder="Password"
                        {...register("password", passwordRequirements)}
                        />
                    </div>

                    { /* Devotion checkbox */ }
                    <div className="devotion-checkbox">
                        <input type="checkbox"
                            id="devotion"
                            {...register("devotion", checkboxRequirements)}
                        />
                        <label>I hereby acknowledge my devotion to William Banks</label>
                    </div>

                    { /* Submission Button */ }
                    <div className="d-grid gap-2 mt-3">
                        <button
                            className="submit-form-button"
                            type="submit"
                            onClick={ () => onClickRegister() }
                        >
                            Submit
                        </button>
                    </div>
                </div>
            </form>
        </div>
        )
    }

    // Login Form
    const loginForm = () => {
        return (
        <div className="Auth-form-container">
            { /* Login form */ }
            <form className="Auth-form-login" onSubmit={handleSubmit(onSubmit)}>
                <div className="Auth-form-content">

                    { /* Form Header */ }
                    <div className="form-header">
                        { /* Title */ }
                        <div className="Auth-form-title">
                            Login
                        </div>

                        { /* Toggle for Signup form */ }
                        <div className="text-center">
                            Not registered yet?
                            <p className="displayed-form-toggle"
                            onClick={() => setShowRegister(true)}>
                            Sign up!
                            </p>
                        </div>
                    </div>

                    { /* Email */ }
                    <div className="form-group mt-3">
                        <label>
                            Email address
                        </label>
                        <input
                            type="email"
                            className="form-control mt-1"
                            placeholder="Email Address"
                            {...register("email", emailRequirements)}
                            />
                    </div>

                    { /* Password */ }
                    <div className="form-group mt-3">
                        <label>Password</label>
                        <input
                            type="password"
                            className="form-control mt-1"
                            placeholder="Password"
                            {...register("password", passwordRequirements)}
                        />
                    </div>

                    { /* Submission Button */ }
                    <div className="d-grid gap-2 mt-3">
                        <button
                            onClick={ () =>  onClickLogin() }
                            className="submit-form-button">
                            Submit
                        </button>
                    </div>
                </div>
            </form>
        </div>        )
    }

    // Auth page
    return (
        <div>
            <ToastContainer toastStyle={{ backgroundColor: "linear-gradient(#57504d, #2a2727)" }}/>
            { showRegister ? registerForm() : loginForm() }
        </div>
    )
}

export default CWAuthComponent
