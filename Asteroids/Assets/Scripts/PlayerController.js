#pragma strict

// the player speed
var moveSpeed:float = 10.0f;
var rotationSpeed:float = 180.0f;

// the laser prefab
var laser:Rigidbody;

// the shockwave prefab
var shockwave:Rigidbody;

// the player health
var health:float = 1.0f;

// rapid shot variables
private var rapidShotMax:int = 30;
private var rapidShotCount:int = 0;
private var rapidShotCooldown:float = 0.0f;
private var rapidShotCooldownMax:float = 0.05f;

// triple laser variables
private var tripleLaserMax:int = 10;
private var tripleLaserCount:int = 0;

// shockwave variables
private var shockwaveMax:int = 2;
private var shockwaveCount:int = 0;

// shot variables
static var shotsFired:int;
static var shotsMissed:int;
static var shotsHit:int;

function Start() {
	renderer.material.color = Color.red;
	
	shotsFired = 0;
	shotsMissed = 0;
	shotsHit = 0;
}

function Update() {
	// rotate the player
	var rotation:Vector3 = Vector3.back * Input.GetAxis("Horizontal") * rotationSpeed;
	transform.Rotate(rotation * Time.deltaTime);
	
	// move the player
	var movement:Vector3 = Vector3.up * Input.GetAxis("Vertical") * moveSpeed;
	transform.Translate(movement * Time.deltaTime);
	
	// check the player and screen borders
	if (transform.position.x < ScreenBorderScript.left - 0.5f)
		transform.position.x = ScreenBorderScript.right + 0.5f;
	
	if (transform.position.y < ScreenBorderScript.top - 0.5f)
		transform.position.y = ScreenBorderScript.bottom + 0.5f;
	
	if (transform.position.x > ScreenBorderScript.right + 0.5f)
		transform.position.x = ScreenBorderScript.left - 0.5f;
	
	if (transform.position.y > ScreenBorderScript.bottom + 0.5f)
		transform.position.y = ScreenBorderScript.top - 0.5f;
	
	// fire some lasers!
	if (Input.GetKeyDown(KeyCode.Space) && rapidShotCount == 0) {
		FireLaser();
	}
	
	if (Input.GetKey(KeyCode.Space) && rapidShotCount > 0) {
		if (rapidShotCooldown <= 0) {
			FireLaser();
			rapidShotCooldown = rapidShotCooldownMax;
			rapidShotCount--;
		} else {
			rapidShotCooldown -= Time.deltaTime;
		}
	}
	
	if (Input.GetKeyDown(KeyCode.LeftShift) && shockwaveCount > 0) {
		Instantiate(shockwave, transform.position, Quaternion.identity);
		shockwaveCount--;
	}
}

function AddPowerup(powerup:String) {
	switch (powerup) {
		case "Triple Laser":
			tripleLaserCount = tripleLaserMax;
			break;
		case "Shockwave":
			shockwaveCount = shockwaveMax;
			break;
		case "Rapid Shot":
			rapidShotCount = rapidShotMax;
			break;
	}
}

function FireLaser() {
	var tempLaser:Rigidbody;
	Instantiate(laser, transform.position, transform.rotation);
	
	if (tripleLaserCount > 0) {
		tempLaser = Instantiate(laser, transform.position, transform.rotation);
		tempLaser.transform.Rotate(0, 0, 10);
		tempLaser = Instantiate(laser, transform.position, transform.rotation);
		tempLaser.transform.Rotate(0, 0, -10);
		
		tripleLaserCount--;
	}
}

function OnTriggerEnter(other:Collider) {
	if (other.tag == "Asteroid") {
		health -= 0.08f;
		
		other.GetComponent(AsteroidControlScript).Kill();
		Destroy(other.gameObject);
	}
}

function OnGUI() {
	GUI.Label(Rect(330, 10, 100, 25), "Health: " + Mathf.Ceil(health * 100));
	
	GUI.Label(Rect(Screen.width - 330, 10, 100, 25), "Fired: " + shotsFired);
	GUI.Label(Rect(Screen.width - 220, 10, 100, 25), "Hit: " + shotsHit);
	GUI.Label(Rect(Screen.width - 110, 10, 100, 25), "Missed: " + shotsMissed);
	
	var ypos:int = 45;
	if (tripleLaserCount > 0) {
		GUI.Label(Rect(Screen.width - 110, ypos, 100, 25), "Triple Laser: " + tripleLaserCount);
		ypos += 35;
	}

	if (rapidShotCount > 0) {
		GUI.Label(Rect(Screen.width - 110, ypos, 100, 25), "Rapid Shot: " + rapidShotCount);
		ypos += 35;
	}

	if (shockwaveCount > 0) {
		GUI.Label(Rect(Screen.width - 110, ypos, 100, 25), "Shockwave: " + shockwaveCount);
	}
}