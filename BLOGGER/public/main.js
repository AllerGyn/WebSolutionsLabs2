const $post = document.querySelector('.remove-post');
if ($post) {
  $post.addEventListener('click', e => {
    const id = e.target.dataset.id;
    fetch('/posts/remove/' + id, {
      method: 'delete'
    })
      .then(res => res.json())
      .then(l => {
        window.location = '/';
      });
  });
}
