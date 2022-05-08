import React, { useEffect, useState } from "react";
import "./country.css"
import Pagination from "./pagination";

var Country = ()=>{

    const [country, setcountry] = useState([]);
    const [loading, setloading] = useState(false);
    const [currentpage, setcurrentpage] = useState(1);
    const [postperpage] = useState(20);
    
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
    const handlesubmit = (e) =>{
        e.preventDefault();
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
                    <form onSubmit={handlesubmit} id ="searchform">
                    {/* <div id="searchdiv"> */}
                    <input type = "text" name="name" id="search-input" placeholder="Enter Country"></input>
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
        </div>
    )
}

export default Country;