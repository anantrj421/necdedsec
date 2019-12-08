import React, { useState, useEffect } from 'react'
import axios from 'axios'
import * as firebase from 'firebase'
import Giphy from './loader.gif'
const Form = (props) => {
    useEffect(() => {
        window.scrollTo(0, 0)
    })
    const [res, setRes] = useState(
        {
            selectedFile: null,
            temp: 0,
            humid: "",
            press: "",
            classi: "",
            add: "",
            loading: false,
            url: "",
            hm: 1,
            bn: false
        }
    )
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

    const { selectedFile, temp, humid, press, classi, add, loading, url, hm, bn } = res;
    const submit = async e => {
        e.preventDefault();
        setRes({
            ...res,
            loading: true,
            hm: 0
        })
        var lat = 0
        var long = 0
        navigator.geolocation.getCurrentPosition(showPosition);
        async function showPosition(position) {
            lat = position.coords.latitude;
            long = position.coords.longitude;
            console.log(lat + " " + long);
            const fd = new FormData();
            fd.append('image', selectedFile, selectedFile.name);
            fd.append('lat', lat)
            fd.append('long', long)
            const resp = await axios.post('http://127.0.0.1:5000/', fd);
            var newPostKey = firebase.database().ref().child('loc').push().key;
            firebase.database().ref('loc/' + newPostKey).set({
                location: resp.data.address,
                disease: resp.data.class
            });
            console.log(resp.data)
            setRes({
                ...res,
                temp: resp.data.temp,
                humid: resp.data.humidity,
                press: resp.data.pressure,
                classi: resp.data.class,
                add: resp.data.address,
                op: 1,
                loading: false,
                hm: 0
            })
            if(resp.data['class'].includes('healthy')){
                setRes({
                    ...res,
                    temp: resp.data.temp,
                    humid: resp.data.humidity,
                    press: resp.data.pressure,
                    classi: resp.data.class,
                    add: resp.data.address,
                    op: 1,
                    loading: false,
                    hm: 0,
                    bn: false,
                })
            }
            else{
                setRes({
                    ...res,
                    temp: resp.data.temp,
                    humid: resp.data.humidity,
                    press: resp.data.pressure,
                    classi: resp.data.class,
                    add: resp.data.address,
                    op: 1,
                    loading: false,
                    hm: 0,
                    bn: true
                })
            }
        }
        // const fd = new FormData();
        // fd.append('image', selectedFile, selectedFile.name);
        // fd.append('lat', lat)
        // fd.append('long', long)
        // const res = await axios.post('http://127.0.0.1:5000/', fd);
        // console.log(res.data.temp)
        // setRes({
        //     temp: res.data.temp,
        //     classi: res.data.class,
        //     add: res.data.address,
        //     op: 1
        // })
    }
    const onChange = e => {
        let reader = new FileReader();
        let file = e.target.files[0]
        reader.onloadend = () => {
            setRes({
                ...res,
                selectedFile: file,
                url: reader.result
            })
        }
        reader.readAsDataURL(file)
    }
    const home = () => {
        props.history.push('/login');
    }
    const gotoSugg = () => {
        console.log(classi)
        props.history.push({
            pathname: '/suggest',
            state: { datac: classi, datat: temp, datap: press, datah: humid, dataa: add }
        });
    }
    return (
        <div>
            <button className="btn btn-success lg" onClick={home}><i className="fas fa-sign-out-alt"></i></button>
            <div className="main">
                {hm ? <form onSubmit={submit}>
                    <div className="form-group">
                        <h2>Enter Your sample image</h2>
                        <input id="img"
                            type="file"
                            className="form-control-file" onChange={onChange}
                            name="img" />
                        <button type="submit" className="btn btn-success">Submit</button>
                    </div>
                </form> : null}
                {url === '' ? null : <div><img className="prv" src={url}></img></div>}
                {classi ?
                    <div className="op">
                        <h2>Result of analysis of the crop sample : </h2>
                        <h4>{classi}</h4>
                        <h2>Your Location</h2>
                        <h4>{add}</h4>
                        <h2>Humidity</h2>
                        <h4>{humid} %</h4>
                        <h2>Pressure</h2>
                        <h4>{press} Pascal</h4>
                        <h2>Weather of your area : </h2>
                        <h4>{temp < 278 ? <i className="fas fa-snowflake"><p> Cold</p></i> : temp < 303 ? <i className="fas fa-cloud-sun"><h4> Moderate</h4></i> : <i class="fas fa-sun"><p> Hot</p></i>}</h4>

                        {bn?<button className="btn btn-danger" onClick={gotoSugg} style={{ border: "none" }}>Suggested Solutions</button>:<h2>Your crop is healthy <i class="fas fa-seedling"></i></h2>}
                    </div>
                    :
                    <div>{loading ? <img src={Giphy} alt="loading" style={{ width: "70px" }}></img> : null}</div>
                }
            </div>
        </div>
    )
}
export default Form;
