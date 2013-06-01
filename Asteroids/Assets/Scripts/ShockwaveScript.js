#pragma strict

// the transparency of the texture
var alpha:float = 1.0f;
var growth:Vector3 = Vector3(1.5f, 1.5f, 0.0f);

function Start() {
	renderer.material.color = Color(1, 0.8f, 0, alpha);
}

function Update() {
	if (alpha > 0) {
		alpha -= Time.deltaTime * 4;
		
		transform.localScale += growth;
		
		renderer.material.color = Color(1, 0.8f, 0, alpha);
	} else {
		Destroy(gameObject);
	}
}