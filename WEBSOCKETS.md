Задания по теме «Веб-сокеты» <https://kodaktor.ru/g/websockets_lab> 

Код программы:
```HTML
<!DOCTYPE html>
<html>
 <head>
  <title>Chat Form</title>
   <meta charset="utf-8">
   <style>
     * {
       font-family:sans-serif;
     } 
     ul {
       list-style: none;
     }
     span {
       position:fixed; 
       right:20px; 
       top:10px;
       border:double; 
       padding: 15px; 
       border-radius:20px;
     }
     
   </style>
 </head>
 <body>
    <h1>Содержимое чата:</h1>
    <ul></ul>
    <span>
      <h2>Введите реплику:</h2>
      <input id="mess">
      <button id="btn">Написать!</button>
      <br><br>
      <input id="img" type="file" name="photo" accept="image/*,image/jpeg">
   </span>
   
   

   <script>{
     const URL = 'ws://3333.kodaktor.ru';
     let socket = new WebSocket(URL);
     
     socket.onopen = () => {
       let listItem = `<li style="font-size: 14px; color: #555; margin: 10px 5px;">Новый пользователь присоеденился к чату</li>`;
       
       document.querySelector("ul").insertAdjacentHTML("beforeend", listItem);
       console.log('connected');
     };
  
     socket.onclose = () => {
       let listItem = `<li style="font-size: 14px; color: #555; margin: 10px 5px;">Пользователь покинул чат</li>`;
       
       document.querySelector("ul").insertAdjacentHTML("beforeend", listItem);
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
      
		fr.onload = function(e) {
			let li = `<li><img style="max-width: 200px; height: auto; margin: 10px 0;" src="${ e.target.result }"/></li>`;
            
		document.querySelector("ul").insertAdjacentHTML('beforeend', li);
		document.querySelector('#img').value = '';
    };
  
    fr.readAsDataURL(files[0]);
  }  
    
     document.getElementById('img').addEventListener('change', showFile, false);                
}
</script>
 </body>
</html>
```

Код сервера находится по адресу <https://kodaktor.ru/3333.vm>:

Результат:
![](https://github.com/AllerGyn/WebSolutionsLabs2/blob/master/Images/LabSessionScreen.JPG)

Ссылка на форк: <https://kodaktor.ru/ws_2ed4b>
