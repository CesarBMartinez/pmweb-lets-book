function addCss() {
	if (typeof style !== 'undefined') {
		$('body').append(style);
	}
}

function addModalHtml() {
	if (typeof modalHtml !== 'undefined') {
		$('body').append(modalHtml);
	}
}

addCss();
addModalHtml();

//Mudando logo do header
$('#navContent a img').attr("src","https://i.imgur.com/KYSi55p.png");

//Juntando os fields de partida e chegada
var dataSaida = $("#var-partida-pariodo-label").clone();
var labelNoites = "#var-periodo-label-noites";
var labelNoitesNew = "#var-periodo-label-noites-2";
var diarias = $(labelNoites).clone();

$(".chegada-field .busca-field-label").text("Período");
$("#var-chegada-periodo-label").after(dataSaida);
$(".chegada-field").append(diarias);
$("#var-partida-pariodo-label").after("<span id='var-periodo-label-noites-2'></span>");
calculaNoites();

/* chama a função calculaNoites sempre que o elemento #var-periodo-label-noites mudar */
$(labelNoites).bind('DOMNodeInserted DOMNodeRemoved',function(){
  calculaNoites();
});
$(".saida-field").remove();

//Sobrescreve a função limparCalendario
limparCalendario = function(){return;}

/* substitui a palavra 'diária(s)' por 'noite(s)' */
function calculaNoites() {
  var noitesTxt = $(labelNoites).text();
  noitesTxt = (noitesTxt.charAt(noitesTxt.length-1) === "s") ? noitesTxt.replace("diárias", "noites") : noitesTxt.replace("diária", "noite");
  
  if (noitesTxt) {
 	  $(labelNoitesNew).text("("+ noitesTxt + ")");
 	  $(labelNoitesNew).css("display","inline");
  } else {
  	$(labelNoitesNew).hide();
  }
}

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
	}
}
validaIdadeCriancas();