//user by ...
window.onload = function () {
    var list = document.getElementById('list');
    var lists = list.children;
    var timer;

    function removeNode(node) { node.parentNode.removeChild(node); }

    function praise(el,box) {
        var praiseEl = box.getElementsByClassName('praises-total')[0];
        var oldTotal = parseInt(praiseEl.getAttribute('total'));
        var text = el.innerHTML;
        var newTotal;
        if (text == '赞') {
            newTotal = oldTotal + 1;
            el.innerHTML = '取消赞';
            praiseEl.innerHTML = (newTotal === 1) ? '我觉得很赞' : '我和' + oldTotal + '个人觉得很赞';
        } else {
            newTotal = oldTotal - 1;
            el.innerHTML = '赞';
            praiseEl.innerHTML = (newTotal === 0) ? '' : newTotal + '个人觉得很赞';
        }
        praiseEl.setAttribute('total', newTotal);
        praiseEl.style.display = (newTotal === 0) ? 'none' : 'block';

    }

    //格式化日期
    function formatDate(date) {
        var y = date.getFullYear();
        var m = date.getMonth() + 1;
        var d = date.getDate();
        var h = date.getHours();
        var mi = date.getMinutes();
        m = m < 10 ? '0' + m : m;
        d = d < 10 ? '0' + d : d;
        h = h < 10 ? '0' + h : h;
        mi = mi < 10 ? '0' + mi : mi;
        return y + '-' + m + '-' + d + ' ' + h + ':' + mi;
    }

    function reply(box) {
        var textarea = box.getElementsByTagName('textarea')[0];
        var container = box.getElementsByClassName('comment-list')[0];
        var fragment = document.createDocumentFragment();
        var li = document.createElement('div');
        li.classList.add('comment-box');
        li.classList.add('clearfix');
        li.setAttribute('user', 'self');
        var liHtml = `<img class="myhead" src="images/my.jpg" alt=""/>
                        <div class="comment-content">
                            <p class="comment-text"><span class="user">我：</span> ${ textarea.value } </p>
                            <p class="comment-time">
                                ${ formatDate(new Date()) }
                                <a href="javascript:;" class="comment-praise" total="0" my="0">赞</a>
                                <a href="javascript:;" class="comment-operate">删除</a>
                            </p>
                        </div>`;
        li.innerHTML = liHtml;
        fragment.appendChild(li);
        container.appendChild(fragment);
        textarea.value = '';
        textarea.onblur();
    }

    //回复的赞
    function praiseReply(el) {
        var oldTotal = parseInt(el.getAttribute('total'));
        var my = parseInt(el.getAttribute('my'));
        var newTotal;
        if (!my) {
            newTotal = oldTotal + 1;
            el.setAttribute('total', newTotal);
            el.setAttribute('my', 1);
            el.innerHTML = newTotal + '取消赞';
        } else {
            newTotal = oldTotal - 1;
            el.setAttribute('total', newTotal);
            el.setAttribute('my', 0);
            el.innerHTML = newTotal == 0 ? '赞' : newTotal + '赞';
        }
        el.style.display = newTotal == 0 ? '' : 'inline-block';
    }

    //操作
    function operateReply(el) {
        var commentBox = el.parentNode.parentNode.parentNode;
        var box = commentBox.parentNode.parentNode.parentNode;
        var user = commentBox.getElementsByClassName('user')[0];
        var text = el.innerHTML;
        var textarea = box.getElementsByTagName('textarea')[0];
        if (text == '回复') {
            textarea.onfocus();
            textarea.value = '回复' + user.innerHTML;
            textarea.onkeyup();
        } else {
            removeNode(commentBox);
        }
    }
    for (var i = 0; i < lists.length; i++) {
        lists[i].addEventListener('click', function (e) {
            var e = e || window.event;
            var el = e.target || e.srcElement;

            switch (el.className) {
                case 'close':
                    removeNode(el.parentNode);
                    break;
                case 'praise':
                    praise(el, el.parentNode.parentNode.parentNode);
                    break;
                case 'btn btn-off':
                    clearTimeout(timer);
                    break;
                case 'btn':
                    reply(el.parentNode.parentNode.parentNode);
                    break;
                case 'comment-praise':
                    praiseReply(el);
                    break;
                case 'comment-operate':
                    operateReply(el);
                    break;
            }

        });
        var textarea = lists[i].getElementsByTagName('textarea')[0];
        textarea.onfocus = function () {
            this.parentNode.classList.add('text-box-on');
            this.value = this.value == '评论…' ? '' : this.value;
            this.onkeyup();
        };
        textarea.onblur = function () {
            var _this = this;
            timer = setTimeout(function () {
                if (_this.value == '') {
                    _this.parentNode.classList.remove('text-box-on');
                    _this.value = '评论…';
                }
            }, 200);
        }
        textarea.onkeyup = function () {
            var len = this.value.length;
            var childs = this.parentNode.children;
            var btn = childs[1];
            var word = childs[2];
            if (len == 0 | len > 140) {
                btn.classList.add('btn-off');
            } else {
                btn.classList.remove('btn-off');
            }
            word.innerHTML = len + '/140';
        };
    }
}