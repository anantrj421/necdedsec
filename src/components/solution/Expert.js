import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Giphy from './loader.gif'
const Expert = (props) => {
    const [mail, setMail] = useState({
        sent: false,
        loading: false,
        subj: "Need of expert advice regarding crop disease",
        body: "Problem identified by the classifer " + props.location.state.vc + " with a temperature of " + props.location.state.vt +
            "K, humidity " + props.location.state.vh + " percentage " + " and pressure " + props.location.state.vp + " Pascal"
    })
    const { sent, loading, subj, body } = mail
    const home = () => {
        props.history.push('/login');
    }
    const onChange = e => {
        setMail({ ...mail, [e.target.name]: e.target.value })
    }
    const onSubmit = async e => {
        e.preventDefault();
        setMail({
            loading: true,
        })
        const resp = await axios.post('https://fapimail.p.rapidapi.com/email/send',
            {
                recipient: 'anant.rj.421@gmail.com',
                sender: 'axcelblaze.13@gmail.com',
                subject: subj,
                message: body
            },
            {
                headers:
                {
                    'x-rapidapi-host': 'fapimail.p.rapidapi.com',
                    'x-rapidapi-key': 'eb378e65dfmsh2709d2ee1e0b591p193b92jsn1820d2d36ffc',
                    'content-type': 'application/json',
                    accept: 'application/json'
                }
            }
        )
        console.log(resp)
        setMail({
            ...mail,
            loading: false,
            sent: true
        })
    }
    const dashb = () => {
        props.history.push('/dashboard');
    }
    useEffect(() => {
        window.scrollTo(0, 0)
        console.log(props)
    })
    if (sent) {
        return (
            <div>
                {loading ? <img src={Giphy} alt="loading" style={{ width: "70px" }}></img> :
                    <div>
                        <button className="btn btn-success lg" onClick={home}><i className="fas fa-sign-out-alt"></i></button>
                        <div className="container ty">
                            <h3>Thanks for your submission, we'll get back to you. <i className="fas fa-smile"></i></h3>
                            <button className="btn" onClick={dashb}><i className="fas fa-home"></i></button>
                        </div>
                    </div>}
            </div>
        )
    }
    else {
        return (
            <div>
                <button className="btn btn-success lg" onClick={home}><i className="fas fa-sign-out-alt"></i></button>
                <div className="container email">
                    <form onSubmit={onSubmit}>
                        <div className="form-group">
                            <input autoComplete="off" type="text" className="form-control" name="subj" value={subj} placeholder="Subject Goes Here" onChange={onChange} />
                        </div>
                        <div className="form-group">
                            <textarea rows="10" type="text" className="form-control" id="exampleInputPassword1" placeholder="Your Problem Goes Here" name="body" value={body}
                                onChange={onChange} />
                        </div>
                        <button type="submit" className="btn btn-success eml">Send Mail To Expert</button>
                    </form>
                </div>
            </div>
        )
    }
}
export default Expert