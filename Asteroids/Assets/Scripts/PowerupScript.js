#pragma strict

// the powerup direction
var direction:Vector3;
var rotation:float;
var powerupType:String;

// the powerup materials
var tripleLaser:Material;
var shockwave:Material;
var rapidShot:Material;

function SetParams(dir:Vector3, rot:float) {
	direction = dir;
	rotation = rot;
}

function Start() {
	var rand = Random.Range(0, 3);
	switch (rand) {
		case 0:
			powerupType = "Triple Laser";
			renderer.material = tripleLaser;
			break;
		case 1:
			powerupType = "Shockwave";
			renderer.material = shockwave;
			break;
		case 2:
			powerupType = "Rapid Shot";
			renderer.material = rapidShot;
			break;
	}
}

function Update() {
	transform.Translate(direction * Time.deltaTime, Space.World);
	transform.Rotate(Vector3.back * rotation * Time.deltaTime);
}

function OnTriggerEnter(other:Collider) {
	if (other.tag == "Player") {
		other.GetComponent(PlayerController).AddPowerup(powerupType);
		
		Destroy(gameObject);
	}
}

function OnBecameInvisible() {
	Destroy(gameObject);
}