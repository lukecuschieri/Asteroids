#pragma strict

var gameOverTexture:Texture2D;

function OnGUI() {
	var posX = (Screen.width - gameOverTexture.width) / 2;
	var posY = (Screen.height - gameOverTexture.height) / 2;
	
	GUI.DrawTexture(Rect(posX, posY, gameOverTexture.width, gameOverTexture.height), gameOverTexture, ScaleMode.StretchToFill);
	GUI.Label(Rect((Screen.width - 250) / 2, posY + 600, 250, 35), "Your score: " + GameControllerScript.score);
	
	if (GUI.Button(Rect((Screen.width - 100) / 2, Screen.height - 60, 100, 50), "Main Menu")) {
		Application.LoadLevel("MainMenu");
	}
}