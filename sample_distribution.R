download.file("http://www.openintro.org/stat/data/ames.RData", destfile = "ames.RData")
load("ames.RData")
str(ames)
sp = ames$SalePrice
hist(sp)

sample_means50 =rep(NA,5000)
sample_means100 =rep(NA,5000)

for(i in 1:5000){
  samp = sample(sp,50)
  sample_means50[i] = mean(samp)
  samp = sample(sp,100)
  sample_means100[i] = mean(samp)
}

par(mfrow = c(2,1))
xlimits=range(sample_means50)
hist(sample_means50, breaks = 20, xlim = xlimits)
hist(sample_means100, breaks = 20, xlim = xlimits)