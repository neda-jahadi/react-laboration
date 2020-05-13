import React, { useState } from 'react';
import { useDispatch,useSelector } from 'react-redux';
import { actions } from '../features/starwars';


const Favorites = () =>{
    
    const dispatch = useDispatch();
    const myFavorites = useSelector(state => state.starwars);
    const [allSelected,setAllSelected] = useState(true);
    const [peopleSelected,setPeopleSelected] = useState(false);
    const [planetSelected,setPlanetSelected] = useState(false);
    
    
     let filteredJ = myFavorites;
     const [filterKey,setFilterKey] = useState('');
    

   
     const handleFavoritePeople = () => {
         setFilterKey('people');
         setPeopleSelected(true);
         setAllSelected(false);
         setPlanetSelected(false);
         
    }

    const handleFavoritePlanets = () => {
        setFilterKey('planet');
        setPeopleSelected(false);
         setAllSelected(false);
         setPlanetSelected(true);
        
    }

    const handleAllFavorites = () => {
        setFilterKey('all');
        setPeopleSelected(false);
         setAllSelected(true);
         setPlanetSelected(false);
        
    }
    if(filterKey==='people'){
        filteredJ = [...myFavorites].filter((item)=>item.eye_color);
    }else if(filterKey==='planet') {
        filteredJ = [...myFavorites].filter((item)=>item.climate);
    }else{
        filteredJ = myFavorites;
    }




    return (
        
            <section className="favorite-page">
                 
                 <div className="selected-favorites">
                 <h2>My favorite lists are here:</h2>
                 <button  className={(allSelected) ? 'favorite-clicked' : ''} onClick={handleAllFavorites}>All the favorites</button>
                 <button className={(peopleSelected) ? 'favorite-clicked' : ''} onClick={handleFavoritePeople}>Favorite people</button>
                 <button className={(planetSelected) ? 'favorite-clicked' : ''} onClick={handleFavoritePlanets}>Favorite planets</button>
                   {filteredJ.map(person=>
                   <div key={person.name}>
                     <div className={(person.climate) ? 'unvisible' : ''}>
                        Name:{person.name}<br />
                        Birth-year:{person.birth_year}<br />
                        Eye-color:{person.eye_color}<br />
                        Skin-color:{person.skin_color}
                        <p className={(person.status) ? 'invented' : 'existing'}>Status:<span className="status">{person.status}</span></p>
                     </div>
                     <div  className = {(person.climate) ? '' : 'unvisible'}>
                         Name: {person.name}<br />
                         Climate :{person.climate}<br />
                         Terrain:{person.terrain}
                     </div>
                     <button onClick={()=>{
                        
                        
                         dispatch(actions.removeFromFavorite(person));
                         
                        }}
                     >Delete!</button>
                    </div>
                     )}
                 </div>
                 
                 
            </section>
        
    );
}
export default Favorites;