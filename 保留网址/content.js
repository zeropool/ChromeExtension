var appendHtml = '<div id="cateGoryBox" style="overflow-y: scroll;height: 700px;position:fixed;right:0;top:50px;background-color:#fff;box-shadow: 0 0 5px #000;padding: 5px 10px;"></div>'
$("body").append(appendHtml);
chrome.runtime.sendMessage({
	type: 1
}, function(response) {
	var cateGoryList = response.cateGoryList;
	var l1Arrary = [];
	var l2Arrary = [];
	var l3Arrary = [];
	delete cateGoryList['count'];
	delete cateGoryList['category1'];
	for (var i in cateGoryList) {
		if (cateGoryList[i]['level'] == 2)
			l1Arrary.push(cateGoryList[i]);
		if (cateGoryList[i]['level'] == 3)
			l2Arrary.push(cateGoryList[i]);
		if (cateGoryList[i]['level'] == 4)
			l3Arrary.push(cateGoryList[i]);
	}
	console.log(l1Arrary);
	for (var i = 0; i < l1Arrary.length; i++) {
		$("#cateGoryBox").append('<div  style="font-size:16px;border-bottom:1px solid #eee;padding:5px 0;font-weight:bold;" data-pid="' + l1Arrary[i]['pid'] + '" data-level="' + l1Arrary[i]['level'] + '"  data-catid="' + l1Arrary[i]['catid'] + '" data-catname="' + l1Arrary[i]['catname'] + '" data-datavolume="' + l1Arrary[i]['datavolume'] + '"><span class="lv1" style="cursor: pointer;">' + l1Arrary[i]['catname'] + '</span></div>');
	}
	$("#cateGoryBox").children('div').each(function(i, el) {
		for (var i = 0; i < l2Arrary.length; i++) {
			if ($(el).attr('data-catid') == l2Arrary[i]['pid']) {
				$(el).append('<div  style="display:none;font-size:14px;text-indent:30px;border-bottom:1px solid #eee;padding:5px 0;font-weight:normal;" data-pid="' + l2Arrary[i]['pid'] + '" data-level="' + l2Arrary[i]['level'] + '"  data-catid="' + l2Arrary[i]['catid'] + '" data-catname="' + l2Arrary[i]['catname'] + '" data-datavolume="' + l2Arrary[i]['datavolume'] + '"><span class="lv2" style="cursor: pointer;">' + l2Arrary[i]['catname'] + '</span></div>');
			}
		}
	})
	$("#cateGoryBox").children('div').children('div').each(function(i, el) {
		for (var i = 0; i < l3Arrary.length; i++) {
			if ($(el).attr('data-catid') == l3Arrary[i]['pid']) {
				$(el).append('<div  style="display:none;font-size:12px;text-indent:60px;border-bottom:1px solid #eee;padding:5px 0;font-weight:normal;" data-pid="' + l3Arrary[i]['pid'] + '" data-level="' + l3Arrary[i]['level'] + '"  data-catid="' + l3Arrary[i]['catid'] + '" data-catname="' + l3Arrary[i]['catname'] + '" data-datavolume="' + l3Arrary[i]['datavolume'] + '"><span class="lv3" style="cursor: pointer;">' + l3Arrary[i]['catname'] + '</span></div>');
			}
		}
	})
	$("#cateGoryBox span").each(function(i,el){
		if($(el).siblings().length>0)
		{
			$(this).addClass('hide');
		}
	})
	$(".lv1").click(function() {
		if ($(this).hasClass('hide'))
			$(this).removeClass('hide').addClass('show').siblings().show();
		else if($(this).hasClass('show'))
			$(this).removeClass('show').addClass('hide').siblings().hide();
	})
	$(".lv2").click(function() {
		if ($(this).hasClass('hide')){
			$(this).removeClass('hide').addClass('show').siblings().show();
		}
		else if($(this).hasClass('show'))
		{
			$(this).removeClass('show').addClass('hide').siblings().hide();
		}
		else{
			$("#cateGoryBox .active").removeClass('active');
			$(this).addClass('active');
			post($(this).parent().attr('data-catid'));
		}

	})
	$(".lv3").click(function() {
		$("#cateGoryBox .active").removeClass('active');
		$(this).addClass('active');
		post($(this).parent().attr('data-catid'));
	})
});

function post(catId)
{
	debugger;
	$.ajax({
		url: 'http://www.weixinbm.com/do.php?ac=getcollecturl',
		type: 'post',
		data: {catid: catId,Url:window.location.href}
	})
	.done(function() {
		console.log("success");
	})
	.fail(function() {
		console.log("error");
	})
	.always(function() {
		console.log("complete");
	});
}