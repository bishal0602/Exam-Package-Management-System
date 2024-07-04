import router from "./routes.jsx";
import { RouterProvider } from "react-router-dom";

const App = () =>{
    return<>
        <div>
            <RouterProvider router = { router} />
        </div>
    </>
}

export default App