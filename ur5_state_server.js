const rosnodejs = require('rosnodejs')
// const mat3d = require('math3d')
const Quaternion = require('quaternion')
// rosnodejs.loadAllPackages()
const geometryMsgs = rosnodejs.require('geometry_msgs')
const sensorMsgs = rosnodejs.require('sensor_msgs')
const URStateData = require('../ur-state-receiver')
const urStateDataIns = new URStateData(30003, '10.8.8.133')

// Joint position vector
var jointState = new sensorMsgs.msg.JointState()

var currentCartPose = new geometryMsgs.msg.Pose()

// Convert RPY to Quaternion
function RPYToQuaternion (Rx, Ry, Rz) {
  // var quat = mat3d.Quaternion.Euler(Rx, Ry, Rz)
  var quat = Quaternion.fromEuler(Rz, Rx, Ry)
  return quat
}

// nit ROS node
rosnodejs.initNode('/ur5_state_server', {onTheFly: true})
.then((nh) => {
  const jointStatePublisher = nh.advertise('/joint_states', 'sensor_msgs/JointState')
  setInterval(() => {
    jointStatePublisher.publish(jointState)
  }, 8)
})
// const nh = rosnodejs.nh

urStateDataIns.on('data', function (data) {
  jointState.header.stamp = rosnodejs.Time.now()
  jointState.name[0] = 'shoulder_pan_joint'
  jointState.name[1] = 'shoulder_lift_joint'
  jointState.name[2] = 'elbow_joint'
  jointState.name[3] = 'wrist_1_joint'
  jointState.name[4] = 'wrist_2_joint'
  jointState.name[5] = 'wrist_3_joint'
  jointState.position[0] = data.actJ1pos
  jointState.position[1] = data.actJ2pos
  jointState.position[2] = data.actJ3pos
  jointState.position[3] = data.actJ4pos
  jointState.position[4] = data.actJ5pos
  jointState.position[5] = data.actJ6pos
  currentCartPose.position.x = data.actXXpos
  currentCartPose.position.y = data.actYYpos
  currentCartPose.position.z = data.actZZpos
  var orientationInQuaternion = RPYToQuaternion(data.actRXpos, data.actRYpos, data.actRZpos)
  currentCartPose.orientation.w = orientationInQuaternion.w
  currentCartPose.orientation.x = orientationInQuaternion.x
  currentCartPose.orientation.y = orientationInQuaternion.y
  currentCartPose.orientation.z = orientationInQuaternion.z
})
