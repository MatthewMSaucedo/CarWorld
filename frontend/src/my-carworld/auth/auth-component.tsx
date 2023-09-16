// Style
import './auth.scss'

// React State
import { useState } from "react"

// React Router
import { useNavigate } from 'react-router-dom'

// React Redux
import { useDispatch } from 'react-redux';
import { loginUser } from '../../redux/userSlice'

// React Hook Form
import { useForm, SubmitHandler } from "react-hook-form"

// Custom Hook
import useMediaQuery from '../../cw-common/functions/cw-media-query';

// Toast (yum!)
import { ToastContainer, toast } from 'react-toastify';
import carWorldImg from '../../logo.svg'

// Local imports
import { CW_API_ENDPOINTS } from '../../AppConstants';
import CWCommonLoadingComponent from '../../cw-common/components/loading/cw-common-loading-component';
import CWCommonNavbarComponent from '../../cw-common/components/navbar/cw-common-navbar-component';
import CWFooterComponent from '../../cw-common/components/footer/cw-footer-component';
import CWMobileNavbarComponent from '../../cw-common/components/navbar/cw-mobile-navbar-component';
import CWMobileBannerComponent from '../../cw-common/components/navbar/cw-mobile-banner-component';

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
        window.scrollTo(0, 0)

        // Show loading screen while API calls take place
        setApiIsLoading(true)

        // Call register
        const registerRes = await registerApiCall(data.username, data.password, data.email)
        if (registerRes.code !== 200) {
            setApiIsLoading(false)
            notify(registerRes.message)
            return
        }

        // Call login
        const loginRes = await loginApiCall(data.username, data.password)
        if (loginRes.code !== 200) {
            setApiIsLoading(false)
            notify(loginRes.message)
            return
        }
        // Parse login response
        const authToken: string = loginRes.body.tokens.auth
        const refreshToken: string = loginRes.body.tokens.refresh
        const userType: string = loginRes.body.userType
        const ddp: number = loginRes.body.ddp
        const joined: string = loginRes.body.joined

        // Update Redux store with new user info
        dispatch(loginUser({
            username: data.username,
            userType: userType,
            authToken: authToken,
            refreshToken: refreshToken,
            isLoggedIn: true,
            ddp: ddp,
            joined: joined
        }))

        // Show loading screen while API calls take place
        setApiIsLoading(true)

        // Navigate to profile
        navigate('/my_carworld')
    }
    const onLoginSubmit: SubmitHandler<Inputs> = async (data: any) => {
        window.scrollTo(0, 0)

        // Show loading screen while API calls take place
        setApiIsLoading(true)

        // Call login
        const loginRes = await loginApiCall(data.username, data.password)
        if (loginRes.code !== 200) {
            setApiIsLoading(false)
            notify(loginRes.message)
            return
        }
        // Parse login response
        const authToken: string = loginRes.body.tokens.auth
        const refreshToken: string = loginRes.body.tokens.refresh
        const userType: string = loginRes.body.userType
        const ddp: number = loginRes.body.ddp
        const joined: string = loginRes.body.joined


        // Update Redux store with new user info
        dispatch(loginUser({
            username: data.username.toLowerCase(),
            userType: userType,
            authToken: authToken,
            refreshToken: refreshToken,
            isLoggedIn: true,
            ddp: ddp,
            joined: joined
        }))

        // Show loading screen while API calls take place
        setApiIsLoading(true)

        // Navigate to profile
        navigate('/my_carworld')
    }

    // Register Form
    const registerForm = () => {
        return (
        <div className="auth-form-container">
            { /* RegisterForm */ }
            <form className={`auth-form-register${ isMediumDevice || isSmallDevice ? "-mobile" : "" }`}
                  onSubmit={handleSubmit(onRegisterSubmit)}>
                <div className={"auth-form-content"}>

                    { /* Form Header */ }
                    <div className="auth-form-header">
                        { /* Title */ }
                        <div className="auth-form-title">
                            Register
                        </div>

                        { /* Toggle for Signup form */ }
                        <div className="redirect-to-login">
                            Already registered?
                            <p className="displayed-form-toggle"
                            onClick={() => setShowRegister(false)}>
                            Sign in!
                            </p>
                        </div>
                    </div>

                    { /* Email */ }
                    <div className="auth-form-input">
                        <label className="auth-form-input-label">
                            Email Address
                        </label>
                        <input
                            type="email"
                            className="auth-form-input-field"
                            placeholder="e.g. williambanks500@gmail.com"
                            {...register("email", emailRequirements)}
                        />
                    </div>

                    { /* Username */ }
                    <div className="auth-form-input">
                        <label className="auth-form-input-label">
                            Your Name
                        </label>
                        <input
                            type="username"
                            className="auth-form-input-field"
                            placeholder="e.g. William Banks"
                            {...register("username", usernameRequirements)}
                        />
                    </div>

                    { /* Password */ }
                    <div className="auth-form-input">
                        <label className="auth-form-input-label">
                            Password
                        </label>
                        <input
                            type="password"
                            className="auth-form-input-field"
                            placeholder="e.g. kingmoon4"
                            {...register("password", passwordRequirements)}
                        />
                    </div>

                    { /* Devotion checkbox */ }
                    <div className="devotion-checkbox">
                        <input
                            className="devotion-input"
                            type="checkbox"
                            id="devotion"
                            {...register("devotion", checkboxRequirements)}
                        />
                        <label className="devotion-checkbox-label">
                            I hereby acknowledge my Devotion to William Banks.
                        </label>
                    </div>

                    { /* Submission Button */ }
                    <div className="auth-form-submit">
                        <button
                            className="submit-form-button-register"
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
        <div className="auth-form-container">
            { /* Login form */ }
            <form className={`auth-form-login${ isMediumDevice || isSmallDevice ? "-mobile" : "" }`}
                  onSubmit={handleSubmit(onLoginSubmit)}>
                <div className="auth-form-content">

                    { /* Form Header */ }
                    <div className="auth-form-header">
                        { /* Title */ }
                        <div className="auth-form-title">
                            Login
                        </div>

                        { /* Toggle for Signup form */ }
                        <div className="redirect-to-login">
                            Not registered yet?
                            <p className="displayed-form-toggle"
                            onClick={() => setShowRegister(true)}>
                            Sign up!
                            </p>
                        </div>
                    </div>

                    { /* Email */ }
                    <div className="auth-form-input">
                        <label className="auth-form-input-label">
                            Your Name
                        </label>
                        <input
                            type="username"
                            className="auth-form-input-field"
                            placeholder="e.g. William Banks"
                            {...register("username", emailRequirements)}
                            />
                    </div>

                    { /* Password */ }
                    <div className="auth-form-input">
                        <label className="auth-form-input-label">
                            Password
                        </label>
                        <input
                            type="password"
                            className="auth-form-input-field"
                            placeholder="e.g. kingmoon4"
                            {...register("password", passwordRequirements)}
                        />
                    </div>

                    { /* Submission Button */ }
                    <div className="auth-form-submit">
                        <button
                            onClick={ () => onClickLoginErrorHandling() }
                            className="submit-form-button-login">
                            Submit
                        </button>
                    </div>
                </div>
            </form>
        </div>        )
    }

    // Media query
    const isSmallDevice = useMediaQuery("only screen and (max-width : 768px)");
    const isMediumDevice = useMediaQuery(
        "only screen and (min-width : 769px) and (max-width : 992px)"
    );

    // Auth page
    return (

        <div>
            {/* Navbar */}
            { isMediumDevice || isSmallDevice ? CWMobileNavbarComponent() : CWCommonNavbarComponent() }

            {/* Add a yellow banner to mimic navbar for mobile */}
            {isMediumDevice || isSmallDevice ? CWMobileBannerComponent() : <></>}

            <div className="cw-auth-container">
                {/* Toast */}
                <ToastContainer
                    position="top-right"
                    toastStyle={{}}/>

                {/* Forms */}
                { apiIsLoading ? (<CWCommonLoadingComponent />) : (
                    showRegister ? registerForm() : loginForm()
                )}
            </div>

            {/* Footer */}
            { CWFooterComponent() }
        </div>
    )
}

export default CWAuthComponent
