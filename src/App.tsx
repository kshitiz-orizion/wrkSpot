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
  const [loading,setLoading] = useState(false)
  const [inputText,setInputText] = useState('')
  const [selected,setSelected] = useState('') 


  const fetchCountries = async () => {
    setLoading(true)
    const data = await axios.get(
      "https://api.sampleapis.com/countries/countries"
    );
    setCountries(data.data);
    allCountries.current = data.data;
    setLoading(false)
  };

  const filterByName = (e) =>{
    setInputText(e.target.value)
    const data:Array<Country> = allCountries.current.filter((val:Country)=>{
      return val.name.toLowerCase().includes(e.target.value.toLowerCase())
    })
    setCountries(data)
  }

  const filterByPopulation = (e) =>{
    setSelected(e.target.value)
    const data:Array<Country> = allCountries.current.filter((val:Country)=>{
      return val.population <= Number(e.target.value)
    })
    setCountries(data)
  }

  const clearResult = () =>{
    setInputText('')
    setSelected('')
    setCountries(allCountries.current)
  }

  return (
    <div className="App">
      <h3>Countries Info</h3>
      <div className="Container">
        <section>
        <div className="leftTags">
          <input type="text" placeholder="Country Name" onChange={(e)=>filterByName(e)} value={inputText}/>
          <select onChange={(e)=>filterByPopulation(e)}>
            <option selected value=''>
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
        <Table data={countries} loading={loading}/>
      </div>

    </div>
  );
}

export default App;
