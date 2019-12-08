import React, { useEffect, useState } from 'react'

const Suggest = (props) => {
    const [url, setUrl] = useState({
        urll: "https://www.google.com/maps/embed/v1/search?key=AIzaSyDEphx8dTijVXd76E9WPBTXXbS4EpoUHgE&q=farm+stores+in+indiranagar"
    })
    const { urll } = url;
    useEffect(() => {
        window.scrollTo(0, 0)
    })
    const onClick = () => {
        props.history.push('/login');
    }
    const gotoProd = () => {
        props.history.push('/prod')
    }
    const gotoExp = () => {
        props.history.push({
            pathname: '/expert',
            state: { vc: props.location.state.datac, vt: props.location.state.datat, vp: props.location.state.datap, vh: props.location.state.datah }
        })
    }
    const onShare = ()=> {
        props.history.push({
            pathname: '/share',
            state: { vc: props.location.state.datac, va: props.location.state.dataa }
        });
    }
    return (
        <div>
            <button className="btn btn-success lg" onClick={onClick}><i className="fas fa-sign-out-alt"></i></button>
            <div className="container sugg">
                <div className="row ds">
                    <div className="card col-sm">
                        <img className="card-img-top im"
                            src="https://img.freepik.com/free-photo/closeup-senior-lecturer-with-arms-crossed_1262-1753.jpg?size=626&ext=jpg"
                            alt="pic1" />
                        <div className="card-body">
                            <button className="btn btn-success" onClick={gotoExp}><i className="fas fa-glasses"></i> Expert Opinion</button>
                        </div>
                    </div>
                    <div className="card col-sm">
                        <img className="card-img-top im"
                            src="https://img.freepik.com/free-photo/mineral-chemical-granulated-fertilizer-hands-woman_116407-2053.jpg?size=626&ext=jpg"
                            alt="pic1" />
                        <div className="card-body">
                            <button className="btn btn-success" onClick={gotoProd}><i className="fas fa-shopping-cart"></i> Suggested Product</button>
                        </div>
                    </div>
                </div>
                <div className="row ds" style={{textAlign:"center"}}>
                    <div className="col-sm">
                        <button className="btn btn-success" onClick={onShare}><i className="fas fa-info-circle"></i> Share Details</button>
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm">
                        <h3 id="mp">Nearby stores</h3>
                        <iframe title="map"
                            style={{ width: "100%", height: "500px", border: "none" }}
                            src={urll} allowfullscreen>
                        </iframe>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Suggest;