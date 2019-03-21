const unirest = require("unirest")
const API_KEY = "04zoL3Ucl4mshPKHUP6HUGW66YNop1hnJB8jsn9WmuXcgVgpjQ"

module.exports = {
    askQuestion: (question) => {
        let url = "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/quickAnswer"
        let data = {
            "q": question
        }
        return new Promise((resolve, reject) => {
            unirest.get(url)
            .header("X-RapidAPI-Key", API_KEY)
            .query(data)
            .end(function(response) {
                console.log(response.status)
                if (response.err) {
                    reject(response.err)
                }
                
                resolve(response.body)
            })
            
        })
        
    },
    askTrivia: ()=>{
        let url2 = "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/food/jokes/random"
        return new Promise((resolve, reject) => {
            unirest.get(url2)
            .header("X-RapidAPI-Key", API_KEY)
            .end(function(response) {

                console.log(response)
                console.log(response.status)
                if (response.err) {
                    console.log(response.err)
                    // reject(response.err)
                }
                
                resolve(response.body)
            })
        })
    }
}