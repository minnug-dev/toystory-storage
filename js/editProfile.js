// 해당 프로필 수정하기
const editForm = document.querySelector("#editForm");
const editFormItem = document.querySelectorAll("#editForm input");

const currentIndex = location.search;
const index = location.search.split("=")[1];

const viewsObj = JSON.parse(localStorage.getItem("views"));
const view = viewsObj[index];

for (let i = 0; i < editFormItem.length; i++) {
  const inputEl = editFormItem[i];
  const id = inputEl.name;
  inputEl.value = view[id];
}

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


