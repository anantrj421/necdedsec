import React, { useEffect } from 'react'

const Dashboard = (props) => {
    const onClick = e => {
        props.history.push('/form')
    }
    const onFarm = e => {
        props.history.push('/store')
    }
    const home = () => {
        props.history.push('/login');
    }
    const onReport = () => {
        props.history.push('/report')
    }
    useEffect(() => {
        window.scrollTo(0, 0)
    })
    return (
        <div>
            <button className="btn btn-success lg" onClick={home}><i className="fas fa-sign-out-alt"></i></button>
            <div className="container">
                <div className="row ds">
                    <div className="card col-sm">
                        <img className="card-img-top im"
                            src="https://img.freepik.com/free-photo/farmer-standing-rice-field-with-tablet_1150-6062.jpg?size=626&ext=jpg"
                            alt="pic1" />
                        <div className="card-body">
                            <a href="http://localhost:5000/update" className="btn btn-success"><i className="fas fa-database"></i> Updates</a>
                        </div>
                    </div>
                    <div className="card col-sm">
                        <img className="card-img-top im"
                            src="https://img.freepik.com/free-photo/leaves-potato-with-diseases_72572-652.jpg?size=626&ext=jpg"
                            alt="pic1" />
                        <div className="card-body">
                            <button className="btn btn-success" onClick={onClick}><i className="fas fa-leaf"></i> Predict Condition</button>
                        </div>
                    </div>

                    <div className="card col-sm">
                        <img className="card-img-top im"
                            src="https://img.freepik.com/free-photo/hands-men-are-pouring-chemical-fertilizers-into-seedlings_38663-485.jpg?size=626&ext=jpg"
                            alt="pic1" />
                        <div className="card-body">
                            <button className="btn btn-success" onClick={onFarm}><i class="fas fa-store-alt"></i> Access Farm Store</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Dashboard