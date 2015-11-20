

##++++++++++++ original code from affy invariant set normalization!! +++++++++++++++##########

function (abatch, prd.td = c(0.003, 0.007), verbose = FALSE, 
          baseline.type = c("mean", "median", "pseudo-mean", "pseudo-median"), 
          type = c("separate", "pmonly", "mmonly", "together")) 
{
  do.normalize.Affybatch.invariantset <- function(abatch, pms, 
                                                  prd.td, baseline.type) {
    nc <- length(abatch)
    if (baseline.type == "mean") {
      m <- vector("numeric", length = nc)
      for (i in 1:nc) m[i] <- mean(intensity(abatch)[pms, 
                                                     i])
      refindex <- match(trunc(median(rank(m))), rank(m))
      rm(m)
      baseline.chip <- c(intensity(abatch)[pms, refindex])
      if (verbose) 
        cat("Data from", sampleNames(abatch)[refindex], 
            "used as baseline.\n")
    }
    else if (baseline.type == "median") {
      m <- vector("numeric", length = nc)
      for (i in 1:nc) m[i] <- median(intensity(abatch)[pms, 
                                                       i])
      refindex <- match(trunc(median(rank(m))), rank(m))
      rm(m)
      baseline.chip <- c(intensity(abatch)[pms, refindex])
      if (verbose) 
        cat("Data from", sampleNames(abatch)[refindex], 
            "used as baseline.\n")
    }
    else if (baseline.type == "pseudo-mean") {
      refindex <- 0
      baseline.chip <- rowMeans(intensity(abatch)[pms, 
                                                  ])
    }
    else if (baseline.type == "pseudo-median") {
      refindex <- 0
      baseline.chip <- rowMedians(intensity(abatch)[pms, 
                                                    ])
    }
    normhisto <- vector("list", length = nc)
    for (i in (1:nc)) {
      if (i != refindex) {
        if (verbose) 
          cat("normalizing array", sampleNames(abatch)[i], 
              "...")
        tmp <- normalize.invariantset(c(intensity(abatch)[pms, 
                                                          i]), c(baseline.chip), prd.td)
        tmp <- as.numeric(approx(tmp$n.curve$y, tmp$n.curve$x, 
                                 xout = intensity(abatch)[pms, i], rule = 2)$y)
        attr(tmp, "invariant.set") <- NULL
        intensity(abatch)[pms, i] <- tmp
        if (verbose) 
          cat("done.\n")
      }
    }
    attr(abatch, "normalization") <- normhisto
    return(abatch)
  }
  type <- match.arg(type)
  baseline.type <- match.arg(baseline.type)
  if (type == "pmonly") {
    pms <- unlist(pmindex(abatch))
    do.normalize.Affybatch.invariantset(abatch, pms, prd.td, 
                                        baseline.type)
  }
  else if (type == "mmonly") {
    pms <- unlist(mmindex(abatch))
    do.normalize.Affybatch.invariantset(abatch, pms, prd.td, 
                                        baseline.type)
  }
  else if (type == "together") {
    pms <- unlist(indexProbes(abatch, "both"))
    do.normalize.Affybatch.invariantset(abatch, pms, prd.td, 
                                        baseline.type)
  }
  else if (type == "separate") {
    pms <- unlist(pmindex(abatch))
    abatch <- do.normalize.Affybatch.invariantset(abatch, 
                                                  pms, prd.td, baseline.type)
    pms <- unlist(mmindex(abatch))
    do.normalize.Affybatch.invariantset(abatch, pms, prd.td, 
                                        baseline.type)
  }
}


##########--------------------------main program-------------------------------#######
### try dual channel using genepix
library(limma)
## limma format to transfer to RGlist
setwd("D:/RachelHuang/microRNA analysis/invariant set normalization/miRNA Gpr")

####test sample 1####
channel_path<-"D:/RachelHuang/microRNA analysis/invariant set normalization/miRNA Gpr"
targets <- readTargets(file="targets.txt", sep="\t", quote="\"'")


##single channel test>>
Red<- "F635 Median"
Red_back<-"B635 Median"
green<-"F635 Median"
green_back<-"B635 Median"
x <-read.maimages(targets$FileName, source="genepix", 
                  path=channel_path, columns=c(R=Red,Rb=Red_back,G=green,Gb=green_back))

#, annotation = c("ID"
##two channel test>>
#Red<- "F635 Median"
#Red_back<-"B635 Median"
#green<-"F532 Median"
#green_back<-"B532 Median"
#abatch_genepix <-read.maimages(two_channel_gprFileName,source="genepix.median", 
#                  path=two_channel_path, columns=c(R= Red,G=green,Rb=Red_back,Gb=green_back))

library(ExiMiR)
library(Biobase)
library(affy)

## select which probe id is "_cgh_" pattern
abatch_genepix <- x[grep("_mr_",x$genes$ID),]

## convert "" Name into string "empty"
#for(i in c(1:length(x$genes[,5]))){
#  itemName<-x$genes[i,5]
#  if(is.na(itemName)==TRUE){
#    #print("empty item name")
#    x$genes[i,5]<-"empty"
#  }
#}

##=====creates an AffyBatch object from a limma object (RGList, EListRaw, MAList)====
#  or from any appropriate list object.#
#test1
affyObject<-createAB(x, ref.channel ="R" , verbose=TRUE,genes.block=x$genes[1]
                     ,genes.name = x$genes[4], genes.row=x$genes[2],genes.col=x$genes[3],
                     genes.id = x$genes[5], env.overwrite=TRUE)


