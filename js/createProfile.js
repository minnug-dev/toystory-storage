// 이미지 업로드 미리보기
const previewImg = document.querySelector('#viewImg');
const deleteImgBtn = document.querySelector('.upload-file .btn-cancel');

const fileInput = document.querySelector('#fileInput');
fileInput.addEventListener('change', () => {
  const fileReader = new FileReader();
  fileReader.onload = ({ target }) => {
    deleteImgBtn.classList.add('is-active');
    const imageDataURL = target.result;
    previewImg.src = imageDataURL;
  };
  fileReader.readAsDataURL(fileInput.files[0]);
});
// 업로드한 이미지 삭제
deleteImgBtn.addEventListener('click', () => {
  deleteImgBtn.classList.remove('is-active');
  previewImg.src = '../assets/images/no_image.jpg';
  fileInput.value = '';
});


// 프로필 폼 입력 제출
const newForm = document.querySelector('#newForm');

class View {
  constructor (indexNum, viewImgStr, nicknameStr, kindStr,traitStr) {
    this.index = indexNum;
    this.ViewImg = viewImgStr;
    this.Nickname = nicknameStr;
    this.Kind= kindStr;
    this.Trait = traitStr;
  }

  set Nickname(value) {
    if(value.length === 0) throw new Error('✍ Please enter the Name.');
    this.nickname = value;
  }

  set Kind(value) {
    if(value.length === 0) throw new Error('✍ Please enter the Type.');
    this.kind = value;
  }

  set Trait(value) {
    if(value.length === 0) throw new Error('✍ Please enter the Trait.');
    this.trait = value;
  }
}

const submitHandler = (e) => {
  e.preventDefault();
  const viewImg = e.target.viewImg.src;
  const nickname = e.target.nickname.value;
  const kind = e.target.kind.value;
  const trait = e.target.trait.value;

  try {
    const viewsObj = JSON.parse(localStorage.getItem('views'));

    const index = viewsObj.length;
    const instance = new View(index, viewImg, nickname, kind, trait);
    viewsObj.push(instance);

    const viewsStr = JSON.stringify(viewsObj);
    localStorage.setItem('views', viewsStr);
    location.href = '/page/view-profile.html?index=' + index;

    alert("💛 Successfully added New Profile.");
    location.href = '/';
  } catch (e) {
    alert(e.message);
    console.error(e);
  }
};

newForm.addEventListener('submit', submitHandler);
