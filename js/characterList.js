// 새로운 프로필 추가 시 캐릭터 아이템 생성
let viewsStr = localStorage.getItem('views');

if (viewsStr ===  null) {
  const itemListStr = JSON.stringify([]);
  localStorage.setItem('views', itemListStr);
  viewsStr = itemListStr;
}

const viewsObj = JSON.parse(viewsStr);

const template = (item) => {
  return /* html */`
    <li class="character__item">
      <div class="checkbox">
        <label class="label">
          <input type="checkbox"/>
          <span class="checkmark">
            <i class="fa-solid fa-check"></i>
          </span>
        </label>
      </div>

      <div class="img-wrap">
        <img src=${item.image ? item.image : `../assets/images/no_image.jpg`} alt="image" id="viewImg">
      </div>

      <div class="item-info">
        <p class="name">
          ${item.nickname}
        </p>
        <p class="info kind">
          <i class="fa-solid fa-tag"></i>
          ${item.kind}
        </p>
        <p class="info trait">
          <i class="fa-solid fa-star"></i>
          ${item.trait}
        </p>
      </div>

      <a href="/page/view-profile.html?index=${item.index}" class="btn">
        ${item.nickname}&rsquo;<span class="text-small">s</span> 
        Profile
      </a>
    </li>
  `;
};

// 화면에 보여주기
const characterView = document.querySelector(".character__list");
for (let i = 0; i < viewsObj.length; i++) {
  characterView.innerHTML += template(viewsObj[i]);
}

// 삭제 버튼 클릭 시 선택된 캐릭터 프로필 삭제
const deleteBtn = document.querySelector('#deleteBtn');
deleteBtn.addEventListener('click', () => {
  const checkItems = document.querySelectorAll('.character__item input[type="checkbox"]:checked');
  
  const deleteIndexes = [];

  checkItems.forEach(checkbox => {
    const index = parseInt(checkbox.closest('.character__item').dataset.index);
    deleteIndexes.push(index);
  });

  for (let i = deleteIndexes.length - 1; i >= 0; i--) {
    const deleteIndex = deleteIndexes[i];
    viewsObj.splice(deleteIndex, 1);
  }

  for (let i = 0; i < viewsObj.length; i++) {
    viewsObj[i].index = i;
  }

  renderCharacterView();

  localStorage.setItem('views', JSON.stringify(viewsObj));
});

function renderCharacterView() {
  characterView.innerHTML = '';

  viewsObj.forEach(item => {
    characterView.innerHTML += template(item);
  });
}

