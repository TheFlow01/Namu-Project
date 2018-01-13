import { Component, OnInit, OnDestroy, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { QuillEditorComponent } from 'ngx-quill';
import 'rxjs/add/observable/from';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';

import { FeedService } from '../../feed/feed.service';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})
export class EditorComponent implements OnInit, OnDestroy {
  @Input() answerMetaData;
  @Output() closed = new EventEmitter<boolean>();

  form: FormGroup;
  subscription: Subscription;
  content;

  constructor(fb: FormBuilder, private feedService: FeedService) {
    this.form = fb.group({
      // TODO: add Validator
      editor: ['']
    });
  }
  @ViewChild('editor') editor: QuillEditorComponent;

  ngOnInit() {
    const observable$ = Observable.from(this.editor.onContentChanged);
    this.subscription = observable$.subscribe(
      data => {
        this.content = data;
      },
      error => console.log(error),
      () => console.log('done')
    );
    this.editor
    .onContentChanged.debounceTime(300) // 추후 자동저장 구현 시..
      .distinctUntilChanged()
      .subscribe(data => {
    });
  }

  ngOnDestroy() {
    console.log('destroyed');
    this.subscription.unsubscribe();
  }

  setFocus($event) {
    $event.focus();
  }

  saveContent() {
    const payload = {
      question: this.answerMetaData.pk,
      content: this.content.editor.getContents(),
      content_html: this.content.html,
      published: false
    };
    alert('임시저장되었습니다');
  }

  onSubmit() {
    const payload = {
      question: this.answerMetaData.pk,
      content: this.content.editor.getContents(),
      content_html: this.content.html,
      published: true
    };
    this.feedService.postAnswer(payload).subscribe(
      // TODO: repsonse로 완료 화면 그리기
      res => {
        this.closeEditor();
        console.log('done');
      },
      error => console.log(error)
    );
  }

  closeEditor() {
    this.closed.emit(false);
  }


}
