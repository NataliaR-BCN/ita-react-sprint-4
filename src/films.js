"use strict";


// ***** USEFUL FUNCTIONS // SHARED FEATURES ***** 

//Extract all the values by a certain property (for exercises 1, 4 and 8, and moviesAverage):
function extractDataField(array, property) {
  const dataExtracted = array.map(movie => movie[property]);
  
  return dataExtracted;
} 


//Filter movies by a certain value (exercises 2 and 8):
function filterData(array, property, value) {
  let filterResult = array.filter(movie => movie[property] === value); 

  return filterResult;
}


//Average calculator (for exercises 3 and 6):
function moviesAverage(array) {
  const extractScores = extractDataField(array, 'score') 
  .filter((score) => { if (score !== '') return score; }); //to skip empty scores

  const calculateScoreAverage = extractScores.reduce((scoreA, scoreB) => scoreA + scoreB) / extractScores.length; 
  
  return Number(calculateScoreAverage.toFixed(2));
}


// Exercise 1: Get the array of all directors
function getAllDirectors(array) {
  let result = extractDataField(array, 'director'); 
  
  console.log("EXERCISE 1 ->", result);
  return result;
}


// Exercise 2: Get the films of a certain director
function getMoviesFromDirector(array, director) {
  let result = filterData(array, 'director', director);

  return result;
}


// Exercise 3: Calculate the average of the films of a given director
function moviesAverageOfDirector(array, director) {
  let result = moviesAverage(getMoviesFromDirector(array, director));
  
  return result;
}


// Exercise 4: Alphabetic order by title 
function orderAlphabetically(array) {
  let result = extractDataField(array, 'title').sort();

  if (result.length > 20) {
    result.length = 20;
  }
 
  return result;
}


// Exercise 5: Order by year, ascending, and alphabetically by title in the same year:
function orderByYear(array) {

  const films = array.slice(); //Simple clone because only change array order 

  let result = films.sort(function(a, b) {
    if (a.year > b.year) {
        return 1;
    } else if (a.year < b.year) {
        return -1;
    } else {
      let x = a.title.toLowerCase();
      let y = b.title.toLowerCase();
      if (x > y) {
          return 1;
      } else if (x < y) {
          return -1;
      } else {
        return 0;
      } 
    }
  });  

  return result;
}


// Exercise 6: Calculate the average of the movies in a category
function moviesAverageByCategory(array, category) {
  const moviesCategoryWanted = array.filter(movie => {
    if (movie.genre.includes(category)) return movie; 
  });
  
  let result = moviesAverage(moviesCategoryWanted);

  return result;
}


// Exercise 7: Modify the duration of movies to minutes
function hoursToMinutes(array) {

  const films = JSON.parse(JSON.stringify(array)); //A copy without references to change objects
 
  let result = films.map(film => {
    const hours = parseInt(film.duration.split('h')[0]);
    let minutes = parseInt(film.duration.split('h')[1]);
    if (isNaN(minutes)) minutes = 0;
    film.duration = parseInt(hours * 60 + minutes);
    return film;
  }); 

  return result;
}


// Exercise 8: Get the best film of a year
function bestFilmOfYear(array, year) {
  const allMoviesOfYear = filterData(array, 'year', year);

  const highestScore =  Math.max.apply(Math, extractDataField(allMoviesOfYear, 'score'));

  let result = filterData(allMoviesOfYear, 'score', highestScore);

  return result;
}


// The following is required to make unit tests work.
/* Environment setup. Do not modify the below code. */
if (typeof module !== 'undefined') {
  module.exports = {
    getAllDirectors,
    getMoviesFromDirector,
    moviesAverageOfDirector,
    orderAlphabetically,
    orderByYear,
    moviesAverageByCategory,
    hoursToMinutes,
    bestFilmOfYear,
  };
}