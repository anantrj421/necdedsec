import React, { useEffect, useState } from 'react'
import Giphy from './loader.gif'
import * as firebase from 'firebase'
const Share = (props) => {
    useEffect(() => {
        window.scrollTo(0, 0)
    })
    const [pn, setPn] = useState({
        nm: '',
        phn: '',
        loading: false,
        sent: false,
    })
    var firebaseConfig = {
        apiKey: "AIzaSyDEbORlMjMpUWOajY8QHEqkwuTy5dNjcsI",
        authDomain: "fir-d3c89.firebaseapp.com",
        databaseURL: "https://fir-d3c89.firebaseio.com",
        projectId: "fir-d3c89",
        storageBucket: "fir-d3c89.appspot.com",
        messagingSenderId: "396880130439",
        appId: "1:396880130439:web:3b53f8bc39b866f6"
    };
    if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
    }

    const { nm, phn, loading, sent } = pn
    const home = () => {
        props.history.push('/login');
    }
    const onChange = e => {
        setPn({ ...pn, [e.target.name]: e.target.value })
    }
    const onSubmit =  e => {
        e.preventDefault();
        setPn({
            ...pn,
            loading: true,
        })
        var newPostKey = firebase.database().ref().child('dealer').push().key;
        firebase.database().ref('dealer/' + newPostKey).set({
            area: props.location.state.va,
            disease: props.location.state.vc,
            name: nm,
            phone: phn
        });
        setPn({
            ...pn,
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
                            <h3>Your details have been shared.<i className="fas fa-smile"></i></h3>
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
                <div className="container log">
                    <form onSubmit={onSubmit}>
                        <div className="form-group">
                            <input autoComplete="off" type="text" className="form-control" name="nm" value={nm} placeholder="Enter Your Name" onChange={onChange} />
                        </div>
                        <div className="form-group">
                            <input autoComplete="off" type="text" className="form-control" name="phn" value={phn} placeholder="Enter Your Contact Number" onChange={onChange} />
                        </div>
                        <button type="submit" className="btn btn-success eml">Share Details</button>
                    </form>
                </div>
            </div>
        )
    }
}
export default Share