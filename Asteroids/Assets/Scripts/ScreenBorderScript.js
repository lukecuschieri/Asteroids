#pragma strict

// get the screen borders
static var bottom:float = Camera.main.ScreenToWorldPoint(Vector3(Screen.width, Screen.height, 0)).y;
static var left:float = Camera.main.ScreenToWorldPoint(Vector3(0, 0, 0)).x;
static var right:float = Camera.main.ScreenToWorldPoint(Vector3(Screen.width, Screen.height, 0)).x;
static var top:float = Camera.main.ScreenToWorldPoint(Vector3(0, 0, 0)).y;