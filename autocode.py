import ssl
from selenium import webdriver
from selenium.webdriver.common.by import By
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

ssl._create_default_https_context = ssl._create_unverified_context

chrome_driver_path = ChromeDriverManager().install()
nav = webdriver.Chrome(executable_path=chrome_driver_path)


nav.get("URL do site")
username_input = WebDriverWait(nav, 10).until(EC.presence_of_element_located((By.ID, "txtUsuario")))

# Wait for the page to load or add more specific waiting as needed

# Close the browser when done
nav.quit()

