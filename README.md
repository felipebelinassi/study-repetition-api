# Study Repetition API 📚
[![Actions Status](https://github.com/felipebelinassi/study-repetition-api/workflows/Deploy%20Application/badge.svg)](https://github.com/felipebelinassi/study-repetition-api/actions)
> NodeJS application built with TypeScript, Express, Apollo GraphQL and Prisma  

**WORK IN PROGRESS**  

## Getting started

1. Clone this repository  
```git clone https://github.com/felipebelinassi/study-repetition-api```

2. cd into the directory  
```cd study-repetition-api```

3. Create .env file (see [Environment Variables](#environment-variables) section)

4. Install dependencies using npm or yarn  
```yarn```

5. Run with docker  
```docker-compose up -d```

6. Run database migrations using the below Prisma script
```npx prisma migrate dev```

7. Access http://localhost:5000/graphql and play with the API  

## Run tests

- Run entire test suite (unit and integration)  
```yarn test```

- Run only unit tests  
```yarn test:unit``` 

## Environment variables
This project uses dotenv package to manage environment variables. To set your variables, create a *.env* file (or just rename the *.example.env*) which contains all the environments needed to run the application. All variables are **required**.  

| Env              | Description                                  |
|:---------------- |:-------------------------------------------- |
| NODE_ENV         | Application environment                      |
| PORT             | Port where the server will start             |
| DATABASE_URL     | PostgreSQL connection string                 |
| LOGGER_ENABLED   | Flag to indicate if app will log using Pino  |
| LOGGER_LEVEL     | Level to log messages                        |
| JWT_SECRET_KEY   | Secret value that JWT should be signed with  |
| TOKEN_EXPIRES_IN | JWT expiration time                          |

## Author
👨‍💻 Felipe Belinassi  
📫 Reach me at my [email](mailto:felipebelinassi@gmail.com) or [LinkedIn](https://www.linkedin.com/in/felipe-belinassi/).
