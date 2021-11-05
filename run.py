from Choice_Coin_Voting  import create_app, db

app = create_app()

if __name__ == "__main__":
    app.run(debug=True)