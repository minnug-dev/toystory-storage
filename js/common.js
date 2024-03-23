// 현재 연도 반영
const currentYear = document.querySelector('.current-year');
currentYear.textContent = new Date().getFullYear();

// 이미지 업로드 및 미리보기
const previewImg = document.querySelector('#viewImg');
const deleteImgBtn = document.querySelector('.upload-file .btn-cancel');
const storedImg = localStorage.getItem('profileImage');

if (storedImg) {
  previewImg.src = storedImg;
  deleteImgBtn.classList.add('is-active');
}

const fileInput = document.querySelector('#file');
fileInput.addEventListener('change', () => {
  const fileReader = new FileReader();
  fileReader.onload = ({ target }) => {
    previewImg.src = target.result;
    deleteImgBtn.classList.add('is-active');

    localStorage.setItem('profileImage', target.result);
  };
  fileReader.readAsDataURL(fileInput.files[0]);
});

// 업로드 된 이미지 삭제
deleteImgBtn.addEventListener('click', () => {
  previewImg.src = '../assets/images/no_image.jpg';
  fileInput.value = '';
  deleteImgBtn.classList.remove('is-active');

  localStorage.removeItem('profileImage');
});

const resetImage = () => {
  const previewImgs = document.querySelectorAll('.viewImg');
  previewImgs.forEach(img => {
    img.src = '../assets/images/no_image.jpg';
  });
  deleteImgBtn.style.display = 'none';

  localStorage.removeItem('profileImage');
};

const createBtn = document.querySelector('#createBtn');
if (createBtn) {
  createBtn.addEventListener('click', resetImage);
}
