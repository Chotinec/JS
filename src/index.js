/* ДЗ 2 - работа с массивами и объектами */

/*
 Задание 1:

 Напишите аналог встроенного метода forEach для работы с массивами
 Посмотрите как работает forEach и повторите это поведение для массива, который будет передан в параметре array
 */
function forEach(array, fn) {
  for (let i = 0; i < array.length; i++) {
    fn(array[i], i, array);
  }
}

/*
 Задание 2:

 Напишите аналог встроенного метода map для работы с массивами
 Посмотрите как работает map и повторите это поведение для массива, который будет передан в параметре array
 */
function map(array, fn) {
  var resultArray = [];

  for (let i = 0; i < array.length; i++) {
    resultArray.push(fn(array[i], i, array));
  }

  return resultArray;
}

/*
 Задание 3:

 Напишите аналог встроенного метода reduce для работы с массивами
 Посмотрите как работает reduce и повторите это поведение для массива, который будет передан в параметре array
 */
function reduce(array, fn, initial) {
  var prev = initial;
  var i = 0;
  
  if (prev == undefined) {
    prev = array[0];
    i = 1;
  }

  for (; i < array.length; i++) {
    prev = fn(prev, array[i], i, array);
  }

  return prev;
}

/*
 Задание 4:

 Функция должна перебрать все свойства объекта, преобразовать их имена в верхний регистр и вернуть в виде массива

 Пример:
   upperProps({ name: 'Сергей', lastName: 'Петров' }) вернет ['NAME', 'LASTNAME']
 */
function upperProps(obj) {
  var arr = [];

  for (var prop in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, prop)) {
      arr.push(prop.toUpperCase());
    }
  }

  return arr;
}

/*
 Задание 5 *:

 Напишите аналог встроенного метода slice для работы с массивами
 Посмотрите как работает slice и повторите это поведение для массива, который будет передан в параметре array
 */
function slice(array, from, to) {
  var result = [];

  if (from == undefined || from < -array.length) {
    from = 0;
  }

  if (to == undefined || to > array.length) {
    to = array.length;
  }

  if (from < 0 && from >= -array.length) {
    from = array.length + from;
  }

  if (to < 0 && to > -array.length) {
    to = array.length + to;
  }

  for (let i = 0; i < array.length; i++) {
    if (i >= from && i < to) {
      result.push(array[i]);
    } 
  }
  
  return result;
}

/*
 Задание 6 *:

 Функция принимает объект и должна вернуть Proxy для этого объекта
 Proxy должен перехватывать все попытки записи значений свойств и возводить это значение в квадрат
 */
function createProxy(obj) {
  var proxy = new Proxy(obj, {
    set: function(target, prop, val) {
      target[prop] = val * val;
      
      return true;
    }
  });

  return proxy;
}

export {
  forEach,
  map,
  reduce,
  upperProps,
  slice,
  createProxy
};
