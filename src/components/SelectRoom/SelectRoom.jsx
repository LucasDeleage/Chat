import './SelectRoom.css'
import Button from '../Button/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faThumbsDown } from '@fortawesome/free-regular-svg-icons';


/** 
* Affiche le salons et permet a l'utilisateur de choisir son salon
* @param props - Recoit les props de Room (signOut = {props.signOut} room = {room} setRoom = {setRoom})
* @return le composant
*/


const SelectRoom = (props) => {


    const handleChangeRoom = event => { //actualise le state room en fonction du click sur l'élément
            const value = event.target.innerText;

                if(value===" J'ai aimé"){                
                    props.setRoom('messageLike');
                    console.log(props.room);
                }
                else{
                    
                    props.setRoom('messages');
                    console.log(props.room);
                }
                
    };
            
        
        return (
            <div className="SelectedRoom" >
                    <img src="logo192.png" alt="logo react" width={100} height={100}/>
                    <div className="divider"/>
                    <h2>Salons</h2>
                    <ul>
                        <li onClick={handleChangeRoom}><FontAwesomeIcon icon={faThumbsUp} className="icon"/> J'ai aimé</li>
                        <li onClick= {handleChangeRoom}><FontAwesomeIcon icon={faThumbsDown} className="icon"/> Je n'ai pas aimé</li>
                    </ul>
                    <Button onClick={props.signOut}>Sign out</Button> 
            </div>
        );
};

    


export default SelectRoom;