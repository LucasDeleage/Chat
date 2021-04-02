
import './App.css';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import {useState, useEffect} from 'react';
import Form from './components/Connection/form'
import Room from './components/Room/Room'


firebase.initializeApp({
  
    apiKey: "AIzaSyCVcR0YPiQnbEFVOCUn1raqEZY_68WerVM",
    authDomain: "reactchat-d020b.firebaseapp.com",
    projectId: "reactchat-d020b",
    storageBucket: "reactchat-d020b.appspot.com",
    messagingSenderId: "979242015738",
    appId: "1:979242015738:web:ae5df3dba68faef78a2243"
  // Initialize Firebase

});


const auth = firebase.auth() //init de l'auth firebase
const db = firebase.firestore(); //init bdd 

/** 
* Fonction app gère la connexion avec le backend et l'appel des composants principaux.
* @return retourne soit la page de connexion (si utilisateur connecté) soit le composant Room.
*/



function App() {


  const [user, setUser] = useState(()=> auth.currentUser); //state user
  const [initializing, setInitializing] = useState(true); //state initialisation de Room
  const [email, setEmail] = useState(''); //state input email connexion
  const [mdp, setMdp] = useState(''); //state input mdp connexion

 


  const loginUser = () => { // login un user ou retourne une erreur
    firebase.auth().signInWithEmailAndPassword(email, mdp)
      .then((userCredential) => {
        
        var user = userCredential.user;
     
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
      });
    }; 
  
    const createAccount = () =>  { // création de compte
   
      console.log(email, mdp);


      firebase.auth().createUserWithEmailAndPassword(email, mdp)
      .then((userCredential) => {
          
          var user = userCredential.user;
          
      })
      .catch((error) => {
          var errorCode = error.code;
          var errorMessage = error.message;
          
      });
  };


  

  useEffect(() => { //Renvoi l'utilisateur en instance
    const unsubscribe = auth.onAuthStateChanged(user => {
      if(user){
        setUser(user);
      }else{
        setUser(null);
      }

      if(initializing){
        setInitializing(false);
      }
    });

    return unsubscribe;
    
  }, []);
  

  const signInWithGoogle = async () => { //Connexion avec google
    const provider = new firebase.auth.GoogleAuthProvider();

    auth.useDeviceLanguage();

    try{ 
      await auth.signInWithPopup(provider);
    } catch(error){
      console.log(error);
    }
  };


  

  const signOut = async () => { //Déconnexion utilisateur
    
    try{
      await firebase.auth().signOut();

    }catch(error){
      console.log(error.message);
    }
  };
  

  if(initializing) return "loading...";

  

  return (
    <div className="App">
      {user?(
        <>
        
          <Room user={user} db={db} signOut = {signOut}/>
        </>
      ):(
          <Form signInWithGoogle={signInWithGoogle} loginUser = {loginUser} setEmail = {setEmail} setMdp = {setMdp} createAccount={createAccount} loginUser = {loginUser}/>
      )}

    </div>
  );
}

export default App;
