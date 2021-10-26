# Copyright Fortior Blockchain, LLLP 2021
# MIT License

# Import
import csv
from tkinter import *
import tkinter.messagebox as box

# Control
master = Tk()

# Integrate with AlgoSinger or Algorand Wallet to eliminate Mnemnomic Lgoin
# Labels
label0 = Label(master, text = 'Vote on Choice Charities', relief = 'groove', width = 40)
label1 = Label(master, text = 'Charities', relief = 'groove', width = 20)
label2 = Label(master, text = 'Choice', relief = 'groove', width = 20)
label3 = Label(master, text = 'Charity Zero', relief = 'groove', width = 20)
label4 = Label(master, text = 'Charity One', relief = 'groove', width = 20)
label5 = Label(master, text = 'Charity Two', relief = 'groove', width = 20)

# Entries
Entry0 = Entry(master, relief = 'groove', width = 20)
Entry1 = Entry(master, relief = 'groove', width = 20)
Entry2 = Entry(master, relief = 'groove', width = 20)

# Vote
#################
def voter():
    # Get votes
    charity_zero_votes = float(Entry0.get())
    charity_one_votes = float(Entry1.get())
    charity_two_votes = float(Entry2.get())
    # Clear Vote
    Entry0.delete(0, END)
    Entry1.delete(0, END)
    Entry2.delete(0, END)

#Button to run write
b0 = Button(master, text = 'Vote', relief = 'groove', width = 40, command=voter)

#Geometry
#Labels
label0.grid( row = 2, column = 4, padx = 10 )
label1.grid( row = 2, column = 1, padx = 10 )
label2.grid( row = 2, column = 3, padx = 10 )
label3.grid( row = 3, column = 1, padx = 10 )
label4.grid( row = 4, column = 1, padx = 10 )
label5.grid( row = 5, column = 1, padx = 10 )

#Stake
Entry0.grid( row = 3, column = 3, padx = 10 )
Entry1.grid( row = 4, column = 3, padx = 10 )
Entry2.grid( row = 5, column = 3, padx = 10 )

#Buttons
b0.grid( row = 4, column = 4, columnspan = 1)

#Static Properties
master.title('Choice Charities')
    
