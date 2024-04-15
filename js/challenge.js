document.addEventListener("DOMContentLoaded", function(){
   // Initialize variables
   let counterValue = 0;
   let intervalId;
   let playing = true;
 
   // Get necessary DOM elements
   const counter = document.getElementById('counter');
   const minusButton = document.getElementById('minus');
   const plusButton = document.getElementById('plus');
   const heartButton = document.getElementById('heart');
   const pauseButton = document.getElementById('pause');
   const likesList = document.querySelector('.likes');
   const commentForm = document.getElementById('comment-form');
   const commentInput = document.getElementById('comment-input');

   function startTimer() {
    intervalId = setInterval(function () {
      counter.innerText = ++counterValue;
    }, 1000);
  }

   // Start the timer
   startTimer();

   // Event listener for minus button
   minusButton.addEventListener('click', function () {
     counter.innerText = --counterValue;
   });

   // Event listener for plus button
  plusButton.addEventListener('click', function () {
    counter.innerText = ++counterValue;
  });

  // Event listener for heart button
  heartButton.addEventListener('click', function () {
    const existingLike = document.querySelector(`[data-num="${counterValue}"]`);

    if (existingLike) {
        const likeSpan = existingLike.querySelector('span');
        likeSpan.innerText = parseInt(likeSpan.innerText) + 1;
      } else {
        const newLike = document.createElement('li');
        newLike.dataset.num = counterValue;
        newLike.innerHTML = `${counterValue} has been liked <span>1</span> time`;
        likesList.appendChild(newLike);
      }
    });

     // Event listener for pause button
  pauseButton.addEventListener('click', function () {
    if (playing) {
      clearInterval(intervalId);
      this.innerText = 'resume';
    } else {
      startTimer();
      this.innerText = 'pause';
    }
    playing = !playing;

    // Disable/enable buttons except pause button
    [minusButton, plusButton, heartButton].forEach(function (button) {
      button.disabled = !playing;
    });
  });

  // Event listener for comment form submission
  commentForm.addEventListener('submit', function (event) {
    event.preventDefault();
    const comment = commentInput.value.trim();
    if (comment !== '') {
      const commentParagraph = document.createElement('p');
      commentParagraph.innerText = comment;
      document.getElementById('list').appendChild(commentParagraph);
      commentInput.value = '';
    }
  });
   
})