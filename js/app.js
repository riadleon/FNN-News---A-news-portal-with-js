const loadAllProduct = async () => {
    const url = 'https://openapi.programming-hero.com/api/news/categories'
    try {
        const res = await fetch(url);
        const data = await res.json();
        return data.data.news_category;
    } catch (error) {
        console.log(error);
    }

}

const setAllCategory = async () => {
    const data = await loadAllProduct()

    const allCategory = document.getElementById('all-category');

    const uniqueArray = [];

    for (const category of data) {
        // console.log(category.category_name);

        if (uniqueArray.indexOf(category.category_name) === -1) {
            uniqueArray.push(category.category_name);
            // console.log(category.category_name);

            const li = document.createElement('li');
            li.innerHTML = `
            <a onclick="loadAllNews('${category.category_id}')" class="nav-link btn btn-light">${category.category_name}</a>
            `;
            allCategory.appendChild(li);
        }
    }

}

setAllCategory();

// spinner
const toggleSpinner = isLoading => {
    const spinnerSection = document.getElementById('spinner');
    if (isLoading) {
        spinnerSection.classList.remove('d-none')
    } else {
        spinnerSection.classList.add('d-none')
    }
}

const loadAllNews = async category_id => {

    // spinner start
    toggleSpinner(true);

    const url = `https://openapi.programming-hero.com/api/news/category/${category_id}`;

    const res = await fetch(url);
    const data = await res.json();
    displayNewsItem(data.data);
}
const displayNewsItem = newsAll => {
    // console.log('newsAll', newsAll);

    //Sort in array
    newsAll.sort((a, b) => {
        return b.total_view - a.total_view;
    });

    const totalNewsCount = document.getElementById('total-news-count').innerHTML = `${newsAll.length} items found for category`;

    //no-news-gategory
    const noNewsGategory = document.getElementById('no-news-gategory');
    if (newsAll.length === 0) {
        noNewsGategory.classList.remove('d-none');
    }
    else {
        noNewsGategory.classList.add('d-none');
    }
    //All new Show
    const newsContainer = document.getElementById('news-container');
    newsContainer.textContent = '';
    newsAll.forEach(news => {


        const div = document.createElement('div');
        div.innerHTML = `
    <div class="container card mb-3"">
    <div class="row g-0">
    <div class="col-md-4">
     <img src=${news.thumbnail_url}" class="img-fluid rounded-start" alt="...">
    </div>
    <div class="col-md-8">
     <div class="card-body">
     <h5 class="card-title">${news.title ? news.title : 'Title not found'}</h5>
     <p class="card-text">${news.details.length > 300 ? news.details.slice(0, 300) + '...' : news.details}</p>


    
     <div class="mb-3 mt-5" >
        <div class="d-flex justify-content-between row g-0">
            <div class="col-md-2">
                <img src="${news.author.img ? news.author.img : 'Author Image not found'}" style="width: 50px; height: 50px;" class="rounded-circle" alt="...">
            </div>
            <div class="col-md-4">
                <h5 class="title">${news.author.name ? news.author.name : 'Author is not found'}</h5>
                <p class="text">${news.author.published_date ? news.author.published_date : 'Author Published date not found'}</p>

            </div>

            <div class="col-md-4">
                <h5 class="title"><i class="fa-regular fa-eye"></i> ${news.total_view ? news.total_view : 'View is not found'}</h5>
            </div>
            <div class="col-md-2">
                <h5 onclick="loadNewsDetails('${news._id}')" class="title" data-bs-toggle="modal" data-bs-target="#detailsModal"><i class="fa-solid fa-arrow-right"></i></h5>
            </div>
        </div>
    </div>
    

  </div>
</div>
</div>
</div>
    `;
        newsContainer.appendChild(div);
    })

    //Spinner stop
    toggleSpinner(false);

}
const loadNewsDetails = async news_id => {
    const url = `https://openapi.programming-hero.com/api/news/${news_id}`;
    const res = await fetch(url);
    const data = await res.json();
    displayNewsDetails(data.data[0]);
}