import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { AskModalComponent } from '../common/navigator/ask-modal/ask-modal.component';
import { Answer, answers, expandedContents } from '../mocks/answer';
import { HttpClient, HttpHeaders } from '@angular/common/http';

class Topic {
  pk: number;
  creator: number;
  name: string;
  description: string;
}


@Component({
  selector: 'app-topic',
  templateUrl: './topic.component.html',
  styleUrls: ['./topic.component.css']
})
export class TopicComponent implements OnInit {
  answers;
  topics: Topic[];
  apiUrl = 'https://siwon.me/';
  isFollowing = false;
  private headers = new HttpHeaders()
    .set('Authorization', `Token ${JSON.parse(localStorage.currentUser).token}`);

  // 로그인 사용자 정보 (dummy)
  // 사용처: 메인피드의 질문하기 버튼, 댓글달기, 질문피드의 답변달기
  // 메인페이지, 질문피드 페이지 로드 시 전역에서 쥐고 있어야 하는 || 또는 토큰정보를 참조해야하는 데이터
  public me = {
    name: '김경훈',
    credential: 'fastcampus WPS 수강생',
    imgPath: 'assets/images/me.png'
  };

  constructor(public dialog: MatDialog, public http: HttpClient) { }

  ngOnInit() {
    this.getAnswers();
    this.getTopics();
    this.topics = [];
  }

  getTopics() {
    this.http.get<Topic[]>(`${this.apiUrl}/topic/2`, { headers: this.headers })
      .subscribe(topics => this.topics = topics);
  }

  getAnswers(): void {
    this.answers = answers;
  }

  following() {
    this.isFollowing = !this.isFollowing;
  }

  fetchExpandedContent(id) {
    this.answers = this.answers.map(answer => {
      if (answer.id === id) {
        Object.assign(answer, expandedContents[id]);
      }
      return answer;
    });
  }

  openAskModal(name): void {
    const dialogRef = this.dialog.open(AskModalComponent, {
      width: '620px',
      data: { name }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

}
