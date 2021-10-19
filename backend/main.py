from flask import Flask, request, jsonify
import pickle
import xgboost as xgb

app = Flask(__name__)

xg_reg = xgb.XGBRegressor()
xg_reg.load_model("model.json")
final_cols_unbanked_refined = [
    "FLAG_OWN_CAR",
    "NAME_EDUCATION_TYPE",
    "DAYS_EMPLOYED",
    "REG_CITY_NOT_LIVE_CITY",
    "AMT_GOODS_PRICE", ## cost of good to be bought with loan
    "REG_CITY_NOT_WORK_CITY",
    "DAYS_BIRTH",
    "AMT_CREDIT", ## loan amount
    "NAME_INCOME_TYPE", ## [businessman, working, maternity leave]
    "NAME_FAMILY_STATUS", ## [single, married, divorced]
    "OCCUPATION_TYPE",
    "AMT_INCOME_TOTAL",
    "NAME_HOUSING_TYPE", ## [renting, living with parents, own house]
    "FLAG_OWN_REALTY", ## own house or not 
    "CNT_CHILDREN",
]

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


@app.route("/new_application", methods=["POST"])
def new_application():
    data = request.json
    for col in final_cols_unbanked_refined:
        if not data.get(col, None):
            return jsonify(f"Missing value for {col}")
    return "done"


if __name__ == "__main__":
    app.run("0.0.0.0", port=5000, debug=True)
