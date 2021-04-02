import React from 'react';
import {formatRelative} from 'date-fns';
import './Message.css'



/** 
* Définit la forme d'un message
* @param props - recoit le contenu de tout les messages
* @return un message avec le nom, contenu et date de création
*/



const Message = ({
    createdAt = null,
    text = '',
    displayName = 'Anonymous',
    
}) => {
    return (
      
            <div className="Message">
                <div className ="InfosMessage">
                    <img src='pngegg.png' alt="avatar" width={45} height={45}/>
                    <div>
                        <p>{displayName}</p>
                        {createdAt?.seconds ?(
                        <p className="date">
                            {formatRelative(new Date(createdAt.seconds * 1000), new Date())}
                        </p>
                ) : null}
                    </div>   
                        
                </div>
                <div className="text">
                    {text}
                </div>

            </div>
  
    );
};

export default Message;