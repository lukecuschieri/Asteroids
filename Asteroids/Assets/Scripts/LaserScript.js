#pragma strict

// the laser speed
var speed:float = 22.5f;

// has the laser hit something
var hitObject:boolean = false;

// the start function
function Start() {
	PlayerController.shotsFired++;
}

// move the laser
function Update() {
	transform.Translate(Vector3.up * speed * Time.deltaTime);
}

// remove the laser if invisible
function OnBecameInvisible() {
	if (hitObject) PlayerController.shotsHit++;
	else PlayerController.shotsMissed++;
	
	Destroy(gameObject);
}