import {BrowserRouter as Router,Routes,Route} from "react-router-dom";
import Login from "./Components/Login";
import Register from "./Components/Register";
import Main_Page from "./Components/Main_Page";
import Forgot from "./Components/Forgot";
import Details from "./Components/Details"
import Reset_Password from "./Components/Reset_Password";
import Action from "./Components/Action";
import ProtectedRoute from "./Components/ProtectedRoute";
import Add_trip from "./Components/Add_trip";
import Offer_trip from "./Components/Offer_trip";
function App() {
  return (
    <Router>
    <Routes>
    <Route path="/" element={<Main_Page />}></Route>
    <Route path="/login" element={<Login />}></Route>
    <Route path="/register" element={<Register />}></Route>
    <Route path="/forgot_password" element={<Forgot />}></Route>
    <Route path="/reset_password/:id/:token" element={<Reset_Password />}></Route>
    <Route path="/details" element={<Details />}></Route>
    <Route path="/action" element={<ProtectedRoute element={<Action/>}/>}></Route>
    <Route path="/add_trip" element={<ProtectedRoute element={<Add_trip/>}/>}></Route>
    <Route path="/offer_trip" element={<ProtectedRoute element={<Offer_trip></Offer_trip>}></ProtectedRoute>}></Route>
    </Routes>
    </Router>
  );
}
export default App;
