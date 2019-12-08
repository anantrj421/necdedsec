import React, { useState, useEffect } from 'react'
import axios from 'axios'
const Report = (props) => {
    const [soila, setSoil] = useState({
        loading: false,
        mois: "",
        dt: "",
        di: "",
        weath: "",
        humid: ""
    })
    const { loading, mois, dt, di, weath, humid } = soila
    const home = () => {
        props.history.push('/login');
    }
    const onSubmit = async e => {
        e.preventDefault();
        setSoil({
            loading: true,
        })
        const resp = await axios.post('http://api.agromonitoring.com/agro/1.0/polygons?appid=4bda67a0fffefc422e36a24983203020',
            {
                "name": "Polygon_Sample",
                "geo_json": {
                    "type": "Feature",
                    "properties": {
                    },
                    "geometry": {
                        "type": "Polygon",
                        "coordinates": [
                            [
                                [50.033069, 56.044264],
                                [50.038819, 56.044743],
                                [50.042768, 56.038438],
                                [50.042081, 56.038223],
                                [50.036759, 56.038462],
                                [50.033069, 56.044264]
                            ]
                        ]
                    }
                }
            },
            {
                headers: { 'Content-Type': 'application/json' }
            }
        )
        console.log(resp.data.id)
        const res = await axios.get('http://api.agromonitoring.com/agro/1.0/soil?polyid=' + resp.data.id + '&appid=4bda67a0fffefc422e36a24983203020')
        console.log(res.data)
        setSoil({
            ...soila,
            loading: false,
            mois: res.data.moisture,
            dt: res.data.dt,
            di: res.data.t0,
            weath: "Rainy weather in coming week",
            humid: "98%"
        })
    }
    useEffect(() => {
        window.scrollTo(0, 0)
    })
    return (
        <div>
            <button className="btn btn-success lg" onClick={home}><i className="fas fa-sign-out-alt"></i></button>
            <div className="container soil">
                <div className="row ">
                    <div className="card col-sm">
                        <div className="card-body">
                            <button onClick={onSubmit} className="btn btn-success">Get Soil and Weather Data</button>
                        </div>
                    </div>
                </div>
                {loading === false && mois ? <div className="row ">
                    <div className="card col-sm">
                        <h2>Updates for this week</h2>
                        <h3>Soil Moisture:</h3>
                        <h4> {mois}</h4>
                        <h3>Time of Data Calculation: </h3>
                        <h4>{new Date().toLocaleString()}</h4>
                        <h3>Soil Surface Temperature:</h3>
                        <h4> {di} Kelvins</h4>
                        <h3>Weather:</h3>
                        <h4> {weath}</h4>
                        <h3>Humidity:</h3>
                        <h4> {humid}</h4>
                    </div>
                </div> :
                    null
                }
            </div>
        </div>
    )
}
export default Report