import React,{useState,useEffect} from 'react';
import { useDispatch,useSelector } from 'react-redux';
import { actions } from '../features/starwars';
let pageNumber =1;
let favoritePlanets = [];
const Planet = ({favoritePlanet}) => {
    const dispatch = useDispatch();
    const favoriteList = useSelector(state => state.starwars);
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [planets, setPlanets] = useState([]);
    const [myFilter,setMyFilter] = useState('');
    const [filtered,setFiltered] = useState([]);
    const [showNext,setShowNext]  = useState(true);
    const [showPrevious,setShowPrevious]  = useState(false);
    const [selectedPerson, setSelectedPerson] = useState(null);
    

    //const [favoriteSelected,setFavoriteSelected] = useState(false);
    
    const [url,setUrl] = useState(`https://swapi.dev/api/planets/?page=${pageNumber}`);
    
   
   
    
    const handleKeyUp = (event) => { 
      //setFavoriteSelected(false);
      setMyFilter(event.target.value);
      let filterWord = event.target.value;
         
           setFiltered([...planets].filter(planet =>(
            planet.name.toLowerCase().includes(filterWord) ||
            planet.climate.toLowerCase().includes(filterWord)) ||
            planet.terrain.toLowerCase().includes(filterWord)
            
           ));   
    }//handleKeyUp

    
    const handleAddPlanet = (planet) =>{
        console.log('planet is:', planet);
        favoritePlanets = [...favoritePlanets,planet];
        console.log('favorite planets:',favoritePlanets);
        dispatch(actions.addToFavorite(planet));
    }


    const handleNextData =(event) =>{
      if(pageNumber<=5){
          console.log('favoritePlanet',favoritePlanet);
        if(pageNumber===8){setShowNext(false);}
        setShowPrevious(true);
        pageNumber= pageNumber+1;
       
      setUrl(`https://swapi.dev/api/planets/?page=${pageNumber}`) ;
      }else{
        console.log('over');
        setShowNext(false);
        
       
      }
      
    }  
     
    const handlePreviousData = () => {
      if((pageNumber>=2)&&(pageNumber<=6)){
        if(pageNumber===2){setShowPrevious(false);}
        if(pageNumber>2){setShowPrevious(true);}
        setShowNext(true);
        pageNumber= pageNumber-1;
        console.log('page number is:',pageNumber);
       
      setUrl(`https://swapi.dev/api/planets/?page=${pageNumber}`) ;
      }else{
        
        setShowPrevious(false);
        
       
      }
    }
    

    
    
    useEffect(() => {
        
            fetch(url)
            .then(result => result.json())
            .then(
             (result) => {
              setIsLoaded(true);
              console.log('result is:',result);
              if((pageNumber!==1)){setShowPrevious(true);}
              if(pageNumber===6){setShowNext(false);}
              //setFavoriteSelected(false);
              setPlanets(result.results);
              setFiltered(result.results);
              
              console.log('Next page is:',result.next);
            },
            (error) => {
              setIsLoaded(true);
              setError(error);
            }
          )

         }, [url])
    
      if (error) {
        return <div>Error: {error.message}</div>;
      } else if (!isLoaded) {
        return <div>Loading...</div>;
      } else {
        return (
            <section>
              <div className="list-leader">
              <input type="text" value = {myFilter} onChange={handleKeyUp} placeholder="Search here what you want..."></input>
           
           
              <div>
                
                <button className={(!showPrevious) ? 'hideShowNext': 'showNext'} onClick={handlePreviousData}>Previous page!</button>
                <button className={(showNext) ? 'showNext': 'hideShowNext'} onClick={handleNextData}>Next page!</button>
              </div>
              
              
              
              
              </div>
                
                
              
                <div className="people-list">
                
                  {filtered.map(planet => (
                     <div key={planet.name}>
                      Name: {planet.name}<br/>
                      Climate: {planet.climate}<br/>
                      Terrain: {planet.terrain}<br />
                     
                    
                      <button key={planet.name} 
                      className={((favoriteList.filter(p=>p.name===planet.name).length > 0)||(selectedPerson === planet.name)) ? 'favorite-selected' : 'favorite-unselected'}
                      
                      onClick={() =>{ setSelectedPerson(planet.name); handleAddPlanet(planet) }}>Add to favorites!</button>
                      
                      <button 
                      className={
                        ((favoriteList.filter(p=>p.name===planet.name).length > 0)||(selectedPerson === planet.name)) ? 'visible' : 'unvisible'}>Selected!</button>
        
                     </div> 
                     
                    ))}
                    
                </div>
                
                
                <br />
                
            </section>
          
        );
      }

}
    
    
   

export default Planet;

