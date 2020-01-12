Задания по теме «Веб-сокеты» <https://kodaktor.ru/g/websockets_lab> 

Код программы:
<pre><code>
   <script>{
     const URL = 'ws://3333.kodaktor.ru';
     let socket = new WebSocket(URL);
     
     socket.onopen = () => {
       let listItem = document.createElement("li");
       listItem.classList.add("newUser");
       listItem.textContent = 'Новый пользователь присоеденился к чату';
       document.querySelector("ul").appendChild(listItem);
       console.log('connected');
     };
  
     socket.onclose = () => {
       let listItem = document.createElement("li");
       listItem.classList.add("newUser");
       listItem.textContent = 'Пользователь покинул чат';
       document.querySelector("ul").appendChild(listItem);
       console.log('closed');
     };
     
     socket.onmessage = event => {
       let listItem = document.createElement("li");
       listItem.textContent = event.data;
       document.querySelector("ul").appendChild(listItem);
       document.querySelector("#mess").value = '';
     };
    
  
       document.querySelector("#mess").addEventListener("keydown", event => {
      if (event.keyCode === 13) {
        socket.send( document.querySelector("#mess").value  );
        return;
      }
    });
       
     
     document.querySelector("#btn").addEventListener("click", e => {
    socket.send( document.querySelector("#mess").value  );
     });
     
  
     function showFile(e) {
    	let files = e.target.files;
      	let fr = new FileReader();
      	fr.onload = (function(theFile) {
        return function(e) {
          let li = document.createElement('li');
          li.innerHTML = `<img class="chatImg" src="${e.target.result}" />`;
          document.querySelector("ul").appendChild(li);
          
          };
      })(files[0]);
    
      fr.readAsDataURL(files[0]);
    }
    
     document.getElementById('img').addEventListener('change', showFile, false);                
}
</script>
 </body>
</html>
</code></pre>

Код по адресу <https://kodaktor.ru/3333.vm>:
<pre><code>
const s = require('ws').Server;
const clients = [];
                 
const base = require('path').dirname(process.argv[1]);
const { wsend } = require(base + '/quit.json');                 
                 
(new s({
  port: 3333
}))
 .on('connection', ws => {             
                 
   let id = Math.random();
   clients[id] = ws;
   ws
    .on('message', message => {
      Object.values(clients).forEach(client => client.send(message));
      if (message === wsend) {
        process.nextTick(() => {throw new Error('Quitting!');} );
      }
   })
    .on('close', () => {
      delete clients[id];
   });
});
</code></pre>

Результат:
![](https://github.com/AllerGyn/WebSolutionsLabs2/blob/master/Images/LabSessionScreen.JPG)

Ссылка на форк: <https://kodaktor.ru/ws_7e76c>
