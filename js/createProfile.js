// 프로필 폼 입력 제출
const newForm = document.querySelector('#newForm');

class View {
  constructor (indexNum, nicknameStr, kindStr,traitStr) {
    this.index = indexNum;
    this.Nickname = nicknameStr;
    this.Kind= kindStr;
    this.Trait = traitStr;
  }

  set Nickname(value) {
    if(value.length === 0) throw new Error('Please enter character name.');
    this.nickname = value;
  }

  set Kind(value) {
    if(value.length === 0) throw new Error('Please enter character kind.');
    this.kind = value;
  }

  set Trait(value) {
    if(value.length === 0) throw new Error('Please enter character trait.');
    this.trait = value;
  }
}

const submitHandler = (e) => {
  e.preventDefault();
  const nickname = e.target.nickname.value;
  const kind = e.target.kind.value;
  const trait = e.target.trait.value;

  try {
    const viewsObj = JSON.parse(localStorage.getItem('views'));

    const index = viewsObj.length;
    const instance = new View(index, nickname, kind, trait);
    viewsObj.push(instance);

    const viewsStr = JSON.stringify(viewsObj);
    localStorage.setItem('views', viewsStr);
    location.href = '/page/view-profile.html?index=' + index;
  } catch (e) {
    alert(e.message);
    console.error(e);
  }
};

newForm.addEventListener('submit', submitHandler);