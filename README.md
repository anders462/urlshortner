# API: URL Shortener Microservice

API Uses: Node.js/Express.js


1. User Story: I can pass a URL as a parameter and I will receive a shortened URL in the JSON response.

2. User Story: If I pass an invalid URL that doesn't follow the valid http://www.example.com format, the JSON response will contain an error instead.

3. User Story: When I visit that shortened URL, it will redirect me to my original link.

Example usage:
https://urlshortn.herokuapp.com/new/https://www.google.com
https://urlshortn.herokuapp.com/new/http://freecodecamp.com/news

Example output:
{ "original_url": "http://freecodecamp.com/news", "short_url": "https://urlshortn.herokuapp.com/6" }

Usage:
https://urlshortn.herokuapp.com/6

Will redirect to:
http://freecodecamp.com/news


Live URL: https://urlshortn.herokuapp.com
