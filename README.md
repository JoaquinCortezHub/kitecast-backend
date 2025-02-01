
# KiteSpot - Backend

This is the backend of my KiteSpot fullstack project. KiteSpot is a kitesurfing specific weather site, providing relevant data to riders to optimize their session. The goal with the backend was to provide a robust server where the users could request data related to the weather. The server is built in a modular way using Nest.js and is design to be secure, scalable and most important quick in retrieving data. 


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

#### add(num1, num2)

Takes two numbers and returns the sum.


## Lessons Learned

This project taught me a couple of lessons regarding project structure and code organization. At first, when the codebase was small, I was coding at light-speed, creating new components and connecting them with existing ones, quickly implementing the basic logic to make the app work.

Then, the project reached a stage where I was getting lost looking for the implementation of a component, the app started to behave in ways I didn't intend it to and navigating through the files was a nightmare.

After a quick structure re-arrangement, I learned that organizing the structure and logic of your code is as important as the code itself. The progress of the project was delayed a couple of days just because I had to re-organize the logic of my components to obtain the desired result. So yeah, from now on, Structure and logic first, then the code.


## Feedback
Any feedback is appreciated!

I'm open to suggestions, positive criticism and advice, I would love to improve this project and maybe even learn something new.

If you have any feedback, please reach out to me at joaquinlucascortez@gmail.com with your suggestion and **"KiteSpot - Suggestion"** as the header!


## Related

Here are some related projects.

[KiteSpot - Backend](https://github.com/JoaquinCortezHub/kitespot-backend)

