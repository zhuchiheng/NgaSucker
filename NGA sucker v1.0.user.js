// ==UserScript==
// @name         NGA sucker
// @namespace    https://nga.178.com/
// @version      0.6
// @description  try to take over the world!
// @author       You
// @license      MIT

// @match        *://bbs.nga.cn/*
// @match        *://ngabbs.com/*
// @match        *://nga.178.com/*

// @icon         https://img4.nga.178.com/ngabbs/nga_classic/f/00.png
// @grant        none
// @run-at       document-end
// @require      https://cdn.bootcss.com/jquery/1.12.4/jquery.min.js

// ==/UserScript==

(function () {
    'use strict';

    // Your code here...
    console.log('Hello NGA');

    var postInfoSegs = document.getElementsByClassName('postInfo');
    for (var i = 0; i < postInfoSegs.length; i++) {
        var buttonTr = document.createElement("button"); //创建一个input对象（提示框按钮）
        buttonTr.id = 'btn_thread' + i; // console.log(buttonTr.id);
        buttonTr.textContent = "T";
        buttonTr.style.width = "20px";
        buttonTr.style.height = "20px";
        buttonTr.style.align = "center";

        var buttonRe = document.createElement("button"); //创建一个input对象（提示框按钮）
        buttonRe.id = 'btn_reply' + i; // console.log(buttonRe.id);
        buttonRe.textContent = "R";
        buttonRe.style.width = "20px";
        buttonRe.style.height = "20px";
        buttonRe.style.align = "center";

        //window['postInfoSeg'+i] = postInfoSegs[i];
        //绑定按键点击功能
        buttonTr.onclick = function () { //console.log(this.id);
            var author_id_num = this.id.replace('btn_thread', '');//console.log(author_id_num);
            var postInfoSegs = document.getElementsByClassName('postInfo');
            var true_postauthor_id = postInfoSegs[author_id_num]['id'].replace('postInfo', 'postauthor');
            var true_postauthor_seg = document.getElementById(true_postauthor_id);

            var user_link = true_postauthor_seg['href'];
            var user_post_link = user_link.replace('https://nga.178.com/nuke.php?func=ucp&uid=', 'https://nga.178.com/thread.php?authorid=');
            console.log(user_post_link);

            //var new_window = window.open(user_post_link,"","width=400,height=400");
            //JQuery

            $.get(user_post_link,
                function (data, status) { //console.log(status);
                    // console.log(data);
                    if (data.indexOf('下一页') == -1) {
                        user_post_link = '';
                        console.log('No next page.');
                    } else {
                        var next_link = data.split("name='pageball'><a href='")[1];
                        next_link = next_link.split("' title='")[0];
                        user_post_link = 'https://nga.178.com/thread.php?authorid=' + next_link.split('authorid=')[1];
                        console.log(user_post_link);
                    }

                    var tmp_segs = data.split("<td class='c2'>");

                    var tmp_segs_out = tmp_segs.shift();

                    var topic_segs = [];

                    var content_seg = document.getElementById(postInfoSegs[author_id_num]['id'].replace('postInfo', 'postcontent'));
                    // console.log(content_seg.innerHTML);
                    content_seg.innerHTML = content_seg.innerHTML + '<br>' + ' <------------历史主题-----------> ';

                    for (var j = 0; j < tmp_segs.length; j++) {
                        tmp_segs[j] = tmp_segs[j].split('</a>')[0];
                        if (tmp_segs[j].indexOf('帖子发布或回复时间超过限制') != -1 || tmp_segs[j].indexOf('帐号权限不足') != -1) {
                            tmp_segs[j] = '';
                        } else {
                            topic_segs.push(tmp_segs[j] + '</a>');
                            console.log(tmp_segs[j] + '</a>');
                            content_seg.innerHTML = content_seg.innerHTML + '<br>' + j + ' - ' + tmp_segs[j] + '</a>';
                        }
                    }
                });

        };

        buttonRe.onclick = function () { //console.log(this.id);
            var author_id_num = this.id.replace('btn_reply', '');
            console.log(author_id_num);
            var postInfoSegs = document.getElementsByClassName('postInfo');
            console.log(postInfoSegs);
            console.log(postInfoSegs[author_id_num]);
            var true_postauthor_id = postInfoSegs[author_id_num]['id'].replace('postInfo', 'postauthor');
            var true_postauthor_seg = document.getElementById(true_postauthor_id);

            var user_link = true_postauthor_seg['href'];
            var user_post_link = user_link.replace('https://nga.178.com/nuke.php?func=ucp&uid=', 'https://nga.178.com/thread.php?searchpost=1&authorid=');
            console.log(user_post_link);

            //var new_window = window.open(user_post_link,"","width=400,height=400");
            //JQuery

            $.get(user_post_link,
                function (data, status) { //console.log(status);
                    // console.log(data);
                    var tmp_segs = data.split("<td class='c2'>");

                    var tmp_segs_out = tmp_segs.shift();

                    var topic_segs = [];

                    var content_seg = document.getElementById(postInfoSegs[author_id_num]['id'].replace('postInfo', 'postcontent'));
                    // console.log(content_seg.innerHTML);
                    content_seg.innerHTML = content_seg.innerHTML + '<br>' + ' <------------历史回复-----------> ';

                    for (var j = 0; j < tmp_segs.length; j++) {
                        tmp_segs[j] = tmp_segs[j].split('</td>')[0];
                        if (tmp_segs[j].indexOf('帖子发布或回复时间超过限制') != -1 || tmp_segs[j].indexOf('帐号权限不足') != -1) {
                            tmp_segs[j] = '';
                        } else {
                            topic_segs.push(tmp_segs[j] + '</a>');
                            console.log(tmp_segs[j] + '</a>');
                            content_seg.innerHTML = content_seg.innerHTML + '<br>' + j + "<td class='c2'>" + tmp_segs[j] + '</td>';
                        }
                    }
                });

        };

        postInfoSegs[i].appendChild(buttonTr);
        postInfoSegs[i].appendChild(buttonRe);
    }


})();