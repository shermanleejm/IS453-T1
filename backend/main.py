from flask import Flask, request, jsonify
import pandas as pd
import xgboost as xgb
from werkzeug.middleware.proxy_fix import ProxyFix
from flask_cors import CORS
import json

app = Flask(__name__)
CORS(app)
app.wsgi_app = ProxyFix(app.wsgi_app)

xg_reg = xgb.XGBRegressor()
xg_reg.load_model("model.json")
xg_reg_amount = xgb.XGBRegressor()
xg_reg_amount.load_model("model_amount.json")

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


@app.route("/new_application", methods=["POST"])
def new_application():
    data = request.json
    for col in final_cols_unbanked_refined:
        if data.get(col, None) == None:
            return jsonify(f"missing {col}"), 422
        data[col] = [data[col]]
    df = pd.DataFrame.from_dict(data)
    preds = xg_reg.predict(df)
    return jsonify(round(float(preds[0]), 5)), 200


@app.route("/predict_amount", methods=["POST"])
def predict_amount():
    data = request.json
    for col in amount_prediction_cols:
        if data.get(col, None) == None:
            return jsonify(f"missing {col}"), 422
        data[col] = [data[col]]
    df = pd.DataFrame.from_dict(data)
    preds = xg_reg_amount.predict(df)
    return jsonify(round(float(preds[0]), 5)), 200


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
