// 프로필 수정
const editForm = document.querySelector('#editForm');
const currentIndex = location.search;
const index = location.search.split('=')[1];
const viewsObj = JSON.parse(localStorage.getItem('views'));
const view = viewsObj[index];
const nicknameInput = document.querySelector('#nickname');
const kindInput = document.querySelector('#kind');
const traitInput = document.querySelector('#trait');

// 입력 폼 초기화
nicknameInput.value = view.nickname;
kindInput.value = view.kind;
traitInput.value = view.trait;

const isEmpty = (nickname, kind, trait) => {
  if (nickname.length === 0) throw new Error('✍ Please enter character name.');
  if (kind.length === 0) throw new Error('✍ Please enter character kind.');
  if (trait.length === 0) throw new Error('✍ Please enter character trait.');
}

const editHanler = (e) => {
  e.preventDefault();
  const nickname = e.target.nickname.value;
  const kind = e.target.kind.value;
  const trait = e.target.trait.value;

  try {
    isEmpty(nickname, kind, trait);

    // 수정한 값 프로필 상세로 넘기기
    view.nickname = nickname;
    view.kind = kind;
    view.trait = trait;

    const viewsStr = JSON.stringify(viewsObj);
    localStorage.setItem('views', viewsStr);
    location.href = '/page/view-profile.html' + currentIndex;

  } catch (e) {
    alert(e.message);
    console.error(e);
  }
  alert('✨ Edit Complete ✨')
};

editForm.addEventListener('submit', editHanler);

// 이미지 업로드 미리보기
const previewImg = document.querySelector('#viewImg');
const deleteImgBtn = document.querySelector('.upload-file .btn-cancel');

const fileInput = document.querySelector('#file');
fileInput.addEventListener('change', () => {
  const fileReader = new FileReader();
  fileReader.onload = ({ target }) => {
    previewImg.src = target.result;
    deleteImgBtn.classList.add('is-active');
  };
  fileReader.readAsDataURL(fileInput.files[0]);
});

// 업로드한 이미지 삭제
deleteImgBtn.addEventListener('click', () => {
  previewImg.src = '../assets/images/no_image.jpg';
  fileInput.value = '';
  deleteImgBtn.classList.remove('is-active');
});