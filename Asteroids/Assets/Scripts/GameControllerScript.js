#pragma strict

// the current level
var level:int = 1;
var maximumAsteroids:int = 5;
var asteroidsGenerated:int = 0;
var maximumSize:int = 2;

// the asteroid prefab
var asteroidPrefab:Rigidbody;

// the background materials
var backgroundMaterials:Material[];

// the player variables
static var playerName:String = String.Empty;
static var score:int = 0;

// the game time
private var targetTime:float;

function Start() {
	score = 0;
	
	targetTime = Time.time + 60;
	GenerateAsteroids();
}

function Update() {
	var currentTime:float = targetTime - Time.time;
	
	if (currentTime <= 0) {
		Application.LoadLevel("GameOver");
	}
	
	CheckAsteroids();
}

function OnGUI() {
	var currentTime = Mathf.CeilToInt(targetTime - Time.time);
	
	GUI.Label(Rect(10, 10, 100, 25), playerName);
	GUI.Label(Rect(110, 10, 100, 25), "Level: " + level);
	GUI.Label(Rect(220, 10, 100, 25), "Score: " + score);
	
	GUI.Label(Rect(10, 45, 100, 25), "Deadline: " + currentTime);
}

// generates the level's asteroids
function GenerateAsteroids() {
	if (asteroidsGenerated < maximumAsteroids) {
		var size:float = Random.Range(2, maximumSize + 1) / 2;
		
		var asteroid:Rigidbody = Instantiate(asteroidPrefab, Vector3(0, 0, -20), Quaternion.identity);
		asteroid.GetComponent(AsteroidControlScript).SetSize(size);
		
		asteroidsGenerated++;
		
		Invoke("GenerateAsteroids", Random.Range(0.65f, 2.0f));
	}
}


// checks the number of asteroids
function CheckAsteroids() {
	if (GameObject.FindGameObjectsWithTag("Asteroid").Length == 0 && asteroidsGenerated >= maximumAsteroids) {
		level++;
		asteroidsGenerated = 0;
		targetTime = Time.time + 60;
		
		if (level < 6) {
			var background:GameObject = GameObject.Find("Background");
			background.renderer.material = backgroundMaterials[level - 1];
		} else {
			Application.LoadLevel("GameOver");
		}
		
		if (level < 5) {
			maximumSize++;
			maximumAsteroids = 4 + level;
			
			GenerateAsteroids();
		} else if (level == 5) {
			var asteroid:Rigidbody = Instantiate(asteroidPrefab, Vector3(0, 0, -20), Quaternion.identity);
			asteroid.GetComponent(AsteroidControlScript).SetSize(3);
			asteroidsGenerated = 0;
			maximumAsteroids = 0;
		}
	}
}