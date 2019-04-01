"use strict"

//APIKEY
const secretKey =
'a712110645e20d63d17f51be28d6198d07997e78e439bf5e10cb285050fe8b0b';
const apiKey = 'e18244b3c56723492459a616157350d1cc2eb59834cf9fc7e3501035222bb488';
const searchUrl='https://api.unsplash.com/search/photos/';

// Template for Images
function displayResults(pics, maxResults=5) {
   console.log(pics);
  $('.results').empty();
  $('.filters').show().fadeIn(4000);
  for(let i=0; i < pics.results.length && i < maxResults; i++) {
    $('.results').hide().fadeIn(3000).append(
      `<img class="med" id=${[i]} src="${pics.results[i].urls.regular}" alt="${pics.results[i].alt_description} by
      ${pics.results[i].user.name}">`)
  }
}


// Filters the Query Parmeters
function formatQueryParams(params) {
  const queryItems = Object.keys(params)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
  return queryItems.join('&');
}

// Fetch Request to Unsplash
function getImages (searchTerms) {
  const params = {
    client_id:apiKey,
    query: `${searchTerms}`
  };
  const queryString = formatQueryParams(params)
  const url = searchUrl + '?' + queryString;
  fetch(url)
  .then(response => {
    if (response.ok) {
      return response.json();
    }
    throw new Error(response.statusText);
  })
  .then(responseJson =>
    setTimeout(function(){
      displayResults(responseJson)
    }, 2000))
  .catch(err => {
    $('#js-error-message').text(`Something went wrong: ${err.message}`);
  })
}

// Load the Instagram Filters
function watchPics() {
  let key;
  let $this;
  let classes;
  $('.results').on('click','.med', function(event){
    event.preventDefault();
    key = this.id;
    console.log(this.id  === event.currentTarget.id);

    $this = $(this);
    console.log($this);
    classes = this.classList;
    console.log(this.classList);
    $('.med').removeClass('active');
    $(this).toggleClass('active');

    console.log("Image key or ID is :" + key);
  });

  $('.filters').on('click', '.filter', function(event){
    event.preventDefault;
    console.log(this.id);
    console.log(this.id  === event.currentTarget.id);
    let filterClass = this.id;
    console.log( "String: " + filterClass);
    console.log($this);
    if ( key ) {
      $this.addClass(filterClass);
    }
    if (classes.contains("inkwell" ) &&filterClass === 'aden' ||'_1977' || 'lark'
      || 'nashville' || 'mayfair' || 'hudson' || 'toaster' || 'gingham'|| 'kelvin'
      ||  'lofi' || 'moon' || 'reyes') {
      $this.removeClass("inkwell" );
      $this.removeClass("aden" );
      $this.removeClass("_1977" );
      $this.removeClass("lark" );
      $this.removeClass("nashville" );
      $this.removeClass("mayfair" );
      $this.removeClass("hudson" );
      $this.removeClass("toaster" );
      $this.removeClass("gingham" );
      $this.removeClass("kelvin" );
      $this.removeClass("lofi" );
      $this.removeClass("moon" );
      $this.addClass(filterClass);
    }
    if (classes.contains("xpro2") && filterClass === 'inkwell'|| 'lark' ) {
      $this.removeClass("xpro2");
      $this.removeClass("lark");
      $this.addClass(filterClass);
    }
    if (classes.contains("aden") && filterClass === 'inkwell' || 'xpro2' || '_1977' ) {
      $this.removeClass("xpro2");
      $this.removeClass("inkwell");
      $this.removeClass("_1977");
      $this.addClass(filterClass);
    }
    if (classes.contains("mayfair") && filterClass === 'inkwell' || 'xpro2' || '_1977' ) {
      $this.removeClass("xpro2");
      $this.removeClass("inkwell");
      $this.removeClass("_1977");
      $this.addClass(filterClass);
    }
    if (classes.contains("nashville") && filterClass === 'inkwell' || 'xpro2' || '_1977' ) {
      $this.removeClass("xpro2");
      $this.removeClass("inkwell");
      $this.removeClass("_1977");
      $this.addClass(filterClass);
    }
    if (classes.contains("hudson") && filterClass === 'inkwell' || 'xpro2' || '_1977' ) {
      $this.removeClass("xpro2");
      $this.removeClass("inkwell");
      $this.removeClass("_1977");
      $this.addClass(filterClass);
    }
    if (classes.contains("toaster") && filterClass === 'inkwell' || 'xpro2' || '_1977' ) {
      $this.removeClass("xpro2");
      $this.removeClass("inkwell");
      $this.removeClass("_1977");
      $this.addClass(filterClass);
    }
    if (classes.contains("gingham") && filterClass === 'inkwell' || 'xpro2' || '_1977' ) {
      $this.removeClass("xpro2");
      $this.removeClass("inkwell");
      $this.removeClass("_1977");
      $this.addClass(filterClass);
    }
    if (classes.contains("kelvin") && filterClass === 'inkwell' || 'xpro2' || '_1977' ) {
      $this.removeClass("xpro2");
      $this.removeClass("inkwell");
      $this.removeClass("_1977");
      $this.addClass(filterClass);
    }
    if (classes.contains("lofi") && filterClass === 'inkwell' || 'xpro2' || '_1977' ) {
      $this.removeClass("xpro2");
      $this.removeClass("inkwell");
      $this.removeClass("_1977");
      $this.addClass(filterClass);
    }
    else if (classes.contains("nofilter") && filterClass === 'aden' ||'_1977' || 'lark'
      || 'nashville' || 'mayfair' || 'hudson' || 'toaster' || 'gingham'|| 'kelvin'
      ||  'lofi' || 'inkwell'|| 'xpro2' ||'moon' ||'reyes') {
      $this.removeClass(filterClass);
    }
  });
}

// Submit Action for Query
function watchForm() {
  $('form').submit(event => {
    event.preventDefault();
    const query= $('#js-image-search').val();
    getImages(query);
  });
}

// Stack
function loadStack(){
  watchForm();
  watchPics();
}

$(loadStack);
