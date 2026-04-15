/**
 * Google Apps Script — deploy as Web App.
 *
 * Setup:
 * 1. Go to https://script.google.com and create a new project.
 * 2. Paste this entire file into Code.gs.
 * 3. Replace SHEET_ID with your Google Sheet ID (from the sheet URL).
 * 4. Deploy → New deployment → Web app → Execute as: Me, Who has access: Anyone.
 * 5. Copy the web app URL and set it as VITE_GOOGLE_SCRIPT_URL in your .env file.
 */

const SHEET_ID = '19MmdQj53umbTIC9o_zZUi1sgktynBJd8jXVuVZgXc7Q';
const NOTIFY_EMAIL = 'himanshu19468@iiitd.ac.in';

function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);
    var sheet = SpreadsheetApp.openById(SHEET_ID).getActiveSheet();

    if (sheet.getLastRow() === 0) {
      sheet.appendRow(['Timestamp', 'Platform', 'Email', 'Topics', 'Channel Link', 'Month']);
    }

    sheet.appendRow([
      data.timestamp || new Date().toISOString(),
      data.platform || '',
      data.email || '',
      data.topics || '',
      data.channelLink || '',
      data.month || ''
    ]);

    if (NOTIFY_EMAIL) {
      var subject = 'New CrazyTrail Request: ' + (data.platform || 'Unknown');
      var body = 'New submission received!\n\n'
        + 'Platform: ' + data.platform + '\n'
        + 'Email: ' + data.email + '\n'
        + 'Topics: ' + data.topics + '\n'
        + 'Channel: ' + (data.channelLink || 'Not provided') + '\n'
        + 'Month: ' + data.month + '\n'
        + 'Timestamp: ' + data.timestamp;
      MailApp.sendEmail(NOTIFY_EMAIL, subject, body);
    }

    return ContentService
      .createTextOutput(JSON.stringify({ status: 'success' }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ status: 'error', message: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet() {
  return ContentService
    .createTextOutput(JSON.stringify({ status: 'ok', message: 'CrazyTrail API is running' }))
    .setMimeType(ContentService.MimeType.JSON);
}
