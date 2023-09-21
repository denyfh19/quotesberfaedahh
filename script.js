document.getElementById('comment-button').addEventListener('click', function() {
  const name = document.getElementById('comment-name').value;
  const comment = document.getElementById('comment-input').value;
  
  if (comment.trim() !== '') {
    addComment(name, comment); // Panggil fungsi untuk menambahkan komentar
    displayComments(); // Tampilkan kembali komentar setelah menambahkan
    document.getElementById('comment-input').value = ''; // Mengosongkan input setelah dikirim
  } else {
    alert('Silakan tulis komentar Anda terlebih dahulu.');
  }
});

function addComment(name, comment) {
  // Kirim data komentar ke Firebase
  var newCommentRef = database.ref('comments').push();
  newCommentRef.set({
    name: name,
    comment: comment
  });
}

function displayComments() {
  const commentSection = document.getElementById('comment-section');
  commentSection.innerHTML = ''; // Bersihkan isi sebelum menampilkan

  // Ambil komentar dari Firebase dan tampilkan
  var commentsRef = database.ref('comments');
  commentsRef.on('child_added', function(data) {
    const commentData = data.val();
    const commentElement = document.createElement('div');
    commentElement.classList.add('comment');

    // Menampilkan foto profil dan nama
    commentElement.innerHTML = `
      <div class="comment-header">
        <img src="${commentData.image || 'default-avatar.jpg'}" alt="Avatar" class="avatar">
        <strong>${commentData.name}</strong>
      </div>
      <p class="comment-text">${commentData.comment}</p>
    `;

    commentSection.appendChild(commentElement);
  });
}

// Panggil fungsi displayComments saat halaman dimuat
window.addEventListener('load', displayComments);
