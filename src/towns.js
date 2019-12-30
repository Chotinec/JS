/*
 Страница должна предварительно загрузить список городов из
 https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json
 и отсортировать в алфавитном порядке.

 При вводе в текстовое поле, под ним должен появляться список тех городов,
 в названии которых, хотя бы частично, есть введенное значение.
 Регистр символов учитываться не должен, то есть "Moscow" и "moscow" - одинаковые названия.

 Во время загрузки городов, на странице должна быть надпись "Загрузка..."
 После окончания загрузки городов, надпись исчезает и появляется текстовое поле.

 Разметку смотрите в файле towns-content.hbs

 Запрещено использовать сторонние библиотеки. Разрешено пользоваться только тем, что встроено в браузер

 *** Часть со звездочкой ***
 Если загрузка городов не удалась (например, отключился интернет или сервер вернул ошибку),
 то необходимо показать надпись "Не удалось загрузить города" и кнопку "Повторить".
 При клике на кнопку, процесс загрузки повторяется заново
 */

/*
 homeworkContainer - это контейнер для всех ваших домашних заданий
 Если вы создаете новые html-элементы и добавляете их на страницу, то добавляйте их только в этот контейнер

 Пример:
   const newDiv = document.createElement('div');
   homeworkContainer.appendChild(newDiv);
 */
const homeworkContainer = document.querySelector('#homework-container');

/*
 Функция должна вернуть Promise, который должен быть разрешен с массивом городов в качестве значения

 Массив городов пожно получить отправив асинхронный запрос по адресу
 https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json
 */
function loadTowns() {
  return new Promise((resolve) => {
    loadingBlock.innerText = 'Загрузка...'

    fetch('https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json')
      .then(response => response.json())
      .then(cities => {
        resolve(cities.sort(compare))
      })
      .catch(() => {
        loadingBlock.innerText = ''
        filterResult.innerText = 'Не удалось загрузить города';

        let button = document.createElement('button');

        button.innerText = 'Повторить';
        button.addEventListener('click', () => {
          filterBlock.removeChild(button);
          filterInput.dispatchEvent(new Event('keyup'));
        })
        
        filterBlock.appendChild(button);
      })

    function compare(a, b) {
      if (a.name > b.name) return 1;
      if (a.name == b.name) return 0;
      if (a.name < b.name) return -1;
    }
  })
}

/*
 Функция должна проверять встречается ли подстрока chunk в строке full
 Проверка должна происходить без учета регистра символов

 Пример:
   isMatching('Moscow', 'moscow') // true
   isMatching('Moscow', 'mosc') // true
   isMatching('Moscow', 'cow') // true
   isMatching('Moscow', 'SCO') // true
   isMatching('Moscow', 'Moscov') // false
 */
function isMatching(full, chunk) {
  return chunk ? full.toLowerCase().includes(chunk.toLowerCase()) : false;
}

/* Блок с надписью "Загрузка" */
const loadingBlock = homeworkContainer.querySelector('#loading-block');
/* Блок с текстовым полем и результатом поиска */
const filterBlock = homeworkContainer.querySelector('#filter-block');
/* Текстовое поле для поиска по городам */
const filterInput = homeworkContainer.querySelector('#filter-input');
/* Блок с результатами поиска */
const filterResult = homeworkContainer.querySelector('#filter-result');

filterInput.addEventListener('keyup', function(e) {
    // это обработчик нажатия кливиш в текстовом поле
    let target = e.target.value;

    loadTowns().then(cities => {
      filterResult.innerHTML = '';
      loadingBlock.innerText = '';
      cities.forEach(city => {
        if (isMatching(city.name, target)) {
          let item = document.createElement('div');

          item.innerText = city.name;
          filterResult.appendChild(item);
        }
      })
    })
});

export {
    loadTowns,
    isMatching
};
