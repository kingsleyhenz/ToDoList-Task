import react from 'react'
import '../Stylesheets/SignUp.css'


const SignUp = ()=>{
    return(
        <>
        <div className='wrapper'>
            {/* <div className='head-text'><h2></h2></div> */}
            <form>
                <h3>Input Your Details</h3>
                <input type="text" placeholder='Firstname'/>
                <input type="text" placeholder='Laststname'/>
                <input type="text" placeholder='Email'/>
                <input type="password" placeholder='Password'/>
                <input type="password" placeholder='Confirm Password'/>
                <button>Sign Up Now</button> 
                <p>Already Have An Account? <a href="">Log In</a></p>
            </form>
        </div>
        </>
    )
}

export default SignUp