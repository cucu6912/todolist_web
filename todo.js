// 할 일 추가 버튼과 입력 필드 요소 가져오기
const addBtn = document.querySelector('#addBtn');
const todoInput = document.querySelector('#todoInput');
const deleteAllBtn = document.querySelector('#deleteAllBtn'); // ID 수정
const savedTodoList = JSON.parse(localStorage.getItem('saved-items'));

// 전체 삭제 버튼에 이벤트 리스너 추가
deleteAllBtn.addEventListener('click', deletAll);

// 엔터키 입력 시 할 일 추가
todoInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' && todoInput.value !== '') {
        createTodo();
    }
});

// 버튼 클릭 시 할 일 추가
addBtn.addEventListener('click', () => {
    if (todoInput.value !== '') {
        createTodo();
    }
});

// 할 일 추가 함수 정의
function createTodo(strangeData) {
    let todoContets = todoInput.value;
    if (strangeData ) {
        todoContets = strangeData.contents;
    }

    

    const todoList = document.querySelector('#todoList');
    const newLi = document.createElement('li');
    const newBtn = document.createElement('button');
    const newSpan = document.createElement('span');

    newLi.appendChild(newBtn);
    newLi.appendChild(newSpan);

    newSpan.textContent = todoContets;
    todoList.appendChild(newLi);

    todoInput.value = '';
	
    newBtn.addEventListener('click', () => {
        newLi.classList.toggle('complete');

        saveItemsFn();
    });

    newLi.addEventListener('dblclick', () => {
        newLi.remove();

        saveItemsFn();
    });
    
    if (strangeData && strangeData.complete === true) {
        newLi.classList.add('complete')
    }

    saveItemsFn();
}

// 전체 삭제 함수 정의
function deletAll() {
    const liList = document.querySelectorAll('#todoList li');
    for ( let i = 0; i < liList.length; i++){
        liList[i].remove();
    }
    saveItemsFn();
}

function saveItemsFn () {
    const saveItems = [];
    for (let i = 0; i < todoList.children.length; i++) {
        const todoObj = {
            contents : todoList.children[i].querySelector('span').textContent,
            complete : todoList.children[i].classList.contains('complete')
        }
        saveItems.push(todoObj);
    }

    if (saveItems.length === 0) {
        localStorage.removeItem('saved-items')
    } else{
        localStorage.setItem('saved-items', JSON.stringify(saveItems)); // localStorage 추가
    }
    
}



if (savedTodoList) {
    for (let i = 0; i < savedTodoList.length; i++) {
        createTodo(savedTodoList[i]);
    }
}