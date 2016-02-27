function onSignIn(response) {
	
	// Conseguindo as informações do seu usuário:
	var perfil = response.getBasicProfile();

	// Conseguindo o ID do Usuário
	var userID = perfil.getId();

	// Conseguindo o Nome do Usuário
	var userName = perfil.getName();

	// Conseguindo o E-mail do Usuário
	var userEmail = perfil.getEmail();

	// Conseguindo a URL da Foto do Perfil
	var userPicture = perfil.getImageUrl();

	$("#user-photo").attr("src", userPicture);
	$("#user-name").text(userName);
	$("#user-info").show();
	$("#center-menu-login").hide();
	$("#chat").show();
	$("#members").show();
	
	// Recebendo o TOKEN que você usará nas demais requisições à API:
	var LoR = response.getAuthResponse().id_token;
	console.log("~ le Tolkien: " + LoR);
};
