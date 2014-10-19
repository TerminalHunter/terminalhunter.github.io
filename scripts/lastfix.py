import os, sys

for y in range(0,69):
	for x in range(0,69):
		try:
#			print ("Get 7_"+str(x)+"_"+str(y)+".jpg and turn it into "+str(y)+"_"+str(x)+".jpg")
			prependx = str(x)
			prependy = str(y)
			if x < 10:
				prependx = "0"+str(x)
			if y < 10:
				prependy = "0"+str(y)
			os.rename(r"C:\Users\Hunter\Desktop\OLDPLAINMAP\AFTERFIX2\\"str(x)+"_"+str(y)+".png", r"C:\Users\Hunter\Desktop\OLDPLAINMAP\AFTERFIX1\AFTERFIX2\AFTERFIX3\\"+prependx+"_"+prependy+".png")
		except:
			print("Could not make "+str(y)+"_"+str(x)+".jpg")