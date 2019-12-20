# call-teach-api

講師-バッチ 19:43
@Ren さんが土日の課題欲しいぜって言われたので、作りました
でも、これAjaxでAPI呼べるとこまで行ってないとできないと思います。
難しめです！
ユーザー登録、タイムライン投稿、タイムライン一覧の3つの機能をもつAPIを作ったので、それぞれアクセスして見た目に反映させてみてください
[ユーザー登録 API]
POST https://teachapi.herokuapp.com/sign_up
body parameterで
```
{
	"sign_up_user_params": {
		"name": "名前を入れてね",
		"bio": "自己紹介を入れてね"
	}
}
```
レスポンスはユーザー情報です。
で、ユーザー情報の中にtokenってやつがあります。
これを、Cookieに保存してください。
[タイムライン作成 API]
POST https://teachapi.herokuapp.com/posts
body parameterで
```
{
	{
	"post_params": {
		"text": "テキストを入れてね"
	}
}
```
Headerに
```
Content-Type: application/json
Authorization: Bearer あなたがsign_upで受け取ったtoken
```
レスポンスはタイムライン情報です。
header情報がないと受け取れません。これ難しいです
[タイムライン取得 API]
GET https://teachapi.herokuapp.com/posts
 parameterなし
Headerに
```
Content-Type: application/json
Authorization: Bearer あなたがsign_upで受け取ったtoken
```
@here