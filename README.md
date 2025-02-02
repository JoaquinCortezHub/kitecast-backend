
# KiteSpot - Backend

This is the backend of my KiteSpot fullstack project. KiteSpot is a kitesurfing specific weather site, providing relevant data to riders to optimize their session. The goal with the backend was to provide a robust server where the users could request data related to the weather. The server is built in a modular way using Nest.js and is designed to be secure, scalable and most important quick in retrieving data. 


## Tech Stack

**Server:** Nest.JS, Caching, OpenWeatherMap, Typescript.




## API Reference

#### Get weather information:

This endpoint returns both current weather and forecast information.

```http
  GET /weather
```


| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `city` | `String` | **Required**. Retrieves weather info for that place. |

#### getCoordinates(city: string): Promise<{ lat: number; lon: number }> 

- This function takes the requested spot and returns an object detailing its coordinates which are later used to fetch weather data.

- Inside this function is where the caching of the coordinates happen, allowing users to get frequently searched spots faster.

#### Get banner

```http
  GET /unsplash/getSpotImage
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `spot`      | `String` | **Required**. parameter to look in the Unsplash db. |

#### fetchPhotos(Spot: String)

- This function takes the name of the searched spot and fetches an image from the Unsplah library.


## Lessons Learned

This project taught me a couple of lessons on how server should be structured, how to make use of external API's and how to properly implement the MVC design pattern.

This project started as a basic app in which I wanted to learn how to code with Nest.js. I had previously studied Java in college, so the code structure in Nest was really familiar.

Throughout this project, I learned some of Nest's most important features, like file structure, rate limiting and caching. I believe the abilities I acquired with this project, can help me implement secure, robust and scalable backend apps.


## Feedback
Any feedback is appreciated!

I'm open to suggestions, positive criticism and advice, I would love to improve this project and maybe even learn something new.

If you have any feedback, please reach out to me at joaquinlucascortez@gmail.com with your suggestion and **"KiteSpot (backend) - Suggestion"** as the header!


## Related

Here are some related projects.

[KiteSpot - Frontend](https://github.com/JoaquinCortezHub/kitespot-frontend)

