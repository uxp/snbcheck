import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

interface SubDetails {
    broadcaster_id: string | null;
    broadcaster_name: string | null;
    broadcaster_login: string | null;
    tier: string | null;
    is_gift: boolean | null;
}

export default function Secure() {
    const navigate = useNavigate();
    // @ts-expect-error  "Just shut up"
    const [subDetails, setSubDetails] = useState<SubDetails>({})

    const validateToken = async (accessToken: string) => {
        const resp = await fetch(`https://id.twitch.tv/oauth2/validate`, {
            headers: {
                Authorization: `OAuth ${accessToken}`,
            },
        });
        return (resp.status === 200)
    }

    const getUserInfo = async (accessToken: string) => {
        const resp = await fetch(`https://id.twitch.tv/oauth2/userinfo`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
        if (resp.status === 200) {
            const data = await resp.json();
            return data.sub;
        }
    };

    const getUserSubscriptions = async (accessToken: string, userId: number) => {
        const resp = await fetch(`https://api.twitch.tv/helix/subscriptions/user?user_id=${userId}&broadcaster_id=68036912`, {

            headers: {
                Authorization: `Bearer ${accessToken}`,
                "Client-ID": "za494vsn5kp152w0hm2el34acjlfww"
            },
        });
        if (resp.status === 200) {
            const data = await resp.json();
            setSubDetails(data.data[0]);
        } else {
            console.log("error");
        }
    }

    const getTierString = (tier: string) => {
        switch (tier) {
            case "1000":
                return "Tier 1";
            case "2000":
                return "Tier 2";
            case "3000":
                return "Tier 3";
            default:
                return "Unknown";
        }
    }

    useEffect(() => {
        const accessToken = Cookies.get("access_token");

        if (accessToken) {
            validateToken(accessToken).then((value) => {
                if (value) {
                    console.log("valid");
                    getUserInfo(accessToken).then((user_id) => {
                        if (user_id) {
                            console.log(`user details for ${user_id}`);
                            getUserSubscriptions(accessToken, user_id);
                        }
                    });
                }
            });
        } else {
            navigate("/");
        }
    }, [navigate]);

    return (
        <>
            {subDetails ? (
                <div className="user-profile">
                    <div className="card">
                        <h1 className="broadcaster">{subDetails.broadcaster_name}</h1>
                        <p className="details">
                            {`You have a ${subDetails.is_gift ? "gifted sub" : "paid"} subscription at ${subDetails.tier ? getTierString(subDetails.tier) : "..."}!!!`}
                        </p>
                    </div>
                </div>
            ) : (
                <div>
                    <h1>Loading...</h1>
                </div>
            )}
        </>
    );
}