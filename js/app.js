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
