import csv, re
from sklearn.svm import LinearSVC
from nltk.classify import SklearnClassifier
from random import shuffle

import pandas as pd
import nltk
from nltk.tokenize import sent_tokenize, word_tokenize
from nltk.corpus import stopwords
import pyphen
nltk.download('stopwords')
nltk.download('punkt')
dic = pyphen.Pyphen(lang='en')
stop_words = set(stopwords.words('english'))

import pickle
from sklearn.base import BaseEstimator, TransformerMixin
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import random
import json


class ItemSelector(BaseEstimator, TransformerMixin):
    def __init__(self, key):
        self.key = key

    def fit(self, x, y=None):
        return self

    def transform(self, data_dict):
        return data_dict[self.key]

def averageLen(lst):
    lengths = [len(i) for i in lst]
    return 0 if len(lengths) == 0 else (float(sum(lengths)) / len(lengths)) 

def flatten(lst):
    for el in lst:
        if isinstance(el, list):
            yield from el
        else:
            yield el  

pipeline = pickle.load( open( "fakereviews.pkl", "rb") )

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=['*'],
    allow_credentials=True,
    allow_methods=['*'],
    allow_headers=['*'],
)


@app.get('/postquestion')
async def getresponse(review,rating,verified_purchase):
    Actual_variable = pd.DataFrame(columns=['review_text', 'rating', 'verified_purchase'])
    Actual_variable = Actual_variable.append({'review_text': review, 'rating': rating, 'verified_purchase': verified_purchase}, ignore_index=True)
    Actual_variable['tokenized_review'] = Actual_variable.apply(lambda row: re.sub(r"(\w)([.,;:!-?'\"”\)])", r"\1 \2", row['review_text']), axis=1)
    Actual_variable['tokenized_review'] = Actual_variable.apply(lambda row: re.sub(r"([.,;:!-?'\"“\(])(\w)", r"\1 \2", row['tokenized_review']), axis=1)
    Actual_variable['tokenized_review'] = Actual_variable.apply(lambda row: re.sub(r"<[^>]*>", "", row['tokenized_review']), axis=1)
    Actual_variable['tokenized_review'] = Actual_variable.apply(lambda row: nltk.word_tokenize(row['tokenized_review'].lower()), axis=1)
    Actual_variable['tokenized_review_string'] = Actual_variable['tokenized_review'].apply(' '.join)
    Actual_variable['tokens'] = Actual_variable.apply(lambda row: [t for t in row['tokenized_review'] if t.isalpha()], axis=1)
    Actual_variable['tokens'] = Actual_variable.apply(lambda row: [t for t in row['tokens'] if t not in stop_words], axis=1)
    Actual_variable['stopwords'] = Actual_variable.apply(lambda row: [t for t in row['tokenized_review'] if t.isalpha()], axis=1)
    Actual_variable['stopwords'] = Actual_variable.apply(lambda row: [t for t in row['tokenized_review'] if t in stopwords.words('english')], axis=1)
    Actual_variable['num_tokens'] = Actual_variable.apply(lambda row: len(row['tokens']), axis=1)
    Actual_variable['avg_len_tokens'] = Actual_variable.apply(lambda row: averageLen(row['tokens']), axis=1)
    Actual_variable['num_stopwords'] = Actual_variable.apply(lambda row: len(row['stopwords']), axis=1)
    Actual_variable['word_count'] = Actual_variable.apply(lambda row: len(row['tokenized_review']), axis=1)
    Actual_variable['sent_count'] = Actual_variable.apply(lambda row: len(sent_tokenize(row['review_text'])), axis=1)
    Actual_variable['syll_count'] = Actual_variable.apply(lambda row: len(list(flatten([dic.inserted(text).split('-') for text in row['tokenized_review']]))), axis=1)
    Actual_variable['flesch_kincaid'] = Actual_variable.apply(lambda row: 206.835 - 1.015*row['word_count']/row['sent_count'] - 84.6*row['syll_count']/row['word_count'], axis=1)

    result= pipeline.predict(Actual_variable)
    return {"review_type":result[0]}



import nest_asyncio
from pyngrok import ngrok
import uvicorn

nest_asyncio.apply()
uvicorn.run(app, port=8002)