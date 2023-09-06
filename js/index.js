//=======================Запрос и вывод на страницу постов========================
const URL = 'http://localhost:3030/posts'
const postsList = document.getElementById('postsList')

function getPosts() {
    axios({
        method: 'get',
        url: URL,
    })
    .then(response => {
        const posts = response.data
        posts.forEach(post => {
            postsList.innerHTML += `<li>
                                        <h4>${post.title}</h4>
                                        <p>${post.body}</p>
                                        <button data-btn_id=${post.id} class="btn">Удалить</button>
                                    </li>`
        });
        deletePost()
    })
}
getPosts()
//================================================================================


//=========================Удаление постов=======================================
function deletePost() {
    const btn = document.querySelectorAll('.btn')
    btn.forEach(el => {
        el.addEventListener('click', function(event) {
            event.preventDefault()
            if (event.target.dataset.btn_id) {
                axios.delete(URL + `/${event.target.dataset.btn_id}`)
                    .then(response => alert(`Успешно, статус ${response.status}`))
                    .catch(error => alert(`Ошибка, статус ${error}`))
            }
        })
    })
}
//================================================================================


//==============================Создание постов===================================
const form = document.forms.form
    function createPost(event) {
        event.preventDefault()

        const {title, body} = form
        const values = {
            title: title.value,
            body: body.value
        }
        axios.post(URL, values)
            .then(response => alert(`Успешно, статус ${response.status}`))
            .catch(error => alert(`Ошибка, статус ${error}`))
    }
form.addEventListener('submit', createPost)
//================================================================================
