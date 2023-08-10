// Style
import './auth.scss'
import carWorldImg from '../../logo.svg'

// React State
import { useState } from "react"

// React Router
import { useNavigate } from 'react-router-dom'

// React Redux
import { useDispatch } from 'react-redux';
import { loginUser } from '../../redux/userSlice'

// React Hook Form
import { useForm, SubmitHandler } from "react-hook-form"

// Toast (yum!)
import { ToastContainer, toast } from 'react-toastify';

// Local imports
import { CW_API_ENDPOINTS } from '../../AppConstants';
import CWCommonLoadingComponent from '../../cw-common/components/loading/cw-common-loading-component';
import CWCommonNavbarComponent from '../../cw-common/components/navbar/cw-common-navbar-component';

// Useful Typedefs
type Inputs = {
  devotion: boolean
  email: string
  username: string
  password: string
}

function CWAuthComponent() {
    // Stateful hooks
    //   Change to loading-screen while we wait on API calls
    //   Determine which form to show, login or register
    const [apiIsLoading, setApiIsLoading] = useState(false);
    const [showRegister, setShowRegister] = useState(true);

    // Navigation
    const navigate = useNavigate()

    // Redux
    const dispatch = useDispatch()

    // Toast
    const notify = (input: string) => {
        toast.error(input, {
            theme: "dark",
            position: "top-right",
            // TODO: Bring up with William - use img of his head, not Logo?
            icon: ({theme, type}) =>  <img src={carWorldImg}/>
        })
    }

    // Form inputs
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
        minLength: { value: 4, message: "Username must be at least 4 characters long" },
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
    const onClickLoginErrorHandling = () => {
        if(errors?.email) {
            notify(errors?.email?.message || "")
        }
        if(errors?.password) {
            notify(errors?.password?.message || "")
        }
    }
    const onClickRegisterErrorHandling = () => {
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

    // API CALLS
    // Make calls to register and login
    const loginApiCall = async (username: string, password: string) => {
        const loginRawApiRes = await fetch(CW_API_ENDPOINTS.auth.login, {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*"
        },
        body: JSON.stringify({ username: username, password: password }),

        })
        const loginRes = await loginRawApiRes.json()

        return loginRes
    }
    const registerApiCall = async (username: string, password: string, email: string) => {
        const registerRawApiRes = await fetch(CW_API_ENDPOINTS.auth.register, {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*"
            },
            body: JSON.stringify({ username: username, password: password, email: email }),
        })
        const registerRes = await registerRawApiRes.json()

        return registerRes
    }


    // FORM SUBMISSION
    // Send validated input to backend, handle response
    const onRegisterSubmit: SubmitHandler<Inputs> = async (data: any) => {
        // Show loading screen while API calls take place
        setApiIsLoading(true)

        // Call register
        const registerRes = await registerApiCall(data.username, data.password, data.email)
        if (registerRes.code !== 200) {
            // TODO: Error handle
            return
        }

        // Call login
        const loginRes = await loginApiCall(data.username, data.password)
        if (loginRes.code !== 200) {
            // TODO: Error handle
            return
        }
        // Parse login response
        const authToken: string = loginRes.body.tokens.auth
        const refreshToken: string = loginRes.body.tokens.refresh
        const userType: string = loginRes.body.userType
        const ddp: number = loginRes.body.ddp


        // Update Redux store with new user info
        dispatch(loginUser({
            username: data.username,
            userType: userType,
            authToken: authToken,
            refreshToken: refreshToken,
            isLoggedIn: true,
            ddp: ddp
        }))

        // Show loading screen while API calls take place
        setApiIsLoading(true)

        // Navigate to profile
        navigate('/my_carworld')
    }
    const onLoginSubmit: SubmitHandler<Inputs> = async (data: any) => {
        // Show loading screen while API calls take place
        setApiIsLoading(true)

        // Call login
        const loginRes = await loginApiCall(data.username, data.password)
        if (loginRes.code !== 200) {
            // TODO: Error handle
            return
        }
        // Parse login response
        const authToken: string = loginRes.body.tokens.auth
        const refreshToken: string = loginRes.body.tokens.refresh
        const userType: string = loginRes.body.userType
        const ddp: number = loginRes.body.ddp


        // Update Redux store with new user info
        dispatch(loginUser({
            username: data.username,
            userType: userType,
            authToken: authToken,
            refreshToken: refreshToken,
            isLoggedIn: true,
            ddp: ddp
        }))

        // Show loading screen while API calls take place
        setApiIsLoading(true)

        // Navigate to profile
        navigate('/my_carworld')
    }

    // Register Form
    const registerForm = () => {
        return (
        <div className="Auth-form-container">
            { /* RegisterForm */ }
            <form className="Auth-form-register" onSubmit={handleSubmit(onRegisterSubmit)}>
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
                            onClick={ () => onClickRegisterErrorHandling() }
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
            <form className="Auth-form-login" onSubmit={handleSubmit(onLoginSubmit)}>
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
                            Username
                        </label>
                        <input
                            type="username"
                            className="form-control mt-1"
                            placeholder="e.g Jane Doe"
                            {...register("username", emailRequirements)}
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
                            onClick={ () =>  onClickLoginErrorHandling() }
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
        apiIsLoading ? (<CWCommonLoadingComponent />) : (
            <div className="my-carworld-container">
                <CWCommonNavbarComponent />
                <ToastContainer toastStyle={{ backgroundColor: "linear-gradient(#57504d, #2a2727)" }}/>
                { showRegister ? registerForm() : loginForm() }
            </div>
        )
    )
}

export default CWAuthComponent
