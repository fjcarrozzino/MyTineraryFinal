import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import BackToCities from "../components/BackToCities";
import "../styles/CityInfo.css";
import NothingHere from "../assets/nothing-here.webp";
import { useDispatch, useSelector } from "react-redux";
import citiesActions from "../redux/actions/citiesActions";
import tineraryActions from "../redux/actions/tineraryActions";

import Itineraries from "../components/Itineraries";

const CityInfo = () => {
  const { id } = useParams(); //recibe el id, desestructura el parametro con el metodo useparams
  const dispatch = useDispatch();


  useEffect(() => {
    dispatch(citiesActions.getOneCity(id))
    dispatch(tineraryActions.getOneTinerary(id))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const oneCity = useSelector((store) => store.citiesReducer.oneCity);

  const oneTinerary = useSelector((store) => store.tineraryReducer.oneTinerary);

  return (
    <div>
      <div
        className="city-info"
        style={{ backgroundImage: `url(${oneCity?.image})` }}
      >
        <h1 className="title-detail">{oneCity?.name}</h1>
      </div>
      <div className="div-itinerary">
        {oneTinerary.length === 0 ? (
          <div className="detail-cities">
            <div className="itineraries-not-added">
              <img src={NothingHere} alt="nothing-here" height="150px" />
              <h2>
                Itineraries have not been added yet! Under Construction!
                <br />
                Come back soon!
              </h2>
            </div>
          </div>
        ) : (
          oneTinerary.map((itinerary, index) => (
            <div key={index}>
              <Itineraries itinerary={itinerary} id={itinerary._id}/>
              </div>))
            )}
        <BackToCities />
      </div>
    </div>
  );
};

export default CityInfo;
