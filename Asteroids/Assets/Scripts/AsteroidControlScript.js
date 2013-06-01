#pragma strict

// the asteroid movement
var move:Vector3;
var rotate:float;

// the asteroid size
var size:float = 1.0f;

// invincibility of the asteroid
var invincible:boolean = true;

// the powerup prefab
var powerup:Rigidbody;

// the explosion
var explosion:GameObject;

function Update() {
	// move the asteroid through the space
	transform.Translate(move * Time.deltaTime, Space.World);
	transform.Rotate(Vector3.back * rotate * Time.deltaTime);
	
	// check the player and screen borders
	if (transform.position.x < ScreenBorderScript.left - (size / 2))
		transform.position.x = ScreenBorderScript.right + (size / 2);
	
	if (transform.position.y < ScreenBorderScript.top - (size / 2))
		transform.position.y = ScreenBorderScript.bottom + (size / 2);
	
	if (transform.position.x > ScreenBorderScript.right + (size / 2))
		transform.position.x = ScreenBorderScript.left - (size / 2);
	
	if (transform.position.y > ScreenBorderScript.bottom + (size / 2))
		transform.position.y = ScreenBorderScript.top - (size / 2);
}

function OnTriggerEnter(other:Collider) {
	if (!invincible) {
		if (other.tag == "Laser") {
			other.GetComponent(LaserScript).hitObject = true;
		}
		
		if (other.tag == "Laser" || other.tag == "Shockwave") {
			Kill();
			
			if (size > 1.0f) Split();
			else GeneratePowerup();
			
			Destroy(gameObject);
			if (other.tag == "Laser") Destroy(other.gameObject);
			
			GameControllerScript.score += 10;
		}
	}
}

function Init() {
	transform.position = Vector3(Random.Range(-5, 5), Random.Range(-5, 5), 0);
	
	move = Vector3(Random.Range(-2.5f, 2.5f) * 1.5, Random.Range(-3.5f, 3.5f) * 1.5, 0);
	rotate = Random.Range(-20.0f, 20.0f);
	
	// fix the object's scale
	transform.localScale = Vector3(size, size, 1);
}

// when a smaller asteroid is generated, this function takes care of its movement
function SetDirection() {
	// the move direction
	move = Vector3(Random.Range(-3.5f, 3.5f) * 1.5, Random.Range(-3.5f, 3.5f) * 1.5, 0);
	
	// generate a rotation
	rotate = Random.Range(-20.0f, 20.0f);
	
	// fix the object's scale
	transform.localScale = Vector3(size, size, size);
}

// sets the size of an asteroid and initializes it
function SetSize(s:float) {
	size = s;
	Init();
	
	Invoke("RemoveInvincibility", 0.2f);
}

// override to set direction for smaller rocks
function SetSize(s:float, init:boolean) {
	size = s;
	
	if (init)
		Init();
	else
		SetDirection();
	
	Invoke("RemoveInvincibility", 0.2f);
}

function Split() {
	var newSize:float = size - 0.5f;
	
	for (var i = 0; i < 3; i++) {
		var newAsteroid:Rigidbody = Instantiate(GetComponent(Rigidbody), transform.position, transform.rotation);
		newAsteroid.GetComponent(AsteroidControlScript).SetSize(newSize, false);
	}
}

function RemoveInvincibility() {
	invincible = false;
}

function GeneratePowerup() {
	var rand = Random.Range(0, 5);
	
	if (rand == 3) {
		var powerup = Instantiate(powerup, transform.position, transform.rotation);
		powerup.GetComponent(PowerupScript).SetParams(move, rotate);
	}
}

function Kill() {
	Instantiate(explosion, transform.position, Quaternion.identity);
}