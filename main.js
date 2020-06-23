const postsContainer = document.getElementById('posts-container');
const loader = document.querySelector('.loader');
const filter = document.getElementById('filter');

let limit = 5;
let page = 1;
//fetch post from jsonplaceholder api
async function getPost(){
    const res = await fetch(`https://jsonplaceholder.typicode.com/posts?_limit=${limit}&_page=${page}`);
    const data = await res.json();

    return data;
}

//show post inside DOM
async function showPost(){
    const posts = await getPost();

    posts.forEach(post => {
        const postEl = document.createElement('div');
        postEl.classList.add('post');
        postEl.innerHTML = `
      <div class="number">${post.id}</div>
      <div class="post-info">
        <h2 class="post-title">${post.title}</h2>
        <p class="post-body">${post.body}</p>
      </div>
    `;
        postsContainer.appendChild(postEl);
    });

}

//show loader and fetch more post from api
function showLoading(){
    loader.classList.add('show');

    setTimeout(() => {
    loader.classList.remove('show');

    setTimeout(() => {
        page++;
        showPost();
    }, 3000);
    }, 1000);
}
// filterPosts
function filterPosts(e){
    const term = e.target.value.toUpperCase();
    const posts = document.querySelectorAll('.post');

    posts.forEach(post => {
        const title = document.querySelector('.post-title').innerHTML.toUpperCase();
        const body = document.querySelector('.post-body').innerHTML.toUpperCase();

        if(title.indexOf(term) > -1 || body.indexOf(term) > -1){
            post.style.display = 'flex';
        } else {
            post.style.display = 'none';
        }
    });
}
//show initial posts
showPost();

//evet listener
window.addEventListener('scroll', () => {
    const {scrollTop, scrollHeight, clientHeight} = document.documentElement;

    if(scrollTop + clientHeight >= scrollHeight - 5){
        showLoading();
    } 
});

filter.addEventListener('input', filterPosts);