# Angular hands-on 20200622

## Index
- [Step 0: StackBlitz で Angular 開発環境をワンクリックで構築する](#step-0-stackblitz-で-angular-開発環境をワンクリックで構築する)
- [Step 1: Hello World!](#step-1-hello-world)
- [Step 2: Todo リスト を表示する](#step-2-todo-リスト-を表示する)
- [Step 3: Todo の状態を更新する](#step-3-todo-の状態を更新する)
- [Step 4: Todo 作成フォームを作る](#step-4-todo-作成フォームを作る)
- [Step 5: アプリにマテリアルデザインを適用する](#step-5-アプリにマテリアルデザインを適用する)
- [Appendix](#appendix)

## Step 0: StackBlitz で Angular 開発環境をワンクリックで構築する

今回のハンズオンでは、StackBlitz という Web アプリケーションのオンライン IDE を使用します。
本来 Angular の開発環境構築では Node や CLI をインストールしたりと、様々な手順が発生しますが、
StackBlitz を使用するとそれらの手間を省き、すぐにコーディングを始めることができます。

百聞は一見に如かず、とにかく実際に触ってみましょう。

### StackBlitz にアクセス

https://stackblitz.com/ にアクセスします。おしゃれな宇宙のイラストを尻目に少しスクロールすると、`START A NEW WORKSPACE` というセクションが見つかります。

迷わず Angular をクリックしましょう、するとすぐさま環境構築が始まります。

### GitHub 連携

環境構築が完了したあなたの目の前に、何やら Visual Studio Code のような UI と、デモウィンドウが現れました。そうです、全てはここから始まります。

その前に、今回のハンズオンに際しご用意いただいた GitHub アカウントとの連携を行いましょう。

画面左上部に `Connect repository` という文言が見つかります、ここをクリックしてご自身の GitHub アカウントによるログインを行なってください。

ログインが完了すると、`Connect new GitHub repository` と表示されたモーダルダイアログが現れますので、お好きなリポジトリ名をつけてください。決められない方は、`angular-hands-on-20200622` とでも打っておきましょう。

repository は private にすることもできます。後の操作には特に関係ありませんので、お好きな選択を行なってください。

## Step 1: Hello World!

本ステップのゴール: 画面上に変数の値を表示する

### Hello World!(2回目)

全てのプログラミング入門は `Hello World!` から始まります(持論)。

まずはじめに、画面左部のファイルツリーから `app.component.html` を**ダブルクリック**して開き、その内容を以下のように書き換えてください。

#### `app.component.html`

``` html
<h1>Hello World!</h1>
```

右のデモ画面に大きく `Hello World` と表示されたら成功です、おめでとうございます！

### 変数を表示してみる

html にベタ書きした内容が表示できることは確認できました。
次に、プログラミングらしく変数に格納した値を html で表示する、ということをやってみましょう。

`app.component.ts` を開き、その内容を以下の通りに書き換えてください。

#### `app.component.ts`

``` ts
import { Component } from '@angular/core';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent  {
  title = 'My todo-list';
}
```

さらに、先ほど書き換えた `app.component.html` を、今度は以下の通りに書き換えてください。

#### `app.component.html`

``` html
<h1>
  {{ title }}
</h1>
```

何やら二重の中括弧で囲むという見慣れない構文で、`app.component.ts` 内で定義した文字列の内容が画面に表示されました。これを *プロパティバインディング* と呼びます。

その名称を覚える必要はありません。ここで行われているのは、`app.component.ts` 内で定義された `title` という変数の値を表示することです。コード的にもとても直感的ですね。
これが Angular で変数を表示する際の、最も基本的な書き方です。

さてここで、ここまでさりげなく現れていた `Component` というキーワードについて簡単に解説します。
`Component` とは、Angular における文字通り**構成要素**のことで、1つ以上のコンポーネントを組み合わせて Angular application が出来上がります。

個々のコンポーネントは基本的に
1. 見た目 (html)
2. ロジック (TypeScript)
3. スタイル (CSS)

を持ちます。

あまり難しく考える必要はありません。画面(というよりはアプリケーション)を構成する部品一つ一つのことなんだなー、くらいのスタンスで OK です。

title の内容を書き換えて保存すると、表示されるテキストが変わるはずです。それが確認できたら、画面上部にある `Commit` ボタンを押下して変更を commit し、次のステップに進みましょう(このステップの commit は[こちら](https://github.com/n4m1t4q/angular-hands-on/commit/60c22672a877033a90cd2fab2e9681dbe4811556))。

## Step 2: Todo リスト を表示する

本ステップのゴール: 完了状態の区別がつく Todo リスト を表示する

### Todo interface

このハンズオンでは Todo リスト を作ることをゴールとしています。
そのためにまずは、`Todo` をデータモデルとして定義することから始めましょう。

ファイルツリー内に `app` というフォルダがあります。ここを**右クリック**すると、真ん中に `Angular Generator` という選択肢が見つかります。ここにカーソルを乗せると、さらにカラフルな選択肢が現れます。ここでは、`interface` を選択します。

選択すると、ファイル名を問われます。
`todo` と入力し Enter を押すと、`app` フォルダ配下に `todo.ts` というファイルが生成されます。
その内容を以下の通りに書き換えてください。

#### `todo.ts`

``` ts
export interface Todo {
  title: string;
  completed: boolean;
}
```

これで、タイトルを表す文字列型の `title`、完了状態を表すブール型の `completed` という2つのプロパティを持つ `Todo` というモデル定義が出来上がりました。次に、このモデルを利用した Todo リスト を作ってみましょう。

### make todoList

`app` フォルダを右クリックし、今度は1階層目の `New File` を選択します。`todoList` と入力し、`todoList.ts` ファイルが生成されたことを確認してください。
このファイルの中で、先ほど定義した `Todo` モデルを使用していきます。

`todoList` の内容を以下のように書き換えてください。

#### `todoList`

``` ts
import { Todo } from './todo';

export const todoList: Todo[] = [
  {
    title: 'Get started Angular',
    completed: false
  },
  {
    title: 'Write an article',
    completed: false
  },
  {
    title: 'Get the Hikarie',
    completed: true
  }
];
```

なお、要素はいくつあっても構いませんし、それらの値に対する制約もありません(強いて言えば、型定義に即していること)。画面に表示したい Todo リスト を作ってみましょう。

ここでのポイントは、1行目で `Todo` というモデルを `import` し、配列の型としてそれを利用していることです。これにより、各要素に `title` および `completed` が含まれているかを検知することができるようになります。

### Todo リスト を表示する

先ほど `app.component.html` で `title` を表示したように、今度は `todoList` を表示してみましょう。

`app.component.ts` を以下の通りに書き換えてください。

#### `app.component.ts`

``` ts
import { Component } from '@angular/core';

import { todoList } from './todoList';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent  {
  title = 'My todo-list';
  todoList = todoList;
}
```

次に、`app.component.html` を以下の通りに書き換えてください。

#### `app.component.html`

``` html
<h1>
  {{ title }}
</h1>
<ul>
  <li *ngFor="let todo of todoList">
    {{ todo.title }}
  </li>
</ul>
```

`*ngFor` という構文が出てきました。ここでは、`app.component.ts` 内で定義された配列 `todoList` の各要素を繰り返し表示することを行なっています。

`*ngFor` のような html を拡張する機能を *ディレクティブ* と呼びます。使い方はとてもシンプルですが、とても骨のある Angular の重要な機能です。興味のある方は、ぜひ詳しく調べてみてください(頭についているアスタリスクは何者?、など)。

ひとまずこれで、ご自身で定義した Todo リスト が表示されたはずです。おめでとうございます！

### 完了済みの Todo にスタイルを適用する

さて、今のままでは Todo が完了しているのかわからないので、`completed` プロパティの値に応じてスタイルを変える、ということをやってみましょう。
今回の例では、`<li>` 要素に `completed` クラスを付与します。

`app.component.html` を以下の通りに書き換えてください。

#### `app.component.html`

``` html
<h1>
  {{ title }}
</h1>
<ul>
  <li *ngFor="let todo of todoList" [class.completed]="todo.completed">
    {{ todo.title }}
  </li>
</ul>
```

`[class.completed]="todo.completed"` という構文が出てきました。これを*クラスバインディング*と呼びます。クラスバインディングは、右辺の式の結果に応じたクラスの付与・除去を行うことができます。

ここで評価しているのは `todo.completed`、つまり `Todo` が完了していれば、`completed` というクラスを付与するということになります。

クラスの動的な付与ができるようになったので、CSS ファイルでそのクラスに対するスタイルを定義しましょう。

`app.component.css` を以下の通りに書き換えてください。

#### `app.component.css`

``` css
.completed {
  text-decolation: line-through;
}
```

これで、完了済み Todo に取り消し線が追加されたはずです。まだまだ見た目はシンプルですが、Todo リスト らしくなってきました。
変更を commit し、次のステップに進みましょう(このステップの commit は[こちら](https://github.com/n4m1t4q/angular-hands-on/commit/acec0bfa862d90db2d1c4e650f3c93bde9ee1c62))。

## Step 3: Todo の状態を更新する

本ステップのゴール: Todo の完了状態を更新できるようにする、コンポーネントを切り出す

### チェックボックスと状態を同期する

Todo リスト の表示はできるようになりましたが、このままでは Todo の完了状態を更新することができません。画面上で完了状態を更新するために、チェックボックスを配置してみましょう。ここで、ユーザーからの入力を受ける html 要素と、コンポーネントの状態を同期するために組み込みディレクティブである `[(ngModel)]` を使用します。

`app.component.html` を以下の通りに書き換えてください。

#### `app.component.html`

``` html
<h1>
  {{ title }}
</h1>
<ul>
  <li *ngFor="let todo of todoList" [class.completed]="todo.completed">
    <input type="checkbox" [(ngModel)]="todo.completed">{{ todo.title }}
  </li>
</ul>
```

`[(ngModel)]` は、*双方向データバインディング*を提供するディレクティブです。双方向データバインディングでは、`[(ngModel)]` のように2つの括弧を使用して記述します。

画面上で、チェックボックスの状態によって取り消し線の付与が動的に変わることが確認できるはずです。

### コンポーネントとして切り出す

ここまで `AppComponent` が全ての役割を担っていましたが、見通しを良くするためにここまでの Todo リスト の表示に必要な要素をコンポーネントとして切り出してみましょう。

`app` フォルダを右クリックし、`Angular Generator` 内の `Component` を選択します。`TodoList` と入力し、`app` フォルダ配下に `todo-list` フォルダと、その配下に CSS・html・ts ファイルが生成されたことを確認してください。

早速、`app.component.html` の内容を `todo-list.component.html` 内に移植してみましょう。

`todo-list.component.html` を以下の通りに書き換えてください。

#### `todo-list.component.html`

``` html
<ul>
  <li *ngFor="let todo of todoList" [class.completed]="todo.completed">
    <input type="checkbox" [(ngModel)]="todo.completed">{{ todo.title }}
  </li>
</ul>
```

次に、`TodoListComponent` に `todoList` プロパティを追加します。なお、ここでは先ほど使用していた `todoList` は `import` しません。

`todo-list.component.ts` を以下の通りに書き換えてください。

#### `todo-list.component.ts`

``` ts
import { Component, OnInit } from '@angular/core';

import { Todo } from '../todo';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {

  todoList: Todo[];

  constructor() { }

  ngOnInit() {
  }

}
```

ではここで、`app.component.html` の Todo リスト に充たる部分を `TodoListComponent` で置き換えてみましょう。

`app.component.html` を以下の通りに書き換えてください。

#### `app.component.html`

``` html
<h1>
  {{ title }}
</h1>
<app-todo-list></app-todo-list>
```

さっきまで表示されていた Todo リスト が消えてしまいました。`TodoListComponent` の `todoList` プロパティに値がセットされていないので、リストには何も表示されません。Todo リスト のデータを持っているのは、`TodoListComponent` の親である `AppComponent` なので、`AppComponent` から `TodoListComponent` にデータを渡す、という処理ができると良さそうです。

### 子コンポーネントにデータを渡す

ここでは、子のコンポーネントのプロパティにデータを渡す方法を示します。親から子にデータを渡すためには、子の側で*データを受け取る口*を用意しておく必要があります。その機能を提供するのが、`Input` デコレータです。

`todo-list.component.ts` を以下の通りに書き換えてください。

#### `todo-list.component.ts`

``` ts
import { Component, OnInit, Input } from '@angular/core';

import { Todo } from '../todo';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {

  @Input() todoList: Todo[];

  constructor() { }

  ngOnInit() {
  }

}
```

これで受け取り口が用意できました。親から子へデータを渡してみましょう。子コンポーネントのプロパティにデータを渡すには
、*プロパティバインディング*構文を使用します。`<app-todo-list>` 要素に `[todoList]="todoList"` という属性を付与します。

`app.component.html` を以下の通りに書き換えてください。

#### `app.component.html`

``` html
<h1>
  {{ title }}
</h1>
<app-todo-list [todoList]="todoList"></app-todo-list>
```

これで `AppComponent` の html の見通しが良くなりました。

ところで、チェックが入っている Todo に取り消し線がつかなくなっていることに気づきましたか? Angular には、自動的に CSS をスコープ化する機能があります。ここでは、`TodoListComponent` の html には `todo-list.component.css` の内容しか適用されません。`app.component.css` の内容も `todo-list.component.css` に移植して、取り消し線がつくことを確かめましょう。

確認ができたら変更を commit し、次のステップに進みましょう(このステップの commit は[こちら](https://github.com/n4m1t4q/angular-hands-on/commit/510f71486d1cb7b51f84f0764070c19d68117a8d))。

## Step 4: Todo 作成フォームを作る

本ステップのゴール: Todo 作成フォームを作って、新しい Todo を作成できるようにする

### TodoFormComponent を作成する

ここまで、あらかじめ定義された Todo リスト を表示する、ということをやってきました。今度は、画面から任意に Todo を追加できるようにしてみます。

`app` フォルダを右クリックし、`Angular Generator` 内の `Component` を選択します。`TodoForm` と入力し、`app` フォルダ配下に `todo-form` フォルダと、その配下に CSS・html・ts ファイルが生成されたことを確認してください。

追加された `TodoFormComponent` を `AppComponent` で利用しましょう。

`app.component.html` を以下の通りに書き換えてください。

#### `app.component.html`

``` html
<h1>
  {{ title }}
</h1>
<app-todo-form></app-todo-form>
<app-todo-list [todoList]="todoList"></app-todo-list>
```

タイトルの下に `todo-form works!` と表示されれば準備完了です、フォームの中身を作っていきましょう。

### ボタンのクリックイベントを受け取る

Todo 作成フォームといっても、必要なのはテキストボックスとボタンだけです。まずはシンプルに `<input>` 要素と `<buton>` 要素を配置しましょう。

``` html
<input type="text"> 
<button>Create</button>
```

次に、ボタンのクリックイベントを取得します。html 要素からイベントを取得するには、*イベントバインディング*構文を使用します。ここでは、`button` 要素に `(click)` 属性を追加して、右辺にコンポーネントのメソッドを指定します。

``` html
<button (click)="create()">Create</button>
```

エラーが表示されてしまいました。これは `TodoFormComponent` に `create` メソッドの定義がないためです。

`todo-forｍ.component.ts` を以下の通りに書き換えてください。

#### `todo-form.component.ts`

``` ts
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-todo-form',
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.css']
})
export class TodoFormComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  create() {
    alert("create!");
  }

}
```

### テキストボックスと双方向データバインディングする

`<input>` 要素のテキストをコンポーネントの中で使うために、先ほど使った `ngModel` を再び使用します。`TodoFormComponent` に `title` プロパティを追加し、`ngModel` の双方向データバインディングの対象にします。

``` html
<input type="text" [(ngModel)]="title">
```

バインディングが成功したことがわかるように、`create` メソッドで表示するアラートで `title` プロパティを表示してみましょう。

``` ts
  title: string;

  constructor() { }

  ngOnInit() {
  }

  create() {
    alert(this.title);
  }
```

テキストボックスに入力した内容がアラートに表示されることが確認できるはずです。

### Todo を作成してリストに追加する

最後に、`create` メソッドをきちんと実装し、Todo リスト に追加されるようにしましょう。しかし、`TodoFormComponent` は Todo リスト を持っていません。リストに新しい Todo を追加するには、`AppComponent` に新しい Todo の追加をお願いする必要があります。具体的には、**子から親へデータを送る**ため、**イベント**を発火します。

親から子へデータを渡すときは `Input` デコレータを使用しましたが、子から親にイベントを発火するには `Output` デコレータを使用します。今回は、`submit` というイベントを定義します。イベントの定義は、`EventEmitter` 型のプロパティに `Output` デコレータを付与します。`EventEmitter` ではイベントとして渡すデータの型をジェネリクスで指定します。

``` ts
import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { Todo } from '../todo';

@Component({
  selector: 'app-todo-form',
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.css']
})
export class TodoFormComponent implements OnInit {

  title: string;

  @Output() submit = new EventEmitter<Todo>();

  constructor() { }

  ngOnInit() {
  }

  create() {
    alert(this.title);
  }

}
```

イベントを発火するには、`EventEmitter` クラスの `emit` メソッドを呼び出します。`create` メソッドで、新しい Todo の作成とイベントの発火を行いましょう。

``` ts
  create() {
    if (this.title) {
      const todo: Todo = {title: this.title, completed: false};
      this.submit.emit(todo);
      this.title = '';
    }
  }
```

あとは、親である `AppComponent` 側で `submit` イベントを受け取って、リストに追加するだけです。イベントの受け取り方はボタンのクリックイベントと同じです。しかし今回は、`emit` メソッドの引数が必要なので、`$event` という特殊な変数を使ってそれを受け取ります。

``` html
<app-todo-form (submit)="addTodo($event)"></app-todo-form>
```

`AppComponent` に `addTodo` メソッドを追加すれば、Todo アプリケーションの機能は完成です。

``` ts
import { Component, VERSION } from '@angular/core';

import { todoList } from './todoList';

import { Todo } from './todo';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent  {
  title = 'My todo-list';
  todoList = todoList;

  addTodo(todo: Todo) {
    this.todoList.unshift(todo);
  }
}
```

ついに Todo アプリケーションが完成しました、おめでとうございます！
しかし、これでは見た目がシンプルすぎますね。

次のステップでは、*マテリアルデザイン*を適用してアプリをオシャレに仕上げます！

変更を commit し、次のステップに進みましょう(このステップの commit は[こちら](https://github.com/n4m1t4q/angular-hands-on/commit/acec0bfa862d90db2d1c4e650f3c93bde9ee1c62))。

## Step 5: アプリにマテリアルデザインを適用する

本ステップのゴール: Angular Material を利用して Todo アプリ をオシャレに仕上げる

### Angular Material をインストールする

機能は揃いましたが見た目がシンプルなので、[マテリアルデザイン](https://ja.wikipedia.org/wiki/%E3%83%9E%E3%83%86%E3%83%AA%E3%82%A2%E3%83%AB%E3%83%87%E3%82%B6%E3%82%A4%E3%83%B3)にリニューアルしてみましょう。
今回は、Angular Material という Angular 公式のライブラリを使用します。

画面の左部に `DEPENDENCIES` というセクションがあります。ここには、この Angular 開発環境で使用しているライブラリが一覧されています。そこへ Angular Material を追加するために、下部の `enter package name` と書かれたテキストボックスに `@angular/material` と入力し、Enter してください(@を忘れずに)。すると、`@angular/cdk も必要だよ` という旨のアラートが表示されます。左のボタンをクリックし、そちらもインストールします。これで Angular Material を利用できるようになりました。

### Material Module を読み込む

はじめに、`src` フォルダ配下にある `styles.css` を開き、以下のコードを追加します。
``` css
@import '~@angular/material/prebuilt-themes/indigo-pink.css';
```

Angular Material の機能を使うには、`@angular/material` が提供するモジュール(コンポーネントを束ねる仕組み)を読み込む必要があります。

`app` フォルダ配下にある `app.module.ts` を以下の通りに書き換えてください(ここは流石にコピペで良いです)。

#### `app.module.ts`

``` ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HelloComponent } from './hello.component';

import { TodoListComponent } from './todo-list/todo-list.component';
import { TodoFormComponent } from './todo-form/todo-form.component';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    FormsModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDividerModule,
    MatListModule,
    MatCardModule,
    MatCheckboxModule,
  ],
  declarations: [ AppComponent, HelloComponent, TodoListComponent, TodoFormComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
```

### MatCard を利用する

はじめに、 `AppComponent` をデコっていきましょう。

#### `app.component.html`

``` html
<mat-card class="todo-card">
  <mat-card-title>
    {{title}}
  </mat-card-title>

  <mat-card-content>
    <app-todo-form (submit)="addTodo($event)"></app-todo-form>
    <app-todo-list [todoList]="todoList"></app-todo-list>
  </mat-card-content>
</mat-card>
```

#### `app.component.css`

``` css
.todo-card {
  margin: 30px auto auto;
  width: 400px;
  padding: 30px;
}
```

Card デザインを適用しました。すでにオシャレ感満載ですね(個人差あり)。

### MatFormField を利用する

次に、`TodoFormComponent` をデコっていきましょう。

#### `todo-form.component.html`

``` html
<form>
  <mat-form-field>
    <mat-label>Todo title</mat-label>
    <input type="text" matInput [(ngModel)]="title" name="title">
  </mat-form-field>
  <button type="button" mat-raised-button color="primary" (click)="create()">Create</button>
</form>
```

#### `todo-form.component.css`

``` css
mat-form-field {
  width: 75%;
  margin-right: 5%;
}
```

今度はテキストフィールドがオシャレになりました。

### MatListItem を利用する

最後に `TodoListComponent` をデコって、シャレオツ Todo アプリを完成させましょう！

#### `todo-list.component.html`

``` html
<mat-list class="todo-list">
  <mat-list-item *ngFor="let todo of todoList; last as last" [class.completed]="todo.completed">
    <mat-checkbox [(ngModel)]="todo.completed">{{todo.title}}</mat-checkbox>
    <mat-divider *ngIf="!last"></mat-divider>
  </mat-list-item>
</mat-list>
```

Angular Material のおかげで、あっという間に素敵なアプリケーションに生まれ変わりました。これでこのハンズオンは終了です。お疲れ様でした！(このステップの commit は[こちら](https://github.com/n4m1t4q/angular-hands-on/commit/b8647f6c109fcc648e24368f0c38dbd05fc70c86))

## Appendix

### 改良要素

ハンズオンは終了しましたが、まだまだ Todo アプリとして追加すべき機能がいくつかあることに気づくはずです。

1. 削除
2. データ永続化
3. 並び替え
4. etc.

Angular の理解をさらに深めるため、上記のような機能を実装してみたり、本ハンズオンに登場した各キーワードを詳しく調べてみると良いでしょう。

### もっと知りたい方は

今回のハンズオンで使用したのは、Angular が提供する昨日のごく一部です。もっと深く知りたい方は、以下のドキュメントを参考にしてみてください。

- [Angular Docs](https://angular.io/docs)
- [Angular CLI](https://github.com/angular/angular-cli)
- [Angular Material](https://material.angular.io/)

### 参考

本ハンズオンは、以下の教材を参考に独自の変更を加えて作成しました。

https://github.com/ng-japan/hands-on
