import React,{useState,useEffect} from 'react';
import { useDispatch,useSelector } from 'react-redux';
import { actions } from '../features/starwars';
let pageNumber =1;
const StarWars = () => {
    const dispatch = useDispatch();
    const favoriteList = useSelector(state => state.starwars);
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [people, setPeople] = useState([]);
    const [myFilter,setMyFilter] = useState('');
    const [filtered,setFiltered] = useState([]);
    const [showNext,setShowNext]  = useState(true);
    const [showPrevious,setShowPrevious]  = useState(false);
    const [selectedPerson, setSelectedPerson] = useState(null);

    //const [favoriteSelected,setFavoriteSelected] = useState(false);
    
    const [url,setUrl] = useState(`https://swapi.dev/api/people/?page=${pageNumber}`);
    

   
    
    const handleKeyUp = (event) => { 
      //setFavoriteSelected(false);
      setMyFilter(event.target.value);
      let filterWord = event.target.value;
         
           setFiltered([...people].filter(person =>(
            person.name.toLowerCase().includes(filterWord) ||
            person.birth_year.toLowerCase().includes(filterWord)) ||
            person.eye_color.toLowerCase().includes(filterWord) ||
            person.skin_color.toLowerCase().includes(filterWord)
           ));   
    }//handleKeyUp
    
    
    const handleNextData =(event) =>{
      if(pageNumber<=8){
        console.log('favoriteList',favoriteList);
        if(pageNumber===8){setShowNext(false);}
        setShowPrevious(true);
        pageNumber= pageNumber+1;
       
      setUrl(`https://swapi.dev/api/people/?page=${pageNumber}`) ;
      }else{
        console.log('over');
        setShowNext(false);
        
       
      }
      
    }  
     
    const handlePreviousData = () => {
      if((pageNumber>=2)&&(pageNumber<=9)){
        if(pageNumber===2){setShowPrevious(false);}
        if(pageNumber>2){setShowPrevious(true);}
        setShowNext(true);
        pageNumber= pageNumber-1;
        console.log('page number is:',pageNumber);
       
      setUrl(`https://swapi.dev/api/people/?page=${pageNumber}`) ;
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
              if(pageNumber===9){setShowNext(false);}
              //setFavoriteSelected(false);
              setPeople(result.results);
              setFiltered(result.results);
              
              //console.log('Next page is:',result.next);
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
              <input type="text" value = {myFilter} onChange={handleKeyUp} placeholder="Skriv vad du vill söka efter..."></input>
           
           
              <div>
                
                <button className={(!showPrevious) ? 'hideShowNext': 'showNext'} onClick={handlePreviousData}>Previous page!</button>
                <button className={(showNext) ? 'showNext': 'hideShowNext'} onClick={handleNextData}>Next page!</button>
              </div>
              
              
              
              
              </div>
                
                
              
                <div className="people-list">
                
                  {filtered.map(person => (
                     <div key={person.name}>
                      Name: {person.name}<br/>
                      Birth-year: {person.birth_year}<br/>
                      Eye-color: {person.eye_color}<br />
                      Skin-color: {person.skin_color}
                    
                      <button key={person.name} 
                      className={((favoriteList.filter(p=>p.name===person.name).length > 0)||(selectedPerson === person.name)) ? 'favorite-selected' : 'favorite-unselected'}
                      
                      onClick={() =>{ setSelectedPerson(person.name); dispatch(actions.addToFavorite(person)); }}>Add to favorites!</button>
                      
                      <button 
                      className={
                        ((favoriteList.filter(p=>p.name===person.name).length > 0)||(selectedPerson === person.name)) ? 'visible' : 'unvisible'}>Selected!</button>
        
                     </div> 
                     
                    ))}
                    
                </div>
                
                
                <br />
                
            </section>
          
        );
      }

}
    
    
   

export default StarWars;

