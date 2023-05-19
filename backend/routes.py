from flask import current_app, jsonify, request
import numpy as np
import pickle
from app import create_app
import sys
import logging
import json
import csv
import boto3
import pymysql
from urllib.parse import unquote_plus
import os

# from models import Articles,articles_schema

# Create an application instance
app = create_app()

# Define a route to fetch the avaialable articles
# Load the model
model = pickle.load(open('xgb_reg.pkl','rb'))
@app.route('/api/predict-metrics',methods=['POST'])
def predict():
    # Get the data from the POST request.
    data = request.get_json(force=True)
    payload=data['data']
    num_array = np.fromstring(payload, dtype=float, sep=', ')
    test_company_one_company = np.expand_dims(num_array,axis=0)
    print(payload)
    # Make prediction using model loaded from disk as per the data.
    prediction = model.predict(test_company_one_company)
    print(prediction.dtype)
    performance_metric= {'revenue_growth':str(prediction[0,0]), 'min_share':str(prediction[0,1]),'median_share':str(prediction[0,2]),'max_share':str(prediction[0,3])}
    print(jsonify(performance_metric))
    # Take the first value of prediction
    return jsonify(performance_metric)

s3=boto3.client('s3')

# rds settings
rds_host = os.getenv("RDS_HOST")
user_name = os.getenv("USERNAME")
password = os.getenv("PASSWORD")
db_name = os.getenv("DB_NAME")
port = os.getenv("PORT")

# create the database connection outside of the handler to allow connections to be
# re-used by subsequent function invocations.
try:
    conn = pymysql.connect(host=rds_host, user=user_name, passwd=password, db=db_name, connect_timeout=5)
except pymysql.MySQLError as e:
    print("Fail to connect to my sql")
    sys.exit()

@app.route('/api/companies/<string:companyName>',methods=['GET'])
def get_company_data(companyName: str):
    company = ()
    with conn.cursor() as cur:
        sql_str = "SELECT * FROM Company WHERE name_c = '{}'".format(companyName)
        print(sql_str)
        cur.execute(sql_str)
        keys = ('name_c','incorporated_date_c', 'total_funding_c', 'last_valuation_c','last_round_size_c', 'revenue_c', 'date_of_last_round', 'fy_end', 'revenue_growth', 
                            'EBIT_c','employee_growth_6', 'employee_growth_12', 'num_founders', 'num_funding_rounds','num_shareholders', 'min_share', 'median_share', 'max_share', 'category') 
        company = cur.fetchone()
    ind_company = dict(zip(keys, company))
    return json.dumps(ind_company)

@app.route('/api/companies',methods=['GET'])
def get_all_data():
    with conn.cursor() as cur:
        cur.execute("select * from Company")
        keys = ('name_c','incorporated_date_c', 'total_funding_c', 'last_valuation_c','last_round_size_c', 'revenue_c', 'date_of_last_round', 'fy_end', 'revenue_growth', 
                            'EBIT_c','employee_growth_6', 'employee_growth_12', 'num_founders', 'num_funding_rounds','num_shareholders', 'min_share', 'median_share', 'max_share', 'category') 
        item_count = 0
        company_dets = []
        for row in cur:
            item_count += 1
            ind_company = dict(zip(keys, row))
            company_dets.append(ind_company)
    return json.dumps(company_dets)

if __name__ == "__main__":
	app.run(debug=True)