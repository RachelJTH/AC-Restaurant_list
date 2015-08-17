#practice
library(car)
data(Quartet)
str(Quartet)

#simple regression
plot(Quartet$x,Quartet$y1)##plot(x-axis, y-axis)
lmfit=lm(Quartet$y1~Quartet$x)
abline(lmfit,col='red')

predict(lmfit,data.frame(Quartet$x1))

#by Isfit(simple regression)
plot(Quartet$x,Quartet$y1)
lmfit2=lsfit(Quartet$x,Quartet$y1)
abline(lmfit2,col="red")

??predict

#test
fbgood=read.csv(file="fbgood.txt",header=TRUE,sep="\t")

lmfit=lm(fbgood$getgoods~fbgood$friends)
abline(lmfit,col="red")
attach(fbgood) ##can use column names directly!(normal>> name of dataframe$column name)
plot(friends,getgoods)
lmfit2=lm(getgoods~poly(friends,2)) ##using second Regression
lines(sort(friends),lmfit2$fit[order(friends)],col="blue")

lmfit3=lm(getgoods~poly(friends,3)) ##use third Regression
lines(sort(friends),lmfit3$fit[order(friends)],col="red")
