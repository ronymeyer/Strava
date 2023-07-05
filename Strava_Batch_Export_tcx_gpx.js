// Bulk / batch download / export all Strava activities as tcx (or gpx or original (fit for example)). File can then be imported into Garmin Connect.
//
// To export as gpx instead of tcx change /export_tcx to /export_gpx (line 29/36) and change file extension (line 27)
// To export as original instead of tcx change /export_tcx to /export_original (line 29/36) and change file extension (line 27)
//
// 1. Go to https://www.strava.com/athlete/training
//
// 2. Open the Chrome developer console
//
// 3. Paste into the console the code from
// https://github.com/eligrey/FileSaver.js/blob/master/src/FileSaver.js (copy saved in this repo in case in case other repo goes down).
//
// 4. Paste the two functions below into the console
//
// 5. Type run getAllActivities()
//
// This loops through all pages and downloads all activities
// There is a 3 second delay after each page.
//
// Strava has some rate limits and stops returning data after aground
// 1500 requests. Wait for a few hours and continue (change p to page where it stopped)

function getActivity(i, p, attr) {
   return new Promise(function(resolve, reject) {
       //var attr = activityCollection.models[i].attributes
       //console.log(attr);
       var filename = attr.start_time + '-' + attr.name + ".tcx"
       var xhttp = new XMLHttpRequest();
       xhttp.open("GET", attr.activity_url + "/export_tcx", true);
       xhttp.responseType = 'blob'
       xhttp.onload = function() {
           if (xhttp.responseURL === attr.activity_url) { // 302 redirect back to the activity page
               console.log (p + ':' + i 
                 + ": Looks like Strava can't download this activity. Does it have a distance?\n"
                 + "Try manually downloading this url " 
                 + attr.activity_url + "/export_tcx");
           } else {
               saveAs(xhttp.response, filename);
               console.log(p + ':' + i + ':' + filename);
           }
           resolve();
       }
       xhttp.onerror = function() {
           console.log("Error: " + i + ':' + filename);
           reject();
       }
       xhttp.send();
   });
}

async function getAllActivities() {
	var maxPage = 147; // calculate this using (activities/20 + 1)
	var p = 1;
	var done = 0;
	var url;
	while (p <= maxPage) {
		url = "https://www.strava.com/athlete/training_activities" +
			"?keywords=&workout_type=&commute=&private_activities=" +
			"&trainer=&gear=&new_activity_only=false" +
			"&page=" + p + "&per_page=20";
		var ac = await jQuery.ajax({
									url: url,
									dataType: "json",
									method: "GET"
								});
		console.log(p + ':' + i + ':' + ac);
		for (var i = 0; i < ac.models.length; i++) {
			await getActivity(i, p, ac.models[i]);
  	    }
		await new Promise(r => setTimeout(r, 3000));
		p++;
	};
    console.log('all done.');
}
