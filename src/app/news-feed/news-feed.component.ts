import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { PostService } from './news-feed.service';
import { Router } from '@angular/router';
declare var $: any;

@Component({
  selector: 'app-news-feed',
  templateUrl: './news-feed.component.html',
  styleUrls: ['./news-feed.component.css']
})
export class NewsFeedComponent implements OnInit {

  postCommentData: any;
  loginUserData: any;
  mySelectedPost: any;
  id: number;
  constructor(private _postService: PostService, private _router: Router) { }

  ngOnInit() {
    if (!localStorage.getItem('usersFeed')) {
      this.getUserData();
    }
    else {
      const data = this._postService.getData('usersFeed');
      this.postCommentData = data;
      if (this._postService.getData('user')) {
        this.loginUserData = this._postService.getData('user');
      }
      $(".modal-backdrop").remove();
    }
  }

  numberOflikesDislikes(index, value) {
    if (!JSON.parse(localStorage.getItem('user'))) {
      $("#cannotDo").modal('show');
      return;
    }
    else {
      if (value === 'like') {
        this.postCommentData[index].likes++;
        this._postService.setData('usersFeed', this.postCommentData)
      }
      else {
        this.postCommentData[index].dislikes++;
        this._postService.setData('usersFeed', this.postCommentData)

      }
    }

  }
  numberOflikesDislikesComment(indexPost, indexComm, value) {
    if (!JSON.parse(localStorage.getItem('user'))) {
      $("#cannotDo").modal('show');
      return;
    }
    else {
      if (value === 'like') {
        this.postCommentData[indexPost].comments[indexComm].likes++;
        this._postService.setData('usersFeed', this.postCommentData)
      }
      else {
        this.postCommentData[indexPost].comments[indexComm].dislikes++;
        this._postService.setData('usersFeed', this.postCommentData,)

      }
    }

  }

  numberOflikesDislikesCommentReply(indexPost, indexComm, indexReply, value) {
    if (!JSON.parse(localStorage.getItem('user'))) {
      $("#cannotDo").modal('show');
      return;
    }
    else {
      if (value === 'like') {
        this.postCommentData[indexPost].comments[indexComm].reply[indexReply].likes++;
        this._postService.setData('usersFeed', this.postCommentData)
      }
      else {
        this.postCommentData[indexPost].comments[indexComm].reply[indexReply].dislikes++;
        this._postService.setData('usersFeed', this.postCommentData)

      }
    }

  }
  reply(indexPost,indexComm) {
    if (!JSON.parse(localStorage.getItem('user'))) {
      $("#cannotDo").modal('show');
      return;
    }
    else {
      this.postCommentData[indexPost].comments.replyComment=true;
    }
  }
  getUserData() {
    this._postService.getPostComment().subscribe(res => {
      this.postCommentData = res.newsFeed;
      this._postService.setData('usersFeed', this.postCommentData);

    });
  }
  createPost() {
    if (!JSON.parse(localStorage.getItem('user'))) {
      $("#cannotDo").modal('show');
    }
    else {
      $("#postModal").modal('show');
    }

  }
  login() {
    this._router.navigateByUrl('/login');
    $(".modal-backdrop").remove();
  }
  getDate(){
    const date=new Date();
    const h=date.getHours();
    const m=date.getMinutes();
    return h+':'+(m<10?'0':'')+m;
  }
  newPost() {
    this.postCommentData = this._postService.getData('usersFeed');
    const userData = this._postService.getData('user');
    for (var i = 0; i < this.postCommentData.length; i++) {
      if (this.postCommentData[i].email == userData.email) {
        this.id = this.postCommentData[this.postCommentData.length - 1].id;
        const object = {
          "id": this.id + 1,
          "fullname": this.postCommentData[i].fullname,
          "email": this.postCommentData[i].value,
          "time": this.getDate(),
          "imageURL": this.postCommentData[i].imageURL,
          "post": this.mySelectedPost,
          "likes": 0,
          "dislikes": 0,
          "comments":[]
        }
        this.postCommentData.push(object);
        this._postService.setData('usersFeed', this.postCommentData);
      }
    }
    this._postService.setData('usersFeed', this.postCommentData);
    $("#postModal").modal('hide');
  }

  addComment(indexPost,value) {
    if (!JSON.parse(localStorage.getItem('user'))) {
      $("#cannotDo").modal('show');
      return;
    } else {
      const userData = this._postService.getData('user');
      for (var i = 0; i < this.postCommentData.length; i++) {
        if (this.postCommentData[i].email == userData.email) {
          const obj = {
            "fullname": this.postCommentData[i].fullname,
            "image": this.postCommentData[i].imageURL,
            "time": this.getDate(),
            "comment": value,
            "likes": 0,
            "dislikes": 0,
            "reply":[]
          }
          this.postCommentData[indexPost].comments.push(obj);
          this._postService.setData('usersFeed', this.postCommentData);
        }
      }
      // (<HTMLInputElement>document.getElementById('comments')).value='';

    }

  }

  replyComment(indexPost,indexComm,value){
    if (!JSON.parse(localStorage.getItem('user'))) {
      $("#cannotDo").modal('show');
      return;
    } else {
      const userData = this._postService.getData('user');
      for (var i = 0; i < this.postCommentData.length; i++) {
        if (this.postCommentData[i].email == userData.email) {
          const obj = {
            "fullname": this.postCommentData[i].fullname,
            "image": this.postCommentData[i].imageURL,
            "time": this.getDate(),
            "comment": value,
            "likes": 0,
            "dislikes": 0
          }
          this.postCommentData[indexPost].comments[indexComm].reply.push(obj);
          this._postService.setData('usersFeed', this.postCommentData);
        }
      }
      this.postCommentData[indexPost].comments.replyComment=true;
    }
  }

}
