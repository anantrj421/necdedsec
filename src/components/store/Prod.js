import React, {useEffect} from 'react'

const Prod = (props) => {
    useEffect(() => {
        window.scrollTo(0, 0)
    })
    const home = () => {
        props.history.push('/login');
    }
    return (
        <div>
            <button className="btn btn-success lg" onClick={home}><i className="fas fa-sign-out-alt"></i></button>
            <div className="container st">
                <div className="row">
                    <div className=" cd" style={{ width: "30%" }}>
                        <img className="card-img-top im"
                            src="https://img.freepik.com/free-photo/rosemary-essential-oil-glass-dropper-bottle-with-fresh-green-rosemary-herb-old-wood_129199-50.jpg?size=626&ext=jpg" alt="image1"></img>
                        <h3 className="card-title">Product: Betaferon</h3>
                        <button className="btn btn-primary">Buy Now at $10.50</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Prod