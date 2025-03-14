import { Incident_Interface } from "../types/Types";

export const incident_data: Incident_Interface[] = [
  {
    id: 1,
    title: "トラブル #1",
    contents:
      "\
          01/12 15:45 山田太郎 【渋谷スタジオ】録音ブースのノイズ混入問題　案件番号 20245\
      サウンドクリエイト株式会社　佐藤花子様\
      表記の件、\
      渋谷スタジオの録音ブースにて、録音中に断続的なノイズが混入する現象が発生しました。\
      過去に以下の類似事例がございました：\
      新宿スタジオ - マイク接続部分の接触不良 - 案件番号 20122\
      六本木スタジオ - オーディオインターフェースの不具合 - 案件番号 20133\
      今回の問題に関して、マイクやインターフェースのチェックは行いましたが、明確な原因が特定できておりません。\
      ノイズが入った音源を添付いたしますのでご確認いただけますでしょうか？\
      渋谷スタジオでの作業スケジュールに影響が出るため、早急なご対応をお願い申し上げます。\
      添付:\
      Shibuya_Noise_Sample.mp3\
      01/13 10:15 ライトワークス株式会社　佐藤花子\
      山田太郎様\
      案件番号 20245 を技術サポートチームに連絡いたしました。\
      01/14 16:30 ライトワークス株式会社　佐藤花子\
      山田太郎様\
      技術サポートチームの田中氏より回答がございました。\
      マイク接続ケーブルとスタジオ内の電源回路を再度確認することを推奨されています。また、\
      問題が再発する場合は録音環境全体を再調査する必要があるかもしれません。\
      ",
    ball: 1,
  },

  {
    id: 2,
    title: "トラブル #2",
    contents:
      "\
          01/14 11:20 サウンドクリエイト株式会社 高橋一郎 【全国ツアー】ライブ音響システムの調整不良 - 問題番号 20256\
      ライトワークス株式会社 田中裕子様\
      表記の件、\
      全国ツアーにおけるライブ音響システムで、ボーカルマイクが一部の楽曲で意図した音量バランスにならない問題が発生しております。\
      類似の事例として以下が挙げられます：\
      東京ドーム - ミキサー設定エラー - 問題番号 20220\
      名古屋ドーム - スピーカー配置の影響 - 問題番号 20232\
      今回の件について、現地スタッフと初期調査を行ったところ、EQ設定に問題がある可能性が示唆されています。\
      添付の音源をお送りいたしますので、ご確認いただけますでしょうか？\
      添付:\
      Live_Audio_Sample.mp3\
      01/15 09:50 ライトワークス株式会社 田中裕子\
      高橋一郎様\
      問題番号 20256 を技術チームに追加で依頼いたしました。\
      01/15 18:00 ライトワークス株式会社 田中裕子\
      高橋一郎様\
      技術チームからの回答です。\
      EQ設定についての調整方法が以下のリンクに記載されていますので、確認していただけますか？\
      https://support.liveaudio.com/EQ-Settings/2023\
      調整後も問題が続く場合は、現地調整用に専任スタッフを派遣する手配を検討します。\
      ",
    ball: 0,
  },

  {
    id: 3,
    title: "トラブル #3",
    contents:
      "\
          01/16 08:30 サウンドクリエイト株式会社 中村涼 【アルバム制作】ミックスダウンの音量バランス調整ミス - 報告番号 20268\
      ライトワークス株式会社 小林美咲様\
      表記の件、\
      アルバム制作中のミックスダウンにおいて、一部楽曲で低音と高音のバランスが崩れているとの指摘を受けました。\
      以前の類似ケース：\
      大阪レコーディング - エフェクトプラグインの設定ミス - 報告番号 20201\
      福岡スタジオ - 音源インポート時のエラー - 報告番号 20215\
      添付ファイルに調整前後の音源を入れておりますので、ご確認いただけますでしょうか？\
      添付:\
      Track_Mix_Before.mp3\
      Track_Mix_After.mp3\
      01/17 10:15 ライトワークス株式会社 小林美咲\
      中村涼様\
      報告番号 20268 を担当のエンジニアに共有しました。\
      01/17 16:45 ライトワークス株式会社 小林美咲\
      中村涼様\
      エンジニアの北村氏より回答がありました。\
      現在使用中のミキシングソフトのバージョンが古い可能性があるため、最新バージョンへのアップデートを推奨されています。\
      また、バランス調整用の新しいプリセットも近日中に提供可能とのことです。\
      ",
    ball: 1,
  },

  {
    id: 4,
    title: "トラブル #4",
    contents:
      "\
          01/18 10:10 サウンドクリエイト株式会社 佐藤健 【新規イベント】照明プログラムの同期ズレ - 問題番号 20279\
      ライトワークス株式会社 吉田優子様\
      表記の件、\
      新規イベントのリハーサルにて、音楽と照明プログラムの同期ズレが発生しました。\
      同様の事例として以下がありました：\
      昨年の夏フェス - ライティングシステムのプログラムエラー - 問題番号 20245\
      冬フェス - 音響と照明のタイミング不一致 - 問題番号 20253\
      今回のリハーサル動画を添付いたしましたので、同期ズレの状況をご確認ください。\
      添付:\
      Rehearsal_Lighting_Issue.mp4\
      01/18 14:00 ライトワークス株式会社 吉田優子\
      佐藤健様\
      問題番号 20279 を技術部に報告し、原因調査を進めております。\
      01/19 16:20 ライトワークス株式会社 吉田優子\
      佐藤健様\
      技術部より、照明プログラムの再設定を推奨する回答がありました。\
      また、同期エラーが完全に解消されない場合、予備の制御装置を利用することも可能とのことです。\
      必要であれば詳細な手順を共有いたしますので、お知らせください。\
      ",
    ball: 1,
  },
];
