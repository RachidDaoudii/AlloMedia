import "./App.css";
import MainRoute from "./Routes";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
function App() {
  return (
    <>
      <ToastContainer />
      <MainRoute />
    </>
  );
}

export default App;
