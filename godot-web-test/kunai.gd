extends Node3D

# Called every frame. 'delta' is the elapsed time since the previous frame.
func _process(delta):
	rotate_x(delta*0.5)
	rotate_y(delta*0.3)
	
	var vertical = float(Input.is_action_pressed("up")) - float(Input.is_action_pressed("down"))
	var horizontal = float(Input.is_action_pressed("right")) - float(Input.is_action_pressed("left"))
	
	position += delta*Vector3(horizontal, vertical, 0)
