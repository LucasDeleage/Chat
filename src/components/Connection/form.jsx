
import Button from '../Button/Button'
import './form.css';


const Form = (props) => {
    
    
    const handleEmail = (e) => {
        
        props.setEmail(e.target.value); 
    };

    const handleMdp = (e) => {
        
        props.setMdp(e.target.value);
    };

 
    return (



        <div className="Form">


            <form>
                <input type="text" placeholder="email" onChange={handleEmail}></input>
                <input type="text" placeholder="password" onChange={handleMdp}></input>
            </form>
            <button onClick={props.createAccount}>create account</button>
            <Button onClick={props.signInWithGoogle}>Sign in with Google</Button> 
        </div>
    );
};

export default Form;