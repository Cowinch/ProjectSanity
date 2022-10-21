// https://console.cloud.google.com/ to setup a new project if you are using google login
// https://youtu.be/1RHDhtbqo94?t=3026 youtube vid with timestamp on google login
import React from 'react'
import { useNavigate } from 'react-router-dom'
import shareVideoMp4 from '../assets/share.mp4'
import shareVideoWebm from '../assets/share.webm'
import logo from '../assets/logowhite.png'
import { GoogleOAuthProvider } from '@react-oauth/google'
import { GoogleLogin, googleLogout } from '@react-oauth/google'
import jwt_decode from 'jwt-decode'

import { client } from '../client'


const Login = () => {
    //originally, with google login you would JSONify a response.OBJ and ship it to localStorage. Now we jwt_decode a response.credential to get user info dictionary. THEN we stringify it and send it to local storage
    const navigate = useNavigate()
    const responseGoogle = async (response) => {
        const decoded = jwt_decode(response.credential)
        const {name, sub, picture} = decoded
        localStorage.setItem('user', JSON.stringify(decoded))
        const doc = {
            _id: sub,
            _type: 'user',
            userName: name,
            image: picture
        }

        client.createIfNotExists(doc)
            .then(() =>{
                navigate('/', {replace: true})
            })
    }
    return (
        <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_API_TOKEN}>
            <div className="flex justify-start items-center flex-col h-screen">

                {/* Background Video. 10/18 currently does not play the video */}
                <div className="relative w-full h-full">
                    <video className="w-full h-full object-cover" muted autoPlay controls={false} loop >
                        <source src={shareVideoWebm} type="video/webm" />
                        <source src={shareVideoMp4} type="video/mp4" />
                    </video>

                    {/* puts a black faded overlay over the video */}
                    <div className="absolute flex flex-col justify-center items-center top-0 right-0 left-0 bottom-0 bg-blackOverlay">

                        {/*Logo */}
                        <div className="p-5">
                            <img src={logo} width="130px" alt="logo" />
                        </div>

                        {/*Google Login */}
                        <div className="shadow-2xl">
                            <GoogleLogin
                                onSuccess={(responseGoogle)}
                                onFailure={responseGoogle}
                                cookiePolicy="single_host_origin"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </GoogleOAuthProvider>
    )
}

export default Login