const fileInput = document.querySelector('.upload-file .input-file');
const deleteBtn = document.querySelector('.upload-file .btn-cancel');

// 이미지 업로드
fileInput.addEventListener('change', () => {
  const fileReader = new FileReader();
  fileReader.addEventListener('load', () => {
    const uploadImg = fileReader.result;
    document.querySelector('.img-view').style.backgroundImage = `url(${uploadImg})`;
    deleteBtn.style.display = 'block';
  });
  fileReader.readAsDataURL(fileInput.files[0]);
});

// 이미지 삭제
deleteBtn.addEventListener('click', () => {
  document.querySelector('.img-view').style.backgroundImage = '';
  fileInput.value = '';
  deleteBtn.style.display = 'none';
});
