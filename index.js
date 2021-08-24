function txtToDoc() {

  const destinationOperados = DriveApp.getFolderById("YOUR FOLDER ID HERE");

  let files = destinationOperados.getFiles();

  while (files.hasNext()) {
    let file = files.next();
    let fileStr = file.toString();
    let fileNameList = fileStr.split(".");
    let fileNameFirst = fileNameList[0];
    let fileName = fileNameFirst.toString();
    Logger.log(fileStr);

    var txtText = file.getBlob().getDataAsString();
    Logger.log(txtText);
    
    docName = (fileName + '.doc');

    try {

      var newDoc = 
      DocumentApp.create(docName);
      var id = newDoc.getId();

    }

    catch (err) {

      DocumentApp.create(docName);

      fileList =  DriveApp.getFilesByName(docName);

      while (fileList.hasNext()) {  
        id = fileList.next().getId();

      }

    }

    var doc = DocumentApp.openById(id);
    var body = doc.getBody();
    var paragraph = body.getParagraphs()[0];
    paragraph.insertText(0, txtText);
    var docFile = DriveApp.getFileById(id);
    
    destinationOperados.addFile(docFile); 

    DriveApp.getRootFolder().removeFile(docFile);

    destinationOperados.removeFile(file);

    }

}
