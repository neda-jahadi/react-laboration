import React,{useState} from 'react';
import './App.css';
import StarWars from './components/StarWars';
//import favorites from './components/Favorites';
import Favorites from './components/Favorites';
import Header from './components/Header';
import Holder from './components/Holder';
import Planet from './components/Planet';
import Form from './components/Form';

function App() {
  const SHOW_DATA ='data' , SHOW_FAVORITES ='favorites', PLANET ='planet', FORM ='form';
  const [view, setView] = useState(SHOW_DATA);
  const [favoritePlanet] = ([]);
  

  let mainContent = null;
  if (view === SHOW_DATA){
    mainContent = <StarWars />;
  }else if(view === SHOW_FAVORITES){
    mainContent = <Favorites />;
  }else if(view === PLANET) {
    mainContent = <Planet favoritePlanet={favoritePlanet} />;
  }else{
    mainContent = <Form />;
  }
   
  
  return (
    <>
        <div className="header">
           <Header setView={setView} menu={{ SHOW_DATA, SHOW_FAVORITES,PLANET,FORM }} />
        </div>
        
        <main>
          <Holder>
            {mainContent}
          </Holder>
            
        </main>
        
        </>
  );
}

export default App;
