// Style
import './auth.scss'
import carWorldImg from '../../logo.svg'

// React state
import { useState } from "react"

// React Hook Form
import { useForm, SubmitHandler } from "react-hook-form"

// Toast (yum!)
import { ToastContainer, toast } from 'react-toastify';

type Inputs = {
  devotion: boolean
  email: string
  fullName: string
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
    const fullNameRequirements = {
        required: { value: true, message: "Full Name is required"},
        minLength: { value: 6, message: "Full Name must be at least 6 characters long" },
    }
    const emailRequirements = {
        required: { value: true, message: "Valid Email is required"},

    }
    const passwordRequirements = {
        required: { value: true, message: "Password is required"},
        minLength: { value: 6, message: "Password must be at least 6 characters long" },
    }

    // Form submission
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
        if(errors?.fullName) {
            notify(errors?.fullName?.message || "")
        }
        if(errors?.devotion) {
            notify(errors?.devotion?.message || "")
        }
    }
    const onSubmit: SubmitHandler<Inputs> = (data: any) => {
        console.log("in onSubmit")
    }

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

                    { /* Full Name */ }
                    <div className="form-group mt-3">
                        <label>Full Name</label>
                        <input
                        type="username"
                        className="form-control mt-1"
                        placeholder="e.g Jane Doe"
                        {...register("fullName", fullNameRequirements)}
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

    return (
        <div>
            <ToastContainer toastStyle={{ backgroundColor: "linear-gradient(#57504d, #2a2727)" }}/>
            { showRegister ? registerForm() : loginForm() }
        </div>
    )
}

export default CWAuthComponent
