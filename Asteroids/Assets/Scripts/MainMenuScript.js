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
	var posX = (Screen.width - background.width) / 2;
	var posY = (Screen.height - background.height) / 2;
	
	GUI.DrawTexture(Rect(posX, posY, background.width, background.height), background, ScaleMode.StretchToFill);
	
	if (nameInput) {
		posX = (Screen.width - 235) / 2;
		
		GUI.Label(Rect(posX, posY + 570, 250, 25), "Please enter your name:");
		
		GameControllerScript.playerName = GUI.TextField(Rect(posX, posY + 600, 150, 25), GameControllerScript.playerName);
		
		if (GUI.Button(Rect(posX + 160, posY + 600, 75, 25), "OK")) {
			if (GameControllerScript.playerName != "") {
				Application.LoadLevel(1);
			}
		}
		
		if (GUI.Button(Rect(posX + 160, posY + 635, 75, 25), "Back")) {
			nameInput = false;
		}
		
	} else {
		posX = (Screen.width - 100) / 2;
		
		// the new game button
		if (GUI.Button(Rect(posX, posY + 540, 100, 30), "New Game")) {
			nameInput = true;
		}
		
		// the quit button
		if (GUI.Button(Rect(posX, posY + 590, 100, 30), "Quit")) {
			Application.Quit();
		}
	}
}