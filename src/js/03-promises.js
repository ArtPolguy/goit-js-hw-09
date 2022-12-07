const refs = {
  form: document.querySelector(`.form`),
};

refs.form.addEventListener(`submit`, onFormSubmit);

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

function onFormSubmit(e) {
  e.preventDefault();

  const step = refs.form.elements.step.value;
  let delay = refs.form.elements.delay.value;
  const amount = refs.form.elements.amount.value;

  for (let position = 1; position <= amount; position += 1) {
    console.log(delay);
    createPromise(position, delay)
      .then(({ position, delay }) => {
        console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        console.log(`❌ Rejected promise ${position} in ${delay}ms`);
      });
    delay += step;
  }
}
