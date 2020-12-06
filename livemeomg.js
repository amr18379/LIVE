
var current_page = 1, count = 20;

$(function(){
	setTimeout(function(){
		newSearch();
	}, 500);
});

function newSearch() {
	count = 0;
	current_page = 1;
	$('#main').html('');
	doSearch();
}


function doSearch(){
	$.ajax({
		/////url: 'https://live.ksmobile.net/live/newmaininfo',/////
		
	//////url:	'https://live.ksmobile.net/live/girls?'/////  ,
		
		url:  'https://live.ksmobile.net/live/newMainInfo?countryCode=NZ' ,
		
		
		data: {
			page_size: 100,
			page_index: current_page
		},
		cache: false,
		type: 'GET',
		dataType: 'json',
		success: function(r){

			var max = $('#limit').val();
			if (r.data.video_info.length < max) max = r.data.video_info.length;

			for (index = 0; index < max; index++) {
				var entry = r.data.video_info[index];
				
				var level = parseInt(entry.level);
				
				
				
				if ((level > $('#min').val()) && (level < $('#max').val())) {
					count++;
					var h = '<div class="entry '+(entry.sex==0?'female':'male')+'"><img src="'+entry.videocapture+'">';
					h += '<h3>Level: <span>'+entry.level+'</span> <span>'+entry.uname+'</span>Vid: <span>'+entry.vid+ '</span></h3>';
				    h += '<h3>Countrycode: <span>'+entry.countryCode+'</span><span>ID:<span>'+entry.userid +'</span></h3>';
					h += '<h3><span>'+entry.hlsvideosource+'</span></h3>';
					h += '</div>';
					$('#main').append(h);

				
			}

}





 



			if ((current_page < 20) && (count < $('#limit').val() )) {
				current_page++;
				setTimeout(function(){
					doSearch();
				}, 500);
			}

		}
	});


}

