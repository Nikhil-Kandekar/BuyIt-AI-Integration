import numpy as np 
import pandas as pd 
import datetime as dt
import seaborn as sns
import matplotlib.pyplot as plt

import warnings
warnings.filterwarnings("ignore")

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import random
import json

df= pd.read_csv('data.csv',encoding= 'unicode_escape')
data=df.copy()

data['InvoiceMonth'] = pd.to_datetime(data['InvoiceDate']).to_numpy().astype('datetime64[M]')
data['CohortMonth'] = data.groupby('CustomerID')['InvoiceMonth'].transform('min')
data.dropna(inplace=True)

invoice_year= data['InvoiceMonth'].dt.year.astype('int')
invoice_mon= data['InvoiceMonth'].dt.month.astype('int')

#compute year and month from Cohort Date
cohort_year= data['CohortMonth'].dt.year.astype('int')
cohort_mon= data['CohortMonth'].dt.month.astype('int')

#find the differences
diff_year = invoice_year - cohort_year
diff_mon = invoice_mon - cohort_mon

#calculate the cohort index for each invoice
data['CohortIndex'] = diff_year * 12 + diff_mon + 1

#group by cohort month and index and find number of unique customers for each grouping
grouped = data.groupby(['CohortMonth', 'CohortIndex'])['CustomerID'].apply(pd.Series.nunique)\
                                                                    .reset_index()
#pivot the data with cohort month as rows and Cohort Index as columns
grouped = grouped.pivot(index='CohortMonth', columns='CohortIndex',  values='CustomerID')

#divide each column by value of the first(cohort size) to find retention rate
size = grouped.iloc[:,0]
retention_table = grouped.divide(size, axis=0)

#compute the percentage
retention_table.round(3) * 100

#copy data into a new dataframe for analysis
data_all= df.copy()

#calculating total the total amount for each line item (unit price * Quantity)
data_all['amount']= data_all['Quantity']* data_all['UnitPrice']
data_all.head()

#convert column to datetime
data_all['InvoiceDate']=pd.to_datetime(data_all['InvoiceDate'])

#setting date of analysis= 1 day after the most recent invoice
analysis_date = pd.to_datetime(data_all['InvoiceDate'].max())+ dt.timedelta(days=1)

#calculate the recency, frequency and Monetary values for each customer
grouped = data_all.groupby(['CustomerID'])\
                .agg({'InvoiceDate': lambda x: (analysis_date - x.max()).days,
                      'InvoiceNo': 'count',
                      'amount': 'sum'})\

#rename each column to denote the R,F,M Values
grouped.rename(columns = {'InvoiceDate': 'R_val',
                                   'InvoiceNo': 'F_val',
                                   'amount': 'M_val'}, inplace=True)

#divide recency metric into 4 quartiles
r_quartiles = pd.qcut(grouped['R_val'], 4, labels = range(4, 0, -1))
grouped = grouped.assign(R_quartile = r_quartiles.values.astype('int'))

#divide frequency metric into 4 quartiles
f_quartiles = pd.qcut(grouped['F_val'], 4, labels = range(1, 5, 1))
grouped = grouped.assign(F_quartile = f_quartiles.values.astype('int'))

#divide monetary metric into 4 quartiles
m_quartiles = pd.qcut(grouped['M_val'], 4, labels = range(1, 5, 1))
grouped = grouped.assign(M_quartile = m_quartiles.values.astype('int'))

#get RFM segment by concatenation of R,F,M values
grouped['RFM_Seg']=grouped['R_quartile'].astype('str') + grouped['F_quartile'].astype('str') + grouped['M_quartile'].astype('str')

#calculate RFM by summing R,F,M values
grouped['RFM_Score']= grouped[['R_quartile','F_quartile','M_quartile']].sum(axis=1)

def get_tier(a):
    if a >9:
        return 'Platinum'
    elif (a>6) & (a<=9):
        return 'Gold'
    elif (a>3) & (a<=6):
        return 'Advanced'
    elif (a>0) & (a<=3):
        return 'Basic' 

#assign a tier to each customer based on the get_tier function logic
grouped['Tier']=grouped['RFM_Score'].apply(get_tier)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=['*'],
    allow_credentials=True,
    allow_methods=['*'],
    allow_headers=['*'],
)

@app.get('/gettier')
async def getresponse(id:int):
    return {"tier":grouped.loc[id]['Tier']}


import nest_asyncio
from pyngrok import ngrok
import uvicorn

nest_asyncio.apply()
uvicorn.run(app, port=8004)