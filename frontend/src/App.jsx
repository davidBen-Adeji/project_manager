import Main from "./components/Main/Main";
import Navbar from "./components/Navbar/Navbar";
import RoutesComponent from "./components/RoutesComponent";

function App() {
  return (
    <>
      <Navbar />
      <Main>
        <RoutesComponent />
      </Main>
    </>
  );
}

export default App;
