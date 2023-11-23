### 1. Load the libraries and data set
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import random
import json

import pandas as pd
import matplotlib.pyplot as plt
import numpy as np

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=['*'],
    allow_credentials=True,
    allow_methods=['*'],
    allow_headers=['*'],
)

df = pd.read_csv('data.csv', encoding = 'unicode_escape')
### 2. Prepare the Data
df1 = df.dropna(subset=['CustomerID','Description'])
### 3. Now we create a Customer-Item Matrix. 

customer_item_matrix = df1.pivot_table(index='CustomerID',columns='StockCode',values='Quantity',aggfunc='sum')
df1['CustomerID'].nunique()
df1['StockCode'].nunique()
customer_item_matrix = customer_item_matrix.applymap(lambda x: 1 if x>0 else 0)


### 4. User based Collaborative Filtering using Sklearn module

from sklearn.metrics.pairwise import cosine_similarity

#### User based Collaborative Filtering
@app.get('/recommend')
async def getresponse(id:int):    
    user_to_user_sim_matrix = pd.DataFrame(cosine_similarity(customer_item_matrix))
    user_to_user_sim_matrix.columns = customer_item_matrix.index
    user_to_user_sim_matrix['CustomerID'] = customer_item_matrix.index
    user_to_user_sim_matrix = user_to_user_sim_matrix.set_index('CustomerID')
    similar_users= user_to_user_sim_matrix.loc[id].sort_values(ascending = False)
    items_bought_by_A = set(customer_item_matrix.loc[id].iloc[customer_item_matrix.loc[id].to_numpy().nonzero()].index)    
    items_bought_by_B = set(customer_item_matrix.loc[similar_users.index[1]].iloc[customer_item_matrix.loc[similar_users.index[1]].to_numpy().nonzero()].index)    
    items_to_recommend_User_B = items_bought_by_A - items_bought_by_B   
    
    return {"list":df1.loc[
        df['StockCode'].isin(items_to_recommend_User_B),
        ['StockCode','Description','UnitPrice']
    ].drop_duplicates('StockCode').set_index('StockCode')}


### 5. Another type: Item-Based Collaborative Filtering[]
@app.get('/recommenditem')
async def getresponse(id):
    item_item_sim_matrix = pd.DataFrame(cosine_similarity(customer_item_matrix.T))
    item_item_sim_matrix.columns = customer_item_matrix.T.index
    item_item_sim_matrix['StockCode'] = customer_item_matrix.T.index
    item_item_sim_matrix = item_item_sim_matrix.set_index('StockCode')
    item_item_sim_matrix.head()
    top_10_similar_items = list(
        item_item_sim_matrix\
            .loc[id]\
            .sort_values(ascending=False)\
            .iloc[:11]\
        .index
    )
    return {"list":df.loc[
        df['StockCode'].isin(top_10_similar_items), 
        ['StockCode', 'Description','UnitPrice']
    ].drop_duplicates('StockCode').set_index('StockCode').loc[top_10_similar_items[1:]]}




import nest_asyncio
from pyngrok import ngrok
import uvicorn

nest_asyncio.apply()
uvicorn.run(app, port=8005)