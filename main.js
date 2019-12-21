'use strict';

const tbody = document.getElementById('tbody');
const urlGet = 'https://teachapi.glitch.me/api/v1/get';
const urlPost = 'https://teachapi.glitch.me/api/v1/post';
const urlSignUp = 'https://teachapi.glitch.me/api/v1/sign_up';

const createRow = (
  textId,
  text,
  textUpdatedAt,
  userId,
  userName,
  userBio,
  userUpdatedAt
) => {
  let s = '';
  s += '<tr>';
  s += '<td>' + textId + '</td>';
  s += '<td>' + text + '</td>';
  s += '<td><div class="css-fukidashi">';
  s += '<p class="user-name">' + userName + '</p>';
  s += '<p class="fukidashi">';
  s += 'id:' + userId + '<br>';
  s += userUpdatedAt + '<br>';
  s += userBio;
  s += '</p>';
  s += '</div></td>';
  s += '<td>' + textUpdatedAt + '</td>';
  s += '</tr>';
  return s;
};

const updateTable = () => {
  // debug
  const rowStr = createRow(
    1234,
    'jsから書いた文章',
    '2019/12/25',
    4321,
    'JS太郎',
    'JS太郎です',
    '2019/12/23'
  );
  tbody.innerHTML = rowStr;
};

const signup = () => {
  alert('signup');
};

const post = () => {
  alert('post');
};

const get = () => {
  return fetch(urlGet, {
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + localStorage.token
    }
  }).then(response => {
    return response.json();
  });
};

const dateFormat = source => {
  return new Date(source).toLocaleString({ timeZone: 'Asia/Tokyo' });
};

const update = () => {
  // debug
  localStorage.token = 'l4hKn0Wcp5sNBgQc9MZL7Qtt';

  if (localStorage.token) {
    get().then(json => {
      const obj = JSON.parse(json);
      const len = obj.length;
      for (let i = len - 1; 0 <= i; i--) {
        const o = obj[i];
        const row = createRow(
          o.id,
          o.text,
          dateFormat(o.updated_at),
          o.user.id,
          o.user.name,
          o.user.bio,
          dateFormat(o.user.updated_at)
        );
        tbody.innerHTML += row;
      }
    });
  } else {
    /* DO NOTHING */
  }
};

update();
