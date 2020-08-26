# Виджет с чатом на нативном JS

## Запуск проекта

*Чтобы запустить проект, нужно перейти по ссылке на gh-pages:* [ссылка на проект](https://ifabrichnov.github.io/Chat-widget-app/ "ссылка на проект")

![1](https://github.com/IFabrichnov/Chat-widget-app/raw/master/README-IMG/1.jpg)

## Описание

Виджет чата, созданный с помощью класса, который хранит сообщения в localStorage и меняет цвет при каждом новом открытии. Также присутствует имитация задержки с помощью **Promise**. 

### Что применено

**localStorage** - объект веб хранилища, позволяющий хранить пары ключ/значение в браузере. 
Поместить item в хранилище: localStorage.setItem(‘test’, 1); (параметры – ключ/Значение). 

**Class** - разновидность функции.

```javascript
class User {
     constructor(name) { this.name = name; }
     sayHi() {alert(this.name); }
}
```
**Constructor** – метод, необходимый для создания и инициализации объектов, созданных с помощью класса. В классе может быть только 1 конструктор.

Наследование классов с помощью **extends**:
Ключевое слово extends используется в объявлениях классов и выражениях классов для создание класса, дочернего относительно другого класса.

```javascript
class Animal {
      constructor(name) {
         this.name = name;
      }
      speak() {
          console.log(this.name + ‘издает звук.’);
      }
}
class Dog extends Animal {
      speak()  {
          console.log(this.name + ‘ лает.’);
       }
}
let d = new Dog(‘Собакен’);
d.speak();

```

## Пошаговое написание кода

**1.** Создаю класс ButtonWidget (кнопка), в котором происходит рендер и открытие/закрытие виджета.

```javascript
class ButtonWidget {
  constructor() {
    this.render();
    this.openWidget();
  }

  render() {
    this.chatOpen = document.createElement('div');
    this.chatOpen.classList.add('button-chat');
    this.chatOpenButton = document.createElement('i');
    this.chatOpenButton.classList.add('fal');
    this.chatOpenButton.classList.add('fa-comment');
    this.chatOpen.prepend(this.chatOpenButton);
    document.body.prepend(this.chatOpen);
  }

  openWidget() {
    this.chatOpen.addEventListener('click', this.openClose.bind(this))
  }

  openClose() {
    buttonClick++;
    if (buttonClick % 2 === 0) {
      this.chatOpenButton.classList.remove('fas')
      this.chatOpenButton.classList.remove('fa-comment-slash');
      this.chatOpenButton.classList.add('fal');
      this.chatOpenButton.classList.add('fa-comment');
    } else {
      this.chatOpenButton.classList.remove('fa-comment')
      this.chatOpenButton.classList.remove('fal');
      this.chatOpenButton.classList.add('fas');
      this.chatOpenButton.classList.add('fa-comment-slash');
    }
  }
}


```

В методе openClose() происходит подсчет кликов, и на каждом втором открытии менются классы у виджета, чтобы поменять цвета. 

**2.** Далее создаю класс Message, в котором идет полная отрисовка самого чата.

```javascript
class Message {
  constructor() {
    this.bgColor = '#FFF';
    this.color = '#000';
  }
  render() {
    this.forma = document.createElement('div');
    this.forma.classList.add('wrapper');
    this.forma.id = 'wrapper';
    document.body.prepend(this.forma);

    this.nameOfChat = document.createElement('div');
    this.nameOfChat.classList.add('name-of-chat');
    this.nameOfChat.textContent = 'Чат';
    this.forma.append(this.nameOfChat);

    this.chatBox = document.createElement('div');
    this.chatBox.id = 'chatbox';
    //извлекаем из localStorage данные и помещаем их в chatBox
    this.contentForChat = localStorage.getItem('contentOfTheBox');
    this.chatBox.innerHTML = this.contentForChat;
    this.chatBox.style.background = this.bgColor;
    this.chatBox.style.color = this.color;
    this.forma.append(this.chatBox);

    this.formCreate = document.createElement('form');
    this.formCreate.name = 'message';
    this.formCreate.action = '';
    this.forma.append(this.formCreate);

    this.inputWrite = document.createElement('input');
    this.inputWrite.name = 'usermsg';
    this.inputWrite.type = 'text';
    this.inputWrite.placeholder = 'Напишите нам';
    this.inputWrite.id = 'usermsg';
    this.inputWrite.size = 33;
    this.formCreate.append(this.inputWrite);

    this.inputButton = document.createElement('i');
    this.inputButton.name = 'submitmsg';
    this.inputButton.type = 'button';
    this.inputButton.id = 'submitmsg';
    this.inputButton.classList.add('fal');
    this.inputButton.classList.add('fa-envelope');
    this.formCreate.append(this.inputButton);
  }

```
Создаю метод postMsg(resolve), который отрабатывает после промиса в sendPromise. В postMsg прибавляю в чат значение resolve и помещаю его в localStorage для дальнейшего использования.

```javascript
postMsg(resolve) {
    document.getElementById('chatbox').innerHTML += resolve + "<br>";
    let contentBox = document.getElementById('chatbox').innerHTML;
    localStorage.setItem('contentOfTheBox', contentBox);
  }
```
В sendPromise(msg) я создаю искусственную задержку с помощью setTimeout.

```javascript
sendPromise(msg) {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(msg);
      }, 2000)
    })
  }
```
В методе sendMsg() я беру значение ‘usermsg’ (значение из инпута), помещаю это значение в sendPromise, которая в дальнейшем передает значение в postMsg. Происходит добавление нового поста к уже имеющимся сообщениям. И очищение инпута.

```javascript
sendMsg() {
    this.message = document.getElementById('usermsg').value;
    this.sendPromise(this.message).then(this.postMsg);

    document.getElementById('usermsg').value = '';
  }
```
В методе endSendMsg() происходит прослушивание события на кнопку отправить 
```javascript
endSendMsg() {
    this.sendBtn = document.getElementById('submitmsg');
    this.sendBtn.addEventListener('click', this.sendMsg.bind(this));
  }
```

**3.** Далее создаю класс OtherMessage, который наследуется от Message,  но изменяю цвета в конструкторе.

```javascript
class OtherMessage extends Message {
  constructor() {
    super();
    this.bgColor = '#959595';
    this.color = '#fff';
  }
} 
```

**4.** Создаю счетчик который при каждом первом клике открывает/закрывает окно чата, и каждое первое открытие стандартные цвета, каждое второе – инверсия.

```javascript
let currentCount = 0;
let countOpen = 0;

let chatOpen = document.querySelector('.button-chat');
chatOpen.addEventListener('click', function () {
  currentCount++;
  if (currentCount % 2 === 1) {
    countOpen++;
    let widget;
    if (countOpen % 2 === 0) {
      widget = new OtherMessage();
    } else {
      widget = new Message();
    }
    widget.render();
    widget.endSendMsg();
  } else {
    let form = document.querySelector('.wrapper');
    form.remove();
  }
});
```