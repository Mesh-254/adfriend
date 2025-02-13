import './App.css';
import FetchAds from './components/FetchAds';
import Time from './components/Time'

function App() {

  let now = new Date();
  console.log(now);
  return (
    <>
      
      <FetchAds />
      <Time />

    </>
  );
}

export default App;
