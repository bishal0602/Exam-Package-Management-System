import router from "./routes.js";
import { RouterProvider } from "react-router-dom";

const App = () =>{
    return<>
        <div>
            <RouterProvider router = { router} />
        </div>
    </>
}

export default App