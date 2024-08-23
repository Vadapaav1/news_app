
function reload() {
    window.location.reload();
}

async function fetchNews(query) {
    if(query === "home"){
        
        const res = await fetch('https://saurav.tech/NewsAPI/everything/cnn.json');
        const data = await res.json();
        bindData(data.articles);
    }
    else{
        const res = await fetch(`https://saurav.tech/NewsAPI/top-headlines/category/${query}/in.json`);
        const data = await res.json();
        bindData(data.articles);
    }

    
      
}

function bindData(articles) {
    const cardsContainer = document.getElementById("cards-container");
    const newsCardTemplate = document.getElementById("template-news-card");

    cardsContainer.innerHTML = "";

    articles.forEach((it) => {
        if (!it.urlToImage) return;
        const cardClone = newsCardTemplate.content.cloneNode(true);
        fillDataInCard(cardClone, it);
        cardsContainer.appendChild(cardClone);
    });
}

function fillDataInCard(cardClone, it) {
    const newsImg = cardClone.querySelector("#news-img");
    const newsTitle = cardClone.querySelector("#news-title");
    const newsSource = cardClone.querySelector("#news-source");
    const newsDesc = cardClone.querySelector("#news-desc");

    newsImg.src = it.urlToImage;
    newsTitle.innerHTML = "LOVE !!!!";
    newsDesc.innerHTML = it.description;

    const date = new Date(it.publishedAt).toLocaleString("en-US", {
        timeZone: "Asia/Jakarta",
    });

    newsSource.innerHTML = `${it.source.name} · ${date}`;

    cardClone.firstElementChild.addEventListener("click", () => {
        window.open(it.url, "_blank");
    });
}

let curSelectedNav = null;

function onNavItemClick(id) {
    fetchNews(id);
    const navItem = document.getElementById(id);
    curSelectedNav?.classList.remove("active");
    curSelectedNav = navItem;
    curSelectedNav.classList.add("active");
}

const searchButton = document.getElementById("search-button");
const searchText = document.getElementById("search-text");

searchButton.addEventListener("click", () => {
    const query = searchText.value;
    if (!query) return;
    fetchNews(query);
    curSelectedNav?.classList.remove("active");
    curSelectedNav = null;
});
