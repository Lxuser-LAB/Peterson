from flask import Flask, render_template, jsonify, request

from drone_model import DroneModelSingleton, DroneController, DroneView, TakeoffStrategy, LandingStrategy, PatrolStrategy, StatefulDrone

app = Flask(__name__)

drone_model = DroneModelSingleton()

drone_view = DroneView()

drone_controller = DroneController(drone_model, drone_view)

stateful_drone = StatefulDrone(drone_model, drone_view)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/status', methods=['GET'])
def get_status():
    return jsonify(drone_view.display_status(drone_model))

@app.route('/position', methods=['POST'])
def update_position():
    data = request.get_json()
    new_position = data.get('position', (0, 0))
    return jsonify(drone_controller.change_position(new_position))

@app.route('/altitude', methods=['POST'])
def update_altitude():
    data = request.get_json()
    new_altitude = data.get('altitude', 0)
    return jsonify(drone_controller.change_altitude(new_altitude))

@app.route('/speed', methods=['POST'])
def update_speed():
    data = request.get_json()
    new_speed = data.get('speed', 0)
    return jsonify(drone_controller.change_speed(new_speed))

@app.route('/battery', methods=['GET'])
def check_battery():
    return jsonify(drone_controller.monitor_battery())

@app.route('/return_to_base', methods=['POST'])
def return_to_base():
    return jsonify(drone_controller.return_to_base())

@app.route('/takeoff', methods=['POST'])
def takeoff():
    stateful_drone.set_strategy(TakeoffStrategy())
    stateful_drone.perform_action()
    return jsonify({"message": "Drone is taking off"})

@app.route('/patrol', methods=['POST'])
def patrol():
    stateful_drone.set_strategy(PatrolStrategy())
    stateful_drone.perform_action()
    return jsonify({"message": "Drone is patrolling"})

@app.route('/land', methods=['POST'])
def land():
    stateful_drone.set_strategy(LandingStrategy())
    stateful_drone.perform_action()
    return jsonify({"message": "Drone is landing"})

if __name__ == '__main__':
    app.run(debug=True)
