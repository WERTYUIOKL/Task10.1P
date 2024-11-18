import React, { useState } from "react";
import "./bottomsection.css";

const BottomBar = () => {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");

    const handleSubscribe = async () => {
        if (!email) {
            setMessage("Please enter a valid email.");
            return;
        }

        try {
            const response = await fetch("http://localhost:3000/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ Email: email }),
            });

            if (response.ok) {
                const result = await response.json();
                setMessage(result.message);
                setEmail(""); 
            } else {
                const error = await response.json();
                setMessage(error.error || "Subscription failed.");
            }
        } catch (err) {
            console.error("Error subscribing:", err);
            setMessage("An error occurred. Please try again.");
        }
    };

    return (
        <div className="Btm_bar">
            <p>Sign Up for Daily Insider</p>
            <input
                type="email"
                placeholder="Enter Your Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <button onClick={handleSubscribe}>SUBSCRIBE</button>
            {message && <p className="message">{message}</p>}
        </div>
    );
};

export default BottomBar;
