// Inclass Fetch Exercise
// ======================
//
// Navigate to https://webdev-dummy.herokuapp.com/sample
//
// This endpoint returns a list of articles.  Your assignment is to
// write a function countWords that uses fetch() to query the endpoint,
// and return a map from the article id to the number of words in the
// article's text.
//
// Also write two "helper" functions that call this initial function.
//
// If there are any exceptions then fetch() will throw an error.
// Provide a "safe" version of the countWords function that always
// returns a map, which will be empty in the case of errors.
//
// Finally, write a function that returns the article id with the
// most number of words.
//
// Below I have provided you a template, you just need to fill in
// the implementation.
//
// Navigate to mocha-inclass-fetch.html to see if your implementation
// provides the expected results.
//
// Note that during the validation of the tests the browser will be
// directed to download invalid URLs which will result in error messages
// in the console:
//     GET https://webdev-dummy.herokuapp.com/badURL 404 (Not Found)
// this is expected and is not an error with your code.
//

(function(exports) {

    'use strict'
    
    function countWords(url) {
        // IMPLEMENT ME
        return fetch(url)
            .then(res => {
                // return an object { articleId: wordCount }
                return res.json()
                    .then(thisJSON => {
                        console.log(thisJSON)
                        document.result = {}
                        thisJSON.articles.forEach(function(article){
                            //console.log(article.author)
                            document.result[article._id] = article.text.split(" ").length
                        })
                        console.log("Results: ")
                        console.log(document.result)
                        return document.result
                    })
            })
    }
    
    function countWordsSafe(url) {
        // IMPLEMENT ME
        return countWords(url)
            .then(res => {
                console.log('this is inside countWordsSafe')
                throw new Error('There was a problem...')
            })
            .catch(err => {
                console.error(`Error inside countWordsSafe: ${err.message}`);
                return {  }
            })
    }

    function getLargest(url) {
        // IMPLEMENT ME
        return countWords(url)
            .then(res => {
                //console.log("Down here")
                //console.log(res)
                res.maxEl = [1, 0]
                for(var key in res){
                    res.curKey = key;
                    //console.log("In here w/" + res[key])
                    if(res.maxEl[1] <= res[key]){
                        res.maxEl=[res.curKey, res[res.curKey]]
                    }
                }
                console.log(res.maxEl)
                return res.maxEl
            })
    }

    exports.inclass = {
        author: "cjb6",
        countWords, countWordsSafe, getLargest
    }
    
    getLargest("https://webdev-dummy.herokuapp.com/sample")

})(this);