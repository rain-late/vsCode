window.onload = function () {
    function $(id) {return document.getElementById(id)};
    var container = $('container'), list = $('list'), buttons = $('buttons').getElementsByTagName('span');
    var next = $('next'), prev = $('prev');
    var index = 1;
    var animated = false;
    var timer;

    function showBtn() {
        for (var i = 0; i < buttons.length; i++) {
            if (buttons[i].classList.contains('on')) {
                buttons[i].classList.remove('on');
                break;
            }
        }
        buttons[index - 1].classList.add('on');
    }

    function animate(offset) {
        animated = true;
        var newLeft = parseInt(list.style.left) + offset;
        var time = 300;
        var interval = 15;
        var speed = offset / (time / interval);
        function go() {
            if ((speed < 0 && parseInt(list.style.left) > newLeft) | (speed > 0 && parseInt(list.style.left) < newLeft)) {
                list.style.left = parseInt(list.style.left) + speed + 'px';
                setTimeout(go, interval);
            } else {
                animated = false;
                list.style.left = newLeft + 'px';
                if (newLeft > -600) {
                    list.style.left = -3000 + 'px';
                }
                if (newLeft < -3000) {
                    list.style.left = -600 + 'px';
                }
            }
        }
        go();
    }
    function autoPlay() {
        timer = setInterval(function () {
            next.onclick();
        }, 2000);
    }
    function stop() {
        clearInterval(timer);
    }
    next.onclick = function () {
        if (!animated) {
            if (index == 5) {
                index = 1;
            } else {
                index += 1;
            }
            showBtn();
            animate(-600);
        }
    }
    prev.onclick = function () {
        if (!animated) {
            if (index == 1) {
                index = 5;
            } else {
                index -= 1;
            }
            showBtn();
            animate(600);
        }
    }
    for (var i = 0; i < buttons.length; i++) {
        buttons[i].onclick = function () {
            if (this.classList.contains('on')) return;
            var newIndex = parseInt(this.getAttribute('index'));
            var offset = -600 * (newIndex - index);
            if (!animated) animate(offset);
            index = newIndex;
            showBtn();
        }
    }
    container.onmouseenter = stop;
    container.onmouseleave = autoPlay;
    autoPlay();
}