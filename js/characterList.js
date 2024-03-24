// 로딩 애니메이션
const loading = document.querySelector('.loading-wrap');
window.addEventListener('load', () => {
  setTimeout(() => {
    loading.style.opacity = '0';
    loading.style.visibility = 'hidden';
  }, 600)
});


// 새로운 프로필 추가 시 메인 화면에 보여주기
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
        <img src="${item.ViewImg}" alt="image" id="viewImg">
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
        view ${item.nickname}&rsquo;<span class="text-small">s</span>
        Profile
      </a>
    </li>
  `;
};

// 메인 화면에 프로필 리스트 보여주기
const characterView = document.querySelector('.character__list');
for (let i = 0; i < viewsObj.length; i++) {
  characterView.innerHTML += template(viewsObj[i]);
}

// 삭제 버튼 클릭 시 선택된 캐릭터 프로필 삭제
const deleteBtn = document.querySelector('#deleteBtn');
deleteBtn.addEventListener('click', () => {
  const deleteIndexes = [];

  const listItems = document.querySelectorAll(".character__list li");
  listItems.forEach(function(item, index) {
    const checkbox = item.closest('li').querySelector('input[type="checkbox"]:checked');
    
    if (checkbox && checkbox.checked) {
        deleteIndexes.push(index);
    }
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


// 프로필 검색
const searchInput = document.querySelector('#searchInput');
const searchBtn = document.querySelector('#searchBtn');

function searchProfile() {
  const searchTerm = searchInput.value.trim().toLowerCase();
  const filterViews = viewsObj.filter(item => {
    return item.nickname.toLowerCase().includes(searchTerm);
  });

  profileView(filterViews);
}

searchBtn.addEventListener('click', (e) => {
  e.preventDefault();
  searchProfile();
});

searchInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    e.preventDefault();
    searchProfile();
  }
});

function profileView(items) {
  characterView.innerHTML = '';

  const searchRender = items || viewsObj;
  
  searchRender.forEach(item => {
    characterView.innerHTML += template(item);
  });
}

