import React, { useEffect, useState } from "react";
import "./country.css"
var Country = ()=>{

    const [country, setcountry] = useState([]);
    const getcountries = async () =>{
        var res = await fetch("https://codejudge-question-artifacts-dev.s3.amazonaws.com/q-1709/data.json");
        setcountry(await res.json());
        
    }

    useEffect(()=>{
        getcountries();
    },[])
    return(
        <div> 
            <div id="container">
                <div id = "searchbar">
                        <input type = "text" name="name" id="search-input" placeholder="Enter Country"></input>
                        <button id="search-btn">Search</button>
                </div>
                <div id = "countrydisplay">
                    {
                        country.map((data)=>{
                            return(
                                <div id = "country-card">
                                <img alt="country" id="countryflag" src={data.flag} ></img>
                                <h3 id="countryname">{data.name}</h3>
                                <p id="capital">{data.capital}</p>
                                <p id="population">{data.population}</p>
                                </div>
                            )
                        })
                    }
                    
                    
                </div>

            </div>
        </div>
    )
}

export default Country;