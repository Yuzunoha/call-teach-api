// [ユーザー登録]
const urlSignUp = 'https://teachapi.herokuapp.com/sign_up';
// [ユーザーログイン]
const urlSignIn = 'https://teachapi.herokuapp.com/sign_in';
// [投稿一覧]
const urlPosts = 'https://teachapi.herokuapp.com/posts';

const sendData = (url, data = {}, queryParam = {}, _method = 'GET') => {
  // クエリパラメタがあるかどうか
  let urlWithQueryParam = url;
  if (Object.keys(queryParam).length) {
    const qs = new URLSearchParams(queryParam);
    urlWithQueryParam = `${url}?${qs}`;
  }
  // fetch実行
  return fetch(urlWithQueryParam, {
    method: _method,
    mode: "cors",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      Authorization: 'Bearer ' + localStorage.token
    },
    body: JSON.stringify(data),
  }).then(response => response.json());
}

// バーチーさんのslackより
const data = {
  "sign_up_user_params": {
    "name": "名前を入れてね",
    "bio": "自己紹介を入れてね",
    "email": "email",
    "password": "password",
    "password_confirmation": "password"
  }
};

/**
 * 登録ボタン押下時の処理
 */
const onButtonClickSignUp = () => {
  // HTMLから値を取得する
  const name = document.getElementById('signUpName').value;

  // 登録APIを呼び出す
  const data = {
    "sign_up_user_params": {
      "name": "名前を入れてね",
      "bio": "自己紹介を入れてね",
      "email": "email",
      "password": "password",
      "password_confirmation": "password"
    }
  };
  sendData(urlSignUp, data).then(result => {
    console.log(result);
  });

}
