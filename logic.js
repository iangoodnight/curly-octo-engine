$(document).ready(function() {

	const sheetID = "1GrAW412jKc_q8VDuKnA5IMZApPVtqaLAp_4H3VIPDtc";
	const url = "https://spreadsheets.google.com/feeds/list/" + sheetID + "/1/public/values?alt=json";

	var responseCounter = 0;

	function normalizeWS(s) {
    s = s.match(/\S+/g);
    return s ? s.join(' ') : '';
	}

	function parseData(res) {
		console.log("res: ", res);
		var feed = res.feed;
		console.log("feed: ", feed);
		var entries = feed.entry;
		console.log("entries: ", entries);
		var entriesArr = [];
		for (var i = 0; i < entries.length; i++) {
			var x = {};
			var updated = entries[i].updated.$t;
			x.updated = updated;
			var rawContent = entries[i].content.$t;
			var content = rawContent.split(',');
			var contentObj = {};
			for (var j = 0; j < content.length; j++) {
				var kv = content[j].split(':');
				console.log("kv: " + kv);
				var key = normalizeWS(kv[0]);
				var val = kv[1];
				contentObj[key] = val;
			}
			x.content = contentObj;
			entriesArr.push(x);
		}
		console.log("entriesArr: ", entriesArr);
		return entriesArr;
	}

function printData(arr) {
	console.log("You have " + arr.length +" items awaiting your attention");
	for (var k = 0; k < arr.length; k++) {
		current = arr[k];
		var wellSection = $("<div>");
		wellSection.addClass("well");
		wellSection.attr("id", "response-well-" + responseCounter);
		$("#well-section").append(wellSection);
		console.log(current.content.typeofupdate.trim() == "Add Finished Product to SkuVault");
		if (current.content.typeofupdate == "Add Finished Product to SkuVault") {
			$('#response-well-' + responseCounter)
				.append(
					"<h4 class='response-type'><span class='label label-primary>" + responseCounter + "</span></h4>");
		}

		responseCounter++;
		console.log("Item number " + (k + 1) + " submitted at " + current.updated + ".\n" + current.content.typeofupdate.trim());
	}
}
	

	// AJAX call
	$.ajax({
    url : url,
    type : 'GET',
    dataType : 'jsonp',
    success : function(res, status){
        console.log('status : ' + status);
        var parsed = parseData(res);
        console.log(printData(parsed));

    },
    error : function(res, status, error){
        console.log('status : ' + status);
        console.log(res);
        console.log(error);
    }
	});
});