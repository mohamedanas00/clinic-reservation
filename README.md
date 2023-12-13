
# clinic-reservation


This project is a web-based appointment scheduling system with user authentication and management functionalities. It is designed for both patients and doctors, providing a secure and user-friendly platform for scheduling and managing medical appointments. The backend is implemented using Node.js.

- Sign in & sign up for patient and doctor.

- User Authentication: Secure user registration and authentication system.

- Doctor set his schedule. (Inserting a slot) 

- Patients select doctor, view his available slots, then patient 
  chooses a slot.

- Patient can update his appointment by change the doctor or the slot. 
- Doctor can see all appointments that ”ReservationCreated” or ” ReservationUpdated” or ”ReservationCancelled” , notify doctor by mail using nodemailer , rabbitMq (messaging feature) to notify doctor in app.

- patient can show all doctors with his slots.

- Patient can cancel his appointment. 

- Patients can view all his reservations.
## Deployment

To deploy this project run

```bash
  npm i init
  node index.js
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