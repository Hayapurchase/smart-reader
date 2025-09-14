Set objShell = CreateObject("WScript.Shell")
Set objFSO = CreateObject("Scripting.FileSystemObject")

' Get the directory where this script is located
strScriptPath = objFSO.GetParentFolderName(WScript.ScriptFullName)

' Change to the script directory
objShell.CurrentDirectory = strScriptPath

' Check if package.json exists
If Not objFSO.FileExists(strScriptPath & "\package.json") Then
    MsgBox "Error: package.json not found!" & vbCrLf & vbCrLf & "Please make sure this script is in your project directory.", vbCritical, "Smart Reader Error"
    WScript.Quit
End If

' Check if node_modules exists
If Not objFSO.FolderExists(strScriptPath & "\node_modules") Then
    MsgBox "Installing dependencies..." & vbCrLf & vbCrLf & "This may take a few minutes on first run.", vbInformation, "Smart Reader"
    
    ' Run npm install
    intReturn = objShell.Run("npm install", 1, True)
    
    If intReturn <> 0 Then
        MsgBox "Failed to install dependencies." & vbCrLf & vbCrLf & "Make sure Node.js and npm are installed.", vbCritical, "Smart Reader Error"
        WScript.Quit
    End If
    
    MsgBox "Dependencies installed successfully!", vbInformation, "Smart Reader"
End If

' Start the application
objShell.Run "npm start", 1, False
