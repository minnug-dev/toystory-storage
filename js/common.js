// 현재 연도 반영
const currentYear = document.querySelector('.current-year');
currentYear.textContent = new Date().getFullYear();

// 이미지 업로드 및 미리보기
const previewImg = document.querySelector('#viewImg');
const deleteImgBtn = document.querySelector('.upload-file .btn-cancel');

if (previewImg) {
  // 로컬 스토리지에서 이미지 불러오기
  const storedImg = localStorage.getItem('profileImage');
  if (storedImg) {
    previewImg.src = storedImg;
    deleteImgBtn.classList.add('is-active');
  }

  // 이미지 업로드 및 미리보기
  const fileInput = document.querySelector('#file');
  fileInput.addEventListener('change', () => {
    const fileReader = new FileReader();
    fileReader.onload = ({ target }) => {
      previewImg.src = target.result;
      deleteImgBtn.classList.add('is-active');
      // 로컬 스토리지에 이미지 저장
      localStorage.setItem('profileImage', target.result);
    };
    fileReader.readAsDataURL(fileInput.files[0]);
  });

  // 이미지 삭제
  deleteImgBtn.addEventListener('click', () => {
    previewImg.src = "../assets/images/no_image.jpg";
    fileInput.value = "";
    deleteImgBtn.classList.remove('is-active');
    // 로컬 스토리지에서 이미지 제거
    localStorage.removeItem('profileImage');
  });

  const resetImage = () => {
    const previewImgs = document.querySelectorAll('.viewImg');
    previewImgs.forEach(img => {
      img.src = "../assets/images/no_image.jpg";
    });
    deleteImgBtn.style.display = 'none';
    // 로컬 스토리지에서 이미지 제거
    localStorage.removeItem('profileImage');
  };

  // 새로운 프로필 생성 시 이미지 초기화
  const createBtn = document.querySelector('#createBtn');
  if (createBtn) {
    createBtn.addEventListener('click', resetImage);
  }
}
