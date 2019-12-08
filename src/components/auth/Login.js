import React, { useState } from 'react'
import Alert from '../alert/Alert'
const Login = (props) => {
    const [user, setUser] = useState({
        userid: '',
        psd: '',
        alert: 0
    })
    const { userid, psd, alert } = user;
    const onChange = e => {
        setUser({ ...user, [e.target.name]: e.target.value })
    }
    const onSubmit = e => {
        e.preventDefault();
        if (userid === 'raj321' && psd === '123456') {
            props.history.push('/dashboard');
        }
        else if(userid === 'shyam' && psd === '123456'){
            window.location.href="http://localhost:5000/dealer"
        }
        else {
            setUser({ alert: 1 })
            setTimeout(() => {
                setUser({ ...user, alert: 0 })
            }, 2000);
        }
    }
    return (
        <div>
            <div className="container log">
                <form onSubmit={onSubmit}>
                    <div className="form-group">
                        <label><strong>Login ID</strong></label>
                        <input autoComplete="off" type="text" className="form-control" name="userid" value={userid} placeholder="Enter Login ID" onChange={onChange} />
                    </div>
                    <div className="form-group">
                        <label><strong>Password</strong></label>
                        <input type="password" className="form-control" id="exampleInputPassword1" name="psd" value={psd}
                            placeholder="Enter Password" onChange={onChange} />
                    </div>
                    <button type="submit" className="btn btn-success">Submit</button>
                </form>
                {alert ? <Alert></Alert> : null}
            </div>
        </div>
    )
}
export default Login;