# Strava

scr folder contains a file Strava_Batch_Export_tcx_gpx.js:

 Bulk / batch download / export all Strava activities as tcx (or gpx or original (fit for example)). File can then be imported into Garmin Connect.

To export as gpx instead of tcx change /export_tcx to /export_gpx (line 29/36) and change file extension (line 27)
To export as original instead of tcx change /export_tcx to /export_original (line 29/36) and change file extension (line 27)

// 1. Go to https://www.strava.com/athlete/training
// 2. Open the Chrome developer console
// 3. Paste into the console the code from
// https://github.com/eligrey/FileSaver.js/blob/master/src/FileSaver.js (copy saved in this repo in case in case other repo goes down).
// 4. Paste the two functions below into the console
// 5. Type run getAllActivities()

This loops through all pages and downloads all activities
There is a 3 second delay after each page.

Strava has some rate limits and stops returning data after aground
1500 requests. Wait for a few hours and continue (change p to page where it stopped)
