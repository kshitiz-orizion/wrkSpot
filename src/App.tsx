import logo from "./logo.svg";
import "./App.css";
import axios from "axios";
import React, { useRef, useState } from "react";
import Table from "./Components/Table";

export type Country = {
  name: string;
  abbreviation: string;
  capital: string;
  phone: string;
  population: number;
  media: {
    flag: string;
    emblem: string;
  };
};

function App() {
  const [countries, setCountries] = useState<Array<Country>>([]);
  let allCountries= useRef([])


  const fetchCountries = async () => {
    const data = await axios.get(
      "https://api.sampleapis.com/countries/countries"
    );
    setCountries(data.data);
    allCountries.current = data.data;
  };

  const filterByName = (e) =>{
    const data:Array<Country> = allCountries.current.filter((val:Country)=>{
      return val.name.toLowerCase().includes(e.target.value.toLowerCase())
    })
    setCountries(data)
  }

  const filterByPopulation = (e) =>{
    const data:Array<Country> = allCountries.current.filter((val:Country)=>{
      return val.population <= Number(e.target.value)
    })
    setCountries(data)
  }

  const clearResult = () =>{
    setCountries(allCountries.current)
  }

  return (
    <div className="App">
      <h3>Countries Info</h3>
      <div className="Container">
        <section>
        <div className="leftTags">
          <input type="text" placeholder="Country Name" onChange={(e)=>filterByName(e)}/>
          <select onChange={(e)=>filterByPopulation(e)}>
            <option selected disabled>
              Population
            </option>
            <option value='1000000'> &lt; 1M</option>
            <option value='5000000'> &lt; 5M</option>
            <option value='10000000'> &lt; 10M</option>
          </select>
          <div className="clear" onClick={()=>clearResult()}>Clear</div>
        </div>
        <div>
          <button onClick={() => fetchCountries()}>Show All Countries</button>
        </div>
        </section>
        <Table data={countries}/>
      </div>

    </div>
  );
}

export default App;
