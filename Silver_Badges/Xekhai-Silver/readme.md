# Steps

Installed and setup Flask-Mail(index.py)

Added Email field to create template

Send email notification when voter is added and save email

When Start vote is initiated, All saved emails are sent a notification that the vote process has begun

During the Vote, email is entered to receive the transaction reference.

On submit, An email is sent with the transaction reference

When the vote is ended, All saved email are sent a notication and results of the election.


# Screenshots of Emails
http://imgur.com/a/C9HMtDS

## Notable code changes and additions

Index.py

```
from flask_mail import Mail,Message

#only update MAIL_USERNAME and MAIL_PASSWORD if gmail
app.config['MAIL_SERVER'] = 'smtp.gmail.com'
app.config['MAIL_PORT'] = 465
app.config['MAIL_USERNAME'] = ''
app.config['MAIL_PASSWORD'] = ''
app.config['MAIL_USE_TLS'] = False
app.config['MAIL_USE_SSL'] = True

mail=Mail(app)

#Same logic for @app.route /end, edit message.


@app.route('/start', methods=['POST', 'GET'])
def start_voting():
    error = ''
    messe = ''
    global finished
    if request.method == 'POST':
        key = hashing(str(request.form.get('Key')))
        if key == my_key:
            msg = 'Hi, Voting Has Begun, You can now vote'
            subject = 'Choice Coin Voting'
            
            messe = 'Votes Started'
            finished = False
            test = cur.execute("SELECT email FROM USER")
            rows = cur.fetchall()
            mails=[]

            for row in rows:
                mails.append(row[0])
            message = Message(subject, sender='Choice Coin Voting', recipients=mails)
            message.body = msg
            mail.send(message)
            print (mails)
        else:
            error = "Incorrect admin key"
    return render_template("start.html", message=messe, error=error)

#Send reference to email after voting
@app.route('/submit', methods=['POST', 'GET'])
def submit():
    error = ''
    message = ''
    subject = 'Choice Coin Voting'
    global validated
    if not validated:
        return redirect(url_for('vote'))
    else:
        if request.method == 'POST':
            vote = request.values.get("options")
            if vote == 'option1':
                vote = "YES"
                message = election_voting(vote)
                msg = 'Hi, Your vote has been logged.Your Transaction reference is ' + message
                message = Message(subject, sender='Choice Coin Voting', recipients=[request.form.get('mail')])
                message.body = msg
                mail.send(message)
                message = 'Thanks for voting'
            
            elif vote == 'option2':
                vote = "NO"
                message = election_voting(vote)
                msg = 'Hi, Your vote has been logged.Your Transaction reference is ' + message
                message = Message(subject, sender='Choice Coin Voting', recipients=[request.form.get('mail')])
                message.body = msg
                mail.send(message)
                message = 'Thanks for voting'
        
            else:
                error = "You did not enter a vote"
    return render_template('submit.html', message=message, error=error)
```
