import '../../MyCss/indexCss/index.scss';
window.onload = function () {
    var userName = sessionStorage.username
    $('#homeusername').html(userName);
    if (!sessionStorage.token) {
        window.parent.location.href = "login.html";
    }
}