/* Adiciona todo o CSS necessário */
function addCss() {
	if (typeof style !== 'undefined') {
		$('body').append(style);
	}
}

/* Adiciona o html da modal */
function addModalHtml() {
	if (typeof modalHtml !== 'undefined') {
		$('body').append(modalHtml);
	}
}

/* Altera a logo da Pmweb */
function logo() {
	//URL da nova logo
	var logo = "https://i.imgur.com/KYSi55p.png";
	
	//Mudando logo do header
	$('#navContent a img').attr("src",logo);

	//Adicionando a logo no footer
	$('.footerFirstLine .selo-lb').html("").append('<a href="/D/"><img src="'+ logo +'"></a>');
}

/* substitui a palavra 'diária(s)' por 'noite(s)' */
function calculaNoites() {
	var labelNoitesNew = "#var-periodo-label-noites-2";
	var noitesTxt = $("#var-periodo-label-noites").text();
	noitesTxt = (noitesTxt.charAt(noitesTxt.length-1) === "s") ? noitesTxt.replace("diárias", "noites") : noitesTxt.replace("diária", "noite");

	if (noitesTxt) {
		$(labelNoitesNew).text("("+ noitesTxt + ")");
		$(labelNoitesNew).css("display","inline");
	} else {
		$(labelNoitesNew).hide();
	}
}

/* Junta os fields de partida e chegada */
function fieldPeriodo() {
	var dataSaida = $("#var-partida-pariodo-label").clone();
	var labelNoites = "#var-periodo-label-noites";
	var labelNoitesNew = "#var-periodo-label-noites-2";
	var diarias = $(labelNoites).clone();

	$(".chegada-field .busca-field-label").text("Período");
	$("#var-chegada-periodo-label").after(dataSaida);
	$(".chegada-field").append(diarias);
	$("#var-partida-pariodo-label").after("<span id='var-periodo-label-noites-2'></span>");
	
	calculaNoites();
	// chama a função calculaNoites sempre que o elemento #var-periodo-label-noites mudar
	$(labelNoites).bind('DOMNodeInserted DOMNodeRemoved',function(){
		calculaNoites();
	});

	//Remove campo de saida
	$(".saida-field").remove();

	//Sobrescreve a função limparCalendario
	limparCalendario = function(){return;};
}

function alteraCalendario() {
	//sobrescreve a função loadCalendarUm
	loadCalendarUm = function(date) {
    //Desabilita a flecha da esquerda caso o mes desta data seja o mês atual
    if (date.getMonth() == new Date().getMonth() && date.getFullYear() == new Date().getFullYear()) {
    	$(".arrow-left").css("pointer-events", "none").css("opacity", "0.2");
    }
    else {
    	$(".arrow-left").css("pointer-events", "").css("opacity", "1");
    }

    var dataMes = date.getMonth() + 1;
    var dataAno = date.getFullYear();

    //CARREGA O CALENDARIO
    $("#calendario-1").html(htmlCalendario(dataMes, dataAno));

    bindCalendarEvents();
    fillBestRates();
    calendarioExiste = true;
  }

  // Remove calendario 2
  $("#calendario-2").remove();
}

/* Valida se a idade das crianças foram preenchidas */
function validaIdadeCriancas() {
	var criancasQtd = $("#criancas-quantidade-var");
	var criancasVal = $("#var-busca-criancas").val();

	if (!criancasVal) {
		criancasQtd.html("");
	}
	$(".criancas-editar-label").click(function(){
		$("#criancas-quantidade-var").html("");
		return true;
	});

	//Sobrescreve função novaBusca, adicionando a validação da idade das crianças
	novaBusca = function() {
		criancasQtd = $("#criancas-quantidade-var").html();
		criancasVal = $("#var-busca-criancas").val();

		if (criancasQtd && !criancasVal) {
			alert("Selecione a idade das crianças");
			return false;
		} else {
			$("#var-busca-tarifa").val("");
			$("#form-nova-busca").submit();
		}
	};
}

/*
 * Chama as funções necessárias
 */
(function load() {
	addCss();
	logo();
	fieldPeriodo();
	alteraCalendario();
	validaIdadeCriancas();
	addModalHtml();
})();