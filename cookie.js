/*functions about cookie*/
var MySetCookie = function(name, value) {
    var c = name + '=' + value;
    document.cookie = c;
};

var MyRemoveCookie = function(name) {
    MySetCookie(name, "", -1);
};

var MyGetCookie = function(name) {
    var allCookie = document.cookie.split('; ');
    var value = "";
    var oneCookie;
    for (let i = 0; i < allCookie.length; i++) {
        let oneCookie = allCookie[i].split('=');
        if (oneCookie[0] == name) {
            return oneCookie[1];
        }
    }
    return null;
};
