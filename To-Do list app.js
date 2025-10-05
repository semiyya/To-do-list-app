
    // Load from localStorage or empty array
    let todos = JSON.parse(localStorage.getItem("todos")) || [];

    function saveTodos() {
      localStorage.setItem("todos", JSON.stringify(todos));
    }

    function addTodo() {
      let input = document.getElementById("inptask");
      let task = input.value.trim();
      if (task == "") {
        alert("please enter a task")
      }
        todos.push({ text: task, completed: false });
        saveTodos();//localStorage.setItem("todos", JSON.stringify(todos));
        input.value = "";
        displayTodos();
      
    }
    function allTaskcompleatd()
    {
       
       const chckboxes=document.querySelectorAll(".task-checkbox");
       let allChecked=Array.from(chckboxes).every(checkbox=>checkbox.checked)
       
        if(allChecked&&chckboxes.length>0)
        {
          chckboxes.forEach(checkbox=>{
          checkbox.parentElement.remove();
           
        
       });
      
    }else{
      alert("All tasks are not compleated yet!");
    }
  }



    function displayTodos() {
      let list = document.getElementById("task-list");
      list.innerHTML = "";

      todos.forEach((todo, index) => {
        let li = document.createElement("li");
        li.style.color="black";

        // Checkbox for completed
        let checkbox = document.createElement("input");
        checkbox.className="task-checkbox";
        checkbox.type = "checkbox";
        checkbox.style.transform="scale(1.5)";
         checkbox.style.marginRight="10px";

        checkbox.checked = todo.completed;
        checkbox.onchange = () => checkComplete(index);

        // Task text
        let span = document.createElement("span");
        span.textContent = todo.text;
        if (todo.completed) {
          span.style.textDecoration="line-through";
        }

        // Edit button
        let editBtn = document.createElement("button");
        editBtn.textContent = "🖍";
        editBtn.style.marginLeft="10px"
        editBtn.style.marginTop="10px"
        editBtn.style.borderRadius="8px"
        editBtn.style.border="1px solid black"

        editBtn.onclick = () => editTodo(index, li, span);

        // Delete button
        let delBtn = document.createElement("button");
        delBtn.textContent="🗑";
        delBtn.style.borderRadius="8px"
        delBtn.style.marginLeft="10px"
        delBtn.style.border="1px solid black"
        delBtn.onclick = () => deleteTodo(index);
        li.appendChild(checkbox);
        li.appendChild(span);
        li.appendChild(editBtn);
        li.appendChild(delBtn);
        list.appendChild(li);
      });
    }

    function editTodo(index, li, span) {
      let input = document.createElement("input");
      input.type = "text";
      input.value = todos[index].text;
      input.className = "editInput";

      let saveBtn = document.createElement("button");
      saveBtn.textContent = "Save";
      saveBtn.style.backgroundColor="green";
      saveBtn.style.marginLeft="10px"
      saveBtn.style.borderRadius="10px"
      saveBtn.style.border="1px solid black"
      saveBtn.onclick = () => {
        let newTask = input.value.trim();
        if (newTask !== "") {
          todos[index].text = newTask;
          saveTodos();
          displayTodos();
        }
      };

      let cancelBtn = document.createElement("button");
      cancelBtn.textContent = "❌";
      cancelBtn.style.borderRadius="10px"
      cancelBtn.style.marginLeft="10px"
      cancelBtn.style.border="1px solid black"
      cancelBtn.onclick = () => displayTodos();

      li.innerHTML = "";
      li.appendChild(input);
      li.appendChild(saveBtn);
      li.appendChild(cancelBtn);
      input.focus();
     
    }

    function deleteTodo(index) {
      todos.splice(index, 1);
      saveTodos();
      displayTodos();
    }

    function checkComplete(index) {
      todos[index].completed = !  todos[index].completed;
      saveTodos();
      displayTodos();
    }

    
    displayTodos();
    
  
