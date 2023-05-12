const express = require("express");
const app = express();
const axios = require("axios");
const cors = require("cors");

app.use(cors({
    origin: '*'
}));

app.get("/:username", async (req, res) => {
    try {
        if (req.params.username === undefined || req.params.username === "" || req.params.username === "null" || req.params.username === null) {
            throw new Error("empty");
        }
        else {
            const result = await axios.default.get(`http://www.instagram.com/api/v1/users/web_profile_info/?username=${req.params.username}`, 
            {
                headers: {
                    "User-Agent": `Mozilla/5.0 (iPhone; CPU iPhone OS 12_3_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 Instagram 105.0.0.11.118 (iPhone11,8; iOS 12_3_1; en_US; en-US; scale=2.00; 828x1792; 165586599)","type":"text","enabled":true`
                }
            });

            const followerCount = result.data["data"]["user"]["edge_followed_by"]["count"];

            res.status(200).json(
                {
                    "followerCount": followerCount
                }
            );
        }
    } catch (error) {
        res.send("bi şeyler ters gitti");
        console.log("hata: " + error);
    }
})

const port = process.env.PORT || 3434;

app.listen(port, ()=> {
    console.log(`running on ${port}`);
})