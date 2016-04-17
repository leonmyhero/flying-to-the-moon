function makeRoundNumber(num) {
	if(num>1000000) {
    	num = (num/1000000)+'m';
    }
    else if(num>1000) {
    	num = Math.round((num/1000))+'k';
    }
    return num;
}

$('.webapp-switch').on('click',function() {
	$('.webappbutton').hide();
	$('.builderbutton').show();
	webApp();
});
$('.builder-switch').on('click',function() {
	$('.builderbutton').hide();
	$('.webappbutton').show();
	builder();
});
$('.purechem').on('click',function() {
	$("#purechemplayers").append('<li id="chemplayerloading"><i class="icon-spinner icon-spin"></i> Loading...</li>');
    $.each(links[formation][$('input[name=currentplayer]').val()],function(key2,val2) {
            if($('#card'+val2).hasClass('filled')) {
               $.getJSON('/'+sitelanguage+'/perfect/'+$('#card'+val2).attr('data-player-club')+'/'+$('#card'+val2).attr('data-player-nation')+'/'+$('#player'+$('input[name=currentplayer]').val()).attr('data-player-position')+'/'+$('input[name=player'+val2+'-line]').val(),function(data) {
               	if(data != '') {
               		$.each(data, function(key, val) {
               			if($('#chemplayer'+val.lineid).length == 0) {
						$('#purechemplayers').children('#chemplayernoresults').remove();
               				$("#purechemplayers").append('<li id="chemplayer'+val.lineid+'" class="purechemplayer '+val.ddclass+'"><a href="Javascript:;" onclick="putPlayer('+val.lineid+',\''+val.name+'\',\''+val.position+'\','+val.league+','+val.nation+','+val.club+','+val.pid+','+val.rating+','+val.att1+','+val.att2+','+val.att3+','+val.att4+','+val.att5+','+val.att6+',\''+val.cardtype+'\',\''+val.workrates+'\',0,0,0,\''+val.leaguename+'\',\''+val.teamname+'\','+val.rare+')"><img src="http://www.futwiz.com/assets/img/fifa16/faces/'+val.pid+'.png" width="20" class="playerList-face" /> <img src="http://www.futwiz.com/assets/img/fifa16/badges/'+val.club+'.png" width="20" class="playerList-badge" /> <div class="playerList-name">'+val.cardname+'</div> <span class="label playerList-rating">'+val.rating+'</span> <img src="http://www.futwiz.com/assets/img/fifa16/flags/'+val.nation+'.png" width="20" class="playerList-flag" /> <div class="playerList-position">'+val.position+'</div> </a></li>');
               			}
               		});
               	}
               });
            }
    });
	setTimeout(
		function() {
			if($("#purechemplayers").length >= 1) {
				if($('#purechemplayers').children('.purechemplayer').length == 0) {
					$('#purechemplayers').children('#chemplayerloading').remove();
					$("#purechemplayers").append('<li id="chemplayernoresults">There were no results</li>');
				}
				else {
					$('#purechemplayers').children('#chemplayerloading').remove();
				}
			}
			else {
				$('#purechemplayers').children('#chemplayerloading').remove();
				$("#purechemplayers").append('<li id="chemplayernoresults">There were no results</li>');
			}
		},1500);
});


var formation = 352;
var s1 = '';
var s2 = '';
var alllinks = Array();
var totallinks = Array();
var links = {4231:{0:[2,3],1:[2,5],2:[0,1,3,5],3:[0,2,4,6],4:[3,6],5:[1,2,7,9],6:[3,4,8,9],7:[5,9,10],8:[6,9,10],9:[5,6,7,8,10],10:[7,8,9]},5212:{0:[2,3,4],1:[2,6],2:[0,1,3],3:[0,2,4,6,7],4:[0,3,5],5:[4,7],6:[1,3,7,8,9],7:[3,5,6,8,10],8:[6,7,9,10],9:[6,8,10],10:[7,8,9]},3412:{0:[1,2,3],1:[0,2,4],2:[0,1,3,5,6],3:[0,2,7],4:[1,5,9],5:[2,4,6,8],6:[2,5,7,8],7:[3,6,10],8:[5,6,9,10],9:[4,8,10],10:[7,8,9]},3421:{0:[1,2,3],1:[0,2,4],2:[0,1,3,5,6],3:[0,2,7],4:[1,5,8],5:[2,4,6,8],6:[2,5,7,9],7:[3,6,9],8:[4,5,10],9:[6,7,10],10:[8,9]},343:{0:[1,2,3],1:[0,2,4],2:[0,1,3,5,6],3:[0,2,7],4:[1,5,8],5:[2,4,6,9],6:[2,5,7,9],7:[3,6,10],8:[4,9],9:[5,6,8,10],10:[7,9]},352:{0:[1,2,3],1:[0,2,4,6],2:[0,1,3,4,5],3:[0,2,5,7],4:[1,2,5,6,8],5:[2,3,4,7,8],6:[1,4,9],7:[3,5,10],8:[4,5,9,10],9:[6,8,10],10:[7,8,9]},41212:{0:[2,3],1:[2,6],2:[0,1,3,5],3:[0,2,4,5],4:[3,7],5:[2,3,6,7,8],6:[1,5,8,9],7:[4,5,8,10],8:[5,6,7,9,10],9:[6,8,10],10:[7,8,9]},4222:{0:[2,3],1:[2,7],2:[0,1,3,5],3:[0,2,4,6],4:[3,8],5:[2,6,7,9],6:[3,5,8,10],7:[1,5,9],8:[4,6,10],9:[5,7,10],10:[6,8,9]},4312:{0:[2,3],1:[2,5],2:[0,1,3,5,6],3:[0,2,4,6,7],4:[3,7],5:[1,2,6,9],6:[2,3,5,7,8],7:[3,4,6,10],8:[6,9,10],9:[5,8,10],10:[7,8,9]},4321:{0:[2,3],1:[2,5],2:[0,1,3,5],3:[0,2,4,7],4:[3,7],5:[1,2,6,8],6:[5,7,8,9],7:[3,4,6,9],8:[5,6,10],9:[6,7,10],10:[8,9]},433:{0:[2,3],1:[2,5],2:[0,1,3,6],3:[0,2,4,6],4:[3,7],5:[1,6,8],6:[2,3,5,7,9],7:[4,6,10],8:[5,9],9:[6,8,10],10:[7,9]},4411:{0:[2,3],1:[2,5],2:[0,1,3,6],3:[0,2,4,7],4:[3,8],5:[1,6,10],6:[2,5,7,9],7:[3,6,8,9],8:[4,7,10],9:[6,7,10],10:[5,9,8]},442:{0:[2,3],1:[2,5],2:[0,1,3,6],3:[0,2,4,7],4:[3,8],5:[1,6,9],6:[2,5,7,9],7:[3,6,8,10],8:[4,7,10],9:[5,6,10],10:[7,8,9]},451:{0:[2,3],1:[2,5],2:[0,1,3,6],3:[0,2,4,6],4:[3,7],5:[1,8],6:[2,3,8,9],7:[4,9],8:[5,6,9,10],9:[6,7,8,10],10:[8,9]},5221:{0:[2,3,4],1:[2,6,8],2:[0,1,3],3:[0,2,4,6,7],4:[0,3,5],5:[4,7,9],6:[1,3,7,8,10],7:[3,5,6,9,10],8:[1,6,10],9:[5,7,10],10:[6,7,8,9]},532:{0:[2,3,4],1:[2,6],2:[0,1,3,6],3:[0,2,4,7],4:[0,3,5,8],5:[4,8],6:[1,2,7,9],7:[3,6,8,9,10],8:[4,5,7,10],9:[6,7,10],10:[7,8,9]},'41212-2':{0:[2,3],1:[2,6],2:[0,1,3,5],3:[0,2,4,5],4:[3,7],5:[2,3,6,7,8],6:[1,5,8,9],7:[4,5,8,10],8:[5,6,7,9,10],9:[6,8,10],10:[7,8,9]},'4231-2':{0:[2,3],1:[2,5,7],2:[0,1,3,5],3:[0,2,4,6],4:[3,6,8],5:[1,2,7,9],6:[3,4,8,9],7:[1,5,9,10],8:[4,6,9,10],9:[5,6,7,8,10],10:[7,8,9]},4141:{0:[2,3],1:[2,6],2:[0,1,3,7],3:[0,2,4,8],4:[3,9],5:[2,3,7,8],6:[1,7,10],7:[2,5,6,8,10],8:[3,5,7,8,10],9:[4,8,10],10:[9,6,7,8]},'433-2':{0:[2,3],1:[2,5],2:[0,1,3,6],3:[0,2,4,6],4:[3,7],5:[1,6,7,8,9],6:[2,3,5,7],7:[4,5,6,9,10],8:[5,9],9:[5,7,8,10],10:[7,9]},'433-3':{0:[2,3],1:[2,5],2:[0,1,3,5],3:[0,2,4,7],4:[3,7],5:[1,2,6,8],6:[5,7,9],7:[3,4,6,10],8:[5,9],9:[6,8,10],10:[7,9]},'433-4':{0:[2,3],1:[2,5,8],2:[0,1,3,5],3:[0,2,4,7],4:[3,7,10],5:[1,2,6,8],6:[5,7,9],7:[3,4,6,10],8:[1,5,9],9:[6,8,10],10:[4,7,9]},'433-5':{0:[2,3],1:[2,5,8],2:[0,1,3,6],3:[0,2,4,6],4:[3,7,10],5:[1,6,8,9],6:[2,3,5,7],7:[4,6,9,10],8:[1,5,9],9:[5,7,8,10],10:[4,7,9]},'442-2':{0:[2,3],1:[2,5],2:[0,1,3,6],3:[0,2,4,7],4:[3,8],5:[1,6,9],6:[2,5,7,9],7:[3,6,8,10],8:[4,7,10],9:[5,6,10],10:[7,8,9]},'451-2':{0:[2,3],1:[2,5,6],2:[0,1,3,6,7],3:[0,2,4,8,7],4:[3,8,9],5:[1,6,10],6:[1,2,5,7],7:[2,3,6,8,10],8:[3,4,7,9],9:[4,8,10],10:[5,7,9]}};
var positionbonus = Array(0.5,1.5,2.5,3);
var linkbonus = Array(0.9,2,3,3.5);
var canvas = document.getElementById('chemlines');
var context = canvas.getContext('2d');
var squadrating = 0;
var ps3price = 0;
var xboxprice = 0;
var pcprice = 0;
var ps3price1 = 0;
var xboxprice1 = 0;
var pcprice1 = 0;
var pcprice2 = 0;
var ps3price2 = 0;
var xboxprice2 = 0;
var ps3pricem = 0;
var xboxpricem = 0;
var pcpricem = 0;
var ps3price1m = 0;
var xboxprice1m = 0;
var pcprice1m = 0;
var pcprice2m = 0;
var ps3price2m = 0;
var xboxprice2m = 0;
var avgrating = 0;
var avgpace = 0;
var avgshot = 0;
var avgpass = 0;
var avgdrib = 0;
var avgdef = 0;
var avgheading = 0;
var totalplayers = 0;
var manager_league = 0;
var manager_nation = 0;
var avgatt = 0;
var avgmid = 0;
var avgadef = 0;
function doChem() {
	squadrating = 0;
	ps3price = 0;
	xboxprice = 0;
	pcprice = 0;
	ps3price1 = 0;
	xboxprice1 = 0;
	pcprice1 = 0;
	ps3pricem = 0;
	xboxpricem = 0;
	pcpricem = 0;
	ps3price1m = 0;
	xboxprice1m = 0;
	pcprice1m = 0;
	totalplayers = 0;
	avgrating = 0;
	avgpace = 0;
	avgshot = 0;
	avgpass = 0;
	avgdrib = 0;
	avgdef = 0;
	avgheading = 0;
	avgatt = 0;
	avgmid = 0;
	avgadef = 0;
	if($('#manager').length > 0) {
		if($('#manager').attr('data-manager-league') != '') {
			manager_league = $('#manager').attr('data-manager-league');
		}
		if($('#manager').attr('data-manager-nation') != '') {
			manager_nation = $('#manager').attr('data-manager-nation');
		}
	}
	$.each(links[formation],function(key,val) {
        var totallinks = 0;
        var total = 0;
        $.each(links[formation][key],function(key2,val2) {
                if($('#card'+val2).hasClass('filled')) {
                        totallinks++;
                }
        });
        $.each(links[formation][key],function(key2,val2) {
            if($('#card'+val2).hasClass('filled')) {
            	var sl = 0;
            	var sc = 0;
            	var sn = 0;
                    if($('#card'+key).attr('data-player-league') == $('#card'+val2).attr('data-player-league') || $('#card'+val2).attr('data-player-club') == 112658 || $('#card'+key).attr('data-player-club') == 112658) {
                            total+= ((1/totallinks))*3;
                            sl = 1;
                    }
                    if($('#card'+key).attr('data-player-club') == $('#card'+val2).attr('data-player-club')) {
                            total+= ((1/totallinks))*3;
                            sc = 1;
                    }
                    if($('#card'+key).attr('data-player-nation') == $('#card'+val2).attr('data-player-nation')) {
                            total+= ((1/totallinks))*3;
                            sn = 1;
                    }
                    if(sc == 1) {
                    	var bcolor = '#4dde65';
                    }
                   
else if(sn == 1 && sc == 0 && sl == 0) {
                    	var bcolor = '#ff9900';
                    }
                   
else if(sn == 1 && sc == 0 && sl == 1) {
                    	var bcolor = '#4dde65';
                    }
                   
else if(sl == 1) {
                    	var bcolor = '#e19400';
                    }
                    else {
                    	var bcolor = '#9f1918';
                    }
            }
            else {
            	var bcolor = '#9f1918';
            }
			var mainw = $("#player"+key).width();
			var mainh= $("#player"+key).height();
			var maincx = $("#player"+key).position().left;
			var maincy = $("#player"+key).position().top;
			maincx = maincx + (mainw/2);
			maincy = maincy + mainh - 10;
			var linkw = $("#player"+val2).width();
			var linkh= $("#player"+val2).height();
			var linkcx = $("#player"+val2).position().left;
			var linkcy = $("#player"+val2).position().top;
			linkcx = linkcx + (linkw/2);
			linkcy = linkcy + linkh - 10;
			if($("#player"+key).position().left >= 472 && $("#player"+key).position().left <= 473.5) {
				maincx = 478;
			}
			if($("#player"+val2).position().left >= 472 && $("#player"+val2).position().left <= 473.5) {
				linkcx = 478;
			}
			if(maincx == 540.5 || maincx == 539.5 || maincx == 540 || maincx == 534.5 || maincx == 542.5) {
				maincx = 478;
			}
			if(linkcx == 540.5 || linkcx == 539.5 || linkcx == 540 || linkcx == 534.5 || linkcx == 542.5) {
				linkcx = 478;
			}
			context.beginPath();
			context.moveTo(linkcx,linkcy);
			context.lineTo(maincx,maincy);
			context.closePath();
			context.lineWidth = 7;
			context.strokeStyle = '#444444';
			context.stroke();
			context.beginPath();
			context.moveTo(linkcx,linkcy);
			context.lineTo(maincx,maincy);
			context.closePath();
			context.lineWidth = 5;
			context.strokeStyle = bcolor;
			context.stroke();
        });

		var posBonus = positionbonus[parseInt(positions[$("#card"+key).children('#playerposition').html()+':'+$("#player"+key).attr('data-player-position')])];


		if(total > 2.99 && total <= 3) {
			total = 3;
		}
		
		if(total >= 5) {
			total = 3;
		}
        else {
			if(total >= 3 && total < 5) {
				total = 2;
			}
			else {
				if(total >= 1 && total < 3) {
					total = 1;
				}
                else {
					total = 0;
				}
			}
		}

		var chem = parseInt((posBonus*linkbonus[total]).toFixed(0));

        if($('#card'+key).attr('data-player-league') == manager_league) {
        	chem+=1
        }
        else {
        	if($('#card'+key).attr('data-player-nation') == manager_nation) {
        		chem+=1;
        	}
        }
        if($('#card'+key).attr('data-loyalty') == 1) {
        	chem+=1;
        	if($('#card'+key).hasClass('card-16-builder-gold-if') == true || $('#card'+key).hasClass('card-16-builder-silver-if') == true || $('#card'+key).hasClass('card-16-builder-bronze-if') == true || $('#card'+key).hasClass('card-16-builder-blue') == true) {
        		$('#chem'+key).removeAttr('style');
        	}
        	else {
        		$('#chem'+key).css('color','#000000');
        	}
        }
        else {
        	$('#chem'+key).css('color','#ff0000');
        }

		if(chem > 10) {
			chem = 10;
		}
		if(chem < 0) {
			chem = 0;
		}

		if($('#card'+key).hasClass('filled')) {
			$('input[name=player'+key+'-chemistry]').val(chem);
			$('#chem'+key).html('Chem: '+chem);
		}
	});
	$.each(links[formation],function(key,val) {
	    $.each(links[formation][key],function(key2,val2) {
			var chem = $('input[name=player'+key+'-chemistry]').val();
			if(chem <= 4 || chem == '') {
	            var bcolor = '#9f1918';
			}
			else if(chem >= 5 && chem <= 6) {
	            var bcolor = '#e19400';
			}
			else {
	            var bcolor = '#4dde65';
			}
			var mainw = $("#player"+key).width();
			var mainh= $("#player"+key).height();
			var maincx = $("#player"+key).position().left;
			var maincy = $("#player"+key).position().top;
			maincx = maincx + (mainw/2);
			maincy = maincy + mainh;

			if($("#player"+key).position().left >= 472 && $("#player"+key).position().left <= 473.5) {
				maincx = 478;
			}
			if(maincx == 540.5 || maincx == 539.5 || maincx == 540 || maincx == 534.5 || maincx == 542.5) {
				maincx = 478;
			}
			context.beginPath();
			var numberOfSides = 6,
			    size = 12,
			    Xcenter = (maincx),
			    Ycenter = (maincy-5);
			context.moveTo (Xcenter +  (size+10) * Math.cos(0), Ycenter +  size *  Math.sin(0));          

			for (var i = 1; i <= numberOfSides;i += 1) {
			    context.lineTo (Xcenter + (size+10) * Math.cos(i * 2 * Math.PI / numberOfSides), Ycenter + size * Math.sin(i * 2 * Math.PI / numberOfSides));
			}
			context.fillStyle = bcolor;
			context.fill();
			context.lineWidth = 1;
			context.strokeStyle = '#444444';
			context.stroke();
		});
	});
	var totalchem = 0;
	$.each(links[formation],function(key,val) {
		totalchem+=parseInt($('input[name=player'+key+'-chemistry]').val());
	});
	if(totalchem > 100) {
		totalchem = 100;
	}
	$("#totalchemistry").html(totalchem);
	$("#totalchem").val(totalchem);
	var subchem = parseInt($("#totalchemistry").html());
	subchem = Math.round(subchem/11);
	for(var i=11;i<18;i++) {
		if($('#card'+i).hasClass('filled')) {
			$('input[name=player'+$('input[name=currentplayer]').val()+'-chemistry]').val(subchem);
			$('#chem'+i).html('Chem: '+subchem);
		}
	}
	for(var i=0;i<18;i++) {
		if($('#card'+i).hasClass('filled')) {
			ps3price+=parseInt($("#card"+i).attr('data-ps3'));
			pcprice+=parseInt($("#card"+i).attr('data-pc'));
			xboxprice+=parseInt($("#card"+i).attr('data-xbox'));
			ps3pricem+=parseInt($("#card"+i).attr('data-ps3m'));
			pcpricem+=parseInt($("#card"+i).attr('data-pcm'));
			xboxpricem+=parseInt($("#card"+i).attr('data-xboxm'));
		}
	}
	for(var i=0;i<11;i++) {
		if($('#card'+i).hasClass('filled')) {
			ps3price1+=parseInt($("#card"+i).attr('data-ps3'));
			pcprice1+=parseInt($("#card"+i).attr('data-pc'));
			xboxprice1+=parseInt($("#card"+i).attr('data-xbox'));
			ps3price1m+=parseInt($("#card"+i).attr('data-ps3m'));
			pcprice1m+=parseInt($("#card"+i).attr('data-pcm'));
			xboxprice1m+=parseInt($("#card"+i).attr('data-xboxm'));
		}
	}
	for(var i=11;i<18;i++) {
		if($('#card'+i).hasClass('filled')) {
			ps3price2+=parseInt($("#card"+i).attr('data-ps3'));
			pcprice2+=parseInt($("#card"+i).attr('data-pc'));
			xboxprice2+=parseInt($("#card"+i).attr('data-xbox'));
			ps3price2m+=parseInt($("#card"+i).attr('data-ps3m'));
			pcprice2m+=parseInt($("#card"+i).attr('data-pcm'));
			xboxprice2m+=parseInt($("#card"+i).attr('data-xboxm'));
		}
	}
	for(var i=0;i<18;i++) {
		if($('#card'+i).hasClass('filled')) {
		  squadrating+=parseInt($("#card"+i).children('#playerrating').html());
		}
	}
	for(var i=1;i<11;i++) {
		if($('#card'+i).hasClass('filled')) {
			totalplayers++;
			avgrating+=parseInt($("#card"+i).children('#playerrating').html());
			avgpace+=parseInt($("#card"+i).children('.card-16-builder-atts').children('.card-16-builder-atts1').children('#playeratt1').html());
			avgshot+=parseInt($("#card"+i).children('.card-16-builder-atts').children('.card-16-builder-atts2').children('#playeratt2').html());
			avgpass+=parseInt($("#card"+i).children('.card-16-builder-atts').children('.card-16-builder-atts3').children('#playeratt3').html());
			avgdrib+=parseInt($("#card"+i).children('.card-16-builder-atts').children('.card-16-builder-atts1').children('#playeratt4').html());
			avgdef+=parseInt($("#card"+i).children('.card-16-builder-atts').children('.card-16-builder-atts2').children('#playeratt5').html());
			avgheading+=parseInt($("#card"+i).children('.card-16-builder-atts').children('.card-16-builder-atts3').children('#playeratt6').html());
		}
	}
	if(avgrating > 0) {
		$('#avgrating').html(Math.floor(avgrating/totalplayers));
		$('#avgratingbar').css('width',Math.floor(avgrating/totalplayers)+'%');
	}
	else {
		$('#avgrating').html(0);
		$('#avgratingbar').css('width','0%');
	}

	if(avgpace > 0) {
		$('#avgatt1').html(Math.floor(avgpace/totalplayers));
		$('#avgattbar1').css('width',Math.floor(avgpace/totalplayers)+'%');
	}
	else {
		$('#avgatt1').html(0);
		$('#avgattbar1').css('width','0%');
	}
	if(avgshot > 0) {
		$('#avgatt2').html(Math.floor(avgshot/totalplayers));
		$('#avgattbar2').css('width',Math.floor(avgshot/totalplayers)+'%');
	}
	else {
		$('#avgatt2').html(0);
		$('#avgattbar2').css('width','0%');
	}
	if(avgpass > 0) {
		$('#avgatt3').html(Math.floor(avgpass/totalplayers));
		$('#avgattbar3').css('width',Math.floor(avgpass/totalplayers)+'%');
	}
	else {
		$('#avgatt3').html(0);
		$('#avgattbar3').css('width','0%');
	}
	if(avgdrib > 0) {
		$('#avgatt4').html(Math.floor(avgdrib/totalplayers));
		$('#avgattbar4').css('width',Math.floor(avgdrib/totalplayers)+'%');
	}
	else {
		$('#avgatt4').html(0);
		$('#avgattbar4').css('width','0%');
	}
	if(avgdef > 0) {
		$('#avgatt5').html(Math.floor(avgdef/totalplayers));
		$('#avgattbar5').css('width',Math.floor(avgdef/totalplayers)+'%');
	}
	else {
		$('#avgatt5').html(0);
		$('#avgattbar5').css('width','0%');
	}
	if(avgheading > 0) {
		$('#avgatt6').html(Math.floor(avgheading/totalplayers));
		$('#avgattbar6').css('width',Math.floor(avgheading/totalplayers)+'%');
	}
	else {
		$('#avgatt6').html(0);
		$('#avgattbar6').css('width','0%');
	}
	var ttlrating = Math.floor(squadrating / 18);
	for(var i=0;i<18;i++) {
	if($('#card'+i).hasClass('filled')) {
	  if(parseInt($("#card"+i).children('#playerrating').html()) > ttlrating) {
	    if(i < 11) {
	      squadrating+=(parseInt($("#card"+i).children('#playerrating').html())-ttlrating);
	    }
	    else {
	      squadrating+=Math.floor((parseInt($("#card"+i).children('#playerrating').html())-ttlrating)/2);
	    }
	  }
	}
	}
	var ttlrating = Math.floor(squadrating/18);
	if(ttlrating <= 1) { var stars = '0'; }
	else if(ttlrating <= 56) { var stars = '05'; }
	else if(ttlrating <= 59) { var stars = '1'; }
	else if(ttlrating <= 61) { var stars = '15'; }
	else if(ttlrating <= 63) { var stars = '2'; }
	else if(ttlrating <= 65) { var stars = '25'; }
	else if(ttlrating <= 69) { var stars = '3'; }
	else if(ttlrating <= 73) { var stars = '35'; }
	else if(ttlrating <= 76) { var stars = '4'; }
	else if(ttlrating <= 80) { var stars = '45'; }
	else if(ttlrating > 80) { var stars = '5'; }
	$('#totalsquadrating').html(ttlrating);
	$('#squadrating').val(ttlrating);
	$('#starrating').val(stars);
	$('#squadstars').html('<img src="http://www.futwiz.com/assets/img/fifa16/builder/squad-'+stars+'.png" width="100" />');
	$('#totalxbox').val(xboxprice);
	$('#totalps3').val(ps3price);
	$('#totalpc').val(pcprice);
	$('#totalxbox0').html(sexynumber(xboxprice));
	$('#totalps30').html(sexynumber(ps3price));
	$('#totalpc0').html(sexynumber(pcprice));
	$('#totalxbox1').html(makeRoundNumber(xboxprice1));
	$('#totalps31').html(makeRoundNumber(ps3price1));
	$('#totalpc1').html(makeRoundNumber(pcprice1));
	$('#totalxbox2').html(sexynumber(xboxprice2));
	$('#totalps32').html(sexynumber(ps3price2));
	$('#totalpc2').html(sexynumber(pcprice2));
	$('#totalxboxm').val(xboxpricem);
	$('#totalps3m').val(ps3pricem);
	$('#totalpcm').val(pcpricem);
	$('#totalxbox0m').html(makeRoundNumber(xboxpricem));
	$('#totalps30m').html(makeRoundNumber(ps3pricem));
	$('#totalpc0m').html(makeRoundNumber(pcpricem));
	$('#totalxbox1m').html(makeRoundNumber(xboxprice1m));
	$('#totalps31m').html(makeRoundNumber(ps3price1m));
	$('#totalpc1m').html(makeRoundNumber(pcprice1m));
	$('#totalxbox2m').html(makeRoundNumber(xboxprice2m));
	$('#totalps32m').html(makeRoundNumber(ps3price2m));
	$('#totalpc2m').html(makeRoundNumber(pcprice2m));
}

$(".addplayer").click(function () {
	$('#builder-favourites').html('');
	$('#builder-perfect').html('');
	$('#builder-strong').html('');
	$('.builder-strong-head').html('<h4 class="pull-left" style="margin: 0px;color: #FFFFFF;">Strong Chemistry</h4><div class="pull-right" id="stronglinktab"></div><hr style="margin-top: 5px;margin-bottom: 5px;">');
	$('#stronglinktab').html('<span style="color:#fff;">Strong links for: </span>');
	$('.builder-perfect-head').html('<h4 class="pull-left" style="margin: 0px;color: #FFFFFF;">Perfect Chemistry</h4><div class="pull-right" id="perfectlinktab"></div><hr style="margin-top: 5px;margin-bottom: 5px;">');
	$('#perfectlinktab').html('<span style="color:#fff;">Perfect links for: </span>');
	$('#purechemplayers').html('');
	$('#buildermodal').modal('show');
	$('#squadplayers').focus();
	$('input[name=currentplayer]').val($(this).parent().attr("data-player-position-id"));
	$.get('/en/favourite/get/'+$(this).parent().attr("data-player-position"),function(data) {
		$('#builder-card-preview').html('');
		$('#builder-card-preview-text').html('');
		$('#builder-favourites').html(data+'<div class="clearfix"></div>');
	});

	var checkPos = $(this).parent().attr("data-player-position");
	var curSelP = $(this).parent().attr("data-player-position-id");
    $.each(links[formation][curSelP],function(key2,val2) {
        if($('#card'+val2).hasClass('filled')) {
        	checkNation = $('#card'+val2).attr("data-player-nation");
        	checkLeague = $('#card'+val2).attr("data-player-league");
        	checkClub = $('#card'+val2).attr("data-player-club");
        	checkLine = $('input[name=player'+val2+'-line]').val();
        	$('#perfectlinktab').html($('#perfectlinktab').html()+'<a href="Javascript:;" class="allPerfLinks" onclick="$(\'.allPerfLinks\').attr(\'class\',\'allPerfLinks\');$(this).attr(\'class\',\'allPerfLinks allPerfLinksBold\');showPerfectLink(\'perfect'+$('input[name=player'+val2+'-line]').val()+'\');">'+$('#card'+val2).children("#playername").html()+'</a>');
        	$.get('/en/perfect/'+checkClub+'/'+checkNation+'/'+checkPos+'/'+checkLine,function(data) {
				$('#builder-card-preview').html('');
				$('#builder-card-preview-text').html('');
				$('#builder-perfect').html($('#builder-perfect').html()+'<div class="perfectblock perfect'+$('input[name=player'+val2+'-line]').val()+'" style="overflow-x:auto;;overflow-y:hidden;">'+data+'</div><div class="clearfix"></div>');
				setTimeout("setPerfectWidth('perfect"+$('input[name=player'+val2+'-line]').val()+"')",1000);
        	});
        }
    });
    $.each(links[formation][curSelP],function(key2,val2) {
        if($('#card'+val2).hasClass('filled')) {
        	checkNation = $('#card'+val2).attr("data-player-nation");
        	checkLeague = $('#card'+val2).attr("data-player-league");
        	checkClub = $('#card'+val2).attr("data-player-club");
        	checkLine = $('input[name=player'+val2+'-line]').val();
        	$('#stronglinktab').html($('#stronglinktab').html()+'<a href="Javascript:;" class="allStrongLinks" onclick="$(\'.allStrongLinks\').attr(\'class\',\'allPerfLinks\');$(this).attr(\'class\',\'allStrongLinks allPerfLinksBold\');showStrongLink(\'strong'+$('input[name=player'+val2+'-line]').val()+'\');">'+$('#card'+val2).children("#playername").html()+'</a>');
        	$.get('/en/strong/'+checkClub+'/'+checkNation+'/'+checkPos+'/'+checkLine+'/'+checkLeague,function(data) {
				$('#builder-card-preview').html('');
				$('#builder-card-preview-text').html('');
				$('#builder-strong').html($('#builder-strong').html()+'<div class="strongblock strong'+$('input[name=player'+val2+'-line]').val()+'" style="overflow-x:auto;;overflow-y:hidden;">'+data+'</div><div class="clearfix"></div>');
				setTimeout("setStrongWidth('strong"+$('input[name=player'+val2+'-line]').val()+"')",1000);
        	});
        }
    });
	if($(this).parent().attr("data-player-position-id") >= 11) {
		$('.purechem').hide();
	}
	else {
		$('.purechem').show();
	}
});
function showPerfectLink(classN) {
	$('.perfectblock').hide();
	$('.'+classN).show();
}
function setPerfectWidth(classN) {
    var curw = 135;
    $('.'+classN+' .perfectchemplayer').each(function() {
		curw+=135;
	});
	$('.'+classN).css('width',curw+'px');
}
function showStrongLink(classN) {
	$('.strongblock').hide();
	$('.'+classN).show();
}
function setStrongWidth(classN) {
    var curw = 135;
    $('.'+classN+' .strongchemplayer').each(function() {
		curw+=135;
	});
	$('.'+classN).css('width',curw+'px');
}
$(".addmanager").click(function () {
	$('#managermodal').modal('show');
	$('#squadplayers').focus();
});
$("#builderholder").on('click','.replaceplayer',function () {
	$('#builder-favourites').html('');
	$('#builder-perfect').html('');
	$('#builder-strong').html('');
	$('.builder-strong-head').html('<h4 class="pull-left" style="margin: 0px;color: #FFFFFF;">Strong Chemistry</h4><div class="pull-right" id="stronglinktab"></div><hr style="margin-top: 5px;margin-bottom: 5px;">');
	$('#stronglinktab').html('<span style="color:#fff;">Strong links for: </span>');
	$('.builder-perfect-head').html('<h4 class="pull-left" style="margin: 0px;color: #FFFFFF;">Perfect Chemistry</h4><div class="pull-right" id="perfectlinktab"></div><hr style="margin-top: 5px;margin-bottom: 5px;">');
	$('#perfectlinktab').html('<span style="color:#fff;">Perfect links for: </span>');
	$('#purechemplayers').html('');
	$('#buildermodal').modal('show');
	$('#squadplayers').focus();
	$('input[name=currentplayer]').val($(this).closest('.player').attr("data-player-position-id"));
	$.get('/en/favourite/get/'+$(this).closest('.player').attr("data-player-position"),function(data) {
		$('#builder-card-preview').html('');
		$('#builder-card-preview-text').html('');
		$('#builder-favourites').html(data+'<div class="clearfix"></div>');
	});

	var checkPos = $(this).closest('.player').attr("data-player-position");
	var curSelP = $(this).closest('.player').attr("data-player-position-id");
    $.each(links[formation][curSelP],function(key2,val2) {
        if($('#card'+val2).hasClass('filled')) {
        	checkNation = $('#card'+val2).attr("data-player-nation");
        	checkLeague = $('#card'+val2).attr("data-player-league");
        	checkClub = $('#card'+val2).attr("data-player-club");
        	checkLine = $('input[name=player'+val2+'-line]').val();
        	$('#perfectlinktab').html($('#perfectlinktab').html()+'<a href="Javascript:;" onclick="showPerfectLink(\'perfect'+$('input[name=player'+val2+'-line]').val()+'\');">'+$('#card'+val2).children("#playername").html()+'</a>');
        	$.get('/en/perfect/'+checkClub+'/'+checkNation+'/'+checkPos+'/'+checkLine,function(data) {
				$('#builder-card-preview').html('');
				$('#builder-card-preview-text').html('');
				$('#builder-perfect').html($('#builder-perfect').html()+'<div class="perfectblock perfect'+$('input[name=player'+val2+'-line]').val()+'" style="overflow-x:auto;;overflow-y:hidden;">'+data+'</div><div class="clearfix"></div>');
				setTimeout("setPerfectWidth('perfect"+$('input[name=player'+val2+'-line]').val()+"')",1000);
        	});
        }
    });
    $.each(links[formation][curSelP],function(key2,val2) {
        if($('#card'+val2).hasClass('filled')) {
        	checkNation = $('#card'+val2).attr("data-player-nation");
        	checkLeague = $('#card'+val2).attr("data-player-league");
        	checkClub = $('#card'+val2).attr("data-player-club");
        	checkLine = $('input[name=player'+val2+'-line]').val();
        	$('#stronglinktab').html($('#stronglinktab').html()+'<a href="Javascript:;" onclick="showStrongLink(\'strong'+$('input[name=player'+val2+'-line]').val()+'\');">'+$('#card'+val2).children("#playername").html()+'</a>');
        	$.get('/en/strong/'+checkClub+'/'+checkNation+'/'+checkPos+'/'+checkLine+'/'+checkLeague,function(data) {
				$('#builder-card-preview').html('');
				$('#builder-card-preview-text').html('');
				$('#builder-strong').html($('#builder-strong').html()+'<div class="strongblock strong'+$('input[name=player'+val2+'-line]').val()+'" style="overflow-x:auto;;overflow-y:hidden;">'+data+'</div><div class="clearfix"></div>');
				setTimeout("setStrongWidth('strong"+$('input[name=player'+val2+'-line]').val()+"')",1000);
        	});
        }
    });
	if($(this).parent().attr("data-player-position-id") >= 11) {
		$('.purechem').hide();
	}
	else {
		$('.purechem').show();
	}
});
$("#builderholder").on('click','.removeplayer',function () {
	$('#'+($(this).closest('.playertemplate').attr('id'))).fadeOut(300, function() {});
	$('div').remove('#'+($(this).closest('.playertemplate').attr('id')));
	var secondid = ($(this).closest('.playertemplate').attr('id'));
	var oldid = secondid.replace('card','');
	$('#player'+oldid).attr('style','');
	$('input[name=player'+oldid+'-position]').val('');
	$('input[name=player'+oldid+'-chemistry]').val('0');
	$('input[name=player'+oldid+'-line]').val('');
	doChem();
});
$("#builderholder").on('click','.card-positions > .btn',function () {
	$("#"+$(this).closest('.playertemplate').attr('id')).children('#playerposition').html($(this).html());
	$('input[name=player'+$("#"+$(this).closest('.player').attr('id')).attr('data-player-position-id')+'-position]').val($(this).html());
	doChem();
});
$("#builderholder").on('click','.loyalty-bonus',function () {
	var oldid = $(this).closest('.player').attr('id').replace('player','');
	if($('#card'+oldid).attr('data-loyalty') == 0) {
		$('#card'+oldid).attr('data-loyalty','1');
		$(this).attr('class','btn-small btn-primary loyalty-bonus');
		$('#player'+oldid+'-loyalty').val('1');
	}
	else {
		$('#card'+oldid).attr('data-loyalty','0');
		$(this).attr('class','btn-small loyalty-bonus');
		$('#player'+oldid+'-loyalty').val('0');
	}
	doChem();
});
$(".subs").on('click','.replaceplayer',function () {
	$('#buildermodal').modal('show');
	$('input[name=currentplayer]').val($(this).closest('.player').attr("data-player-position-id"));
	$('#squadplayers').focus();
});
$(".subs").on('click','.removeplayer',function () {
	$('#'+($(this).closest('.playertemplate').attr('id'))).fadeOut(300, function() {});
	$('div').remove('#'+($(this).closest('.playertemplate').attr('id')));
	var secondid = ($(this).closest('.playertemplate').attr('id'));
	var oldid = secondid.replace('card','');
	$('#player'+oldid).attr('style','');
	$('input[name=player'+oldid+'-position]').val('');
	$('input[name=player'+oldid+'-chemistry]').val('0');
	$('input[name=player'+oldid+'-line]').val('');
	doChem();
});
$(".subs").on('click','.card-positions > .btn',function () {
	$("#"+$(this).closest('.playertemplate').attr('id')).children('#playerposition').html($(this).html());
	$('input[name=player'+$("#"+$(this).closest('.player').attr('id')).attr('data-player-position-id')+'-position]').val($(this).html());
	doChem();
});
$(".subs").on('click','.loyalty-bonus',function () {
	var oldid = $(this).closest('.player').attr('id').replace('player','');
	if($('#card'+oldid).attr('data-loyalty') == 0) {
		$('#card'+oldid).attr('data-loyalty','1');
		$(this).attr('class','btn-small btn-primary loyalty-bonus');
		$('#player'+oldid+'-loyalty').val('1');
	}
	else {
		$('#card'+oldid).attr('data-loyalty','0');
		$(this).attr('class','btn-small loyalty-bonus');
		$('#player'+oldid+'-loyalty').val('0');
	}
	doChem();
});

function buildCard(lid,name,position,league,nation,club,pid,rating,att1,att2,att3,att4,att5,att6,cardtype,workrates,ps3,xbox,pc,league_name,club_name,rare,nation_name,skills,weakfoot,traits,urlname,ps3m,xboxm,pcm,altimage) {
	$('div').remove('.preview-card');
	var clone = $('.playertemplatebasic').clone().attr('class','preview-card playertemplate filled draggable card-16-builder '+cardtype).attr('id','card'+$('input[name=currentplayer]').val()).attr('data-player-league',league).attr('data-player-nation',nation).attr('data-player-club',club).attr('data-ps3',ps3).attr('data-pc',pc).attr('data-xbox',xbox).attr('data-league-name',league_name).attr('data-club-name',club_name).attr('data-loyalty','0').attr('data-ps3m',ps3m).attr('data-pcm',pcm).attr('data-xboxm',xboxm).attr('onclick','putPlayer('+lid+',\''+name+'\',\''+position+'\','+league+','+nation+','+club+','+pid+','+rating+','+att1+','+att2+','+att3+','+att4+','+att5+','+att6+',\''+cardtype+'\',\''+workrates+'\','+ps3+','+xbox+','+pc+',\''+league_name+'\',\''+club_name+'\','+rare+',\''+nation_name+'\','+skills+','+weakfoot+',\''+traits+'\',\''+urlname+'\','+ps3m+','+xboxm+','+pcm+')').fadeIn(300, function() {}).appendTo('#builder-card-preview');
    clone.find('[id*="playername"]').html(name);
    $('.preview-card').remove('.card-overlay');
    var placepos = clone.parent('.player').attr('data-player-position');
    clone.find('[id*="playerposition"]').html(position);
    clone.find('[class*="builder-rates"]').html('<img src="http://www.futwiz.com/images/workrates/'+workrates+'.png">');
    clone.find('[id*="playerchem"]').attr('id','chem'+$('input[name=currentplayer]').val());
    clone.find('[id*="playernation"]').html('<img src="/assets/img/fifa16/flags/'+nation+'.png" class="nation" />');
    clone.find('[id*="playerclub"]').html('<img src="/assets/img/fifa16/badges/'+club+'.png" />');
	if(rare == 99) {
    	clone.find('[id*="playerface"]').html('<img src="/assets/img/fifa16/legends/'+pid+'.png" class="pface" />');
    }
    else {
    	if(altimage != '' && altimage != null) {
    		clone.find('[id*="playerface"]').html('<img src="/assets/img/fifa16/faces/'+altimage+'.png" class="pface" />');
    	}
    	else {
    		clone.find('[id*="playerface"]').html('<img src="/assets/img/fifa16/faces/'+pid+'.png" class="pface" />');
    	}
    }
    clone.find('[id*="playerrating"]').html(rating);
	if(position == 'GK') {
		if(sitelanguage == 'en') {
			clone.find('[id*="playeratt1"]').html(att1);
			clone.find('[id*="playeratt2"]').html(att2);
			clone.find('[id*="playeratt3"]').html(att3);
			clone.find('[id*="playeratt4"]').html(att4);
			clone.find('[id*="playeratt5"]').html(att5);
			clone.find('[id*="playeratt6"]').html(att6);
			clone.find('[id*="playeratt1l"]').html('DIV');
			clone.find('[id*="playeratt2l"]').html('HAN');
			clone.find('[id*="playeratt3l"]').html('KIC');
			clone.find('[id*="playeratt4l"]').html('REF');
			clone.find('[id*="playeratt5l"]').html('SPD');
			clone.find('[id*="playeratt6l"]').html('POS');
		}
		else if(sitelanguage == 'de') {
			clone.find('[id*="playeratt1"]').html(att1);
			clone.find('[id*="playeratt2"]').html(att2);
			clone.find('[id*="playeratt3"]').html(att3);
			clone.find('[id*="playeratt4"]').html(att4);
			clone.find('[id*="playeratt5"]').html(att5);
			clone.find('[id*="playeratt6"]').html(att6);
			clone.find('[id*="playeratt1l"]').html('HEC');
			clone.find('[id*="playeratt2l"]').html('BSI');
			clone.find('[id*="playeratt3l"]').html('ABS');
			clone.find('[id*="playeratt4l"]').html('REF');
			clone.find('[id*="playeratt5l"]').html('TMP');
			clone.find('[id*="playeratt6l"]').html('POS');
		}
		else {
			clone.find('[id*="playeratt1"]').html(att1);
			clone.find('[id*="playeratt2"]').html(att2);
			clone.find('[id*="playeratt3"]').html(att3);
			clone.find('[id*="playeratt4"]').html(att4);
			clone.find('[id*="playeratt5"]').html(att5);
			clone.find('[id*="playeratt6"]').html(att6);
			clone.find('[id*="playeratt1l"]').html('DIV');
			clone.find('[id*="playeratt2l"]').html('HAN');
			clone.find('[id*="playeratt3l"]').html('KIC');
			clone.find('[id*="playeratt4l"]').html('REF');
			clone.find('[id*="playeratt5l"]').html('SPD');
			clone.find('[id*="playeratt6l"]').html('POS');
		}
	}
	else {
		if(sitelanguage == 'en') {
			clone.find('[id*="playeratt1"]').html(att1);
			clone.find('[id*="playeratt2"]').html(att2);
			clone.find('[id*="playeratt3"]').html(att3);
			clone.find('[id*="playeratt4"]').html(att4);
			clone.find('[id*="playeratt5"]').html(att5);
			clone.find('[id*="playeratt6"]').html(att6);
			clone.find('[id*="playeratt1l"]').html('PAC');
			clone.find('[id*="playeratt2l"]').html('SHO');
			clone.find('[id*="playeratt3l"]').html('PAS');
			clone.find('[id*="playeratt4l"]').html('DRI');
			clone.find('[id*="playeratt5l"]').html('DEF');
			clone.find('[id*="playeratt6l"]').html('PHY');
		}
		else if(sitelanguage == 'de') {
			clone.find('[id*="playeratt1"]').html(att1);
			clone.find('[id*="playeratt2"]').html(att2);
			clone.find('[id*="playeratt3"]').html(att3);
			clone.find('[id*="playeratt4"]').html(att4);
			clone.find('[id*="playeratt5"]').html(att5);
			clone.find('[id*="playeratt6"]').html(att6);
			clone.find('[id*="playeratt1l"]').html('TEM');
			clone.find('[id*="playeratt2l"]').html('SCH');
			clone.find('[id*="playeratt3l"]').html('PAS');
			clone.find('[id*="playeratt4l"]').html('DRI');
			clone.find('[id*="playeratt5l"]').html('VER');
			clone.find('[id*="playeratt6l"]').html('KOP');
		}
		else {
			clone.find('[id*="playeratt1"]').html(att1);
			clone.find('[id*="playeratt2"]').html(att2);
			clone.find('[id*="playeratt3"]').html(att3);
			clone.find('[id*="playeratt4"]').html(att4);
			clone.find('[id*="playeratt5"]').html(att5);
			clone.find('[id*="playeratt6"]').html(att6);
			clone.find('[id*="playeratt1l"]').html('PAC');
			clone.find('[id*="playeratt2l"]').html('SHO');
			clone.find('[id*="playeratt3l"]').html('PAS');
			clone.find('[id*="playeratt4l"]').html('DRI');
			clone.find('[id*="playeratt5l"]').html('DEF');
			clone.find('[id*="playeratt6l"]').html('PHY');
		}
	}
	$('#builder-card-preview-text').html('<p>Club: '+club_name+'</p><p>League: '+league_name+'</p><p>Nation: '+nation_name+'</p><p>Skills: <img src="/assets/img/fifa16/builder/squad-'+skills+'.png" width="70" /></p><p>Weakfoot: <img src="/assets/img/fifa16/builder/squad-'+weakfoot+'.png" width="70" /></p><p>Xbox: '+sexynumber(xbox)+' - '+sexynumber(xboxm)+'</p><p>Playstation: '+sexynumber(ps3)+' - '+sexynumber(ps3m)+'</p><p>PC: '+sexynumber(pc)+' - '+sexynumber(pcm)+'</p><p>Traits: '+traits+'</p>');
}
function putManager(id,name,nation,rating) {
	$('#managermodal').modal('hide');
	$('#manager').remove();
	$('#managernation').remove();
	$('#managerleague').remove();
	if(rating <= 64) {
		$('.builder-manager').attr('class','builder-manager builder-manager-bronze');
	}
	else if(rating <= 74) {
		$('.builder-manager').attr('class','builder-manager builder-manager-silver');
	}
	else {
		$('.builder-manager').attr('class','builder-manager builder-manager-gold');
	}
	if($('.search-manager-league').val() > 0) {
		$('.builder-manager-league').append('<img src="/assets/img/fifa14/leagues/'+$('.search-manager-league').val()+'.png" width="20" id="managerleague" />');
		var mleague = $('.search-manager-league').val();
	}
	else {
		var mleague = 0;
	}
	$('.builder-manager-player').append('<img src="/assets/img/fifa15/managers/'+id+'.png" width="40" id="manager" data-manager-nation="'+nation+'" data-manager-league="'+mleague+'" />');
	$('.builder-manager-nation').append('<img src="/assets/img/fifa16/flags/'+nation+'.png" width="20" id="managernation" />');
	$('.builder-manager-name').html(name);
	$('#formmanager').val(id);
	$('#formmanagerleague').val(mleague);
	doChem();
}
function putPlayer(lid,name,position,league,nation,club,pid,rating,att1,att2,att3,att4,att5,att6,cardtype,workrates,ps3,xbox,pc,league_name,club_name,rare,nation_name,skills,weakfoot,traits,player_url,ps3m,xboxm,pcm,altimage) {
	$('#squadplayers').val('');
	$('#buildermodal').modal('hide');
	$('#builder-card-preview').html('');
	$('#builder-card-preview-text').html('');
	$('.ui-autocomplete').hide();
	$('#cardHover').hide();
	$('#player'+$('input[name=currentplayer]').val()).attr('style','background:none');
	$('div').remove('#card'+$('input[name=currentplayer]').val());
	var clone = $('.playertemplatebasic').clone().attr('class','playertemplate filled draggable card-16-builder '+cardtype).attr('id','card'+$('input[name=currentplayer]').val()).attr('data-player-league',league).attr('data-player-nation',nation).attr('data-player-club',club).attr('data-ps3',ps3).attr('data-pc',pc).attr('data-xbox',xbox).attr('data-ps3m',ps3m).attr('data-pcm',pcm).attr('data-xboxm',xboxm).attr('data-league-name',league_name).attr('data-club-name',club_name).attr('data-loyalty','1').fadeIn(300, function() {}).appendTo('#player'+$('input[name=currentplayer]').val());
    clone.find('[id*="playername"]').html(name);
    var placepos = clone.parent('.player').attr('data-player-position');
	if(position == 'LB' && placepos == 'LWB') { position = 'LWB'; }
	else if(position == 'LWB' && placepos == 'LB') { position = 'LB'; }
	else if(position == 'RB' && placepos == 'RWB') { position = 'RWB'; }
	else if(position == 'RWB' && placepos == 'RB') { position = 'RB'; }
	else if(position == 'CM' && placepos == 'CDM') { position = 'CDM'; }
	else if(position == 'CM' && placepos == 'CAM') { position = 'CAM'; }
	else if(position == 'CM' && placepos == 'CF') { position = 'CF'; }
	else if(position == 'CM' && placepos == 'ST') { position = 'ST'; }
	else if(position == 'CDM' && placepos == 'CM') { position = 'CM'; }
	else if(position == 'CDM' && placepos == 'CAM') { position = 'CAM'; }
	else if(position == 'CDM' && placepos == 'CF') { position = 'CF'; }
	else if(position == 'CDM' && placepos == 'ST') { position = 'ST'; }
	else if(position == 'CAM' && placepos == 'CM') { position = 'CM'; }
	else if(position == 'CAM' && placepos == 'CDM') { position = 'CDM'; }
	else if(position == 'CAM' && placepos == 'CF') { position = 'CF'; }
	else if(position == 'CAM' && placepos == 'ST') { position = 'ST'; }
	else if(position == 'CF' && placepos == 'CM') { position = 'CM'; }
	else if(position == 'CF' && placepos == 'CDM') { position = 'CDM'; }
	else if(position == 'CF' && placepos == 'CAM') { position = 'CAM'; }
	else if(position == 'CF' && placepos == 'ST') { position = 'ST'; }
	else if(position == 'ST' && placepos == 'CM') { position = 'CM'; }
	else if(position == 'ST' && placepos == 'CDM') { position = 'CDM'; }
	else if(position == 'ST' && placepos == 'CAM') { position = 'CAM'; }
	else if(position == 'ST' && placepos == 'CF') { position = 'CF'; }
	else if(position == 'LW' && placepos == 'LF') { position = 'LF'; }
	else if(position == 'LW' && placepos == 'LM') { position = 'LM'; }
	else if(position == 'LM' && placepos == 'LW') { position = 'LW'; }
	else if(position == 'LM' && placepos == 'LF') { position = 'LF'; }
	else if(position == 'LF' && placepos == 'LW') { position = 'LW'; }
	else if(position == 'LF' && placepos == 'LM') { position = 'LM'; }
	else if(position == 'RW' && placepos == 'RF') { position = 'RF'; }
	else if(position == 'RW' && placepos == 'RM') { position = 'RM'; }
	else if(position == 'RM' && placepos == 'RW') { position = 'RW'; }
	else if(position == 'RM' && placepos == 'RF') { position = 'RF'; }
	else if(position == 'RF' && placepos == 'RW') { position = 'RW'; }
	else if(position == 'RF' && placepos == 'RM') { position = 'RM'; }
	else if(position == 'CM' && placepos == 'CB') { position = 'CDM'; }
	else if(position == 'CAM' && placepos == 'CB') { position = 'CDM'; }
	else if(position == 'CF' && placepos == 'CB') { position = 'CDM'; }
	else if(position == 'ST' && placepos == 'CB') { position = 'CDM'; }
	else if(position == 'ST' && placepos == 'RF') { position = 'CF'; }
	else if(position == 'ST' && placepos == 'LF') { position = 'CF'; }
	else if(position == 'CM' && placepos == 'RF') { position = 'CF'; }
	else if(position == 'CM' && placepos == 'LF') { position = 'CF'; }
	else if(position == 'CAM' && placepos == 'RF') { position = 'CF'; }
	else if(position == 'CAM' && placepos == 'LF') { position = 'CF'; }
	else if(position == 'CDM' && placepos == 'RF') { position = 'CF'; }
	else if(position == 'CDM' && placepos == 'LF') { position = 'CF'; }
    clone.find('[id*="playerposition"]').html(position);
    clone.find('[class*="builder-rates"]').html('<img src="http://www.futwiz.com/images/workrates/'+workrates+'.png">');
    clone.find('[id*="playerchem"]').attr('id','chem'+$('input[name=currentplayer]').val());
    clone.find('[id*="playernation"]').html('<img src="/assets/img/fifa16/flags/'+nation+'.png" class="nation" />');
    clone.find('[id*="playerclub"]').html('<img src="/assets/img/fifa16/badges/'+club+'.png" />');
	clone.find('[class*="loyalty-bonus"]').attr('class','btn-small btn-primary loyalty-bonus');
	if(rare == 99) {
    	clone.find('[id*="playerface"]').html('<img src="/assets/img/fifa16/legends/'+pid+'.png" class="pface" />');
    }
    else {
    	if(altimage != '' && altimage != null) {
    		clone.find('[id*="playerface"]').html('<img src="/assets/img/fifa16/faces/'+altimage+'.png" class="pface" />');
    	}
    	else {
    		clone.find('[id*="playerface"]').html('<img src="/assets/img/fifa16/faces/'+pid+'.png" class="pface" />');
    	}
    }
    clone.find('[id*="playerrating"]').html(rating);
	clone.find('[class*="stats"]').attr('onclick','window.open(\'/'+sitelanguage+'/fifa16/player/'+player_url+'/'+lid+'\')');
    if(position == 'LB') { var positions = '<button class="btn">LB</button><button class="btn">LWB</button>'; }
    if(position == 'RB') { var positions = '<button class="btn">RB</button><button class="btn">RWB</button>'; }
    if(position == 'CDM') { var positions = '<button class="btn">CDM</button><button class="btn">CM</button><button class="btn">CAM</button><button class="btn">CF</button><button class="btn">ST</button>'; }
    if(position == 'CM') { var positions = '<button class="btn">CM</button><button class="btn">CDM</button><button class="btn">CAM</button><button class="btn">CF</button><button class="btn">ST</button>'; }
    if(position == 'CAM') { var positions = '<button class="btn">CAM</button><button class="btn">CDM</button><button class="btn">CM</button><button class="btn">CF</button><button class="btn">ST</button>'; }
    if(position == 'CF') { var positions = '<button class="btn">CF</button><button class="btn">ST</button><button class="btn">CAM</button><button class="btn">CM</button><button class="btn">CDM</button>'; }
    if(position == 'ST') { var positions = '<button class="btn">ST</button><button class="btn">CF</button><button class="btn">CAM</button><button class="btn">CM</button><button class="btn">CDM</button>'; }
    if(position == 'LM') { var positions = '<button class="btn">LM</button><button class="btn">LW</button><button class="btn">LF</button>'; }
    if(position == 'LW') { var positions = '<button class="btn">LW</button><button class="btn">LM</button><button class="btn">LF</button>'; }
    if(position == 'LF') { var positions = '<button class="btn">LF</button><button class="btn">LW</button><button class="btn">LM</button>'; }
    if(position == 'RM') { var positions = '<button class="btn">RM</button><button class="btn">RW</button><button class="btn">RF</button>'; }
    if(position == 'RW') { var positions = '<button class="btn">RW</button><button class="btn">RM</button><button class="btn">RF</button>'; }
    if(position == 'RF') { var positions = '<button class="btn">RF</button><button class="btn">RW</button><button class="btn">RM</button>'; }
    clone.find('[class*="positions"]').html(positions);
    clone.draggable({zIndex: 2500,revert:true});
	if(position == 'GK') {
		if(sitelanguage == 'en') {
			clone.find('[id*="playeratt1"]').html(att1);
			clone.find('[id*="playeratt2"]').html(att2);
			clone.find('[id*="playeratt3"]').html(att3);
			clone.find('[id*="playeratt4"]').html(att4);
			clone.find('[id*="playeratt5"]').html(att5);
			clone.find('[id*="playeratt6"]').html(att6);
			clone.find('[id*="playeratt1l"]').html('DIV');
			clone.find('[id*="playeratt2l"]').html('HAN');
			clone.find('[id*="playeratt3l"]').html('KIC');
			clone.find('[id*="playeratt4l"]').html('REF');
			clone.find('[id*="playeratt5l"]').html('SPD');
			clone.find('[id*="playeratt6l"]').html('POS');
		}
		else if(sitelanguage == 'de') {
			clone.find('[id*="playeratt1"]').html(att1);
			clone.find('[id*="playeratt2"]').html(att2);
			clone.find('[id*="playeratt3"]').html(att3);
			clone.find('[id*="playeratt4"]').html(att4);
			clone.find('[id*="playeratt5"]').html(att5);
			clone.find('[id*="playeratt6"]').html(att6);
			clone.find('[id*="playeratt1l"]').html('HEC');
			clone.find('[id*="playeratt2l"]').html('BSI');
			clone.find('[id*="playeratt3l"]').html('ABS');
			clone.find('[id*="playeratt4l"]').html('REF');
			clone.find('[id*="playeratt5l"]').html('TMP');
			clone.find('[id*="playeratt6l"]').html('POS');
		}
		else {
			clone.find('[id*="playeratt1"]').html(att1);
			clone.find('[id*="playeratt2"]').html(att2);
			clone.find('[id*="playeratt3"]').html(att3);
			clone.find('[id*="playeratt4"]').html(att4);
			clone.find('[id*="playeratt5"]').html(att5);
			clone.find('[id*="playeratt6"]').html(att6);
			clone.find('[id*="playeratt1l"]').html('DIV');
			clone.find('[id*="playeratt2l"]').html('HAN');
			clone.find('[id*="playeratt3l"]').html('KIC');
			clone.find('[id*="playeratt4l"]').html('REF');
			clone.find('[id*="playeratt5l"]').html('SPD');
			clone.find('[id*="playeratt6l"]').html('POS');
		}
	}
	else {
		if(sitelanguage == 'en') {
			clone.find('[id*="playeratt1"]').html(att1);
			clone.find('[id*="playeratt2"]').html(att2);
			clone.find('[id*="playeratt3"]').html(att3);
			clone.find('[id*="playeratt4"]').html(att4);
			clone.find('[id*="playeratt5"]').html(att5);
			clone.find('[id*="playeratt6"]').html(att6);
			clone.find('[id*="playeratt1l"]').html('PAC');
			clone.find('[id*="playeratt2l"]').html('SHO');
			clone.find('[id*="playeratt3l"]').html('PAS');
			clone.find('[id*="playeratt4l"]').html('DRI');
			clone.find('[id*="playeratt5l"]').html('DEF');
			clone.find('[id*="playeratt6l"]').html('PHY');
		}
		else if(sitelanguage == 'de') {
			clone.find('[id*="playeratt1"]').html(att1);
			clone.find('[id*="playeratt2"]').html(att2);
			clone.find('[id*="playeratt3"]').html(att3);
			clone.find('[id*="playeratt4"]').html(att4);
			clone.find('[id*="playeratt5"]').html(att5);
			clone.find('[id*="playeratt6"]').html(att6);
			clone.find('[id*="playeratt1l"]').html('TEM');
			clone.find('[id*="playeratt2l"]').html('SCH');
			clone.find('[id*="playeratt3l"]').html('PAS');
			clone.find('[id*="playeratt4l"]').html('DRI');
			clone.find('[id*="playeratt5l"]').html('VER');
			clone.find('[id*="playeratt6l"]').html('KOP');
		}
		else {
			clone.find('[id*="playeratt1"]').html(att1);
			clone.find('[id*="playeratt2"]').html(att2);
			clone.find('[id*="playeratt3"]').html(att3);
			clone.find('[id*="playeratt4"]').html(att4);
			clone.find('[id*="playeratt5"]').html(att5);
			clone.find('[id*="playeratt6"]').html(att6);
			clone.find('[id*="playeratt1l"]').html('PAC');
			clone.find('[id*="playeratt2l"]').html('SHO');
			clone.find('[id*="playeratt3l"]').html('PAS');
			clone.find('[id*="playeratt4l"]').html('DRI');
			clone.find('[id*="playeratt5l"]').html('DEF');
			clone.find('[id*="playeratt6l"]').html('PHY');
		}
	}
	$('input[name=player'+$('input[name=currentplayer]').val()+'-position]').val(position);
	$('input[name=player'+$('input[name=currentplayer]').val()+'-line]').val(lid);
	$('input[name=player'+$('input[name=currentplayer]').val()+'-rare]').val(rare);
	$('input[name=player'+$('input[name=currentplayer]').val()+'-rating]').val(rating);
	$('input[name=player'+$('input[name=currentplayer]').val()+'-loyalty]').val('1');
	if(isprediction == 1) {
		if(parseInt($("#card"+$('input[name=currentplayer]').val()).children('.card-16-builder-rating').html()) != 74 && parseInt($("#card"+$('input[name=currentplayer]').val()).children('.card-16-builder-rating').html()) != 64) {
	    	$("#card"+$('input[name=currentplayer]').val()).children('.card-16-builder-rating').html(parseInt($("#card"+$('input[name=currentplayer]').val()).children('.card-16-builder-rating').html())+1);
	    }
		$('input[name=player'+$('input[name=currentplayer]').val()+'-rare]').val('3');
		$('input[name=player'+$('input[name=currentplayer]').val()+'-rating]').val(parseInt($("#card"+$('input[name=currentplayer]').val()).children('.card-16-builder-rating').html()));
	    if($('#card'+$('input[name=currentplayer]').val()).hasClass('filled')) {
	    	if(parseInt($("#card"+$('input[name=currentplayer]').val()).children('.card-16-builder-rating').html()) <= 64) {
	    		$('#card'+$('input[name=currentplayer]').val()).attr('class','playertemplate filled draggable card-16-builder card-16-builder-bronze-if ui-draggable');
	    	}
	    	else if(parseInt($("#card"+$('input[name=currentplayer]').val()).children('.card-16-builder-rating').html()) <= 74) {
	    		$('#card'+$('input[name=currentplayer]').val()).attr('class','playertemplate filled draggable card-16-builder card-16-builder-silver-if ui-draggable');
	    	}
	    	else {
	    		$('#card'+$('input[name=currentplayer]').val()).attr('class','playertemplate filled draggable card-16-builder card-16-builder-gold-if ui-draggable');
	    	}
		}
	}
    $("[rel='tooltip']").tooltip({html:true});
    doChem();
}
function webApp() {
	var ids = Array();
	var positions = Array();
	for(var i=0;i<18;i++) {
		ids[i] = $("input[name=player"+i+"-line]").val();
		positions[i] = $("input[name=player"+i+"-position]").val();
	}
	if($("input[name=squadname]").val() == '') {
		var squadname = 'Untitled Squad';
	}
	else {
		var squadname = $("input[name=squadname]").val();
	}
	$.post('/webapp.php', {players:ids, positiondata:positions, squadname:squadname, squadformation:formation}, function(returnedD) {
		$("#webAppId").html('<object data="http://www.easports.com/iframe/fut/bundles/futweb/web/flash/FUTLoader.swf" id="sonet-id-0" type="application/x-shockwave-flash" height="550" width="975"><param value="true" name="allowFullScreen"><param value="http://www.futwiz.com/flash/" name="base"><param value="always" name="allowscriptaccess"><param value="#000000" name="bgcolor"><param value="false" name="menu"><param value="window" name="wmode"><param value="esc_my_persona=0&amp;esc_my_player=0&amp;esc_my_nucleus=0&amp;esc_my_platform=&amp;esc_my_gamertag=&amp;esc_for_persona=0&amp;esc_is_test=0&amp;eas_partner_key=fut&amp;eas_application_key=card-pc&amp;wpp_is_canvas=0&amp;wpp_is_popup=0&amp;wpp_skin=easports.com&amp;wpp_is_own=1&amp;pals_hostname=http://www.futwiz.com&amp;wpp_authorize_service=https://www.ea.com/nl/voetbal/services/authenticate/login.json&amp;wpp_deauthorize_service=https://www.ea.com/nl/voetbal/services/authenticate/logout.json&amp;esc_alfresco_asset_host=http://cdn.content.easports.com&amp;content_asset_host=http://cdn.content.easports.com&amp;eas_user_state=logged_out&amp;eas_user_preferences_group=page;id;easf_nl_NL;game.FIFA11ULTIMATE_playoff&amp;eas_theme=easf&amp;eas_viewing_own=false&amp;esc_persona_profile_url_by_handle_platform_template=/nl/voetbal/profile/statistieken/ESC_PERSONA_PLATFORM_TEMPLATE/ESC_PERSONA_HANDLE_TEMPLATE&amp;esc_persona_profile_stats_url_by_handle_platform_template=/nl/voetbal/profile/statistieken/ESC_PERSONA_PLATFORM_TEMPLATE/ESC_PERSONA_HANDLE_TEMPLATE&amp;esc_shared_asset_base_path=http://cdn.easf.www.easports.com/nl/voetbal/static/images/common/&amp;wpp_static_root=http://cdn.easf.www.easports.com/nl/voetbal/static/wpp10legacy/plugin/futFifaUltimateTeamPlugin/assets/&amp;eas_wpp10_compat=true&amp;domain=*&amp;appURL=http://www.futwiz.com&amp;showOffId='+returnedD+'bootLocation=&amp;bootParam=&amp;serviceHost=http://www.futwiz.com&amp;sid=&amp;personaId=&amp;personaName=&amp;showOffId='+returnedD+'&amp;platform=pc&amp;appMode=showoff&amp;EASOLocale=nl_NL&amp;appLocale=null&amp;FUTContentHost=http://cdn.content.easports.com&amp;locale=nl&amp;lang=nl_NL&amp;host=http://www.ea.com/&amp;wpp_my_persona=0&amp;wpp_my_player=0&amp;wpp_my_nucleus=0&amp;wpp_my_platform=&amp;wpp_my_gamertag=&amp;wpp_for_persona=0&amp;wpp_is_test=0&amp;wpp_alfresco_asset_host=http://cdn.content.easports.com&amp;wpp_persona_profile_url_by_handle_platform_template=/nl/voetbal/profile/statistieken/ESC_PERSONA_PLATFORM_TEMPLATE/ESC_PERSONA_HANDLE_TEMPLATE&amp;wpp_persona_profile_stats_url_by_handle_platform_template=/nl/voetbal/profile/statistieken/ESC_PERSONA_PLATFORM_TEMPLATE/ESC_PERSONA_HANDLE_TEMPLATE&amp;wpp_shared_asset_base_path=http://cdn.easf.www.easports.com/nl/voetbal/static/images/common/" name="flashvars"></object>');
	});
}
function doDrop() {
	$(".player").droppable({
		drop: function(event, ui) {
			if($("#"+$(this).attr('id')).children().size() > 1) {
				var firstid = "#"+$("#"+$(this).attr('id')).children('.playertemplate').attr('id');
				var secondid = "#"+ui.draggable.attr('id');
				var firstcard = $(secondid);
				var secondcard = $(firstid);
				var firstcardcontent = firstcard.clone().attr('style','').attr('id',$("#"+$(this).attr('id')).children('.playertemplate').attr('id'));
				var secondcardcontent = secondcard.clone().attr('style','').attr('id',ui.draggable.attr('id'));
				var newfirstid = firstid.replace('#card','');
				var newsecondid = secondid.replace('#card','');
				var firstline = $('input[name=player'+newfirstid+'-line]').val();
				var secondline = $('input[name=player'+newsecondid+'-line]').val();
				var firstrare = $('input[name=player'+newfirstid+'-rare]').val();
				var secondrare = $('input[name=player'+newsecondid+'-rare]').val();
				var firstrating = $('input[name=player'+newfirstid+'-rating]').val();
				var secondrating = $('input[name=player'+newsecondid+'-rating]').val();
				var firstloyalty = $('input[name=player'+newfirstid+'-loyalty]').val();
				var secondloyalty = $('input[name=player'+newsecondid+'-loyalty]').val();
				firstcardcontent.find('[id*="chem"]').attr('id','chem'+newfirstid);
				secondcardcontent.find('[id*="chem"]').attr('id','chem'+newsecondid);
				firstcard.replaceWith(secondcardcontent).attr('id',$("#"+$(this).attr('id')).children('.playertemplate').attr('id'));
				secondcard.replaceWith(firstcardcontent).attr('id',ui.draggable.attr('id'));
				$('input[name=player'+newfirstid+'-position]').val($("#card"+newfirstid).children('#playerposition').html());
				$('input[name=player'+newsecondid+'-position]').val($("#card"+newsecondid).children('#playerposition').html());
				var placepos = $("#player"+newfirstid).attr('data-player-position');
				var position = $("#card"+newfirstid).children('#playerposition').html();
				if(position == 'LB' && placepos == 'LWB') { position = 'LWB'; }
				else if(position == 'LWB' && placepos == 'LB') { position = 'LB'; }
				else if(position == 'RB' && placepos == 'RWB') { position = 'RWB'; }
				else if(position == 'RWB' && placepos == 'RB') { position = 'RB'; }
				else if(position == 'CM' && placepos == 'CDM') { position = 'CDM'; }
				else if(position == 'CM' && placepos == 'CAM') { position = 'CAM'; }
				else if(position == 'CM' && placepos == 'CF') { position = 'CF'; }
				else if(position == 'CM' && placepos == 'ST') { position = 'ST'; }
				else if(position == 'CDM' && placepos == 'CM') { position = 'CM'; }
				else if(position == 'CDM' && placepos == 'CAM') { position = 'CAM'; }
				else if(position == 'CDM' && placepos == 'CF') { position = 'CF'; }
				else if(position == 'CDM' && placepos == 'ST') { position = 'ST'; }
				else if(position == 'CAM' && placepos == 'CM') { position = 'CM'; }
				else if(position == 'CAM' && placepos == 'CDM') { position = 'CDM'; }
				else if(position == 'CAM' && placepos == 'CF') { position = 'CF'; }
				else if(position == 'CAM' && placepos == 'ST') { position = 'ST'; }
				else if(position == 'CF' && placepos == 'CM') { position = 'CM'; }
				else if(position == 'CF' && placepos == 'CDM') { position = 'CDM'; }
				else if(position == 'CF' && placepos == 'CAM') { position = 'CAM'; }
				else if(position == 'CF' && placepos == 'ST') { position = 'ST'; }
				else if(position == 'ST' && placepos == 'CM') { position = 'CM'; }
				else if(position == 'ST' && placepos == 'CDM') { position = 'CDM'; }
				else if(position == 'ST' && placepos == 'CAM') { position = 'CAM'; }
				else if(position == 'ST' && placepos == 'CF') { position = 'CF'; }
				else if(position == 'LW' && placepos == 'LF') { position = 'LF'; }
				else if(position == 'LW' && placepos == 'LM') { position = 'LM'; }
				else if(position == 'LM' && placepos == 'LW') { position = 'LW'; }
				else if(position == 'LM' && placepos == 'LF') { position = 'LF'; }
				else if(position == 'LF' && placepos == 'LW') { position = 'LW'; }
				else if(position == 'LF' && placepos == 'LM') { position = 'LM'; }
				else if(position == 'RW' && placepos == 'RF') { position = 'RF'; }
				else if(position == 'RW' && placepos == 'RM') { position = 'RM'; }
				else if(position == 'RM' && placepos == 'RW') { position = 'RW'; }
				else if(position == 'RM' && placepos == 'RF') { position = 'RF'; }
				else if(position == 'RF' && placepos == 'RW') { position = 'RW'; }
				else if(position == 'RF' && placepos == 'RM') { position = 'RM'; }
				else if(position == 'CM' && placepos == 'CB') { position = 'CDM'; }
				else if(position == 'CAM' && placepos == 'CB') { position = 'CDM'; }
				else if(position == 'CF' && placepos == 'CB') { position = 'CDM'; }
				else if(position == 'ST' && placepos == 'CB') { position = 'CDM'; }
				else if(position == 'ST' && placepos == 'RF') { position = 'CF'; }
				else if(position == 'ST' && placepos == 'LF') { position = 'CF'; }
				else if(position == 'CM' && placepos == 'RF') { position = 'CF'; }
				else if(position == 'CM' && placepos == 'LF') { position = 'CF'; }
				else if(position == 'CAM' && placepos == 'RF') { position = 'CF'; }
				else if(position == 'CAM' && placepos == 'LF') { position = 'CF'; }
				else if(position == 'CDM' && placepos == 'RF') { position = 'CF'; }
				else if(position == 'CDM' && placepos == 'LF') { position = 'CF'; }
				$("#card"+newfirstid).children('#playerposition').html(position);
				$('input[name=player'+newfirstid+'-position]').val(position);
				var placepos = $("#player"+newsecondid).attr('data-player-position');
				var position = $("#card"+newsecondid).children('#playerposition').html();
				if(position == 'LB' && placepos == 'LWB') { position = 'LWB'; }
				else if(position == 'LWB' && placepos == 'LB') { position = 'LB'; }
				else if(position == 'RB' && placepos == 'RWB') { position = 'RWB'; }
				else if(position == 'RWB' && placepos == 'RB') { position = 'RB'; }
				else if(position == 'CM' && placepos == 'CDM') { position = 'CDM'; }
				else if(position == 'CM' && placepos == 'CAM') { position = 'CAM'; }
				else if(position == 'CM' && placepos == 'CF') { position = 'CF'; }
				else if(position == 'CM' && placepos == 'ST') { position = 'ST'; }
				else if(position == 'CDM' && placepos == 'CM') { position = 'CM'; }
				else if(position == 'CDM' && placepos == 'CAM') { position = 'CAM'; }
				else if(position == 'CDM' && placepos == 'CF') { position = 'CF'; }
				else if(position == 'CDM' && placepos == 'ST') { position = 'ST'; }
				else if(position == 'CAM' && placepos == 'CM') { position = 'CM'; }
				else if(position == 'CAM' && placepos == 'CDM') { position = 'CDM'; }
				else if(position == 'CAM' && placepos == 'CF') { position = 'CF'; }
				else if(position == 'CAM' && placepos == 'ST') { position = 'ST'; }
				else if(position == 'CF' && placepos == 'CM') { position = 'CM'; }
				else if(position == 'CF' && placepos == 'CDM') { position = 'CDM'; }
				else if(position == 'CF' && placepos == 'CAM') { position = 'CAM'; }
				else if(position == 'CF' && placepos == 'ST') { position = 'ST'; }
				else if(position == 'ST' && placepos == 'CM') { position = 'CM'; }
				else if(position == 'ST' && placepos == 'CDM') { position = 'CDM'; }
				else if(position == 'ST' && placepos == 'CAM') { position = 'CAM'; }
				else if(position == 'ST' && placepos == 'CF') { position = 'CF'; }
				else if(position == 'LW' && placepos == 'LF') { position = 'LF'; }
				else if(position == 'LW' && placepos == 'LM') { position = 'LM'; }
				else if(position == 'LM' && placepos == 'LW') { position = 'LW'; }
				else if(position == 'LM' && placepos == 'LF') { position = 'LF'; }
				else if(position == 'LF' && placepos == 'LW') { position = 'LW'; }
				else if(position == 'LF' && placepos == 'LM') { position = 'LM'; }
				else if(position == 'RW' && placepos == 'RF') { position = 'RF'; }
				else if(position == 'RW' && placepos == 'RM') { position = 'RM'; }
				else if(position == 'RM' && placepos == 'RW') { position = 'RW'; }
				else if(position == 'RM' && placepos == 'RF') { position = 'RF'; }
				else if(position == 'RF' && placepos == 'RW') { position = 'RW'; }
				else if(position == 'RF' && placepos == 'RM') { position = 'RM'; }
				else if(position == 'CM' && placepos == 'CB') { position = 'CDM'; }
				else if(position == 'CAM' && placepos == 'CB') { position = 'CDM'; }
				else if(position == 'CF' && placepos == 'CB') { position = 'CDM'; }
				else if(position == 'ST' && placepos == 'CB') { position = 'CDM'; }
				else if(position == 'ST' && placepos == 'RF') { position = 'CF'; }
				else if(position == 'ST' && placepos == 'LF') { position = 'CF'; }
				else if(position == 'CM' && placepos == 'RF') { position = 'CF'; }
				else if(position == 'CM' && placepos == 'LF') { position = 'CF'; }
				else if(position == 'CAM' && placepos == 'RF') { position = 'CF'; }
				else if(position == 'CAM' && placepos == 'LF') { position = 'CF'; }
				else if(position == 'CDM' && placepos == 'RF') { position = 'CF'; }
				else if(position == 'CDM' && placepos == 'LF') { position = 'CF'; }
				$("#card"+newsecondid).children('#playerposition').html(position);
				$('input[name=player'+newsecondid+'-position]').val(position);
				$('input[name=player'+newsecondid+'-line]').val(firstline);
				$('input[name=player'+newfirstid+'-line]').val(secondline);
				$('input[name=player'+newsecondid+'-rare]').val(firstrare);
				$('input[name=player'+newfirstid+'-rare]').val(secondrare);
				$('input[name=player'+newsecondid+'-rating]').val(firstrating);
				$('input[name=player'+newfirstid+'-rating]').val(secondrating);
				$('input[name=player'+newsecondid+'-loyalty]').val(firstloyalty);
				$('input[name=player'+newfirstid+'-loyalty]').val(secondloyalty);
				$(firstid).draggable({zIndex: 2500,revert:true});
				$(secondid).draggable({zIndex: 2500,revert:true});
			}
			else {
				var secondid = "#"+ui.draggable.attr('id');
				var firstcard = $(secondid);
				var newid = $(this).attr('id');
				newid = newid.replace('player','');
				var firstcardcontent = firstcard.clone().attr('style','').attr('id','card'+newid);
				firstcardcontent.find('[id*="chem"]').attr('id','chem'+newid);
				var oldid = secondid.replace('#card','');
				$('#player'+oldid).attr('style','');
				$('#player'+newid).attr('style','background:none;');
				$('div').remove('#card'+oldid);
				firstcardcontent.appendTo('#'+$(this).attr('id'));
				$("#card"+newid).draggable({zIndex: 2500,revert:true});
				var placepos = $("#"+$(this).attr('id')).attr('data-player-position');
				var position = $("#card"+newid).children('#playerposition').html();
				if(position == 'LB' && placepos == 'LWB') { position = 'LWB'; }
				else if(position == 'LWB' && placepos == 'LB') { position = 'LB'; }
				else if(position == 'RB' && placepos == 'RWB') { position = 'RWB'; }
				else if(position == 'RWB' && placepos == 'RB') { position = 'RB'; }
				else if(position == 'CM' && placepos == 'CDM') { position = 'CDM'; }
				else if(position == 'CM' && placepos == 'CAM') { position = 'CAM'; }
				else if(position == 'CM' && placepos == 'CF') { position = 'CF'; }
				else if(position == 'CM' && placepos == 'ST') { position = 'ST'; }
				else if(position == 'CDM' && placepos == 'CM') { position = 'CM'; }
				else if(position == 'CDM' && placepos == 'CAM') { position = 'CAM'; }
				else if(position == 'CDM' && placepos == 'CF') { position = 'CF'; }
				else if(position == 'CDM' && placepos == 'ST') { position = 'ST'; }
				else if(position == 'CAM' && placepos == 'CM') { position = 'CM'; }
				else if(position == 'CAM' && placepos == 'CDM') { position = 'CDM'; }
				else if(position == 'CAM' && placepos == 'CF') { position = 'CF'; }
				else if(position == 'CAM' && placepos == 'ST') { position = 'ST'; }
				else if(position == 'CF' && placepos == 'CM') { position = 'CM'; }
				else if(position == 'CF' && placepos == 'CDM') { position = 'CDM'; }
				else if(position == 'CF' && placepos == 'CAM') { position = 'CAM'; }
				else if(position == 'CF' && placepos == 'ST') { position = 'ST'; }
				else if(position == 'ST' && placepos == 'CM') { position = 'CM'; }
				else if(position == 'ST' && placepos == 'CDM') { position = 'CDM'; }
				else if(position == 'ST' && placepos == 'CAM') { position = 'CAM'; }
				else if(position == 'ST' && placepos == 'CF') { position = 'CF'; }
				else if(position == 'LW' && placepos == 'LF') { position = 'LF'; }
				else if(position == 'LW' && placepos == 'LM') { position = 'LM'; }
				else if(position == 'LM' && placepos == 'LW') { position = 'LW'; }
				else if(position == 'LM' && placepos == 'LF') { position = 'LF'; }
				else if(position == 'LF' && placepos == 'LW') { position = 'LW'; }
				else if(position == 'LF' && placepos == 'LM') { position = 'LM'; }
				else if(position == 'RW' && placepos == 'RF') { position = 'RF'; }
				else if(position == 'RW' && placepos == 'RM') { position = 'RM'; }
				else if(position == 'RM' && placepos == 'RW') { position = 'RW'; }
				else if(position == 'RM' && placepos == 'RF') { position = 'RF'; }
				else if(position == 'RF' && placepos == 'RW') { position = 'RW'; }
				else if(position == 'RF' && placepos == 'RM') { position = 'RM'; }
				else if(position == 'CM' && placepos == 'CB') { position = 'CDM'; }
				else if(position == 'CAM' && placepos == 'CB') { position = 'CDM'; }
				else if(position == 'CF' && placepos == 'CB') { position = 'CDM'; }
				else if(position == 'ST' && placepos == 'CB') { position = 'CDM'; }
				else if(position == 'ST' && placepos == 'RF') { position = 'CF'; }
				else if(position == 'ST' && placepos == 'LF') { position = 'CF'; }
				else if(position == 'CM' && placepos == 'RF') { position = 'CF'; }
				else if(position == 'CM' && placepos == 'LF') { position = 'CF'; }
				else if(position == 'CAM' && placepos == 'RF') { position = 'CF'; }
				else if(position == 'CAM' && placepos == 'LF') { position = 'CF'; }
				else if(position == 'CDM' && placepos == 'RF') { position = 'CF'; }
				else if(position == 'CDM' && placepos == 'LF') { position = 'CF'; }
				$("#card"+newid).children('#playerposition').html(position);
				var oldline = $('input[name=player'+oldid+'-line]').val();
				$('input[name=player'+newid+'-position]').val($("#card"+newid).children('#playerposition').html());
				$('input[name=player'+newid+'-line]').val(oldline);
				$('input[name=player'+newid+'-rare]').val($('input[name=player'+oldid+'-rare]').val());
				$('input[name=player'+newid+'-rating]').val($('input[name=player'+oldid+'-rating]').val());
				$('input[name=player'+newid+'-loyalty]').val($('input[name=player'+oldid+'-loyalty]').val());
				$('input[name=player'+oldid+'-position]').val('');
				$('input[name=player'+oldid+'-chemistry]').val('0');
				$('input[name=player'+oldid+'-line]').val('');
				$('input[name=player'+oldid+'-rare]').val('');
				$('input[name=player'+oldid+'-rating]').val('');
				$('input[name=player'+oldid+'-loyalty]').val('');
			}
			doChem();
		}
	});
}
$("#formation").change(function () {
	$('#builderholder').attr('class','builder pull-right form'+$('#formation').val());formation = $('#formation').val();canvas.width = canvas.width;doPos();
});
function builder() {
	$('.webapp').hide();
	$('.subs').show();
	$('.builder').show();
	$('.statsarea').show();
	$('.playerstable').hide();
}
function webApp() {
	$('.webapp').show();
	$('.subs').hide();
	$('.builder').hide();
	$('.statsarea').show();
	$('.playerstable').hide();
	var ids = Array();
	var positions = Array();
	var rare = Array();
	var ratings = Array();
	for(var i=0;i<18;i++) {
		ids[i] = $("input[name=player"+i+"-line]").val();
		positions[i] = $("input[name=player"+i+"-position]").val();
		rare[i] = $("input[name=player"+i+"-rare]").val();
		ratings[i] = $("input[name=player"+i+"-rating]").val();
	}
	if($("input[name=squadname]").val() == '') {
		var squadname = 'Untitled Squad';
	}
	else {
		var squadname = $("input[name=squadname]").val();
	}
	$.post('/webapp.php', {players:ids, positiondata:positions, rare:rare, ratings:ratings, squadname:squadname, squadformation:formation}, function(returnedD) {
		$('#webAppId').html('<iframe src="http://www.futwiz.com/ut/webapp.php?id='+returnedD+'" width="975" height="550" frameborder="0"></iframe>');
	});
}
$('.builder-switch-squad').on('click',function () {
	$('.webapp').hide();
	$('.subs').show();
	$('.builder').show();
});
$('.webapp-switch-squad').on('click',function () {
	$('.webapp').show();
	$('.subs').hide();
	$('.builder').hide();
	$('#webAppId').html('<iframe src="http://www.futwiz.com/ut/webapp.php?id='+$(this).attr('data-squad-id')+'" width="975" height="550" frameborder="0"></iframe>');
});
