import React, { useEffect, useState } from "react";
import "../styles/Cities.css";
import CityCards from "../components/CityCards";
import SearchIcon from "@mui/icons-material/Search";
import { useDispatch, useSelector } from "react-redux";
import citiesActions from "../redux/actions/citiesActions";

function Cities() {
  const [inputValue, setInputValue] = useState(""); //creo el estado que va a contener el input value del search input
  const dispatch = useDispatch();
  const cities = useSelector((store) => store.citiesReducer.cities);
  const filter = useSelector((store) => store.citiesReducer.filterCities);

  useEffect(() => {
    dispatch(citiesActions.filterCities(inputValue));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputValue, cities]); // se corre el useEffect cada vez que se modifica el inputValue y cities

  return (
    <div className="cities-container">
      <div className="filter-cities"></div>
      <div className="background-image-cities">
        <h2>Search your next destination!</h2>
      </div>
      <div className="search-bar">
        <input
          type="search"
          onChange={(e) => {
            setInputValue(e.target.value); // evento on change con una funcione que setea el input value a el target value del input.
          }}
        ></input>
        <SearchIcon fontSize="large" className="search-icon" />
      </div>
      <div className="cards-container">
        {filter.length === 0 ? (
          <h2 className="nothing-found">
            {" "}
            Nothing was found. Please try another City or Country.{" "}
          </h2>
        ) : (
          <CityCards countries={filter} />
        )}{" "}
        {/*llamo a la funcion de renderizado de cards */}
      </div>
    </div>
  );
}

export default Cities;
