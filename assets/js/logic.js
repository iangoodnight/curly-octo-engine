$(document).ready(function() {

	// const sheetID = "1GrAW412jKc_q8VDuKnA5IMZApPVtqaLAp_4H3VIPDtc";
	const sheetID = "16tX9R_85dAQtioe-TXMspEbhJ__yPByZvpnchKIBf0o";
	// const sheetID = "1Cx9Rxa4qGmKtf0ScJ_p8-qwYBVrL92sudSbdXTudesE";	
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
			var pack = "gsx$pleaseselectallpack-outworkrequiredforthisproduct.";
			var pack_out_raw = entries[i][pack].$t;
			var pack_out = pack_out_raw.split(',');
			console.log("pack_out: ", pack_out);
			x.pack_out = pack_out;
			var rawContent = entries[i].content.$t;
			var content = rawContent.split(',');
			var contentObj = {};
			for (var j = 0; j < content.length; j++) {
				var kv = content[j].split(':');
				console.log("kv: " + kv);
				var key = normalizeWS(kv[0]).trim();
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
		var greeting = "You have " + arr.length +" items awaiting your attention";
		var linkBank = "";		
		for (var k = 0; k < arr.length; k++) {
			current = arr[k];
			console.log("arr[k]: " + arr[k])
			var wellSection = $("<div>");
			wellSection.addClass("well");
			wellSection.attr("id", "response-well-" + responseCounter);
			$("#well-section").append(wellSection);
			console.log(current.content.typeofupdate.trim() == "Add Finished Product to SkuVault");
			linkBank += ("<li><a href='#response-well-" + responseCounter + "'>" + current.content.typeofupdate.trim() + "</a></li>")
			switch (current.content.typeofupdate.trim()) {
				case ("Add Finished Product to SkuVault"):
					$('#response-well-' + responseCounter)
						.append(
							"<h4 class='response-type'>" + current.content.typeofupdate.trim() + "</h4>" +
							"<table class='table'>" +
								"<thead>" +
									"<tr>" +
										"<th scope='col'>Timestamp</th>" +
										"<th scope='col'>Email</th>" +
										"<th scope='col'>Finished Product Description</th>" +
										"<th scope='col'>Sage ID</th>" +
										"<th scope='col'>Cost</th>" +
									"</tr>" +
								"</thead>" +
								"<tbody>" + 
									"<tr>" +
										"<td>" + moment(current.updated).format('MMMM Do YYYY, h:mm:ss a') + "</td>" +
										"<td>" + current.content.emailaddress.trim() + "</td>" +
										"<td>" + current.content.finishedproductdescription.trim() + "</td>" +
										"<td>" + current.content.finishedproductsageid.trim() + "</td>" +
										"<td>" + current.content.finishedproductcost.trim() + "</td>" +
									"</tr>" +
								"</tbody>" +
							"</table>" +
							"<div class='container'>" +
								"<div class='container components' style='border: 2px solid black;'>" +
									"<h5>Linked Components</h5>"+
									"<table class='table'>" +
										"<thead>" +
											"<tr>" +
												"<th scope='col'>Component Description</th>" +
												"<th scope='col'>Component Sage ID</th>" +
												"<th scope='col'>Supplier</th>" +
												"<th scope='col'>Cost</th>" +
												"<th scope='col'>History</th>" +
											"</tr>" +
										"<thead>" +
										"<tbody>" +
											"<tr>" +
												"<td>" + (current.content.componentdescription ? current.content.componentdescription.trim() : "----") + "</td>" +
												"<td>" + (current.content.componentsageid ? current.content.componentsageid.trim() : "----") + "</td>" +		
												"<td>" + (current.content.supplierifnotcustomersupplied ? current.content.supplierifnotcustomersupplied.trim() : "----") + "</td>" +		
												"<td>" + (current.content.componentcostifnotcustomersupplied ? current.content.componentcostifnotcustomersupplied.trim() : "----") + "</td>" +	
												"<td>" + (current.content.componenthistory ? current.content.componenthistory.trim() : "----") + "</td>" +	
											"</tr>" +
											"<tr>" +
												"<td>" + (current.content.componentdescription_2 ? current.content.componentdescription_2.trim() : "----") + "</td>" +
												"<td>" + (current.content.componentsageid_2 ? current.content.componentsageid_2.trim() : "----") + "</td>" +		
												"<td>" + (current.content.supplierifnotcustomersupplied_2 ? current.content.supplierifnotcustomersupplied_2.trim() : "----") + "</td>" +		
												"<td>" + (current.content.componentcostifnotcustomersupplied_2 ? current.content.componentcostifnotcustomersupplied_2.trim() : "----") + "</td>" +	
												"<td>" + (current.content.componenthistory_2 ? current.content.componenthistory_2.trim() : "----") + "</td>" +	
											"</tr>" +
											"<tr>" +
												"<td>" + (current.content.componentdescription_3 ? current.content.componentdescription_3.trim() : "----") + "</td>" +
												"<td>" + (current.content.componentsageid_3 ? current.content.componentsageid_3.trim() : "----") + "</td>" +		
												"<td>" + (current.content.supplierifnotcustomersupplied_3 ? current.content.supplierifnotcustomersupplied_3.trim() : "----") + "</td>" +		
												"<td>" + (current.content.componentcostifnotcustomersupplied_3 ? current.content.componentcostifnotcustomersupplied_3.trim() : "----") + "</td>" +	
												"<td>" + (current.content.componenthistory_3 ? current.content.componenthistory_3.trim() : "----") + "</td>" +	
											"</tr>" +
											"<tr>" +
												"<td>" + (current.content.componentdescription_4 ? current.content.componentdescription_4.trim() : "----") + "</td>" +
												"<td>" + (current.content.componentsageid_4 ? current.content.componentsageid_4.trim() : "----") + "</td>" +		
												"<td>" + (current.content.supplierifnotcustomersupplied_4 ? current.content.supplierifnotcustomersupplied_4.trim() : "----") + "</td>" +		
												"<td>" + (current.content.componentcostifnotcustomersupplied_4 ? current.content.componentcostifnotcustomersupplied_4.trim() : "----") + "</td>" +	
												"<td>" + (current.content.componenthistory_4 ? current.content.componenthistory_4.trim() : "----") + "</td>" +	
											"</tr>" +
											"<tr>" +
												"<td>" + (current.content.componentdescription_5 ? current.content.componentdescription_5.trim() : "----") + "</td>" +
												"<td>" + (current.content.componentsageid_5 ? current.content.componentsageid_5.trim() : "----") + "</td>" +		
												"<td>" + (current.content.supplierifnotcustomersupplied_5 ? current.content.supplierifnotcustomersupplied_5.trim() : "----") + "</td>" +		
												"<td>" + (current.content.componentcostifnotcustomersupplied_5 ? current.content.componentcostifnotcustomersupplied_5.trim() : "----") + "</td>" +	
												"<td>" + (current.content.componenthistory_5 ? current.content.componenthistory_5.trim() : "----") + "</td>" +	
											"</tr>" +
											"<tr>" +
												"<td>" + (current.content.componentdescription_6 ? current.content.componentdescription_6.trim() : "----") + "</td>" +
												"<td>" + (current.content.componentsageid_6 ? current.content.componentsageid_6.trim() : "----") + "</td>" +		
												"<td>" + (current.content.supplierifnotcustomersupplied_6 ? current.content.supplierifnotcustomersupplied_6.trim() : "----") + "</td>" +		
												"<td>" + (current.content.componentcostifnotcustomersupplied_6 ? current.content.componentcostifnotcustomersupplied_6.trim() : "----") + "</td>" +	
												"<td>" + (current.content.componenthistory_6 ? current.content.componenthistory_6.trim() : "----") + "</td>" +	
											"</tr>" +
											"<tr>" +
												"<td>" + (current.content.componentdescription_7 ? current.content.componentdescription_7.trim() : "----") + "</td>" +
												"<td>" + (current.content.componentsageid_7 ? current.content.componentsageid_7.trim() : "----") + "</td>" +		
												"<td>" + (current.content.supplierifnotcustomersupplied_7 ? current.content.supplierifnotcustomersupplied_7.trim() : "----") + "</td>" +		
												"<td>" + (current.content.componentcostifnotcustomersupplied_7 ? current.content.componentcostifnotcustomersupplied_7.trim() : "----") + "</td>" +	
												"<td>" + (current.content.componenthistory_7 ? current.content.componenthistory_7.trim() : "----") + "</td>" +	
											"</tr>" +
											"<tr>" +
												"<td>" + (current.content.componentdescription_8 ? current.content.componentdescription_8.trim() : "----") + "</td>" +
												"<td>" + (current.content.componentsageid_8 ? current.content.componentsageid_8.trim() : "----") + "</td>" +		
												"<td>" + (current.content.supplierifnotcustomersupplied_8 ? current.content.supplierifnotcustomersupplied_8.trim() : "----") + "</td>" +		
												"<td>" + (current.content.componentcostifnotcustomersupplied_8 ? current.content.componentcostifnotcustomersupplied_8.trim() : "----") + "</td>" +	
												"<td>" + (current.content.componenthistory_8 ? current.content.componenthistory_8.trim() : "----") + "</td>" +	
											"</tr>" +
										"</tbody>" +
									"</table>" +														
								"</div></div><br><hr><hr><br>"
						);
						console.log("current.content.emailaddress.trim(): " + current.content.emailaddress.trim());
					break;
				case ("Update Finished Product Details"):
					var info = current.content.informationthatneedstobeupdated.trim();
					function listBuilder(arr) {
						var list = ""
						for (var j = 0; j < arr.length; j++ ) {
							var newLine = "<li>";
							newLine += arr[j];
							newLine += "</li>";
							list += newLine;
						}
						console.log("List builder: ", list);
						return list
					}
					$('#response-well-' + responseCounter)
						.append(
							"<h4 class='response-type'>" + current.content.typeofupdate.trim() + "</h4>" +
							"<table class='table'>" +
								"<thead>" +
									"<tr>" +
										"<th scope='col'>Timestamp</th>" +
										"<th scope='col'>Email</th>" +
										"<th scope='col'>Finished Product SkuVault Title</th>" +
										"<th scope='col'>Finished Product Skuvault Sku</th>" +
										(info === "Cost/Price" ? 
										"<th scope='col'>Update Cost</th>" :
										info === "Pack-Out/WIP Details" ? 
										"<th scope='col'>Pack-Out Work Required</th><th>Notes</th>" :
										"<th scope='col'>---</th>"
										 )
										 +
									"</tr>" +
								"</thead>" +
								"<tbody>" + 
									"<tr>" +
										"<td>" + moment(current.updated).format('MMMM Do YYYY, h:mm:ss a') + "</td>" +
										"<td>" + current.content.emailaddress.trim() + "</td>" +
										"<td>" + current.content.finishedproductskuvaulttitle.trim() + "</td>" +
										"<td>" + current.content.finishedproductskuvaultsku.trim() + "</td>" +
										"<td>" + (current.content.newcostprice ? (current.content.newcostprice.trim() + "</td></tr></tbody></table>")
											: 			current.content.doesthisfinishedproductrequireawipsku ? ("<ul>" + listBuilder(current.pack_out) + "</ul></td></tr></tbody><table>") 
											: 			current.content.componentdescription ? ("</td></tr></tbody></table>" +
												"<div class='container'>" +
													"<div class='container components' style='border: 2px solid black;'>" +
														"<h5>Update Linked Components</h5>"+
														"<table class='table'>" +
															"<thead>" +
																"<tr>" +
																	"<th scope='col'>Component Description</th>" +
																	"<th scope='col'>Component Sage ID</th>" +
																	"<th scope='col'>Supplier</th>" +
																	"<th scope='col'>Cost</th>" +
																	"<th scope='col'>History</th>" +
																"</tr>" +
															"<thead>" +
															"<tbody>" +
																"<tr>" +
																	"<td>" + (current.content.componentdescription ? current.content.componentdescription.trim() : "----") + "</td>" +
																	"<td>" + (current.content.componentsageid ? current.content.componentsageid.trim() : "----") + "</td>" +		
																	"<td>" + (current.content.supplierifnotcustomersupplied ? current.content.supplierifnotcustomersupplied.trim() : "----") + "</td>" +		
																	"<td>" + (current.content.componentcostifnotcustomersupplied ? current.content.componentcostifnotcustomersupplied.trim() : "----") + "</td>" +	
																	"<td>" + (current.content.componenthistory ? current.content.componenthistory.trim() : "----") + "</td>" +	
																"</tr>" +
																"<tr>" +
																	"<td>" + (current.content.componentdescription_2 ? current.content.componentdescription_2.trim() : "----") + "</td>" +
																	"<td>" + (current.content.componentsageid_2 ? current.content.componentsageid_2.trim() : "----") + "</td>" +		
																	"<td>" + (current.content.supplierifnotcustomersupplied_2 ? current.content.supplierifnotcustomersupplied_2.trim() : "----") + "</td>" +		
																	"<td>" + (current.content.componentcostifnotcustomersupplied_2 ? current.content.componentcostifnotcustomersupplied_2.trim() : "----") + "</td>" +	
																	"<td>" + (current.content.componenthistory_2 ? current.content.componenthistory_2.trim() : "----") + "</td>" +	
																"</tr>" +
																"<tr>" +
																	"<td>" + (current.content.componentdescription_3 ? current.content.componentdescription_3.trim() : "----") + "</td>" +
																	"<td>" + (current.content.componentsageid_3 ? current.content.componentsageid_3.trim() : "----") + "</td>" +		
																	"<td>" + (current.content.supplierifnotcustomersupplied_3 ? current.content.supplierifnotcustomersupplied_3.trim() : "----") + "</td>" +		
																	"<td>" + (current.content.componentcostifnotcustomersupplied_3 ? current.content.componentcostifnotcustomersupplied_3.trim() : "----") + "</td>" +	
																	"<td>" + (current.content.componenthistory_3 ? current.content.componenthistory_3.trim() : "----") + "</td>" +	
																"</tr>" +
																"<tr>" +
																	"<td>" + (current.content.componentdescription_4 ? current.content.componentdescription_4.trim() : "----") + "</td>" +
																	"<td>" + (current.content.componentsageid_4 ? current.content.componentsageid_4.trim() : "----") + "</td>" +		
																	"<td>" + (current.content.supplierifnotcustomersupplied_4 ? current.content.supplierifnotcustomersupplied_4.trim() : "----") + "</td>" +		
																	"<td>" + (current.content.componentcostifnotcustomersupplied_4 ? current.content.componentcostifnotcustomersupplied_4.trim() : "----") + "</td>" +	
																	"<td>" + (current.content.componenthistory_4 ? current.content.componenthistory_4.trim() : "----") + "</td>" +	
																"</tr>" +
																"<tr>" +
																	"<td>" + (current.content.componentdescription_5 ? current.content.componentdescription_5.trim() : "----") + "</td>" +
																	"<td>" + (current.content.componentsageid_5 ? current.content.componentsageid_5.trim() : "----") + "</td>" +		
																	"<td>" + (current.content.supplierifnotcustomersupplied_5 ? current.content.supplierifnotcustomersupplied_5.trim() : "----") + "</td>" +		
																	"<td>" + (current.content.componentcostifnotcustomersupplied_5 ? current.content.componentcostifnotcustomersupplied_5.trim() : "----") + "</td>" +	
																	"<td>" + (current.content.componenthistory_5 ? current.content.componenthistory_5.trim() : "----") + "</td>" +	
																"</tr>" +
																"<tr>" +
																	"<td>" + (current.content.componentdescription_6 ? current.content.componentdescription_6.trim() : "----") + "</td>" +
																	"<td>" + (current.content.componentsageid_6 ? current.content.componentsageid_6.trim() : "----") + "</td>" +		
																	"<td>" + (current.content.supplierifnotcustomersupplied_6 ? current.content.supplierifnotcustomersupplied_6.trim() : "----") + "</td>" +		
																	"<td>" + (current.content.componentcostifnotcustomersupplied_6 ? current.content.componentcostifnotcustomersupplied_6.trim() : "----") + "</td>" +	
																	"<td>" + (current.content.componenthistory_6 ? current.content.componenthistory_6.trim() : "----") + "</td>" +	
																"</tr>" +
																"<tr>" +
																	"<td>" + (current.content.componentdescription_7 ? current.content.componentdescription_7.trim() : "----") + "</td>" +
																	"<td>" + (current.content.componentsageid_7 ? current.content.componentsageid_7.trim() : "----") + "</td>" +		
																	"<td>" + (current.content.supplierifnotcustomersupplied_7 ? current.content.supplierifnotcustomersupplied_7.trim() : "----") + "</td>" +		
																	"<td>" + (current.content.componentcostifnotcustomersupplied_7 ? current.content.componentcostifnotcustomersupplied_7.trim() : "----") + "</td>" +	
																	"<td>" + (current.content.componenthistory_7 ? current.content.componenthistory_7.trim() : "----") + "</td>" +	
																"</tr>" +
																"<tr>" +
																	"<td>" + (current.content.componentdescription_8 ? current.content.componentdescription_8.trim() : "----") + "</td>" +
																	"<td>" + (current.content.componentsageid_8 ? current.content.componentsageid_8.trim() : "----") + "</td>" +		
																	"<td>" + (current.content.supplierifnotcustomersupplied_8 ? current.content.supplierifnotcustomersupplied_8.trim() : "----") + "</td>" +		
																	"<td>" + (current.content.componentcostifnotcustomersupplied_8 ? current.content.componentcostifnotcustomersupplied_8.trim() : "----") + "</td>" +	
																	"<td>" + (current.content.componenthistory_8 ? current.content.componenthistory_8.trim() : "----") + "</td>" +	
																"</tr>" +
															"</tbody>" +
														"</table>" +														
													"</div></div><br><hr><hr><br>") 
											: "---")
						);
						console.log("undefined test: " + (current.content["Chip Box"] === undefined));
					break;
				case ("Add Component to SkuVault"):
					$('#response-well-' + responseCounter)
						.append(
							"<h4 class='response-type'>" + current.content.typeofupdate.trim() + "</h4>" +
							"<table class='table'>" +
								"<thead>" +
									"<tr>" +
										"<th scope='col'>Timestamp</th>" +
										"<th scope='col'>Email</th>" +
									"</tr>" +
								"</thead>" +
								"<tbody>" + 
									"<tr>" +
										"<td>" + moment(current.updated).format('MMMM Do YYYY, h:mm:ss a') + "</td>" +
										"<td>" + current.content.emailaddress.trim() + "</td>" +
									"</tr>" +
								"</tbody>" +
							"</table>" +
							"<div class='container'>" +
								"<div class='container components' style='border: 2px solid black;'>" +
									"<h5>Add Linked Components</h5>"+
									"<table class='table'>" +
										"<thead>" +
											"<tr>" +
												"<th scope='col'>Component Description</th>" +
												"<th scope='col'>Component Sage ID</th>" +
												"<th scope='col'>Supplier</th>" +
												"<th scope='col'>Cost</th>" +
												"<th scope='col'>History</th>" +
											"</tr>" +
										"<thead>" +
										"<tbody>" +
											"<tr>" +
												"<td>" + (current.content.componentdescription ? current.content.componentdescription.trim() : "----") + "</td>" +
												"<td>" + (current.content.componentsageid ? current.content.componentsageid.trim() : "----") + "</td>" +		
												"<td>" + (current.content.supplierifnotcustomersupplied ? current.content.supplierifnotcustomersupplied.trim() : "----") + "</td>" +		
												"<td>" + (current.content.componentcostifnotcustomersupplied ? current.content.componentcostifnotcustomersupplied.trim() : "----") + "</td>" +	
												"<td>" + (current.content.componenthistory ? current.content.componenthistory.trim() : "----") + "</td>" +	
											"</tr>" +
											"<tr>" +
												"<td>" + (current.content.componentdescription_2 ? current.content.componentdescription_2.trim() : "----") + "</td>" +
												"<td>" + (current.content.componentsageid_2 ? current.content.componentsageid_2.trim() : "----") + "</td>" +		
												"<td>" + (current.content.supplierifnotcustomersupplied_2 ? current.content.supplierifnotcustomersupplied_2.trim() : "----") + "</td>" +		
												"<td>" + (current.content.componentcostifnotcustomersupplied_2 ? current.content.componentcostifnotcustomersupplied_2.trim() : "----") + "</td>" +	
												"<td>" + (current.content.componenthistory_2 ? current.content.componenthistory_2.trim() : "----") + "</td>" +	
											"</tr>" +
											"<tr>" +
												"<td>" + (current.content.componentdescription_3 ? current.content.componentdescription_3.trim() : "----") + "</td>" +
												"<td>" + (current.content.componentsageid_3 ? current.content.componentsageid_3.trim() : "----") + "</td>" +		
												"<td>" + (current.content.supplierifnotcustomersupplied_3 ? current.content.supplierifnotcustomersupplied_3.trim() : "----") + "</td>" +		
												"<td>" + (current.content.componentcostifnotcustomersupplied_3 ? current.content.componentcostifnotcustomersupplied_3.trim() : "----") + "</td>" +	
												"<td>" + (current.content.componenthistory_3 ? current.content.componenthistory_3.trim() : "----") + "</td>" +	
											"</tr>" +
											"<tr>" +
												"<td>" + (current.content.componentdescription_4 ? current.content.componentdescription_4.trim() : "----") + "</td>" +
												"<td>" + (current.content.componentsageid_4 ? current.content.componentsageid_4.trim() : "----") + "</td>" +		
												"<td>" + (current.content.supplierifnotcustomersupplied_4 ? current.content.supplierifnotcustomersupplied_4.trim() : "----") + "</td>" +		
												"<td>" + (current.content.componentcostifnotcustomersupplied_4 ? current.content.componentcostifnotcustomersupplied_4.trim() : "----") + "</td>" +	
												"<td>" + (current.content.componenthistory_4 ? current.content.componenthistory_4.trim() : "----") + "</td>" +	
											"</tr>" +
											"<tr>" +
												"<td>" + (current.content.componentdescription_5 ? current.content.componentdescription_5.trim() : "----") + "</td>" +
												"<td>" + (current.content.componentsageid_5 ? current.content.componentsageid_5.trim() : "----") + "</td>" +		
												"<td>" + (current.content.supplierifnotcustomersupplied_5 ? current.content.supplierifnotcustomersupplied_5.trim() : "----") + "</td>" +		
												"<td>" + (current.content.componentcostifnotcustomersupplied_5 ? current.content.componentcostifnotcustomersupplied_5.trim() : "----") + "</td>" +	
												"<td>" + (current.content.componenthistory_5 ? current.content.componenthistory_5.trim() : "----") + "</td>" +	
											"</tr>" +
											"<tr>" +
												"<td>" + (current.content.componentdescription_6 ? current.content.componentdescription_6.trim() : "----") + "</td>" +
												"<td>" + (current.content.componentsageid_6 ? current.content.componentsageid_6.trim() : "----") + "</td>" +		
												"<td>" + (current.content.supplierifnotcustomersupplied_6 ? current.content.supplierifnotcustomersupplied_6.trim() : "----") + "</td>" +		
												"<td>" + (current.content.componentcostifnotcustomersupplied_6 ? current.content.componentcostifnotcustomersupplied_6.trim() : "----") + "</td>" +	
												"<td>" + (current.content.componenthistory_6 ? current.content.componenthistory_6.trim() : "----") + "</td>" +	
											"</tr>" +
											"<tr>" +
												"<td>" + (current.content.componentdescription_7 ? current.content.componentdescription_7.trim() : "----") + "</td>" +
												"<td>" + (current.content.componentsageid_7 ? current.content.componentsageid_7.trim() : "----") + "</td>" +		
												"<td>" + (current.content.supplierifnotcustomersupplied_7 ? current.content.supplierifnotcustomersupplied_7.trim() : "----") + "</td>" +		
												"<td>" + (current.content.componentcostifnotcustomersupplied_7 ? current.content.componentcostifnotcustomersupplied_7.trim() : "----") + "</td>" +	
												"<td>" + (current.content.componenthistory_7 ? current.content.componenthistory_7.trim() : "----") + "</td>" +	
											"</tr>" +
											"<tr>" +
												"<td>" + (current.content.componentdescription_8 ? current.content.componentdescription_8.trim() : "----") + "</td>" +
												"<td>" + (current.content.componentsageid_8 ? current.content.componentsageid_8.trim() : "----") + "</td>" +		
												"<td>" + (current.content.supplierifnotcustomersupplied_8 ? current.content.supplierifnotcustomersupplied_8.trim() : "----") + "</td>" +		
												"<td>" + (current.content.componentcostifnotcustomersupplied_8 ? current.content.componentcostifnotcustomersupplied_8.trim() : "----") + "</td>" +	
												"<td>" + (current.content.componenthistory_8 ? current.content.componenthistory_8.trim() : "----") + "</td>" +	
											"</tr>" +
										"</tbody>" +
									"</table>" +														
								"</div></div><br><hr><hr><br>"
						);
					break;
				case ("Update Component Details"):
					$('#response-well-' + responseCounter)
						.append(
							"<h4 class='response-type'>" + current.content.typeofupdate.trim() + "</h4>" +
							"<table class='table'>" +
								"<thead>" +
									"<tr>" +
										"<th scope='col'>Timestamp</th>" +
										"<th scope='col'>Email</th>" +
										"<th scope='col'>New Cost/Price</th>" +
									"</tr>" +
								"</thead>" +
								"<tbody>" + 
									"<tr>" +
										"<td>" + moment(current.updated).format('MMMM Do YYYY, h:mm:ss a') + "</td>" +
										"<td>" + current.content.emailaddress.trim() + "</td>" +
										"<td>" + (current.content.updatecostpricing ? (current.content.updatecostpricing.trim() + "</td></tr></tbody></table>") : ("N/A</td>" + 
									"</tr>" + 
								"</tbody>" + 
							"</table>" +
							"<div class=\"container\">" +
								"<div class=\"components container\" style='border: 2px solid black;'>" +
									"<h5>Add Linked Components</h5>"+
									"<table class='table'>" +
										"<thead>" +
											"<tr>" +
												"<th scope='col'>Component Description</th>" +
												"<th scope='col'>Component Sage ID</th>" +
												"<th scope='col'>Supplier</th>" +
												"<th scope='col'>Cost</th>" +
												"<th scope='col'>History</th>" +
											"</tr>" +
										"<thead>" +
										"<tbody>" +
											"<tr>" +
												"<td>" + (current.content.componentdescription ? current.content.componentdescription.trim() : "----") + "</td>" +
												"<td>" + (current.content.componentsageid ? current.content.componentsageid.trim() : "----") + "</td>" +		
												"<td>" + (current.content.supplierifnotcustomersupplied ? current.content.supplierifnotcustomersupplied.trim() : "----") + "</td>" +		
												"<td>" + (current.content.componentcostifnotcustomersupplied ? current.content.componentcostifnotcustomersupplied.trim() : "----") + "</td>" +	
												"<td>" + (current.content.componenthistory ? current.content.componenthistory.trim() : "----") + "</td>" +	
											"</tr>" +
											"<tr>" +
												"<td>" + (current.content.componentdescription_2 ? current.content.componentdescription_2.trim() : "----") + "</td>" +
												"<td>" + (current.content.componentsageid_2 ? current.content.componentsageid_2.trim() : "----") + "</td>" +		
												"<td>" + (current.content.supplierifnotcustomersupplied_2 ? current.content.supplierifnotcustomersupplied_2.trim() : "----") + "</td>" +		
												"<td>" + (current.content.componentcostifnotcustomersupplied_2 ? current.content.componentcostifnotcustomersupplied_2.trim() : "----") + "</td>" +	
												"<td>" + (current.content.componenthistory_2 ? current.content.componenthistory_2.trim() : "----") + "</td>" +	
											"</tr>" +
											"<tr>" +
												"<td>" + (current.content.componentdescription_3 ? current.content.componentdescription_3.trim() : "----") + "</td>" +
												"<td>" + (current.content.componentsageid_3 ? current.content.componentsageid_3.trim() : "----") + "</td>" +		
												"<td>" + (current.content.supplierifnotcustomersupplied_3 ? current.content.supplierifnotcustomersupplied_3.trim() : "----") + "</td>" +		
												"<td>" + (current.content.componentcostifnotcustomersupplied_3 ? current.content.componentcostifnotcustomersupplied_3.trim() : "----") + "</td>" +	
												"<td>" + (current.content.componenthistory_3 ? current.content.componenthistory_3.trim() : "----") + "</td>" +	
											"</tr>" +
											"<tr>" +
												"<td>" + (current.content.componentdescription_4 ? current.content.componentdescription_4.trim() : "----") + "</td>" +
												"<td>" + (current.content.componentsageid_4 ? current.content.componentsageid_4.trim() : "----") + "</td>" +		
												"<td>" + (current.content.supplierifnotcustomersupplied_4 ? current.content.supplierifnotcustomersupplied_4.trim() : "----") + "</td>" +		
												"<td>" + (current.content.componentcostifnotcustomersupplied_4 ? current.content.componentcostifnotcustomersupplied_4.trim() : "----") + "</td>" +	
												"<td>" + (current.content.componenthistory_4 ? current.content.componenthistory_4.trim() : "----") + "</td>" +	
											"</tr>" +
											"<tr>" +
												"<td>" + (current.content.componentdescription_5 ? current.content.componentdescription_5.trim() : "----") + "</td>" +
												"<td>" + (current.content.componentsageid_5 ? current.content.componentsageid_5.trim() : "----") + "</td>" +		
												"<td>" + (current.content.supplierifnotcustomersupplied_5 ? current.content.supplierifnotcustomersupplied_5.trim() : "----") + "</td>" +		
												"<td>" + (current.content.componentcostifnotcustomersupplied_5 ? current.content.componentcostifnotcustomersupplied_5.trim() : "----") + "</td>" +	
												"<td>" + (current.content.componenthistory_5 ? current.content.componenthistory_5.trim() : "----") + "</td>" +	
											"</tr>" +
											"<tr>" +
												"<td>" + (current.content.componentdescription_6 ? current.content.componentdescription_6.trim() : "----") + "</td>" +
												"<td>" + (current.content.componentsageid_6 ? current.content.componentsageid_6.trim() : "----") + "</td>" +		
												"<td>" + (current.content.supplierifnotcustomersupplied_6 ? current.content.supplierifnotcustomersupplied_6.trim() : "----") + "</td>" +		
												"<td>" + (current.content.componentcostifnotcustomersupplied_6 ? current.content.componentcostifnotcustomersupplied_6.trim() : "----") + "</td>" +	
												"<td>" + (current.content.componenthistory_6 ? current.content.componenthistory_6.trim() : "----") + "</td>" +	
											"</tr>" +
											"<tr>" +
												"<td>" + (current.content.componentdescription_7 ? current.content.componentdescription_7.trim() : "----") + "</td>" +
												"<td>" + (current.content.componentsageid_7 ? current.content.componentsageid_7.trim() : "----") + "</td>" +		
												"<td>" + (current.content.supplierifnotcustomersupplied_7 ? current.content.supplierifnotcustomersupplied_7.trim() : "----") + "</td>" +		
												"<td>" + (current.content.componentcostifnotcustomersupplied_7 ? current.content.componentcostifnotcustomersupplied_7.trim() : "----") + "</td>" +	
												"<td>" + (current.content.componenthistory_7 ? current.content.componenthistory_7.trim() : "----") + "</td>" +	
											"</tr>" +
											"<tr>" +
												"<td>" + (current.content.componentdescription_8 ? current.content.componentdescription_8.trim() : "----") + "</td>" +
												"<td>" + (current.content.componentsageid_8 ? current.content.componentsageid_8.trim() : "----") + "</td>" +		
												"<td>" + (current.content.supplierifnotcustomersupplied_8 ? current.content.supplierifnotcustomersupplied_8.trim() : "----") + "</td>" +		
												"<td>" + (current.content.componentcostifnotcustomersupplied_8 ? current.content.componentcostifnotcustomersupplied_8.trim() : "----") + "</td>" +	
												"<td>" + (current.content.componenthistory_8 ? current.content.componenthistory_8.trim() : "----") + "</td>" +	
											"</tr>" +
										"</tbody>" +
									"</table>" +														
								"</div></div><br><hr><hr><br>")
						)
					);
					break;
			}
			responseCounter++;
			// console.log("Item number " + (k + 1) + " submitted at " + current.updated + ".\n" + current.content.typeofupdate.trim());
		};
		$("#jumbo").append("<p class='lead'>" + greeting + "</p><hr class='my-4'><ul>" + linkBank + "</ul>");
	}
		

	// AJAX call
	$.ajax({
    url : url,
    type : 'GET',
    dataType : 'jsonp',
    success : function(res, status){
        console.log('status : ' + status);
        var parsed = parseData(res);
        printData(parsed);
    },
    error : function(res, status, error){
        console.log('status : ' + status);
        console.log(res);
        console.log(error);
    }
	});
});