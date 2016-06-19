/*findview*/
var div_action = document.getElementById("div_action");
var div_actionBlock = document.getElementById("div_actionBlock");
var span_tip = document.getElementById("span_tip");
var div_tipClose = document.getElementById("div_tipClose");
var div_tip = document.getElementById("div_tip");
var span_placeholder = document.getElementById("span_placeholder");
var textarea_input = document.getElementById("textarea_input");
var div_go = document.getElementById("div_go");
var input_address = document.getElementById('input_address');
var div_mask = document.getElementById('div_mask');
var div_send = document.getElementById('div_send');
var div_inOther = {
    'div_block_app': document.getElementById('div_block_app'),
    'div_block_help': document.getElementById('div_block_help'),
    'div_block_setting': document.getElementById('div_block_setting'),
    'div_block_info': document.getElementById('div_block_info')
};
var nowInShowBlock;
var ws = null;
/*action*/
(function() {
    div_action.onclick = function() {
        if (div_mask.classList.contains('show')) {
            div_mask.classList.remove('show');
        } else {
            div_mask.classList.add('show');
        }
    };
    div_mask.onclick = function() {
        div_mask.classList.remove('show');
    }
})();
/*tip*/
(function() {
    div_tipClose.onclick = function() {
        if (div_tip.classList.contains('show')) {
            div_tip.classList.remove('show');
        }
    }
})();
/*editLayout*/
(function() {
    textarea_input.onfocus = function() {
        if (!span_placeholder.classList.contains('up')) {
            span_placeholder.classList.add('up');
        }
    };
})();
/*connect*/
(function() {
    div_go.onclick = function() {
        if (checkLink(input_address.value)) {
            MySetCookie('link', input_address.value);
            startWebSocket(input_address.value);
        } else {
            showTip(tip['errLink']);
        }
    };
    input_address.onkeypress = function() {
        if (event.keyCode == 13) {
            event.preventDefault();
            div_go.click();
        }
    };
})();
/*actionBox*/

(function() {
    var actions = document.querySelectorAll('#div_actionBlock>div');
    for (let i = 0; i < actions.length; i++) {
        actions[i].onclick = function() {
            if (nowInShowBlock) {
                div_inOther[nowInShowBlock].classList.remove('show');
            }
            nowInShowBlock = this.getAttribute('myBindBlock');
            div_inOther[nowInShowBlock].classList.add('show');
        };
    }
})();
/*send*/
(function() {
    div_send.onclick = function() {
        sendMsg(textarea_input.value);

    };
    textarea_input.onkeypress = function(event) {
        if (event.keyCode == 13) {
            if (!event.shiftKey) {
                event.preventDefault();
                sendMsg(textarea_input.value); //异步的要放在后面
            }
        }
    };
})();
window.onload = function() {
    var link = MyGetCookie('link');
    if (link != null) {
        input_address.value = link;
    }
    nowInShowBlock = 'div_block_app';
};

function sendMsg(s) {
    if (ws && ws.readyState) {
        ws.send(s);
        textarea_input.value = '';
    } else {
        showTip(tip['socketNoCreate']);

    }
}

function showTip(tip) {
    if (!div_tip.classList.contains('show')) {
        div_tip.classList.add('show');
    }
    span_tip.innerHTML = tip;

}
var tip = {
    'connecting': 'connecting',
    'errLink': 'ip或端口错误',
    'connected': '已连接',
    'errInConnecting': '连接时出现错误',
    'errInCreateSocket': '创建socket时出现错误',
    'socketNoCreate': 'socket还未创建'

}

function startWebSocket(link) {
    try {
        ws = new WebSocket('ws://' + link);
        showTip(tip['connecting']);
        ws.onopen = function() {
            showTip(tip['connected']);
        };
        ws.onerror = function() {
            showTip(tip['errInConnecting']);
        };
    } catch (err) {
        showTip(tip['errInCreateSocket']);
    }
}

function checkLink(link) {
    return true;
}
