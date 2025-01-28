# Demo Video

https://www.youtube.com/watch?v=RCkuN6HfxdY

![image](https://github.com/user-attachments/assets/325ad792-ea36-4cd9-93e2-08949e04a166)

# 概要

前回の会議から時間が空いてしまうと、議題内容や課されていた宿題を忘れてしまう場合がある。

それを防ぐため、生成AIを活用し、議事録の要約や、課されていた宿題(者)を教えてくれる業務改善アプリを作成。


# 動作環境

<ul>
  <li>TypeScript: 5.3.3 </li>
  <li>Python: 3.11.9 </li>
  <li>React: 18.3.1 </li>
  <li>Vite: 6.0.5 </li>
  <li>openai: 1.52.1</li>
  <li>langchain: 0.3.4 </li>
  <li>langchain-core: 0.3.12</li>
  <li>langchain-openai: 0.2.3</li>
  <li>langsmith: 0.1.137</li>
  <li>fast-api: 0.115.3</li>
</ul>

# その他スクリーンショット

## 初期の画面

![image](https://github.com/user-attachments/assets/325ad792-ea36-4cd9-93e2-08949e04a166)

要約をするだけであれば、Chat GPTなどにテキストをコピペすれば済む話ではあるが、その作業が自体が非常に煩わしい。

そこで、可能な限りユーザーの心理的・作業的な負荷を減らすため、ボタン1つを押せば同様の結果が得られるというところがポイント。


## 要約の出力中
<img width="1398" alt="image" src="https://github.com/user-attachments/assets/2936a96c-8513-4989-a559-4e50f913ebcb" />

UX改善のため、出力は随時ストリーミングされる。


## 完了
<img width="1398" alt="image" src="https://github.com/user-attachments/assets/d3221965-62b8-49e1-9ba5-d93019b6b795" />

具体的なアクションが提示されることで、仮に着手できていない宿題があった場合はリマインダとして機能をする。

今後はより深掘りをするためのChat Bot機能を追加予定。
