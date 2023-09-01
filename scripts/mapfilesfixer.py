import os, sys

counter = 0

#case 3 - y values only go up to 4
#for y in range(0,5):
#	for x in range(0,5):
#		print ("Get 3_"+str(x)+"_"+str(y)+" and turn it into 3_"+str(x)+"_"+str(4-y))
#		os.rename(r"C:\Users\Hunter\Desktop\map\3_"+str(x)+"_"+str(y)+".jpg", r"C:\Users\Hunter\Desktop\BetterMap\3_"+str(x)+"_"+str(4-y)+".jpg")

#case 4

for y in range(0,9):
	for x in range(0,9):
		print ("Get 4_"+str(x)+"_"+str(y)+" and turn it into 4_"+str(x)+"_"+str(8-y))
		os.rename(r"C:\Users\Hunter\Desktop\map\4_"+str(x)+"_"+str(y)+".jpg", r"C:\Users\Hunter\Desktop\BetterMap\4_"+str(x)+"_"+str(8-y)+".jpg")

#case 5

for y in range(0,18):
	for x in range(0,18):
		print ("Get 5_"+str(x)+"_"+str(y)+" and turn it into 5_"+str(x)+"_"+str(17-y))
		os.rename(r"C:\Users\Hunter\Desktop\map\5_"+str(x)+"_"+str(y)+".jpg", r"C:\Users\Hunter\Desktop\BetterMap\5_"+str(x)+"_"+str(17-y)+".jpg")

#case 6

#case 7