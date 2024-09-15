import { useRef } from "react";
import { invoke } from "../utilities/services";

function Login() {

    const email = useRef(null);
    const password = useRef(null);

    function handleSubmit(e) {
        e.preventDefault();
        invoke('users/login', {
            email: email.current.value,
            password: password.current.value,
        }).then(result => {
            if(result?.user) window.location.pathname = "/calendar";
        })

    }

    return (
        <div className="container">
            <form className="login-form" onSubmit={handleSubmit}>
                <label className="input-label">Email</label>
                <input type="email" placeholder="john.doe@email.com" className="input-field" required ref={email} />
                <label className="input-label">Password</label>
                <input type="password" placeholder="password" className="input-field" required ref={password} />
                <input type="submit" className="input-field submit-button" />
            </form>
        </div>
    )
}

export default Login;