let today = new Date();
let options = {
  weekday: 'long',
  month: 'long',
  day: 'numeric',
};

let thisDay = today.toLocaleDateString('en-US', options);
