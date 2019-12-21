'use strict';

/** テーブル */
const tbody = document.getElementById('tbody');

const createRow = (
  textId, text, textUpdatedAt, userId, userName, userBio, userUpdatedAt
) => {
  let s = '';
  s += '<tr>';
  s += '<td>' + textId + '</td>';
  s += '<td>' + text + '</td>';
  s += '<td><div class="css-fukidashi">';
  s += '<p class="user-name">' + userName + '</p>';
  s += '<p class="fukidashi">';
  s += 'id: ' + userId + '<br>';
  s += 'bio: ' + userBio + '<br>';
  s += 'updated_at: ' + userUpdatedAt;
  s += '</p>';
  s += '</div></td>';
  s += '<td>' + textUpdatedAt + '</td>';
  s += '</tr>';
  return s;
};

const updateTable = () => {
  const rawStr = createRow(
    1234,
    'jsから書いた文章',
    '2019/12/25',
    4321,
    'JS太郎',
    'JS太郎です',
    '2019/12/23'
  );
  tbody.innerHTML = rawStr;
};

// GETリクエストのJSONを返却する
const apiGetPromise = () => {
  if (localStorage.token) {
    /* tokenがある */
    return new Promise(resolve => {
      fetch('https://teachapi.herokuapp.com/posts', {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer: ' + localStorage.token
        }
      }).then(response => {
        return response.json();
      }).then(json => {
        alert(json);
      });
    });
  } else {
    /* tokenがない */
    return null;
  }
};

const signup = () => {
  alert('signup');
};

const post = () => {
  localStorage.token = 'l4hKn0Wcp5sNBgQc9MZL7Qtt';
  alert('post');
  apiGetPromise();
};

updateTable();
