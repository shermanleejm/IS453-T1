from flask import Flask, request, jsonify, g
import pandas as pd
import xgboost as xgb
from werkzeug.middleware.proxy_fix import ProxyFix
from flask_cors import CORS
import sqlite3
import json

final_cols_unbanked_refined = [
    "FLAG_OWN_CAR",
    "NAME_EDUCATION_TYPE",
    "DAYS_EMPLOYED",
    "REG_CITY_NOT_LIVE_CITY",
    "AMT_GOODS_PRICE",  ## cost of good to be bought with loan
    "REG_CITY_NOT_WORK_CITY",
    "DAYS_BIRTH",
    "AMT_CREDIT",  ## loan amount
    "NAME_INCOME_TYPE",  ## [businessman, working, maternity leave]
    "NAME_FAMILY_STATUS",  ## [single, married, divorced]
    "OCCUPATION_TYPE",
    "AMT_INCOME_TOTAL",
    "NAME_HOUSING_TYPE",  ## [renting, living with parents, own house]
    "FLAG_OWN_REALTY",  ## own house or not
    "CNT_CHILDREN",
]

amount_prediction_cols = [
    "FLAG_OWN_CAR",
    "NAME_EDUCATION_TYPE",
    "DAYS_EMPLOYED",
    "REG_CITY_NOT_LIVE_CITY",
    "AMT_GOODS_PRICE",
    "REG_CITY_NOT_WORK_CITY",
    "DAYS_BIRTH",
    "NAME_INCOME_TYPE",
    "NAME_FAMILY_STATUS",
    "OCCUPATION_TYPE",
    "AMT_INCOME_TOTAL",
    "NAME_HOUSING_TYPE",
    "FLAG_OWN_REALTY",
    "CNT_CHILDREN",
]

personal_info = ["name", "username", "password", "dob"]


def execute_sql(sql):
    rows = None
    with sqlite3.connect("data.db") as conn:
        cur = conn.cursor()
        cur.execute(sql)
        conn.commit()
        rows = cur.fetchall()
    return rows


def migrations():
    migrations = """
    create table if not exists data (
        name text,
        username text primary key,
        password text,
        dob text,
    """
    cols_sql = []
    for col in final_cols_unbanked_refined:
        cols_sql.append(f"{col} real ")
    migrations += ",".join(cols_sql) + ") ;"
    res = execute_sql(migrations)
    print(res)
    print("migrations complete")


app = Flask(__name__)
with app.app_context():
    migrations()
    xg_reg = xgb.XGBRegressor()
    xg_reg.load_model("model.json")
    xg_reg_amount = xgb.XGBRegressor()
    xg_reg_amount.load_model("model_amount.json")
CORS(app)
app.wsgi_app = ProxyFix(app.wsgi_app)


@app.route("/new_application", methods=["POST"])
def new_application():
    data = request.json
    for col in final_cols_unbanked_refined:
        if data.get(col, None) == None:
            return jsonify(f"missing {col}"), 422
        data[col] = [data[col]]

    keys_sql = ",".join(list(data.keys()))
    values_sql = ",".join(
        [str(x[0]) if isinstance(x, list) else f"'{x}'" for x in list(data.values())]
    )
    sql = f"insert or ignore into data ({keys_sql}) values ({values_sql})"
    execute_sql(sql)
    df = pd.DataFrame.from_dict(data)[final_cols_unbanked_refined]
    preds = xg_reg.predict(df)
    return jsonify(round(float(preds[0]), 5)), 200


def get_data(username):
    sql = f"select * from data where username like '%{username}%'"
    sql_res = execute_sql(sql)
    if len(sql_res) < 1:
        return jsonify("no record found"), 404
    res = {}
    keys = personal_info + final_cols_unbanked_refined
    for i in range(len(keys)):
        res[keys[i]] = sql_res[0][i]

    return res


@app.route("/predict_amount", methods=["GET"])
def predict_amount():
    username = request.args.get("username", None)
    if not username:
        return jsonify("Missing name param"), 422

    data = get_data(username)
    for k, v in data.items():
        data[k] = [v]
    df = pd.DataFrame.from_dict(data)[amount_prediction_cols]
    preds = xg_reg_amount.predict(df)
    return jsonify(preds[0] // 1000 * 1000), 200


@app.route("/get_records", methods=["GET"])
def get_records():
    username = request.args.get("username", None)
    if not username:
        return jsonify("Missing name param"), 422
    res = get_data(username=username)
    res.pop("password")
    return jsonify(res)


@app.route("/login", methods=["GET"])
def login():
    username = request.args.get("username", None)
    if not username:
        return jsonify("Missing name param"), 422

    sql = f"select * from data where username like '%{username}%'"
    res = execute_sql(sql)
    if len(res) == 0:
        return jsonify("No such account"), 201
    return "done", 200


if __name__ == "__main__":
    app.run("0.0.0.0", port=5000, debug=True)

    lowest = {
        "FLAG_OWN_CAR": 1,
        "NAME_EDUCATION_TYPE": 2,
        "DAYS_EMPLOYED": -7302.0,
        "REG_CITY_NOT_LIVE_CITY": 0,
        "AMT_GOODS_PRICE": 157500.0,
        "REG_CITY_NOT_WORK_CITY": 1,
        "DAYS_BIRTH": 40.93972602739726,
        "AMT_CREDIT": 157500.0,
        "NAME_INCOME_TYPE": 1,
        "NAME_FAMILY_STATUS": 1,
        "OCCUPATION_TYPE": 4,
        "AMT_INCOME_TOTAL": 301500.0,
        "NAME_HOUSING_TYPE": 0,
        "FLAG_OWN_REALTY": 0,
        "CNT_CHILDREN": 0,
    }

    highest = {
        "FLAG_OWN_CAR": 0,
        "NAME_EDUCATION_TYPE": 0,
        "DAYS_EMPLOYED": -223.0,
        "REG_CITY_NOT_LIVE_CITY": 1,
        "AMT_GOODS_PRICE": 450000.0,
        "REG_CITY_NOT_WORK_CITY": 1,
        "DAYS_BIRTH": 36.02465753424657,
        "AMT_CREDIT": 687600.0,
        "NAME_INCOME_TYPE": 0,
        "NAME_FAMILY_STATUS": 2,
        "OCCUPATION_TYPE": 4,
        "AMT_INCOME_TOTAL": 180000.0,
        "NAME_HOUSING_TYPE": 0,
        "FLAG_OWN_REALTY": 0,
        "CNT_CHILDREN": 2,
    }

    best_amt = {
        "FLAG_OWN_CAR": 1,
        "NAME_EDUCATION_TYPE": 2,
        "DAYS_EMPLOYED": -775.0,
        "REG_CITY_NOT_LIVE_CITY": 0,
        "AMT_GOODS_PRICE": 238500.0,
        "REG_CITY_NOT_WORK_CITY": 0,
        "DAYS_BIRTH": 32.25753424657534,
        "NAME_INCOME_TYPE": 2,
        "NAME_FAMILY_STATUS": 1,
        "OCCUPATION_TYPE": 3,
        "AMT_INCOME_TOTAL": 135000.0,
        "NAME_HOUSING_TYPE": 0,
        "FLAG_OWN_REALTY": 0,
        "CNT_CHILDREN": 1,
    }
