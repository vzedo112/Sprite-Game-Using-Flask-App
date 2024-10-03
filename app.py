from flask import Flask, render_template, session, redirect, url_for, g, request
from database import get_db, close_db
from flask_session import Session
from werkzeug.security import generate_password_hash, check_password_hash
from forms import RegistrationForm, LoginForm
from functools import wraps

app = Flask(__name__)
app.teardown_appcontext(close_db)
app.config["SECRET_KEY"] = "this-is-my-secret-key"
app.config["SESSION_PERMANENT"] = False
app.config["SESSION_TYPE"] = "filesystem"
Session(app)

@app.before_request
def logged_in_user():
    g.user = session.get("user_id", None)

def login_required(view):
    @wraps(view)
    def wrapped_view(*args, **kwargs):
        if g.user is None:
            return redirect(url_for("login", next=request.url))
        return view(*args, **kwargs)
    return wrapped_view


@app.route("/",  methods=["GET", "POST"])
def slash():
    return redirect(url_for("index"))


@app.route("/index",  methods=["GET", "POST"])
def index():
        return render_template("index.html")


@app.route("/register", methods=["GET", "POST"])
def register():
    form = RegistrationForm()
    if form.validate_on_submit():
        user_id = form.user_id.data
        password = form.password.data
        password2 = form.password2.data
        db = get_db()
        possible_clashing_user = db.execute("""SELECT * FROM users
                                                WHERE user_id = ?;""", (user_id,)).fetchone()
        if possible_clashing_user is not None:
            form.user_id.errors.append("User id already taken!")
        else:
            db.execute("""INSERT INTO users (user_id, password)
                        VALUES(?,?);""",
                        (user_id, generate_password_hash(password)))
            db.commit()
            return redirect( url_for("login"))
    return render_template("register.html", form=form)


@app.route("/login", methods=["GET", "POST"])
def login():
    form = LoginForm()        
    if form.validate_on_submit():
        user_id = form.user_id.data
        password = form.password.data
        db = get_db()
        possible_clashing_user = db.execute("""SELECT * FROM users
                                                WHERE user_id = ?;""", (user_id,)).fetchone()
        if possible_clashing_user is None:
            form.user_id.errors.append("No such user!")
        elif not check_password_hash(possible_clashing_user["password"], password):
            form.password.errors.append("Incorrect password")
        else:
            session.clear()
            session["user_id"] = user_id
            next_page = request.args.get("next")
            if not next_page:
                next_page = url_for("index")
            return redirect(next_page)
    return render_template("login.html", form=form)

@app.route("/logout")
def logout():
    session.clear()
    return redirect( url_for("index"))

@app.route("/game")
@login_required
def game():
    return render_template("game.html")

@app.route("/store_score", methods=["POST"])
@login_required
def store_score():
    user_id = session.get("user_id")
    score = int(request.form["score"])
    db = get_db()
    existing_record = db.execute("SELECT * FROM scores WHERE user_id = ?", (user_id,)).fetchone()
    if existing_record:
        db.execute("UPDATE scores SET score = ? WHERE user_id = ?", (score, user_id))
    else:
        db.execute("INSERT INTO scores (user_id, score) VALUES (?, ?)", (user_id, score))
    db.commit()
    return "success"

@app.route("/leaderboard", methods=["POST","GET"])
def leaderboard():
    db = get_db()
    scores = db.execute("SELECT user_id, score FROM scores ORDER BY score DESC").fetchall()
    return render_template("leaderboard.html", scores=scores)

@app.route("/Howtoplay")
def howtoplay():
    return render_template("howtoplay.html")