// 해당 프로필 클릭 시 프로필 상세로 이동
const viewsStr = localStorage.getItem('views');
const viewsObj = JSON.parse(viewsStr);

const currentIndex = location.search;
const index = currentIndex.split('=')[1];
const view = viewsObj[index];

// 해당 프로필 상세 값 출력
const viewForm = document.querySelectorAll('#viewForm input');
for (let i = 0; i < viewForm.length; i++) {
  const inputId = viewForm[i].id;
  viewForm[i].value = view[inputId];
}

// 해당 프로필 수정으로 이동
const editBtn = document.querySelector('.btn-edit');

const editBtnHandler = (e) => {
  location = '/page/edit-profile.html' + currentIndex;
};

editBtn.addEventListener('click', editBtnHandler);