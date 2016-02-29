
function onSignIn(googleUser) {
    // Dados do Usuário
    var profile = googleUser.getBasicProfile();

    // Nome do Usuário
    var userName = profile.getName();

    // URL da Foto do Perfil
    var userPicture = profile.getImageUrl();

    $("#user-photo").attr("src", userPicture);
    $("#user-name").text(userName);
    $("#user-info").show();
    $("#center-menu-login").hide();
    $("#chat").show();
    $("#btn-sign-chat").show();
    $("#members").show();

};
