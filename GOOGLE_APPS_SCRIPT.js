/**
 * CUET CAD Society Registration Handler
 * Google Apps Script for handling registration submissions
 * 
 * Setup Instructions:
 * 1. Replace the FOLDER_ID constants with your actual Google Drive folder IDs
 * 2. Deploy as Web App with "Anyone" access
 * 3. Copy the deployment URL to Sanity CMS configuration
 */

// ===== CONFIGURATION - REPLACE WITH YOUR FOLDER IDs =====
const MEMBER_FOLDER_ID = 'YOUR_MEMBER_FOLDER_ID';
const EVENT_FOLDER_ID = 'YOUR_EVENT_FOLDER_ID';
const WORKSHOP_FOLDER_ID = 'YOUR_WORKSHOP_FOLDER_ID';
// ========================================================

/**
 * Main handler for POST requests from the registration form
 */
function doPost(e) {
  try {
    // Parse the incoming JSON data
    const data = JSON.parse(e.postData.contents);
    
    Logger.log('Received registration data: ' + JSON.stringify({
      name: data.name,
      email: data.email,
      type: data.registrationType
    }));
    
    // Upload image to Google Drive
    const imageUrl = uploadImageToDrive(
      data.image, 
      data.imageFileName, 
      data.registrationType,
      data.name
    );
    
    // Append data to appropriate Google Sheet
    appendToSheet(
      data.sheetId,
      data.registrationType,
      {
        name: data.name,
        email: data.email,
        department: data.department,
        year: data.year,
        batchNo: data.batchNo,
        mobileNo: data.mobileNo,
        linkedinId: data.linkedinId,
        facebookId: data.facebookId,
        paymentMethod: data.paymentMethod,
        transactionId: data.transactionId,
        imageUrl: imageUrl
      }
    );
    
    Logger.log('Registration processed successfully for: ' + data.name);
    
    return ContentService.createTextOutput(
      JSON.stringify({ 
        success: true, 
        message: 'Registration submitted successfully',
        imageUrl: imageUrl
      })
    ).setMimeType(ContentService.MimeType.JSON);
    
  } catch (error) {
    Logger.log('Error processing registration: ' + error.toString());
    
    return ContentService.createTextOutput(
      JSON.stringify({ 
        success: false, 
        error: error.toString() 
      })
    ).setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * Upload image to Google Drive and return public URL
 */
function uploadImageToDrive(base64Image, fileName, registrationType, userName) {
  try {
    // Select folder based on registration type
    let folderId;
    switch(registrationType) {
      case 'member':
        folderId = MEMBER_FOLDER_ID;
        break;
      case 'event':
        folderId = EVENT_FOLDER_ID;
        break;
      case 'workshop':
        folderId = WORKSHOP_FOLDER_ID;
        break;
      default:
        throw new Error('Invalid registration type: ' + registrationType);
    }
    
    const folder = DriveApp.getFolderById(folderId);
    
    // Remove the data URL prefix (e.g., "data:image/jpeg;base64,")
    const base64Data = base64Image.split(',')[1];
    
    // Decode base64 to blob
    const blob = Utilities.newBlob(
      Utilities.base64Decode(base64Data),
      'image/jpeg',
      generateUniqueFileName(fileName, userName)
    );
    
    // Create file in Drive
    const file = folder.createFile(blob);
    
    // Set sharing to anyone with link
    file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
    
    // Return the public URL
    return file.getUrl();
    
  } catch (error) {
    Logger.log('Error uploading image: ' + error.toString());
    throw new Error('Image upload failed: ' + error.toString());
  }
}

/**
 * Append registration data to the appropriate sheet
 */
function appendToSheet(sheetId, registrationType, data) {
  try {
    const spreadsheet = SpreadsheetApp.openById(sheetId);
    
    // Select sheet based on registration type
    let sheetName;
    switch(registrationType) {
      case 'member':
        sheetName = 'Members';
        break;
      case 'event':
        sheetName = 'Events';
        break;
      case 'workshop':
        sheetName = 'Workshops';
        break;
      default:
        throw new Error('Invalid registration type: ' + registrationType);
    }
    
    const sheet = spreadsheet.getSheetByName(sheetName);
    
    if (!sheet) {
      throw new Error('Sheet not found: ' + sheetName);
    }
    
    // Prepare row data
    const timestamp = new Date();
    const rowData = [
      timestamp,
      data.name,
      data.email,
      data.department,
      data.year,
      data.batchNo,
      data.mobileNo,
      data.linkedinId,
      data.facebookId,
      data.paymentMethod,
      data.transactionId,
      data.imageUrl,
      'Pending' // Status
    ];
    
    // Append to sheet
    sheet.appendRow(rowData);
    
    Logger.log('Data appended to sheet: ' + sheetName);
    
  } catch (error) {
    Logger.log('Error appending to sheet: ' + error.toString());
    throw new Error('Sheet update failed: ' + error.toString());
  }
}

/**
 * Generate unique filename with timestamp
 */
function generateUniqueFileName(originalFileName, userName) {
  const timestamp = new Date().getTime();
  const sanitizedName = userName.replace(/[^a-zA-Z0-9]/g, '_');
  const extension = originalFileName.split('.').pop();
  return `${sanitizedName}_${timestamp}.${extension}`;
}

/**
 * Test function to verify script is working
 * Run this from Apps Script editor to test
 */
function testScript() {
  Logger.log('Script is working!');
  Logger.log('Member Folder ID: ' + MEMBER_FOLDER_ID);
  Logger.log('Event Folder ID: ' + EVENT_FOLDER_ID);
  Logger.log('Workshop Folder ID: ' + WORKSHOP_FOLDER_ID);
  
  // Test folder access
  try {
    const memberFolder = DriveApp.getFolderById(MEMBER_FOLDER_ID);
    Logger.log('✓ Member folder accessible: ' + memberFolder.getName());
  } catch (e) {
    Logger.log('✗ Member folder not accessible: ' + e.toString());
  }
  
  try {
    const eventFolder = DriveApp.getFolderById(EVENT_FOLDER_ID);
    Logger.log('✓ Event folder accessible: ' + eventFolder.getName());
  } catch (e) {
    Logger.log('✗ Event folder not accessible: ' + e.toString());
  }
  
  try {
    const workshopFolder = DriveApp.getFolderById(WORKSHOP_FOLDER_ID);
    Logger.log('✓ Workshop folder accessible: ' + workshopFolder.getName());
  } catch (e) {
    Logger.log('✗ Workshop folder not accessible: ' + e.toString());
  }
}

/**
 * Optional: Send email notification on new registration
 * Uncomment and configure if needed
 */
/*
function sendEmailNotification(data) {
  const recipient = 'admin@cuetcad.org'; // Change to your admin email
  const subject = 'New Registration: ' + data.registrationType;
  const body = `
    New ${data.registrationType} registration received:
    
    Name: ${data.name}
    Email: ${data.email}
    Department: ${data.department}
    Year: ${data.year}
    
    View image: ${data.imageUrl}
    
    Please review the submission in the Google Sheet.
  `;
  
  MailApp.sendEmail(recipient, subject, body);
}
*/
