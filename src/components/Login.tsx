import { useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"
import Cookies from "js-cookie"

export default function Login() {
    const navigate = useNavigate();
    const [isLoggedin, setIsLoggedin] = useState(false);

    const handleClick = () => {
        const callbackUrl = `${window.location.origin + window.location.pathname}`
        const clientId = "za494vsn5kp152w0hm2el34acjlfww"
        const scopes = ["user:read:subscriptions", "user:read:email"]
        const scopeStr = scopes.map((i) =>
            encodeURIComponent(i)).join("%20")

        const targetUrl = `https://id.twitch.tv/oauth2/authorize?redirect_uri=${encodeURIComponent(callbackUrl)}&response_type=token&client_id=${clientId}&scope=${scopeStr}`;
        console.log(callbackUrl);
        window.location.href = targetUrl;
    };

    useEffect(() => {
        const accessTokenRegex = /access_token=([^&]+)/;
        const isMatch = window.location.href.match(accessTokenRegex);

        if (isMatch) {
            const accessToken = isMatch[1];
            Cookies.set("access_token", accessToken);
            setIsLoggedin(true);
        }
    }, []);

    useEffect(() => {
        if (isLoggedin) {
            navigate("/secure");
        }
    }, [isLoggedin, navigate]);

    return (
        <div className="root">
            <div>
                <h1>Check SkittishAndBus Subscription</h1>
                <div className="btn-container">
                    <button className="btn btn-primary" onClick={handleClick}>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 256 256"
                            shapeRendering="geometricPrecision"
                            textRendering="geometricPrecision"
                            imageRendering="optimizeQuality"
                            fillRule="evenodd"
                            clipRule="evenodd"
                            width={20}
                            height={20}
                        >
                            <path d="M71.99927,244A4.00074,4.00074,0,0,1,68,240V204H48a12.01336,12.01336,0,0,1-12-12V48A12.01336,12.01336,0,0,1,48,36H208a12.01336,12.01336,0,0,1,12,12V156.253a11.96633,11.96633,0,0,1-4.31824,9.21875l-42.89587,35.74707A12.02578,12.02578,0,0,1,165.10364,204H122.89636a4.00351,4.00351,0,0,0-2.56054.92774l-45.77515,38.1455A4.001,4.001,0,0,1,71.99927,244ZM48,44a4.00427,4.00427,0,0,0-4,4V192a4.00426,4.00426,0,0,0,4,4H72a4.00012,4.00012,0,0,1,4,4v31.46l39.21423-32.67871A12.02521,12.02521,0,0,1,122.89636,196h42.20728a4.00356,4.00356,0,0,0,2.56054-.92773l42.89649-35.74707A3.98686,3.98686,0,0,0,212,156.253V48a4.00427,4.00427,0,0,0-4-4Z"/>
                            <path d="M168,140a4.00011,4.00011,0,0,1-4-4V88a4,4,0,0,1,8,0v48A4.00011,4.00011,0,0,1,168,140Z"/>
                            <path d="M120,140a4.00011,4.00011,0,0,1-4-4V88a4,4,0,0,1,8,0v48A4.00011,4.00011,0,0,1,120,140Z"/>
                        </svg>
                        Log in with Twitch
                    </button>
                </div>
            </div>
        </div>
    );
}