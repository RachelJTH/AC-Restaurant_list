## Download package "affy" from bioconductor
source("http://bioconductor.org/biocLite.R")
biocLite("affy")

## path of array intensity data
setwd("D:/RachelHuang/microRNA analysis/invariant set normalization/test sample/")
rawdat <- read.table(file="RawData.txt", sep="\t", header=TRUE)
rawdat <- rawdat[grep("_hs_",rawdat$ID),]
rownames(rawdat) <- rawdat$ID
rawdat$ID <- NULL
#rawdat <- as.matrix(rawdat)

rawdat[1]  #vec9122
#transform to vectors for feeding "affy"
class(rawdat[1])
for(i in rawdat[1]){
  #print (i)
  item<-as.numeric(i)
  
  }
vec9122<- c(as.numeric(rawdat[1]))
#head(vec9122)
vec9123<- c(rawdat[2],1)
#head(vec9123)
vec9124 <- c(rawdat[3],1)
vec8921 <- c(rawdat[4],1)
vec8923 <- c(rawdat[5],1)
vec8925 <- c(rawdat[6],1)
totalVec <- c(vec9122,vec9123,vec9124,vec8921,vec8923,vec8925)
ref <- apply(rawdat, 1, mean)
#use average of each probe intensity as baseline value
vecRef <- c(ref)
ch_vecRef = as.character(vecRef)
nu_vec9122 = as.numeric(vec9122)
class(vec9122[1])

library('affy')
## Download package "affy" from bioconductor
source("http://bioconductor.org/biocLite.R")
biocLite("affy")

??'normalize.invariantset'
normalize.invariantset(vec9122, vecRef, prd.td=c(0.003,0.007))
#ref <- as.matrix(ref)
#normdat <- rawdat[,1]
#norm <- normalize.invariantset(normdat, ref)

