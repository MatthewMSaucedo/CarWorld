// Style
import './auth.scss'

// React state
import { useState } from "react"

// React Hook Form
import { useForm, SubmitHandler } from "react-hook-form"

type Inputs = {
  example: string
  exampleRequired: string
}

function CWAuthComponent() {
    // State-managed auth form toggle - Register or Login
    /* const [showRegister, setShowRegister] = useState(true); */

    /* const { register } = useForm<Inputs>() */
    /* const { handleSubmit } = useForm<Inputs>() */

    // Form submission
    const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data)
    const showRegister = true

    const registerForm = () => {
        return (
        <div className="Auth-form-container">
            <form className="Auth-form-register" >
                <div className="Auth-form-content">
                    <div className="Auth-form-title">
                        Register
                    </div>
                    <div className="text-center">
                        Already registered?
                        <p className="link-primary" >
                        Sign in!
                        </p>
                    </div>
                    <div className="form-group mt-3">
                        <label>
                            Email address
                        </label>
                        <input
                        type="email"
                        className="form-control mt-1"
                        placeholder="Email Address"

                        />
                    </div>
                    <div className="form-group mt-3">
                        <label>Full Name</label>
                        <input
                        type="username"
                        className="form-control mt-1"
                        placeholder="e.g Jane Doe"
                        />
                    </div>
                    <div className="form-group mt-3">
                        <label>Password</label>
                        <input

                        type="password"
                        className="form-control mt-1"
                        placeholder="Password"
                        />
                    </div>

                    <input type="checkbox" id="devote" name="devote" />
                    <label>I hereby acknowledge my Devotion to William Banks</label>

                    <div className="d-grid gap-2 mt-3">
                        <button type="submit" className="btn btn-primary">
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
            <form className="Auth-form-login">
                <div className="Auth-form-content">
                    <div className="Auth-form-title">Sign In</div>
                    <div className="text-center">
                        Not registered yet?{" "}
                        <span className="link-primary" >
                            Sign Up
                        </span>
                        </div>
                        <div className="form-group mt-3">
                        <label>Email address</label>
                        <input
                            type="email"
                            className="form-control mt-1"
                            placeholder="Enter email"
                        />
                        </div>
                        <div className="form-group mt-3">
                        <label>Password</label>
                        <input
                            type="password"
                            className="form-control mt-1"
                            placeholder="Enter password"
                        />
                    </div>
                    <div className="d-grid gap-2 mt-3">
                        <button type="submit" className="btn btn-primary">
                            Submit
                        </button>
                    </div>
                </div>
            </form>
        </div>        )
    }

    return showRegister ? (
        registerForm()
    ) : (
        loginForm()
    )
}

export default CWAuthComponent
