import React, { useState, useEffect } from 'react'
import axios from 'axios';
import Giphy from './loader.gif'
const Store = () => {
    const [prod, setprod] = useState({
        key: '',
        price: [],
        arr: [],
        loaded: true,
    })
    const { key, price, arr, loaded } = prod;
    const onChange = e => {
        setprod({
            ...prod, [e.target.name]: e.target.value
        })
    }
    useEffect(() => {
        window.scrollTo(0, 0)
    })
    const onClick = async e => {
        e.preventDefault();
        setprod({
            ...prod,
            loaded: false
        })
        const res = await axios.get("https://amazon-price.p.rapidapi.com/azapi-azSearch?prime=false&query=" + key + "&page=1", {
            "headers": {
                "x-rapidapi-host": "amazon-price.p.rapidapi.com",
                "x-rapidapi-key": "80ccadac81msh2093ebdef8602e2p12593fjsn3e38e07f5aa0"
            }
        })

        for (var i = 4, j = 0; i < 7; i++) {
            arr[i] = res.data.results[i].asin
            const rs = await axios.get("https://amazon-price.p.rapidapi.com/azapi-bulkPrice?asins=" + arr[i] + "&marketplace=US", {
                "headers": {
                    "x-rapidapi-host": "amazon-price.p.rapidapi.com",
                    "x-rapidapi-key": "80ccadac81msh2093ebdef8602e2p12593fjsn3e38e07f5aa0"
                }
            })
            price[j++] = rs.data[arr[i]]
        }
        console.log("price " + price)
        setprod({
            ...prod,
            loaded: false
        })
    }
    if (price.length !== 0) {
        return (
            <div>
                <div id="sr">
                    <form onSubmit={onClick}>
                        <input type="text" className="form-control"
                            autoComplete="off"
                            name="key"
                            value={key}
                            placeholder="Look for products"
                            onChange={onChange}></input>
                        <button className="btn btn-success" style={{ fontWeight: "bold", padding: "10px 10px 10px 10px" }}>Search</button>
                    </form>
                </div>
                <div className="container st">
                    {price.map(p => (
                        <div className="row">
                            <div className="col-sm cd">
                                <h3 className="card-title">Product :</h3>
                                <h5>{p.title}</h5>
                                <h4>Price : {p.price}</h4>
                                <button className="btn btn-primary">Buy Now</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

        )
    }
    else {
        return (
            <div>
                <div id="sr">
                    <form onSubmit={onClick}>
                        <input type="text" className="form-control"
                            autoComplete="off"
                            name="key"
                            value={key}
                            placeholder="Look for products"
                            onChange={onChange}></input>
                        <button className="btn btn-success" style={{ fontWeight: "bold", padding: "10px 10px 10px 10px" }}>Search</button>
                    </form>
                </div>
                {loaded ?
                    <div className="container st">
                        <div className="row off">
                            <div className="cd col-sm">
                                <img className="card-img-top im"
                                    src="https://img.freepik.com/free-photo/mineral-chemical-granulated-fertilizer-hands-woman_116407-2053.jpg?size=626&ext=jpg"
                                    alt="pic1" />
                                <h5>50 % off on Selected fertilizers</h5>
                                <button className="btn btn-primary"><i className="fas fa-running"></i> Know more</button>
                            </div>
                            <div className="cd col-sm">
                                <img className="card-img-top im"
                                    src="https://img.freepik.com/free-photo/five-different-types-nuts_23-2147679633.jpg?size=626&ext=jpg"
                                    alt="pic1" />
                                <h5>Buy one get one offer on fruit seeds</h5>
                                <button className="btn btn-primary"><i className="fas fa-running"></i> Know more</button>
                            </div>
                            <div className="cd col-sm">
                                <img className="card-img-top im"
                                    src="https://image.freepik.com/free-photo/medicine-bottles-tablets-wooden-desk_1387-420.jpg"
                                    alt="pic1" />
                                <h5>Mega offer on plant medicines</h5>
                                <button className="btn btn-primary"><i className="fas fa-running"></i> Know more</button>
                            </div>
                        </div>
                    </div>
                    :
                    <div className="container">
                        <div className="row">
                            <img src={Giphy} id="spin" alt="loading" style={{ width: "170px" }}></img>
                        </div>
                    </div>}

            </div>
        )
    }

}
export default Store;