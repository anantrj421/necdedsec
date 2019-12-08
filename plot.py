import matplotlib.pyplot as plt
X = [1,2,3,4,5]
y = [100,98,90,99,97]
plt.plot(X,y)
plt.ylabel('humidity')
plt.xlabel('day')
plt.title('Humidity of last 5 days')
plt.savefig('static/images/new_plot1.png')