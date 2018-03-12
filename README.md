# Barbershop Synchronization
This barbershop project represents a classic computer science problem that serves as a good analogue of some of the problems encountered in development.  How to synchronize and coordinate multiple components at the same time.

### Problem Description
- A barber will check to see if there are any customers in the waiting area that need a haircut.
- If there are no customers then the barber will go back to his chair and go to sleep.  
- After a haircut is complete the barber will continue the cycle, and go back to check if there are any customers.
- A customer that arrives will first check to see if there are others in the waiting area
- If there are then they will also wait.
- If not they will go wake up the barber.

**You may not remove the code which makes each function run asynchronously, (the async() statement) **


###Provided functions###
You have also been provided with a function waitUntil(...) which will defer execution until the passed in function evaluates to true.

```js
  waitUntil(() => {
    return state.someValue === true;
  }).then(() => {
    // code here will execute after state.someValue evaluates to true.  
    // The wait until function will check every X ms and execute the function.
  });
```

If you completed the project successfully then you should see the below message.  

=======
Your task is to modify the existing code such that all customers will have had their haircut at the completion of the run.
```
Completed haircuts for 50 of 50 customers
```

Please be ready to discuss your solution, how you completed it, or discuss problems or challenges if you were not able to fully complete it.

## Installation
Install the projects dependencies with the command
```bash
npm install
```
## Running
### Without Docker
```bash
npm start
```
### With Docker
```bash
docker build -t barbershop .
docker run barbershop
```
### Mounting source code to docker container
```bash
# This will mount your local source code to 
# container making debugging easier for yourself.

docker run -v $(pwd):/usr/src/app barbershop 
```
