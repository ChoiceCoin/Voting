#Copyright Choice Coin DAO 2022
#Seller

# Imports
from tkinter import *
from tkinter.messagebox import *
import csv

master = Tk()
label1 = Label(master, text = 'Enter Choice Rewards', relief = 'groove', width = 25)
label2 = Label(master, text = 'Enter Service Fee', relief = 'groove', width = 25)
label3 = Label(master, text = 'Enter Voting Issue', relief = 'groove', width = 25)
label4 = Label(master, text = 'Enter Option 1', relief = 'groove', width = 25)
label5 = Label(master, text = 'Enter Option 2', relief = 'groove', width = 25)

#Input
entry1 = Entry(master, relief = 'groove', width = 12)
entry2 = Entry(master, relief = 'groove', width = 12)
entry3 = Entry(master, relief = 'groove', width = 12)
entry4 = Entry(master, relief = 'groove', width = 12)
entry5 = Entry(master, relief = 'groove', width = 12)

def write():
    
    #Define Variavles
    Rewards = str(entry1.get())
    Fee = str(entry2.get())
    Issue = str(entry3.get())
    Option_1 = str(entry4.get())
    Option_2 = str(entry5.get())
    #Openfile
    with open('Tita.csv', 'a') as csvfile:
    #define fieldnames
        fieldnames = ['Rewards', 'Fee', 'Issue', 'Option_1', 'Option_2']
    #define writer
        writer = csv.DictWriter(csvfile, fieldnames=fieldnames)
    #Write
        writer.writerow({'Rewards': Rewards, 'Fee':Fee, 'Issue':Issue, 'Option_1': Option_1, 'Option_2':Option_2})

button1 = Button(master, text = 'Submit', relief = 'groove', width = 20, command = write)
button2 = Button(master, text = 'Submit', relief = 'groove', width = 20, command = write)
button3 = Button(master, text = 'Submit', relief = 'groove', width = 20, command = write)
button4 = Button(master, text = 'Submit', relief = 'groove', width = 20, command = write)
button5 = Button(master, text = 'Submit', relief = 'groove', width = 20, command = write)

#Geometry
label1.grid( row = 1, column = 1, padx = 10 )
label2.grid( row = 2, column = 1, padx = 10 )
label3.grid( row = 3, column = 1, padx = 10 )
label4.grid( row = 4, column = 1, padx = 10 )
label5.grid( row = 5, column = 1, padx = 10 )

entry1.grid( row = 1, column = 2, padx = 10 )
entry2.grid( row = 2, column = 2, padx = 10 )
entry3.grid( row = 3, column = 2, padx = 10 )
entry4.grid( row = 4, column = 2, padx = 10 )
entry5.grid( row = 5, column = 2, padx = 10 )

button1.grid( row = 1, column = 3, columnspan = 2)
button2.grid( row = 2, column = 3, columnspan = 2)
button3.grid( row = 3, column = 3, columnspan = 2)
button4.grid( row = 4, column = 3, columnspan = 2)
button5.grid( row = 5, column = 3, columnspan = 2)

#Static Properties
master.title('Tita')
