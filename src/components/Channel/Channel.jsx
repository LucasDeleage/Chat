import React, {useState, useEffect} from 'react';
import firebase from 'firebase/app';
import './Channel.css'
import Message from '../Message/Message'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';



/** 
* Composant qui affiche les messages des utilisateur
* @param  props - Recoit les props de Room {user = null, db = null, room}
* @return tout les messages en fonction du salon choisit 
*/



const Channel = ({user = null, db = null, room}) => {
    
    const [messages, setMessages] = useState([]); //State qui contient les messages
    const [newMessage, setNewMessage] = useState(''); //State qui contient le nouveau message

    
    
    useEffect(()=>{ //Actualise le state message avec les messages de la collections (actualisation si db || room change)
        if(db){
            const unsubscribe = db
            .collection(room)
            .orderBy('createdAt')
            .limit(100)
            .onSnapshot(querySnapshot => {
                const data = querySnapshot.docs.map(doc => ({
                    ...doc.data(),
                    id: doc.id,
                }));

                setMessages(data);
                console.log(data)
            });

            return unsubscribe;

        }  
    }, [db, room]);


    const HandleOnChange = e => {  //récupère valeur input message
        setNewMessage(e.target.value);
    };

    const HandleOnSubmit = e => { //ajoute le nouveau message a la base de données a la soumission du form
       e.preventDefault();

       if(db){
            db.collection(room).add({
                text : newMessage,
                createdAt : firebase.firestore.FieldValue.serverTimestamp(),    
                uid : user.uid,
            });
       }
    };



   
    return (
        
            <div className='Channel'>
                <a href="#bottom" className="scrollBtn" >
                    <FontAwesomeIcon className="arrowDown"icon={faAngleDown}/>
                </a>
                <ul>
                    {messages.map(message => (
                        <li key={ message.id }>
                            <Message {...message} />
                        </li>
                    ))}
                </ul>
                <form onSubmit={HandleOnSubmit}>
                    <input 
                    type="text"
                    value={newMessage}
                    onChange={HandleOnChange}
                    placeholder="tapez votre message"/>
                    <button type="submit" disabled={!newMessage}>
                        Envoyer
                    </button>
                </form>
                <div id="bottom"/>
            </div>


    );
};

export default Channel;