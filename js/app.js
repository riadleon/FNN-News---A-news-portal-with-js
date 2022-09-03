const loadAllProduct = async () => {
    const url = 'https://openapi.programming-hero.com/api/news/categories'
    try {
        const res = await fetch(url);
        const data = await res.json();
        return data.data.news_category;
        // console.log(data.data.news_category);
    } catch (error) {
        console.log(error);
    }

}

const setAllCategory = async () => {
    const data = await loadAllProduct()
    // console.log(data);

    const allCategory = document.getElementById('all-category');

    const uniqueArray = [];

    for (const category of data) {
        // console.log(category.category_name);

        if (uniqueArray.indexOf(category.category_name) === -1) {
            uniqueArray.push(category.category_name);
            // console.log(category.category_name);

            const li = document.createElement('li');
            li.innerHTML = `
            <a onclick="loadAllNews('${category.category_id}')" class="nav-link">${category.category_name}</a>
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
