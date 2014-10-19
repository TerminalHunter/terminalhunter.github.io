import urllib.request
import time

for x in range(1,8):
	for y in range(0,71):
		for z in range(0,81):
			print("http://map.guildblacksails.com/images/world/"+str(x)+"/"+str(y)+"/"+str(z)+".jpg", str(x)+"_"+str(y)+"_"+str(z)+".jpg")
			try:
				urllib.request.urlretrieve("http://map.guildblacksails.com/images/world/"+str(x)+"/"+str(y)+"/"+str(z)+".jpg", str(x)+"_"+str(y)+"_"+str(z)+".jpg")
				time.sleep(.2)
			except:
				print ("Couldn't grab "+str(x)+" "+str(y)+" "+str(z)+".jpg")
				time.sleep(.1)
				break