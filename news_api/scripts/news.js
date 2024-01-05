if (userActive) {
    const newsContainer = document.getElementById("news-container");
    const previousBtn = document.getElementById("btn-prev");
    const pageNum = document.getElementById("page-num");
    const nextBtn = document.getElementById("btn-next");

    let totalResults = 0;

    const apiKey = 'c2b99c199c6e4e709bde632379cf0096';

    getNews("us", 1);

    async function getNews(country, page) {
        try {
            const res = await fetch(
                `https://newsapi.org/v2/top-headlines?country=${country}&category=${userActive.category}&pageSize=${userActive.pageSize}&page=${page}&apiKey=${apiKey}`
            );

            const data = await res.json();

            if (data.status === "error" && data.code === "rateLimited") {
                throw new Error(data.message);
            }

            if (data.code === "corsNotAllowed") {
                throw new Error(data.message);
            }

            News(data);
        }

        catch (err) {
            alert("Error: " + err.message);
        }
    }

    function previousButton() {
        if (pageNum.textContent == 1) {
            previousBtn.style.display = "none";
        } else {
            previousBtn.style.display = "block";
        }
    }

    function nextButton() {
        if (pageNum.textContent == Math.ceil(totalResults / userActive.pageSize)) {
            nextBtn.style.display = "none";
        } else {
            nextBtn.style.display = "block";
        }
    }

    function News(data) {
        totalResults = data.totalResults;

        previousButton();
        nextButton();

        let html = "";

        data.articles.forEach(article => {
            html += `<div class="card mb-3" style="">
        <div class="row no-gutters">
          <div class="col-md-4">
            <img src="${article.urlToImage}" class="card-img" style="height:100%" alt="${article.title}">
          </div>
          <div class="col-md-8">
            <div class="card-body">
              <h5 class="card-title">${article.title}</h5>
              <p class="card-text">${article.description}</p>
              <a href="${article.url} ttarget="_blank" class="btn btn-primary">View</a>
            </div>
          </div>
        </div>
      </div>`;
        });

        newsContainer.innerHTML = html;
    }

    previousBtn.addEventListener('click', function () {
        getNews("us", --pageNum.textContent);
    });

    nextBtn.addEventListener('click', function () {
        getNews("us", ++pageNum.textContent);
    });
} else {
    alert("Please login to access this content!");

    window.location.assign("../index.html");
}
