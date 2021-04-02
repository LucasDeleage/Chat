import {useState} from 'react';
import Channel from '../Channel/Channel'
import SelectRoom from '../SelectRoom/SelectRoom';
import './Room.css';

import RoomContext from './RoomContext';


/** 
* Composant global d'interface utilisateur
* @param  props - Recoit les props (user={user} db={db} signOut = {signOut}) du composant Room
* @return deux composants (SelectRoom : permet de choisir le salon de discussion); (Channel : affiche les messages selon le salon choisit)
*/


const Room = (props) => {

    const [room, setRoom] = useState('messages');
    


    return (
        
            <div className="chat">
                <SelectRoom signOut = {props.signOut} room = {room} setRoom = {setRoom}/>
                <Channel user={props.user} db={props.db} room = {room}/>
            </div>
        
        
    );
};

export default Room;