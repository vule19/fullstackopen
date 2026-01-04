import axios from 'axios'
import { useEffect } from 'react'
import { useState } from 'react'

const Filter = ({value, filteredCountries}) => {
  return (
    <form>
      find countries <input onChange={filteredCountries}/>
    </form>
  )
}

const Weather = ({capital}) => {
  const [weather, setWeather] = useState(null)

  useEffect(() => {
    const api_key = import.meta.env.VITE_WEATHER_KEY
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=${api_key}`
    axios.get(weatherUrl).then(response => {
      setWeather(response.data)
    })
  }, [capital])

  return (
    <div>
      {weather ? (
        <div>
          <div>Temperature: {weather.main.temp} °C</div>
          <img 
            src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
            alt="Weather icon"
          />
          <div>Wind: {weather.wind.speed} m/s</div>
        </div>
      ) : (
        <div>
          <div>Loading weather data...</div>
        </div>
      )}
    </div>
  )
}

const Countries = ({countries}) => {
  const [selectedCountry, setSelectedCountry] = useState(null)

  const selectCountry = (country) => {
    setSelectedCountry(country)
  }
  const handleShow = (country) => {
    return (
      <div>
        <h1>{country.name.common}</h1>
        <div>Capital: {country.capital}</div>
        <div>Population: {country.population}</div>
        <h2>Languages</h2>
        <ul>
          {Object.values(country.languages).map(language => 
            <li key={language}>{language}</li>
          )}
        </ul>
        <img src={country.flags.png} alt={`Flag of ${country.name.common}`} width="200"/>
      </div>)
  }
  if (countries.length > 10) {
    return <div>Too many matches, specify another filter</div>
  }
  else if (countries.length === 1) {
    const country = countries[0]
    return (
      <div>
        {handleShow(country)}
        <h2>Weather in {country.capital}</h2>
        <Weather capital={country.capital}/>
      </div>
    )
  }
  else {
    return(
      <div>
        {countries.map(country => 
          <div key={country.name.common}>{country.name.common} <button onClick={() => selectCountry(country)}>show</button></div>
        )}
        {selectedCountry}
      </div>
    )
  }
}

const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/'
const App = () => {
  const [countries, setCountries] = useState([])
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    axios.get(`${baseUrl}api/all`).then(response => {
      const filtered = response.data.filter(country => 
        country.name.common.toLowerCase().includes(searchTerm.toLowerCase())
      )
      setCountries(filtered)
    })
  }, [searchTerm])

  const filteredCountries = (event) => {
    setSearchTerm(event.target.value)
  }

  return (
    <div>
      <Filter value={searchTerm} filteredCountries={filteredCountries}></Filter>
      <Countries countries={countries}></Countries>
    </div>
  )
}

export default App