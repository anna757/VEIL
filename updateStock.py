import requests
from bs4 import BeautifulSoup
import shopify
import time

"""
Update the inventory level of a given product's variants on Shopify based on the available sizes provided.

:param product_id: The ID of the product to update the inventory for.
:type product_id: int
:param out_of_stock_sizes: A list of sizes that the inventory level should be updated for.
:type out_of_stock_sizes: List[str]
:return: None
"""
def update_shopify_inventory(product_id, out_of_stock_sizes, color):
    # Initialize the Shopify API with your store's URL and API key
    shop_url = "https://8cedc1-3.myshopify.com/"
    api_version = "2023-04"  # Update this to the latest API version
    private_app_password = "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"  # You can find this in your Shopify admin under Apps > Manage private apps

    session = shopify.Session(shop_url, api_version, private_app_password)
    shopify.ShopifyResource.activate_session(session)

    # Get the current variants for the product
    product = shopify.Product.find(product_id)
    variants = product.variants

    # Get the ID of your store's location
    location_id = shopify.Location.find()[0].id  # Assumes you only have one location

    # For each variant, if the color matches and the size is in the list of out-of-stock sizes, set the inventory level to 0
    # Otherwise, do not change the inventory level
    for variant in variants:
        time.sleep(0.5)
        # Get the current inventory level for the variant
        inventory_item_id = variant.inventory_item_id
        inventory_level = shopify.InventoryLevel.find(inventory_item_ids=inventory_item_id, location_ids=location_id)[0]

        variant_color = variant.option1
        variant_size = variant.option2 if color else variant.option1
        if color != "" and variant_color != color: continue
        if variant_color == color and variant_size in out_of_stock_sizes:
            print("Out of stock: ", color, variant_size, inventory_item_id, out_of_stock_sizes)
            new_level = 0
            inventory_level.set(location_id, inventory_item_id, new_level)
        elif color == "" and variant_size in out_of_stock_sizes:
            print("Out of stock: ", variant_size)
            new_level = 0
            inventory_level.set(location_id, inventory_item_id, new_level)
        else: inventory_level.set(location_id, inventory_item_id, 5)
        # Update the inventory level

"""
Scrapes a Trendyol product page to find available size options.

Args:
url (str): The URL of the Trendyol product page to scrape.

Returns:
list of str: A list of available size options for the product.
"""
def scrape_trendyol_page(url):
    # Send a GET request to the Trendyol product page
    response = requests.get(url)

    # Parse the HTML content of the page with BeautifulSoup
    soup = BeautifulSoup(response.content, 'html.parser')

    # Find the size options on the page
    size_elements = soup.find_all('div', {'class': 'so sp-itm'})

    # Determine which sizes are available
    out_of_stock_sizes = [element.text for element in size_elements]

    return out_of_stock_sizes

"""
This function defines a list of product URLs and corresponding Shopify product IDs. 
It then loops through this list, calling two functions, scrape_trendyol_page and 
update_shopify_inventory, to scrape the Trendyol page and update the Shopify inventory 
for each product in the list. 

Parameters:
None

Return:
None
"""
def main():
    # List of Trendyol product URLs and corresponding Shopify product IDs
    products = [
        {"url": "https://www.trendyol.com/trendyolmilla/lila-vucuda-oturan-dokuma-sik-abiye-elbise-tprss23el00280-p-380870751", "product_id": "8441935724871", "color": "lilac"},
        {"url": "https://www.trendyol.com/trendyolmilla/yesil-vucuda-oturan-dokuma-sik-abiye-elbise-tprss23el00280-p-380870752", "product_id": "8441935724871", "color":"green"},
        {"url": "https://www.trendyol.com/trendyolmilla/cok-renkli-dokuma-saten-cicek-desenli-sik-abiye-elbise-tprss23el00305-p-389601623?boutiqueId=620391&merchantId=968", "product_id": "8444920627527", "color":""},
        {"url": "https://www.trendyol.com/trendyolmilla/siyah-buzgulu-orme-sik-abiye-elbise-tprss22el1757-p-196139101", "product_id": "8444930752839", "color":""},
        {"url": "https://www.trendyol.com/trendyolmilla/ekru-belden-acilan-skater-astarli-brode-bridal-sik-abiye-elbise-tprss22el1011-p-187393467?boutiqueId=621324&merchantId=968", "product_id": "8444933341511", "color":""},
        {"url": "https://www.trendyol.com/trendyolmilla/lila-firfir-detayli-sik-abiye-elbise-tprss22el0993-p-189577480?boutiqueId=621312&merchantId=968", "product_id": "8444934422855", "color":""}
    ]


    # For each product, scrape the Trendyol page and update the Shopify inventory
    for product in products:
        out_of_stock_sizes = scrape_trendyol_page(product["url"])
        update_shopify_inventory(product["product_id"], out_of_stock_sizes, product["color"])
           
main()
