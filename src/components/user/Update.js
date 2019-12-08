import React, { useEffect } from 'react'

const Update = (props) => {
    const home = () => {
        props.history.push('/login');
    }
    useEffect(() => {

    })
    return (
        <div>
            <button className="btn btn-success lg" onClick={home}><i className="fas fa-sign-out-alt"></i></button>
            <div className="container st">
                <div className="row">
                    <div className="up cd col-sm" style={{ width: "50%" }}>
                        <h3 className="card-title">Weather :</h3>
                        <h4>Moderate weather expected coming week</h4>
                        <h3 className="card-title">Diseases :</h3>
                        <h4>Bacterial Plight among lemon leaves</h4>
                        <h3 className="card-title">Suggestion for prevention :</h3>
                        <h4>Remove infected plants and ensure proper spacing between new plants</h4>
                    </div>
                </div>
                <div className="col-sm">
                    <h3>Map :</h3>
                    {/* <div id="map" style={{ height: "100%", width: "100px" }}></div> */}
                    <iframe title="map2"
                        style={{ width: "100%", height: "500px", border: "none" }}
                        src="https://www.google.com/maps/embed/v1/streetview?key=AIzaSyDEphx8dTijVXd76E9WPBTXXbS4EpoUHgE&location=25.262182,85.478806&heading=210&pitch=20&fov=55" allowfullscreen>
                    </iframe>
                </div>
            </div>
        </div>
    )
}
export default Update