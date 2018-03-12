const _ = require('lodash');

/**
 * Execute the specified function at an
 * arbitrary time 100ms to 1second
 */
function async(fn, start = 1000, end = 5000) {
  _.delay(fn, _.random(start, end));
}

/**
 * Create a promise which resolves only
 * when the passed in function evaluates as true
 */
function waitUntil(fn, waitRetryMs = 200) {
  return new Promise(resolve => {

    function evaluate(resolve) {
      if (fn() === true) {
        resolve();
      } else {
        setTimeout(() => evaluate(resolve));
      }
    }
    evaluate(resolve);
  });
}
const state = {
  numCustomers: 50,
  barber: null,
  waiting: [],
  completed: [],
  inProgress: null
};

class Barber {

  constructor() {
    this.sleeping = false;
    this.name = _.uniqueId('barber-');

    this.checkCustomers();
  }

  sleep() {
    console.info(`${this.name} is going to sleep`);
    this.sleeping = true;
  }

  awaken() {
    console.info(`${this.name} woke up`);
    this.sleeping = false;
  }

  checkCustomers() {
    console.info(`${this.name} is going to go check on customers`);
    //console.log(state.waiting.length, "1"); // debug does change from zero
    async(() => { //if the state does this, call cutHair------
      if (state.waiting.length > 0) { // > 1
        this.cutHair(state.waiting.pop());
      } else {
        this.sleep();
      }
    });
  }

  cutHair(customerName) {
    // remove them from the line
    state.waiting = _.remove(state.waiting, customerName);
    //console.info(state.inProgress, " state in progress");
    state.inProgress = this.customerName; // customerName
    //console.info(state.inProgress, " state in progress after assignage");

    console.info(`${this.name} is cutting ${customerName}s hair`);

    async(() => {
      console.info(`${this.name} finished cutting ${customerName}s hair`);

      state.inProgress = null; // state in progress becomes null when someone finishes getting their hair cut
      state.completed.unshift(customerName);
      this.checkCustomers();
    });
  }
}

class Customer {

  constructor() {
    this.waiting = false; //false
    this.name = _.uniqueId('customer-');

    this.check(); //when customer is created
  }

  check() {
     // debug never changes from zero
     //console.log(state.waiting.length);
    if (state.waiting.length > 0) { //state.waiting.length > 0
      console.info(`${this.name} is waiting.`);
      state.waiting.unshift(this.name);
    } else {
      this.checkBarber();
    }
  }

  checkBarber() {
    console.info(`${this.name} is checking the barber`);

    async(() => {
      // barber is free
      if (state.inProgress == null) {
        if (state.barber.sleeping) {
          console.info(`${this.name} is awakening the barber.`);
          state.barber.awaken();
        }

        state.barber.cutHair(this.name);
      } else {
        console.info(`The barber is busy ${this.name} is going back to wait`);

        async(() => {
          state.waiting.unshift(this.name);
        });
      }
    });
  }

}

(function main() {
  var customers = [];

  state.barber = new Barber();
  for (let i = 0, end = state.numCustomers; i < end; i++) {
    async(() => {
      customers.push(new Customer());
    });
  }

  process.on('exit', function () {
    console.info(`Completed haircuts for ${state.completed.length} of ${state.numCustomers} customers`);
  });

}());
