import { Navigate } from "react-router-dom";
const ProtectedRoute=({element})=>{
    const isAuthenticated=localStorage.getItem("isAuthenticated");
    if (isAuthenticated){
        return element
    }
    else{
        return <Navigate to="/login"></Navigate>
    }
    
}
export default ProtectedRoute;