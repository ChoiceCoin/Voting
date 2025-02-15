import matplotlib.pyplot as plt

x=[1,2,3,4]
y=[2,4,8,12]

def draw(x,y):
    plt.hist(x,y)
    plt.savefig('old.png')
    plt.show()

draw(x,y)