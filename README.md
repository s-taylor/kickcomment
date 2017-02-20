# Kick(starter) Comment API

## Objective

This project is aiming to implement a kickstarter comment search engine. Currently there is no feature to facilitate searching kickstarter comments, this makes it difficult to know whether a question has already been asked before, or search for comments from a particular user. Furthermore, only 50 comments are shown on a page at a time meaning if you want to search all comments using the browser's find, you first need to click the Load More Comments button many many times to load all the comments.

## Solution

* Implement an API that can scrape all of the comments for a particular project
* Provide the ability to search through these comments using a given keyword or username

I'm using this as an oppurtunity to also learn AWS Lambda as it is the perfect candidate as an API to scrape comments adhoc (as requested by the user), so the Lamdba configuration (using the Serverless framework) will be included in the repo.

Finally a basic front end UI will need to be built to facilitate searching. This will be done under a separate repo once the API is built.

