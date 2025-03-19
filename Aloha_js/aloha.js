// \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
// todo правильное бургер-меню
$(document).ready(function () {
  $(".header__burger").click(function (event) {
    $(".header__burger,.header__menu").toggleClass("active");
    $("body").toggleClass("unscroll");
  });
});
// \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

// todo попап А.Дудукало на JS (на Contact)
// открываем окно
document.querySelector("#open-modal").addEventListener("click", function () {
  document.querySelector("#modalContact").classList.add("open");
});
// закрываем окно
document.querySelector("#close-modal").addEventListener("click", function () {
  document.querySelector("#modalContact").classList.remove("open");
});
// чтобы popup можно было закрыть в любом месте экрана запишем и тогда ссылкой будет вся area
document
  .querySelector("#closeModalArea")
  .addEventListener("click", function () {
    document.querySelector("#modalContact").classList.remove("open");
  });
// todo попап А.Дудукало на JS (на Contact)
// \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
// todo попап ITDoctor на JS (на любое кол кнопок)

// todo = логика такая == находим на стр все кнопки, затем у КАЖДОЙ из этих кнопок отслеживаем клик. Когда происходит клик, смотрим какое значение записано у той кнопки по которой произведен клик в атрибуте data-modal-open-btn (т.е data-modal-open-btn="modal1" ). Например кликнули по первой, в атрибуте data-modal-open-btn записано значение ="modal1" , следовательно надо на стр открыть блок id="modal1". Далее находим на стр блок с id="modal1", убираем у него класс "hide" и он открыт или кликнули по modal3 == нашли его data-modal-open-btn="modal3" == взяли из атрибута его значение "modal3" == и это значит, что надо открыть блок с id="modal3" == убираем class="hide" у id="modal3" и он виден. НО в этот момент уже видно первое окно (modal1) и для того, чтобы здесь не произошло конфликта, будем делать следующее == по клику на modal3, сначало СКРОЕМ все элементы (добавим всем элементам класс hide), а потом покажем (откроем) тот, который указан в кликнутом data-modal-open-btn
// получаем все кнопки открытия по data-атрибуту
let btnsOpenModalWindows = document.querySelectorAll("[data-modal-open-btn]");
// получаем все модальные окна по data-атрибуту
let allModalWindows = document.querySelectorAll("[data-modal-window]");
// далее надо отследить клик по каждой кнопке из массива (коллекции) и для этого запускаем цикл forEach
btnsOpenModalWindows.forEach(function (item) {
  // в ф, как обычно, вставляется два параметра, это элемент и индекс, но т.к с индексами работать не будем, то индексы не вставляем. Остаются только item и это значит, что под item каждый раз при прохождении будет подставляться по очереди каждый элемент из коллекции btnsOpenModalWindows и когда получаем по очереди элементы при прохождении forEach, в {  } пишем, что будем делать с этими элементами. Обращаться к ним будем через item
  console.log(item);
  // и вот здесь на каждый элемент по очереди повесим прослушку по клику
  item.addEventListener("click", function () {
    console.log("*****");
    // теперь надо определить ПО КАКОМУ КОНКРЕТНО item был сделан click. И делается это при помощи ключевого слова this. THIS каждый раз будет ссылаться именно на ТОТ элемент по которому произошло событие (в данном примере произошло событие click).
    console.log(this);
    // далее надо ПОЛУЧИТЬ значение кликнутого атрибута data-modal-open-btn
    // ? data-атрибуты = это такой отдельный класс атрибутов в HTML, они всегда начинаются со слова data- и после пишется какое то свое название (имя) атрибута, например: data-test, data-column и т.д и работаем с data-атрибутами через dataset, а если надо обратиться к какому то data-атрибуту, то после dataset пишем ТОЛЬКО ИМЯ (bottom) этого data-атрибута, но БЕЗ data-. Например при data-test, запись будет console.log(this.dataset.test), при data-column, запись будет console.log(this.dataset.column);
    //Имена атрибутов трансформируются в переменные, к которым в дальнейшем можно обращаться и получать значения, по следующим правилам:data- удаляется, любой дефис идущий перед - буквой удаляется, а буква за ним становится заглавной любые другие буквы остаются неизменными Например, атрибут data-date-of-birth преобразуется в переменную dateOfBirth.Для обращения к атрибутам и получения их значений через скрипты применяется метод dataset. Он же используется и для установки нового значения.
    // теперь, когда this показывает на какой конкретно item был сделан click, можем посмотреть контент этого элемента
    console.log(this.dataset.modalOpenBtn);
    // когда нашли все модальные окна по data-атрибуту let allModalWindows = document.querySelectorAll("[data-modal-window]");, это как любую другую коллекцию надо обойти forEach
    allModalWindows.forEach(function (item) {
      // скрываем - т.е обходим и добавляем скрывающий класс hide
      item.classList.add("hide");
      console.log(item);
    });
    const windowToOpen = document.querySelector(
      "#" + this.dataset.modalOpenBtn
    );
    // ! описание строки выше = в const windowToOpen найден и записан первый ID-шник, который получим при клике на КОНКТРЕТНЫЙ (this) (кнопку) со значением data-modal-open-btn (modal1, modal2 или modal3) соответствующему ID-шнику окна
    // можно упростить запись let znachenieBtn = this.dataset.modalOpenBtn и оперировать переменной

    console.log(windowToOpen);
    windowToOpen.classList.remove("hide");

    // закрытие окон = здесь querySelector ищем не по document, а только по windowToOpen
    let btnCloseWindows = windowToOpen.querySelector(".modal__close-btn");
    btnCloseWindows.addEventListener("click", function () {
      windowToOpen.classList.add("hide");
    });
  });
});
// далее опысываем закрытие модального окна при клике в любом месте модальной области
window.onclick = function (e) {
  if (e.target.hasAttribute("data-modal-window")) {
    // Свойство event.target содержит элемент, на котором сработало событие. Это не тот элемент, к которому был привязан обработчик этого события, а именно самый глубокий тег, на который непосредственно был, к примеру, совершен клик. Другими словами указывает ИМЕННО НА ТОТ элемент по которому произведен клик

    // Метод hasAttribute проверяет наличие заданного атрибута у элемента. Если атрибут есть - выведет true, если нет - выведет false.
    allModalWindows.forEach(function (item) {
      // обходим циклом и добавляем скрывающий класс hide
      item.classList.add("hide");
    });
  }
};
// todo попап ITDoctor на JS (на любое кол кнопок)
// \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
// todo Галерея изображений с горизонтальной прокруткой using JS
let containerAllGalleries = document.querySelector(".container__gallery");
let btnLeft = document.querySelector("#leftBtn");
let btnRight = document.querySelector("#rightBtn");
btnLeft.addEventListener("click", () => {
  containerAllGalleries.style.scrollBehavior = "smooth";
  containerAllGalleries.scrollLeft -= 900;
});

btnRight.addEventListener("click", () => {
  containerAllGalleries.style.scrollBehavior = "smooth";
  containerAllGalleries.scrollLeft += 900;
});
// todo Галерея изображений с горизонтальной прокруткой using JS
// \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
// todo форма отправки и пароль on JS =======
function myPass() {
  let p = document.querySelector("#mypassword");
  if (p.type === "password") {
    p.type = "text";
  } else {
    p.type = "password";
  }
}
// todo форма отправки и пароль on JS =======
// \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
// todo Pop-Up Image Gallery CSS & JS

$(".separate-popup ");
// todo Pop-Up Image Gallery CSS & JS
