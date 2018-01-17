// ===============================================================================
// LOAD DATA
// We are linking our routes to a series of "data" sources.
// These data sources hold arrays of information on table-data, waitinglist, etc.
// ===============================================================================
const friendsData = require('../data/friends')

// ===============================================================================
// ROUTING
// ===============================================================================

module.exports = function (app) {
    // API GET Requests
    // Below code handles when users "visit" a page.
    // In each of the below cases when a user visits a link
    // (ex: localhost:PORT/api/admin... they are shown a JSON of the data in the table)
    // ---------------------------------------------------------------------------

    app.get("/api/friends", function (req, res) {
        res.json(friendsData);

    });

    app.post("/api/friends", function (req, res) {
        
        let userAnswers = req.body
        let currentBestfriend = {
            totalDifference: 50
        }
        
        for (let i = 0; i < friendsData.length; i++) {
            let totalDifference = 0;
            for (let j = 0; j < friendsData[i].scores.length; j++) {
                let currentFriendScore = friendsData[i].scores[j];
                let currentUserScore = userAnswers.scores[j];
                let difference = Math.abs(currentFriendScore - currentUserScore);
                totalDifference += difference;
            }
            if (currentBestfriend.totalDifference > totalDifference) {
                currentBestfriend = friendsData[i];
                currentBestfriend.totalDifference = totalDifference;
            }
        }
        console.log(currentBestfriend)
        res.json(currentBestfriend)
    });


};
