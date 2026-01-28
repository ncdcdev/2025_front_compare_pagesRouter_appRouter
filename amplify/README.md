# Amplify Gen2 バックエンド設定

このディレクトリには、Amplify Gen2のバックエンド設定が含まれています。

## セットアップ手順

### 1. Amplifyコンソールでアプリを接続

1. [AWS Amplifyコンソール](https://console.aws.amazon.com/amplify/)にアクセス
2. 既存のアプリを選択するか、新しいアプリを作成
3. リポジトリを接続
4. ビルド設定で「Amplify Gen2」を選択

### 2. ローカル開発（オプション）

ローカルでAmplify Gen2をテストする場合：

```bash
# Amplify CLIをインストール（初回のみ）
npm install -g @aws-amplify/cli

# サンドボックス環境を起動
npx ampx sandbox
```

### 3. バックエンドリソースの追加

将来的にストレージや認証などのバックエンドリソースを追加する場合：

1. `amplify/backend.ts`を編集
2. 必要なリソース（auth, data, storageなど）を定義
3. Amplifyコンソールで自動的にデプロイされます

## 注意事項

- `amplify_outputs.json`は自動生成されるため、手動で編集しないでください
- このファイルは`.gitignore`に含まれています
- Gen2では、バックエンドリソースはAmplifyコンソールで管理されます

