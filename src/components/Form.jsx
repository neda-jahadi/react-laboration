import React,{useState} from 'react';
import { useDispatch,useSelector } from 'react-redux';
import { actions } from '../features/starwars';
const Form = () =>{
    let myOwnFavorite ={
        name:'',
        birth_year:'',
        eye_color:'',
        skin_color:'',
        status:'INVENTED BY ME!'
    }
    const dispatch = useDispatch();
    const myFavorites = useSelector(state => state.starwars);
    
    const [name,setName] = useState('');
    const [birthYear,setBirthYear] = useState('');
    const [eyeColor,setEyeColor] = useState('');
    const [skinColor,setSkinColor] = useState('');
    const [isAddedBefore,setIsAddedBefore] = useState(false);
    const [submited,setSubmited] = useState(false);
    const [nameTouched,setNameTouched] = useState(false);
    const [birthTouched,setBirthTouched] = useState(false);
    const [eyeTouched,setEyeTouched] = useState(false);
    const [skinTouched,setSkinTouched] = useState(false);

    let nameClass = '';
    if( nameTouched ) {
        if(name.length<4)
            nameClass = 'invalid';
    else
            nameClass = 'valid';
    }

    let birthClass = '';
    if( birthTouched ) {
        if(birthYear.length<4)
            birthClass = 'invalid';
    else
            birthClass = 'valid';
    }

    let eyeClass = '';
    if( eyeTouched ) {
        if((isNaN(eyeColor)&&(eyeColor.length>2)))
            eyeClass = 'valid';
    else
            eyeClass = 'invalid';
    } 

    let skinClass = '';
    if( skinTouched ) {
        if((isNaN(skinColor)&&(skinColor.length>2)))
            skinClass = 'valid';
    else
            skinClass = 'invalid';
    } 

    const handleSave = () =>{
        
        myOwnFavorite.name = name;
        myOwnFavorite.birth_year =birthYear;
        myOwnFavorite.eye_color =eyeColor;
        myOwnFavorite.skin_color =skinColor;
       let filteredFavorite = myFavorites.filter(p=>p.name===myOwnFavorite.name);
       setSubmited(true);
       if(filteredFavorite.length===0){
        dispatch(actions.addToFavorite(myOwnFavorite));
    
       }else{
           setIsAddedBefore(true);
        
       }
        
        
    }
    return(
        
            <div className="form">
                     <h2>Make your favorite person:</h2>
                     <div>
                         <label>Name:</label>
                         <input type='text' value={name} className={nameClass} onBlur={event => setNameTouched(true)}
                           onChange={e => {setName(e.target.value); setIsAddedBefore(false); setSubmited(false);}} />
                           <span className={(nameClass==='invalid') ? 'show-error' : 'unvisible'}>The name should have at least 4 letters</span>
                         <br />
                         <label>Birth year:</label>
                         <input type='text' value={birthYear} className={birthClass} onBlur={event => setBirthTouched(true)}
                         onChange={e => setBirthYear(e.target.value)} />
                         <span className={(birthClass==='invalid') ? 'show-error' : 'unvisible'}>The name should have at least 4 letters</span>
                         <br />
                         <label>Eye color:</label>
                         <input type='text' value={eyeColor} className={eyeClass} onBlur={event => setEyeTouched(true)} 
                         onChange={e => setEyeColor(e.target.value)} />
                         <span className={(eyeClass==='invalid') ? 'show-error' : 'unvisible'}>Write a color</span>
                         <br />
                         <label>Skin color:</label>
                         <input type='text' value={skinColor} className={skinClass} onBlur={event => setSkinTouched(true)} 
                         onChange={e => setSkinColor(e.target.value)} />
                         <span className={(skinClass==='invalid') ? 'show-error' : 'unvisible'}>Write a color</span>
                         
                         
                     </div>
                     <div className="form-button">
                        <button  disabled = {(submited)||(eyeClass==='') || (nameClass==='invalid')
                        ||(birthClass==='invalid')||(eyeClass==='invalid') ||(skinClass==='invalid')} onClick={handleSave}>Submit!</button>
                     </div>
                     
                    <h3 className={(isAddedBefore) ? 'added-before' : 'not-added'}>This person is added before.Try another name!</h3>
                     
                 </div>
        
    );
}
export default Form;