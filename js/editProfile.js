// 해당 프로필 수정하기
const editForm = document.querySelector("#editForm");

const currentIndex = location.search;
const index = location.search.split("=")[1];

const viewsObj = JSON.parse(localStorage.getItem("views"));
const view = viewsObj[index];

// 입력 필드 가져오기
const nicknameInput = document.querySelector("#nickname");
const kindInput = document.querySelector("#kind");
const traitInput = document.querySelector("#trait");

// 폼 초기화
nicknameInput.value = view.nickname;
kindInput.value = view.kind;
traitInput.value = view.trait;

const isEmpty = (nickname, kind, trait) => {
  if (nickname.length === 0) throw new Error("이름을 입력해주세요.");
  if (kind.length === 0) throw new Error("종류를 입력해주세요.");
  if (trait.length === 0) throw new Error("특징을 입력해주세요.");
}

const editHanler = (e) => {
  e.preventDefault();
  const nickname = e.target.nickname.value;
  const kind = e.target.kind.value;
  const trait = e.target.trait.value;

  try {
    isEmpty(nickname, kind, trait);

    // 수정한 값 [프로필 상세]로 넘기기
    view.nickname = nickname;
    view.kind = kind;
    view.trait = trait;

    const viewsStr = JSON.stringify(viewsObj);
    localStorage.setItem("views", viewsStr);
    location.href = "/page/view-profile.html" + currentIndex;

  } catch (e) {
    alert(e.message);
    console.error(e);
  }
  alert("수정완료 되었습니다.")
};

editForm.addEventListener("submit", editHanler);