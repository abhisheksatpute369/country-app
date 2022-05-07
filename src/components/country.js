import React from "react";
import "./country.css"
var Country = ()=>{
    return(
        <div> 
            <div id="container">
                <div id = "searchbar">
                        <input type = "text" name="name" id="search-input" placeholder="Enter Country"></input>
                        <button id="search-btn">Search</button>
                </div>
                <div id = "countrydisplay">
                    <div id = "country-card">
                        
                    </div>
                    
                </div>

            </div>
        </div>
    )
}

export default Country;