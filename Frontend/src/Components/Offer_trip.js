import { useLocation, useNavigate } from "react-router-dom"
import logo from "../Components/images/Logo.webp"
import { useState ,useEffect} from "react"
import "../CSS/Offer_trip.css"
import axios from "axios"
import cities_obj from "../a-detailed-version (1).json"
const Offer_trip=()=>{
    const navigate=useNavigate()
    const location=useLocation()
    const {username}=location.state;
    const [name,setName]=useState("")
    const [number,setNumber]=useState("")
    const [source,setSource]=useState("")
    const [destination,setDestination]=useState("")
    const [car,setCar]=useState("")
    const [seats_available,setSeats_available]=useState(0)
    const [car_number,setCar_number]=useState("")
    const cities=Object.keys(cities_obj);
    const [selectedFrom,setSelectedFrom]=useState([])
    const [selectedTo,setSelectedTo]=useState([])
    const [date,setDate]=useState("")
    const [time,settime]=useState("")
    const handleMain=()=>{
        navigate('/')
    }
    const handleSubmit=async (event)=>{
        event.preventDefault();
        try{
            const res=await axios.post("http://localhost:9000/api/auth/trip",{name,number,source,destination,date,time,seats_available,car_number})
            alert("Trip Added Successfully")
            navigate('/action',{state:{username}})
        }
        catch(err){
            console.log(err)
        }
    }
    useEffect(()=>{
        if (source.length>0 && !cities.includes(source)){
            const filteredCities=cities.filter((city)=>{
                return city.toLowerCase().startsWith(source.toLowerCase())
            })
            setSelectedFrom(filteredCities)
        }
        else{
            setSelectedFrom([]);
        }
    },[source])
    useEffect(()=>{
        if(destination.length>0 && !cities.includes(destination)){
            const filteredCities=cities.filter((city)=>{
                return city.toLowerCase().startsWith(destination.toLowerCase())
            })
            setSelectedTo(filteredCities)
        }
        else{
            setSelectedTo([])
        }
    },[destination])
    return (
        <div class="overall">
            <div className="nav">
                <img src={logo} onClick={handleMain}></img>
                <p>{username}</p>
            </div>
            <div className="form1">
                <form onSubmit={handleSubmit}>
                    <input type="text" placeholder="Name" required onChange={(e)=>{
                        setName(e.target.value)
                    }}></input>
                    <input type="text" placeholder="Phone Number" required minLength="10" maxLength="10" onChange={(e)=>{
                        setNumber(e.target.value)
                    }}></input>
                    <input type="text" placeholder="From" value={source} required onChange={(e)=>{
                        setSource(e.target.value)
                    }}></input>
                    {selectedFrom.length>0 && (
                    <ul className="suggestions">
                        {
                            selectedFrom.map((city,index)=>{
                                return (<li key={index} onClick={()=>{
                                    setSelectedFrom([])
                                    setSource(city)
                                }}>{city}</li>)
                            })
                        }
                    </ul>
                )
                }
                    <input type="text" placeholder="To" value={destination} required onChange={(e)=>{
                        setDestination(e.target.value)
                    }}></input>
                    {selectedTo.length>0 && (
                    <ul className="suggestions">
                        {
                            selectedTo.map((city,index)=>{
                                return (<li key={index} onClick={()=>{
                                    setSelectedTo([])
                                    setDestination(city)
                                }}>{city}</li>)
                            })
                        }
                    </ul>
                )
                }
                    <input type="text" placeholder="Date format dd/mm/yyyy" required onChange={(e)=>{
                        setDate(e.target.value)
                    }}></input>
                    <input type="text" placeholder="Time format HH:MM" required onChange={(e)=>{
                        settime(e.target.value)
                    }}></input>
                    <input type="number" placeholder="No of seats available" required onChange={(e)=>{
                        setSeats_available(e.target.value)
                    }}></input>
                    <input type="text" placeholder="Car Number" required onChange={(e)=>{
                        setCar_number(e.target.value)
                    }}></input>
                    <button type="submit">Submit</button>
                </form>
            </div>
        </div>
    )
}
export default Offer_trip