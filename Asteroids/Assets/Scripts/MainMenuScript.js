#pragma strict

// the name input variable
var nameInput:boolean = false;

// the background image
var background:Texture2D;

function Start() {
	nameInput = false;
	GameControllerScript.playerName = "";
}

function OnGUI() {
	GUI.DrawTexture(Rect(0, 0, background.width, background.height), background);
	
	if (nameInput) {
		GUI.Label(Rect(100, 570, 250, 25), "Please enter your name:");
		
		GameControllerScript.playerName = GUI.TextField(Rect(100, 600, 150, 25), GameControllerScript.playerName);
		
		if (GUI.Button(Rect(260, 600, 75, 25), "OK")) {
			if (GameControllerScript.playerName != "") {
				Application.LoadLevel(1);
			}
		}
		
	} else {
		// the new game button
		if (GUI.Button(Rect(100, 540, 100, 30), "New Game")) {
			nameInput = true;
		}
		
		// the quit button
		if (GUI.Button(Rect(100, 590, 100, 30), "Quit")) {
			Application.Quit();
		}
	}
}