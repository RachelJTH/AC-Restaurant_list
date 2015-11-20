## Download package "affy" from bioconductor
#source("http://bioconductor.org/biocLite.R")
#biocLite("affy")

##normalize.AffyBatch.invariantset(abatch, prd.td = c(0.003, 0.007),
##                                  verbose = FALSE,
##                                 baseline.type = c("mean","median","pseudo-mean","pseudo-median"),
##                                 type = c("separate","pmonly","mmonly","together"))

##normalize.invariantset(data, ref, prd.td=c(0.003,0.007))

## path of array intensity data
setwd("D:/RachelHuang/microRNA analysis/invariant set normalization/test sample/")
rawdat <- read.table(file="RawData.txt", sep="\t", header=TRUE)
rawdat <- rawdat[grep("_hs_",rawdat$ID),]
rownames(rawdat) <- rawdat$ID
rawdat$ID <- NULL

vec9122 <- c(rawdat[1])
vec9123 <- c(rawdat[2],1)
vec9124 <- c(rawdat[3],1)
vec8921 <- c(rawdat[4],1)
vec8923 <- c(rawdat[5],1)
vec8925 <- c(rawdat[6],1)

totalVec <- c(vec9122,vec9123,vec9124,vec8921,vec8923,vec8925)
ref <- apply(rawdat, 1, mean)
#use average of each probe intensity as baseline value
vec_Ref <- c(ref)#numeric

ch_vecRef = as.character(vecRef) #character

for(im in vec9122){
  print(im)
  
  nu_vec9122 <- as.numeric(vec9122[1])
}


library('affy')
result = normalize.invariantset(vec9122,vec_Ref, prd.td=c(0.003,0.007))

