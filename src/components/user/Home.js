import React, {useEffect} from 'react'

const Home = (props) => {
    useEffect(() => {
        window.scrollTo(0, 0)
    })
    const onClick = () => {
        props.history.push('/login');
    }
    return (
            <div className="home">
                <h3 id="fst">For Those who work in Acres,</h3>
                <h3 id="dwn">Not in Hours</h3>
                <button className="btn btn-danger" onClick={onClick}>Start</button>
            </div>
    )
}
export default Home;