(function () {
    const form = document.querySelector('#search-form');
    const searchField = document.querySelector('#search-keyword');
    let searchedForText;
    const responseContainer = document.querySelector('#response-container');

    //UNSPLASH
    // form.addEventListener('submit', function (e) {
    //     e.preventDefault();
    //     responseContainer.innerHTML = '';
    //     searchedForText = searchField.value;
    //     //searchedForText = 'hippos';
    //     //debugger
    //     const articleRequest = new XMLHttpRequest();

    //     articleRequest.open('GET', `https://api.unsplash.com/search/photos?page=1&query=${searchedForText}`);
    //     articleRequest.onload = addArticle;
    //     articleRequest.setRequestHeader('Authorization', 'Client-ID bd99c18d891030018c07f44908bb336fa36b5b3690c24ba6c24e643e381f232c');
    //     articleRequest.send();

    //     function addArticle() {
    //         const data = JSON.parse(articleRequest.response);
    //         const firstimage = data.results[0];
    //         console.log(firstimage);
    //         let template = `
    //         <article>
    //         <img src="${firstimage.urls.regular}">
    //         <figcaption>${searchedForText} by ${firstimage.user.name}</figcaption>
    //         </article>
    //         `;

    //         responseContainer.insertAdjacentHTML('afterbegin', template);
    //     }
    // });


    //NYT
    form.addEventListener('submit', function (e) {
        e.preventDefault();
        responseContainer.innerHTML = '';
        searchedForText = searchField.value;
        //searchedForText = 'hippos';
        //debugger
        const articleRequest = new XMLHttpRequest();

        articleRequest.open('GET', `http://api.nytimes.com/svc/search/v2/articlesearch.json?q=${searchedForText}&api-key=1fc9f22956ac41edacac63dfc41acae0`);
        articleRequest.onload = addArticle;
        articleRequest.send();

        function addArticle() {
            const data = JSON.parse(articleRequest.response);
            //debugger
            const response = data.response.docs;
            //const docs = response.map(v=>v);
            //debugger
            const markup = response.reduce((acc, v) => {
                acc += `<article><header><h2><a href="${v.web_url}">${v.headline.main}</a></h2></header><p>${v.snippet}</p></article>`;
                return acc;
            }, '');

            responseContainer.insertAdjacentHTML('afterbegin', markup || 'No articles available');
        }
    });


})();
