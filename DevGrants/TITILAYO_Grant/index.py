from flask import Flask, request, render_template


app = Flask(__name__)


@app.route("/")
def home():
	return render_template('index.html')
"""
if __name__ == "__main__":
	app.run(host='127.0.0.1', debug=True)
"""