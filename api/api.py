from flask import Flask  
import requests
import json
import math
import selectorlib
from selectorlib import Extractor
from time import sleep
from fake_useragent import UserAgent

from flask_cors import CORS, cross_origin

      
app = Flask(__name__) #creating the Flask class object 
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

     
@app.route('/') #decorator drfines the   
def home():  
    return "api home";  

@app.route('/flipkart/<f_product>') #decorator drfines the   

def flipkart(f_product): 
    product = f_product.split(" ")
    product = "+".join(product)
    e = Extractor.from_yaml_file('flipkart.yml')
    ua = UserAgent()

    headers = {
        'dnt': '1',
        'upgrade-insecure-requests': '1',
        'user-agent': ua.random,
        'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
        'sec-fetch-site': 'same-origin',
        'sec-fetch-mode': 'navigate',
        'sec-fetch-user': '?1',
        'sec-fetch-dest': 'document',
        'referer': 'https://www.flipkart.com/',
        'accept-language': 'en-GB,en-US;q=0.9,en;q=0.8',
    }

    url = "https://www.flipkart.com/search?q="+product
    print(url)

    r = requests.get(url, headers=headers)    
    data =  e.extract(r.text)

    final_products = []

    if data:
        for product in data['products']:
            if product['title']:
                product['website'] = "Flipkart"
                product['url'] = 'https://www.flipkart.com' + product['url']
                product['price'] = product['price'].replace("\u20b9", "")
                final_products.append(product)

    i = 0
    response = {}
    for product in final_products:
        response[str(i)] = product
        i+=1
    
    return response
    

@app.route('/amazon/<a_product>') #decorator drfines the   
def amazon(a_product):  
    product = a_product.split(" ")
    product = "-".join(product)
    e = Extractor.from_yaml_file('amazon.yml')
    ua = UserAgent()

    headers = {
        'dnt': '1',
        'upgrade-insecure-requests': '1',
        'user-agent': ua.random,
        'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
        'sec-fetch-site': 'same-origin',
        'sec-fetch-mode': 'navigate',
        'sec-fetch-user': '?1',
        'sec-fetch-dest': 'document',
        'referer': 'https://www.amazon.in/',
        'accept-language': 'en-GB,en-US;q=0.9,en;q=0.8',
    }

    url = "https://www.amazon.in/s?k="+product+"&ref=nb_sb_noss"

    r = requests.get(url, headers=headers)    
    data =  e.extract(r.text)

    final_products = []

    if data:
        for product in data['products']:
            product['website'] = "Amazon"
            product['url'] = 'https://www.amazon.in' + product['url']
            product['price'] = product['price'].replace("\u20b9", "")
            final_products.append(product)
    
    i = 0
    response = {}
    for product in final_products:
        response[str(i)] = product
        i+=1
    
    return response
   
@app.route('/myntra/<m_product>') #decorator drfines the   
def myntra(m_product):
    product = m_product.split(" ")
    product = "-".join(product)
    s = requests.Session()

    headers = {
        'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 11_0_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.88 Safari/537.36',
    }
    url = 'https://www.myntra.com/'+product+'&plaEnabled=false'
   
    response = s.get(url, headers = headers, timeout = 10)
    

    headers = {
        'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 11_0_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.88 Safari/537.36',
    }
    url = 'https://www.myntra.com/gateway/v2/search/'+product+'?plaEnabled=false&rows=100&o=0'
    response = s.get(url, headers = headers, timeout = 10)


    data = json.loads(response.text)
    data_products = data['products']
    
    final_products = []
    for product in data_products:
        products = {}
        products['website'] = "Myntra"
        products['url'] = "https://www.myntra.com/" + product["landingPageUrl"]
        products['title'] = product["productName"]
        products['price'] = product["price"]
        products['image'] = product['searchImage']
        final_products.append(products)
  
    i = 0
    response = {}
    for product in final_products:
        response[str(i)] = product
        i+=1
        

    return response;  

@app.route('/bewakoof/<b_product>') #decorator drfines the   
def bewakoof(b_product):  
    product = b_product.split(" ")
    product = "-".join(product)
    e = Extractor.from_yaml_file('bewakoof.yml')
    ua = UserAgent()

    headers = {
        'dnt': '1',
        'upgrade-insecure-requests': '1',
        'user-agent': ua.random,
        'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
        'sec-fetch-site': 'same-origin',
        'sec-fetch-mode': 'navigate',
        'sec-fetch-user': '?1',
        'sec-fetch-dest': 'document',
        'referer': 'https://www.bewakoof.com/',
        'accept-language': 'en-GB,en-US;q=0.9,en;q=0.8',
    }

    url = "https://www.bewakoof.com/search/"+product+"?ga_q="+product
    print(url)
    r = requests.get(url, headers=headers)    
    data =  e.extract(r.text)

    final_products = []

    if data:
        for product in data['products']:
            product['website'] = "Bewakoof"
            final_products.append(product)

    i = 0
    response = {}
    for product in final_products:
        response[str(i)] = product
        i+=1

    return response
   

if __name__ =='__main__':  
    app.run(debug = True)  