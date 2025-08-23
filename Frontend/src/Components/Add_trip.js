import react, { use, useEffect, useState } from "react";
import cities_obj from "../a-detailed-version (1).json";
import "../CSS/Add_trip.css";
import logo from "./images/Logo.webp";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
const Add_trip = () => {
  const location = useLocation();
  const { username } = location.state;
  const navigate = useNavigate("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [selectedFrom, setSelectedFrom] = useState([]);
  const [selectedTo, setSelectedTo] = useState([]);
  const [passengers, setNumberPassengers] = useState(0);
  const [isSubmit, setisSubmit] = useState(0);
  const [trips, setTrips] = useState([]);
  const cities = Object.keys(cities_obj);
  const handleMain = () => {
    navigate("/");
  };
  const handleTrip = async () => {
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/auth/getTrips`,
        { from, to, passengers }
      );
      setisSubmit(1);
      setTrips(res.data);
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    if (from.length > 0 && !cities.includes(from)) {
      const filteredCities = cities.filter((city) => {
        return city.toLowerCase().startsWith(from.toLowerCase());
      });
      setSelectedFrom(filteredCities);
    } else {
      setSelectedFrom([]);
    }
  }, [from]);
  useEffect(() => {
    if (to.length > 0 && !cities.includes(to)) {
      const filteredCities = cities.filter((city) => {
        return city.toLowerCase().startsWith(to.toLowerCase());
      });
      setSelectedTo(filteredCities);
    } else {
      setSelectedTo([]);
    }
  }, [to]);
  return (
    <div className="container">
      <div className="nav_bar1">
        <img src={logo} onClick={handleMain}></img>
        <p>{username}</p>
      </div>
      <div className="input_container">
        <input
          type="text"
          placeholder="From"
          value={from}
          onChange={(e) => {
            setFrom(e.target.value);
          }}
        ></input>
        {selectedFrom.length > 0 && (
          <ul className="suggestions">
            {selectedFrom.map((city, index) => {
              return (
                <li
                  key={index}
                  onClick={() => {
                    setSelectedFrom([]);
                    setFrom(city);
                  }}
                >
                  {city}
                </li>
              );
            })}
          </ul>
        )}
        <input
          type="text"
          placeholder="To"
          value={to}
          onChange={(e) => {
            setTo(e.target.value);
          }}
        ></input>
        {selectedTo.length > 0 && (
          <ul className="suggestions1">
            {selectedTo.map((city, index) => {
              return (
                <li
                  key={index}
                  onClick={() => {
                    setSelectedTo([]);
                    setTo(city);
                  }}
                >
                  {city}
                </li>
              );
            })}
          </ul>
        )}
        <input
          type="number"
          placeholder="No of Passengers"
          onChange={(e) => {
            setNumberPassengers(e.target.value);
          }}
        ></input>
        <button className="button" onClick={handleTrip}>
          Search Trip
        </button>
      </div>
      {isSubmit && (
        <div>
          {trips.length == 0 ? (
            <p>No trips Available</p>
          ) : (
            trips.map((trip, index) => (
              <div className="Trips" key={index}>
                <p>
                  <strong>Car Number:</strong> {trip.car_number}
                </p>
                <p>
                  <strong>Date:</strong> {trip.date}
                </p>
                <p>
                  <strong>Time:</strong> {trip.time}
                </p>
                <p>
                  <strong>From:</strong> {trip.source}
                </p>
                <p>
                  <strong>To:</strong> {trip.destination}
                </p>
                <p>
                  <strong>Seats Available:</strong> {trip.seats}
                </p>
                <p>
                  <strong>Contact:</strong> {trip.number}
                </p>
                <hr />
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};
export default Add_trip;
