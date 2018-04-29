/* Adiciona todo o CSS necessário */
function addCss() {
	// A variavel 'style' é criada durante o processo de build
	// Ver arquivo app.js
	if (typeof style !== 'undefined') {
		$('body').append(style);
	}
}

/* Adiciona o html da modal */
function addModalHtml() {
	// A variavel 'modalHtml' é criada durante o processo de build
	// Ver arquivo app.js
	if (typeof modalHtml !== 'undefined') {
		$('body').append(modalHtml);
	}
}

/* Altera a logo da Pmweb */
function logoPmw() {
	//URL da nova logo
	var logo = "https://i.imgur.com/KYSi55p.png";
	
	//Mudando logo do header
	$('#navContent a img').attr("src",logo);

	//Adicionando a logo no footer
	$('.footerFirstLine .selo-lb').html("").append('<a href="/D/"><img src="'+ logo +'"></a>');

	//Altera texto do footer
	var footerTxt = $(".footerFirstLine p").first().text().replace("Let's Book", "Booking Engine");
	$(".footerFirstLine p").first().text(footerTxt);
}

/* Adiciona no breadcrumb a quantidade de hoteis disponiveis */
function hoteisDisponiveis() {
	var qtdDispovel = $("#listagemHoteisContent").children().length;
	if (qtdDispovel === 1) {
		$("a.caminho-pagina-passado").text("1 disponível.");
	} else if (qtdDispovel > 1) {
		$("a.caminho-pagina-passado").text(qtdDispovel + " disponíveis.");
	}
	$(".listDivider.caminho-pagina-passado").remove();
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
}

/* Ajusta o calendário */
function alteraCalendario() {
	//sobrescreve a função loadCalendarUm
	loadCalendarUm = function(date) {
    //Desabilita a flecha da esquerda caso o mes desta data seja o mês atual
    if (date.getMonth() == new Date().getMonth() && date.getFullYear() == new Date().getFullYear()) {
    	$(".arrow-left").css("pointer-events", "none").css("opacity", "0.2");
    } else {
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

  //Sobrescreve a função limparCalendario
	limparCalendario = function(){
		$(".celulaData").removeClass("startDate");
	  $(".celulaData").removeClass("endDate");
	  $(".celulaData").removeClass("inBetweenDate");
	  $(".celulaData").removeClass("voidDate");
	};
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
		var valido = true;
		criancasQtd = $("#criancas-quantidade-var").html();
		criancasVal = $("#var-busca-criancas").val();
		if (criancasVal && criancasQtd) {
			criancasVal = criancasVal.split(",");
			valido = criancasVal.length == criancasQtd ? true : false;
		}

		if ((criancasQtd && !criancasVal) || !valido) {
			$(".seletor-idade").addClass("invalid-idade");
			return false;
		} else if(valido) {
			$(".seletor-idade").removeClass("invalid-idade");
			$("#var-busca-tarifa").val("");
			$("#form-nova-busca").submit();
		}
	};
}

/* Pega o ID do hotel contido dentro da função de onclick */
function getHotelId(hotel) {
	var hotelNameAttr = $(hotel).find(".itemVarNomeHotel").attr('onclick'),
			hotelId = null;
	if (hotelNameAttr) {
		hotelId = hotelNameAttr.match(/\d+/)[0];
	}
	return hotelId;
}

/* Altera a listagem de hoteis para se adaptar ao novo layout */
function alteraHoteis() {
	//Altera a posição do valor auxiliar
	$(".itemVarValorAuxiliar").insertBefore(".itemVarValorFinal");
	
	//Percorre a listagem de hoteis
	$("#listagemHoteisContent").children().each(function(){
		var hotelId = getHotelId(this);
		if (hotelId) {
			var itemHotelContent = $(this).find(".itemHotelContent"),
					promoTxt = "Ver promoções do hotel",
					promoClass = "verPromocoesHotel";

			//Adiciona CTA 'Ver promoções do hotel'
			itemHotelContent.append('<span class="'+ promoClass +'" data-hotel-id="'+ hotelId +'">'+ promoTxt +'</span>');

			//Add imagem do tripadvisor
			$(this).find('.itemVarNomeHotel').after('<img src="https://i.imgur.com/O2GrxRa.png" class="imgTripadvisor">');
		
			if ($(this).find(".itemVarValorSemDesconto").length) {
				//Posição do botão 'Reservar'
				$(this).find(".itemBtnEfetuarReserva").css("margin-top", "-17px");
				//esconde valor aux se tiver valor sem desconto
				$(this).find(".itemVarValorAuxiliar").css("display", "none");
			}
		} else {
			//Esconde icone de localização caso seja vazio
			$(this).find(".icoEnderecoHotel").css("display", "none");
		}
	});

	//Requisita as promoções no click do CTA
	$(".verPromocoesHotel").click(function(){
		getHotelPromocoes($(this).attr('data-hotel-id'));
	});
}

/* Formata as promoções e adiciona na modal */
function formataPromocoes(promocoes) {
	//Zera lista de promocoes
	$(".modal-promocoes-lista").html("");

	//Percorre array de promoções
	for (var i = 0; i < promocoes.length; i++) {
		var promo = promocoes[i];

		//Descrição da promoção
		var promoDescricao = '<div class="promo-lista-descricoes">';
		for (var j = 0; j < promo.DescricaoTarifa.length; j++) {
			promoDescricao += '<span>- '+ promo.DescricaoTarifa[j] +'</span>';
		}
		promoDescricao += '</div>';

		//Valores da promoção
		var promoValores = '<div class="promo-valores">';
		if (promo.ValorTarifaSemDesconto) {
			promoValores += '<del>'+ promo.TipoMoeda +' '+ promo.ValorTarifaSemDesconto +'</del>';
			promoValores += '<span class="promo-valor promo-com-desconto">'+ promo.TipoMoeda +' '+ promo.ValorTarifa +'</span>';
		} else {
			promoValores += '<span class="promo-valor">'+ promo.TipoMoeda +' '+ promo.ValorTarifa +'</span>';
		}
		promoValores += '</div>';

		//templaye html da promoção
		var promoTemplate = '<li>'+
		'<strong>'+ promo.NomeTarifa +'</strong>'+
		'<span class="promo-btn-tooltip">?</span>'+
		'<div class="promo-tooltip">'+ promo.RegrasTarifa +'</div>'+
		promoDescricao+
		promoValores+
		'<a href="'+ promo.LinkPublico +'" class="promo-btn-reservar mcolor-action-btn">Reservar</a></li>';

		//Adiciona promoção na lista
		$(".modal-promocoes-lista").append(promoTemplate);
	}
}

/* abre/fecha modal de promoções */
function toggleModal() {
	$(".modal-promocoes").fadeToggle(400);
}

/* Adiciona evento para fechar a modal */
function modalClosevents() {
	$(".modal-promocoes-dialog").click(function(event) {
		if (!$(event.target).closest(".modal-promocoes-content").length) {
  		toggleModal();
  		//Zera lista de promocoes
			$(".modal-promocoes-lista").html("");
		}
	});
}

/* Requisita as promoções do hotel */
function getHotelPromocoes(id) {
	var url = 'https://www.pmweb.com.br/cro/promocoes/'+ id +'.json';
	$.get(url, function(data){
		formataPromocoes(data);
		toggleModal();
	});
}

/*
 * Chama as funções necessárias
 */
(function initFunctions() {
	console.info("Adicionando CSS...");
	addCss();
	console.info("Alterando Logo da Pmweb...");
	logoPmw();
	console.info("Quantidade de hóteis disoníveis...");
	hoteisDisponiveis();
	console.info("Juntando fields chegada/partida...");
	fieldPeriodo();
	console.info("Ajustando calendário...")
	alteraCalendario();
	console.info("Adicionando validação da idade das crianças...");
	validaIdadeCriancas();
	console.info("Ajustando listagem de hoteis...");
	alteraHoteis();
	console.info("Adicionando HTML da Modal de Promoções...");
	addModalHtml();
	modalClosevents();
	console.info("Done! Let's Book!");
})();