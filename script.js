const buttonSearch = document.querySelector('.button-search');
buttonSearch.addEventListener('click', async function () {
   try {
      const inputKeyword = document.querySelector('.input-keyword');
      const movies = await getMovies(inputKeyword.value);
      updateUi(movies);
   } catch (error) {
      // console.log(error)
      alert(error)
   };
});

function getMovies(keyword) {
   return fetch('http://www.omdbapi.com/?apikey=d9e3351e&s=' + keyword)
      .then(response => {
         if (!response.ok) {
            throw new Error(response.statusText)
         }
         return response.json();
      })
      .then(response => {
         if (response.Response === 'False') {
            throw new Error(response.Error)
         }
         return response.Search;
      });
};

function updateUi(movies) {
   let cards = '';
   movies.forEach(m => cards += showCrads(m));
   const movieContainer = document.querySelector('.movie-container');
   movieContainer.innerHTML = cards;
};

// data binding
document.addEventListener('click', async function (e) {
   if (e.target.classList.contains('button-detail')) {
      const imdbid = e.target.dataset.imdbid;
      const movieDetail = await getMovieDetail(imdbid);
      updateUIdetail(movieDetail);
   };
});

function getMovieDetail(imdbid) {
   return fetch('http://www.omdbapi.com/?apikey=d9e3351e&i=' + imdbid)
      .then(response => response.json())
      .then(m => m)
};

function updateUIdetail(m) {
   const movieDetail = showMovieDetail(m);
   const modalBody = document.querySelector('.modal-body');
   modalBody.innerHTML = movieDetail;
};

function showCrads(m) {
   return `<div class="col-6 col-sm-4 col-md-3 mb-3">
            <div class="card">
               <img class="card-img-top" src="${m.Poster}" alt="Card image cap">
               <div class="card-body">
                  <h6 class="card-title">${m.Title}</h6>
                  <h6 class="card-subtitle mb-2 text-muted">${m.Year}</h6>
                  <a href="#" class="card-link button-detail" data-toggle="modal" data-target="#exampleModal" data-imdbid="${m.imdbID}">See Detail</a>
               </div>
            </div>
         </div>`;
};

function showMovieDetail(m) {
   return `<div class="container-fluid">
            <div class="row">
               <div class="col-md-5 d-flex justify
               -content-center mb-3">
                  <img src="${m.Poster}" alt="image movie" class="img-fluid">
               </div>
               <div class="col">
                  <ul class="list-group">
                     <h5 class="text-center"><strong></strong> ${m.Title} ${m.Year}</h5>
                     <li class="list-group-item"><strong>Genre : </strong>${m.Genre}</li>
                     <li class="list-group-item"><strong>Director : </strong>${m.Director}</li>
                     <li class="list-group-item"><strong>Writer : </strong>${m.Writer}</li>
                     <li class="list-group-item"><strong>Actors : </strong>${m.Actors}</li>
                     <li class="list-group-item"><strong>Plot : </strong><br>${m.Plot}</li>
                  </ul>
               </div>
            </div>
         </div>`;
};