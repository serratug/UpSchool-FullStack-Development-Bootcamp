# Backend Final Project - Crawler

The primary objective of this project is to automate the process of crawling product data while tracking crawler events in real-time.


## Technologies
The project utilizes the following technologies:

* Language: C#
* Framework: .NET 7
* Architecture: Clean Architecture
* Web scraping: Selenium
* Database: Entity Framework Core
* CQRS: MediatR
* SignalR: Microsoft.AspNetCore.SignalR
* Caching: Microsoft.Extensions.Caching.Memory
* Validation: FluentValidation

## Project Structure
The project follows the principles of the Clean Architecture, with a clear separation of concerns and a layered structure:
* **WebApi**: Serves as the entry point of the application and the user interface layer. It provides RESTful APIs for interacting with the crawler.
* **Application**: Contains the application-specific logic and use cases. It defines interfaces for services and interacts with the infrastructure layer.
* **Domain**: Contains the core domain models and business logic of the application.
* **Infrastructure**: Implements the infrastructure-specific details, such as data access and external services. It interacts with the database and other services.
* **Wasm**: Contains the Blazor web application.
* **Crawler**: A console application responsible for crawling web pages and extracting data.

## Getting Started
To run the crawler project locally, follow these steps:
1- Clone the repository
2- Navigate the WebApi project directory and run
3- Navigate the Wasm project directory and run
4- Navigate to Crawler project directory and run
5- Access the Blazor web application in your browser (e.g., http://localhost:5122) to create orders and view log messages.

## Configuration 
The project uses configuration files to set up various aspects of the application, such as the database connection string. You can find the configuration files in the 'appsettings.json' file.

