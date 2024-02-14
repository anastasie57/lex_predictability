# where your experiment is hosted
# removing initial "http://" or "https://",
# removing tildes, hyphens/dashes,
# and substituting slashes, etc. with periods.
# for example, if your experiment is at  http://www.awesome-university.edu/~hotshot/questionnaire/,
# enter the following string:
experigen.sourceURL = "anastasie57.github.io.lex_predictability"
# the following information comes from your settings.js file:
experigen.experimentName = "faierpredicttest"
experigen.database = "https://sdb.phonologist.org/experigen1/"

# first, send some info to the server with the current
# sourceURL and experimentName by submitting at least one screen
# to the server.
# otherwise, the server will return an error message

email = read.csv(paste(experigen.sourceUrl, "&file=email.csv", sep=""), sep="\t")
email$time = as.POSIXct(strptime(as.character(email$time), "%a %b %d %H:%M:%S %Y"))
write.csv(email, "email.csv")

# check for usage of the experiment (number of page views per participant)
experigen.users  =  paste(experigen.database, "users.cgi?experimentName=", experigen.experimentName, "&sourceurl=", experigen.sourceURL, sep="")
print('reading users')
users = read.csv(experigen.users, sep="\t")
write.csv(users, "users.csv")

# read the experimental results from the server
experigen.url  =  paste(experigen.database, "makecsv.cgi?experimentName=", experigen.experimentName, "&sourceurl=", experigen.sourceURL, sep="")
print('reading xp')
xp  = read.csv(experigen.url, sep="\t")
xp$time = as.POSIXct(strptime(as.character(xp$time), "%a %b %d %H:%M:%S %Y"))
write.csv(xp, "xp.csv")

print('reading meta')
meta = read.csv(paste(experigen.url, "&file=agreement.csv", sep=""), sep="\t")
meta$time = as.POSIXct(strptime(as.character(meta$time), "%a %b %d %H:%M:%S %Y"))

# assuming all went well, write to disk
# so that the results are saved even after the database server is gone
# it would be unwise not to keep a local copy of your results
write.csv(meta, "meta.csv")

# optional cleanup: remove all variables that begin with "experigen."
rm(list=ls(pattern="^experigen."))
