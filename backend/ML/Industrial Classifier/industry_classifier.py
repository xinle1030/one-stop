#%%
from transformers import AutoTokenizer, AutoModelForSequenceClassification, pipeline
import pandas as pd

# download the model
tokenizer = AutoTokenizer.from_pretrained("sampathkethineedi/industry-classification")  
model = AutoModelForSequenceClassification.from_pretrained("sampathkethineedi/industry-classification")

# call the industry tags api
industry_tags = pipeline('sentiment-analysis', model=model, tokenizer=tokenizer)

def classify_industry(fileObj='backend\ML\Industrial Classifier\ori_dataset.csv'):
    companies_df = pd.read_csv(fileObj)
    companies_df = companies_df[(companies_df['category'].notnull())]
    companies_df['category'] = companies_df['category'].apply(lambda x: x.replace("|", "").strip(','))
    companies_df['industry'] = ""
    print(companies_df)
    
    # start inferring the industry from the category
    for index, row in companies_df.iterrows():
        if not len(row['industry']) >= 1:
            idv_company_category = row['category']
            labels = industry_tags(idv_company_category)
            industry = labels[0]['label']
            companies_df.at[index,'industry'] = industry
    
    # print(companies_df)
    companies_df = companies_df.sort_values('industry', ascending=True)
    
    # convert companies with the first category in the following selections
    commerce_cat = ['E-Commerce','Marketplace','Consumer','Retail','Consumer Goods']
    
    for index, row in companies_df.iterrows():
        if any(elem in row['category'] for elem in commerce_cat):
            companies_df.at[index,'industry'] = "Internet & Direct Marketing Retail"
    
    companies_df = companies_df.sort_values('industry', ascending=True)
    # check the number of unique industries and how many rows are in that industry
    industry_counts = companies_df['industry'].value_counts()
    # print the unique values and their counts
    print(industry_counts)
    companies_df.to_csv('backend\\ML\\Industrial Classifier\\filtered_vcInsight.csv', index=False)
    companies_df.to_csv('backend\\ML\\XGBoostModel\\filtered_vcInsight.csv', index=False)
    
    return companies_df

