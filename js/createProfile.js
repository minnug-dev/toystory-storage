// 이미지 업로드
const fileInput = document.querySelector('.upload-file .input-file');
const deleteBtn = document.querySelector('.upload-file .btn-cancel');

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

// 폼 입력 제출
const newForm = document.querySelector('#newForm');

class View {
  constructor (indexNum, nicknameStr, kindStr,traitStr) {
    this.index = indexNum;
    this.Nickname = nicknameStr;
    this.Kind= kindStr;
    this.Trait = traitStr;
  }

  set Nickname(value) {
    if(value.length === 0) throw new Error("이름을 입력해주세요.");
    this.nickname = value;
  }

  set Kind(value) {
    if(value.length === 0) throw new Error("종류를 입력해주세요.");
    this.kind = value;
  }

  set Trait(value) {
    if(value.length === 0) throw new Error("특징을 입력해주세요.");
    this.trait = value;
  }
}

const submitHandler = (e) => {
  e.preventDefault();
  const nickname = e.target.nickname.value;
  const kind = e.target.kind.value;
  const trait = e.target.trait.value;

  try {
    // views 가져오기
    const viewsObj = JSON.parse(localStorage.getItem('views'));

    // 객체 추가
    const index = viewsObj.length;
    const instance = new View(index, nickname, kind, trait);
    viewsObj.push(instance);

    // views 저장
    const viewsStr = JSON.stringify(viewsObj);
    localStorage.setItem('views', viewsStr);
    location.href = '/page/view-profile.html?index=' + index;
  } catch (e) {
    // 예외 발생시 메시지 출력
    alert(e.message);
    console.error(e);
  }
};

newForm.addEventListener("submit", submitHandler);

