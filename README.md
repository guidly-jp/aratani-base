# Aratani Base - コワーキングスペース ウェブサイト

## 概要

Aratani Baseは創造性と集中力を最大化する理想のワークスペースです。このリポジトリには、コワーキングスペースの公式ウェブサイトのソースコードが含まれています。

## 特徴

- **レスポンシブデザイン**: すべてのデバイスで最適に表示
- **モダンなUI**: 洗練されたミニマルデザイン
- **microCMS連携**: ニュース機能でコンテンツ管理
- **多言語対応準備**: 将来的な英語・中国語展開に対応
- **SEO最適化**: 検索エンジン対応とアクセシビリティ

## ページ構成

1. **トップページ** (`index.html`)
   - ヒーローセクション
   - 特徴紹介
   - 予約CTA

2. **コンセプト・施設紹介** (`concept/index.html`)
   - コンセプト説明
   - 設備・施設詳細
   - ワークエリア紹介

3. **料金・プラン** (`plans/index.html`)
   - 料金プラン比較
   - 詳細比較表
   - よくある質問

4. **ニュース** (`news/index.html`)
   - microCMS連携
   - カテゴリフィルタリング
   - レスポンシブグリッド

5. **アクセス・お問い合わせ** (`access/index.html`)
   - アクセス情報
   - Formspree連携フォーム
   - Google Maps準備

## 技術仕様

### フロントエンド
- **HTML5**: セマンティックマークアップ
- **CSS3**: カスタムプロパティ、Grid、Flexbox
- **JavaScript**: ES6+、Intersection Observer API
- **アイコン**: Feather Icons

### 外部サービス連携
- **microCMS**: ニュースコンテンツ管理
- **Formspree**: お問い合わせフォーム
- **Google Maps**: アクセスマップ（設定要）
- **Google Fonts**: Inter フォント

### SEO・パフォーマンス
- **構造化データ**: Schema.org対応準備
- **メタタグ**: OGP、Twitter Card対応
- **sitemap.xml**: 検索エンジン向けサイトマップ
- **robots.txt**: クローラー制御
- **PWA対応**: manifest.json

## セットアップ

### 必要な設定

1. **microCMS設定**
   ```javascript
   // news/index.html内で設定
   const MICROCMS_CONFIG = {
       serviceDomain: 'aratani-base',
       endpoint: 'news',
       apiKey: 'YOUR_API_KEY_HERE'
   };
   ```

2. **Formspree設定**
   ```html
   <!-- access/index.html内で設定 -->
   <form action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
   ```

3. **Google Maps設定**
   - access/index.htmlのマップコンテナにGoogle Maps APIを統合

### microCMS スキーマ設定

ニュース用のコンテンツタイプを以下の設定で作成してください：

```json
{
  "title": {
    "type": "text",
    "required": true
  },
  "content": {
    "type": "richEditor",
    "required": true
  },
  "category": {
    "type": "select",
    "options": ["news", "event", "maintenance", "update"],
    "required": true
  },
  "publishedAt": {
    "type": "datetime",
    "required": true
  },
  "image": {
    "type": "media",
    "required": false
  }
}
```

## カラーパレット

```css
:root {
  --primary-color: #000000;     /* ピュアブラック */
  --secondary-color: #FFFFFF;   /* ピュアホワイト */
  --accent-color: #FF5722;      /* 鮮やかなオレンジ */
  --background-color: #FFFFFF;  /* ホワイト背景 */
  --text-color: #212121;        /* ダークグレー */
}
```

## ディレクトリ構造

```
aratani-base/
├── index.html              # トップページ
├── css/
│   └── style.css          # メインスタイルシート
├── js/
│   └── main.js            # メインJavaScript
├── images/                # 画像ファイル
├── concept/
│   └── index.html         # コンセプトページ
├── plans/
│   └── index.html         # 料金プランページ
├── news/
│   └── index.html         # ニュースページ
├── access/
│   └── index.html         # アクセス・お問い合わせページ
├── robots.txt             # クローラー制御
├── sitemap.xml            # サイトマップ
├── manifest.json          # PWA設定
└── README.md              # このファイル
```

## 今後の展開

### Phase 2: 機能拡張
- [ ] 予約システム統合
- [ ] 会員専用ページ
- [ ] オンライン決済機能
- [ ] チャットボット

### Phase 3: 多言語化
- [ ] 英語版サイト
- [ ] 中国語版サイト
- [ ] 言語切り替え機能

### Phase 4: 高度な機能
- [ ] PWA対応完了
- [ ] オフライン機能
- [ ] プッシュ通知
- [ ] ダークモード

## ライセンス

このプロジェクトは Aratani Base の所有物です。無断転載・複製を禁じます。

## お問い合わせ

- **Email**: info@aratani-base.com
- **TEL**: 03-0000-0000
- **住所**: 〒160-0022 東京都新宿区新宿3-1-1 新宿ビル5F