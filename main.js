'use strict';

const tbody = document.getElementById('tbody');
const name = document.getElementById('name');
const bio = document.getElementById('bio');
const text = document.getElementById('text');

const urlGet = 'https://teachapi.glitch.me/api/v1/get';
const urlPost = 'https://teachapi.glitch.me/api/v1/post';
const urlSignUp = 'https://teachapi.glitch.me/api/v1/sign_up';

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

const dateFormat = source => {
  return new Date(source).toLocaleString({ timeZone: 'Asia/Tokyo' });
};

const update = () => {
  if (localStorage.token) {
    get().then(json => {
      const obj = JSON.parse(json);
      const len = obj.length;
      tbody.innerHTML = '';
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

const signup = () => {
  fetch(urlSignUp, {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      sign_up_user_params: {
        name: name.value,
        bio: bio.value
      }
    })
  })
    .then(response => {
      return response.json();
    })
    .then(json => {
      const obj = JSON.parse(json);
      localStorage.token = obj.token;
      alert(`sign up => ${name.value} : ${bio.value}`);
    });
};

const post = () => {
  fetch(urlPost, {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + localStorage.token
    },
    body: JSON.stringify({
      post_params: {
        text: text.value
      }
    })
  }).then(response => {
    update();
  });
};

update();
