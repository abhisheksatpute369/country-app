import React, { useEffect, useState } from "react";
import "./country.css";
import "./singlecountry.css";
import Pagination from "./pagination";
import Countrylist from "./countrylist";
// import Singlecountry from "./singlecountry";

var Country = ()=>{

    const [country, setcountry] = useState([]);
    const [loading, setloading] = useState(false);
    const [currentpage, setcurrentpage] = useState(1);
    const [postperpage] = useState(20);
    const [inputcountry, setinputcountry] = useState({name:""});
    const [newname, setnewname] = useState([{
        name : "india",
        capital:"",
        region:"",
        subregion:"",
        population:"",
        demonym:"",
        currencies:[{name:""}]
    }]);
    
    // for fetching the country data from api 
    const getcountries = async () =>{
        setloading(true);
        var res = await fetch("https://codejudge-question-artifacts-dev.s3.amazonaws.com/q-1709/data.json");
        setcountry(await res.json());
        setloading(false);
    }

    useEffect(()=>{
        getcountries();
    },[])

    //getting current page and data of perticular page for pagination 
    const indexoflastpage = currentpage * postperpage;
    const indexoffirstpost = indexoflastpage - postperpage;
    const currentpost = country.slice(indexoffirstpost, indexoflastpage);

    var paginate = (pagenumber)=> setcurrentpage(pagenumber)

    // for sorting the data 
    const handlesortmethod = () =>{
        const result = document.getElementById("selectsort").value;
        if(result === "low"){
            setcountry([]);
            setcountry(country.sort((a,b)=> a.population-b.population ))
            
        }
        else if(result === "high"){
            setcountry([]);
            setcountry(country.sort((a,b)=> b.population - a.population))

        }
    }

    // these is for handle filter method 
    const handlefiltermethod = ()=>{
        const res = document.getElementById("selectfilter").value;
        if(res === "AtoZ"){
            setcountry([]);
            setcountry(country.sort((a,b)=> {
                const na = a.name.toUpperCase();
                const nb = b.name.toUpperCase();
                if(na<nb) {return -1}
                if(na>nb) {return 1}
                return 0;
            } ))
            
        }
        else if(res === "ZtoA"){
            setcountry([]);
            setcountry(country.sort((a,b)=> {
                const na = a.name.toUpperCase();
                const nb = b.name.toUpperCase();
                if(na<nb) {return 1}
                if(na>nb) {return -1}
                return 0;
            } ))

        }
    }

    // thse is for handle the input country 
    const handlechange = (e) =>{
        const name = e.target.name;
        const value = e.target.value;
        setinputcountry({...inputcountry, [name]:value});
    }
    const handlesubmit = (e) =>{
        e.preventDefault();
        const newcountry = {...inputcountry};
        const result = country.filter(obj => {
                return obj.name === newcountry.name;
              })
        if(result.length === 0)
        {
            window.alert("Invalid city name");
        }
        else{
            setnewname(result);
            document.getElementById("model").style.visibility = "visible";
            // thse is for hide the county lis model 
            document.getElementById("listmodel").style.visibility = "hidden";
        
        }    
    }

    const handleclose = ()=>{
        document.getElementById("model").style.visibility = "hidden";
    }
 
    if(loading)
    {
        return <h2>Loading...</h2>
    }
    return(
        <div> 
            <div id="container">
                {/* these div for upper navbar */}
                <div id = "searchbar">
                    <Countrylist country={country}/>
                    <form onSubmit={handlesubmit} id ="searchform">
                    {/* <div id="searchdiv"> */}
                    <input type = "text" onChange={handlechange} value={inputcountry.name} name="name" id="search-input" placeholder="Enter Country"></input>
                    <button id="search-btn" type="submit">Search</button> 
                    {/* </div> */}
                    </form>
                    {/* these is for sorting method by population */}
                    <select id = "selectsort" onChange={handlesortmethod}>
                        <option >Sort Population</option>
                        <option value = {"low"}>Low to High</option>
                        <option value={"high"}>High to Low</option>
                    </select>
                    {/* these is for filter method for name ascending and descending  */}
                    <select id = "selectfilter" onChange={handlefiltermethod}>
                        <option >Filter</option>
                        <option value = {"AtoZ"}>A to Z</option>
                        <option value={"ZtoA"}>Z to A</option>
                    </select>
                </div>
                {/* these div is for country display  */}
                <div id = "countrydisplay">
                    {
                        currentpost.map((data)=>{
                            return(
                                <div id = "country-card" key = {data.id}>
                                <img alt="country" id="countryflag" src={data.flag} ></img>
                                <h5 id="countryname">{data.name}</h5>
                                <p id="capital">Capital: {data.capital}</p>
                                <p id="population">Population: {data.population}</p>
                                </div>
                            )
                        })
                    }
                    
                    
                </div>
                {/* for pagination buttons  */}
                <Pagination postperpage={postperpage} totalpost={country.length} paginate={paginate} />
                
            </div>

            {/* these is for pop up model after search input  */}
            <>
            <div id="model">
                <div id="close" onClick={handleclose}>Close</div>
                <div id = "upperdiv">
                    <h1>{newname[0].name}</h1>
                </div>
                <div id = "middlediv">
                    <div id = "modelflag">
                        <img src={newname[0].flag} width ="100%" height="100%" alt="flag"></img>
                    </div>
                    <div id = "modelmap">
                        <iframe
                            src={`https://maps.google.com/maps?q=${newname[0].name}&t=&z=5&ie=UTF8&iwloc=&output=embed`}
                            width="100%"
                            height="100%"
                            frameBorder="0"
                            style={{ border: 0 }}
                            allowFullScreen=""
                            aria-hidden="false"
                            tabIndex="0"
                            title="country"
                        />
                    </div>
                </div>
                <div id= "lowerdiv">
                    <div className="infocard" id = "info1">
                        <h6>Capital</h6>
                        <h6>{newname[0].capital}</h6>
                    </div>
                    <div className="infocard" id = "info2">
                        <h6>Region</h6>
                        <h6>{newname[0].region}</h6>
                    </div>
                    <div className="infocard" id = "info3">
                        <h6>Subregion</h6>
                        <h6>{newname[0].subregion}</h6>
                    </div>
                    <div className="infocard" id = "info4">
                        <h6>Population</h6>                        
                        <h6>{newname[0].population}</h6>
                    </div>
                    <div className="infocard" id = "info5">
                        <h6>Demonym</h6>
                        <h6>{newname[0].demonym}</h6>
                    </div>
                    <div className="infocard" id = "info6">
                        <h6>Currency</h6>
                        <h6>{newname[0].currencies[0].name}</h6>
                    </div>
                </div>
            </div>
        </>
        </div>
        
    )
}

export default Country;