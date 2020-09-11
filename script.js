
const resultNode = document.querySelector('.j-result')  //находим блок, куда будем вставлять картинки
const button = document.querySelector('.j-btn-request') //находим кнопку, на которую будем вешать обработчик события "клик"


//функция для отправки запроса и обработки его результата
const useRequest = (url) =>{
    return fetch(url)
        .then((response) => {
            return response.json();
        })
        .then(json => {
            return json;
        })
        .catch(() => {
            console.log('error');
        })
}

//функция для отображения результатов
function displayResult(apiData) {
    console.log(apiData);
    cards = ''
    apiData.forEach(item => {
        const cardBlock = `
        <div class="card">
            <img
                src="${item.download_url}"
                size="height:200px; height:200px"
                class="card-image"
            />
        </div> 
        `;
        cards = cards + cardBlock;
        localStorage[item.uid] = item.download_url;
    });
    resultNode.innerHTML = cards;
}

//функция для проверки корректности введеных данных
function checkNumber(number) {
    return ((number > 1) || (number < 10) || (typeof number == "number")) 
}


button.addEventListener('click', async () => {
    const pageNumber = document.querySelector('.page-number').value;
    const limit = document.querySelector('.limit').value;

    if (!checkNumber(pageNumber) &&  checkNumber(limit)){
        resultNode.innerHTML = `<p>Page number not in 1..10</p>`;
    }
    else if (!checkNumber(limit) && checkNumber(pageNumber)){
        resultNode.innerHTML = `<p>Limit not in 1..10</p>`;
    }
    else if (!checkNumber(limit) && !checkNumber(pageNumber)) {
        resultNode.innerHTML = `<p>Limit and page number not in 1..10</p>`;
    }
    else {
        let url = `https://picsum.photos/v2/list?page=${pageNumber}&limit=${limit}`;
        const result = await useRequest(url);
        localStorage.result = JSON.stringify(result);
        displayResult(result);
    }
})

//проверяем, если данные были получены ранее, то берем их из localStorage
if (localStorage.result) {
    displayResult(JSON.parse(localStorage.result))
}
