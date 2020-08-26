let buttonClick = 0;

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

let buttonWidget = new ButtonWidget();

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


  postMsg(resolve) {
    document.getElementById('chatbox').innerHTML += resolve + "<br>";
    let contentBox = document.getElementById('chatbox').innerHTML;
    localStorage.setItem('contentOfTheBox', contentBox);
  }

  sendPromise(msg) {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(msg);
      }, 2000)
    })
  }

  sendMsg() {
    this.message = document.getElementById('usermsg').value;
    this.sendPromise(this.message).then(this.postMsg);

    document.getElementById('usermsg').value = '';
  }

  endSendMsg() {
    this.sendBtn = document.getElementById('submitmsg');
    this.sendBtn.addEventListener('click', this.sendMsg.bind(this));
  }
}

class RedMessage extends Message {
  constructor() {
    super();
    this.bgColor = '#959595';
    this.color = '#fff';
  }
}

let currentCount = 0;
let countOpen = 0;

let chatOpen = document.querySelector('.button-chat');
chatOpen.addEventListener('click', function () {
  currentCount++;
  if (currentCount % 2 === 1) {
    countOpen++;
    let widget;
    if (countOpen % 2 === 0) {
      widget = new RedMessage();
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



