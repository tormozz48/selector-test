# selector-test
Тестовое задание. Написать кастомный компонент выпадающего списка

Демо доступно [здесь](https://tormozz48.github.io/selector-test/)

## Пример использования

```ts

//инициализировать компонент
const selector = new Selector('#my-select-element');

//добавить обработчик событий компонента
selector.setListener((event, data) => {
    console.log(event); //имя события
    console.log(data); //дополнительные данные
});

//установить список доступных опций
selector.setValueList([
    {label: 'foo1', value: 'bar1'},
    {label: 'foo2', value: 'bar2', active: true},
    {label: 'foo3', value: 'bar3'}
]);

//установить текущее выбранное значение
selector.setValue('bar3');

//получить текущее выбранное значение
selector.getValue(); //'bar3'
```

## Разработка

* Склонировать проект: `git clone https://github.com/tormozz48/selector-test.git`
* Перейти в директорию проекта: `cd selector-test`
* Установить зависимости: `npm install`
* Собрать проект: `npm run webpack`
* Запустить dev-сервер и и открыть демо-страницу с компонентом в браузере: `npm start`

Запуск тестов: `npm test`
