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
    const [showRegister, setShowRegister] = useState(true);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<Inputs>()

    // Form submission
    const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data)

    const registerForm = () => {
        return (
        <div className="Auth-form-container">
            <form className="Auth-form-register" onSubmit={handleSubmit(onSubmit)}>
                <div className="Auth-form-content">
                    <div className="Auth-form-title">
                        Register
                    </div>
                    <label>Example</label>
                    <input {...register("example")} defaultValue="test" />
                    <label>ExampleRequired</label>
                    <input
                        {...register("exampleRequired", { required: true, maxLength: 10 })}
                    />
                    {errors.exampleRequired && <p>This field is required</p>}
                    <input type="submit" />
                    <input type="checkbox" id="devote" name="devote" />
                    <label>I hereby acknowledge my Devotion to William Banks</label>

                    {errors.exampleRequired && <p>This field is required</p>}

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
                        <span className="link-primary" onClick={ () => setShowRegister(true)}>
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
