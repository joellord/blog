---
path: "/blog/post/2022-02-09_bash_wordle"
date: "2022-02-09"
title: "Build Your Own Wordle in Bash with the Data API"
summary: "I wanted to brush up on my Bash scripting skills, so I thought, “Why not create the Wordle game in Bash?” I figured this would be a good exercise that would include some if statements and loops."
abstract: "I wanted to brush up on my Bash scripting skills, so I thought, “Why not create the Wordle game in Bash?” I figured this would be a good exercise that would include some if statements and loops."
author: "Joel Lord"
formattedDate: "February 9th, 2022"
keywords: ["mongodb", "data api", "bash"]
banner: "goal"
originalSource: "MongoDB Developer Hub"
originalUrl: "https://www.mongodb.com/developer/how-to/wordle-bash-data-api/"
---

By now, you have most certainly heard about [Wordle](https://www.powerlanguage.co.uk/wordle/), the new word game that was created in October 2021 by a former Reddit engineer, [Josh Wardle](https://twitter.com/powerlanguish). It gained so much traction at the beginning of the year even Google has a secret easter egg for it when you search for the game.

I wanted to brush up on my Bash scripting skills, so I thought, “Why not create the Wordle game in Bash?” I figured this would be a good exercise that would include some `if` statements and loops. However, the word list I have available for the possible Wordles is in a MongoDB collection. Well, thanks to the new Atlas Data API, I can now connect to my MongoDB database directly from a Bash script.

Let’s get to work!

## Requirements
You can find the complete source code for this repository on [Github](https://github.com/mongodb-developer/bash-wordle). You can use any [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register) cluster for the data API part; a [free tier](https://docs.atlas.mongodb.com/tutorial/deploy-free-tier-cluster/) would work perfectly. 

You will need [Bash](https://www.gnu.org/software/bash/) Version 3 or more to run the Bash script. 

```bash
$ bash --version
GNU bash, version 3.2.57(1)-release (x86_64-apple-darwin20)
```

You will need [curl](https://curl.se/) to access the Data API. 

```bash
$ curl --version
curl 7.64.1 (x86_64-apple-darwin20.0) libcurl/7.64.1 (SecureTransport) LibreSSL/2.8.3 zlib/1.2.11 nghttp2/1.41.0
```

Finally, you will use [jq](https://stedolan.github.io/jq/) to manipulate JSON objects directly in the command line. 

```bash
jq --version
jq-1.6
```

## Writing the game

The game will run inside a while loop that will accept user inputs. The loop will go on until either the user finds the right word or has reached five tries without finding the right word. 

First, we’ll start by creating a variable that will hold the word that needs to be guessed by the user. In Bash, you don’t need to initialize variables; you can simply assign a value to it. To access the variable, you use the dollar sign followed by the variable's name.

```bash
WORD=MONGO
echo Hello $WORD
# Hello MONGO
```

Next up, we will need a game loop. In Bash, a `while` loop uses the following syntax.

```bash
while [ <condition> ]
do
  # Stuff
done
```

Finally, we will also need an if statement to compare the word. The syntax for `if` in Bash is as follows.

```bash
if [ <condition> ]
then
  # Stuff
elif [ <condition> ]
then
  # Optional else-if block
else 
  # Else block
fi
```


To get started with the game, we will create a variable for the while condition, ask the user for input with the `read` command, and exit if the user input matches the word we have hard-coded.

```bash
WORD=MONGO
GO_ON=1
while [ $GO_ON -eq 1 ]
do
  read -n 5 -p "What is your guess: " USER_GUESS
  if [ $USER_GUESS == $WORD ]
  then
    echo -e "You won!"
    GO_ON=0
  fi
done
```

Save this code in a file called `wordle.sh`, set the execute permission on the file, and then run it.

```bash
$ chmod +x ./wordle.sh
$ ./wordle.sh
```

So far, so good; we now have a loop that users can only exit if they find the right word. Let’s now make sure that they can only have five guesses. To do so, we will use a variable called TRIES, which will be incremented using `expr` at every guess. If it reaches five, then we change the value of the GO_ON variable to stop the main loop.

```bash
GO_ON=1
TRIES=0
while [ $GO_ON -eq 1 ]
do
  TRIES=$(expr $TRIES + 1)
  read -n 5 -p "What is your guess: " USER_GUESS
  if [ $USER_GUESS == $WORD ]
  then
    echo -e "You won!"
    GO_ON=0
  elif [ $TRIES == 5 ]
  then
    echo -e "You failed.\nThe word was "$WORD
    GO_ON=0
  fi
done
```

Let’s now compare the value that we got from the user and compare it with the word. Because we want the coloured squares, we will need to compare the two words letter by letter.  We will use a for loop and use the index `i` of the character we want to compare. For loops in Bash have the following syntax.

```bash
for i in {0…10}
do
  # stuff
done
```

We will start with an empty `STATE` variable for our round result. We will add a green square for each letter if it’s a match, a yellow square if the letter exists elsewhere, or a black square if it’s not part of the solution. Add the following block after the `read` line and before the `if` statement.

```bash
  STATE=""
  for i in {0..4}
  do
    if [ "${WORD:i:1}" == "${USER_GUESS:i:1}" ]
    then
      STATE=$STATE"🟩"
    elif [[ $WORD =~ "${USER_GUESS:i:1}" ]]
    then
      STATE=$STATE"🟨"
    else
      STATE=$STATE"⬛️"
    fi
  done
  echo "  "$STATE
```

Note how we then output the five squares using the `echo` command. This output will tell the user how close they are to finding the solution.

We have a largely working game already, and you can run it to see it in action. The only major problem left now is that the comparison is case-sensitive. To fix this issue, we can transform the user input into uppercase before starting the comparison. We can achieve this with a tool called `awk` that is frequently used to manipulate text in Bash. Right after the `read` line, and before we initialize the empty STATE variable, add the following line to uppercase the user input.

```bash
  USER_GUESS=$(echo "$USER_GUESS" | awk '{print toupper($0)}')
```

That’s it; we now have a fully working Wordle clone. 

## Connecting to MongoDB

We now have a fully working game, but it always uses the same start word. In order for our application to use a random word, we will start by populating our database with a list of words, and then pick one randomly from that collection. 

When working with MongoDB Atlas, I usually use the native driver available for the programming language I’m using. Unfortunately, no native drivers exist for Bash. That does not mean we can’t access the data, though. We can use curl (or another command-line tool to transfer data) to access a MongoDB collection using the new Data API.

To enable the data API on your MongoDB Atlas cluster, you can follow the instructions from the Getting Started with the Data API article.

Let’s start with adding a single word to our `words` collection, in the `wordle` database. Each document will have a single field named `word`, which will contain one of the possible Wordles. To add this document, we will use the `insertOne` endpoint of the Data API.

Create a file called `insert_words.sh`. In that file, create three variables that will hold the URL endpoint, the API key to access the data API, and the cluster name.

```bash
API_KEY="<Your API Key>"
URL="<URL Endpoint For the Data API>"
CLUSTER="<Name of your Cluster>"
```

Next, use a curl command to insert a single document. As part of the payload for this request, you will add your document, which, in this case, is a JSON object with the word “MONGO.” Add the following to the `insert_words.sh` file.

```bash
curl --location --request POST  $URL'/action/insertOne' \
  --header 'Content-Type: application/json' \
  --header 'Access-Control-Request-Headers: *' \
  --header 'api-key: '$API_KEY \
  --data-raw '{
    "collection":"words",
    "database":"wordle",
    "dataSource":"'$CLUSTER'",
    "document": { "word": "MONGO" }
}'
```

Running this file, you should see a result similar to

```
{"insertedId":"620275c014c4be86ede1e4e7"}
```

This tells you that the insert was successful, and that the new document has this `_id`.

You can add more words to the list, or you can import the official list of words to your MongoDB cluster. You can find that list in the `words.json` file in this project’s [repository](https://github.com/mongodb-developer/bash-wordle). You can change the `insert_words.sh` script to use the raw content from Github to import all the possible Wordles at once with the following curl command. This command will use the `insertMany` endpoint to insert the array of documents from Github.

```bash
curl --location --request POST  $URL'/action/insertMany' \
  --header 'Content-Type: application/json' \
  --header 'Access-Control-Request-Headers: *' \
  --header 'api-key: '$API_KEY \
  --data-raw '{
    "collection":"words",
    "database":"wordle",
    "dataSource":"'$CLUSTER'",
    "documents": '$(curl -s https://raw.githubusercontent.com/mongodb-developer/bash-wordle/main/words.json)'
}'
```

Now back to the `wordle.sh` file, add two variables that will hold the URL endpoint, the API key to access the data API, and cluster name at the top of the file.

```bash
API_KEY="<Your API Key>"
URL_ENDPOINT="<URL Endpoint For the Data API>"
CLUSTER="<Name of your Cluster>"
```

Next, we’ll use a curl command to run an aggregation pipeline on our Wordle database. This aggregation pipeline will use the `$sample` stage to return one random word. The curl result will then be piped into `jq`, a tool to extract JSON data from the command line. Jq will return the actual value for the `word` field in the document we get from the aggregation pipeline. All of this is then assigned to the WORD variable. 

Right after the two new variables, you can add this code.

```bash
WORD=$(curl --location --request POST -s $URL'/action/aggregate' \
--header 'Content-Type: application/json' \
--header 'Access-Control-Request-Headers: *' \
--header 'api-key: '$API_KEY \
--data-raw '{
    "collection":"words",
    "database":"wordle",
    "dataSource":"Cluster0",
    "pipeline": [{"$sample": {"size": 1}}]
}' | jq -r .documents[0].word)

```

And that’s it! Now, each time you run the `wordle.sh` file, you will get to try out a new word.

```
What is your guess: mongo  ⬛️🟨🟨⬛️🟨
What is your guess: often  🟨⬛️⬛️⬛️🟩
What is your guess: adorn  🟨⬛️🟨🟨🟩
What is your guess: baron  ⬛️🟩🟨🟩🟩
What is your guess: rayon  🟩🟩🟩🟩🟩
You won!
```

## Summary

That’s it! You now have your very own version of Wordle so that you can practice over and over directly in your favorite terminal. This version only misses one feature if you’re up to a challenge. At the moment, any five letters are accepted as input. Why don’t you add a validation step so that any word input by the user must have a match in the collection of valid words? You could do this with the help of the data API again. Don’t forget to submit a pull request to the repository if you manage to do it!





