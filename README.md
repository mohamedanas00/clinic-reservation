# clinic-reservation


This project encompasses a web-based appointment scheduling system featuring user authentication and management functionalities. Tailored for both patients and doctors, the system offers a secure and user-friendly platform dedicated to scheduling and overseeing medical appointments. The backend is developed using Node.js.

- Implement user authentication for both patients and doctors, allowing secure registration and login functionalities.

- Develop a secure user registration and authentication system to ensure the integrity and privacy of user accounts.

-  Enable doctors to set their schedules by inserting time slots based on their availability. 

- Allow patients to select a doctor, view the available time slots, and choose a suitable appointment slot.

- Enable patients to update their appointments by changing the assigned doctor or the selected new time slot. 

- Provide doctors with the ability to view appointments with statuses such as "ReservationCreated," "ReservationUpdated," or "ReservationCancelled."

- Implement email notifications to notify doctors about appointments using Nodemailer and the RabbitMQ messaging feature within the application.

- Provide patients with the option to cancel their appointments if needed.

- Enable patients to view a list of all their reservations for better appointment management.
## Deployment

To run this project 

```bash
  npm i init
  node index.js
```

To run docker files

using bash script:
```bash
  ./run_services.bat
```
using docker-compose:

- create and start containers
```bash
  docker-compose up
```
- to stop and delete containers
```bash
  docker-compose down
```
- to stop containers 
```bash
  docker-compose stop
```

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`PORT`
`DB_HOST`
`DB_USERNAME`
`DB_PASSWORD`
`DB_DBNAME`
`salt_round`
`BEARER_KEY`
`page_limit`
`gmail`
`EMAIL_PASSWORD`



## postman-documentation

https://documenter.getpostman.com/view/25070384/2s9YkjCj2V
## About project
 - Using SQL db .
 - Deployment using vercel and render.
 - Using docker to create images for (FrontEnd - backend - Rabbitmq).
 - Develpoer profile who develop FrontEnd [AmrMustafa ](https://github.com/amrmustafa02)
 - Repository  for FrontEnd [REPO](https://github.com/amrmustafa02/clinic?tab=readme-ov-file)
 - To access our clinic-website [clinic ](https://clinic-tawny-xi.vercel.app/)
 

