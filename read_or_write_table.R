#swich to target directory
getwd()
setwd('D:/RachelHuang/R_data_set/')

#construct a new data frame
data = data.frame(a=c(1,5,4),b=c(7,6,7))
data

#write table or other text file
write.table(data,file = 'data.txt',sep=" ")

#read table or other text file
test.data = read.table(header = TRUE,'data.txt')
test.data
